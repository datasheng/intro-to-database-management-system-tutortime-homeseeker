"use server";

import { User, createUser } from "@/db/auth";
import { cookies } from "next/headers";

import { encryptCookie } from "@/app/cookies";
import { FormStatus } from "@/types";

export type State = FormStatus<User>;

export async function register(
	_prev: State,
	formData: FormData,
): Promise<State> {
	const first_name = formData.get("first_name");
	const last_name = formData.get("last_name");
	const email = formData.get("email");
	const password = formData.get("password");
	const confirm_password = formData.get("confirm_password");

	const fieldErrors: Map<string, string> | undefined = new Map();

	if (!first_name) {
		fieldErrors.set("first_name", "Required");
	}
	if (!last_name) {
		fieldErrors.set("last_name", "Required");
	}
	if (!email) {
		fieldErrors.set("email", "Required");
	}
	if (!password) {
		fieldErrors.set("password", "Required");
	}
	if (!confirm_password) {
		fieldErrors.set("confirm_password", "Required");
	}

	if (confirm_password !== password) {
		fieldErrors.set("confirm_password", "Passwords do not match");
	}

	if (fieldErrors.size > 0) {
		return { fieldErrors: Object.fromEntries(fieldErrors) };
	}

	const id = await createUser(
		first_name as string,
		last_name as string,
		email as string,
		password as string,
	);

	if (!id) {
		return { fieldErrors: { email: "Email already registered." } };
	}

	const user: User = {
		id,
		first_name: first_name as string,
		last_name: last_name as string,
		email: email as string,
	};

	cookies().set({
		name: "session",
		value: encryptCookie(user),
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 60 * 24,
		path: "/",
	});

	return { data: user };
}
