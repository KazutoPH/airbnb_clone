"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  // console.log(src);
  return (
    <Image
      className="rounded-full"
      alt="Avatar"
      height={30}
      width={30}
      src={src || "/avatar-placeholder.png"}
    />
  );
};

export default Avatar;
