import React from "react";
import {ReactComponent as ArrowDown} from "../../assets/icons/arrows/arrow-down.svg";
import {ReactComponent as ArrowUp} from "../../assets/icons/arrows/chevron-up.svg";

export default function ChatSearch() {
	return (
		<div className="chat-search">
            
			<input placeholder="In Chat Search..."/>
			<div className="pr-2">
				<ArrowUp/>
			</div>
			<ArrowDown/>
		</div>
	);
}
