"use client";

import { Button } from "@/components/ui/button";
import { signOut as serverSignOut } from "@/lib/actions/auth.action";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { auth } from "../firebase/client";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);

      await serverSignOut();

      toast.success("Signed out successfully.");
      router.push("/sign-in");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign out. Try again.");
    }
  };

  return (
    <Button onClick={handleSignOut} className="btn-primary">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
