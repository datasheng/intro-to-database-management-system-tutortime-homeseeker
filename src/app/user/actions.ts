"use server";

import { getCurrentUser } from "@/app/cookies";
import { User } from "@/db/auth";
import {
	getUpcomingAppointmentsByBroker,
	getUpcomingAppointmentsByProperty,
} from "@/db/homeseeker/appointment";
import { getPropertiesByUser } from "@/db/homeseeker/property";

export async function getUserProperties(user_id: number) {
	const properties = await getPropertiesByUser(user_id);
	return properties;
}

export async function getPropertyAppointments(user_id: number) {
	const appointments = await getUpcomingAppointmentsByProperty(user_id);
	return appointments;
}

export async function getUserAppointments(user_id: number) {
	const appointments = await getUpcomingAppointmentsByBroker(user_id);
	return appointments;
}

export async function fetchUserDetails(): Promise<User | null> {
	const user = await getCurrentUser();
	return user;
}
