import { CoffeeBeans, Prisma } from '.prisma/client';
import { Context } from '../../index';

interface CoffeeArgs {
  coffee: {
    roaster: string;
    name: string;
    origin: string;
    description: string;
    roast: string;
    tastingNotes: string[];
    picture: string;
    price: number;
    grindId: string;
  };
}

interface CoffeeBeanPayloadType {
  userErrors: {
    message: string;
  }[];
  coffeeBeans: CoffeeBeans | Prisma.Prisma__CoffeeBeansClient<CoffeeBeans> | null;
}

export const coffeeResolvers = {
  coffeeCreate: async (_: any, { coffee }: CoffeeArgs, { prisma }: Context): Promise<CoffeeBeanPayloadType> => {
    const { roaster, name, origin, description, roast, tastingNotes, picture, price, grindId } = coffee;

    if (!roaster || !name || !origin || !description || !roast || !tastingNotes || !picture || !price || !grindId) {
      return {
        userErrors: [],
        coffeeBeans: null,
      };
    }

    return {
      userErrors: [],
      coffeeBeans: prisma.coffeeBeans.create({
        data: {
          roaster,
          origin,
          name,
          description,
          tastingNotes,
          picture,
          price,
          grindId: '1',
          roast,
        },
      }),
    };
  },
};
