"use server";

import { getCurrentUser } from "@/app/cookies";
import {
	Property,
	createProperty,
	getPropertyByAddress,
	getPropertyByID,
} from "@/db/homeseeker/property";
import { FormStatus } from "@/types";

export type State = FormStatus<Property>;

export async function registerProperty(
	_prev: State,
	formData: FormData,
): Promise<State> {
	// Get form data
	const address = formData.get("address");
	const zipcode = Number(formData.get("zipcode"));
	const type = formData.get("type")?.toString().toLowerCase();
	const rooms = formData.get("rooms")
		? Number(formData.get("rooms"))
		: undefined;
	const area = formData.get("area") ? Number(formData.get("area")) : undefined;
	const price = formData.get("price")
		? Number(formData.get("price"))
		: undefined;
	const year = formData.get("built")
		? Number(formData.get("built"))
		: undefined;

	// Errors checking
	const fieldErrors: Map<string, string> | undefined = new Map();
	if (!address) {
		fieldErrors.set("address", "Required");
	}
	if (!zipcode) {
		fieldErrors.set("zipcode", "Required");
	}
	if (!type) {
		fieldErrors.set("type", "Required");
	}
	if (!type?.includes("sale") && !type?.includes("rent")) {
		fieldErrors.set("type", "Must include for rent or for sale");
	}
	if (rooms && rooms < 1) {
		fieldErrors.set("rooms", "Positive integer required");
	}
	if (area && area < 1) {
		fieldErrors.set("area", "Positive integer required");
	}
	if (price && price < 1) {
		fieldErrors.set("price", "Positive integer required");
	}
	if (year && year < 1) {
		fieldErrors.set("year", "Positive integer required");
	}
	if (fieldErrors.size > 0) {
		return { fieldErrors: Object.fromEntries(fieldErrors) };
	}

	// Get user currently logged in
	const broker = getCurrentUser();
	if (!broker) {
		return { formError: "Failed to get user" };
	}

	// Check if the address was already registered
	const existingProperty = await getPropertyByAddress(address as string);
	if (existingProperty !== null) {
		return { formError: "Address already registered" };
	}

	// Create the property
	const property_id = await createProperty(
		broker.id as number,
		address as string,
		zipcode as number,
		type as string,
		price as number,
		rooms as number,
		area as number,
		year as number,
	);
	if (!property_id) {
		return { formError: "Failed registering property." };
	}

	// Get the property so it can be returned
	const property = await getPropertyByID(property_id);
	if (!property) {
		return { formError: "Failed to retrieve property." };
	}
	return { data: property };
}
