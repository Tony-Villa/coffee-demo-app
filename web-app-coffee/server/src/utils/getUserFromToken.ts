import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const signature: string = <string>process.env.JWT_SIGNATURE;

export const getUserFromToken = (token: string) => {
  try {
    return JWT.verify(token, signature) as {
      userId: string;
    };
  } catch (err) {
    return null;
  }
};
