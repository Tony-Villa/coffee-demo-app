import { Prisma, Review } from '.prisma/client';
import { Context } from '../../index';

interface ReviewArgs {
  review: {
    rating?: number;
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

export const reviewResolvers = {
  reviewCreate: async (_: any, { review }: ReviewArgs, { prisma, userInfo }: Context): Promise<ReviewPayloadType> => {
    const { rating, title, content, coffeeBeans } = review;

    // if (!userInfo) {
    //   return {
    //     userErrors: [
    //       {
    //         message: 'Forbidden Access. Unauthorized',
    //       },
    //     ],
    //     review: null,
    //   };
    // }

    if (!title || !content || !rating) {
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
          rating,
          title,
          content,
          userId: '2ecf6111-d0e1-4d54-8ece-ca8523ab13ba',
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
    const { title, content, rating } = review;

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
      rating,
    };

    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;
    if (!rating) delete payloadToUpdate.rating;

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

  reviewDelete: async (_: any, { reviewId }: { reviewId: string }, { prisma }: Context): Promise<ReviewPayloadType> => {
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

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    return {
      userErrors: [],
      review: existingReview,
    };
  },
};
