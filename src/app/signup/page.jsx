"use client";
import React, { useState } from "react";
import Logo from "../../../public/images/twitterLogo.avif";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { 
  useRegisterMutation
 } from "@/hooks/registerHook";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const registerMutation = useRegisterMutation();

  const handleRegister = () => {
    registerMutation.mutate(user);
  };

  return (
    <div className='w-screen h-screen flex justify-center'>
      <div className='w-1/5 mt-20'>
        <div className='flex justify-center'>
          <Image src={Logo} className='h-auto w-20' alt='logo' />
        </div>
        <p className='text-2xl text-center font-bold mb-10'>
          Register your account
        </p>
        <div className='mt-8'>
          <Label className={"mb-2"}>Name</Label>
          <Input
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className={"mb-4"}
            type='text'
          />
          <Label className={"mb-2"}>Email</Label>
          <Input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className={"mb-4"}
            type='text'
          />
          <Label className={"mb-2"}>Password</Label>
          <Input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className={"mb-4"}
            type='text'
          />
          <Button
            onClick={handleRegister}
            variant={"secondary"}
            className={"rounded-full w-full mb-5"}
          >
            {registerMutation.isPending ? "Registering" : "Signup"}
          </Button>
        </div>
        <p className='text-center font-semibold mt-10 mb-5'>
          Already have an account
        </p>
        <Button
          onClick={() => router.push("/")}
          variant={"secondary"}
          className={"rounded-full w-full"}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
