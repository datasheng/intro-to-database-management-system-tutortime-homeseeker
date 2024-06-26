"use client";

import { Button, Card } from "@tremor/react";
import { DatePicker, DatePickerValue } from "@tremor/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Property } from "@/db/homeseeker/property";
import { makeSchedule } from "./actions";

interface ScheduleFormProps {
	property: Property;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ property }) => {
	const router = useRouter();

	const [input, setInput] = useState({
		start: "",
		end: "",
	});
	const [date, setDate] = useState<DatePickerValue | undefined>(undefined);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInput((prev) => ({ ...prev, [name]: value }));
	};

	const handleDateChange = (value: DatePickerValue | undefined) => {
		setDate(value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (date === undefined) {
			setError("Date not selected");
			return;
		}
		const startDateTime = `${date?.toISOString().split("T")[0]}T${input.start}`;
		const endDateTime = `${date?.toISOString().split("T")[0]}T${input.end}`;
		const output = await makeSchedule(
			property.id,
			new Date(startDateTime),
			new Date(endDateTime),
		);
		if (typeof output === "string") {
			setError(output);
		} else {
			setError(null);
			router.refresh();
		}
	};

	return (
		<div className="container mx-auto py-5">
			{property ? (
				<div>
					<Card className="max-w-96 text-center">
						<h2>Upload your availability</h2>
						<form
							onSubmit={handleSubmit}
							className="flex flex-col justify-center items-center gap-2 mt-3"
						>
							<div className="flex-1 w-full">
								<div className="w-full flex justify-center items-center m-2">
									<DatePicker
										className="mx-auto max-w-sm"
										placeholder="Select a date"
										value={date}
										onValueChange={handleDateChange}
									/>
								</div>
								<div className="w-full flex justify-center items-center m-2">
									<label htmlFor="start">Start</label>
									<input
										className="ml-auto"
										required
										name="start"
										type="time"
										value={input.start}
										onChange={handleChange}
									/>
								</div>
								<div className="w-full flex justify-center items-center m-2">
									<label htmlFor="end">End</label>
									<input
										className="ml-auto"
										required
										name="end"
										type="time"
										value={input.end}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div className="h-4">
								{error && (
									<small className="text-sm text-red-500">{error}</small>
								)}
							</div>
							<Button type="submit">Add Schedule</Button>
						</form>
					</Card>
				</div>
			) : null}
		</div>
	);
};
