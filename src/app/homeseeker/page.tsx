"use server";

import { Button, Card } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";

import { getCurrentUser } from "@/app/cookies";
import { getProperties } from "@/db/homeseeker/property";

async function filterPropertiesByUser() {
	const properties = await getProperties();
	const user = getCurrentUser();
	// Not signed it so just display everything
	if (!user) {
		return properties;
	}
	const filteredProperties = properties.filter((property) => {
		return property.broker_id !== user.id;
	});
	return filteredProperties;
}

const Home: NextPage = async () => {
	const properties = await filterPropertiesByUser();

	return (
		<div className="container mx-auto py-20">
			<h1 className="mb-5 text-tremor-metric font-medium">Properties</h1>
			<Link href={"/homeseeker/registerproperty"}>
				Register your property here!
			</Link>
			<div className="grid grid-cols-2 gap-5">
				{properties.map((property) => (
					<Card key={property.id}>
						<div className="mb-3 flex items-center">
							<div>
								<h2 className="text-tremor-title font-medium">
									{property.address}, {property.zipcode}
								</h2>
								<p className="text-slate-600 text-med">
									Priced at ${property.price?.toLocaleString()}
								</p>
								<p className="text-slate-600 text-med">
									Property Type: {property.type}
								</p>
							</div>
							<Button className="ml-auto">
								<Link
									href={`/homeseeker/viewproperty/?id=${property.id}`}
									className="text-white visited:text-white"
								>
									Book Now
								</Link>
							</Button>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Home;
