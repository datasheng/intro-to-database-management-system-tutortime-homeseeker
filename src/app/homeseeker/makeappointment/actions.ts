"use server";

import { getAppointmentsBySchedule } from "@/db/homeseeker/appointment";
import { getPropertyBySchedule } from "@/db/homeseeker/property";

export async function fetchAppointments(schedule_id: number) {
	const appointmentData = await getAppointmentsBySchedule(schedule_id);
	return appointmentData;
}

export async function fetchPropertyBySchedule(schedule_id: number) {
	const propertyData = await getPropertyBySchedule(schedule_id);
	return propertyData;
}
