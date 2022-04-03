import { Context } from '..';
import { coffeeLoader } from '../loaders/coffeeLoader';

interface ReviewUserParentType {
  userId: string;
}
interface ReviewCoffeeParentType {
  id: string;
}

export const Review = {
  user: (parent: ReviewUserParentType, __: any, { prisma }: Context) => {
    return prisma.user.findUnique({
      where: {
        id: parent.userId,
      },
    });
  },

  coffeeBean: (parent: ReviewCoffeeParentType, __: any, { prisma }: Context) => {
    return coffeeLoader.load(parent.id);

    // return prisma.coffeeBeans.findUnique({
    //   where: {
    //     id: parent.id,
    //   },
    // });
  },
};
