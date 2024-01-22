"use client";

import { doc, setDoc } from "firebase/firestore";
import { Button } from "../ui/button";
import { db } from "@/backend/firebase";
import { toast } from "sonner";

interface VerifyPaymentButtonProps {
  paymentId: string;
  eventId: string;
  email: string;
}

const VerifyPaymentButton = ({
  paymentId,
  eventId,
  email,
}: VerifyPaymentButtonProps) => {
  function VerifyPayment() {
    const docRef = doc(db, "users", email, "payments", paymentId);
    setDoc(
      docRef,
      {
        verificationStatus: "completed",
      },
      {
        merge: true,
      }
    )
      .then(() => {
        toast("Verifed Payment Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Button onClick={VerifyPayment} className="w-full rounded-t-none">
      Accept Payment
    </Button>
  );
};

export default VerifyPaymentButton;
