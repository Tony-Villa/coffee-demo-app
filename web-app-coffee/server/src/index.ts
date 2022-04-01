import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './schema';
import { Query, Mutation } from './Resolvers';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

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

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`);
});
