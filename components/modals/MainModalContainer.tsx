"use client";

import useLogInModal from "@/app/hooks/useLogInModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import useSearchModal from "@/app/hooks/useSearchModal";
import LogInModal from "@/components/modals/LogInModal";
import RegisterModal from "@/components/modals/RegisterModal";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const DynamicLogIn = dynamic(() => import("@/components/modals/LogInModal"), {
  ssr: false,
  loading: () => <div className="loader" />,
});

const DynamicRentModal = dynamic(
  () => import("@/components/modals/RentModal"),
  { ssr: false, loading: () => <div className="loader" /> }
);

const DynamicRegister = dynamic(
  () => import("@/components/modals/RegisterModal"),
  { ssr: false, loading: () => <div className="loader" /> }
);

const DynamicSearchModal = dynamic(
  () => import("@/components/modals/SearchModal"),
  { ssr: false, loading: () => <div className="loader" /> }
);

const MainModalContainer = () => {
  const rentModal = useRentModal();
  const logInModal = useLogInModal();
  const registerModal = useRegisterModal();
  const searchModal = useSearchModal();
  return (
    <>
      <AnimatePresence>
        {(rentModal.isOpen ||
          logInModal.isOpen ||
          registerModal.isOpen ||
          searchModal.isOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
          >
            {logInModal.isOpen && <DynamicLogIn />}
            {registerModal.isOpen && <DynamicRegister />}
            {rentModal.isOpen && <DynamicRentModal />}
            {searchModal.isOpen && <DynamicSearchModal />}
          </motion.div>
        )}
      </AnimatePresence>
      {/* 
      <RegisterModal />
      <RentModal />
      <LogInModal />
      <SearchModal /> */}
    </>
  );
};

export default MainModalContainer;
