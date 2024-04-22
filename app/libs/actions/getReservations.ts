import prisma from "../prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    // empty query array and assignment depening on what params is provided
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // const safeReservation = reservations.map((reservation) => ({
    //   ...reservation,
    //   createdAt: reservation.createdAt.toISOString(),
    //   startDate: reservation.startDate.toISOString(),
    //   endDate: reservation.endDate.toISOString(),
    //   listing: {
    //     ...reservation.listing,
    //     createdAt: reservation.listing.createdAt.toISOString,
    //   },
    // }));

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
