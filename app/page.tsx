import { db } from "@/backend/firebase";
import EventsBar from "@/components/home/EventsBar";
import Events from "@/components/home/EventsDivider";
import FAQs from "@/components/home/FAQs";
import Hero from "@/components/home/Hero";
import Sponsors from "@/components/home/Sponsors";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  if (session) {
    const docRef = doc(db, "users", session.user?.email!);
    const currentUser = await getDoc(docRef);

    if (currentUser.exists() && currentUser.data().registered === false)
      return redirect("/register");
    console.log("first");
  }

  return (
    <main className="">
      <Hero />
      <Events />
      <EventsBar />
      <Sponsors />
      <FAQs />
    </main>
  );
}
