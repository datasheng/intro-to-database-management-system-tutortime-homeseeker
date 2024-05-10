import z from "zod";

export const signInSchema = z.object({
	email: z.string().min(1, "Required").email("Invalid email"),
	password: z.string().min(1, "Required"),
});
