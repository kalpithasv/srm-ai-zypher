import EventsDescription from "@/components/events/EventDescription";

import { db } from "@/backend/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface EventsDescriptionPageProps {
  params: {
    eventId: string;
  };
}

const EventsDescriptionPage = async ({
  params,
}: EventsDescriptionPageProps) => {
  const session = await getServerSession();
  if (session) {
    const docRef = doc(db, "users", session.user?.email!);
    const currentUser = await getDoc(docRef);

    if (currentUser.exists() && currentUser.data().registered === false)
      return redirect("/register");
  }

  const eventId = params.eventId;
  const eventRef = doc(db, "events", eventId);
  const eventData = await getDoc(eventRef);

  if (!eventData.exists()) return <p>Page not found</p>;

  const event = {
    id: eventData.id,
    ...eventData.data(),
  } as EventType;

  return (
    <div className="h-fix w-screen bg-black">
      <EventsDescription event={event} />
    </div>
  );
};

export default EventsDescriptionPage;
