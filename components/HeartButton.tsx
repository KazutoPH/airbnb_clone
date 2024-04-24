"use client";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeCurrentUser } from "@/types";
import { User } from "@prisma/client";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeCurrentUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toogleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  const [isFavorited, setIsFavorited] = useState(hasFavorited);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        toogleFavorite(e);
        if (currentUser) {
          setIsFavorited((value) => !value);
        }
      }}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />

      <AiFillHeart
        size={24}
        className={isFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
