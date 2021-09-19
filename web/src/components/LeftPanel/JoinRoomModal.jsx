import React, { Fragment, useState, useEffect } from "react";
import { useAuthentication } from "../../context/Authentication";
import Button from "../../sub-components/Button";
import DetailBar from "../../sub-components/common/DetailBar";
import Modal from "../../sub-components/common/Modal";
import Input from "../../sub-components/Input";
import Search from "../../sub-components/Search";
import { chatBaseUrl } from "../../utils/BaseURL";
import { openURL } from "../../utils/Utilites";

export default function JoinRoomModal(props) {

	const auth = useAuthentication();

	const [channels, setChannels] = useState([]);
	const [processing, setProcessing] = useState(false);

	const [newChannel, setNewChannel] = useState({
		name: "",
		description: ""
	});
	const [inviteUserList, setInviteUserList] = useState();

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
		setAddChannelModalsStatus({ ...addChannelModalsStatus, isAddChannelModalOpen: false });
		setConfirmationModal({ isOpen: true, templateId: 1 });
	};

	const onAddDm = () => {
		setAddChannelModalsStatus({ ...addChannelModalsStatus, isAddDmModalOpen: false });
	};

	useEffect(() => {
		setAddChannelModalsStatus({
			isAddChannelModalOpen: props.isAddChannelModalOpen,
			isAddDmModalOpen: props.isAddDmModalOpen
		});
	}, [props.isAddChannelModalOpen, props.isAddDmModalOpen]);

	const createRoomComp = () => {
		return (
			<div className="create-channel">
				<Input type="plain" placeholder="e.g: status" label="Name" onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })} />
				<Input style={{ marginTop: "30px" }} type="plain" placeholder="Describe your channel here" label="Description" onChange={(e) => setNewChannel({ ...newChannel, description: e.target.value })} />
				<Input style={{ marginTop: "30px" }} type="plain" placeholder="Add comma seprated emails" label="Invite Members" onChange={(e) => {
					setInviteUserList(e.target.value);
				}}
				/>
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
								<DetailBar key={index} name={channel} style={{ marginTop: `${index != 0 ? "15px" : "0px"}` }}>
									<Button
										primary
										label="Join Channel"
										className="grey0 body2"
										onClick={() => joinChannel(channel)}
									/>
								</DetailBar>
							);
						})
					}
				</div>


			</div>
		);
	};

	const createChannel = async () => {

		const body = { name: newChannel.name, description: newChannel.description };
		console.log(body);

		setProcessing(true);

		const { result, error } = await openURL(chatBaseUrl, "/v1/channels/", "POST", auth, body);

		if (error) {
			console.log(error);
		} else if (result) {

			if (inviteUserList) {
				const inv = await openURL(chatBaseUrl, `/v1/channels/add_users/${newChannel.name}`, "POST", auth, { users: inviteUserList });

				if (inv.error) {
					console.log(inv.error);
				} else {
					console.log(inv.result);
				}
			}
			setProcessing(false);
			onAddChannel();

		}

	};

	const joinChannel = async (channel_name) => {

		const { result, error } = await openURL(chatBaseUrl, "/v1/channels/join", "POST", auth, { name: channel_name });

		if (error) {
			console.log(error);
		} else {
			console.log(result);
		}

	};

	useEffect(async () => {

		const { result } = await openURL(chatBaseUrl, "/v1/channels/", "GET", auth);

		if (result) {
			setChannels(result.data);
		}

	}, []);


	return (
		<Fragment>
			{
				addChannelModalsStatus.isAddChannelModalOpen &&
				<Modal
					title={"Channels"}
					processing={processing}
					confirmBtnTitle={selectedOptionId === 1 ? "Create Channel" : false}
					onConfirm={createChannel}
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
					title={"New Direct Message"}
					confirmBtnTitle={"Send Message"}
					onConfirm={() => { onAddDm(); }}
					onClose={props.onClose}>
					<div style={{ padding: "0px 40px", textAlign: "left" }}>
						<Input type="plain" placeholder="e.g: @zahab or zahab@venturenox.com" label="To" />
					</div>

				</Modal >
			}
			{
				confirmationModal.isOpen &&
				<Modal
					onConfirm={() => { onAddChannel; }}
					onClose={() => {
						setConfirmationModal({ ...confirmationModal, isOpen: false });
						props.onClose();
						window.location.reload();
					}}>
					{
						confirmationModal.templateId === 1
						&&
						<div
							className="d-flex flex-column justify-content-between"
							style={{ textAlign: "center", height: "60px" }}>
							<span className="headline6 grey9">Channel Created!</span>
							<span className="subtitle2 grey9"><font className="primaryColor">General</font> channel has been successfully created.</span>
						</div>
					}


				</Modal >

			}
		</Fragment>
	);
}
