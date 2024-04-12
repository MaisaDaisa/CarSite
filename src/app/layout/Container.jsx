import React from "react";

const Container = ({ children, addClass }) => {
	return (
		<div
			className={`flex flex-col min-h-screen  overflow-x-hidden ${
				addClass ? addClass : ""
			}`}>
			{children}
		</div>
	);
};

export default Container;
