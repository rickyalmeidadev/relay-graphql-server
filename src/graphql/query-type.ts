import {GraphQLNonNull, GraphQLObjectType} from 'graphql'
import {connectionArgs, connectionFromArray} from 'graphql-relay'
import fs from 'fs/promises'
import path from 'path'
import PostType from './posts/type'

const QueryType = new GraphQLObjectType({
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

export default QueryType
