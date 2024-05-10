import { Button, Card } from "@tremor/react";

import { getServices } from "@/db/tutortime/services";

export default async function Home() {
	const services = await getServices();

	return (
		<div className="container mx-auto py-20">
			<h1 className="mb-5 text-tremor-metric font-medium">Services</h1>
			<div className="grid grid-cols-2 gap-5">
				{services.map((service) => (
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
							<Button className="ml-auto">Book Now!</Button>
						</div>
						<p>{service.description}</p>
					</Card>
				))}
			</div>
		</div>
	);
}
