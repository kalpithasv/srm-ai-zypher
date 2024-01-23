"use client";

import Image from "next/image";
import VerifyPaymentButton from "./VerifyPaymentButton";
import { Button } from "../ui/button";
import VerifyButton from "./VerifyPaymentButton";

interface DisplayCardsProps {
  verification: any;
}

const DisplayCards = ({ verification }: DisplayCardsProps) => {
  return (
    <div className="border">
      {verification.singleUserPayment.map((payment: any, index: number) => {
        const teammates: string[] = Object.values(payment.payment.teammates);
        return (
          <div key={index}>
            <Image
              alt="event-banner"
              src={payment.eventDetails.banner}
              className="rounded-t-lg rounded-b-none"
              width={1920}
              height={1080}
            />
            <div className="p-2 text-gray-500 ">
              <p className=" font-semibold">{payment.eventDetails.title}</p>

              <div className="grid grid-cols-2 my-2">
                <p className=" font-semibold col-span-2">Teammates</p>
                {teammates
                  .filter((teammate: string) => teammate != "")
                  .map((teammate: string, index: number) => {
                    return (
                      <p key={index}>
                        {index + 1}. {teammate}
                      </p>
                    );
                  })}
              </div>
              <p className="text-xs text-yellow-500">
                Payment Made by {verification.user.user.name}
              </p>
            </div>

            <VerifyButton
              email={verification.user.user.email}
              payment={payment.payment}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayCards;
