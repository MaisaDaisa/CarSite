import React, { use, useEffect } from "react";
import CarCard from "@/components/CarCard";
import coolCar from "../../../assets/coolCar.jpg";
import Button from "@mui/joy/Button";
import { getPosts } from "@/lib/postManagement";
import { getListOfLikes } from "@/lib/favortiesManager";

const AutoListDisplay = ({
	searchParam,
	minYear,
	maxYear,
	minPrice,
	maxPrice,
}) => {
	const [cars, setCars] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [lastItem, setLastItem] = React.useState(null);
	const [favoritesList, setFavoritesList] = React.useState([]);

	useEffect(() => {
		getListOfLikes().then((data) => {
			console.log("LkedList", data);
			setFavoritesList(data);
		});
	}, [lastItem]);

	useEffect(() => {
		console.log("searchParam", searchParam);
	}, [searchParam]);

	useEffect(() => {
		if (loading === false) return;
		const fetchData = async () => {
			const data = await getPosts();
			console.log("Data", data);
			setCars(data);
			if (data.length > 0) {
				setLastItem(data[data.length - 1].id);
			}
			setLoading(false);
		};
		fetchData();
	}, [loading]);

	if (minYear && maxYear) {
		console.log("minYear", minYear);
		console.log("maxYear", maxYear);
	}

	if (minPrice && maxPrice) {
		console.log("minPrice", minPrice);
		console.log("maxPrice", maxPrice);
	}

	if (searchParam) {
		console.log("searchParam", searchParam);
	}

	const handleShowMore = () => {
		setLoading(true);
	};
	return (
		<div className=" bg-main-bg px-8 flex gap-6 flex-col justify-start items-center p-2 w-full h-full">
			<div className="flex flex-row justify-evenly gap-8 mt-8 lg:mt-0 w-full h-full flex-wrap">
				{cars.length > 0 &&
					cars.map((car) => (
						<CarCard
							key={car.id}
							id={car.id}
							favoritesList={favoritesList}
							imgSrc={car.imageUrl}
							Model={car.model}
							brandName={car.brand}
							carType={car.carType}
							currency={car.currency}
							fuelType={car.fuelType}
							location={car.location}
							price={car.price}
							year={car.year}
						/>
					))}
			</div>
			{loading ? (
				<p>Loading...</p>
			) : (
				<Button
					sx={{
						color: "white",
					}}
					className="bg-main-gray hover:text-main-black hover:bg-secondary-gray transition-all duration-300
				text-2xl rounded-2xl p-3 lg:text-base"
					onClick={handleShowMore}>
					Show More
				</Button>
			)}
		</div>
	);
};

export default AutoListDisplay;
