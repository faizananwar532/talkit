import React from "react";

import { ReactComponent as OptionIcon } from "../assets/icons/basic/option.svg";
import { ReactComponent as OptionIconSm } from "../assets/icons/basic/option-sm.svg"; //

export default function SubMenuBtn(props) {

	return (
		< div className="channel-btn pointer" style={{
			height: `${props.type === "sm" && "25px"}`, width: `${props.type === "sm" && "25px"}`
		}}>
			{
				props.type === "sm"
					?
					<OptionIconSm />
					:
					<OptionIcon />
			}
		</div >
	);

}
