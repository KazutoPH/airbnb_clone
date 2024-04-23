"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  return (
    <>
      <Suspense>
        <SearchModalRender />
      </Suspense>
    </>
  );
};

const SearchModalRender = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBarthroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  // onsubmit function
  const onSubmit = useCallback(async () => {
    // if not on last step
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // create params
    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    // format date to used in params
    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate);
    }

    // format date to used in params
    if (dateRange.endDate) {
      updateQuery.startDate = formatISO(dateRange.endDate);
    }

    // covert params to string
    const url = qs.stringifyUrl({
      url: "/",
      query: updateQuery,
    });

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    // push the params and url
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  // dynamic action label
  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  // dynamic search action label
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  // dynamic body content base on current step
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  // Select Date Step
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />

        {/* Custom calendar input component */}
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />

        {/* Custom counter input component */}
        <Counter
          title="Guests"
          subtitle="How many guest are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBarthroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
    />
  );
}

export default SearchModal;
