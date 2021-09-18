import React from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import ChatPanel from "./ChatPanel";

export default function ChatPanelContainer() {
	return (
		<div className="chat-main-panel-container">
			<LeftPanel />
			<ChatPanel />
			<RightPanel />
		</div>
	);
}
