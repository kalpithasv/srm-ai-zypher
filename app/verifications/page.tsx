import { db } from "@/backend/firebase";
import { Button } from "@/components/ui/button";
import DisplayCards from "@/components/verifications/DisplayCards";
import VerifyPaymentButton from "@/components/verifications/VerifyPaymentButton";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";

const VerificationsPage = async () => {
  const colRef = collection(db, "users");
  const allUsersData = await getDocs(colRef);

  const paymentsPromise = allUsersData.docs.map(async (user) => {
    const singleUserPaymentRef = collection(db, "users", user.id, "payments");
    const singleUserPayment = await getDocs(singleUserPaymentRef);

    const paymentsPromise = singleUserPayment.docs.map(async (userPayment) => {
      const eventId = userPayment.data()?.eventId;

      const eventDetailsRef = doc(db, "events", eventId);
      const eventDetails = await getDoc(eventDetailsRef);

      return {
        payment: userPayment.data(),
        eventDetails: eventDetails.data(),
      };
    });

    return {
      user: user.data(),
      singleUserPayment: await Promise.all(paymentsPromise),
    };
  });

  const pendingVerifications = await Promise.all(paymentsPromise);
  const filteredPendingData = pendingVerifications
    .filter((userData) => {
      if (userData.singleUserPayment.length !== 0) {
        const pending = userData.singleUserPayment.filter(
          (payment) => payment.payment.verificationStatus === "pending"
        );
        if (pending.length !== 0) {
          return true;
        }
      }
    })
    .map((userData) => {
      if (userData.singleUserPayment.length !== 0) {
        const pending = userData.singleUserPayment.filter(
          (payment) => payment.payment.verificationStatus === "pending"
        );
        if (pending.length !== 0) {
          return {
            user: userData,
            singleUserPayment: pending,
          };
        }
      }
    });

  return (
    <div className="container-fix">
      <h1 className="underline underline-offset-8 decoration-ui-primary font-semibold text-2xl text-center">
        Pending Verifications
      </h1>
      <div className="container-fix grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPendingData.length != 0 ? (
          filteredPendingData.map((verification, index) => {
            return (
              <div key={index}>
                <DisplayCards verification={verification} />
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 font-bold md:col-span-2 lg:col-span-3">
            No Pending Verifications
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationsPage;
