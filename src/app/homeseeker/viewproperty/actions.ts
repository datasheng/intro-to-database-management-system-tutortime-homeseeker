"use server";

import { getPropertyByID } from "@/db/homeseeker/property";
import { getSchedulesByPropertyID } from "@/db/homeseeker/schedule";

export async function fetchPropertyData(property_id: number) {
	const propertyData = await getPropertyByID(property_id);
	return propertyData;
}

export async function fetchSchedules(property_id: number) {
	return getSchedulesByPropertyID(property_id);
}
