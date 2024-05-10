import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/db";

export interface Service extends RowDataPacket {
	id: number;
	name: string;
	admin: string;
	timezone: string;
	duration: string;
	description?: string;
}

export type DaySchedule = { enabled: boolean; start?: string; end?: string };

export type ServiceSchedule = {
	sunday: DaySchedule;
	monday: DaySchedule;
	tuesday: DaySchedule;
	wednesday: DaySchedule;
	thursday: DaySchedule;
	friday: DaySchedule;
	saturday: DaySchedule;
};

/**
 * Retrieves all active services from database.
 */
export async function getServices(): Promise<Service[]> {
	const [res] = await pool.execute<Service[]>(
		`SELECT
            s.id AS id,
            s.name AS name,
            CONCAT(u.first_name, ' ', u.last_name) AS admin,
            s.timezone AS timezone,
            s.duration AS duration,
            s.description AS description
        FROM tt_service AS s
        JOIN user AS u
            ON s.admin_id = u.id
        WHERE s.active = true`,
	);

	return res;
}

/**
 * Creates a new service with the given parameters.
 *
 * @returns id of newly created service
 */
export async function createService(
	admin_id: number,
	name: string,
	description: string | undefined,
	active: boolean,
	duration: number,
	timezone: string,
	schedule: ServiceSchedule,
): Promise<number> {
	const [res] = await pool.execute<ResultSetHeader>(
		`INSERT INTO tt_service (admin_id, name, description, active, duration, timezone)
        VALUES (:admin_id, :name, :description, :active, :duration, :timezone)`,
		{ admin_id, name, description, active, duration, timezone },
	);

	await Promise.all(
		Object.values(schedule).map(({ enabled, start, end }, i) => {
			if (!enabled) {
				return;
			}

			return pool.execute(
				`INSERT INTO tt_schedule (service_id, weekday, start, end)
                VALUES (:service_id, :weekday, :start, :end)`,
				{ service_id: res.insertId, weekday: i, start, end },
			);
		}),
	);

	return res.insertId;
}

/**
 * Deletes service with given id.
 */
export async function deleteService(id: number): Promise<void> {
	await pool.execute("DELETE FROM service WHERE id = :id", { id });
}
