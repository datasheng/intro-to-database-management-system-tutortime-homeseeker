"use server";

import { Card, Divider } from "@tremor/react";
import Link from "next/link";
import React from "react";

import { User } from "@/db/auth";
import {
	getUpcomingAppointmentsByBroker,
	getUpcomingAppointmentsByUser,
} from "@/db/homeseeker/appointment";
import { getPropertiesByUser } from "@/db/homeseeker/property";

interface HomeSeekerCardProps {
	user: User;
}

export const HomeSeekerCard: React.FC<HomeSeekerCardProps> = async ({
	user,
}) => {
	const properties = await getPropertiesByUser(user.id);
	const propertyAppointments = await getUpcomingAppointmentsByBroker(user.id);
	const appointments = await getUpcomingAppointmentsByUser(user.id);

	return (
		<Card>
			<h3 className="text-xl text-tremor-content-emphasis font-semibold">
				HomeSeeker
			</h3>

			<Divider>Properties</Divider>
			{properties && properties.length > 0 ? (
				<div className="flex flex-col gap-2 max-h-96 overflow-y-auto p-2">
					{properties.map((property) => (
						<Link
							key={property.id}
							href={`/homeseeker/${property.id}`}
							className="text-black visited:text-black"
						>
							<Card>
								<div className="grid grid-cols-5">
									<p className="col-span-2 text-tremor-title font-medium">
										{property.address}, {property.zipcode}
									</p>
									<p className="col-span-2">{property.type}</p>
									<p>${property.price}</p>
								</div>
							</Card>
						</Link>
					))}
				</div>
			) : (
				<Link href="/homeseeker/registerproperty">
					<span>
						You have no property registered. Register now to start your journey!
					</span>
				</Link>
			)}

			<Divider>Appointments as Broker</Divider>
			{appointments && appointments.length > 0 ? (
				<div className="flex flex-col gap-2 max-h-96 overflow-y-auto p-2">
					{propertyAppointments.map((appointment) => (
						<Card key={appointment.id}>
							<div className="flex flex-row items-center gap-10">
								<div>
									<p>Location: {appointment.address}</p>
									<p>
										By: {appointment.first_name} {appointment.last_name}
									</p>
									<p>{appointment.type}</p>
								</div>
								<div>
									<p>
										Start Time:
										{new Date(appointment.start).toLocaleString()}
									</p>
									<p>End Time: {new Date(appointment.end).toLocaleString()}</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			) : (
				<p>No appointments found. Check your schedules or properties!</p>
			)}

			<Divider>Appointments as Client</Divider>
			{appointments && appointments.length > 0 ? (
				<div className="flex flex-col gap-2 max-h-96 overflow-y-auto p-2">
					{appointments.map((appointment) => (
						<Card key={appointment.id}>
							<div className="flex flex-row items-center gap-10">
								<div>
									<p>Location: {appointment.address}</p>
									<p>
										By: {appointment.first_name} {appointment.last_name}
									</p>
									<p>{appointment.type}</p>
								</div>
								<div>
									<p>
										Start Time:
										{new Date(appointment.start).toLocaleString()}
									</p>
									<p>End Time: {new Date(appointment.end).toLocaleString()}</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			) : (
				<p>No upcoming appointments.</p>
			)}
		</Card>
	);
};
