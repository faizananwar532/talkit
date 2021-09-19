import React, { useState } from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo/logo-invert.svg";
import { ReactComponent as MessageIcon } from "../../assets/icons/message-circle-dots.svg";
import { ReactComponent as ThemeSwitch } from "../../assets/icons/basic/bright.svg";
import { themeChanger } from "../../utils/ScssVariables";

export default function SideNavbar() {


	const [theme, setTheme] = useState("light");

	const Icon = (Icon) => {
		return (
			<div className="selected-icon-container">
				{Icon}
			</div>
		);
	};
	return (
		<div className="side-navbar">
			<Logo />
			<div className="icons-panel-container">
				{Icon(<MessageIcon />)}
			</div>
			<div className="icons-panel-container align-self-end pointer" style={{ position: "absolute", bottom: "0" }}
				onClick={() => {
					if (theme === "light") {
						themeChanger("dark");
						setTheme("dark");
					}
					else {
						themeChanger("light");
						setTheme("light");
					}
				}}
			>
				{Icon(<ThemeSwitch />)}
			</div>




		</div>
	);
}
