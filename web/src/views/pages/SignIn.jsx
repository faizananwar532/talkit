import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../subComponents/Button";
import Input from "../../subComponents/Input";

export default function SignIn(){
	const [user, setUser] = useState({
		email: null,
		password: null,
	});
    
	const [errors, setErrors] = useState({
		email: false,
		password: false,
		invalid: false
	});

	return(
		<div className="signin-container">
			<div className="header">
				<span>Sign In</span>
			</div>
			<div>
				<Input
					label="Email"
					type="text"
					name="email"
					placeholder="Enter email address"
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
			<div className="pt-4 pb-4">
				<Button primary label="Sign In"/>
			</div>
			<div>
				<span>Dont have an account? <Link to="/signup">Create New</Link></span>
			</div>
		</div>
	);
}