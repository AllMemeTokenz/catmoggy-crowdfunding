import { connectDB } from '@/lib/connectDB';
import { Users } from '@/models/users';
import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<'username' | 'password', string> | undefined) {
        if (!credentials?.username || !credentials?.password) return null;

        await connectDB();

        const user = await Users.findOne({ username: credentials.username });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export default AuthOptions;
