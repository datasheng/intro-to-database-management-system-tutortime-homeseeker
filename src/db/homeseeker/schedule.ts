import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/db/index";

export interface Schedule extends RowDataPacket {
	id: number;
	property_id: number;
	start: Date;
	end: Date;
}

/**
 * Retrieves all schedules made from database.
 */
export async function getSchedules(): Promise<Schedule[]> {
	const [res] = await pool.execute<Schedule[]>(
		"SELECT id, property_id, start, end FROM hs_schedule",
	);

	return res;
}

/**
 * Retrieves all schedules made for a certain property from database.
 */
export async function getSchedulesByPropertyID(
	property_id: number,
): Promise<Schedule[]> {
	const [res] = await pool.execute<Schedule[]>(
		`SELECT id, start, end FROM hs_schedule
        WHERE property_id = :property_id`,
		{ property_id },
	);
	return res;
}

export async function getScheduleByID(
	schedule_id: number,
): Promise<Schedule | null> {
	const [res] = await pool.execute<Schedule[]>(
		`SELECT id, start, end FROM hs_schedule
        WHERE id = :schedule_id`,
		{ schedule_id },
	);

	if (res.length === 1) {
		return res[0];
	}

	return null;
}

/**
 * Retrieves all upcoming schedules for a certain property from database.
 */
export async function getUpcomingSchedules(
	property_id: number,
): Promise<Schedule[]> {
	const [res] = await pool.execute<Schedule[]>(
		`SELECT id, start, end FROM hs_schedule WHERE property_id = :property_id
        AND start > CURRENT_TIMESTAMP`,
		{ property_id },
	);

	return res;
}

/**
 * Creates a schedule with the given parameters.
 *
 * @returns id of newly created schedule
 */
export async function createSchedule(
	property_id: number,
	start: Date,
	end: Date,
): Promise<number | null> {
	const [res] = await pool.execute<ResultSetHeader>(
		`INSERT INTO hs_schedule (property_id, start, end)
          VALUES (:property_id, :start, :end)`,
		{ property_id, start, end },
	);

	return res.insertId;
}

/**
 * Deletes a schedule with given id.
 */
export async function deleteSchedule(id: number): Promise<void> {
	await pool.execute("DELETE FROM hs_schedule WHERE id = :id", {
		id,
	});
}

/**
 * Update time of a schedule with a given id.
 */
export async function updateSchedule(
	id: number,
	start: Date,
	end: Date,
): Promise<void> {
	await pool.execute(
		`UPDATE hs_schedule
        SET start = :start,
            end = :end
        WHERE id = :id`,
		{ start, end, id },
	);
}
