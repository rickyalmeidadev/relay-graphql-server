import {GraphQLNonNull, GraphQLObjectType, GraphQLSchema} from 'graphql'
import {connectionArgs, connectionFromArray} from 'graphql-relay'
import PostType from './posts/type'
import PostLoader from './posts/loader'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all fields',
    fields: () => ({
      posts: {
        type: GraphQLNonNull(PostType.connectionType),
        args: connectionArgs,
        resolve: async (_, args) => {
          const posts = await PostLoader.loadAll()
          return connectionFromArray(posts, args)
        }
      }
    })
  })
})

export default schema
