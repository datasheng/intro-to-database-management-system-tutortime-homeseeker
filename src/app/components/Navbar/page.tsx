"use client";

import Link from "next/link";

const Navbar = () => {
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
					<Link href="/tutortime">
						<span className="text-black">TutorTime</span>
					</Link>
				</li>
				<li>
					<Link href="/user">
						<span className="text-black">Account</span>
					</Link>
				</li>
				<li>
					<Link href="/auth/sign-in">
						<span className="text-black">Login</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
