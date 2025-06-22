"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import Button from "../components/ui/button";
import Image from "next/image";

export default function Home() {
  const { user, isSignedIn, isLoaded } = useUser();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();

  useEffect(() => {
    // Only check/create user if fully loaded and signed in
    if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      CheckUser();
    }
  }, [isLoaded, isSignedIn, user]);

  const CheckUser = async () => {
    try {
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress,
        imageUrl: user?.imageUrl,
        userName: user?.fullName,
        upgrade: false, // default
      });
      console.log(result);
    } catch (error) {
      console.error("User creation failed:", error);
    }
  };

  const handleGetStarted = () => {
    if (!isLoaded) return; // wait for Clerk to load

    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-center">
      {/* LOGO */}
      <div className="flex items-center justify-center mb-6">
        <Image src={"/pdf.png"} alt="logo" width={70} height={70} />
        <span className="text-black font-bold text-xl">AI </span>
        <span className="text-red-500 font-bold text-xl">PDF </span>
        <span className="text-blue-600 font-bold text-xl">NOTES</span>
      </div>

      {/* HEADING + SUBTEXT */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        Instantly Generate Notes from Your PDFs
      </h1>
      <p className="text-gray-600 mb-8 max-w-xl">
        Upload your course materials and let AI generate beautifully structured, ready-to-use notes.
        Save time, stay organized, and focus on what matters most — learning!
      </p>

      {/* GET STARTED */}
      <Button onClick={handleGetStarted} className="text-lg px-6 py-3">
        Get Started
      </Button>

      {/* OPTIONAL: Clerk user icon if signed in */}
      {isSignedIn && (
        <div className="mt-6">
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </main>
  );
}
