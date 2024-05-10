"use client";

import { RiArrowRightLine, RiTimeLine, RiTimeZoneLine } from "@remixicon/react";
import {
	Button,
	Card,
	List,
	ListItem,
	NumberInput,
	SearchSelect,
	SearchSelectItem,
	Switch,
	TextInput,
	Textarea,
} from "@tremor/react";
import { getTimeZones } from "@vvo/tzdb";
import { NextPage } from "next";
import React, { useState } from "react";
import { useFormState } from "react-dom";

import { State, newService } from "./actions";

type TimeRange = [string | undefined, string | undefined];

type Hours = {
	sunday?: TimeRange;
	monday?: TimeRange;
	tuesday?: TimeRange;
	wednesday?: TimeRange;
	thursday?: TimeRange;
	friday?: TimeRange;
	saturday?: TimeRange;
};

interface TimeRangeInputProps {
	name: string;
	value: TimeRange | undefined;
	onChange: React.Dispatch<React.SetStateAction<Hours>>;
}

const TimeRangeInput: React.FC<TimeRangeInputProps> = ({
	name,
	value,
	onChange,
}) => (
	<div className="flex gap-2 items-center">
		<Switch
			name={`hours.${name}.enabled`}
			defaultChecked={false}
			checked={!!value}
			onChange={(checked) =>
				onChange((hours) => ({
					...hours,
					[name]: checked ? [undefined, undefined] : undefined,
				}))
			}
		/>
		<TextInput
			name={`hours.${name}.start`}
			type="time"
			placeholder="--:--"
			required={value !== undefined}
			disabled={value === undefined}
			value={value?.[0]}
			onChange={(e) =>
				onChange((hours) => ({
					...hours,
					[name]: [e.target.value, value?.[1]],
				}))
			}
			className="!min-w-24 w-24"
			icon={RiTimeLine}
		/>
		<RiArrowRightLine size={20} />
		<TextInput
			name={`hours.${name}.end`}
			type="time"
			placeholder="--:--"
			required={value !== undefined}
			disabled={value === undefined}
			value={value?.[1]}
			onChange={(e) =>
				onChange((hours) => ({
					...hours,
					[name]: [value?.[0], e.target.value],
				}))
			}
			className="!min-w-24 w-24"
			icon={RiTimeLine}
		/>
	</div>
);

const NewService: NextPage = () => {
	const [state, formAction] = useFormState<State, FormData>(newService, {});

	const [hours, setHours] = useState<Hours>({});

	return (
		<div className="container mx-auto py-20">
			<h1 className="mb-5 text-tremor-metric font-medium">
				Create a New Service
			</h1>
			<form action={formAction}>
				<div className="mb-5 grid grid-cols-2 gap-10 items-start ">
					<Card>
						<h1 className="mb-5 text-tremor-title">
							Let&apos;s start with the basics...
						</h1>
						<div className="flex flex-col gap-5">
							<div>
								<TextInput
									required
									name="name"
									placeholder="Name"
									error={!!state.fieldErrors?.name}
									errorMessage={state.fieldErrors?.name}
								/>
								<small className="text-tremor-content">
									Be descriptive! Include the subject area or specific course
									you tutor.
								</small>
							</div>
							<div>
								<Textarea
									name="description"
									placeholder="Description"
									rows={5}
									error={!!state.fieldErrors?.description}
									errorMessage={state.fieldErrors?.description}
								/>
							</div>
							<div className="flex gap-3">
								<Switch
									name="active"
									defaultChecked
									error={!!state.fieldErrors?.active}
									errorMessage={state.fieldErrors?.active}
								/>
								<p className="text-sm text-tremor-content">
									Currently accepting appointments?
								</p>
							</div>
							<div>
								<div className="flex gap-5">
									<div>
										<NumberInput
											required
											name="duration"
											defaultValue={30}
											min={0}
											icon={RiTimeLine}
											error={!!state.fieldErrors?.duration}
											errorMessage={state.fieldErrors?.duration}
										/>
									</div>
									<SearchSelect
										required
										name="timezone"
										defaultValue={
											Intl.DateTimeFormat().resolvedOptions().timeZone
										}
										className="font-mono"
										icon={RiTimeZoneLine}
										error={!!state.fieldErrors?.timezone}
										errorMessage={state.fieldErrors?.timezone}
									>
										{getTimeZones({ includeUtc: true }).map(
											({
												name,
												mainCities: [city],
												countryCode,
												abbreviation,
											}) => (
												<SearchSelectItem key={name} value={name}>
													<small className="text-tremor-content-subtle">
														{abbreviation}
													</small>
													<span className="hidden"> —</span>{" "}
													{abbreviation === "UTC"
														? "Zulu"
														: `${city}, ${countryCode}`}
												</SearchSelectItem>
											),
										)}
									</SearchSelect>
								</div>
								<small className="text-tremor-content">
									We&apos;ll need the <b>duration</b> of your sessions (in
									minutes) and your <b>timezone</b>.
								</small>
							</div>
						</div>
					</Card>
					<Card>
						<h1 className="mb-5 text-tremor-title">
							Set your business hours...
						</h1>
						<List>
							<ListItem>
								<span>Sunday</span>
								<TimeRangeInput
									name="sunday"
									value={hours.sunday}
									onChange={setHours}
								/>
							</ListItem>
							<ListItem>
								<span>Monday</span>
								<TimeRangeInput
									name="monday"
									value={hours.monday}
									onChange={setHours}
								/>
							</ListItem>
							<ListItem>
								<span>Tuesday</span>
								<TimeRangeInput
									name="tuesday"
									value={hours.tuesday}
									onChange={setHours}
								/>
							</ListItem>
							<ListItem>
								<span>Wednesday</span>
								<TimeRangeInput
									name="wednesday"
									value={hours.wednesday}
									onChange={setHours}
								/>
							</ListItem>
							<ListItem>
								<span>Thursday</span>
								<TimeRangeInput
									name="thursday"
									value={hours.thursday}
									onChange={setHours}
								/>
							</ListItem>
							<ListItem>
								<span>Friday</span>
								<TimeRangeInput
									name="friday"
									value={hours.friday}
									onChange={setHours}
								/>
							</ListItem>
							<ListItem>
								<span>Saturday</span>
								<TimeRangeInput
									name="saturday"
									value={hours.saturday}
									onChange={setHours}
								/>
							</ListItem>
						</List>
					</Card>
				</div>
				<div className="flex flex-col gap-5">
					{state.formError && (
						<small className="ml-auto text-sm text-red-500">
							{state.formError}
						</small>
					)}
					<Button className="ml-auto" type="submit">
						Save
					</Button>
				</div>
			</form>
		</div>
	);
};

export default NewService;
