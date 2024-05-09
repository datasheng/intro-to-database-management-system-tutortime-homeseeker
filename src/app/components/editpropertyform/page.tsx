"use client";

import { Property } from "@/db/homeseeker/property";
import { Button, Card, NumberInput, TextInput } from "@tremor/react";
import { useState } from "react";
import { deletePropertyById, updatePropertyDetails } from "./actions";

const Editproperty = ({
	property_id,
	property,
}: { property_id: number; property: Property | null }) => {
	const [editMode, setEditMode] = useState(false);
	const [input, setInput] = useState({
		address: property?.address,
		zipcode: property?.zipcode,
		type: property?.type,
		rooms: property?.rooms,
		area: property?.area,
		price: property?.price,
		built: property?.built,
	} as Partial<Property>);
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async () => {
		const success = await deletePropertyById(property_id);
		if (success) {
			alert("Property deleted successfully");
		} else {
			alert("Failed to delete the property");
		}
	};

	const handleEdit = () => {
		setEditMode(true);
	};

	const handleCancel = () => {
		setEditMode(false);
	};

	const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await updatePropertyDetails(property_id, input);
		if (response) {
			if (typeof response === "string") {
				setError(response);
			} else {
				setError(null);
				setEditMode(false);
				window.location.reload();
			}
		} else {
			console.log(response);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInput((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="container">
			<div className="flex flex-col gap-5 items-center justify-center">
				{editMode && (
					<Card className="mt-5 p-4">
						<h2 className="text-lg font-semibold mb-2">Edit Property</h2>
						<form onSubmit={handleSave}>
							<TextInput
								name="address"
								value={input.address}
								onChange={handleChange}
								placeholder="Address"
								required
							/>
							<TextInput
								name="type"
								value={input.type}
								onChange={handleChange}
								placeholder="Type"
								required
							/>
							<NumberInput
								name="zipcode"
								value={input.zipcode}
								onChange={handleChange}
								placeholder="Zipcode"
								required
							/>
							<NumberInput
								name="rooms"
								value={input.rooms}
								onChange={handleChange}
								placeholder="Rooms"
							/>
							<NumberInput
								name="area"
								value={input.area}
								onChange={handleChange}
								placeholder="Area"
							/>
							<NumberInput
								name="price"
								value={input.price}
								onChange={handleChange}
								placeholder="Price"
							/>
							<NumberInput
								name="built"
								value={input.built}
								onChange={handleChange}
								placeholder="Year Built"
							/>
							<div className="h-4">
								{error && (
									<small className="text-sm text-red-500">{error}</small>
								)}
							</div>
							<div className="flex flex-row mt-4">
								<Button type="submit">Save</Button>
								<Button onClick={handleCancel} className="bg-red-500">
									Cancel
								</Button>
							</div>
						</form>
					</Card>
				)}
				{!editMode && <Button onClick={handleEdit}>Edit</Button>}
				<Button onClick={handleDelete} className="bg-red-500">
					Delete
				</Button>
			</div>
		</div>
	);
};

export default Editproperty;
