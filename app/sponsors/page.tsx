import { sponsorImages } from "@/lib/constants";
import Image, { StaticImageData } from "next/image";

const SponsorsPage = () => {
  return (
    <div className="h-fix w-screen">
      <div className="container-fix">
        <h1 className="text-center text-2xl font-semibold underline underline-offset-8 decoration-ui-primary">
          Sponsors
        </h1>

        <div className="container-fix grid grid-cols-1 gap-4">
          <SponsorCategory images={sponsorImages} title="Souvenir Sponsors" />
          {/* <SponsorCategory images={sponsorImages} title="Certificate Sponsor" />
          <SponsorCategory images={sponsorImages} title="Logistics Partner" />
          <SponsorCategory images={sponsorImages} title="Beverage Sponsor" /> */}
        </div>
      </div>
    </div>
  );
};

export default SponsorsPage;

interface SponsorCategoryProps {
  title: string;
  images: StaticImageData[];
}

const SponsorCategory = ({ title, images }: SponsorCategoryProps) => {
  return (
    <div className="">
      <h1 className="text-left text-lg font-semibold underline underline-offset-8 decoration-ui-primary">
        {title}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-4 my-4 items-stretch">
        {images.map((image, index) => {
          return (
            <div
              key={index}
              className="bg-white flex items-center px-4 py-2 rounded-lg"
            >
              <Image
                src={image}
                alt="sponsor-image"
                width={1920}
                height={1080}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
