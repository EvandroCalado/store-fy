import 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }
  interface User {
    role: string;
  }

  interface JWT {
    role: string;
  }
}
