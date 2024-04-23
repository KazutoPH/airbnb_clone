import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/libs/actions/getCurrentUser.action";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { listingId, startDate, endDate, totalPrice, pathname } = body;

  // error if missing data
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  // update reservation on listing collection
  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
