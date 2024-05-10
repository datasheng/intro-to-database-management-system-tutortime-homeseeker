"use server";

import { FormStatus, validateFormData } from "@/utils/forms";

import { getCurrentUser } from "@/app/cookies";
import { createService } from "@/db/tutortime/services";
import { serviceSchema } from "./schema";

export type State = FormStatus<number>;

export async function newService(
	_prev: State,
	formData: FormData,
): Promise<State> {
	// @ts-ignore
	const { data, errors } = validateFormData(serviceSchema, formData);

	if (errors) {
		return errors;
	}

	const user = getCurrentUser();
	if (!user) {
		return { formError: "You must be signed in" };
	}

	const { name, description, active, duration, timezone, hours } = data;

	const service_id = await createService(
		user.id,
		name,
		description,
		active,
		duration,
		timezone,
		hours,
	);

	return { data: service_id };
}
