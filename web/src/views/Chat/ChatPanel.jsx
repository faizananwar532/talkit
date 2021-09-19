import React from "react";
import ChatSearch from "../../components/ChatPanel/ChatSearch";
import InputTextBox from "../../components/ChatPanel/InputTextBox";
import MessageBox from "../../components/ChatPanel/MessageBox";

export default function ChatPanel() {
	return (
		<div className="chat-box-container">
			<div className="d-flex flex-column-reverse">
				<div>
					<InputTextBox/>
				</div>
				<div className="pb-4">
					<MessageBox sender />
					<div className="receiver-message-box">
						<MessageBox receiver />
					</div>
				</div>
			</div>
			<div>
				<ChatSearch/>
			</div>
		</div>
	);
}
