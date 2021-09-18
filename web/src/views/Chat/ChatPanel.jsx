import React from "react";
import InputTextBox from "../../components/ChatPanel/InputTextBox";
import MessageBox from "../../components/ChatPanel/MessageBox";

export default function ChatPanel() {
	return (
		<div className="chat-box-container">
			<div>
				<InputTextBox/>
			</div>
			<div>
				<MessageBox sender/>
				<div className="receiver-message-box">
					<MessageBox receiver/>
				</div>
			</div>
			<div>
				
			</div>
		</div>
	);
}
