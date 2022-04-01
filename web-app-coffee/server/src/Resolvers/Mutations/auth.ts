import { Context } from '../../index';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const signature: string = <string>process.env.JWT_SIGNATURE;

interface SignUpArgs {
  email: string;
  password: string;
  name: string;
}

interface SignInArgs {
  credentials: {
    email: string;
    password: string;
  };
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  token: string | null;
}

export const authResolvers = {
  signup: async (_: any, { email, password, name }: SignUpArgs, { prisma }: Context): Promise<UserPayload> => {
    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      return {
        userErrors: [
          {
            message: 'Invalid email',
          },
        ],
        token: null,
      };
    }

    const isValidPassword = validator.isLength(password, {
      min: 5,
    });

    if (!isValidPassword) {
      return {
        userErrors: [
          {
            message: 'Password must be at least 5 characters long',
          },
        ],
        token: null,
      };
    }

    if (!name) {
      return {
        userErrors: [
          {
            message: 'Invalid name',
          },
        ],
        token: null,
      };
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPass,
      },
    });

    const token = await JWT.sign(
      {
        userId: user.id,
      },
      signature,
      {
        expiresIn: 60 * 60 * 24 * 7,
      }
    );

    return {
      userErrors: [],
      token,
    };
  },

  signin: async (_: any, { credentials }: SignInArgs, { prisma }: Context): Promise<UserPayload> => {
    const { email, password } = credentials;

    // console.log(password);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        userErrors: [
          {
            message: 'Invalid credentials',
          },
        ],
        token: null,
      };
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
      return {
        userErrors: [
          {
            message: 'Invalid credentials',
          },
        ],
        token: null,
      };
    }

    const token = await JWT.sign(
      {
        userId: user.id,
      },
      signature,
      {
        expiresIn: 60 * 60 * 24 * 7,
      }
    );

    return {
      userErrors: [],
      token,
    };
  },
};
