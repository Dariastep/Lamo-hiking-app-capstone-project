import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const providers = [
  GithubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),

  CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "username" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      // Implement your custom logic for validating credentials and signing in here
      if (credentials.username === "lamo" && credentials.password === "lamo") {
        return {
          id: "1",
          name: "Daria",
          email: "d.stepanova1993@gmail.com",
        };
      } else {
        return null;
      }
    },
  }),
];

export const authOptions = {
  providers,
};

export default NextAuth(authOptions);
