async function feed(parent, args, context){
  // 1: 
    const where = args.filter
      ? {
        // 2: 
        OR: [
          {description: {contains: args.filter }},
          {url: {contains: args.filter }}
        ],
      } : {}

      const links = await context.prisma.link.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy
      })

      return links
    }



    module.exports = {
        feed,
    }

  // 1: If no filter string is provided then the "where" object will be just and empty object and no filtering conditions will be applied by Prisma Client when it returns the response of links query 

  // 2: In the case where the "filter" string is carried over by the incoming "args", I write a ternary to construct a "where" object that expresses our two filter conditions from above. * Remember I wanted to expose certian filters to my API. In my case the feed query in my API will accept a filter argument as a "filter: String". The query then should only return the "Link" elements where the "url" or the "description" contain the filtering string. AKA the filter I send through args has to be within either the description of url.   
  // The two conditions it must fullfill are "url" or "description"
  // - The "where" argument is used by Prisma to filter out the Link elements that do not contain the string that was passed through args, "that dont adhere to the specifed conditions"