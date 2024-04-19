"use client";

import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-toastify";
import CustomButton from "../CustomButton";
import useLogInModal from "@/app/hooks/useLogInModal";
import { useRouter } from "next/navigation";

const LogInModal = () => {
  const registerModal = useRegisterModal();
  const LogInModal = useLogInModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // default value of react hook forms
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit function getting data from react-hook-form
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // sign in function from nextauth refer to app/api/auth/[...nextauth]/route.ts
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast("Logged In Sucessfuly!", {
          type: "success",
        });
        router.refresh();
        LogInModal.onClose();
      }

      if (callback?.error) {
        toast(callback?.error, {
          type: "error",
        });
      }
    });
  };

  // modal body content
  const bodyContent = (
    <div className="flex flex-col gap-4">
      {/* Custom Heading Component */}
      <Heading center title="Welcome Back" subtitle="Log in to your account" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // Footer Content
  const footerContent = (
    <div className="flex flex-col gap-4 -mt-3">
      <hr />

      {/* sign-in via google button */}
      <CustomButton
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {
          signIn("google");
        }}
      />

      {/* sign-in via github */}
      <CustomButton
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {
          signIn("github");
        }}
      />

      <div className="flex flex-row items-center gap-2 justify-center">
        <p className="text-neutral-500 text-center ml-4 font-light">
          First time in Airbnb?
        </p>
        <p
          className=" text-rose-500 text-center cursor-pointer font-semibold hover:underline"
          onClick={() => {
            LogInModal.onClose();
            registerModal.onOpen();
          }}
        >
          Create an account
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={LogInModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={LogInModal.onClose}
      // trigger handle submit and pass custom submit function
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LogInModal;
