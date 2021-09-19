import React from "react";
import pic1 from "../../assets/images/pic1.png";
import pic2 from "../../assets/images/pic2.png";
import pic3 from "../../assets/images/pic3.png";
export default function ChannelMedia() {

	const images = [
		pic1, pic2, pic3, ""
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
										<img src={image} />
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
