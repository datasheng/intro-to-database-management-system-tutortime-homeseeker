"use server";

import { RiLogoutCircleLine, RiLogoutCircleRLine } from "@remixicon/react";
import { Card, Divider } from "@tremor/react";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

import { User } from "@/db/auth";
import { getUserAppointments } from "@/db/tutortime/appointment";
import { getUserServices } from "@/db/tutortime/service";

interface TutorTimeCardProps {
	user: User;
}

export const TutorTimeCard: React.FC<TutorTimeCardProps> = async ({ user }) => {
	const services = await getUserServices(user.id);
	const appointments = await getUserAppointments(user.id);

	return (
		<Card>
			<h3 className="mb-2 text-xl text-tremor-content-emphasis font-semibold">
				TutorTime
			</h3>

			<Divider>Services</Divider>
			{services && services.length > 0 ? (
				<div className="flex flex-col gap-2 max-h-96 overflow-y-auto p-2">
					{services.map(({ id, name, description }) => (
						<Link
							key={id}
							href={`/tutortime/${id}`}
							className="text-black visited:text-black"
						>
							<Card>
								<p className="col-span-1 text-tremor-title font-medium">
									{name}
								</p>
								<p className="col-span-4 text-tremor-content">{description}</p>
							</Card>
						</Link>
					))}
				</div>
			) : (
				<span>
					You don&apos;t have any services.{" "}
					<Link href="/tutortime/new">Consider creating one</Link>!
				</span>
			)}

			<Divider>Appointments</Divider>
			{appointments && appointments.length > 0 ? (
				<div className="flex flex-col gap-2 max-h-96 overflow-y-auto p-2">
					{appointments.map(({ id, user, service, start, end }) => (
						<Card key={id} className="grid grid-cols-2 items-center">
							<div>
								<p className="col-span-1 text-tremor-title font-medium">
									{service}
								</p>
								<p className="col-span-4 text-tremor-content">with {user}</p>
							</div>
							<div>
								<div className="flex gap-2 items-center">
									<RiLogoutCircleRLine size={18} />
									{format(start, "MMM d, y 'at' HH:mm")}
								</div>
								<div className="flex gap-2 items-center">
									<RiLogoutCircleLine size={18} />
									{format(end, "MMM d, y 'at' HH:mm")}
								</div>
							</div>
						</Card>
					))}
				</div>
			) : (
				<span>
					You don&apos;t have any appointments.{" "}
					<Link href="/tutortime">Check out some services</Link>!
				</span>
			)}
		</Card>
	);
};
