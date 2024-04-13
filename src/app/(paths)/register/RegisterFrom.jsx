import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import PasswordOutlined from "@mui/icons-material/PasswordOutlined";
import PersonIcon from "@mui/icons-material/Person";
import carLogo from "@/assets/carLogo.png";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Input from "@mui/joy/Input";
import { createAccount } from "@/lib/accountManagement";
import { redirect } from "next/navigation";

const RegisterFrom = () => {
	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState("success");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const username = document.querySelector("#username").value;
			const email = document.querySelector("#email").value;
			const password = document.querySelector("#password").value;
			console.log(username, email, password);
			await createAccount(email, password, username);
			setAlertType("success");
			setAlertVisible(true);
			setAlertMessage("Account Created Successfully");
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
			<div className="shrink-0">
				<Image
					src={carLogo}
					alt="carLogo"
					width={150}
					height={150}
					className="shrink-0"
				/>
			</div>
			<div className="flex flex-col gap-3 items-center">
				<Input
					startDecorator={<PersonIcon />}
					placeholder="Enter Username"
					className="bg-input-bg shadow-lg"
					variant="plain"
					id="username"
					sx={{
						"--Input-minHeight": "60px",
						"--Input-paddingInline": "20px",
						"--Input-radius": "10px",
					}}></Input>
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
					Already Have An Account?{" "}
					<Link href={"/login"}>
						<u>Sign In</u>
					</Link>
				</p>
			</div>
			<Button
				variant="contained"
				className="bg-main-black text-main-bg hover:bg-main-gray hover:text-main-bg transition-all duration-300 ease-in-out  text-nowrap"
				size="large"
				onClick={(e) => handleSubmit(e)}>
				Sign Up
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

export default RegisterFrom;
