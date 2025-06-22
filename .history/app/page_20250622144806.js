"use client"

import { UserButton, useUser } from "@clerk/nextjs";
import Button from "../components/ui/button.jsx";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api.js";
import { useEffect } from "react";

export default function Home() {

  const { user } = useUser();
  const createUser = useMutation(api.user.createUser)

  useEffect(() => {
     user && CheckUser()
  }, [user])

  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName
    });

    console.log(result)
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Hello World</h2>
      <Button>Subscribe</Button>

      <UserButton />
    </div>
  );
}
