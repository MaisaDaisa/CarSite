import React from "react";
import CarCard from "@/components/CarCard";
import coolCar from "../../../assets/coolCar.jpg";
import Button from "@mui/joy/Button";

const AutoListDisplay = () => {
	const handleShowMore = () => {
		console.log("Show More");
	};
	return (
		<div className=" bg-main-bg px-8 flex gap-6 flex-col justify-start items-center p-2 w-full h-full">
			<div className="flex flex-row justify-evenly gap-8 mt-8 lg:mt-0 w-full h-full flex-wrap">
				{Array(20)
					.fill()
					.map((_, index) => (
						<CarCard
							key={index}
							imgSrc={coolCar}
							Model={"CL63s"}
							brandName={"Mercedes"}
							carType={"სედანი"}
							currency={"lari"}
							fuelType={"ბენზინი"}
							location={"თბილისი"}
							price={10000}
							year={2015}
						/>
					))}
			</div>
			<Button
				sx={{
					color: "white",
				}}
				className="bg-main-gray hover:text-main-black hover:bg-secondary-gray transition-all duration-300
				text-2xl rounded-2xl p-3 lg:text-base"
				onClick={handleShowMore}>
				Show More
			</Button>
		</div>
	);
};

export default AutoListDisplay;
