import EventsDescription from "@/components/events/EventDescription";

import { db } from "@/backend/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Metadata, ResolvingMetadata } from "next";

interface EventsDescriptionPageProps {
  params: {
    eventId: string;
  };
}

type Props = {
  params: { eventId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const eventId = params.eventId;
  const eventRef = doc(db, "events", eventId);
  const eventData = await getDoc(eventRef);

  if (!eventData.exists()) {
    return {
      title: "Event Not Fount",
      description: "Zypher 2024",
    };
  }

  return {
    title: eventData.data().title,
    description: eventData.data().desc,
  };
}

const EventsDescriptionPage = async ({
  params,
}: EventsDescriptionPageProps) => {
  const eventId = params.eventId;
  const eventRef = doc(db, "events", eventId);
  const eventData = await getDoc(eventRef);

  if (!eventData.exists())
    return (
      <p className="h-fix text-destructive flex justify-center items-center font-medium text-2xl animate-pulse">
        Event not found
      </p>
    );

  const event = {
    id: eventData.id,
    ...eventData.data(),
  } as EventType;

  return (
    <div className="h-fix w-screen">
      <EventsDescription event={event} />
    </div>
  );
};

export default EventsDescriptionPage;
