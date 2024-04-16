import React, { use, useEffect } from "react";
import CarCard from "@/components/CarCard";
import Button from "@mui/joy/Button";
import { modularGetPosts } from "@/lib/postManagement";
import { getListOfLikes } from "@/lib/favortiesManager";

export const SearchParamContext = React.createContext(null);

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

	useEffect(() => {
		getListOfLikes().then((data) => {
			setFavoritesList(data);
		});
	}, []);

	useEffect(() => {
		console.log("lastItem", lastItem);
	}, [lastItem]);

	useEffect(() => {
		if (loading === false) return;
		const fetchData = async () => {
			console.log("SearchParam", searchParam, typeof searchParam);
			console.log("MinYear", minYear, typeof minYear);
			console.log("MaxYear", maxYear, typeof maxYear);
			console.log("MinPrice", minPrice, typeof minPrice);
			console.log("MaxPrice", maxPrice, typeof maxPrice);
			let data = [];
			console.log("LastItem", lastItem);
			data = await modularGetPosts({
				searchText: searchParam !== "" ? searchParam : null,
				lastItem: lastItem,
				minYear: minYear < maxYear && minYear >= 1990 ? minYear : null,
				maxYear:
					maxYear > minYear && maxYear <= new Date().getFullYear()
						? maxYear
						: null,
				minPrice: minPrice !== null && minPrice < maxPrice ? minPrice : 0,
				maxPrice: maxPrice !== null && maxPrice > minPrice ? maxPrice : null,
			});

			console.log("Data", data);
			if (data.length > 0) {
				setLastItem(data[data.length - 1].datePosted);
			}
			setCars((prev) => [...prev, ...data]);

			setLoading(false);
		};
		if (loading) {
			fetchData();
		}
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
