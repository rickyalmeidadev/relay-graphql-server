import {GraphQLNonNull, GraphQLObjectType, GraphQLSchema} from 'graphql'
import {connectionArgs, connectionFromArray} from 'graphql-relay'
import fs from 'fs/promises'
import path from 'path'
import PostType from './posts/type'

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all fields',
    fields: () => ({
      posts: {
        type: GraphQLNonNull(PostType.connectionType),
        args: connectionArgs,
        resolve: async (_, args) => {
          const stringifiedJson = await fs.readFile(
            path.resolve(__dirname, '..', '..', 'data.json'),
            'utf-8'
          )
          const json = JSON.parse(stringifiedJson)
          return connectionFromArray(json.posts, args)
        }
      }
    })
  })
})

export default schema
