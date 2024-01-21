import { StarIcon } from "lucide-react";
import Marquee from "react-fast-marquee";

const EventsDivider = () => {
  return (
    <Marquee
      direction="right"
      gradientColor="white"
      className="w-screen h-fit bg-ui-lightBg text-black p-4"
      speed={100}
      pauseOnHover
      autoFill
    >
      <div className="flex items-center gap-4 mx-2">
        <p className="text-lg uppercase font-semibold">Technical Events</p>
        <StarIcon className="text-black fill-ui-primary" />
        <p className="text-lg uppercase font-semibold">Non-Technical Events</p>
        <StarIcon className="text-black fill-ui-primary" />
        <p className="text-lg uppercase font-semibold">Hackathon</p>
        <StarIcon className="text-black fill-ui-primary" />
      </div>
    </Marquee>
  );
};

export default EventsDivider;
