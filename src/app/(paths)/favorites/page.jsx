"use client";
import React from "react";
import DefaultLayout from "@/app/pageLayout/DefaultLayout";
import { getLikedPosts } from "@/lib/postManagement";
import CarCard from "@/components/CarCard";

const page = () => {
	const [favoritesList, setFavoritesList] = React.useState([]);
	React.useEffect(() => {
		getLikedPosts().then((data) => {
			setFavoritesList(data);
		});
	}, []);
	return (
		<DefaultLayout>
			<div className="flex flex-col items-center md:flex-row md:justify-center gap-10 mt-20">
				{favoritesList &&
					favoritesList.map((car) => (
						<CarCard
							key={car.id}
							id={car.id}
							imgSrc={car.imageUrl}
							brandName={car.brand}
							Model={car.model}
							year={car.year}
							price={car.price}
							currency={car.currency}
							location={car.location}
							carType={car.carType}
							fuelType={car.fuelType}
							favoritesList={[car.id]}
							priceNegotiation={car.priceNegotiation}
						/>
					))}
			</div>
		</DefaultLayout>
	);
};

export default page;
