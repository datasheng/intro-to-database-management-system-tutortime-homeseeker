"use client";

import { User } from "@/db/auth";
import { Appointment } from "@/db/homeseeker/appointment";
import { Property } from "@/db/homeseeker/property";
import { Transaction } from "@/db/transaction";
import { Button, Card } from "@tremor/react";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	fetchUserDetails,
	getAmount,
	getPayeePayments,
	getPropertyAppointments,
	getRecipientPayments,
	getUserAppointments,
	getUserProperties,
} from "./actions";

const Account: NextPage = () => {
	const [user, setUser] = useState<User | null>(null);
	const [properties, setProperties] = useState<Property[] | null>(null);
	const [propertyAppointments, setPropertyAppointments] = useState<
		Appointment[] | null
	>(null);
	const [appointments, setAppointments] = useState<Appointment[] | null>(null);
	const [transactions, setTransactions] = useState<Transaction[] | null>(null);
	const [payments, setPayments] = useState<Transaction[] | null>(null);
	const [amount, setAmount] = useState({
		owned: 0,
		earned: 0,
	});

	useEffect(() => {
		const fetchCurrentUser = async () => {
			const userData = await fetchUserDetails();
			setUser(userData);
		};
		fetchCurrentUser();
	}, []);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const propertiesData = await getUserProperties(Number(user?.id));
				const propertyAppointmentsData = await getPropertyAppointments(
					Number(user?.id),
				);
				const appointmentsData = await getUserAppointments(Number(user?.id));
				const transactionsData = await getPayeePayments(Number(user?.id));
				const paymentsData = await getRecipientPayments(Number(user?.id));
				//const amounts = await getAmount(Number(user?.id));
				console.log(amount);
				setProperties(propertiesData);
				setPropertyAppointments(propertyAppointmentsData);
				setAppointments(appointmentsData);
				setTransactions(transactionsData);
				setPayments(paymentsData);
				//setAmount(amounts);
			} catch (error) {
				console.log(error);
			}
		};
		fetchDetails();
	}, [user, amount]);

	return (
		<div>
			{user ? (
				<div className="flex flex-row gap-10 m-10">
					<div className="flex flex-col items-center pr-4">
						<h1 className="mb-5 mt-5 text-tremor-title font-medium text-center">
							Welcome, {user.first_name} {user.last_name}!
						</h1>
						<Card className="mx-auto mt-5 mb-5 h-96 overflow-y-auto">
							<>
								<h2>Your id: {user.id}</h2>
								<h2>Your email: {user.email}</h2>
								{user.is_admin ? (
									<div>
										<h2>Total Revenue: {amount.earned}</h2>
									</div>
								) : (
									<div>
										<div className="flex flex-col">
											{transactions && transactions.length > 0 ? (
												<div>
													<h2>Your Transactions:</h2>
													{transactions.map((transaction) => (
														<div key={transaction.id}>
															{transaction.description}
														</div>
													))}
												</div>
											) : (
												<p>You have no pending fees.</p>
											)}
											<p>Total you owe: {amount.owned}</p>

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
											<p>Total you earned: {amount.earned}</p>
										</div>
									</div>
								)}
							</>
						</Card>

						<Card className="mx-auto h-96 overflow-y-auto">
							{properties && properties.length > 0 ? (
								<div className="flex flex-col items-center justify-center">
									<h2 className="text-tremor-title font-medium text-center mt-1">
										Your Properties:
									</h2>
									<ul>
										{properties.map((property) => (
											<li key={property.id}>
												<Card className="p-5 w-100 mb-5">
													<Link
														href={`/homeseeker/viewproperty?id=${property.id}`}
														className="text-black visited:text-black"
													>
														<div className="mb-3 flex flex-row items-center gap-10">
															<h2 className="text-tremor-title font-medium">
																Address: {property.address}
															</h2>
															<p>Zipcode: {property.zipcode}</p>
															<p>Type: {property.type}</p>
														</div>
													</Link>
												</Card>
											</li>
										))}
									</ul>
								</div>
							) : (
								<Link
									href="/homeseeker/registerproperty"
									className="visited:text-black"
								>
									<span>
										You have no property registered. Register now to start your
										journey!
									</span>
								</Link>
							)}
						</Card>
					</div>
					<div>
						<Card className="mx-auto overflow-y-auto h-96">
							{propertyAppointments && propertyAppointments.length > 0 ? (
								<div className="flex flex-col items-center justify-center">
									<h2 className="text-tremor-title font-medium text-center">
										Appointments for your property:
									</h2>
									<ul>
										{propertyAppointments.map((appointment) => (
											<li key={appointment.id}>
												<Card className="p-5 w-100 mb-5">
													<Link
														href={`/homeseeker/viewproperty/?id=${appointment.id}`}
														className="text-black visited:text-black"
													>
														<div className="mb-3 flex flex-row items-center gap-10">
															<div>
																<p>Location: {appointment.address}</p>
																<p>
																	By: {appointment.first_name}{" "}
																	{appointment.last_name}
																</p>
																<p>{appointment.type}</p>
															</div>
															<div>
																<p>
																	Start Time:
																	{new Date(appointment.start).toLocaleString()}
																</p>
																<p>
																	End Time:{" "}
																	{new Date(appointment.end).toLocaleString()}
																</p>
															</div>
														</div>
													</Link>
												</Card>
											</li>
										))}
									</ul>
								</div>
							) : (
								<p>
									No appointments found. Check your schedules or properties!
								</p>
							)}
						</Card>
					</div>
					<Card className="h-96 mx-auto overflow-y-auto">
						{appointments && appointments.length > 0 ? (
							<div className="flex flex-col items-center justify-center">
								<h2 className="text-tremor-title font-medium text-center">
									Upcoming Appointments
								</h2>
								<ul>
									{appointments.map((appointment) => (
										<li key={appointment.id}>
											<Card className="p-5 mb-5">
												<Link
													href={`/homeseeker//viewproperty/?id=${appointment.id}`}
													className="text-black visited:text-black"
												>
													<div className="mb-3 flex flex-row items-center gap-10">
														<div>
															<p>Location: {appointment.address}</p>
															<p>
																By: {appointment.first_name}{" "}
																{appointment.last_name}
															</p>
															<p>{appointment.type}</p>
														</div>
														<div>
															<p>
																Start Time:
																{new Date(appointment.start).toLocaleString()}
															</p>
															<p>
																End Time:{" "}
																{new Date(appointment.end).toLocaleString()}
															</p>
														</div>
													</div>
												</Link>
											</Card>
										</li>
									))}
								</ul>
							</div>
						) : (
							<p>No upcoming appointments.</p>
						)}
					</Card>
				</div>
			) : (
				<div className="grid place-items-center h-screen">
					<Button>
						<Link
							href="/auth/sign-in"
							className="text:white visited:text-white"
						>
							<span>Please sign in to view your account!</span>
						</Link>
					</Button>
				</div>
			)}
		</div>
	);
};

export default Account;
