"use server";

import { cookies } from "next/headers";

import { type User, getUser } from "@/db/auth";
import { encryptCookie } from "@/utils/cookies";
import { type FormStatus, validateFormData } from "@/utils/forms";

import { signInSchema } from "./schema";

export type State = FormStatus<User>;

export async function authenticate(
	_prev: State,
	formData: FormData,
): Promise<State> {
	const { data, errors } = validateFormData(signInSchema, formData);

	if (errors) {
		return errors;
	}

	const { email, password } = data;

	const user = await getUser(email, password);
	if (!user) {
		return { formError: "Failed to authenticate user." };
	}

	if (user) {
		console.log("Log in successful", user);
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
