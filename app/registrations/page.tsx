import { db } from "@/backend/firebase";

import DisplayCards from "@/components/verifications/DisplayCards";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const RegistrationsPage = async () => {
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

  const completedVerifications = await Promise.all(paymentsPromise);
  const filteredcompletedData = completedVerifications
    .filter((userData) => {
      if (userData.singleUserPayment.length !== 0) {
        const completed = userData.singleUserPayment.filter(
          (payment) => payment.payment.verificationStatus === "completed"
        );
        if (completed.length !== 0) {
          return true;
        }
      }
    })
    .map((userData) => {
      if (userData.singleUserPayment.length !== 0) {
        const completed = userData.singleUserPayment.filter(
          (payment) => payment.payment.verificationStatus === "completed"
        );
        if (completed.length !== 0) {
          return {
            user: userData,
            singleUserPayment: completed,
          };
        }
      }
    });

  return (
    <div className="container-fix">
      <h1 className="underline underline-offset-8 decoration-ui-primary font-semibold text-2xl text-center">
        Total Registrations{" "}
        <span className="bg-ui-primary text-black px-4 py-1 rounded-full w-4 h-4">
          {filteredcompletedData.length}
        </span>
      </h1>
      <div className="container-fix grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredcompletedData.length != 0 ? (
          filteredcompletedData.map((verification, index) => {
            return (
              <div key={index}>
                <DisplayCards verification={verification} />
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 font-bold md:col-span-2 lg:col-span-3">
            No Registrations Yet
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationsPage;
