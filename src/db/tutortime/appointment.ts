import { pool } from "@/db";
import { ResultSetHeader } from "mysql2";

/**
 * Insert tutoring appointment into database.
 */
export async function insertAppointment(
	user_id: number,
	service_id: number,
	start: Date,
	end: Date,
): Promise<number> {
	const [res] = await pool.execute<ResultSetHeader>(
		`INSERT INTO tt_appointment (user_id, service_id, start, end)
        VALUES (:user_id, :service_id, :start, :end)`,
		{ user_id, service_id, start, end },
	);

	return res.insertId;
}
