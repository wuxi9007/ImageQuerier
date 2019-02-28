var {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLFloat
} = require('graphql');
const DbUser = require('./models').User;
const DbImage = require('./models').Image;
const DbAnnotation = require('./models').Annotation;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a User',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(user) {
                    return user.id;
                }
            },
            email: {
                type: GraphQLString,
                resolve(user) {
                    return user.email;
                }
            },
            images: {
                type: GraphQLList(Image),
                resolve(user) {
                    return user.getImages();
                }
            }
        }
    }
});

const Image = new GraphQLObjectType({
    name: 'Image',
    description: 'This represents an Image',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(image) {
                    return image.id;
                }
            },
            path: {
                type: GraphQLString,
                resolve(image) {
                    return image.path;
                }
            },
            userId: {
                type: GraphQLString,
                resolve(image) {
                    return image.userId
                }
            },
            title: {
                type: GraphQLString,
                resolve(image) {
                    return image.title
                }
            },
            user: {
                type: User,
                resolve(image) {
                    return image.getUser();
                }
            },
            annotations: {
                type: GraphQLList(Annotation),
                resolve(image) {
                    return image.getAnnotations();
                }
            }
        }
    }
});

const Annotation = new GraphQLObjectType({
    name: 'Annotation',
    description: 'This represents an Annotation',
    fields: ()=> {
        return {
            id: {
                type: GraphQLInt,
                resolve(annotation) {
                    return annotation.id;
                }
            },
            label: {
                type: GraphQLString,
                resolve(annotation) {
                    return annotation.label;
                }
            },
            numeric_value: {
                type: GraphQLFloat,
                resolve(annotation) {
                    return annotation.numeric_value;
                }
            },
            string_value: {
                type: GraphQLString,
                resolve(annotation) {
                    return annotation.string_value;
                }
            },
            units: {
                type: GraphQLString,
                resolve(annotation) {
                    return annotation.units;
                }
            },
            image: {
                type: Image,
                resolve(annotation) {
                    return annotation.getImage();
                }
            }
        }
    }
});

// async function to get values for labels
const getValues = (labels) => {
    const allValues = labels.map((label) => {
        return DbAnnotation.findOne({
            attributes: ['units'],
            where: {
                label
            }
        }).then(res => {
            if (res.units === null || res.units.length === 0) {
                return DbAnnotation.findAll({
                    attributes: [Sequelize.fn('DISTINCT', Sequelize.col('string_value')) ,'string_value'],
                    where: { label }
                }).then(values => {
                    return { label, strings: Array.from(values.map(value => value.string_value)) };
                });
            } else {
                return Promise.all([DbAnnotation.max('numeric_value', { where: { label }}), DbAnnotation.min('numeric_value', { where: { label }})]).then(([max, min]) => { 
                    return {
                        label,
                        upperBound: max,
                        lowerBound: min,
                        units: res.units
                    };
                });
            }
        });
    });
    return Promise.all(allValues).then((results) => {
        return results.map(res => JSON.stringify(res));
    });
}

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            users: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: GraphQLInt
                    },
                    email: {
                        type: GraphQLString
                    }
                },
                resolve(root, args) {
                    return DbUser.findAll({where: args});
                }
            },
            images: {
                type: new GraphQLList(Image),
                resolve(root, args) {
                    return DbImage.findAll({});
                }
            },
            labels: {
                type: new GraphQLList(GraphQLString),
                resolve(root, args) {
                    return DbAnnotation.aggregate(
                        'label', 'Distinct', {plain: false}
                    ).then(res => {
                        return Array.from(res.filter(dis => dis['Distinct'] != null && dis['Distinct'].length > 0).map(dis => dis['Distinct']));
                    });
                }
            },
            labelValues: {
                type: new GraphQLList(GraphQLString),
                args: {
                    labels: {
                        type: new GraphQLList(GraphQLString)
                    }
                },
                resolve(root, args) {
                    return getValues(args.labels);
                }
            },
            queryImages: {
                type: new GraphQLList(Image),
                args: {
                    queryProperties: {
                        type: new GraphQLList(GraphQLString)
                    }
                },
                resolve(root, args) {
                    const imageIdSet = args.queryProperties.map(property => {
                        const keyValue = JSON.parse(property);
                        if (keyValue.value !== null && keyValue.value !== undefined && keyValue.value.constructor.name === 'Array') {
                            return DbAnnotation.findAll({
                                attributes: ['imageId'],
                                where: {
                                    label: keyValue.label,
                                    numeric_value: {
                                        [Op.between]: keyValue.value
                                    } 
                                }
                            }).then(res => {
                                return res.map(annotation => {
                                    return annotation.dataValues.imageId;
                                })
                            });
                        } else {
                            return DbAnnotation.findAll({
                                attributes: ['imageId'],
                                where: {
                                    label: keyValue.label,
                                    string_value: keyValue.value
                                }
                            }).then(res => {
                                return res.map(annotation => {
                                    return annotation.dataValues.imageId;
                                })
                            });
                        }
                    });
                    return Promise.all(imageIdSet).then(results => {
                        const imageIds = results.reduce((a, b) => a.filter(c => b.includes(c)));
                        console.log(imageIds);
                        if (imageIds.length === 0) return [];
                        return DbImage.findAll({
                            where: {
                                id: {
                                    [Op.or]: imageIds
                                }
                            }
                        });
                    })
                }
            }
        }
    }
});


exports.schema = new GraphQLSchema({
    query: Query
});
