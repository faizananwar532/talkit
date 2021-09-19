import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import ChatSearch from "../../components/ChatPanel/ChatSearch";
import InputTextBox from "../../components/ChatPanel/InputTextBox";
import MessageBox from "../../components/ChatPanel/MessageBox";
import { useAuthentication } from "../../context/Authentication";
import { chatBaseUrl, webSocketUrl } from "../../utils/BaseURL";
import { openURL } from "../../utils/Utilites";

export default function ChatPanel() {

	const auth = useAuthentication();
	const params = useParams();

	const [channelMessages, setChannelMessages] = useState([]);
	const [message, setMessage] = useState();

	const ws = useMemo(() => {
		if (!params.channel_name) {
			return;
		}
		const ws = new WebSocket(`${webSocketUrl}/ws/${params.channel_name}/${auth.access_token}`);

		return ws;
	}, [params.channel_name]);

	if (ws) {
		ws.onmessage = function (event) {
			channelMessages.push(JSON.parse(event.data));
			console.log(channelMessages);
			setChannelMessages(channelMessages);
		};
	}

	function sendMessage(event) {

		event.preventDefault();
		if (!message) {
			return;
		}
		ws.send(JSON.stringify({ message: message }));
		setMessage("");
	}

	const handleInput = (event) => {
		setMessage(event.target.value);
	};

	useEffect(async () => {

		const { result, error } = await openURL(chatBaseUrl, `/v1/chat/${params.channel_name}`, "GET", auth);

		if (error) {
			console.log(error);
		} else if (result) {
			setChannelMessages(result.data);
		}

	}, [params.channel_name]);

	return (
		<div className="chat-box-container">
			<div>
				{
					params.channel_name && (
						<form onSubmit={sendMessage}>
							<InputTextBox onChange={handleInput} value={message} />
						</form>
					)
				}
			</div>
			<div style={{ overflowY: "auto" }} className="invisible-scrollbar">
				{
					channelMessages.map((data, index) => {
						// console.log(auth.user.username, data.username, "FLAG");
						if (auth.user.username === data.username) {
							return (
								<div className="receiver-message-box">
									<MessageBox receiver message={data.message} />
								</div>
							);
						} else {
							return (
								<MessageBox sender key={index} message={data.message} />
							);
						}
					})
				}

			</div>
			<div>
				<ChatSearch />
			</div>
		</div>
	);
}
