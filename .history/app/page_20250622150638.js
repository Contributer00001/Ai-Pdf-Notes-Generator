"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import Button from "../components/ui/button";
import Image from "next/image";

export default function Home() {
  const { user, isSignedIn, isLoaded } = useUser();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();

  // ✅ Create user if signed in
  useEffect(() => {
    if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress) {
      createUser({
        email: user.primaryEmailAddress.emailAddress,
        imageUrl: user.imageUrl,
        userName: user.fullName,
        upgrade: false,
      }).then(() => {
        router.push("/dashboard");
      });
    }
  }, [isLoaded, isSignedIn, user]);

  // ✅ Handle "Get Started" button
  const handleGetStarted = () => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-up?redirect_url=/dashboard");
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <Image src={"/pdf.png"} alt="logo" width={70} height={70} />
        <span className="text-black font-bold text-xl">AI </span>
        <span className="text-red-500 font-bold text-xl">PDF </span>
        <span className="text-blue-600 font-bold text-xl">NOTES</span>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Instantly Generate Notes from Your PDFs
      </h2>

      {/* Subtext */}
      <p className="text-gray-600 mb-6 text-center max-w-lg">
        Upload your course materials and let AI convert them into structured, ready-to-revise notes.
        Fast. Clean. Smart.
      </p>

      {/* Get Started */}
      <Button onClick={handleGetStarted} className="text-lg px-6 py-3">
        Get Started
      </Button>

      {/* Optional: Show Clerk icon if signed in */}
      {isSignedIn && (
        <div className="mt-6">
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
}
