"use server";

import { Card } from "@tremor/react";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import React from "react";

import {
	getBillByUserID,
	getPaymentByUserID,
	getTransactionsByPayee,
	getTransactionsByRecipient,
} from "@/db/transaction";
import { getCurrentUser } from "@/utils/cookies";
import { HomeSeekerCard } from "./HomeSeekerCard";
import { TutorTimeCard } from "./TutorTimeCard";

const Account: NextPage = async () => {
	const user = getCurrentUser();
	if (user === null) {
		return redirect("/auth/sign-in");
	}

	const transactions = await getTransactionsByPayee(user.id);
	const payments = await getTransactionsByRecipient(user.id);

	const billsAmount = getBillByUserID(user.id);
	const paymentsAmount = getPaymentByUserID(user.id);

	return (
		<main className="container mx-auto my-10">
			<h2 className="mb-1 text-3xl font-semibold">
				{user.first_name} {user.last_name}
			</h2>
			<p className="mb-5 text-lg text-tremor-content-emphasis">{user.email}</p>

			<div className="mb-10 grid grid-cols-4">
				<Card className="w-80">
					{user.is_admin ? (
						<div>
							<h2>Total Revenue: {paymentsAmount}</h2>
						</div>
					) : (
						<div>
							<div className="flex flex-col">
								{transactions && transactions.length > 0 ? (
									<div>
										<h2>Your Transactions:</h2>
										{transactions.map((transaction) => (
											<div key={transaction.id}>{transaction.description}</div>
										))}
									</div>
								) : (
									<p>You have no pending fees.</p>
								)}
								<p>Total bill: ${billsAmount}</p>
								{payments && payments.length > 0 ? (
									<div>
										<h2>Your Anticipated Payments:</h2>
										{payments.map((payment) => (
											<div key={payment.id}>{payment.description}</div>
										))}
									</div>
								) : (
									<p>You have no upcoming payments.</p>
								)}
								<p>Total payments: ${paymentsAmount}</p>
							</div>
						</div>
					)}
				</Card>
			</div>

			<div className="grid grid-cols-2 gap-10">
				<HomeSeekerCard user={user} />
				<TutorTimeCard user={user} />
			</div>
		</main>
	);
};

export default Account;
