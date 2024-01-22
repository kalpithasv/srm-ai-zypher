import { db } from "@/backend/firebase";
import { Button } from "@/components/ui/button";
import VerifyPaymentButton from "@/components/verifications/VerifyPaymentButton";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

const VerificationsPage = async () => {
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
            return paymentDoc.data().verificationStatus === "pending";
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
        Pending Verifications
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
                {verifications.payments.map((payment, index) => {
                  return (
                    <div
                      key={index}
                      className="active:scale-95 transition-all ease-in-out duration-300 border rounded-lg cursor-pointer"
                    >
                      <Image
                        //   @ts-ignore
                        src={payment?.paymentScreenshot}
                        alt="eventBanner"
                        width={1920}
                        height={1080}
                        className="rounded-t-lg"
                      />
                      <div className="p-2">
                        <p className="text-ui-primary font-semibold">
                          Transaction ID:{" "}
                          <span className="text-white">
                            {payment?.paymentId}
                          </span>
                        </p>
                        <p className="text-ui-primary font-semibold">
                          Event ID: {/* @ts-ignore */}
                          <span className="text-white">{payment?.eventId}</span>
                        </p>
                      </div>
                      <VerifyPaymentButton
                        /* @ts-ignore */
                        paymentId={payment?.paymentId}
                        /* @ts-ignore */
                        eventId={payment?.eventId}
                        email={verifications.userId}
                      />
                    </div>
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

export default VerificationsPage;
