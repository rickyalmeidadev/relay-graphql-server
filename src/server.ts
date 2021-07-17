import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import schema from './graphql/schema'

const app = express()
app.use('/graphql', graphqlHTTP({schema, graphiql: true}))
app.listen(4000, () => console.log('Server is listening on port 4000'))
