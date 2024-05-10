"use client";

import { Button, Card } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { fetchUserDetails } from "@/app/user/actions";
import { User } from "@/db/auth";
import { Appointment } from "@/db/homeseeker/appointment";
import { Property } from "@/db/homeseeker/property";
import { AppointmentForm } from "./AppointmentForm";
import { fetchAppointments, fetchPropertyBySchedule } from "./actions";

const MakeAppointment: NextPage = () => {
	const schedule_id = Number(useSearchParams().get("schedule"));
	const [user, setUser] = useState<User | null>(null);
	const [property, setProperty] = useState<Property | null>(null);
	const [appointment, setAppointments] = useState<Appointment[] | null>(null);

	useEffect(() => {
		const fetchDetails = async () => {
			const userData = await fetchUserDetails();
			const appointmentData = await fetchAppointments(schedule_id);
			const propertyData = await fetchPropertyBySchedule(schedule_id);
			setUser(userData);
			setAppointments(appointmentData);
			setProperty(propertyData);
			console.log(userData);
		};
		fetchDetails();
	}, [schedule_id]);

	return (
		<div className="container">
			<div className="flex flex-col items-center justify-center w-1/2 pr-4">
				<div className="flex flex-col gap-5">
					{appointment?.map((appointment) => (
						<Card key={appointment.id}>
							<div className="mb-3 flex flex-col items-center">
								<p>Appointments made already:</p>
								<p className="text-slate-600 text-sm">
									Start time: {new Date(appointment.start).toLocaleString()}
								</p>
								<p className="text-slate-600 text-sm">
									End time: {new Date(appointment.end).toLocaleString()}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
			{user ? (
				user.id !== property?.broker_id && (
					<AppointmentForm schedule_id={schedule_id} />
				)
			) : (
				<div className="grid place-items-center h-screen">
					<Button>
						<Link
							href="/auth/sign-in"
							className="color:white visited:text-white"
						>
							<span>Please sign in to book an appointment!</span>
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
};

export default MakeAppointment;
