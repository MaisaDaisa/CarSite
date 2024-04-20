import React from "react";
import Switch from "@mui/joy/Switch";
import { switchClasses } from "@mui/joy/Switch";

const PriceDisplay = ({ price, currency }) => {
	const [currencyState, setCurrencyState] = React.useState(currency);
	const [priceInDollars, setPriceInDollars] = React.useState(
		currency === "dollar" ? price : price / 3.1
	);
	const [priceInLari, setPriceInLari] = React.useState(
		currency === "lari" ? price : price * 3.1
	);

	const handleCurrencyChange = () => {
		setCurrencyState(currencyState === "lari" ? "dollar" : "lari");
	};

	return (
		<div className="flex flex-row w-full gap-10 h-24px items-center text-nowrap">
			<p className="flex items-center text-4xl leading-[1] text-center text-gray-800 font-bold pr-[4px]">
				{parseInt(
					currencyState === "dollar" ? priceInDollars : priceInLari
				).toLocaleString() + " "}
				<span className="w-6">{{ lari: "₾", dollar: "$" }[currencyState]}</span>
			</p>
			<div className="flex flex-row items-center gap-2 font-bold text-lg">
				<Switch
					startDecorator={<p className="text-lg">₾</p>}
					endDecorator={<p className="text-lg">$</p>}
					checked={currencyState === "dollar"}
					onChange={handleCurrencyChange}
					sx={(theme) => ({
						[`& .${switchClasses.thumb}`]: {
							transition: "width 0.2s, left 0.2s",
						},
						[`&.${switchClasses.checked}`]: {
							"--Switch-trackBackground": "rgb(48 209 88)",
							"&:hover": {
								"--Switch-trackBackground": "rgb(48 209 88)",
							},
						},
					})}
				/>
			</div>
		</div>
	);
};

export default PriceDisplay;
