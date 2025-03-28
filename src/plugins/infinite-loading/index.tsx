import React from "react";
import "./infinite-loading.scss";

export const InfiniteLoading: React.FunctionComponent = () => {
	return (
		<svg
			className="infinite_loading_svg"
			viewBox="0 0 256 128"
			width="60"
			height="32"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" />
					<stop offset="33%" />
					<stop offset="67%" />
					<stop offset="100%" />
				</linearGradient>
				<linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
					<stop offset="0%" />
					<stop offset="33%" />
					<stop offset="67%" />
					<stop offset="100%" />
				</linearGradient>
			</defs>
			<g fill="none" strokeLinecap="round" strokeWidth="16">
				<g className="infinite_loading_svg_track" stroke="#ddd">
					<path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
					<path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
				</g>
				<g strokeDasharray="180 656">
					<path
						className="infinite_loading_svg_worm_1"
						stroke="url(#grad1)"
						strokeDashoffset="0"
						d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
					/>
					<path
						className="infinite_loading_svg_worm_2"
						stroke="url(#grad2)"
						strokeDashoffset="358"
						d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
					/>
				</g>
			</g>
		</svg>
	);
};
