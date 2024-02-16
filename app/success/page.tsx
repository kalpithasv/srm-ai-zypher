import Image from "next/image";
import SuccessImage from "@/images/success.png";

const SuccessPage = () => {
  return (
    <div className="h-fix flex flex-col items-center justify-center">
      <Image
        src={SuccessImage}
        width={1920}
        height={1080}
        className="w-fit h-96 animate-bounce"
        alt="success-image"
      />
      <p className="font-semi-bold text-ui-primary text-2xl">
        Payment Successful
      </p>
    </div>
  );
};

export default SuccessPage;
