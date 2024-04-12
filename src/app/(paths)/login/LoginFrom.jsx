import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import PasswordOutlined from "@mui/icons-material/PasswordOutlined";
import carLogo from "@/assets/carLogo.png";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Input from "@mui/joy/Input";
import { login } from "@/lib/accountManagement";

const LoginFrom = () => {
	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState("success");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const email = document.querySelector("#email").value;
			const password = document.querySelector("#password").value;
			await login(email, password);
			setAlertType("success");
			setAlertVisible(true);
			setAlertMessage("Logged In Successfully");
			setTimeout(() => {
				console.log("Redirecting...");
				window.location.href = "/";
			}, 2000);
		} catch (error) {
			setAlertType("error");
			setAlertVisible(true);
			setAlertMessage(error.message);
		}
	};
	return (
		<form className="w-1/5 flex flex-col items-center gap-10 relative ">
			<div>
				<Image src={carLogo} alt="carLogo" width={150} height={150} />
			</div>
			<div className="flex flex-col gap-3 items-center">
				<Input
					startDecorator={<MailIcon />}
					placeholder="Enter Email"
					className="bg-input-bg shadow-lg"
					variant="plain"
					id="email"
					sx={{
						"--Input-minHeight": "60px",
						"--Input-paddingInline": "20px",
						"--Input-radius": "10px",
					}}></Input>
				<Input
					startDecorator={<PasswordOutlined />}
					placeholder="Enter Password"
					type="password"
					className="bg-input-bg shadow-lg"
					variant="plain"
					id="password"
					sx={{
						"--Input-minHeight": "60px",
						"--Input-paddingInline": "20px",
						"--Input-radius": "10px",
					}}></Input>
				<p>
					Dont Have An Account?{" "}
					<Link href={"/register"}>
						<u>Sign Up</u>
					</Link>
				</p>
			</div>
			<Button
				variant="contained"
				className="bg-main-black text-main-bg hover:bg-main-gray hover:text-main-bg transition-all duration-300 ease-in-out"
				size="large"
				onClick={handleSubmit}>
				Sign In
			</Button>
			<div className="relative flex flex-row justify-center">
				<Alert
					severity={alertType == "success" ? "success" : "error"}
					className={`absolute text-nowrap  ${alertVisible ? "" : "hidden"}`}>
					{alertMessage}
				</Alert>
			</div>
		</form>
	);
};

export default LoginFrom;
