import Image from "next/image";
import React, { useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { likeFunc } from "@/lib/favortiesManager";
import Link from "next/link";

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
}) => {
	const [isFavorite, setIsFavorite] = React.useState(false);
	console.log(typeof price);

	useEffect(() => {
		if (favoritesList.includes(id)) {
			setIsFavorite(true);
		}
	}, [favoritesList]);

	return (
		<div className="flex flex-col md:w-[200px] h-full  bg-white rounded-2xl shadow-lg ">
			<div className="relative">
				<div
					className="absolute top-2 right-2 z-10"
					onClick={() => likeFunc(id)}>
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
				<Image
					alt="carImage"
					src={imgSrc}
					width={600}
					height={400}
					className="rounded-t-2xl"
				/>
			</div>
			<div className="flex flex-col p-4 h-full overflow-y-hidden">
				<p className=" text-lg md:text-xs font-medium opacity-70 text-gray-400">
					{location}
				</p>
				<Link
					href={`/cars/${id}`}
					className=" text-2xl md:text-sm font-medium overflow-hidden text-ellipsis text-nowrap ">
					{year} - {brandName} {Model}
				</Link>

				<p className=" text-3xl md:text-lg mt-4 font-semibold">
					{parseInt(price).toLocaleString()} {currency === "lari" ? "₾" : "$"}
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
