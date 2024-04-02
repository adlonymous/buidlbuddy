"use server";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "next-auth/react";

export async function createRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession();
  console.log(session);

  if (!session) {
    throw new Error("You must be logged in to create this room");
  }

  await db.insert(room).values({ ...roomData, userId: session.user.id });
}
