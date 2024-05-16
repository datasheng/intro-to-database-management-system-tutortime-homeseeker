"use client";

import { Button, Card, TextInput } from "@tremor/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { type State, authenticate } from "./actions";

const SignIn: NextPage = () => {
	const router = useRouter();

	const [state, formAction] = useFormState<State, FormData>(authenticate, {});

	useEffect(() => {
		if (state.data) {
			router.push("/user");
			router.refresh();
		}
	}, [router, state]);

	return (
		<div className="container mx-auto py-20">
			<Card className="max-w-96 mx-auto">
				<h1 className="mb-5 text-tremor-title font-medium">Sign In</h1>
				<form action={formAction}>
					<div className="mb-5 flex flex-col gap-3">
						<div>
							<TextInput
								required
								name="email"
								type="email"
								placeholder="john@appleseed.com"
								error={!!state.fieldErrors?.email}
								errorMessage={state.fieldErrors?.email}
							/>
						</div>
						<div>
							<TextInput
								required
								name="password"
								type="password"
								placeholder="••••••••"
								error={!!state.fieldErrors?.password}
								errorMessage={state.fieldErrors?.password}
							/>
						</div>
						{state.formError && (
							<small className="text-sm text-red-500">{state.formError}</small>
						)}
					</div>
					<div className="flex flex-row-reverse items-center">
						<Button className="ml-auto" type="submit">
							Next
						</Button>
						<small>
							Don&apos;t have an account?{" "}
							<Link href="/auth/register">Register instead.</Link>
						</small>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default SignIn;
