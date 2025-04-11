/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareSync } from 'bcrypt-ts-edge';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import authConfig from './auth.config';
import { prisma } from './db/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  providers: [
    Credentials({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      authorize: async credentials => {
        if (!credentials) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) return null;

        // Check if user exists and if the password matches
        const isPasswordValid = compareSync(
          credentials.password as string,
          user.password as string,
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,

    async session({ session, user, trigger, token }: any) {
      if (token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.name = token.name;
      }

      if (trigger === 'update') {
        session.user.name = user.name;
      }

      return session;
    },
  },
});
