import { Context } from '..';

export const Query = {
  hello: () => {
    return "Howdy Y'all";
  },
  reviews: async (_: any, __: any, { prisma }: Context) => {
    const reviews = await prisma.review.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    return reviews;
  },

  coffeeBeans: async (_: any, __: any, { prisma }: Context) => {
    const coffeeBeans = await prisma.coffeeBeans.findMany({});

    return coffeeBeans;
  },

  coffeeBean: async (_: any, { id }: { id: string }, { prisma }: Context) => {
    const coffeeBean = await prisma.coffeeBeans.findUnique({
      where: {
        id: id,
      },
    });

    return coffeeBean;
  },
};

/*
  coffeeBeans: () => {
    return [
      {
        id: 'asdlj123',
        name: 'bean1',
        origin: 'brazil',
        description: 'Yummy yummy coffee',
        roast: 'dark',
        tastingNotes: ['chocolate', 'herbs'],
        pircture: 'hi',
        price: 18,
        grindSize: {
          id: 'abc123',
          grinderName: 'Niche Zero',
          espresso: 14,
          pourOver: 29,
          frenchPress: 43,
        },
        reviews: [],
      },
    ];
  },
*/
