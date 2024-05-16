"use server";

import { Button, Card } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";

import { getServices } from "@/db/tutortime/service";

const Home: NextPage = async () => {
	const services = await getServices();

	return (
		<div className="container mx-auto py-20">
			<h1 className="mb-5 text-tremor-metric font-medium">Services</h1>
			<div className="grid grid-cols-2 gap-5">
				{services?.map(({ id, name, description, admin }) => (
					<Card key={id}>
						<div className="mb-3 flex items-center">
							<div>
								<h2 className="text-tremor-title font-medium">{name}</h2>
								<p className="text-slate-600 text-sm">Offered by {admin}</p>
							</div>
							<Link className="ml-auto" href={`/tutortime/${id}`}>
								<Button>Book Now!</Button>
							</Link>
						</div>
						<p>{description}</p>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Home;
