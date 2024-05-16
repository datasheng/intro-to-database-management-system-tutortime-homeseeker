"use server";

import { type Service, getServices } from "@/db/tutortime/services";

export async function fetchServices() {
	const services = await getServices();
	console.log(services);
	return services;
}
