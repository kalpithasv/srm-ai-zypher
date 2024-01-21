import BG from "@/images/eventsbar-bg.jpg";
import Image from "next/image";

const EventsBar = () => {
  return (
    <div className="h-fix w-screen relative bg-black">
      <Image
        src={BG}
        alt="bg-image"
        width={1920}
        height={1080}
        className="w-full h-full absolute top-0 -z-0 opacity-10 object-cover object-center"
      />
    </div>
  );
};

export default EventsBar;
