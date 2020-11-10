const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {APP_SECRET, getUserId} = require("../utils")


function post(parent, args, contex, info){
      const newLink = contex.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        },
      })
      return newLink
    }

async function signup(parent, args, context, info){
    // 1: Encrypt the users password, using the bcrypt.js librar that I will install soon
    const password = await bcrypt.hash(args.password, 10)

    // 2: Use the Prisma Client instance to store the new User in the databsase
    const user = await context.prisma.user.create({data: {...args, password}})
    
    // 3: Then I will  generate a JSON WebToken that is signed with an APP_SECRET.
    // - I have yet to write this APP_SECRET and install the jwt library
    const token = jwt.sign({userId: args.id}, APP_SECRET)

    // 4 Finally I will return the "token" and "user" in the shape that adheres to the AuthPayload object in my GraphQL scheman
    return {
        user,
        token,
    }
} 

async function login(parent, args, context, info){
    // 1 Now instead of creating a new User object I am utalizing a Prisma Client instance to retrive an existing "User" record from the database based on the provided email that was passed as an argument in the login mutation. If no User record is found with a matching email then I respond with an Error Message
    const user = await context.prisma.user.findOne({where: {email: args.email}})
        if(!user){
            throw new Error(" No such user found ")
        }

    // 2 The next step is to compare the provided password with the one for that user in the database. If the given password does not match the passord stored in the database then return an Error 
    const valid = await bcrypt.compare(args.password, user.password)
        if(!valid){
            throw new Error(" Invalid password ")
        }
    
    const token = jwt.sign({userId: user.id}, APP_SECRET)

    // 3
    return {
        token,
        user
    }
}


module.exports = {
    post,
    signup,
    login,
}