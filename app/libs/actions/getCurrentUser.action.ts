import { getServerSession } from "next-auth/next";
import prisma from "@/app/libs/prismadb";

// get the current session
export async function getSession() {
  return await getServerSession();
}

// get current user
export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUserData = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUserData) {
      return null;
    }

    let currentUser = {};

    currentUser = {
      id: currentUserData.id,
      name: currentUserData.name,
      email: currentUserData.email,
      image: currentUserData.image,
      createdAt: currentUserData.createdAt,
    };

    console.log(currentUser);
    return currentUser;
  } catch (error: any) {
    return null;
  }
}
