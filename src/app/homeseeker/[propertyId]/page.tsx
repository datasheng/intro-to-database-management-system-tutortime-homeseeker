"use server";

import { Button, Card } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPropertyByID } from "@/db/homeseeker/property";
import { getSchedulesByPropertyID } from "@/db/homeseeker/schedule";
import { getCurrentUser } from "@/utils/cookies";
import { EditPropertyForm } from "./EditPropertyForm";
import { ScheduleForm } from "./ScheduleForm";

interface Params {
	params: { propertyId: string };
}

const Property: NextPage<Params> = async ({
	params: { propertyId: _propertyId },
}) => {
	// Check if we're getting a valid numerical id
	const propertyId = Number(_propertyId);
	if (Number.isNaN(propertyId)) {
		return notFound();
	}

	// Check if the property exists
	const property = await getPropertyByID(propertyId);
	if (property === null) {
		return notFound();
	}

	const schedules = await getSchedulesByPropertyID(propertyId);

	const user = getCurrentUser();

	return (
		<main className="container mx-auto my-4">
			<div className="flex flex-row justify-between items-start space-x-4">
				<div className="w-3/4">
					{property && (
						<>
							<Card className="mt-5 p-5 bg-white rounded-lg">
								<div className="grid grid-cols-2 gap-4 text-lg">
									<p>
										<strong>Address:</strong> {property.address}
									</p>
									<p>
										<strong>Zipcode:</strong> {property.zipcode}
									</p>
									<p>
										<strong>Type:</strong> {property.type}
									</p>
									<p>
										<strong>Asking price:</strong> $
										{property.price.toLocaleString()}
									</p>
									<p>
										<strong>Area:</strong> {property.area} sq ft
									</p>
									<p>
										<strong>Rooms:</strong> {property.rooms}
									</p>
									<p>
										<strong>Year built:</strong> {property.built}
									</p>
								</div>
							</Card>

							{user && user.id === property.broker_id && (
								<div>
									<EditPropertyForm property={property} />
									<ScheduleForm property={property} />
								</div>
							)}
						</>
					)}
				</div>
				<div className="w-1/4">
					{schedules?.map(({ id, start, end }) => (
						<Card key={id} className="mt-5">
							<div className="flex flex-col items-center">
								<p className="text-slate-600 text-sm">
									Start time: {new Date(start).toLocaleString()}
								</p>
								<p className="text-slate-600 text-sm">
									End time: {new Date(end).toLocaleString()}
								</p>
								<Link href={`/homeseeker/${propertyId}/schedule/${id}`}>
									<Button className="ml-auto">Make an appointment!</Button>
								</Link>
							</div>
						</Card>
					))}
				</div>
			</div>
		</main>
	);
};

export default Property;
