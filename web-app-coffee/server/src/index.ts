import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { Query, Mutation, Review, CoffeeBeans } from './Resolvers';
import { PrismaClient, Prisma } from '@prisma/client';
import { getUserFromToken } from './utils/getUserFromToken';

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  userInfo: {
    userId: string;
  } | null;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Review,
    CoffeeBeans,
  },
  context: async ({ req }: any): Promise<Context> => {
    const userInfo = getUserFromToken(req.headers.authorization);
    return {
      prisma,
      userInfo,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`);
});
