import { Context } from '..';

interface CoffeeParentGrindType {
  grindId: string;
}

interface CoffeeParentReviewType {
  coffeeId: string;
}

export const CoffeeBeans = {
  reviews: (parent: CoffeeParentReviewType, __: any, { prisma }: Context) => {
    return prisma.review.findMany({
      where: {
        coffeeId: parent.coffeeId,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });
  },
  grindSize: (parent: CoffeeParentGrindType, __: any, { prisma }: Context) => {
    return prisma.grindSize.findUnique({
      where: {
        id: parent.grindId,
      },
    });
  },
};
