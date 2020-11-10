const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-1s-aw3some';

function getUserId(context){
    // 1: Retriving the Authorization header from the context (which contains the User's JWT)
    const Authorization = context.request.get('Athorization')
    if(Authorization){
        // 2: Verifying the JWT, and retriving the Users Id from it 
        const token = Authorization.replace('Bearer', '')
        const { userId }= jwt.verify(token, APP_SECRET)
        return userId
        // This util function to authnticate any request to the database protects the data of the users from being wrongfully changed. This "getUserId()" is what will actually protect certain reslovers
    }
    throw new Error('Not authenticated')
}

module.exports = {
    APP_SECRET,
    getUserId
}