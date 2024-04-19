import React, { useEffect, useState } from "react";
import DefaultLayout from "@/app/pageLayout/DefaultLayout";
import Image from "next/image";
import { getPostById } from "@/lib/postManagement";
import PriceDisplay from "./PriceDisplay";
import { useParams } from "next/navigation";
import defaultProfile from "../../../../assets/defaultProfile.jpg";
import { getTimeDifference } from "@/util/getTimeDifference";
import { checkLiked } from "@/lib/favortiesManager";
import { likeFunc } from "@/lib/favortiesManager";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CarsPage = () => {
	const params = useParams();
	const [post, setPost] = useState([]);
	const [isFavorite, setIsFavorite] = useState(false);
	const [id, setId] = useState(params.id);
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		getPostById(id).then((data) => {
			setPost(data);
		});
	}, [id]);

	useEffect(() => {
		checkLiked(id).then((data) => {
			setIsFavorite(data.isLiked);
		});
	}, [id]);

	return (
		<DefaultLayout>
			{post.id ? (
				<div className="flex flex-col lg:flex-row gap-12 lg:justify-evenly h-full p-16 bg-secondary-gray m-4 rounded-3xl">
					<div className="flex flex-col">
						<div className="relative">
							<div className="relative ">
								<Image
									src={post.imageUrl}
									alt="carImage"
									width={900}
									height={500}
									className={`rounded-lg ${
										!hasLoaded ? "opacity-10" : "opacity-100"
									}`}
									onLoadingComplete={() => {
										setHasLoaded(true);
									}}
								/>
							</div>
							<div
								className="absolute bottom-2 right-2"
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
						</div>
						<div className="flex flex-row justify-between p-2 items-center">
							<div className="flex flex-row items-center gap-2">
								<Image
									src={post.author.avatar ? post.author.avatar : defaultProfile}
									width={50}
									height={50}
									alt="authorAvatar"
									className="rounded-full"
								/>
								<p className="font-bold text-2xl">{post.author.name}</p>
							</div>
							<p>{getTimeDifference(post.datePosted)}</p>
						</div>
					</div>
					<div className="flex flex-col justify-start items-start h-full">
						{post.priceNegotiation ? (
							<p className="flex items-center text-4xl leading-[1] text-center text-gray-800 font-bold pr-[4px]">
								Negotiate For Price
							</p>
						) : (
							<PriceDisplay price={post.price} currency={post.currency} />
						)}

						<h1 className="font-semibold text-2xl mt-8">
							{post.brand} {post.model}
						</h1>
						<div className="mt-20 flex flex-col justify-self-center p-2 w-full bg-white rounded-xl border-radius-12 mb-[16px] lg:mb-0">
							{[
								{ Year: post.year },
								{ Brand: post.brand },
								{ Model: post.model },
								{ "Car Type": post.carType },
								{ "Engine Type": post.fuelType },
								{ Location: post.location },
							].map((item, index) => (
								<div
									className="grid grid-cols-2 p-2 w-full flex-row gap-2"
									key={index}>
									<h3 className="text-gray-600 border-r-[1px]">
										{Object.keys(item)}
									</h3>
									<h3>{Object.values(item)}</h3>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<div class="flex flex-col lg:flex-row gap-12 lg:justify-evenly h-full p-16 bg-secondary-gray m-4 rounded-3xl">
					<div class="flex flex-col">
						<div class="relative">
							<div class="absolute bottom-2 right-2">
								<div class="skeleton-icon"></div>
							</div>
							<div class="relative">
								<div class="skeleton-image"></div>
							</div>
						</div>
						<div class="flex flex-row justify-between p-2 items-center">
							<div class="flex flex-row items-center gap-2">
								<div class="skeleton-avatar"></div>
								<div class="skeleton-name"></div>
							</div>
							<div class="skeleton-date"></div>
						</div>
						<div class="flex flex-col justify-start items-start h-full">
							<div class="flex flex-row w-full h-24px gap-10 items-center text-nowrap">
								<div class="skeleton-price"></div>
								<div class="skeleton-switch"></div>
							</div>
							<div class="skeleton-title"></div>
							<div class="skeleton-details"></div>
						</div>
					</div>
				</div>
			)}
		</DefaultLayout>
	);
};

export default CarsPage;
