"use server";

import { Button, Card } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAppointmentsBySchedule } from "@/db/homeseeker/appointment";
import { getPropertyByID } from "@/db/homeseeker/property";
import { getScheduleByID } from "@/db/homeseeker/schedule";
import { getCurrentUser } from "@/utils/cookies";
import { AppointmentForm } from "./AppointmentForm";

interface Params {
	params: { propertyId: string; scheduleId: string };
}

const ScheduleAppointment: NextPage<Params> = async ({
	params: { propertyId: _propertyId, scheduleId: _scheduleId },
}) => {
	// Check if we're getting a valid numerical property id
	const propertyId = Number(_propertyId);
	if (Number.isNaN(propertyId)) {
		return notFound();
	}

	// Check if we're getting a valid numerical schedule id
	const scheduleId = Number(_scheduleId);
	if (Number.isNaN(scheduleId)) {
		return notFound();
	}

	// Check if the property exists
	const property = await getPropertyByID(propertyId);
	if (property === null) {
		return notFound();
	}

	// Check if the schedule exists
	const schedule = await getScheduleByID(scheduleId);
	if (schedule === null) {
		return notFound();
	}

	const appointments = await getAppointmentsBySchedule(scheduleId);

	const user = getCurrentUser();

	return (
		<div className="container">
			<div className="flex flex-col items-center justify-center w-1/2 pr-4">
				<div className="flex flex-col gap-5">
					{appointments.map(({ id, start, end }) => (
						<Card key={id}>
							<div className="mb-3 flex flex-col items-center">
								<p>Appointments made already:</p>
								<p className="text-slate-600 text-sm">
									Start time: {new Date(start).toLocaleString()}
								</p>
								<p className="text-slate-600 text-sm">
									End time: {new Date(end).toLocaleString()}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
			{user ? (
				user.id !== property?.broker_id && (
					<AppointmentForm schedule={schedule} />
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

export default ScheduleAppointment;
