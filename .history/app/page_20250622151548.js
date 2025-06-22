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

  <main className="min-h-screen bg-gradient-to-r from-white via-[#f8f8ff] to-[#e6f0ff]">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center justify-center">
          <Image src={"/pdf.png"} alt="logo" width={70} height={70} />
          <span className="text-black font-bold text-xl ml-1">AI</span>
          <span className="text-red-500 font-bold text-xl ml-1">PDF</span>
          <span className="text-blue-600 font-bold text-xl ml-1">NOTES</span>
        </div>

        <nav className="space-x-6 text-gray-700 font-medium hidden md:flex">
          <Link href="#">Features</Link>
          <Link href="#">Solution</Link>
          <Link href="#">Testimonials</Link>
          <Link href="#">Blog</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Instantly Generate <span className="text-red-500">Notes</span> from Your{" "}
          <span className="text-blue-500">PDFs</span> using{" "}
          <span className="text-black">AI</span>
        </h1>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Upload your course materials and let AI convert them into structured, ready-to-revise notes.
          Fast. Clean. Smart.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Button
            className="text-lg px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          <button className="bg-gray-200 text-black px-6 py-3 rounded-full font-medium hover:bg-gray-300">
            Learn more
          </button>
        </div>

        {isSignedIn && (
          <div className="mt-6">
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 text-center px-10 md:px-24 py-12 gap-10">
        <div>
          <h3 className="font-bold text-lg">The lowest price</h3>
          <p className="text-gray-500">
            Free plan includes 5 PDF uploads and basic AI features to get you started.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg">The fastest on the market</h3>
          <p className="text-gray-500">
            Receive AI-generated summaries and insights in under 3 seconds.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg">The most loved</h3>
          <p className="text-gray-500">
            Used by 10K+ students globally to make revision quick and effective.
          </p>
        </div>
      </section>
    </main>
  );
}
