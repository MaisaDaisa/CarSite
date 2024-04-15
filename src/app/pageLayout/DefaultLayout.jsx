import React from "react";
import Header from "./Header/Header.jsx";
import Container from "./Container";

const DefaultLayout = ({ children }) => {
	return (
		<>
			<Header />
			<Container>{children}</Container>
		</>
	);
};

export default DefaultLayout;
