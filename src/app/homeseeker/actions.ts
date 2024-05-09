"use server";

import { getCurrentUser } from "@/app/cookies";
import { getProperties } from "@/db/homeseeker/property";

export async function filterPropertiesByUser() {
	const properties = await getProperties();
	const user = getCurrentUser();
	// Not signed it so just display everything
	if (!user) {
		return properties;
	}
	const filteredProperties = properties.filter((property) => {
		return property.broker_id !== user.id;
	});
	return filteredProperties;
}
