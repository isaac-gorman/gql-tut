// Learning Objective: 
// - Learn how to implement GraphQL subscriptions with Node.js., Express, & Prisma to add realtime functionality to an app. 
// - By the end of this chapter I should have somewhat of an undertstanding of how I can bring real time functionallity inti my app by implmeneting GraphQL subscriptions. 

// Chapter: Realtime GraphQL Subscriptions

// Chapter Project Exersices: Implement two subscriptions to be exposed by a GraphQL sever:
// - 1: Will send realtime updates to subscribed clients when a new Link elelment is created
// - 2: Will send real time updates to subscribed clients whan an existing Link element is upvoted

// Chapter Sections: 
// - 1 What are GraphQL subscriptions? 
// - 2 Implementing GraphQL subscriptions
// - 3 Setting up PubSub
// - 4 Subscribing to new Link elements
// - 5 Adding subscriptions to your resolvers 
// - - Testing 
// - 6 Adding a voting feature
// - - Implementing a vote mutation
// - - Subscribing to new votes


// - 1 What are GraphQL Subscriptions? 
// - Q: What are GQL subscription? 
// - A: Subscriptions are a GraphQL feature that allow a server to send data to its clients when a specific event occurs
// - A: Subscriptions are usually implemneted with WebSockets, in the setup, the server maintains a stead connection to its subscribed client. This also breaks the "request-repsonse-cycle" that have been used for all the previous interactions with the API.
// - A: Instead of a request, response connection, the client initially opens up a long-lived connection with the server by sending a subscription query that specifies which event it is intrested in. Every time this particualr event occurs happend the serve uses the connection to push the event data to the subscribed client(s)

// 2 Implementing GraphQL subscriptions: 
// - Q: What will I be using to implement subscriptions to my server? 
// - A: I will be using PubSub form the GraphQL-Yoga Libray that I have already been using for the GraphQL server to implement subscriptions to the following events:
// - a. When a new model is created
// - b. Whenver an existing model is updated
// - c. An existing model is deleted

// I will first have to add an instance of PubSub to the context object, just as I did with Prisma Client, and then calling its methods in the resolvers that handle each of the above events. 

// - 3 Setting Up PubSub
// - 

// - 4 Subscribing to a new Link element
// - Now I will implement the subscription that allows clients to subscribe to newly created Link elements
// - Just like any query or mutation we want to add I need to extend the GraphQL schema definition

// - Q: What is next? 
// - A: Next I will add a resolver to resolve the newLink field on the Subscription type. 
// - A: Subscription for resolvers are slightly diff then the ones for queries and mutations
// Q: In what what are resolvers for Subscriptions diffrent? 
// - A: Rather than returning any data directly, they return an AsyncIterator which subsequently is used by the GraphQL server to push the event data to the client
// - A: Subscription resolvers are wrapped inside and object and need to provided as the value for a "subscribe" fiel. I also need to proivide another field called resolve that actually returns the data from the data emitted by the AsyncIterator? 

// Remember to adhere to modular sturturing for my files... 



