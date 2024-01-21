import { ArrowRight } from "lucide-react";
import ParticleJs from "../Particle";
import Image from "next/image";
import SRMLogo from "@/images/srm-logo.png";

const Hero = () => {
  return (
    <div className="relative h-fix">
      <ParticleJs />
      <Image
        src={SRMLogo}
        width={1902}
        height={1080}
        alt="srm-logo"
        className="h-fit w-64 absolute right-0 top-0"
      />
      <div className="relative flex flex-col items-center justify-center h-fix gap-2 w-screen">
        <h1 className="text-center text-3xl font-bold md:text-5xl lg:text-7xl ">
          AI ZYPHER
        </h1>
        <p className="text-center text-xl md:text-2xl font-medium">
          Unleash the future
        </p>

        <div className="absolute animate-bounce md:animate-pulse text-white/90 md:right-0 bottom-0 text-xs md:bottom-14 md:rotate-90 flex flex-col md:flex-row items-center md:gap-2">
          Scroll Down <ArrowRight className="rotate-90 md:rotate-0 w-3 h-3 " />
        </div>
      </div>
    </div>
  );
};

export default Hero;
