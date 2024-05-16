"use client";

import { Button, Card } from "@tremor/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Schedule } from "@/db/homeseeker/schedule";
import { makeAppointment } from "./actions";

interface AppointmentFormProps {
	schedule: Schedule;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
	schedule,
}) => {
	const router = useRouter();

	const [input, setInput] = useState({
		start: "",
		end: "",
	});
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInput((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (schedule) {
			const output = await makeAppointment(
				schedule.id,
				new Date(
					`${schedule.start.toISOString().split("T")[0]}T${input.start}`,
				),
				new Date(`${schedule.start.toISOString().split("T")[0]}T${input.end}`),
			);
			if (typeof output === "string") {
				setError(output);
			} else {
				setError(null);
				router.refresh();
			}
		}
	};

	return (
		<div className="container mx-auto py-20">
			{schedule ? (
				<>
					<Card className="max-w-96 mx-auto">
						<h1 className="mb-5 text-tremor-title font-medium text-center">
							Schedule for an appointment
						</h1>
						<div className="flex flex-col items-center justify-center">
							<p>Start: {new Date(schedule.start).toLocaleString()}</p>
							<p>End: {new Date(schedule.end).toLocaleString()}</p>
						</div>
						<form
							onSubmit={handleSubmit}
							className="flex flex-col just-center items-center"
						>
							<div className="mb-5 flex flex-row gap-3">
								<div>
									<input
										required
										name="start"
										type="time"
										value={input.start}
										onChange={handleChange}
									/>
								</div>
								<div>
									<input
										required
										name="end"
										type="time"
										value={input.end}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="h-6">
								{error && (
									<small className="text-sm text-red-500">{error}</small>
								)}
							</div>

							<div className="items-center">
								<Button type="submit">Make Appointment</Button>
							</div>
						</form>
					</Card>
				</>
			) : null}
		</div>
	);
};
