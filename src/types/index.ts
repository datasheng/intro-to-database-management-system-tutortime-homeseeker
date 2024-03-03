export interface FormStatus<T> {
	data?: T;
	formError?: string;
	fieldErrors?: Record<string, string>;
}
