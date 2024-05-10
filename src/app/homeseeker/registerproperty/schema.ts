import z from "zod";

export const newPropertySchema = z.object({
	address: z.string().min(1, "Required").max(64, "Too long"),
	zipcode: z
		.string()
		.min(1, "Required")
		// TODO: Should validate against a DB of zipcodes
		.refine((code) => code.length === 5, {
			message: "Invalid zipcode",
			path: ["zipcode"],
		}),
	type: z.enum(["rent", "sale"], {
		required_error: "Required",
		invalid_type_error: "Must be 'rent' or 'sale'",
	}),
	rooms: z.coerce
		.number({ required_error: "Required" })
		.min(0, "Cannot be negative"),
	area: z.coerce
		.number({ required_error: "Required" })
		.min(0, "Cannot be negative"),
	price: z.coerce
		.number({ required_error: "Required" })
		.min(0, "Cannot be negative"),
	year: z.coerce
		.number({ required_error: "Required" })
		.min(0, "Cannot be negative"),
});
