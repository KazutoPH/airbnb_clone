"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useCallback, useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "@/constants";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const rentModal = useRentModal();
  const router = useRouter();

  // get hooks form hookform
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    // setting default values
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  // check the value of the input
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  // dynamically render Map Component every time the location changes
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // decrementation of step on backpress
  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, [step]);

  // incrementation of step on nextpress
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    // create a loading toast
    const loadingToast = toast.loading("Creating Listing...");

    axios
      .post("/api/listings", data)
      .then(() => {
        // update loading toast when success
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();

        toast.update(loadingToast, {
          render: "Listing Added Successfully",
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
      })
      .catch(() => {
        // update loading toast when error
        toast.update(loadingToast, {
          render: "Something went wrong.",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      })
      .finally(() => setIsLoading(false));
  };

  //use memo for the callback will return a value
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  //use memo for the callback will return a value
  const secondaryActionLabel = useMemo(() => {
    // dynamic body content base on current step
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);
  let bodyContent = (
    <div className="flex flex-col  gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              // get the return value of onClick prop
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // if in location STEP change the body content
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help us find you"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  // if in location STEP change the body content
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have"
        />

        <hr />
        <Counter
          title="Guest"
          subtitle="How many guest do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />

        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />

        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  // if in location STEP change the body content
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  // if in description STEP change the body content
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place"
          subtitle="Short and sweet works best!"
        />

        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much  do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      // check if current step is in category to disable back button
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
};

export default RentModal;
