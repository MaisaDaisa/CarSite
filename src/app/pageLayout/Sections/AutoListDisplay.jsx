import React, { useEffect } from "react";
import CarCard from "@/components/CarCard";
import Button from "@mui/joy/Button";
import { modularGetPosts } from "@/lib/postManagement";
import { getListOfLikes } from "@/lib/favortiesManager";

const AutoListDisplay = ({
	searchParam,
	minYear,
	maxYear,
	minPrice,
	maxPrice,
	loading,
	setLoading,
}) => {
	const [cars, setCars] = React.useState([]);
	const [lastItem, setLastItem] = React.useState(null);
	const [favoritesList, setFavoritesList] = React.useState([]);
	const [lastParams, setLastParams] = React.useState({
		minPrice: minPrice,
		maxPrice: maxPrice,
		minYear: minYear,
		maxYear: maxPrice,
		searchParam: searchParam,
	});

	useEffect(() => {
		getListOfLikes().then((data) => {
			setFavoritesList(data);
		});
	}, []);

	useEffect(() => {
		console.log("searchParam", searchParam, typeof searchParam);
		console.log("minYear", minYear, typeof minYear);
		console.log("maxYear", maxYear, typeof maxYear);
		console.log("minPrice", minPrice, typeof minPrice);
		console.log("maxPrice", maxPrice, typeof maxPrice);
	}, [minYear, maxYear, minPrice, maxPrice, searchParam]);

	useEffect(() => {
		console.log("lastItem", lastItem);
	}, [lastItem]);

	useEffect(() => {
		if (loading === false) return;
		const fetchData = async () => {
			let data = [];
			data = await modularGetPosts({
				searchText: searchParam !== "" ? searchParam : null,
				lastItem: lastItem,
				minYear: minYear >= 1900 && maxYear > minYear ? minYear : 1900,
				maxYear: maxYear !== null && maxYear > minYear ? maxYear : null,
				minPrice: minPrice !== NaN && minPrice < maxPrice ? minPrice : 0,
				maxPrice: maxPrice !== NaN && maxPrice > minPrice ? maxPrice : null,
			});
			console.log("Data", data);
			if (data.length > 0) {
				setLastItem(data[data.length - 1].datePosted);
			}
			setCars((prev) => [...prev, ...data]);

			setLoading(false);
		};
		fetchData();
	}, [loading]);

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
							priceNegotiation={car.priceNegotiation}
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
