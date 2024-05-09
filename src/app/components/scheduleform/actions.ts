"use server";

import { getCurrentUser } from "@/app/cookies";
import { getPropertyByID } from "@/db/homeseeker/property";
import {
	Schedule,
	createSchedule,
	getScheduleByID,
	getSchedulesByPropertyID,
} from "@/db/homeseeker/schedule";

export async function makeSchedule(
	property_id: number,
	start_time: Date,
	end_time: Date,
): Promise<Schedule | string> {
	// Schedules must be made 3 full days in advance
	const today = new Date();
	today.setDate(today.getDate() + 3);
	today.setHours(0, 0, 0, 0);
	const start = new Date(start_time);
	start.setHours(0, 0, 0, 0);
	if (start < today) {
		return "Schedules must be made with 3 days in advance from current time.";
	}

	// Check if the start time and end time are valid
	if (start_time > end_time) {
		return "Start time must be earlier than end time.";
	}

	// Make sure schedules are made from 8am to 6pm
	// Needs UTC in order to work which is 4 extra hours from EST
	if (start_time.getHours() < 12) {
		// 4 + 8 = 12
		return "Start time must be after 8:00 am.";
	}
	if (end_time.getHours() >= 22) {
		// 4 + 18 = 22
		return "End time must be before 6:00 pm.";
	}

	// Restrict the time to be on the same date
	// The day is always the same
	if (
		start_time.getFullYear() !== end_time.getFullYear() ||
		start_time.getMonth() !== end_time.getMonth()
	) {
		return "Schedules are restricted to the same date.";
	}

	// Make the duration long enough
	const duration = (end_time.getTime() - start_time.getTime()) / 60000;
	if (duration < 120) {
		return "Appointments must be at least 2 hour long.";
	}

	// Get user currently logged in
	const user = getCurrentUser();
	if (!user) {
		return "Not signed in.";
	}

	//Check if this time slot interfers with any other schedules for this house
	const propertySchedules = await getSchedulesByPropertyID(property_id);
	for (let i = 0; i < propertySchedules.length; i++) {
		if (propertySchedules[i].start > start_time) {
			if (propertySchedules[i].start < end_time) {
				return "Schedule times overlap with existing time.";
			}
		} else {
			if (propertySchedules[i].end > start_time) {
				return "Schedule times overlap with existing time.";
			}
		}
	}

	// Create the property
	const schedule_id = await createSchedule(
		property_id as number,
		start_time as Date,
		end_time as Date,
	);
	if (!schedule_id) {
		return "Failed to make schedule.";
	}

	// Get the schedule
	const schedule = await getScheduleByID(schedule_id);
	if (!schedule) {
		return "Failed to retrieve schedule.";
	}
	return schedule;
}

export async function fetchPropertyData(property_id: number) {
	const propertyData = await getPropertyByID(property_id);
	return propertyData;
}

export async function fetchPropertySchedules(property_id: number) {
	const propertySchedules = await getSchedulesByPropertyID(property_id);
	return propertySchedules;
}
