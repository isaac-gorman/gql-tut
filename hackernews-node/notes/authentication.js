// Learning Objective: 
// - Understand the best practices for implementing authentication and authorazation with Node.js, Express and Prisma

// Objective: 
// - By the end of this chapter I should have implemented a signup and login functionality that allows users to authenticate against the GQL server.

// Chapter Sections: 
// - 1 Adding a "User" Model
// - 2 Understanding Relation Fields
// - 3 Updating the Prisma Client
// - 4 Extending the GraphQL Schema
// - 5 Implementing the resolver functions
// - 5.a - Adding authentication resolvers
// - 6 Requiring authentication for the "post" mutation 
// - 6.a - Resolving relations
// - 6.b - Putting it all together
// - 7 Testing the authentication flow

// Section Quiz Question: 
// - Q: What HTTP header field carries the authentication token?

// - 1 Adding a "User" Model
// - I need a way to repersent users in the database
// - I can accomplish this by adding a User tyoe to my prisma model
// - Futhermore there is a relationship between the "User" and "Link" type  because "Link"s will be posted by "User"s
// - To represent this one to many relationship I will need to add a "@relation" to Link from User

// - 2 Understanding Relation Fields
// - Pay attention to how I just added a new "@relation" field to "postedBy" in the Link model that points to a User instance 
// - Then in contrast the User model has a "links" field that contains an array of Links "list of links"
// - Q: How did I accomplish the implentation of a relationship between User and their Links? 
// - A: By using the "@relation" attribute, this attribute is required for every relation field in a Prisma Schema. In this "@relation" field I am merly defeining what the foriegn key of the related table will be. 
// - A: And in the context of my project, I defined that the foriegn key relates the link to the User table

// - 3 Updating the Prisma Client
// - Q: What must I do after I edit my Prisma Schema, AKA the Data Model? 
// - A: Each time I update the Prisma Shema, I need to migrate my database and re-generate the Prisma Client
// - Q: What are the steps to to update the database after I make any changes to my Data Model AKA "Primsa Schema"
// - - Step 0) Make sure I updated my data model correctly, and added the proper attribute, syntax and structure. Try not to touch my "datasource db", and  "generator client"
// - - Step 1) Save the migration 
// ~ npx prisma migrate save --experimental
// - - Step 2) Send the migration to the database AKA applying the migration to the database
// ~ npx prisma migrate up --experimental
// - - After the prisma migration is applied to the DB, the database structure will reflect the updated data structure
// - - Step 3) Re-Generate the Prisma Client  
// ~ npx prisma generate
// - - I need to re-generate the prisma client so I can expose the database queries to my GraphQL server

// - 4 Extending the GraphQL Schema
// - Q: How will we apply schema driven development after updating our Database? 
// - - By extending the schema based on operations that I want add to the API. In my app I want my users to be able to protect their data, so I will create a sign up and login mutation. 
// - Q: How will the signup and login mutations act? 
// - A: They will act simillary by utalizng the password inorder to access the AuthPaylod token
// - A: Both will return information about the User who is signing up or logging in aswell as a "token" which will be used to authenticate request against my GraphQL API, and is all nicely bundeled within my AuthPayload Type 

// - 5 Implementing the resolver functions
// - Q: What step comes after extending the GQL Schema?
// - A: Implemnting resolver function to resolve the new mutation fields added. AKA 1. Implement an operation on the schema, 2. Then create resolver functions to resolve them

// - Q: What is the logic going on in the src/utils.js file? 
// - A: The "getUserId" function is merly a helper function that can be called within the context object which requires authentication, such as for post muation queries. 
// - A: The getUsersId function first retrives the Authorization header (which containsthe User's JWT) from context? But how ...? 

// - Q: What is the minor issue with the way the request object is set up?
// - A: I am accessing the request via the context object. 
// - A: This is an issue because when I intialize context, I am only intiating the prisma instance, there is no request object attached to it. 
// - A: By passing a function like operation into the context object I will be able to make the getUserById() function possible to authenticate any users against the server to access that database.
// - Q: Instead of attaching an object directly into context how am I handeling context now to account for the authtication request? 
// - A: I am writing context as a function which will return the context. 
// - Q: What is the advantage of this approach? 
// - A: The advantage of impementing context as function is that I can now attach the HTTP that carries the incoming GraphQL query or mutation to context as well. Which will probably be benficial for the client send request for data. Now this enables the resolvers to read the Authorization header and validate if the user who just submited the request has the persmison to preform such a request or operation. 

// - 6 Requiring Authentication for the post mutation? 
// - Q: What are the two things that are different in this implementaion than before?
// - 1: I am using the getUserId() to retrive the ID of the User
// - 2: I am then using the userId to connect to the Link to be created by the User who is creating it. The connect: {} object serves as a "nested write" to basically connect the newly created post to the matching userId. I have already used the "create" nested write that allows me to create a new row in the table and in this situation a new Link. There is also the connectOrCreate nested wirte which would enable me to create a new user and connect it to existing post. 
