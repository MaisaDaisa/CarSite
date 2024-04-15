import React from "react";
import { Input } from "@mui/joy";
import { Button } from "@mui/joy";
import Switch from "@mui/joy/Switch";
import { switchClasses } from "@mui/joy/Switch";

const PriceInput = ({
	width,
	priceSetter,
	placeholder,
	currencySetter,
	selectedPrice,
	negotiation,
	setNegotiation,
}) => {
	const [currency, setCurrency] = React.useState("lari");
	return (
		<div className="flex flex-row gap-5">
			<Input
				type="number"
				placeholder={negotiation ? "Negotiate for Price" : placeholder}
				value={negotiation ? "On price Offer" : selectedPrice}
				disabled={negotiation}
				endDecorator={
					<Button
						variant="contained"
						onClick={() => {
							setCurrency(currency === "lari" ? "dollar" : "lari");
							currencySetter(currency === "lari" ? "dollar" : "lari");
						}}
						sx={{
							borderRadius: "0 60px 60px 0",
							backgroundColor: "var(--color-primary)",
							color: "var(--color-white)",
							width: "150%",
						}}>
						{currency === "lari" ? "₾" : "$"}
					</Button>
				}
				fullWidth
				onChange={(e) => priceSetter(e.target.value)}
				className="font-bold"
				sx={{
					maxWidth: width,
					minHeight: "45px",
					"--Input-maxHeight": "45px",
					"--input-minHeight": "45px",
					"--Input-paddingInline": "15px",
					"--Input-radius": "60px",
				}}
			/>
			<Switch
				onChange={() => setNegotiation(!negotiation)}
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
	);
};

export default PriceInput;
