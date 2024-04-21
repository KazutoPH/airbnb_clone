"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import CustomButton from "../CustomButton";
import { AnimatePresence, motion } from "framer-motion"

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setshowModal] = useState(isOpen);

  useEffect(() => {
    setshowModal(isOpen);
  }, [isOpen]);

  // only allow handle close function if not disabled
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setshowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  // only allow handle submit function if not disabled
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  // only allow handleSecondary function if not disabled
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {showModal &&
          <motion.div
            initial={{ y: '50%', opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
            exit={{ y: '50%', opacity: 0, transition: { duration: 0.3 } }}
            className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto ">
            {/* Content */}
            <div className="transition h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto">
              {/* Header */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                {/* close button */}
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute right-9 cursor-pointer"
                >
                  <IoMdClose size={18} />
                </button>
                {/* Title */}
                <p className="text-lg font-semibold">{title}</p>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* Footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {/* Custom Secondary Button only if props provided */}
                  {secondaryAction && secondaryActionLabel && (
                    <CustomButton
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}

                  {/* CustomButton Props */}
                  <CustomButton
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {/* render custom footer */}
                {footer}
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  );
};

export default Modal;
