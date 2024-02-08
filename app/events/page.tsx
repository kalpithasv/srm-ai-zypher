import { db } from "@/backend/firebase";
import EventCard from "@/components/events/EventCard";
import { cn } from "@/lib/utils";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import BgImage from "@/images/events-bg.jpeg";
import { redirect } from "next/navigation";

const EventsPage = async () => {
  const eventsRef = collection(db, "events");
  const eventsData = await getDocs(eventsRef);

  const events: EventType[] = eventsData.docs.map((event) => {
    const data = event.data();
    return {
      id: event.id,
      title: data.title,
      desc: data.desc,
      team_size: data.team_size,
      student_co: data.student_co,
      faculty_co: data.faculty_co,
      entry_fee: data.entry_fee,
      banner: data.banner,
      rules: data.rules,
      venue: data.venue,
      time: data.time,
      type: data.type,
      form: data.form,
    };
  });

  return (
    <div className="h-fix w-screen relative">
      <Image
        src={BgImage}
        alt="bg-image"
        width={1920}
        height={1080}
        className="opacity-20 h-full w-full object-cover object-top absolute top-0 -z-50"
      />
      <div className="md:p-16 md:pb-0 xl:max-w-7xl xl:mx-auto">
        <Image
          alt="event-banner"
          src={
            "https://firebasestorage.googleapis.com/v0/b/srm-ai-zypher.appspot.com/o/WhatsApp%20Image%202024-02-06%20at%2015.47.53.jpeg?alt=media&token=7831ebd3-3b2b-4001-9e2e-e860905ca35d"
          }
          width={1920}
          height={1080}
          className="w-full h-full md:rounded-lg"
          loading="lazy"
          referrerPolicy="origin-when-cross-origin"
        />
      </div>
      <div className="container-fix">
        <div
          className={cn(
            events.filter((event) => event.type == "technical").length === 0
              ? "hidden"
              : ""
          )}
        >
          <h1 className="text-center md:text-left text-lg md:text-2xl font-semibold underline underline-offset-8 decoration-ui-primary">
            Technical Events
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-4 md:my-16 gap-4 items-x">
            {events
              .filter(
                (event) =>
                  event.type == "technical" || event.type == "hackathon"
              )
              .map((event, index) => {
                return <EventCard key={index} event={event} />;
              })}
          </div>
        </div>
        <div
          className={cn(
            events.filter((event) => event.type == "non-technical").length === 0
              ? "hidden"
              : ""
          )}
        >
          <h1 className="text-center md:text-left text-lg md:text-2xl font-semibold underline underline-offset-8 decoration-ui-primary">
            Non Technical Events
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-4 md:my-16 gap-4">
            {events
              .filter((event) => event.type == "non-technical")
              .map((event, index) => {
                return <EventCard key={index} event={event} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
