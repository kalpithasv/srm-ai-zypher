import Image from "next/image";
import EventBanner from "@/images/event-banner.jpeg";

const EventsPage = () => {
  return (
    <div className="h-fix w-screen">
      <div className="container-fix">
        <Image
          alt="event-banner"
          src={EventBanner}
          width={1920}
          height={1080}
          className="w-full h-full xl:max-w-6xl xl:mx-auto rounded-lg"
        />

        <h1>Events</h1>
      </div>
    </div>
  );
};

export default EventsPage;
