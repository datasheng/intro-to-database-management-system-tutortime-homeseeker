"use client";

import { Property } from "@/db/homeseeker/property";
import { Button, Card, NumberInput, TextInput } from "@tremor/react";
import React, { useState } from "react";
import { deletePropertyById, updatePropertyDetails } from "./actions";

interface EditPropertyFormProps {
	property: Property;
	onSubmit: () => void;
}

export const EditPropertyForm: React.FC<EditPropertyFormProps> = ({
	property,
	onSubmit,
}) => {
	const [editMode, setEditMode] = useState(false);
	const [input, setInput] = useState({
		address: property.address ?? "",
		zipcode: property.zipcode ?? "",
		type: property.type ?? "",
		rooms: property.rooms ?? "",
		area: property.area ?? "",
		price: property.price ?? "",
		built: property.built ?? "",
	});
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async () => {
		const success = await deletePropertyById(property.id);
		if (success) {
			alert("Property deleted successfully");
			onSubmit();
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
		const response = await updatePropertyDetails(property.id, input);
		if (response) {
			setError(null);
			setEditMode(false);
			onSubmit();
		} else {
			setError("Failed to update the property");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInput((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="container mx-auto py-5">
			<Card className="max-w-96 p-4 bg-white rounded-lg shadow">
				{editMode ? (
					<form onSubmit={handleSave}>
						<h2 className="text-lg font-semibold mb-2">Edit Property</h2>
						<TextInput
							name="address"
							value={input.address}
							onChange={handleChange}
							placeholder="Address"
							required
						/>
						<TextInput
							name="zipcode"
							value={input.zipcode.toString()}
							onChange={handleChange}
							placeholder="Zipcode"
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
							name="rooms"
							value={input.rooms}
							onChange={handleChange}
							placeholder="Rooms"
							required
						/>
						<TextInput
							name="area"
							value={input.area.toString()}
							onChange={handleChange}
							placeholder="Area"
							required
						/>
						<TextInput
							name="price"
							value={input.price.toString()}
							onChange={handleChange}
							placeholder="Price"
							required
						/>
						<TextInput
							name="built"
							value={input.built.toString()}
							onChange={handleChange}
							placeholder="Year Built"
							required
						/>
						{error && <div className="text-sm text-red-500">{error}</div>}
						<div className="flex space-x-4 mt-4">
							<Button
								type="submit"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							>
								Save
							</Button>
							<Button
								onClick={handleCancel}
								className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
							>
								Cancel
							</Button>
						</div>
					</form>
				) : (
					<div className="text-center">
						<Button
							onClick={handleEdit}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							Edit
						</Button>
						<Button
							onClick={handleDelete}
							className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
						>
							Delete
						</Button>
					</div>
				)}
			</Card>
		</div>
	);
};
