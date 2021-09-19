import React from "react";

export default function ChannelMedia() {

	const images = [
		"", "", "", ""
	];
	return (
		<div className="channel-media-details-container">
			<span className="heading-text">{"Photos & Multimedia"}</span>
			<div className="media-images-container">
				{
					images.map((image, index) => {
						return (
							<>
								{
									index < 3 &&
									<div key={index} className="media-image">

									</div>
								}
							</>
						);
					})
				}
			</div>
			<div className="view-all-option">
				<span className="pointer">View All</span>
			</div>


		</div>
	);
}
