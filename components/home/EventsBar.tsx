"use client";

import BG from "@/images/eventsbar-bg.jpeg";
import { cn } from "@/lib/utils";
import {
  Gamepad2Icon,
  GitCompare,
  LucideIcon,
  TerminalSquareIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const EventsBar = () => {
  return (
    <div className="h-full w-screen relative bg-black">
      <Image
        src={BG}
        alt="bg-image"
        width={1920}
        height={1080}
        className="w-full h-full absolute top-0  opacity-40 object-cover object-center"
      />
      <div className="container-fix">
        <div className="flex flex-col items-center">
          <h1 className="z-10 text-center text-2xl  font-semibold underline underline-offset-8 decoration-ui-primary">
            Events Category
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 container-fix px-0 md:px-16 xl:max-w-6xl">
            <Card
              title="Technical Events"
              Icon={TerminalSquareIcon}
              description="Technical events are gatherings or conferences that focus on various aspects of technology, innovation, and industry-specific advancements. These events serve as platforms for professionals, experts, enthusiasts, and industry leaders to come together, share knowledge, and discuss the latest trends and developments in their respective fields."
            />
            <Card
              title="Non Technical Events"
              Icon={Gamepad2Icon}
              description="Occaecat ut esse cillum sint velit qui velit mollit Lorem ad. Amet aliqua aute consectetur irure enim aliquip cillum ut. Ullamco aliqua eu non ea proident minim et dolore aliqua consequat labore laborum qui."
            />
            <Card
              title="Hackathon"
              Icon={GitCompare}
              description="Non exercitation do nulla et eu voluptate nostrud et reprehenderit adipisicing quis. Anim anim qui magna quis officia sint ea commodo proident ex tempor aliquip magna. Nostrud et veniam occaecat consequat excepteur aliquip veniam exercitation."
              className="md:col-span-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsBar;

interface CardProps {
  className?: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

const Card = ({ className, title, description, Icon }: CardProps) => {
  const ICON = Icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 1,
      }}
      className={cn(
        className,
        "group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/40 sm:mx-auto sm:rounded-lg sm:px-10"
      )}
    >
      <span className="absolute top-10 z-0 h-20 w-20 invisible group-hover:visible rounded-full gradient transition-all duration-700 group-hover:w-full group-hover:h-full group-hover:scale-150"></span>
      <div className="relative z-10 ">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-ui-primary transition-all duration-300 group-hover:bg-ui-primary/90 group-hover:border group-hover:border-white/80">
            <ICON className="h-10 w-10 text-white transition-all" />
          </span>

          <p className="space-y-6 text-center md:text-left font-semibold text-base line-clamp-2 leading-7 text-gray-600 transition-all duration-300 group-hover:text-black">
            {title}
          </p>
          <Button
            className="lg:ml-auto group-hover:text-white/90"
            variant={"secondary"}
            asChild
          >
            <Link href={"/events"}>Explore</Link>
          </Button>
        </div>
        <div className="space-y-6 pt-5 text-sm text-justify font-medium text-gray-600 transition-all duration-500">
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};
