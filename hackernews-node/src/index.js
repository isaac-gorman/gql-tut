const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
  
  // 1
  let idCount = links.length
  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: () => links,
    },
    Mutation: {
      // 2
      post: (parent, args) => {
         const link = {
          id: `link-${idCount++}`,
          description: args.description,
          url: args.url,
        }
        links.push(link)
        return link
      }
    },
  }

  const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {
      prisma,
    }
  })
server.start(() => console.log(`Server is running on http://localhost:4000`))