import Image from "next/image";
import SuccessImage from "@/images/success.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

      <div>
        <p>
          Please Join the Whatsapp Group Link,{" "}
          <Button className="text-ui-primary" variant={"link"}>
            <Link href={"https://chat.whatsapp.com/G3SGuQDXQ4kBlqWqYdcZnO"}>
              Click Here
            </Link>
          </Button>{" "}
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
