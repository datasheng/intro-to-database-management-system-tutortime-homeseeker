"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut(): Promise<void> {
	cookies().delete("session");
	redirect("/");
}
