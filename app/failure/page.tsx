import Image from "next/image";
import SuccessImage from "@/images/success.png";

const FailurePage = () => {
  return (
    <div className="h-fix flex flex-col items-center justify-center">
      <p className="font-semi-bold text-ui-primary text-2xl">
        Payment Failed, Please Try again
      </p>
    </div>
  );
};

export default FailurePage;
