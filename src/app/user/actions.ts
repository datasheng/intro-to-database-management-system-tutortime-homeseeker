"use server";

import { getCurrentUser } from "@/app/cookies";
import { User } from "@/db/auth";
import {
	getUpcomingAppointmentsByBroker,
	getUpcomingAppointmentsByUser,
} from "@/db/homeseeker/appointment";
import { getPropertiesByUser } from "@/db/homeseeker/property";
import {
	getBillByUserID,
	getPaymentByUserID,
	getTransactionsByPayee,
	getTransactionsByRecipient,
} from "@/db/transaction";

export async function getUserProperties(user_id: number) {
	return await getPropertiesByUser(user_id);
}

export async function getPropertyAppointments(user_id: number) {
	return await getUpcomingAppointmentsByBroker(user_id);
}

export async function getUserAppointments(user_id: number) {
	return await getUpcomingAppointmentsByUser(user_id);
}

export async function fetchUserDetails(): Promise<User | null> {
	return getCurrentUser();
}

export async function getPayeePayments(user_id: number) {
	return await getTransactionsByPayee(user_id);
}

export async function getRecipientPayments(user_id: number) {
	return await getTransactionsByRecipient(user_id);
}

export async function getAmount(user_id: number) {
	const billsPromise = getBillByUserID(user_id);
	const paymentsPromise = getPaymentByUserID(user_id);
	const [bills, payments] = await Promise.all([billsPromise, paymentsPromise]);
	return {
		owned: bills,
		earned: payments,
	};
}
