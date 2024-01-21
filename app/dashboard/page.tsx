import { db } from "@/backend/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

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
      return (
        <div className="h-fix w-screen container-fix">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="container-fix p-4 mx-auto w-full md:w-fit flex flex-col md:flex-row items-center gap-2 border border-white/30 rounded-lg">
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

            <p>No Event Passes Found in your Account</p>
          </div>
          <div className="flex gap-4 flex-col text-gray-400 my-8">
            <h1 className="text-left text-2xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
              Verification Pending Details
            </h1>

            <p>You have not registered for any events</p>
          </div>
        </div>
      );
    }
  }
};

export default DashboardPage;
