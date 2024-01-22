import { db } from "@/backend/firebase";
import Hero from "@/components/home/Hero";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    const docRef = doc(db, "users", session.user?.email!);
    const currentUser = await getDoc(docRef);

    if (currentUser.exists() && currentUser.data().registered === false)
      return redirect("/register");
  }

  return (
    <main className="">
      <Hero />
    </main>
  );
}
