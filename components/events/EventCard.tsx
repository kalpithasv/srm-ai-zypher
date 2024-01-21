"use client";

import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: EventType;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="border border-white/20 rounded-lg hover:scale-105 duration-300 ease-in-out transition-all cursor-pointer active:scale-100">
        <Image
          alt="event-banner"
          src={event.banner}
          width={1920}
          height={1080}
          referrerPolicy="origin-when-cross-origin"
          className="w-fit h-fit rounded-t-lg"
        />

        <div className="p-4 flex flex-col gap-4">
          <p className="text-2xl">{event.title}</p>
          <p className="text-sm line-clamp-3">{event.desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
