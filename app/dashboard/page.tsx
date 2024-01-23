import { db } from "@/backend/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import SignoutButton from "@/components/dashboard/SignOutBtn";
import { cn } from "@/lib/utils";
import VerifyQr from "@/components/dashboard/verifyQr";

const DashboardPage = async () => {
  const session = await getServerSession();
  if (!session) {
    return redirect("/");
  } else {
    const docRef = doc(db, "users", session.user?.email!);
    const currentUser = await getDoc(docRef);
    if (!currentUser.exists()) {
      return redirect("/");
    } else if (currentUser.data().registered === false)
      return redirect("/register");
    else {
      const user = currentUser.data();

      const paymentsRef = collection(
        db,
        "users",
        session.user?.email!,
        "payments"
      );

      const paymentsData = await getDocs(paymentsRef);
      const paymentsPromise = paymentsData.docs.map(async (payment) => {
        const eventId = payment.data().eventId;

        const eventDocRef = doc(db, "events", eventId);
        const event = await getDoc(eventDocRef);

        return {
          id: payment.id,
          ...payment.data(),
          eventData: event.data(),
        };
      });

      const payments = await Promise.all(paymentsPromise);

      return (
        <div className="h-fix w-screen container-fix">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="container-fix p-4 mx-auto w-full md:w-fit flex flex-col md:flex-row items-center gap-4 border border-white/30 rounded-lg">
              <Image
                src={session?.user?.image!}
                alt="profile-pic"
                width={1920}
                height={1080}
                className="w-20 h-20 rounded-full"
              />

              <div className="flex flex-col">
                <p className="font-semi-bold">{session?.user?.name}</p>
                <p className="font-semi-bold">{session?.user?.email}</p>
                <SignoutButton />
              </div>
            </div>
            <div className="container-fix p-4 mx-auto w-full md:w-fit grid grid-cols-1 gap-2 border border-white/30 rounded-lg">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold">
                  University Registration Number:
                </h1>
                <p className="text-ui-primary">{user.regNum}</p>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold">University Name:</h1>
                <p className="text-ui-primary">{user.university}</p>
              </div>

              <div className="flex items-center gap-2">
                <h1 className="font-semibold">Department:</h1>
                <p className="text-ui-primary">{user.department}</p>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold">Contact Number:</h1>
                <p className="text-ui-primary">{user.contact}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 flex-col text-gray-400 my-8">
            <h1 className="text-left text-2xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
              Your Passes
            </h1>

            {payments.filter(
              // @ts-ignore
              (payment) => payment?.verificationStatus === "completed"
            ).length === 0 ? (
              <p>You don&apos;t have any passes for the event</p>
            ) : (
              <div className="grid grid-cols-1 md:gris-cols-3 lg:grid-cols-4">
                {payments
                  .filter(
                    // @ts-ignore
                    (payment) => payment?.verificationStatus === "completed"
                  )
                  .map((payment, index) => {
                    console.log(payment);
                    return (
                      <div key={index} className="border rounded-lg">
                        <Image
                          alt="event-image"
                          className="rounded-t-lg"
                          src={payment?.eventData?.banner!}
                          width={1920}
                          height={1080}
                        />

                        <div className="p-2">
                          <h1 className="text-lg font-semibold">
                            {payment?.eventData?.title}
                          </h1>
                          <p className="text-sm text-ui-primary animate-pulse">
                            Status:{" "}
                            <span className="font-semibold">
                              Paid & Verified
                            </span>
                          </p>
                          <p className="mt-2">Teammates</p>
                          <div className="grid grid-cols-2">
                            {/* @ts-ignore */}
                            {Object.values(payment?.teammates)
                              .filter((teammate) => teammate != "")
                              .map((teammate, index) => {
                                {
                                  return (
                                    <p key={index}>
                                      {/* @ts-ignore */}
                                      {index + 1}. {teammate}
                                    </p>
                                  );
                                }
                              })}
                          </div>
                        </div>
                        <VerifyQr
                          // @ts-ignore
                          paymentStatus={payment?.verificationStatus}
                          eventTitle={payment?.eventData?.title}
                        />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
          <div
            className={cn(
              payments.filter(
                // @ts-ignore
                (payment) => payment?.verificationStatus === "pending"
              ).length === 0
                ? "hidden"
                : "flex gap-4 flex-col text-gray-400 my-8"
            )}
          >
            <h1 className="text-left text-2xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
              Verification Pending Details
            </h1>
            <div className="grid grid-cols-1 md:gris-cols-3 lg:grid-cols-4">
              {payments
                .filter(
                  // @ts-ignore
                  (payment) => payment?.verificationStatus === "pending"
                )
                .map((payment, index) => {
                  console.log(payment);
                  return (
                    <div key={index} className="border rounded-lg">
                      <Image
                        alt="event-image"
                        className="rounded-t-lg"
                        src={payment?.eventData?.banner!}
                        width={1920}
                        height={1080}
                      />
                      <div className="p-2">
                        <h1 className="text-lg font-semibold">
                          {payment?.eventData?.title}
                        </h1>
                        <p className="text-sm text-yellow-500 animate-pulse">
                          Status:{" "}
                          <span className="font-semibold">
                            {/* @ts-ignore */}
                            {payment?.verificationStatus.toUpperCase()}
                          </span>
                        </p>
                        <p className="mt-2">Teammates</p>
                        <div className="grid grid-cols-2">
                          {/* @ts-ignore */}
                          {Object.values(payment?.teammates)
                            .filter((teammate) => teammate != "")
                            .map((teammate, index) => {
                              {
                                return (
                                  <p key={index}>
                                    {/* @ts-ignore */}
                                    {index + 1}. {teammate}
                                  </p>
                                );
                              }
                            })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    }
  }
};

export default DashboardPage;
