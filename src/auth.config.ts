import { cookies } from 'next/headers';

import type { NextAuthConfig } from 'next-auth';

import { prisma } from './db/prisma';

export default {
  providers: [],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Assign user fields to token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;

        // If user has no name then use the email
        if (user.name === 'NO_NAME' && user.email) {
          token.name = user.email.split('@')[0];

          // Update database to reflect the token name
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              name: token.name,
            },
          });
        }

        if (trigger === 'signIn' || trigger === 'signUp') {
          const cookiesObject = await cookies();
          const sessionCartId = cookiesObject.get('sessionCartId')?.value;

          if (sessionCartId) {
            const sessionCart = await prisma.cart.findFirst({
              where: { sessionCartId },
            });

            if (sessionCart) {
              // Delete current user cart
              await prisma.cart.deleteMany({
                where: { userId: user.id },
              });

              // Assign new cart
              await prisma.cart.update({
                where: { id: sessionCart.id },
                data: { userId: user.id },
              });
            }
          }
        }
      }

      // Handle session updates
      if (trigger === 'update' && session?.user.name) {
        token.name = session.user.name;
        token.image = session.user.image;
      }

      return token;
    },
  },
} satisfies NextAuthConfig;
