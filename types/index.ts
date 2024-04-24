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

export type SafeCurrentUser = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  favoriteIds?: string[];
};
