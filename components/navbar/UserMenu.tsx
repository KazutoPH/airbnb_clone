"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLogInModal from "@/app/hooks/useLogInModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import { SafeCurrentUser } from "@/types";

interface UserMenuProps {
  currentUser?: SafeCurrentUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const logInModal = useLogInModal();
  const rentModal = useRentModal();
  const router = useRouter();
  const toggleOpen = () => {
    setIsOpen((value) => !value);
  };

  const onRent = () => {
    if (!currentUser) {
      return logInModal.onOpen();
    }

    rentModal.onOpen();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Airbnb your home
        </div>

        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3  rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu size={20} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {/* dropdown menu */}
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {/* dropdown menu if user exist */}
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                    toggleOpen();
                  }}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/favorites");
                    toggleOpen();
                  }}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                    toggleOpen();
                  }}
                  label="My reservation"
                />
                <MenuItem
                  onClick={() => {
                    router.push("/properties");
                    toggleOpen();
                  }}
                  label="My properties"
                />
                <MenuItem onClick={onRent} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={logInModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
