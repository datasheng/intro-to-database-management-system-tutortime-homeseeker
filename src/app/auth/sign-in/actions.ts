"use server";

import { User, getUser } from "@/db/auth";
import { cookies } from "next/headers";

import { encryptCookie } from "@/app/cookies";
import { FormStatus } from "@/types";

export type State = FormStatus<User>;

export async function authenticate(
	_prev: State,
	formData: FormData,
): Promise<State> {
	const email = formData.get("email");
	const password = formData.get("password");

	const fieldErrors: Map<string, string> | undefined = new Map();

	if (!email) {
		fieldErrors.set("email", "Required");
	}
	if (!password) {
		fieldErrors.set("password", "Required");
	}

	if (fieldErrors.size > 0) {
		return { fieldErrors: Object.fromEntries(fieldErrors) };
	}

	const user = await getUser(email as string, password as string);

	if (!user) {
		return { formError: "Failed to authenticate user." };
	}

	cookies().set({
		name: "session",
		value: encryptCookie(user),
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24,
		path: "/",
	});

	return { data: user };
}
