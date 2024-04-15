import { useRef, useState } from "react";
import ReactCrop, {
	centerCrop,
	convertToPixelCrop,
	makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIO = 3 / 2;
const MIN_DIMENSION = 150;

function dataURLtoBlob(dataURL) {
	const parts = dataURL.split(";base64,");
	const contentType = parts[0].split(":")[1];
	const raw = window.atob(parts[1]);
	const array = new Uint8Array(raw.length);

	for (let i = 0; i < raw.length; i++) {
		array[i] = raw.charCodeAt(i);
	}

	return new Blob([array], { type: contentType });
}

const ImageCropper = ({ updateParentImage }) => {
	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const [fileName, setFileName] = useState("No file selected");
	const [imgSrc, setImgSrc] = useState("");
	const [crop, setCrop] = useState();
	const [error, setError] = useState("");

	const onSelectFile = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setFileName(file.name);

		const reader = new FileReader();
		reader.addEventListener("load", () => {
			const imageElement = new Image();
			const imageUrl = reader.result?.toString() || "";
			imageElement.src = imageUrl;

			imageElement.addEventListener("load", (e) => {
				if (error) setError("");
				const { naturalWidth, naturalHeight } = e.currentTarget;
				if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
					setError("Image must be at least 150 x 150 pixels.");
					return setImgSrc("");
				}
			});
			setImgSrc(imageUrl);
		});
		reader.readAsDataURL(file);
	};

	const onImageLoad = (e) => {
		const { width, height } = e.currentTarget;
		const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

		const crop = makeAspectCrop(
			{
				unit: "%",
				width: cropWidthInPercent,
			},
			ASPECT_RATIO,
			width,
			height
		);
		const centeredCrop = centerCrop(crop, width, height);
		setCrop(centeredCrop);
	};

	return (
		<>
			<div className="flex flex-col gap-3 items-center">
				<Button
					component="label"
					size="large"
					variant="contained"
					tabIndex={-1}
					className="bg-main-black text-main-bg hover:text-main-black hover:bg-main-bg rounded-3xl"
					startIcon={<CloudUploadIcon />}>
					Upload File{" "}
					<input
						type="file"
						name="file"
						accept="image/*"
						id="file-upload"
						onChange={(e) => onSelectFile(e)}
						style={{ display: "none" }}
						hidden
					/>
				</Button>
				<p id="file-upload">{fileName}</p>
			</div>
			{error && <p className="text-red-400 text-xs">{error}</p>}
			{imgSrc && (
				<div className="flex flex-col gap-3 items-center">
					<ReactCrop
						crop={crop}
						onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
						keepSelection
						aspect={ASPECT_RATIO}
						minWidth={MIN_DIMENSION}>
						<img
							ref={imgRef}
							src={imgSrc}
							alt="Upload"
							style={{ maxHeight: "70vh" }}
							onLoad={onImageLoad}
						/>
					</ReactCrop>
					<Button
						onClick={() => {
							setCanvasPreview(
								imgRef.current,
								previewCanvasRef.current,
								convertToPixelCrop(
									crop,
									imgRef.current.width,
									imgRef.current.height
								)
							);
							const dataUrl = previewCanvasRef.current.toDataURL();
							const blob = dataURLtoBlob(dataUrl);
							const file = new File([blob], "image.png", { type: "image/png" });
							updateParentImage(file);
						}}
						variant="contained"
						className="bg-main-black font-bold text-main-bg hover:text-main-black hover:bg-main-bg rounded-3xl">
						Crop Image
					</Button>
				</div>
			)}
			{crop && (
				<canvas
					ref={previewCanvasRef}
					className="mt-4"
					style={{
						display: "none",
						border: "1px solid black",
						objectFit: "contain",
						width: 150,
						height: 150,
					}}
				/>
			)}
		</>
	);
};
export default ImageCropper;
