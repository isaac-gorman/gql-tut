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
        console.log("idCount:", idCount)
        return link
      },
      updateLink: (parent, args) => {
        let updatedLink;
        
        console.log("links:", links)
        links = links.map(link => {
          if (link.id === args.id) {
              console.log("link:", link)
              console.log("args:", args)
            updatedLink = { ...link, ...args };
            return updatedLink;
          }
          return link;
        });
        
        console.log("updatedLink:", updatedLink)
        return updatedLink;
      },
      deleteLink: (parent, args) => {
        const removeIndex = links.findIndex( link => link.id === args.id)
        const removedLink = links[removeIndex]
        links.splice(removeIndex, 1)
        console.log("removeIndex:", removeIndex  )
        console.log("removedLink:", removedLink  )
        return removedLink
      }
    },
  }
  
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`The server is running on http://localhost:4000 `))