// Q: How would I resolve the links field in the User type? 
// - Well the User table is the parent of the Links field so I can't pass anything through as a parent. What does the links field ask for? It is asking for the links of a specific User has posted, actually its just one link I need to look for. 

function links(parent, args, context) {
    return context.prisma.user.findOne({ where: { id: parent.id } }).links()
  }
  
  module.exports = {
    links,
  }