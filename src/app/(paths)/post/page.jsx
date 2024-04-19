"use client";
import React, { useEffect, useState } from "react";
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
import { setAlertVisibilityTimer } from "@/util/alertVisibilityTimer";
import Alert from "@mui/material/Alert";
import { Switch } from "@mui/joy";

const Page = () => {
	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState("success");
	const [year, setYear] = useState(null);
	const [brand, setBrand] = useState(null);
	const [disableModel, setDisableModel] = useState(true);
	const [model, setModel] = useState("");
	const [price, setPrice] = useState(null);
	const [priceNegotiation, setPriceNegotiation] = useState(false);
	const [carType, setCarType] = useState(null);
	const [fuelType, setFuelType] = useState(null);
	const [currency, setCurrency] = useState("lari");
	const [location, setLocation] = useState(null);
	const [image, setImage] = useState(null);

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

	useEffect(() => {
		if (image) {
			setAlertMessage("Image Cropped Successfully");
			setAlertType("success");
			setAlertVisibilityTimer(setAlertVisible);
		}
	}, [image]);

	const handleSubmission = () => {
		switch (true) {
			case !price || (price === 0 && !priceNegotiation):
				setAlertMessage("Price is required");
				setAlertType("error");
				setAlertVisibilityTimer(setAlertVisible);
				break;
			case !year:
				setAlertMessage("Year is required");
				setAlertType("error");
				setAlertVisibilityTimer(setAlertVisible);
				break;
			case !brand:
				setAlertMessage("Brand is required");
				setAlertType("error");
				setAlertVisibilityTimer(setAlertVisible);
				break;
			case !model:
				setAlertMessage("Model is required");
				setAlertType("error");
				setAlertVisibilityTimer(setAlertVisible);
				break;
			case !carType:
				setAlertMessage("Car Type is required");
				setAlertType("error");
				setAlertVisibilityTimer(setAlertVisible);
				break;
			case !fuelType:
				setAlertMessage("Fuel Type is required");
				setAlertType("error");
				setAlertVisibilityTimer(setAlertVisible);
				break;
			case !currency:
				setAlertMessage("Currency is required");
				setAlertType("error");
				setAlertVisibilityTimer(setAlertVisible);
				break;
			case !location:
				setAlertMessage("Location is required");
				setAlertType("error");
				setAlertVisibilityTimer(setAlertVisible);
				break;
			case !image:
				setAlertMessage("Please, Crop the Image");
				setAlertType("error");
				setAlertVisibilityTimer(setAlertVisible);
				break;
			default:
				try {
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
					).then(() => {
						setAlertMessage("Post created successfully");
						setAlertType("success");
						setAlertVisibilityTimer(setAlertVisible);
					});
				} catch (error) {
					setAlertMessage("Error while creating post");
					setAlertType("error");
					setAlertVisibilityTimer(setAlertVisible);
					return;
				}
		}
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
							value={year}
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
				<div className="relative flex flex-row justify-center">
					<Alert
						severity={alertType == "success" ? "success" : "error"}
						className={`absolute text-nowrap  ${alertVisible ? "" : "hidden"}`}>
						{alertMessage}
					</Alert>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Page;
