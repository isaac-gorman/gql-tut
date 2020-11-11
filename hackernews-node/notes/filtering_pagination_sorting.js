// Learning Outcome: 
// - Understand how to add filtering and pagination capabilities to a GraphQL API, with Node.js, Express & Prisma. 
// - In this section I will implement key features of many robust API's
// - The goal is to enable clients to contstrain the List of elements returned bt the feed query by providing filtering and pagination paramters


// Chapter Sections: 
// - 1 Filtering 
// - 2 Pagination 
// - 3 Sorting 
// - 4 Returning the total amount of Link elements

// - Quiz Question? Which arguments are typically used to paginate through a list in the prisma client API using limit-offset pagination? 

// - 1 Filtering 
// - Q: How will I implement filtering capablities to the API? 
// - A: By using the handy dandy PrismaClient I'll be able to implement filteirng capablities to the API. 
// - A: Similar to the last chapters the heavy lifting of query resolving of will be accomplished by Prisma. 
// Q: What is the first step? 
// - A: The first step is to think about the filtes I want to expose through my API. 
// - - In my case I want the feed query in the API to accept a filtering string. The query then should only return the Link elements where the url or the descriptoion contain that filtering string

// - 2 Pagination 
// - Q: What is Pagination? 
// - - A: Pagination also known as paging is the process of dividing a doucment into discrete pages, either electrinuc pages or printed pages.
// - - A: The sequence of numbers assigned to pages in a book or periodical
// - Q: Why is pagination a tricky in API design? 
// - - A: On a high level there are two major ways to approaching pagination
// - - 1: Limit-Offset: Requesting a specific chunk of the list by providing  the indices of the items to be retrived (in fact I will most likely provide the start index offset as well as a count of items to be retrived (limit) )
// - - 2: Cursor-based: This pagination model is a bit more advanced. Every element in the element is associated with a unique ID (the cursor). Clients paginating through the list then provide the cursor of the starting element as well as a count of ityems to be rertived.
// - Prisma supports both pagination approaches. But in this project I will iplement the limit-offset pagination. 

// Limit and offset have diffrent names in the Prisma API
// - Limit: is called "take", meaning I am taking x amount of elements after a provided start index
// - Start: is called "skip", since I am skipping many elements in the list before collecting the items to be returned. If skip is not provided, its 0 by default. the pagination then starts from the beginning of the list. 



// - 3 Sorting 
// - With Prisma it is posible to return lists of elements that are sorted (ordered) according to a specific criteria. 
// - For example I could order the list of Links alphabetically by their URL, or description. 
// - For the Hacker News API, you'll leave it up to the client to decide how to exactly it should be sorted and thus include all the ordering options form the Prisma API in the API of your GraphQL server. I can do this by creating an input type and an enum to represent the ordering options. 


// - 4 Returning the total amount of link elements
// - The last piece of information that I will make available is the total amount of Links are currently stored in the database. 
// - To acomplished this I am going to refeactor the feed query a bit more and create a Feed type that can be retunred by my API. 












