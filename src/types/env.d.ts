declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			SECRET_KEY: string;
			SECRET_IV: string;
			DB_HOST: string;
			DB_NAME: string;
			DB_USER: string;
			DB_PASSWORD: string;
		}
	}
}

export {};
