// Chapter Objective: 
// - Connecting the GraphQL server with the database using the Prisma Client

// Learning Outcome: 
// - Understand how to hook up my GraphQL server to run queries against the database using the Prisma Client 

// Sections: 
// 1 - Wiring up GraphQL with Prisma Client 
// 1.a - Introduction to the GraphQL "context" resolver agrument
// 2 - Updating my resolver functions to leverage the Prisma Client
// 2.a - Understand how my resolvers work after implementing Prisma Client: feed, posts
// 3 - Testing 
// 4 - Utalizing Prisma Studio to explore my data


// 1 - Wiring up GraphQL with Prisma Client
// - Q: What is the first step when hooking up my server to the databse using Prisma Client? 
// - A: Importing the generated Prisma Client library and wire up the GraphQL server so GraphQL can access the database queries that Prisma exposes. 

// 1.a - Introducing the GraphQL "context" resolver argument 
// - Q: How many arguments does a GQL resolver take? 
// - A: 4 arguments 
// - Q: What is the context resolver argument? 
// - A: The context argument is a plain JS object that every resolver in the resolver chain can read & write to. 
// - A: The context argument is useful because it is a mode of communcation within the resolver chain.
// - A: At the moment the GraphQL server is intialized you can already write to the context argument. 
// - Q: What does the context argument have to do with Prisma Client? 
// - A: We can attach an instance of the Prisma Client to the "context" argument and when intializing the server then access the Prisma Client object from within my resolvers via the context argument. *This functionality utalizes methods from Object Oriented Programming. 
// - Q: Now what happends after I have passed an instance "a key value" in the context object within my GraphQLServer({}) object? 
// - A: I will be able to access the instance of Prisma Client from within my resolvers, via "context.prisma" *remember that context is merly an object, and I could store any instance within it of random info.


// - 2 Updating resolver functions to utalize the prisma client


