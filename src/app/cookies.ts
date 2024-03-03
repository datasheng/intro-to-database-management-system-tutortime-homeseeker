import { createCipheriv, createDecipheriv } from "node:crypto";

import { User } from "@/db/auth";

const ALGO = "aes-256-cbc";

export interface AuthCookie {
	iat: number;
	exp: number;
	user: User;
}

export function encryptCookie(user: User): string {
	const payload: AuthCookie = {
		iat: new Date().getTime(),
		exp: 60 * 60 * 24,
		user,
	};

	const cipher = createCipheriv(
		ALGO,
		process.env.SECRET_KEY,
		process.env.SECRET_IV,
	);
	return (
		cipher.update(JSON.stringify(payload), "utf-8", "base64") +
		cipher.final("base64")
	);
}

export function decryptCookie(cookie: string): User | null {
	const decipher = createDecipheriv(
		ALGO,
		process.env.SECRET_KEY,
		process.env.SECRET_IV,
	);
	const decrypted =
		decipher.update(cookie, "base64", "utf-8") + decipher.final("utf-8");

	const payload: AuthCookie = JSON.parse(decrypted);

	if (payload.iat + payload.exp < new Date().getTime()) {
		return null;
	}

	return payload.user;
}
