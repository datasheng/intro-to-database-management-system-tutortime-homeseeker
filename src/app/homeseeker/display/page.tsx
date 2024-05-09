import { getSchedules } from "@/db/homeseeker/schedule";
import { Button, Card } from "@tremor/react";
import Link from "next/link";

export default async function Home() {
	const schedules = await getSchedules();

	return (
		<div className="container mx-auto py-20">
			<h1 className="mb-5 text-tremor-metric font-medium">Schedules</h1>
			<div className="grid grid-cols-2 gap-5">
				{schedules.map((schedule) => (
					<Card key={schedule.id}>
						<div className="mb-3 flex items-center">
							<div>
								<h2 className="text-tremor-title font-medium">{schedule.id}</h2>
								<p className="text-slate-600 text-sm">
									Start time: {new Date(schedule.start).toLocaleString()}
								</p>
								<p className="text-slate-600 text-sm">
									End time: {new Date(schedule.end).toLocaleString()}
								</p>
							</div>
							<Link
								href={{
									pathname: "/homeseeker/makeappointment",
									query: { schedule: schedule.id },
								}}
							>
								<Button className="ml-auto">Make an appointment!</Button>
							</Link>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
