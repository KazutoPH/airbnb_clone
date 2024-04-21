import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/libs/actions/getCurrentUser.action";

interface Iparams {
  listingId?: string;
}

// Add Ids to favorite Ids
export async function POST(request: Request, { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Inavalid ID");
  }

  // iteration of all favoriteId of current user
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  // push listingId provided to the array
  favoriteIds.push(listingId);

  // update list of favorite IDs
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

// Delete from favorite IDs
export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Inavalid ID");
  }

  // iteration of all favoriteId of current user
  let favoriteIds = [...(currentUser.favoriteIds || [])];

  // remove the id that is equal to selected favoriteid
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
