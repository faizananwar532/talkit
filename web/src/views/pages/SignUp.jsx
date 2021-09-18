import React from "react";
import Button from "../../subComponents/Button";
import Input from "../../subComponents/Input";
export default function SignUp(){
	return(
		<div className="signup-container">
			<div>
				<span className="headline4">Sign Up</span>
			</div>
			<div >
				<Input
					label="First Name"
					type="text"
					name="firstname"
					placeholder="Enter first name"
				/>
			</div>
			<div className="mt-3">
				<Input
					label="Last Name"
					type="text"
					name="lastname"
					placeholder="Enter last name"
				/>
			</div>
			<div className="mt-3">
				<Input
					label="Username"
					type="text"
					name="username"
					placeholder="Enter Username"
				/>
			</div>
			<div className="mt-3">
				<Input
					label="Email"
					type="text"
					name="email"
					placeholder="Enter email"
				/>
			</div>
			<div className="mt-3">
				<Input
					label="Password"
					type="text"
					name="password"
					placeholder="Enter password"
				/>
			</div>
			<div className="mt-3">
				<Input
					label="Confirm Password"
					type="text"
					name="confirmpassword"
					placeholder="Confirm password"
				/>
			</div>
			<div className="pt-4 pb-4">
				<Button primary label="Sign Up" style={{backgroundColor: "#EA5D5F"}}/>
			</div>
		</div>
	);
}