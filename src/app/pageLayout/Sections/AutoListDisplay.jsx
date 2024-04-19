import React, { useCallback, useEffect, useState } from "react";
import CarCard from "@/components/CarCard";
import Button from "@mui/joy/Button";
import { modularGetPosts } from "@/lib/postManagement";
import { getListOfLikes } from "@/lib/favortiesManager";
import Alert from "@mui/material/Alert";
import { setAlertVisibilityTimer } from "@/util/alertVisibilityTimer";
import CircularProgress from "@mui/material/CircularProgress";

const AutoListDisplay = ({
	limit,
	lastItem,
	setLastItem,
	cars,
	setCars,
	searchParam,
	minYear,
	maxYear,
	minPrice,
	maxPrice,
	loading,
	setLoading,
}) => {
	const [favoritesList, setFavoritesList] = useState([]);
	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState("success");

	const fetchData = useCallback(async () => {
		let data = [];
		data = await modularGetPosts({
			limit: limit,
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
			setCars((prev) => [...prev, ...data]);
		} else {
			setAlertType("error");
			setAlertMessage("No More Cars Found");
			setAlertVisibilityTimer(setAlertVisible, 3000);
		}
		setLoading(false);
	}, [
		searchParam,
		lastItem,
		minYear,
		maxYear,
		minPrice,
		maxPrice,
		modularGetPosts,
		setLastItem,
		setCars,
		setLoading,
	]);

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
		if (loading === false) return;
		fetchData();
	}, [loading]);

	const handleShowMore = () => {
		setLoading(true);
	};

	return (
		<div className=" bg-main-bg px-8 flex gap-6 flex-col justify-start items-center p-2 w-full h-full">
			<div className="flex flex-row min-h-[80dvh] justify-evenly gap-8 mt-8 lg:mt-0 w-full h-full flex-wrap">
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
				<CircularProgress disableShrink sx={{ color: "black" }} />
			) : (
				<div className="flex flex-col items-center gap-2">
					<Button
						sx={{
							color: "white",
						}}
						className="bg-main-gray hover:text-main-black hover:bg-secondary-gray transition-all duration-300
				text-2xl rounded-2xl p-3 lg:text-base"
						onClick={handleShowMore}>
						Show More
					</Button>
					<Alert
						severity={alertType == "success" ? "success" : "error"}
						className={`text-nowrap  ${alertVisible ? "" : "hidden"}`}>
						{alertMessage}
					</Alert>
				</div>
			)}
		</div>
	);
};

export default AutoListDisplay;
