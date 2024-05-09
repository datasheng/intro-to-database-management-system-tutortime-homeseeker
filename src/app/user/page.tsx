"use client";

import { User } from "@/db/auth";
import { Appointment } from "@/db/homeseeker/appointment";
import { Property } from "@/db/homeseeker/property";
import { Button, Card } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
	fetchUserDetails,
	getPropertyAppointments,
	getUserAppointments,
	getUserProperties,
} from "./actions";

const Account: NextPage = () => {
	const [user, setUser] = useState<User | null>(null);
	const [properties, setProperties] = useState<Property[] | null>(null);
	const [propertyAppointments, setpropertyAppointments] = useState<
		Appointment[] | null
	>(null);
	const [appointments, setAppointments] = useState<Appointment[] | null>(null);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const userData = await fetchUserDetails();
			setUser(userData);
		};
		fetchCurrentUser();
	}, []);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const propertiesData = await getUserProperties(Number(user?.id));
				const propertyAppointmentData = await getPropertyAppointments(
					Number(user?.id),
				);
				const appointmentData = await getUserAppointments(Number(user?.id));
				setProperties(propertiesData);
				setpropertyAppointments(propertyAppointmentData);
				setAppointments(appointmentData);
			} catch (error) {
				console.log(error);
			}
		};
		fetchDetails();
	}, [user]);

	return (
		<div>
			{user ? (
				<div className="flex flex-row gap-10 m-10">
					<div className="flex flex-col items-center justify-center pr-4">
						<h1 className="mb-5 mt-5 text-tremor-title font-medium text-center">
							Welcome, {user.first_name} {user.last_name}!
						</h1>
						<Card className="mx-auto mb-5">
							<h2>Your id: {user.id}</h2>
							<h2>Your email: {user.email}</h2>
						</Card>
						<Card className="mx-auto h-96 overflow-y-auto">
							{properties && properties.length > 0 ? (
								<div className="flex flex-col items-center justify-center">
									<h2 className="text-tremor-title font-medium text-center mt-1">
										Your Properties:
									</h2>
									<ul>
										{properties.map((property) => (
											<li key={property.id}>
												<Card className="p-5 w-100 mb-5">
													<Link
														href={`/homeseeker/viewproperty?id=${property.id}`}
														className="text-black visited:text-black"
													>
														<div className="mb-3 flex flex-row items-center gap-10">
															<h2 className="text-tremor-title font-medium">
																Address: {property.address}
															</h2>
															<p>Zipcode: {property.zipcode}</p>
															<p>Type: {property.type}</p>
														</div>
													</Link>
												</Card>
											</li>
										))}
									</ul>
								</div>
							) : (
								<Link
									href="/homeseeker/registerproperty"
									className="visited:text-black"
								>
									<span>
										You have no property registered. Register now to start your
										journey!
									</span>
								</Link>
							)}
						</Card>
					</div>
					<div>
						<Card className="max-w-96 mx-auto overflow-y-auto flex-grow">
							{appointments && appointments.length > 0 ? (
								<div className="flex flex-col items-center justify-center">
									<h2 className="text-tremor-title font-medium text-center">
										Appointments for your property:
									</h2>
									<ul>
										{appointments.map((appointment) => (
											<li key={appointment.id}>
												<Card className="p-5 w-100 mb-5">
													<div className="mb-3 flex flex-row items-center gap-10">
														<p>
															Start time:
															{new Date(appointment.start).toLocaleString()}
														</p>
														<p>
															EndTime:{" "}
															{new Date(appointment.end).toLocaleString()}
														</p>
														<p>By: {appointment.user_id}</p>
													</div>
												</Card>
											</li>
										))}
									</ul>
								</div>
							) : (
								<p>
									No appointments found. Check your schedules or properties!
								</p>
							)}
						</Card>
					</div>
					<Card className="max-w-96 mx-auto overflow-y-auto flex-grow">
						{propertyAppointments && propertyAppointments.length > 0 ? (
							<div className="flex flex-col items-center justify-center">
								<h2 className="text-tremor-title font-medium text-center">
									Appointments for your property:
								</h2>
								<ul>
									{propertyAppointments.map((appointment) => (
										<li key={appointment.id}>
											<Card className="p-5 w-100 mb-5">
												<div className="mb-3 flex flex-row items-center gap-10">
													<p>
														Start time:
														{new Date(appointment.start).toLocaleString()}
													</p>
													<p>
														EndTime:{" "}
														{new Date(appointment.end).toLocaleString()}
													</p>
													<p>By: {appointment.user_id}</p>
												</div>
											</Card>
										</li>
									))}
								</ul>
							</div>
						) : (
							<p>No upcoming appointments.</p>
						)}
					</Card>
				</div>
			) : (
				<div className="grid place-items-center h-screen">
					<Button>
						<Link
							href="/auth/sign-in"
							className="text:white visited:text-white"
						>
							<span>Please sign in to view your account!</span>
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
};

export default Account;
