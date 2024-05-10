"use server";

import { getCurrentUser } from "@/app/cookies";
import {
	Property,
	createProperty,
	getPropertyByAddress,
	getPropertyByID,
} from "@/db/homeseeker/property";
import { FormStatus, validateFormData } from "@/utils/forms";

import { newPropertySchema } from "./schema";

export type State = FormStatus<Property>;

export async function registerProperty(
	_prev: State,
	formData: FormData,
): Promise<State> {
	const { data, errors } = validateFormData(newPropertySchema, formData);

	if (errors) {
		return errors;
	}

	const { address, zipcode, type, price, rooms, area, year } = data;

	// Get user currently logged in
	const broker = getCurrentUser();
	if (!broker) {
		return { formError: "You must be signed in" };
	}

	// Check if the address was already registered
	const existingProperty = await getPropertyByAddress(address);
	if (existingProperty !== null) {
		return { formError: "Address already registered" };
	}

	// Create the property
	const property_id = await createProperty(
		broker.id,
		address,
		zipcode,
		type,
		price,
		rooms,
		area,
		year,
	);
	if (!property_id) {
		return { formError: "Failed to register property" };
	}

	// Get the property so it can be returned
	const property = await getPropertyByID(property_id);
	if (!property) {
		return { formError: "Failed to retrieve property" };
	}

	return { data: property };
}
