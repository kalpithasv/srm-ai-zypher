import { db } from "@/backend/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ profile }) {
      const docRef = doc(db, "users", profile?.email!);
      const currentUser = await getDoc(docRef);
      if (profile?.email === "vetrichanakyha2003@gmail.com") return true;

      await setDoc(docRef, { ...profile, registered: false }, { merge: true });

      return false;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
