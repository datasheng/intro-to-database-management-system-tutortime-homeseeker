"use server";

import Link from "next/link";
import type React from "react";

import { getCurrentUser } from "@/utils/cookies";
import { HomeSeekerDropdown } from "./HomeSeekerDropdown";
import { SignOutButton } from "./SignOutButton";
import { TutorTimeDropdown } from "./TutorTimeDropdown";

export const Navbar: React.FC = async () => {
	const user = getCurrentUser();

	return (
		<nav className="bg-white border-b-4 border-black">
			<ul className="flex flex-row justify-between items-center p-4">
				<li>
					<Link href="/">
						<span className="font-semibold text-2xl text-center text-blue-900">
							Home
						</span>
					</Link>
				</li>
				<li>
					<HomeSeekerDropdown />
				</li>
				<li>
					<TutorTimeDropdown />
				</li>
				<li>
					<Link href="/user">
						<span className="font-semibold text-2xl text-center text-blue-900">
							Account
						</span>
					</Link>
				</li>
				<li>
					{!user ? (
						<Link href="/auth/sign-in">
							<span className="font-semibold text-2xl text-center text-blue-900">
								Login
							</span>
						</Link>
					) : (
						<SignOutButton />
					)}
				</li>
			</ul>
		</nav>
	);
};
