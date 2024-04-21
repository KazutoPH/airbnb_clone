"use client"

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import CustomButton from "../CustomButton";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null
}

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: ListingCardProps
) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue);
  // cancel click function
  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) {
      return
    }

    onAction?.(actionId)
  }, [onAction, actionId, disabled])

  // conditional price display if you have resevation
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price
  }, [reservation, data.price])

  // conditional reservation date display if you have resevation
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.enDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        {/* Image Container */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />

          {/* Heart Button Component */}
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>

        {/* Listing Details */}
        <p className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </p>
        <p className="font-light text-neutral-500">
          {reservationDate || data.category}
        </p>
        <div className="flex flex-row items-center gap-1">
          <p className="font-semibold">${price}</p>
          {!reservation && (
            <p className="font-light">night</p>
          )}
        </div>

        {/* Reservation Button */}
        {onAction && actionLabel && (
          <CustomButton
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard