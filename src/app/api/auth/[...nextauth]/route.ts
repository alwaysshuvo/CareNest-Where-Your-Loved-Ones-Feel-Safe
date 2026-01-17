import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    /**
     * 🔑 Runs on every successful login
     */
    async signIn({ user, account }) {
      try {
        const client = await clientPromise;
        const db = client.db("carenestDB");
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await usersCollection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image || null,
            provider: account?.provider, // google | github
            role: "user",
            createdAt: new Date(),
            lastLogin: new Date(),
          });
        } else {
          await usersCollection.updateOne(
            { email: user.email },
            { $set: { lastLogin: new Date() } }
          );
        }

        return true;
      } catch (error) {
        console.error("User DB save error:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
