import React, { Fragment, useState, useEffect } from "react";
import Button from "../../sub-components/Button";
import DetailBar from "../../sub-components/common/DetailBar";
import Modal from "../../sub-components/common/Modal";
import Input from "../../sub-components/Input";
import Search from "../../sub-components/Search";

export default function JoinRoomModal(props) {


	const channels = [
		{ name: "channels-container" },
		{ name: "User Experience Design" },
		{ name: "User Interface Design" },
		{ name: "User Interface Design" },
		{ name: "User Interface Design" },

	];

	const options = [
		{ id: 1, option: "Create Channel" },
		{ id: 2, option: "Join Existing Channel" }
	];
	const [selectedOptionId, setSelectedOptionId] = useState(1);
	const [addChannelModalsStatus, setAddChannelModalsStatus] = useState({
		isAddChannelModalOpen: props.isAddChannelModalOpen,
		isAddDmModalOpen: false
	});
	const [confirmationModal, setConfirmationModal] = useState({
		isOpen: false,
		templateId: null
	});

	const onAddChannel = () => {
		console.log("hey");
		setAddChannelModalsStatus({ ...addChannelModalsStatus, isAddChannelModalOpen: false });
		setConfirmationModal({ isOpen: true, templateId: 1 });
	};

	const onDMAdd = () => {
		setConfirmationModal({ isOpen: true, templateId: 2 });
	};

	useEffect(() => {
		setAddChannelModalsStatus({
			isAddChannelModalOpen: props.isAddChannelModalOpen,
			isAddDmModalOpen: props.isAddDmModalOpen
		});
	}, [props.isAddChannelModalOpen]);

	const createRoomComp = () => {
		return (
			<div className="create-channel">
				<Input type="plain" placeholder="e.g: status" label="Name" />
				<Input style={{ marginTop: "30px" }} type="plain" placeholder="Add comma seprated emails" label="Invite Members" />
			</div>
		);
	};

	const joinRoomComp = () => {
		return (
			<div className="join-channel">
				<div className="search-bar">
					<Search type={"plain"} placeholder="search channels" />
				</div>
				<div className="channels-container">
					{
						channels.map((channel, index) => {
							return (
								<DetailBar key={index} name={channel.name} style={{ marginTop: `${index != 0 ? "15px" : "0px"}` }}>
									<Button primary label="Join Channel" className="grey0 body2" />
								</DetailBar>
							);
						})
					}
				</div>


			</div>
		);
	};


	return (
		<Fragment>
			{
				addChannelModalsStatus.isAddChannelModalOpen &&
				<Modal
					title={"Channels"}
					confirmBtnTitle={selectedOptionId === 1 ? "Create Channel" : false}
					onConfirm={() => { onAddChannel(); }}
					onClose={props.onClose}>
					<div style={{ padding: "0px 40px", textAlign: "left" }}>
						<span className="body1 grey7">Channels are where your team communicates.They’re best when organized around a topic</span>
					</div>

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
								{createRoomComp()}
							</>
							:
							<>
								{joinRoomComp()}
							</>
					}
				</Modal >
			}
			{
				addChannelModalsStatus.isAddDmModalOpen &&
				<Modal
					title={"Channels"}
					confirmBtnTitle={selectedOptionId === 1 ? "Create Channel" : false}
					onConfirm={() => { onAddChannel(); }}
					onClose={props.onClose}>
					<div style={{ padding: "0px 40px", textAlign: "left" }}>
						<span className="body1 grey7">Channels are where your team communicates.They’re best when organized around a topic</span>
					</div>

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
								{createRoomComp()}
							</>
							:
							<>
								{joinRoomComp()}
							</>
					}
				</Modal >
			}
			{
				confirmationModal.isOpen &&
				<Modal
					onConfirm={() => { onAddChannel; }}
					onClose={() => {
						setConfirmationModal({ ...confirmationModal, isOpen: false });
						props.onClose();
					}}>
					{
						confirmationModal.templateId === 1
							?
							<div
								className="d-flex flex-column justify-content-between"
								style={{ textAlign: "center", height: "60px" }}>
								<span className="headline6 grey9">Channel Created!</span>
								<span className="subtitle2 grey9"><font className="primaryColor">General</font> channel has been successfully created.</span>
							</div>
							:
							<div style={{ textAlign: "center" }}>
								<span className="headline6 grey9">{ }</span>
							</div>
					}


				</Modal >

			}
		</Fragment>
	);
}
