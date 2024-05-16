"use client";

import type React from "react";

import { signOut } from "@/app/auth/sign-out/actions";

export const SignOutButton = () => (
	<button type="button" onClick={() => signOut()}>
		<span className="font-semibold text-2xl text-center text-red-900">
			Logout
		</span>
	</button>
);
