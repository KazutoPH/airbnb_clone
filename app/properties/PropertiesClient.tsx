"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { Listing, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingid] = useState("");

  // on Cancel Reservation function
  const onCancel = useCallback(
    (id: string) => {
      setDeletingid(id);

      const isProduction =
        process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

      // api call for reservation deletion
      axios
        .delete(`${isProduction}/api/listings/${id}`)
        .then(() => {
          toast("Listing Deleted", {
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
      <Heading title="Properties" subtitle="List of your properties" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
