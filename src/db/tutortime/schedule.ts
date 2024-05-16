import { RowDataPacket } from "mysql2";

import { pool } from "@/db";

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Schedule extends RowDataPacket {
	weekday: Weekday;
	start: string;
	end: string;
}

/**
 * Retrieve schedule for a given service by id.
 */
export async function getSchedule(
	service_id: number,
): Promise<Partial<Record<Weekday, Schedule>>> {
	const [res] = await pool.execute<Schedule[]>(
		`SELECT
             weekday,
             TIME_FORMAT(start, '%H:%i') AS start,
             TIME_FORMAT(end, '%H:%i') AS end
        FROM tt_schedule
        WHERE service_id = :service_id`,
		{ service_id },
	);

	return res.reduce<Partial<Record<Weekday, Schedule>>>((map, schedule) => {
		map[schedule.weekday] = schedule;
		return map;
	}, {});
}

export interface Interval extends RowDataPacket {
	weekday: Weekday;
	start: string;
	end: string;
	available: boolean;
}

/**
 * Gets all bookable intervals for the service.
 *
 * TODO: Currently, this just assumes the current week,
 *       so booking for a future week is not yet possible.
 */
export async function getIntervals(
	service_id: number,
): Promise<Record<Weekday, Interval[]>> {
	const [res] = await pool.execute<Interval[]>(
		`WITH RECURSIVE intervals AS (
            SELECT
                weekday AS weekday,
                start AS interval_start,
                start + INTERVAL tt_service.duration MINUTE AS interval_end
            FROM tt_schedule
            JOIN tt_service
                ON tt_schedule.service_id = tt_service.id
            WHERE service_id = :service_id
        
            UNION
        
            SELECT
                intervals.weekday AS weekday,
                interval_end AS interval_start,
                interval_end + INTERVAL tt_service.duration MINUTE AS interval_end
            FROM intervals
            JOIN tt_service
            JOIN tt_schedule
                ON intervals.weekday = tt_schedule.weekday
                AND tt_service.id = tt_schedule.service_id
            WHERE tt_service.id = :service_id
              AND intervals.interval_end < tt_schedule.end
        )
        SELECT
            weekday,
            TIME_FORMAT(interval_start, '%H:%i') AS start,
            TIME_FORMAT(interval_end, '%H:%i') AS end,
            NOT EXISTS(
                SELECT id
                FROM tt_appointment
                WHERE service_id = :service_id
                  AND WEEKDAY(start) + 1 % 7 = weekday
                  AND TIME(start) = interval_start
                  AND TIME(end) <= interval_end
            ) AS available
        FROM intervals`,
		{ service_id },
	);

	return res.reduce<Record<Weekday, Interval[]>>(
		(map, interval) => {
			map[interval.weekday].push(interval);
			return map;
		},
		{ 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
	);
}
