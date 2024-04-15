"use client";
import React, { useEffect } from "react";
import DefaultLayout from "@/app/pageLayout/DefaultLayout";
import YearPicker from "@/components/YearPicker";
import CarBrandPicker from "@/components/CarBrandPicker";
import PriceInput from "@/components/PriceInput";
import ModelPicker from "@/components/ModelPicker";
import CarTypePicker from "@/components/CarTypePicker";
import FuelTypePicker from "@/components/FuelTypePicker";
import LocationPicker from "@/components/LocationPicker";
import ImageCropper from "@/components/ImageCropper/ImageCropper";
import Button from "@mui/material/Button";
import { createPost } from "@/lib/postManagement";

const Page = () => {
	const [year, setYear] = React.useState(null);
	const [brand, setBrand] = React.useState(null);
	const [disableModel, setDisableModel] = React.useState(true);
	const [model, setModel] = React.useState("");
	const [price, setPrice] = React.useState(null);
	const [priceNegotiation, setPriceNegotiation] = React.useState(false);
	const [carType, setCarType] = React.useState(null);
	const [fuelType, setFuelType] = React.useState(null);
	const [currency, setCurrency] = React.useState("lari");
	const [location, setLocation] = React.useState(null);
	const [image, setImage] = React.useState(null);

	useEffect(() => {
		console.log("Year: ", year);
		console.log("Brand: ", brand);
		console.log("Model: ", model);
		console.log("Price: ", price);
		console.log("Car Type: ", carType);
		console.log("Fuel Type: ", fuelType);
		console.log("Currency: ", currency);
		console.log("Location: ", location);
		console.log("Image: ", image);
		console.log("Price Negotiation: ", priceNegotiation);
	}, [
		year,
		brand,
		model,
		price,
		carType,
		fuelType,
		currency,
		location,
		image,
		priceNegotiation,
	]);

	useEffect(() => {
		if (priceNegotiation) {
			setPrice(0);
		}
	}, [priceNegotiation]);

	useEffect(() => {
		if (brand) {
			setDisableModel(false);
		} else {
			setDisableModel(true);
		}
	}, [brand]);

	useEffect(() => {
		if (!brand) {
			setModel(null);
		}
	}, [brand]);

	const handleSubmission = () => {
		if (!price && !priceNegotiation) {
			alert("Please enter a price");
			return;
		}
		if (!year) {
			alert("Please enter a year");
			return;
		}
		if (!brand) {
			alert("Please enter a brand");
			return;
		}
		if (!model) {
			alert("Please enter a model");
			return;
		}
		if (!carType) {
			alert("Please enter a car type");
			return;
		}
		if (!fuelType) {
			alert("Please enter a fuel type");
			return;
		}
		if (!location) {
			alert("Please enter a location");
			return;
		}
		if (!image) {
			alert("Please upload an image");
			return;
		}
		createPost(
			year,
			brand.brand,
			model,
			price,
			carType,
			fuelType,
			currency,
			location,
			priceNegotiation,
			image
		);
	};

	return (
		<DefaultLayout>
			<div className="flex flex-col items-center my-16 gap-10">
				<div className="flex flex-col md:flex-row self-center w-10/12 gap-20 h-full border-b-2 md:border-b-0 border-main-black pb-7">
					<div className="flex flex-row md:flex-col  flex-wrap justify-start gap-4 w-full md:w-1/2">
						<CarBrandPicker
							placeholder={"Car Brand"}
							id={"brad"}
							setter={setBrand}
							width={"250px"}
						/>
						<ModelPicker
							width={"250px"}
							id={"model"}
							setter={setModel}
							models={brand !== null ? brand.models : []}
							disabled={disableModel}
							placeholder={"Car Model"}
						/>
						<CarTypePicker
							width="250px"
							id="car-type"
							setter={setCarType}
							placeholder={"Car Type"}
						/>
						<FuelTypePicker
							width="250px"
							id="fuel-type"
							setter={setFuelType}
							placeholder={"Fuel Type"}
						/>
						<YearPicker
							width="250px"
							id="year-picker"
							placeholder="Manufacture Year"
							setter={setYear}
						/>
						<PriceInput
							width={"250px"}
							placeholder={"Price"}
							id={"price"}
							priceSetter={setPrice}
							currencySetter={setCurrency}
							negotiation={priceNegotiation}
							setNegotiation={setPriceNegotiation}
							selectedPrice={price}
						/>
						<LocationPicker
							placeholder={"Location"}
							id={"location"}
							width={"250px"}
							setter={setLocation}
						/>
					</div>
					<div className="flex flex-col items-center justify-start gap-4 w-full md:w-2/3">
						<ImageCropper updateParentImage={setImage} />
					</div>
				</div>
				<Button
					size="large"
					variant="contained"
					className="bg-main-black font-bold text-main-bg hover:text-main-black hover:bg-main-bg rounded-3xl"
					onClick={() => handleSubmission()}>
					Submit
				</Button>
			</div>
		</DefaultLayout>
	);
};

export default Page;
