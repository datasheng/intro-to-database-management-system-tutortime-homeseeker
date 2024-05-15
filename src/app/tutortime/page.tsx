"use client"
import { Button, Card } from "@tremor/react";

import { type Service, getServices } from "@/db/tutortime/services";
import { useEffect, useState } from "react";
import { fetchServices } from "./actions";

export default function Home() {
	const [services, setServices] = useState<null | Service[]>(null)

	useEffect(()=>{
		async function populate(){
			const s = await fetchServices()
			setServices(s)
		}
		populate()
	},[])

	function book(service: Service){
		console.log(service)
	}

	return (
		<div className="container mx-auto py-20">
			<h1 className="mb-5 text-tremor-metric font-medium">Services</h1>
			<div className="grid grid-cols-2 gap-5">
				{services?.map((service) => (
					<Card key={service.id}>
						<div className="mb-3 flex items-center">
							<div>
								<h2 className="text-tremor-title font-medium">
									{service.name}
								</h2>
								<p className="text-slate-600 text-sm">
									Offered by {service.admin}
								</p>
							</div>
							<Button className="ml-auto" onClick={() => book(service)}>Book Now!</Button>
						</div>
						<p>{service.description}</p>
					</Card>
				))}
			</div>
		</div>
	);
}
