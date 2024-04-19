import Image from "next/image";
import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { likeFunc } from "@/lib/favortiesManager";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";

const CarCard = ({
	favoritesList,
	id,
	imgSrc,
	brandName,
	Model,
	year,
	price,
	currency,
	location,
	carType,
	fuelType,
	priceNegotiation,
}) => {
	const [isFavorite, setIsFavorite] = React.useState(false);
	const [loadComplete, setLoadComplete] = React.useState(false);

	useEffect(() => {
		if (favoritesList.includes(id)) {
			setIsFavorite(true);
		}
	}, [favoritesList]);

	return (
		<div className="flex flex-col md:w-[200px] h-full bg-white rounded-2xl shadow-lg relative">
			<div className="absolute top-2 right-2 z-10">
				{isFavorite ? (
					<FavoriteIcon
						onClick={() => setIsFavorite(!isFavorite)}
						className="text-red-500 cursor-pointer"
					/>
				) : (
					<FavoriteBorderIcon
						onClick={() => setIsFavorite(!isFavorite)}
						className="text-red-500 cursor-pointer"
					/>
				)}
			</div>
			<div className="relative">
				{!loadComplete && (
					<Skeleton
						variant="rectangular"
						height={118}
						className="rounded-t-2xl absolute top-0 left-0 w-full h-full"
					/>
				)}
				<Image
					onLoadingComplete={() => setLoadComplete(true)}
					alt="carImage"
					src={imgSrc}
					width={200}
					height={118}
					className={`rounded-t-2xl ${
						!loadComplete ? "opacity-0" : "opacity-100"
					}}`}
				/>
			</div>
			<div className="flex flex-col p-4 h-full overflow-y-hidden">
				<p className="text-lg md:text-xs font-medium opacity-70 text-gray-400">
					{location}
				</p>
				<Link
					href={`/cars/${id}`}
					className="text-2xl md:text-sm font-medium overflow-hidden text-ellipsis text-nowrap">
					{year} - {brandName} {Model}
				</Link>

				<p className="text-3xl md:text-lg mt-4 font-semibold">
					{!priceNegotiation
						? `${parseInt(price).toLocaleString()} ${
								currency === "lari" ? "₾" : "$"
						  }`
						: "Offer Price"}
				</p>
			</div>
			<div className="border-t-[1px] py-2 m-2 border-slate-400 justify-around justify-self-end flex mt-6 items-center">
				<p className="text-lg md:text-xs font-semibold bg-secondary-gray px-5 md:px-3 py-2 rounded-lg opacity-70 ">
					{carType}
				</p>
				<p className="text-lg md:text-xs font-semibold bg-secondary-gray px-5 md:px-3 py-2 rounded-lg opacity-70">
					{fuelType}
				</p>
			</div>
		</div>
	);
};

export default CarCard;
