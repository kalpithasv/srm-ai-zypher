"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const SignoutButton = () => {
  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        signOut();
      }}
      className="mt-2"
    >
      Sign Out
    </Button>
  );
};

export default SignoutButton;
