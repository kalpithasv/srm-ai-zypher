import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col font-montserrat items-center justify-center">
      <div className="w-full">
        <div className="w-full bg-[url('https://res.cloudinary.com/deibx8nfv/image/upload/v1679303224/texus2k23/bgoverlay_brtru3.png')] bg-center lg:bg-right bg-cover bg-no-repeat">
          <div className="p-4 md:p-16 max-w-6xl mx-auto">
            <h1 className="text-left text-2xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
              About
            </h1>
            <p className="text-gray-300 text-justify mt-3 text-base">
              Welcome to AI-ZYPHER 24, the flagship intercollege technical
              festival hosted by SRM Institute of Science and Technology&apos;s
              Department of Computer Science and Engineering on April 21st and
              22nd, 2023. This two-day extravaganza is a celebration of
              intellect, innovation, and creativity, offering a diverse range of
              activities, from cutting-edge technical events like coding
              competitions and robotics challenges to non-technical pursuits
              such as art exhibitions and gaming competitions. Engage in an
              intensive hackathon, attend exclusive workshops and seminars by
              industry experts, and seize networking opportunities to connect
              with like-minded individuals and industry professionals. As we
              invite you to be part of this journey, consider sponsoring
              AI-ZYPHER 24 to align your brand with innovation, gain exposure to
              a talented audience, and contribute to the advancement of
              technology. Contact our Sponsorship Coordinators today and join us
              in making AI-ZYPHER 24 an unforgettable experience at the
              forefront of technological evolution. Don&apos;t miss the chance
              to be a catalyst for change at AI-ZYPHER 24!
            </p>
          </div>
          <div className="flex items-center p-4 md:p-16 justify-center w-full">
            <div className="flex max-w-5xl mx-auto w-full flex-col lg:flex-row items-center justify-between">
              <div className="text lg:w-[60%] mr-[3%] lg:mt-[0px] mt-[50px]">
                <h1 className="text-left text-2xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
                  About SRM Ramapuram
                </h1>
                <p className="lg:text-right text-justify mt-3 text-gray-300">
                  SRM Institute of Science and Technology (formerly known as SRM
                  University) is one of the top ranking universities in India
                  with over 20,000 students and 1,500 faculty, offering a wide
                  range of undergraduate, postgraduate and doctoral programs in
                  Engineering, Management, Medicine and Health sciences, Science
                  and Humanities.
                </p>
              </div>
              <div className="lg:w-[600px flex relative order-[-1] lg:order-[1]">
                <Image
                  className="rounded-md w-fit h-32"
                  src={require("@/images/event-logo.png")}
                  alt="srm"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
