import { Listing } from "@prisma/client";

export type SafeReservation = {
  id: string;
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  listing: Listing;
};
