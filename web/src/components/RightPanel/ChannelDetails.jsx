import React, { useState } from "react";
import Button from "../../sub-components/Button";
import ChannelAttachments from "../../sub-components/channel-details/ChannelAttachments";
import ChannelBasicDetail from "../../sub-components/channel-details/ChannelBasicDetail";
import ChannelMedia from "../../sub-components/channel-details/ChannelMedia";
import ChannelMembers from "../../sub-components/channel-details/ChannelMembers";
import DetailBar from "../../sub-components/common/DetailBar";
import Modal from "../../sub-components/common/Modal";
import Search from "../../sub-components/Search";

import addUser from "../../assets/icons/basic/addUser.svg";
import SubMenuBtn from "../../sub-components/SubMenuBtn";
import Input from "../../sub-components/Input";

export default function ChannelDetails(props) {

	const [inviteModalstatus, setInviteModalstatus] = useState({
		isMembersModalOpen: false,
		isAddMemberModalOpen: false
	});
	const [confermationMesssage, setConfermationMesssage] = useState({
		isUserAddedModalOpen: false
	});

	const members = [
		"Ammar", "Awais", "Faizan", "Hamza", "Zain"
	];

	const options = [
		{ id: 1, option: "Members" },
		{ id: 2, option: "Settings" }
	];
	const [selectedOptionId, setSelectedOptionId] = useState(1);

	const membersComp = () => {
		return (
			<div className="join-channel">
				<div className="search-bar">
					<Search type={"plain"} placeholder="search channels" />
				</div>
				<div className="channels-container">
					<DetailBar className="pointer" name={"Add People"} image={addUser} color={"#EA5D5F"} onClick={() => { setInviteModalstatus({ isMembersModalOpen: false, isAddMemberModalOpen: true }); }} />
					{
						members.map((channel, index) => {
							return (
								<DetailBar key={index} name={channel} style={{ marginTop: "15px" }}>
									<SubMenuBtn />
								</DetailBar>
							);
						})
					}
				</div>
			</div>
		);
	};

	const settingsComp = () => {
		return (
			<div className="create-channel" style={{ padding: "20px 40px" }}>
				<div className="w-100 p-2 pointer" style={{ border: "1px solid #EA5D5F", borderRadius: "10px" }}>
					<span className="headline6 grey0" style={{ color: "#EA5D5F" }}>Delete</span>

				</div>
			</div>
		);
	};

	return (
		<div className="channel-details-container">
			<ChannelBasicDetail selectedContact={props.selectedContact} />
			<div className="channel-chat-items-container">
				{
					props.selectedContact?.type === "channel-room" &&
					<ChannelMembers selectedContact={props.selectedContact} onInviteUser={() => { setInviteModalstatus({ ...inviteModalstatus, isMembersModalOpen: true }); }} />
				}

				<ChannelMedia />
				<ChannelAttachments />
			</div>

			{
				inviteModalstatus.isMembersModalOpen &&
				<Modal
					title={"Channel"}
					onClose={() => { setInviteModalstatus({ isAddMemberModalOpen: false, isMembersModalOpen: false }); }}>

					<div style={{ borderBottom: "1px solid #E9ECEF", marginTop: "30px" }}>
						<div className="d-flex" style={{ padding: "0px 40px" }}>
							{
								options.map((option, index) => {
									return (
										<div key={index}
											onClick={() => { setSelectedOptionId(option.id); }}
											className={`${selectedOptionId === option.id ? "modal-selected-tab" : "modal-unselected-tab"} pointer`} style={{ marginLeft: `${index !== 0 && "40px"}` }}>
											<span>
												{option.option}
											</span>
										</div>
									);
								})
							}
						</div>
					</div>
					{
						selectedOptionId === 1
							?
							<>
								{membersComp()}
							</>
							:
							<>
								{settingsComp()}
							</>
					}
				</Modal >
			}

			{
				inviteModalstatus.isAddMemberModalOpen &&
				<Modal
					title={"Add People"}
					confirmBtnTitle={"Invite"}
					onConfirm={() => {
						setInviteModalstatus({ isAddMemberModalOpen: false, isMembersModalOpen: false });
						setConfermationMesssage({ ...confermationMesssage, isUserAddedModalOpen: true });
					}}
					onClose={() => { setInviteModalstatus({ isAddMemberModalOpen: false, isMembersModalOpen: false }); }}>
					<div style={{ padding: "0px 40px", textAlign: "left" }}>
						<Input type="plain" placeholder="Enter a Email" />
					</div>

				</Modal >
			}
			{
				confermationMesssage.isUserAddedModalOpen &&
				<Modal
					onClose={() => {
						setConfermationMesssage({ ...confermationMesssage, isUserAddedModalOpen: false });
					}}>
					<div
						className="d-flex flex-column justify-content-between"
						style={{ textAlign: "center", height: "60px" }}>
						<span className="headline6 grey9">Invitation!</span>
						<span className="subtitle2 grey9">{"{Channel}"} join request has been sent to <font className="primaryColor">{"{e-mail}"}</font> successfully.</span>
					</div>


				</Modal >
			}
		</div>
	);
}
