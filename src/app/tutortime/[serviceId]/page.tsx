"use server";

import { Card, List, ListItem } from "@tremor/react";
import { NextPage } from "next";
import { notFound } from "next/navigation";

import { getCurrentUser } from "@/app/cookies";
import { getIntervals, getSchedule } from "@/db/tutortime/schedule";
import { getService } from "@/db/tutortime/service";
import { WEEKDAYS, WEEKDAY_NAMES } from "@/utils/datetime";
import Link from "next/link";
import React from "react";
import { ScheduleGrid } from "./ScheduleGrid";

interface Params {
	params: { serviceId: string };
}

const Service: NextPage<Params> = async ({
	params: { serviceId: _serviceId },
}) => {
	// Check if we're getting a valid numerical id
	const serviceId = Number(_serviceId);
	if (Number.isNaN(serviceId)) {
		return notFound();
	}

	// Check if the service exists
	const service = await getService(serviceId);
	if (service === null) {
		return notFound();
	}

	const user = getCurrentUser();

	const schedule = await getSchedule(serviceId);
	const intervals = await getIntervals(serviceId);

	const { name, admin, timezone, description } = service;

	return (
		<main className="container mx-auto my-10">
			<div className="grid grid-cols-4 gap-5 items-start">
				<Card>
					<h2 className="mb-1 text-3xl font-semibold">{name}</h2>
					<p className="mb-5 text-lg text-tremor-content-emphasis">
						Offered by {admin}
					</p>
					<p className="mb-10 text-base text-tremor-content">{description}</p>

					<h3 className="text-lg text-tremor-content-emphasis font-medium">
						Business Hours
					</h3>
					<p className="mb-3 text-sm text-tremor-content">
						(All times in {timezone})
					</p>
					<List>
						{WEEKDAYS.map((weekday) => (
							<ListItem
								key={weekday}
								className={
									schedule[weekday]
										? "text-tremor-content-emphasis font-medium"
										: "text-tremor-content"
								}
							>
								<span>{WEEKDAY_NAMES[weekday]}</span>
								<span>
									{schedule[weekday]
										? `${schedule[weekday]?.start}–${schedule[weekday]?.end}`
										: "Closed"}
								</span>
							</ListItem>
						))}
					</List>
				</Card>
				{user ? (
					<ScheduleGrid service={service} intervals={intervals} />
				) : (
					<Card className="col-span-3">
						<h3 className="mb-2 text-xl text-tremor-content-emphasis font-semibold">
							Please <Link href="/auth/sign-in">sign in</Link> to book an
							appointment.
						</h3>
					</Card>
				)}
			</div>
		</main>
	);
};

export default Service;
