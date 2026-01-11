import { auth } from "@clerk/nextjs/server";
import prisma from "./prisma";

export async function getCurrentUser() {
  const { userId } = await auth();
  console.log("yeh hu",userId)
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId }
  })
  console.log(user)
  return user;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === 'ADMIN';
}

export async function requireAdmin() {
  const admin = await isAdmin();
  
  if (!admin) {
    throw new Error('Unauthorized - Admin access required');
  }
  
  return true;
}

