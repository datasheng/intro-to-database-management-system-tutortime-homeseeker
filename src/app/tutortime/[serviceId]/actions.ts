"use server";

import { getCurrentUser } from "@/app/cookies";
import { insertAppointment } from "@/db/tutortime/appointment";
import { timeToHoursMinutes } from "@/utils/datetime";
import {
	setDay,
	setHours,
	setMilliseconds,
	setMinutes,
	setSeconds,
} from "date-fns";

export async function bookAppointment(
	serviceId: number,
	weekday: number,
	start: string,
	end: string,
): Promise<void> {
	const day = setMilliseconds(setSeconds(setDay(new Date(), weekday), 0), 0);

	const [startH, startM] = timeToHoursMinutes(start);
	const [endH, endM] = timeToHoursMinutes(end);

	const startDate = setHours(setMinutes(day, startM), startH);
	const endDate = setHours(setMinutes(day, endM), endH);

	const user = getCurrentUser();
	if (!user) {
		throw new Error("You must be signed in");
	}

	await insertAppointment(user.id, serviceId, startDate, endDate);
}
