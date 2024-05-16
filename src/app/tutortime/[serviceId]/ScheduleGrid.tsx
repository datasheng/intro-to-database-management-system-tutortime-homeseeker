"use client";

import { Button, Card, Dialog, DialogPanel } from "@tremor/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import { bookAppointment } from "@/app/tutortime/[serviceId]/actions";
import { Interval, Weekday } from "@/db/tutortime/schedule";
import { Service } from "@/db/tutortime/service";
import { WEEKDAYS, WEEKDAY_NAMES } from "@/utils/datetime";

interface ScheduleGridProps {
	service: Service;
	intervals: Record<Weekday, Interval[]>;
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({
	service,
	intervals,
}) => {
	const router = useRouter();

	const [selected, setSelected] = useState<
		[number, string, string] | undefined
	>();

	const confirm = useCallback(() => {
		if (!selected) {
			return;
		}

		bookAppointment(service.id, ...selected).then(() => {
			setSelected(undefined);
			router.refresh();
		});
	}, [router, service, selected]);

	return (
		<>
			<Card className="col-span-3 grid grid-cols-7 gap-2 text-center">
				{WEEKDAYS.map((weekday) => (
					<h4 key={weekday} className="mb-5 text-lg font-medium">
						{WEEKDAY_NAMES[weekday]}
					</h4>
				))}
				{WEEKDAYS.map((weekday) => (
					<div key={weekday} className="flex flex-col gap-2 items-center">
						{intervals[weekday].length === 0 && (
							<i className="text-tremor-content">Closed</i>
						)}
						{intervals[weekday].map(
							({ start, end, available }: Interval, i) => (
								<Button
									key={`${start}/${end}`}
									className="w-32"
									color={available ? "green" : "slate"}
									size="xs"
									onClick={() => setSelected([weekday, start, end])}
									disabled={!available}
								>
									{start}–{end}
								</Button>
							),
						)}
					</div>
				))}
			</Card>

			<Dialog
				static
				open={selected !== undefined}
				onClose={() => setSelected(undefined)}
			>
				<DialogPanel>
					<h3 className="mb-2 text-xl text-tremor-content-emphasis font-semibold">
						Confirm Your Booking
					</h3>
					{selected && (
						<p className="text-tremor-content">
							You are booking a tutoring session with {service.admin} on{" "}
							<span className="font-semibold">
								{WEEKDAY_NAMES[selected[0]]}
							</span>{" "}
							from <span className="font-semibold">{selected[1]}</span> until{" "}
							<span className="font-semibold">{selected[1]}</span>.
						</p>
					)}
					<div className="mt-2 flex justify-end">
						<Button onClick={confirm}>Confirm</Button>
					</div>
				</DialogPanel>
			</Dialog>
		</>
	);
};
