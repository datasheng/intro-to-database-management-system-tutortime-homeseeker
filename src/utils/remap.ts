/**
 * Converts any keys of an object written in dot notation into a nested object.
 *
 * For example,
 *
 * ```json
 * { "a.b.c": true }
 * ```
 *
 * becomes
 *
 * ```json
 * { "a": { "b": { "c": true } } }
 * ```
 */
export function remapKeys<T>(obj: Record<string, T>): Record<string, T> {
	const newObj: Record<string, T> = {};

	for (const [key, value] of Object.entries(obj)) {
		if (!key.includes(".")) {
			newObj[key] = value;
			continue;
		}

		key.split(".").reduce<Record<string, T>>((curr, fragment, i, self) => {
			if (i === self.length - 1) {
				curr[fragment] = value;
				return curr;
			}

			if (!(fragment in curr)) {
				curr[fragment] = {} as T;
			}

			return curr[fragment] as Record<string, T>;
		}, newObj);
	}

	return newObj;
}
