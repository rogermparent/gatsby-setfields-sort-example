const { GraphQLString } = require('gatsby/graphql');
const GraphQLDate = require("gatsby/dist/schema/types/type-date").getType()

// You can delete this file if you're not using it
exports.sourceNodes = ({actions, createNodeId, createContentDigest}) => {
    const {createNode} = actions

    for(var i = 0; i < 10; i++) {
        const randomDate = new Date(Math.random() * 1550000000000).toISOString();
        createNode({
            id: createNodeId(`ExampleNode [${i}]`),
            date: randomDate,
            parent: null,
            children: [],
            internal: {
                type: "SortableExampleNode",
                contentDigest: createContentDigest(randomDate)
            }
        })
    }
}

exports.setFieldsOnGraphQLNodeType = ({type}) => {
    if(type.name === "SortableExampleNode") {
        return {
            dateFieldDate: {
                ...GraphQLDate,
                resolve: (source) => (source.date)
            },
            stringFieldDate: {
                type: GraphQLString,
                resolve: (source) => (source.date)
            }
        }
    }
}