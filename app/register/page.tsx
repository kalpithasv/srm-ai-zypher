import { db } from "@/backend/firebase";
import RegistrationForm from "@/components/register/RegistrationForm";
import { doc, getDoc } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession();
  if (session) {
    const docRef = doc(db, "users", session.user?.email!);
    const currentUser = await getDoc(docRef);

    if (currentUser.exists() && currentUser.data().registered === true)
      return redirect("/");
  }

  return (
    <div className="w-screen container-fix">
      <h1 className="text-center text-2xl text-white font-semibold underline underline-offset-8 decoration-ui-primary">
        Get Registered
      </h1>

      <RegistrationForm
        name={session?.user?.name!}
        email={session?.user?.email!}
      />
    </div>
  );
};

export default RegisterPage;
