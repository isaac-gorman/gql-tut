// Learning Outcome: 
// - Understand how to add filtering and pagination capabilities to a GraphQL API, with Node.js, Express & Prisma. 
// - In this section I will implement key features of many robust API's
// - The goal is to enable clients to contstrain the List of elements returned bt the feed query by providing filtering and pagination paramters


// Chapter Sections: 
// - 1 Filtering 
// - 2 Pagination 
// - 3 Sorting 
// - Returning the total amount of Link elements

// - Quiz Question? Which arguments are typically used to paginate through a list in the prisma client API using limit-offset pagination? 

// - 1 Filtering 
// - Q: How will I implement filtering capablities to the API? 
// - A: By using the handy dandy PrismaClient I'll be able to implement filteirng capablities to the API. 
// - A: Similar to the last chapters the heavy lifting of query resolving of will be accomplished by Prisma. 
// Q: What is the first step? 
// - A: The first step is to think about the filtes I want to expose through my API. 
// - - In my case I want the feed query in the API to accept a filtering string. The query then should only return the Link elements where the url or the descriptoion contain that filtering string



