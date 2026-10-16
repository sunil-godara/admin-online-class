import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
//import { verifyUser } from "utils/api/common";

export const authOptions = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email address", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async credentials => {
        try {
          const params = {
            email: credentials.email,
            password: credentials.password,
            is_admin: true,
            remember_me: credentials.remember_me
          };

          const response = await axios.post(
            `${process.env.API_URL}/login`,
            params
          );
          const data = response.data;

          if (data.status) {
            return data.data;
          } else {
            throw new Error(data.message || "Invalid credentials");
          }
        } catch (error) {
          throw new Error(
            error?.response?.data?.message || error?.message || "Login failed"
          );
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === "update" && session) {
        token.user = { ...token.user, ...session?.user };
        return token;
      }

      if (user) {
        token.user = { ...user };
      }

      return token;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
    signOut: "/auth/signout"
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 50 * 60 * 60
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 50 * 60 * 60
  }
};

export default NextAuth(authOptions);
