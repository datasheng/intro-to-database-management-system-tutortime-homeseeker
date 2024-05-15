import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/db/index";

export interface Appointment extends RowDataPacket {
	id: number;
	schedule_id: number;
	user_id: number;
	start: Date;
	end: Date;
}

/**
 * Retrieves all appointments from a given user id.
 */
export async function getAppointmentsByUser(
	user_id: number,
): Promise<Appointment[]> {
	const [res] = await pool.execute<Appointment[]>(
		`SELECT A.start, A.end, P.address, P.zipcode, P.type, U2.first_name, U2.last_name
		FROM hs_appointment AS A
		INNER JOIN user AS U1 ON U1.id = A.user_id
		INNER JOIN hs_schedule AS S ON A.schedule_id = S.id
		INNER JOIN hs_property AS P ON P.id = S.property_id
		INNER JOIN user AS U2 ON P.broker_id = U2.id
		WHERE A.user_id = :user_id`,
		{ user_id },
	);
	return res;
}

/**
 * Retrieves upcoming appointments from a given user id.
 */
export async function getUpcomingAppointmentsByUser(
	user_id: number,
): Promise<Appointment[]> {
	const [res] = await pool.execute<Appointment[]>(
		`SELECT A.start, A.end, P.id, P.address, P.zipcode, P.type, U2.first_name, U2.last_name
		FROM hs_appointment AS A
		INNER JOIN user AS U1 ON U1.id = A.user_id
		INNER JOIN hs_schedule AS S ON A.schedule_id = S.id
		INNER JOIN hs_property AS P ON P.id = S.property_id
		INNER JOIN user AS U2 ON P.broker_id = U2.id
		WHERE A.user_id = :user_id
		AND A.start > CURRENT_TIMESTAMP`,
		{ user_id },
	);
	return res;
}

/**
 * Retrieves all appointments from a given broker id.
 */
export async function getAppointmentsByBroker(
	user_id: number,
): Promise<Appointment[]> {
	const [res] = await pool.execute<Appointment[]>(
		`SELECT A.start, A.end, P.id, P.address, P.zipcode, P.type, U.first_name, U.last_name
		FROM hs_appointment AS A
		INNER JOIN user AS U ON A.user_id = U.id
		INNER JOIN hs_schedule AS S ON A.schedule_id = S.id
		INNER JOIN hs_property AS P ON S.property_id = P.id
		WHERE P.broker_id = :user_id`,
		{ user_id },
	);
	return res;
}

/**
 * Retrieves upcoming appointments from a given broker id.
 */
export async function getUpcomingAppointmentsByBroker(
	user_id: number,
): Promise<Appointment[]> {
	const [res] = await pool.execute<Appointment[]>(
		`SELECT A.start, A.end, P.address, P.zipcode, P.type, U.first_name, U.last_name
		FROM hs_appointment AS A
		INNER JOIN user AS U ON U.id = A.user_id
		INNER JOIN hs_schedule AS S ON A.schedule_id = S.id
		INNER JOIN hs_property AS P ON S.property_id = P.id
		WHERE P.broker_id = :user_id
		AND A.start > CURRENT_TIMESTAMP`,
		{ user_id },
	);
	return res;
}

/**
 * Retrieves all available appointments made from a given property id.
 */
export async function getAppointmentsBySchedule(
	schedule_id: number,
): Promise<Appointment[]> {
	const [res] = await pool.execute<Appointment[]>(
		`SELECT A.start, A.end
		FROM hs_appointment AS A
		INNER JOIN hs_schedule AS S ON A.schedule_id = S.id
		WHERE S.id = :schedule_id`,
		{ schedule_id },
	);
	return res;
}

/**
 * Retrieves all available appointments made from a given property id.
 */
export async function getAppointmentsByProperty(
	property_id: number,
): Promise<Appointment[]> {
	const [res] = await pool.execute<Appointment[]>(
		`SELECT CONCAT(U.first_name, U.last_name), A.start, A.end, P.address, P.zipcode, P.type
		FROM hs_appointment AS A
		INNER JOIN hs_schedule AS S ON A.schedule_id = S.id
		INNER JOIN user AS U ON U.id = A.user_id
		INNER JOIN hs_property AS P ON P.id = S.property_id
		WHERE P.id = :property_id`,
		{ property_id },
	);
	return res;
}

/**
 * Retrieves upcoming appointments from a property id.
 */
export async function getUpcomingAppointmentsByProperty(
	property_id: number,
): Promise<Appointment[]> {
	const [res] = await pool.execute<Appointment[]>(
		`SELECT CONCAT(U.first_name, U.last_name), A.start, A.end, P.address, P.zipcode, P.type
		FROM hs_appointment AS A
		INNER JOIN hs_schedule AS S ON A.schedule_id = S.id
		INNER JOIN user AS U ON U.id = A.user_id
		INNER JOIN hs_property AS P ON P.id = S.property_id
		WHERE P.id = :property_id
		AND A.start > CURRENT_TIMESTAMP`,
		{ property_id },
	);
	return res;
}

/**
 * Retrieves an appointment from a appointment id.
 */
export async function getAppointmentByID(
	id: number,
): Promise<Appointment | null> {
	const [res] = await pool.execute<Appointment[]>(
		"SELECT start, end, user_id FROM hs_appointment WHERE id = :id",
		{ id },
	);
	if (res.length !== 1) {
		return null;
	}
	return res[0];
}

/**
 * Creates a new appointment with the given parameters.
 *
 * @returns id of newly created appointment
 */
export async function createAppointment(
	schedule_id: number,
	user_id: number,
	start: Date,
	end: Date,
): Promise<number> {
	const [res] = await pool.execute<ResultSetHeader>(
		`INSERT INTO hs_appointment(schedule_id, user_id, start, end)
		  VALUES(:schedule_id, :user_id, :start, :end)`,
		{ schedule_id, user_id, start, end },
	);
	return res.insertId;
}

/**
 * Update certain fields of a appointment with a given id.
 */
export async function updateAppointment(
	id: number,
	start: Date,
	end: Date,
): Promise<void> {
	await pool.execute(
		`UPDATE hs_appointment
        SET start = :start,
		end = :end
        WHERE id = :id`,
		{ start, end, id },
	);
}

/**
 * Deletes appointment with given id.
 */
export async function deleteAppointment(id: number): Promise<void> {
	await pool.execute("DELETE FROM hs_appointment WHERE id = :id", {
		id,
	});
}
