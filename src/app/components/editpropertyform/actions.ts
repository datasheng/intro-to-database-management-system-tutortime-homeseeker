"use server";

import {
	Property,
	deleteProperty,
	updateProperty,
} from "@/db/homeseeker/property";

export async function deletePropertyById(id: number): Promise<boolean> {
	try {
		await deleteProperty(id);
		return true;
	} catch (error) {
		console.error("Failed to delete property:", error);
		return false;
	}
}

export async function updatePropertyDetails(
	id: number,
	updatedDetails: Partial<Property>,
): Promise<boolean | string> {
	try {
		const address = updatedDetails.address;
		const zipcode = Number(updatedDetails.zipcode);
		const type = updatedDetails.type;
		const price = Number(updatedDetails.price) ?? undefined;
		const rooms = Number(updatedDetails.rooms) ?? undefined;
		const area = Number(updatedDetails.area) ?? undefined;
		const built = Number(updatedDetails.built) ?? undefined;
		if (!address) {
			return "Address is required";
		}
		if (!zipcode) {
			return "Zipcode is required";
		}
		if (!type) {
			return "Type is required";
		}
		if (!type?.includes("sale") && !type?.includes("rent")) {
			return "Type must include for sale or for rent.";
		}
		if (rooms && rooms < 1) {
			return "Rooms must be a positive integer.";
		}
		if (area && area < 1) {
			return "Area must be a positive integer.";
		}
		if (price && price < 1) {
			return "Price must be a positive integer.";
		}
		if (built && built < 1) {
			return "Year must be a positive integer.";
		}

		await updateProperty(id, address, zipcode, type, price, rooms, area, built);
		return true;
	} catch (error) {
		console.error("Error:  ", error);
		return false;
	}
}
