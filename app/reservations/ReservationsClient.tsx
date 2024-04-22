"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { SafeReservation } from "@/types";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: User | null;
}

const ReservationsClient = ({
  reservations,
  currentUser,
}: ReservationsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingid] = useState("");

  // cancel reservations
  const onCancel = useCallback(
    (id: string) => {
      setDeletingid(id);

      const isProduction =
        process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

      // api call for reservation deletion
      axios
        .delete(`${isProduction}/api/reservations/${id}`)
        .then(() => {
          toast("Reservation cancelled", {
            type: "success",
          });
          router.refresh();
        })
        .catch((error) => {
          toast(`${error?.response?.data?.error}`, {
            type: "error",
          });
        })
        .finally(() => {
          setDeletingid("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
