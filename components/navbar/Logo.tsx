"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="Logo"
      className="hidden md:block cursor-pointer object-contain"
      height={100}
      width={100}
      src="/Airbnb_Logo_Bélo.svg"
    />
  );
};

export default Logo;
