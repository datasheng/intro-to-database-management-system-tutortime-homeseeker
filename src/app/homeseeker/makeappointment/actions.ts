"use server";

import { getCurrentUser } from "@/app/cookies";
import { getUserByScheduleID } from "@/db/auth";
import {
	Appointment,
	createAppointment,
	getAppointmentByID,
	getAppointmentsBySchedule,
} from "@/db/homeseeker/appointment";
import { getPropertyBySchedule } from "@/db/homeseeker/property";
import { getScheduleByID } from "@/db/homeseeker/schedule";
import { createTransaction } from "@/db/transaction";

export async function makeAppointment(
	schedule_id: number,
	start_time: Date,
	end_time: Date,
): Promise<Appointment | string> {
	// Errors checking
	if (!start_time) {
		return "Start time required.";
	}
	if (!end_time) {
		return "End time required.";
	}

	// Check if the start time and end time are valid
	if (start_time > end_time) {
		return "Start time must be earlier than end time.";
	}

	// Get user currently logged in
	const user = getCurrentUser();
	if (!user) {
		return "Not signed in";
	}

	// Check if start and end time are inside scheduled times
	const schedule = await getScheduleByID(schedule_id);
	if (!schedule) {
		return "Error retreiving schedule";
	}
	if (schedule.start > start_time) {
		return "Start time must be within scheduled times.";
	}
	if (schedule.end < end_time) {
		return "End time must be within scheduled times.";
	}

	// Make sure the duration is between 20 and 120 mintues
	const duration = (end_time.getTime() - start_time.getTime()) / 60000;
	if (duration < 20) {
		return "Appointments must be at least 20 minutes long.";
	}
	if (duration > 180) {
		return "Appointments must be less than 3 hours long.";
	}

	// Checks for overlaps with
	const appointments = await getAppointmentsBySchedule(schedule_id);
	for (const appointment of appointments) {
		if (start_time < appointment.start) {
			if (end_time > appointment.start) {
				return "Time conflicts with another appointment.";
			}
		} else {
			if (start_time < appointment.end) {
				return "Time conflicts with another appointment.";
			}
		}
	}

	// Calculate appointment duration and amount which is 5 cent per minute
	const amount = 0.05 * duration;

	// Get the property owner id
	const owner = await getUserByScheduleID(schedule_id);
	if (!owner) {
		return "Failed to owner details.";
	}

	// Make the appointment
	const appointment_id = await createAppointment(
		schedule_id as number,
		user.id as number,
		start_time as Date,
		end_time as Date,
	);
	if (!appointment_id) {
		return "Failed creating appointment.";
	}

	// Create the transaction between the two parties
	const transaction_id = await createTransaction(
		user.id as number,
		owner.id as number,
		amount as number,
		`${user.first_name} ${user.last_name} owes $${amount} to ${owner.first_name} ${owner.last_name}` as string,
	);
	if (!transaction_id) {
		return "Failed creating transaction.";
	}

	// Create a fee for the user
	const fee_id = await createTransaction(
		user.id as number,
		owner.id as number,
		amount as number,
		`${user.first_name} ${user.last_name} owes $${amount} to ${owner.first_name} ${owner.last_name}` as string,
	);
	if (!fee_id) {
		return "Failed assigning fees.";
	}

	// Get the appointment so it can be returned
	const appointment = await getAppointmentByID(appointment_id);
	if (!appointment) {
		return "Failed to retrieve appointment.";
	}
	return appointment;
}

export async function fetchScheduleData(schedule_id: number) {
	const scheduleData = await getScheduleByID(schedule_id);
	return scheduleData;
}

export async function fetchAppointments(schedule_id: number) {
	const appointmentData = await getAppointmentsBySchedule(schedule_id);
	return appointmentData;
}

export async function fetchPropertyBySchedule(schedule_id: number) {
	const propertyData = await getPropertyBySchedule(schedule_id);
	return propertyData;
}
