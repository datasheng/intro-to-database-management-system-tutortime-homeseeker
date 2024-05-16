"use client";

import { Button, Card } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { fetchUserDetails } from "@/app/user/actions";
import { User } from "@/db/auth";
import { Property } from "@/db/homeseeker/property";
import { Schedule } from "@/db/homeseeker/schedule";
import { EditPropertyForm } from "./EditPropertyForm";
import { ScheduleForm } from "./ScheduleForm";
import { fetchPropertyData, fetchSchedules } from "./actions";

const ViewProperty: NextPage = () => {
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

	const handleRefresh = () => {
		router.refresh();
	};

	return (
		<div className="container mx-auto px-4">
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
										{property.price?.toLocaleString()}
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

							{user && user.id === property?.broker_id && (
								<div>
									<EditPropertyForm
										property={property}
										onSubmit={handleRefresh}
									/>
									<ScheduleForm
										property_id={property_id}
										onSubmit={handleRefresh}
									/>
								</div>
							)}
						</>
					)}
				</div>
				<div className="w-1/4">
					{schedules?.map((schedule) => (
						<Card key={schedule.id} className="mt-5">
							<div className="flex flex-col items-center">
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
									<Button className="ml-auto">Make an appointment!</Button>
								</Link>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default ViewProperty;
