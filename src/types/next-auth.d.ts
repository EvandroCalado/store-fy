import 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      role: string;
      image: string;
    } & DefaultSession['user'];
  }
  interface User {
    role: string;
    image: string;
  }

  interface JWT {
    role: string;
    image: string;
  }
}
