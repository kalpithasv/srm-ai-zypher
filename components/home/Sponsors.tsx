import Marquee from "react-fast-marquee";
import Image, { StaticImageData } from "next/image";

const Sponsors = () => {
  const sponsorImages: StaticImageData[] = [
    require("@/images/sponsors/A R PNG.png"),
    require("@/images/sponsors/Original.png"),
    require("@/images/sponsors/WhatsApp Image 2024-02-16 at 11.13.53.jpeg"),
    require("@/images/sponsors/WhatsApp Image 2024-02-16 at 11.44.20.jpeg"),
  ];
  return (
    <div className="bg-ui-lightBg py-4 px-4 md:px-16">
      <h1 className="text-center text-2xl text-black font-semibold underline underline-offset-8 decoration-ui-primary">
        Sponsors
      </h1>
      <Marquee
        direction="right"
        gradientColor="white"
        className="w-screen h-fit  text-black p-4"
        speed={50}
        pauseOnHover
        autoFill
      >
        <div className="flex items-stretch gap-8 mt-4 mx-4">
          {sponsorImages.map((image: StaticImageData, index: number) => {
            return (
              <div
                className="bg-white px-4 py-2 flex items-center rounded-md shadow-sm"
                key={index}
              >
                <Image
                  alt="sponsor-image"
                  src={image}
                  className="h-fit  w-20 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out object-contain"
                />
              </div>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default Sponsors;
