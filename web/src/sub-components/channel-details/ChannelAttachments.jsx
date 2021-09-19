import React, { Fragment } from "react";
import SubMenuBtn from "../SubMenuBtn";

export default function ChannelAttachments() {

	const colors = ["#EA5D5F", "#48BFE3"];
	const files = [
		{ fileName: "HackFest Challenge", ext: "pdf" },
		{ fileName: "Project Files", ext: "zip" }
	];

	const fileContainer = (name, ext) => {
		return (
			<div className="attachment-file-container">
				<div className="file-detail-container">
					<div className="icon" style={{ backgroundColor: `${ext === "zip" ? "#EA5D5F" : "#48BFE3"}` }}>
						<span>{ext === "zip" ? "ZIP" : "PDF"}</span>
					</div>
					<span>{name}</span>

				</div>
				<SubMenuBtn type="sm" />
			</div>
		);
	};
	return (
		<div className="channel-attachments-details-container">
			<span className="heading-text">Attachments</span>
			<span className="subheading-text">Source File</span>

			<div>
				{
					files.map((file, index) => {
						return (
							<div key={index} style={{ marginTop: `${index !== 0 ? "20px" : "15px"}` }}>
								{fileContainer(file.fileName, file.ext)}
							</div>
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
