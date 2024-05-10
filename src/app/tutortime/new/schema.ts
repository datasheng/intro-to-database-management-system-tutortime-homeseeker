import { timeZonesNames } from "@vvo/tzdb";
import z from "zod";

const timeRangeSchema = z
	.object({
		enabled: z.preprocess((val) => val === "on", z.boolean()),
		start: z.string().optional(),
		end: z.string().optional(),
	})
	.refine(
		({ enabled, start }) => (enabled ? start && start.length > 0 : true),
		{ message: "Required", path: ["start"] },
	)
	.refine(({ enabled, end }) => (enabled ? end && end.length > 0 : true), {
		message: "Required",
		path: ["end"],
	});

export const serviceSchema = z.object({
	name: z.string().min(1, "Required").max(100, "Too long"),
	description: z.string(),
	active: z
		.string()
		.transform((v) => v === "on")
		.pipe(z.boolean()),
	duration: z.coerce
		.number({ required_error: "Required" })
		.min(0, "Cannot be negative"),
	timezone: z.enum(timeZonesNames as [string, ...string[]], {
		required_error: "Required",
		invalid_type_error: "Invalid timezone",
	}),
	hours: z.object({
		sunday: timeRangeSchema.default({ enabled: false }),
		monday: timeRangeSchema.default({ enabled: false }),
		tuesday: timeRangeSchema.default({ enabled: false }),
		wednesday: timeRangeSchema.default({ enabled: false }),
		thursday: timeRangeSchema.default({ enabled: false }),
		friday: timeRangeSchema.default({ enabled: false }),
		saturday: timeRangeSchema.default({ enabled: false }),
	}),
});
