import { db } from "@/backend/firebase";
import EventRegistrationCard from "@/components/registrations/EventRegisteredCard";
import VerifyPaymentButton from "@/components/verifications/VerifyPaymentButton";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import Image from "next/image";

const Registrations = async () => {
  async function fetchPaymentsFromUsersCollection() {
    const usersCollection = collection(db, "users");

    try {
      const usersQuerySnapshot = await getDocs(usersCollection);

      const paymentsPromises = usersQuerySnapshot.docs.map(async (userDoc) => {
        const userId = userDoc.id;
        const paymentsCollection = collection(db, "users", userId, "payments");

        const paymentsQuerySnapshot = await getDocs(paymentsCollection);

        const payments = paymentsQuerySnapshot.docs
          .filter((paymentDoc) => {
            return paymentDoc.data().verificationStatus === "completed";
          })
          .map((paymentDoc) => {
            return {
              paymentId: paymentDoc.id,
              ...paymentDoc.data(),
            };
          });

        return { userId, payments };
      });

      const paymentsData = await Promise.all(paymentsPromises);

      return paymentsData;
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }
  }

  const data = await fetchPaymentsFromUsersCollection();
  console.log(data);
  return (
    <div className="container-fix">
      <h1 className="underline underline-offset-8 decoration-ui-primary font-semibold text-2xl text-center">
        Registrations
      </h1>

      <div>
        {data.map((verifications, index) => {
          if (verifications.payments.length === 0) return;

          return (
            <div className="border container-fix my-8 rounded-lg" key={index}>
              <p className="font-semibold text-ui-primary">
                Email Id:{" "}
                <span className="font-medium text-white">
                  {verifications.userId}
                </span>
              </p>

              <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 py-4">
                {verifications.payments.map(async (payment, index) => {
                  // @ts-ignore
                  const eventDoc = doc(db, "events", payment?.eventId);
                  const events = await getDoc(eventDoc);

                  if (!events) return;
                  // @ts-ignore
                  const banner = events?.data().banner;

                  return (
                    <EventRegistrationCard
                      // @ts-ignore
                      key={index}
                      payment={payment}
                      //   @ts-ignore
                      verifications={verifications}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Registrations;
