import { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/db";

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

interface Appointment extends RowDataPacket {
	user: string;
	service: string;
	start: Date;
	end: Date;
	notes: string;
}

export async function getUserAppointments(
	user_id: number,
): Promise<Appointment[]> {
	const [res] = await pool.execute<Appointment[]>(
		`SELECT
            IF(
                a.user_id = :user_id,
                CONCAT(client.first_name, ' ', client.last_name),
                CONCAT(admin.first_name, ' ', admin.last_name)
            ) AS user,
            s.name AS service,
            a.start AS start,
            a.end AS end,
            a.notes AS notes
        FROM tt_appointment AS a
        JOIN tt_service AS s
            ON s.id = a.service_id
        JOIN user AS client
            ON client.id = a.user_id
        JOIN user AS admin
            ON admin.id = s.admin_id
        WHERE a.user_id = :user_id
           OR s.admin_id = :user_id
        `,
		{ user_id },
	);

	return res;
}
