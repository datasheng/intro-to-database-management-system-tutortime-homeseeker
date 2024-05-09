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
	name: string,
	admin_id: number,
	timezone: string,
	duration: number,
	description?: string,
): Promise<number> {
	const [res] = await pool.execute<ResultSetHeader>(
		`INSERT INTO tt_service (name, admin_id, timezone, duration, description)
        VALUES (:name, :admin_id, :timezone, :duration, :description)`,
		{ name, admin_id, timezone, duration, description },
	);

	return res.insertId;
}

/**
 * Deletes service with given id.
 */
export async function deleteService(id: number): Promise<void> {
	await pool.execute("DELETE FROM service WHERE id = :id", { id });
}
