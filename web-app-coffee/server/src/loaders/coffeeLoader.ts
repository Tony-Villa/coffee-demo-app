import { CoffeeBeans } from '.prisma/client';
import Dataloader from 'dataloader';
import { prisma } from '..';

type BatchCoffee = (ids: string[]) => Promise<CoffeeBeans[]>;

const batchCoffees: BatchCoffee = async (ids) => {
  const coffeeBeans = await prisma.coffeeBeans.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const coffeeMap: { [key: string]: CoffeeBeans } = {};

  coffeeBeans.forEach((coffee) => {
    coffeeMap[coffee.id] = coffee;
  });

  return ids.map((id) => coffeeMap[id]);
};

//@ts-ignore
export const coffeeLoader = new Dataloader<string, CoffeeBeans>(batchCoffees);
