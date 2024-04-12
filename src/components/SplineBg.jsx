"use client";
import Spline from "@splinetool/react-spline";

export default function SplineBg({ className }) {
	return (
		<Spline
			scene="https://prod.spline.design/XeyERHQsW2-b57Na/scene.splinecode"
			className={className ? className : ""}
		/>
	);
}
