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
 