"use client";

import Link from "next/link";
import type React from "react";

import { fetchUserDetails } from "./actions"
import { useEffect, useState } from "react";
import type { User } from "@/db/auth";
import { Menu } from '@headlessui/react'




export const Navbar: React.FC = () => {
	const [currUser, setUser] = useState<null | User>(null)
	useEffect(() => {
		async function user() {
			const u = await fetchUserDetails()
			setUser(u)
		}
		user()

	}, [])
	return (
		<nav className="bg-white border-b-4 border-black">
			<ul className="flex flex-row justify-between items-center p-4">
				<li>
					<Link href="/">
						<span className="text-black">Home</span>
					</Link>
				</li>
				<li>
					<Link href="/homeseeker">
						<span className="text-black">Homeseeker</span>
					</Link>
				</li>
				<li>
					<Menu>
						<Menu.Button>TutorTime</Menu.Button>
						<Menu.Items className="absolute bg-white border-2 rounded-md mt-2 shadow-xl z-10">
							<Menu.Item  >
								<Link href="/tutortime"  >
									<div className="text-black  text-sm  border-stone-950 min-full m-3">Book Tutor</div>
									<hr />
								</Link>
							</Menu.Item>
							<Menu.Item >
								<Link href="/tutortime/new">
									<div className="text-black text-sm m-3 ">Create Service</div>
								</Link>
							</Menu.Item>
						</Menu.Items>
					</Menu>
					{/* <Link href="/tutortime">
						<span className="text-black">TutorTime</span>
					</Link> */}
				</li>
				<li>
					<Link href="/user">
						<span className="text-black">Account</span>
					</Link>
				</li>
				{!currUser ?
					<li>
						<Link href="/auth/sign-in">
							<span className="text-black">Login</span>
						</Link>
					</li>
					:
					<li>
						<Link href="/">
							<span className="text-black">Logout</span>
						</Link>
					</li>
				}
			</ul>
		</nav>
	)
};
