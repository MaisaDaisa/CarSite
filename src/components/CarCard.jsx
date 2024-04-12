import Image from "next/image";
import React from "react";

const CarCard = ({
	imgSrc,
	brandName,
	Model,
	year,
	price,
	currency,
	location,
	carType,
	fuelType,
}) => {
	const carDetails = {
		imgSrc: imgSrc,
		brandName: brandName,
		Model: Model,
		year: year,
		price: price,
		currency: currency,
		location: location,
		carType: carType,
		fuelType: fuelType,
	};
	console.log(carDetails);
	return (
		<div>
			<div className="flex flex-col w-[200px]  bg-white rounded-2xl shadow-lg">
				<Image
					src={carDetails.imgSrc}
					width={300}
					height={200}
					className="rounded-t-2xl"
				/>
				<div className="p-4">
					<p className="text-xs font-medium opacity-70 text-gray-400">
						{carDetails.location}
					</p>
					<h1 className="text-sm mt-1 font-medium overflow-hidden text-ellipsis">
						{carDetails.year} - {carDetails.brandName} {carDetails.Model}
					</h1>

					<p className="text-md mt-4 font-semibold">
						{carDetails.price} {carDetails.currency === "lari" ? "₾" : "$"}
					</p>

					<div className="border-t-[1px] py-2 border-slate-400 justify-around flex mt-6">
						<p className="text-xs font-semibold  bg-secondary-gray px-3 rounded-lg opacity-70 py-2">
							{carDetails.carType}
						</p>
						<p className="text-xs font-semibold bg-secondary-gray px-3 rounded-lg opacity-70 py-2">
							{carDetails.fuelType}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CarCard;
