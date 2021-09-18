import React, { useState } from "react";
import Button from "../../subComponents/Button";
import Input from "../../subComponents/Input";
import { authBaseUrl } from "../../utils/BaseURL";
import { isEmailValid, isPasswordValid } from "../../utils/Utilites";

export default function SignUp() {

	const [user, setUser] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		confirm_password: ""
	});

	const [error, setError] = useState();
	const [success, setSuccess] = useState();

	const handleInput = (event) => {

		setUser({ ...user, [event.target.name]: event.target.value });

	};

	const validateForm = () => {

		console.log(user);

		if (!user.first_name) {
			return { isValid: false, message: "First Name is required" };
		}

		if (!user.last_name) {
			return { isValid: false, message: "Last name is required" };
		}

		if (!user.email || !isEmailValid(user.email)) {
			return { isValid: false, message: "Email is Invalid" };
		}

		if (!user.password || !isPasswordValid(user.password)) {
			return {
				isValid: false, title: "Weak password", message: [
					<ul key="1">
						<li key="2">Password should contain atleast 1 special charater</li>
						<li key="4">Password should contain minimum 10 charaters</li>
					</ul>
				]
			};
		}

		if (user.password !== user.confirm_password) {
			return { isValid: false, message: "Password did not match" };
		}

		return { isValid: true, message: "" };

	};

	const handleSubmit = async (event) => {

		setError(null);
		setSuccess(null);

		event.preventDefault();

		const validation = validateForm();

		if (!validation.isValid) {
			setError(validation.message);
			return;
		}

		delete user["confirm_password"];

		const response = await fetch(`${authBaseUrl}/auth/signup/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify(user)
		});

		const json = await response.json();

		if (!response.ok) {
			setError(json.message);
		} else {
			setSuccess("Signup successful");
		}


	};

	return (
		<div className="signup-container">
			<div>
				<span className="headline4">Sign Up</span>
			</div>
			<form onSubmit={handleSubmit}>
				<div >
					<Input
						label="First Name"
						type="text"
						name="first_name"
						placeholder="Enter first name"
						onChange={handleInput}
					/>
				</div>
				<div className="mt-3">
					<Input
						label="Last Name"
						type="text"
						name="last_name"
						placeholder="Enter last name"
						onChange={handleInput}
					/>
				</div>
				<div className="mt-3">
					<Input
						label="Username"
						type="text"
						name="username"
						placeholder="Enter Username"
						onChange={handleInput}
					/>
				</div>
				<div className="mt-3">
					<Input
						label="Email"
						type="text"
						name="email"
						placeholder="Enter email"
						onChange={handleInput}
					/>
				</div>
				<div className="mt-3">
					<Input
						label="Password"
						type="password"
						name="password"
						placeholder="Enter password"
						onChange={handleInput}
					/>
				</div>
				<div className="mt-3">
					<Input
						label="Confirm Password"
						type="password"
						name="confirm_password"
						placeholder="Confirm password"
						onChange={handleInput}
					/>
				</div>
				<div className="pt-4 pb-4">
					<Button primary label="Sign Up" style={{ backgroundColor: "#EA5D5F" }} type="submit" processing={true}/>
				</div>
			</form>

			{error && (
				<span style={{ color: "#FFFFFF" }}>{error}</span>
			)}
			{success && (
				<span style={{ color: "#00FF00" }}>{success}</span>
			)}

		</div>
	);
}