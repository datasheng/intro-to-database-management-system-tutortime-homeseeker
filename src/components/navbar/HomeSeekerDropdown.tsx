"use client";

import { Menu } from "@headlessui/react";
import Link from "next/link";
import type React from "react";

export const HomeSeekerDropdown: React.FC = () => (
	<Menu>
		<Menu.Button className="font-semibold text-2xl text-center text-blue-900">
			HomeSeeker
		</Menu.Button>
		<Menu.Items className="absolute bg-white border-2 rounded-md mt-2 shadow-xl z-10">
			<Menu.Item>
				<Link href="/homeseeker">
					<div className="text-black text-sm border-stone-950 min-full m-3">
						Book Appointment
					</div>
					<hr />
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Link href="/homeseeker/registerproperty">
					<div className="text-black text-sm m-3 ">Register Property</div>
				</Link>
			</Menu.Item>
		</Menu.Items>
	</Menu>
);
