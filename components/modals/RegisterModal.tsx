"use client";

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
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "../CustomButton";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  // default value of react hook forms
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // submit function getting data from react-hook-form
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast("Registered Sucessfuly!", {
          type: "success",
        });
        registerModal.onClose();
      })
      .catch((error) => {
        toast("Something went Wrong!", {
          type: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // modal body content
  const bodyContent = (
    <div className="flex flex-col gap-4">
      {/* Custom Heading Component */}
      <Heading center title="Welcome to Airbnb" subtitle="Create an account" />

      <Input
        id="register_email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="register_name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="register_password"
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
        onClick={() => {}}
      />

      {/* sign-in via github */}
      <CustomButton
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />

      <div className="flex flex-row items-center gap-2 justify-center">
        <p className="text-neutral-500 text-center ml-4 font-light">
          Already have an account
        </p>
        <p
          className=" text-rose-500 text-center cursor-pointer font-semibold hover:underline"
          onClick={registerModal.onClose}
        >
          Log in
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      // trigger handle submit and pass custom submit function
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
