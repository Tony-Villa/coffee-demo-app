import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// export interface Context {
//   prisma: PrismaClient<
//     Prisma.PrismaClientOptions,
//     never,
//     Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
//   >;
//   userInfo: {
//     userId: number;
//   } | null;
// }

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Howdy Y'all";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`);
});
