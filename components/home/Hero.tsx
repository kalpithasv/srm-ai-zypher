"use client";

import { ArrowRight } from "lucide-react";
import ParticleJs from "../Particle";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn, getTimeRemaining } from "@/lib/utils";

const eventDate = new Date("February 20, 2024 7:30:00");

const Hero = () => {
  const text = "ZYPHER'24".split("");

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setInterval(() => {
      setTimeRemaining(getTimeRemaining(eventDate));
    }, 1000);
  }, []);

  return (
    <div className="relative h-fix">
      <ParticleJs />
      <div className="relative flex flex-col items-center justify-center h-fix gap-2 w-screen">
        <div className="bg-white/5 backdrop-blur-sm p-16">
          <h1 className="text-center text-3xl font-bold md:text-5xl lg:text-7xl ">
            {text.map((el, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 2,
                  delay: i / 10,
                  bounce: true,
                }}
                key={i}
              >
                {el}{" "}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              delay: 1,
            }}
            className="text-center text-xs md:text-base font-medium"
          >
            Unleash the future
          </motion.p>

          <div className="grid grid-cols-2 md:flex md:flex-row md:justify-center gap-2 md:gap-4 my-8">
            <TimeCard type="Days" time={timeRemaining.days} />
            <TimeCard type="Hours" time={timeRemaining.hours} />
            <TimeCard type="Minutes" time={timeRemaining.minutes} />
            <TimeCard type="Seconds" time={timeRemaining.seconds} />
          </div>
        </div>
        <div className="absolute animate-bounce md:animate-pulse text-white/90 md:right-0 bottom-20 text-xs md:bottom-14 md:rotate-90 flex flex-col md:flex-row items-center md:gap-2">
          Scroll Down <ArrowRight className="rotate-90 md:rotate-0 w-3 h-3 " />
        </div>
      </div>
    </div>
  );
};

export default Hero;

interface TimeCardProps {
  time: number;
  className?: string;
  type: "Days" | "Hours" | "Minutes" | "Seconds";
}

const TimeCard = ({ time, className, type }: TimeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        delay: 1.3,
      }}
      className={cn(className, "flex flex-col items-center")}
    >
      <div className="gradient p-2 rounded-md flex items-center justify-center w-16 h-w-16 md:w-20 md:h-20 text-2xl font-bold text-black">
        {time}
      </div>
      <p className="text-center font-semibold text-xs md:text-sm">{type}</p>
    </motion.div>
  );
};
