import { authResolvers } from './auth';
import { reviewResolvers } from './review';

export const Mutation = {
  ...reviewResolvers,
  ...authResolvers,
};
