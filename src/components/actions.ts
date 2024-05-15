"use server";
import { getCurrentUser } from "@/app/cookies";
import type { User } from "@/db/auth";

export async function fetchUserDetails(): Promise<User | null> {
	const user = await getCurrentUser();
	return user;
}
