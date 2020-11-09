const {GraphQLServer} = require('graphql-yoga')

let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    },
    {
        id: 'link-1',
        url: 'www.web.com',
        description: 'web stuff'
    },

]
  

  let idCount = links.length
  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: () => links,
      link: (parent, {id}) => {
         let link = links.find(i =>  i.id == id)
         console.log("link:", link)
         console.log("id:", id)
         return link
        }
    },
    Mutation: {
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
    resolvers
})

server.start(() => console.log(`The server is running on http://localhost:4000 `))