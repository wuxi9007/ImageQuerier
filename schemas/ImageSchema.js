var { buildSchema } = require('graphql');

module.exports = {
    imageSchema: buildSchema(`
    type Query {
        hello: String
    }
    `),
    imageRoot: { hello: () => 'Hello world!' }
}
