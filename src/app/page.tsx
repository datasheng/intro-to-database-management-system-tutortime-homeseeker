"use server";

import { getAllTransactions } from "@/db/transaction";
import { getCurrentUser } from "@/utils/cookies";

export default async function Home() {
	const user = getCurrentUser();
	const transactions = await getAllTransactions();

	return user?.is_admin ? (
		<div className="min-h-screen bg-gray-100 flex flex-col align-middle justify-center items-center">
			<h1 className="font-bold text-2xl text-center text-blue-900 pb-5">
				Transaction table
			</h1>
			<table className="table-fixed  text-left text-sm font-light text-surface rounded-lg border-separate border  border-gray-950 shadow-2xl bg-gray-100">
				<thead className="font-medium ">
					<tr>
						<th className="py-2 px-6">Payor </th>
						<th className="py-2 px-6">Recipient</th>
						<th className="py-2 px-6">Amount</th>
						<th className="py-2 px-6">Description</th>
					</tr>
				</thead>
				<tbody className="font-medium">
					{transactions.map((transaction) => (
						<tr key={transaction.id} className=" font-medium ">
							<td className="py-2 px-6">{transaction.payee}</td>
							<td className="py-2 px-6">{transaction.recipient}</td>
							<td className="py-2 px-6">{transaction.amount}</td>
							<td className="py-2 px-6">{transaction.description} </td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	) : (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
				<h1 className="font-bold text-2xl text-center text-blue-900">
					Welcome to <br /> TutorTime + HomeSeeker.
				</h1>
				<h3 className="mt-2 text-lg text-center text-gray-900">
					To get started, first choose between the offered services.
				</h3>
				<p className="mt-4 text-md text-center text-gray-900">
					Want to sell/rent your home? Are you interested in buying property?
					Select <span className="font-semibold text-blue-900">HomeSeeker</span>
				</p>
				<p className="text-md text-center npx biome check --apply-unsafe srctext-gray-900">
					Need a tutor? Interested in becoming one? Select{" "}
					<span className="font-semibold text-blue-900">TutorTime</span>
				</p>
			</div>
		</div>
	);
}
