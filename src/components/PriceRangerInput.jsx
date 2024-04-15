import React, { useEffect } from "react";
import Input from "@mui/joy/Input";
import Switch from "@mui/joy/Switch";
import { switchClasses } from "@mui/joy/Switch";

// endDecorator={
//     <React.Fragment>
//         <Divider orientation="vertical" />
//         <Select
//             variant="plain"
//             value={currency}
//             onChange={(_, value) => setCurrency(value)}
//             slotProps={{
//                 listbox: {
//                     variant: "outlined",
//                 },
//             }}
//             sx={{
//                 mr: -1.5,
//                 bgcolor: "transparent",
//                 ":hover": { bgcolor: "transparent" },
//             }}>
//             <Option value="lari">₾</Option>
//             <Option value="dollar">$</Option>
//         </Select>
//     </React.Fragment>
// }
const PriceRangeInput = () => {
	const [currency, setCurrency] = React.useState("lari");
	const [minPrice, setMinPrice] = React.useState("");
	const [maxPrice, setMaxPrice] = React.useState("");

	return (
		<div className="flex flex-row items-center gap-2 w-fit">
			<div className="flex flex-col items-center gap-2 ">
				<Input
					type="number"
					placeholder="Min Price"
					startDecorator={{ lari: "₾", dollar: "$" }[currency]}
					fullWidth
					onChange={(e) => setMinPrice(e.target.value)}
					className="font-bold"
					sx={{
						maxWidth: "190px",
						"--Input-minHeight": "45px",
						"--Input-paddingInline": "15px",
						"--Input-radius": "60px",
					}}
				/>
				<Input
					type="number"
					placeholder="Max Price"
					startDecorator={{ lari: "₾", dollar: "$" }[currency]}
					fullWidth
					onChange={(e) => setMaxPrice(e.target.value)}
					className="font-bold"
					sx={{
						maxWidth: "190px",
						"--Input-minHeight": "45px",
						"--Input-paddingInline": "15px",
						"--Input-radius": "60px",
					}}
				/>
			</div>
			<div className="flex flex-row  lg:justify-center items-center w-full gap-2">
				<Switch
					startDecorator={<p className="text-lg">₾</p>}
					endDecorator={<p className="text-lg">$</p>}
					onChange={() => setCurrency(currency === "lari" ? "dollar" : "lari")}
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

export default PriceRangeInput;
