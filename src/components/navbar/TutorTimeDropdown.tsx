"use client";

import { Menu } from "@headlessui/react";
import Link from "next/link";
import type React from "react";

export const TutorTimeDropdown: React.FC = () => (
	<Menu>
		<Menu.Button className="font-semibold text-2xl text-center text-blue-900">
			TutorTime
		</Menu.Button>
		<Menu.Items className="absolute bg-white border-2 rounded-md mt-2 shadow-xl z-10">
			<Menu.Item>
				<Link href="/tutortime">
					<div className="text-black  text-sm  border-stone-950 min-full m-3">
						Book Tutor
					</div>
					<hr />
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Link href="/tutortime/new">
					<div className="text-black text-sm m-3 ">Create Service</div>
				</Link>
			</Menu.Item>
		</Menu.Items>
	</Menu>
);
