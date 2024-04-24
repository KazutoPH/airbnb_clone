import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { User } from "@prisma/client";
import useLogInModal from "./useLogInModal";
import { SafeCurrentUser } from "@/types";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeCurrentUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLogInModal();
  const isProduction =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

  // check if already favorited
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  // on heartPress function
  const toogleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      // if no currentUser open Login Modal
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          // remove from favorites
          request = () =>
            axios.delete(`/api/favorites/${listingId}`).then(() => {
              toast("Removed from favorites.", {
                type: "success",
              });
            });
        } else {
          // add to favorite
          request = () =>
            axios.post(`/api/favorites/${listingId}`).then(() => {
              toast("Added to favorites.", {
                type: "success",
              });
            });
        }

        await request();
        // console.log(request);
        router.refresh();
      } catch (error) {
        toast("Something went wrong.", {
          type: "error",
        });
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toogleFavorite,
  };
};

export default useFavorite;
