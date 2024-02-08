"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StockBg from "@/images/stock-bg.jpeg";

const AboutPage = () => {
  const zypherDescription =
    `Welcome to ZYPHER 24, the flagship intercollege technical
  festival hosted by SRM Institute of Science and Technology's
  Department of Computer Science and Engineering on Feb 20 2024. This event is a celebration of
  intellect, innovation, and creativity, offering a diverse range of
  activities, from cutting-edge technical events like coding
  competitions and robotics challenges to non-technical pursuits
  such as art exhibitions and gaming competitions. Engage in an
  intensive hackathon, attend exclusive workshops and seminars by
  industry experts, and seize networking opportunities to connect
  with like-minded individuals and industry professionals. As we
  invite you to be part of this journey, consider sponsoring
  ZYPHER 24 to align your brand with innovation, gain exposure to
  a talented audience, and contribute to the advancement of
  technology. Contact our Sponsorship Coordinators today and join us
  in making ZYPHER 24 an unforgettable experience at the
  forefront of technological evolution. Don't miss the chance
  to be a catalyst for change at ZYPHER 24!`.split(" ");

  const srmDescription =
    `SRM Institute of Science and Technology (formerly known as SRM
    University) is one of the top ranking universities in India
    with over 20,000 students and 1,500 faculty, offering a wide
    range of undergraduate, postgraduate and doctoral programs in
    Engineering, Management, Medicine and Health sciences, Science
    and Humanities.`.split(" ");

  return (
    <div className="relative flex w-full flex-col font-montserrat items-center justify-center">
      <Image
        src={StockBg}
        width={1920}
        height={1080}
        alt="bg-image"
        className="-z-50 absolute top-0 opacity-40 h-full md:h-screen object-cover object-bottom"
      />
      <div className="w-full">
        <div className="w-full bg-[url('https://res.cloudinary.com/deibx8nfv/image/upload/v1679303224/texus2k23/bgoverlay_brtru3.png')] bg-center lg:bg-right bg-cover bg-no-repeat">
          <div className="p-4 md:p-16 max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                bounce: true,
              }}
              className="text-left text-2xl text-white font-semibold underline underline-offset-8 decoration-ui-primary"
            >
              About
            </motion.h1>
            <p className="text-gray-300 text-justify mt-3 text-base">
              {zypherDescription.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: (i + 1) / 100,
                    bounce: true,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
            </p>
          </div>
          <div className="flex items-center p-4 md:p-16 justify-center w-full">
            <div className="flex max-w-5xl mx-auto w-full flex-col lg:flex-row items-center justify-between">
              <div className="text lg:w-[80%] mr-[3%] lg:mt-[0px] mt-[50px]">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    bounce: true,
                  }}
                  className="text-left text-2xl text-white font-semibold underline underline-offset-8 decoration-ui-primary"
                >
                  About SRM Ramapuram
                </motion.h1>
                <p className="lg:text-right text-justify mt-3 text-gray-300">
                  {srmDescription.map((el, i) => (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: (i + 1) / 20,
                        bounce: true,
                      }}
                      key={i}
                    >
                      {el}{" "}
                    </motion.span>
                  ))}
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  bounce: true,
                }}
                className=" flex relative order-[-1] lg:order-[1]"
              >
                <Image
                  className="rounded-md w-fit h-32 hover:shadow-white/20 hover:shadow-xl transition-all duration-500"
                  src={require("@/images/event-logo.jpeg")}
                  alt="srm"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </div>
        I
      </div>
    </div>
  );
};

export default AboutPage;
