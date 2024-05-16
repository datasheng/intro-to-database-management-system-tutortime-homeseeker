export const WEEKDAYS: [0, 1, 2, 3, 4, 5, 6] = [0, 1, 2, 3, 4, 5, 6];

export const WEEKDAY_NAMES = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export function timeToHoursMinutes(time: string): [number, number] {
	const match = time.match(/(?<hours>\d\d):(?<minutes>\d\d)/);

	if (!match || !match.groups) {
		return [0, 0];
	}

	return [parseInt(match.groups.hours, 10), parseInt(match.groups.minutes, 10)];
}
