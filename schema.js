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
            }
        }
    }
});


exports.schema = new GraphQLSchema({
    query: Query
});
