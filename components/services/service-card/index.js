import React, { useMemo } from "react";
import Image from "next/image";

const CardImage = ({ textFirst, size, src }) => {
	return (
		<div className={`${textFirst ? "top-0" : `bottom-0 ${size === "lg" ? "right-0" : "left-0"} `} ${size === "lg" ? 'w-150' : 'w-170'} absolute overflow-hidden rounded-xl`}>
			<img src={src} alt="tbd" />
		</div>
	);
};

const Card = ({
	className,
	primaryText = "Service card primary",
	secondaryText,
	size = "sm",
	textFirst = true,
	src = "https://images.unsplash.com/photo-1472653431158-6364773b2a56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
}) => {
	const sizeClasses = useMemo(() => {
		switch (size) {
			case "sm":
				return "flex-col";
			case "lg":
				return "flex-col sm:flex-row";
			default:
				return "";
		}
	}, [size]);

	const primaryClasses = useMemo(() => `text-white font-medium text-3xl ${!textFirst && size === "lg" ? "pl-10" : ""} ${size === "lg" ? "w-1/2 flex flex-col justify-between" : ""}`.trim(), []);
	const secondaryClasses = useMemo(() => "text-white text-xl opacity-50".trim(), []);
	const imageClasses = useMemo(() => `relative h-40 sm:h-60 md:h-80 w-full ${textFirst ? (size === "lg" ? "" : "mt-10") : ""}`.trim(), []);

	return (
		<div className={`${sizeClasses} gap-4 justify-between flex bg-white bg-opacity-10 p-4 md:p-12 rounded-xl overflow-hidden ${className}`.trim()}>
			{textFirst ? (
				<>
					<div className={primaryClasses}>
						{primaryText}
						{secondaryText && <div className={secondaryClasses}>{secondaryText}</div>}
					</div>
					<div className={imageClasses}>
						<CardImage textFirst={textFirst} size={size} src={src} />
					</div>
				</>
			) : (
				<>
					<div className={imageClasses}>
						<CardImage textFirst={textFirst} size={size} src={src} />
					</div>
					<div className={primaryClasses}>
						{primaryText}
						{secondaryText && <div className={secondaryClasses}>{secondaryText}</div>}
					</div>
				</>
			)}
		</div>
	);
};

export default Card;
