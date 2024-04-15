"use client";
import React, { useEffect } from "react";
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

const page = () => {
	const params = useParams();
	const [post, setPost] = React.useState([]);
	const [isFavorite, setIsFavorite] = React.useState(false);
	const [id, setId] = React.useState(params.id);

	useEffect(() => {
		getPostById(id).then((data) => {
			setPost(data);
		});
	}, []);

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
							<Image
								src={post.imageUrl}
								alt="carImage"
								width={900}
								height={500}
								className="rounded-lg"
							/>
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
						<PriceDisplay priceProp={post.price} currencyProp={post.currency} />
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
				<div>Loading...</div>
			)}
		</DefaultLayout>
	);
};

export default page;
