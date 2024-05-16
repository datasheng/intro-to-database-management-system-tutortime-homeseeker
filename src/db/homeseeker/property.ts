import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/db/index";

export interface Property extends RowDataPacket {
	property_id: number;
	broker_id: number;
	address: string;
	zipcode: number;
	type: string;
	price: number;
	rooms: number;
	area: number;
	built: number;
}

/**
 * Retrieves all properties from database.
 */
export async function getProperties(): Promise<Property[]> {
	const [res] = await pool.execute<Property[]>(
		"SELECT id, broker_id, address, zipcode, type, price, rooms, area, built FROM hs_property",
	);
	return res;
}

/**
 * Retrieves properties from database given a user id
 */
export async function getPropertiesByUser(user: number): Promise<Property[]> {
	const [res] = await pool.execute<Property[]>(
		`SELECT id, broker_id, address, zipcode, type, price, rooms, area, built FROM hs_property
		WHERE broker_id = :user`,
		{ user },
	);
	return res;
}

/**
 * Retrieves all properties from a certain zipcode.
 */
export async function getPropertiesByZipcode(
	zipcode: number,
): Promise<Property[]> {
	const [res] = await pool.execute<Property[]>(
		`SELECT id, broker_id, address, zipcode, type, price, rooms, area, built FROM hs_property
        WHERE zipcode = :zipcode`,
		{ zipcode },
	);
	return res;
}

/**
 * Retrieve a property with given id
 */
export async function getPropertyByID(id: number): Promise<Property | null> {
	const [res] = await pool.execute<Property[]>(
		`SELECT id, broker_id, address, zipcode, type, price, rooms, area, built FROM hs_property
        WHERE id = :id`,
		{ id },
	);
	if (res.length !== 1) {
		return null;
	}
	return res[0];
}

/**
 * Retrieve a property with given address
 */
export async function getPropertyByAddress(
	address: string,
): Promise<Property | null> {
	const [res] = await pool.execute<Property[]>(
		`SELECT id, broker_id, address, zipcode, type, price, rooms, area, built FROM hs_property
        WHERE address = :address`,
		{ address },
	);
	if (res.length === 1) {
		return res[0];
	}
	return null;
}

/**
 * Retrieve a property with given schedule
 */
export async function getPropertyBySchedule(
	schedule_id: number,
): Promise<Property | null> {
	const [res] = await pool.execute<Property[]>(
		`SELECT P.id, P.broker_id, P.address, P.zipcode, P.type, P.price, P.rooms, P.area, P.built, S.start, S.end
		FROM hs_property AS P
		INNER JOIN hs_schedule as S
        ON S.property_id = P.id
		WHERE S.id = :schedule_id`,
		{ schedule_id },
	);
	if (res.length === 1) {
		return res[0];
	}
	return null;
}

/**
 * Creates a property with the given parameters.
 *
 * @returns id of newly created property
 */

export async function createProperty(
	broker_id: number,
	address: string,
	zipcode: string,
	type: string,
	price: number,
	rooms: number,
	area: number,
	built: number,
): Promise<number | null> {
	try {
		const params = {
			broker_id,
			address,
			zipcode,
			type,
			price,
			rooms,
			area,
			built,
		};

		const [res] = await pool.execute<ResultSetHeader>(
			`INSERT INTO hs_property (broker_id, address, zipcode, type, price, rooms, area, built)
            VALUES (:broker_id, :address, :zipcode, :type, :price, :rooms, :area, :built)`,
			params,
		);
		return res.insertId;
	} catch (e) {
		console.error(e);
		return null;
	}
}

/**
 * Deletes a property with given id.
 */
export async function deleteProperty(id: number): Promise<void> {
	await pool.execute("DELETE FROM hs_property WHERE id = :id", {
		id,
	});
}

/**
 * Update certain fields of a property with a given id.
 */
export async function updateProperty(
	id: number,
	address: string,
	zipcode: number,
	type: string,
	price: number,
	rooms: number,
	area: number,
	built: number,
): Promise<void> {
	const params = {
		address,
		zipcode,
		type,
		price,
		rooms,
		area,
		built,
		id,
	};
	await pool.execute(
		`UPDATE hs_property
        SET address = :address,
            zipcode = :zipcode,
            type = :type,
            price = :price,
            rooms = :rooms,
            area = :area,
            built = :built
        WHERE id = :id`,
		params,
	);
}
