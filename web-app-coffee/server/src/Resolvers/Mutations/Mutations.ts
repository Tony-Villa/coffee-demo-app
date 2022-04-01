import { Prisma, Review } from '.prisma/client';
import { Context } from '../../index';

interface ReviewArgs {
  review: {
    title?: string;
    content?: string;
    coffeeBeans: string;
  };
}

interface ReviewPayloadType {
  userErrors: {
    message: string;
  }[];
  review: Review | Prisma.Prisma__ReviewClient<Review> | null;
}

export const Mutation = {
  reviewCreate: async (_: any, { review }: ReviewArgs, { prisma }: Context): Promise<ReviewPayloadType> => {
    const { title, content, coffeeBeans } = review;

    if (!title || !content) {
      return {
        userErrors: [
          {
            message: 'You must provide title and content to create a review',
          },
        ],
        review: null,
      };
    }

    return {
      userErrors: [],
      review: prisma.review.create({
        data: {
          title,
          content,
          userId: '1',
          coffeeId: coffeeBeans,
        },
      }),
    };
  },

  reviewUpdate: async (
    _: any,
    { reviewId, review }: { reviewId: string; review: ReviewArgs['review'] },
    { prisma }: Context
  ): Promise<ReviewPayloadType> => {
    const { title, content } = review;

    if (!title && !content) {
      return {
        userErrors: [
          {
            message: 'You must provide at least one field to update',
          },
        ],
        review: null,
      };
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!existingReview) {
      return {
        userErrors: [
          {
            message: 'Review does not exist',
          },
        ],
        review: null,
      };
    }

    let payloadToUpdate = {
      title,
      content,
    };

    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;

    return {
      userErrors: [],
      review: prisma.review.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: reviewId,
        },
      }),
    };
  },
};
