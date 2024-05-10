import z from "zod";

export const registerSchema = z
	.object({
		first_name: z.string().min(1, "Required").max(35, "Too long"),
		last_name: z.string().min(1, "Required").max(35, "Too long"),
		email: z
			.string()
			.min(1, "Required")
			.max(255, "Too long")
			.email("Invalid email"),
		password: z.string().min(1, "Required"),
		confirm_password: z.string().min(1, "Required"),
	})
	.refine(({ password, confirm_password }) => password === confirm_password, {
		message: "Passwords do not match",
		path: ["confirm_password"],
	});
