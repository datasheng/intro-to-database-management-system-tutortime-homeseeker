"use client";

import Editproperty from "@/app/components/editpropertyform/page";
import { fetchUserDetails } from "@/app/user/actions";
import { User } from "@/db/auth";
import { Property } from "@/db/homeseeker/property";
import { Schedule } from "@/db/homeseeker/schedule";
import { Button, Card } from "@tremor/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Scheduleform from "../../components/scheduleform/page";
import { fetchPropertyData, fetchSchedules } from "./actions";

const Viewproperty = () => {
	const router = useRouter();
	const property_id = Number(useSearchParams().get("id"));
	const [user, setUser] = useState<User | null>(null);
	const [property, setProperty] = useState<Property | null>(null);
	const [schedules, setSchedules] = useState<Schedule[] | null>(null);

	useEffect(() => {
		const fetchDetails = async () => {
			const propertyData = await fetchPropertyData(property_id);
			const userData = await fetchUserDetails();
			const scheduleData = await fetchSchedules(property_id);
			setProperty(propertyData);
			setUser(userData);
			setSchedules(scheduleData);
		};
		fetchDetails();
	}, [property_id]);

	const handleFormSubmit = () => {
		router.refresh();
	};

	return (
		<div className="container">
			<div className="flex flex-col items-center justify-center w-1/2 pr-4">
				{property ? (
					<div className="flex flex-row">
						<Card className="mt-5 flex flex-row gap-3 justify-center">
							<p>Properties details:</p>
							<p>Address: {property.address}</p>
							<p>Zipcode: {property.zipcode}</p>
							<p>Type: {property.type}</p>
							{property.price ? <p>Asking price: {property.price}</p> : null}
							{property.area ? <p>Area: {property.area}</p> : null}
							{property.rooms ? <p>Rooms: {property.rooms}</p> : null}
							{property.built ? <p>Year built: {property.built}</p> : null}
						</Card>
						<div className="flex flex-col gap-5">
							{schedules ? (
								schedules.map((schedule) => (
									<Card key={schedule.id}>
										<div className="mb-3 flex flex-col items-center">
											<p className="text-slate-600 text-sm">
												Start time: {new Date(schedule.start).toLocaleString()}
											</p>
											<p className="text-slate-600 text-sm">
												End time: {new Date(schedule.end).toLocaleString()}
											</p>
											<Link
												href={{
													pathname: "/homeseeker/makeappointment",
													query: { schedule: schedule.id },
												}}
											>
												<Button className="ml-auto">
													Make an appointment!
												</Button>
											</Link>
										</div>
									</Card>
								))
							) : (
								<p>No schedules found yet.</p>
							)}
						</div>
					</div>
				) : null}
			</div>
			{user && user.id === property?.broker_id && (
				<Editproperty property_id={property_id} property={property} />
			)}
			{user && user.id === property?.broker_id && (
				<Scheduleform property_id={property_id} onSubmit={handleFormSubmit} />
			)}
		</div>
	);
};

export default Viewproperty;
