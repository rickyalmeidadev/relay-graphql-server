import {GraphQLObjectType, GraphQLString} from 'graphql'
import {connectionDefinitions, globalIdField} from 'graphql-relay'

const nodeType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post type',
  fields: () => ({
    id: globalIdField('Post'),
    title: {
      type: GraphQLString,
      resolve: post => post.title
    },
    body: {
      type: GraphQLString,
      resolve: post => post.body
    }
  })
})

const {connectionType, edgeType} = connectionDefinitions({nodeType})

const PostType = {connectionType, edgeType, nodeType}

export default PostType
