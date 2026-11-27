import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Portfolio Account",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Edward Tiyari" },
      },
      async authorize(credentials) {
        const username =
          typeof credentials?.username === "string" && credentials.username.trim()
            ? credentials.username.trim()
            : "Edward Tiyari";
        return {
          id: "1",
          name: username,
          email: "edward@portfolio.dev",
        };
      },
    }),
  ],
});
