"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import Button from "../components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      CheckUser();
    }
  }, [user]);

  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress || "",
      imageUrl: user?.imageUrl || "",
      userName: user?.fullName || "",
      upgrade: false, // ✅ Required by server
    });

    console.log(result);
    router.push("/dashboard"); // ✅ Redirect after creating user
  };

  // If already signed in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black px-4 text-center">
      {/* Logo */}
      <div className="mb-6 flex items-center justify-center">
        <Image src={"/pdf.png"} alt="logo" width={70} height={70} />
        <span className="text-black font-bold text-xl">AI </span>
        <span className="text-red-500 font-bold text-xl">PDF </span>
        <span className="text-blue-600 font-bold text-xl">NOTES</span>
      </div>

      {/* Hero Text */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
        Study Smarter with AI-Powered PDF Notes
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-6">
        Automatically extract concise and accurate notes from your study materials using the power of AI. Upload your PDFs and let our assistant help you ace your exams.
      </p>

      {/* Call to Action */}
      <Button onClick={() => router.push("/dashboard")}>Get Started</Button>

      {/* Optional: User profile icon for debugging / quick auth */}
      <div className="mt-6">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
