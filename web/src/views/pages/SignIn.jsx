import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../sub-components/Button";
import Input from "../../sub-components/Input";
import SignInImage from "../../assets/icons/Login.png";
import { ReactComponent as Logo } from "../../assets/icons/logo/Logo.svg";
import { ReactComponent as Arrow } from "../../assets/icons/arrows/shape.svg";
import Googlelogo from "../../assets/icons/logo/Google Icon.svg";
import FacebookLogo from "../../assets/icons/logo/Facebook Icon.svg";
import { authBaseUrl } from "./../../utils/BaseURL";
import { isEmailValid } from "./../../utils/Utilites";


export default function SignIn() {

	const [user, setUser] = useState({
		email: null,
		password: null,
	});

	const [processing, setProcessing] = useState(false);

	const [error, setError] = useState();
	const [success, setSuccess] = useState();

	const handleInput = (event) => {

		setUser({ ...user, [event.target.name]: event.target.value });

	};

	const validateForm = () => {

		if (!user.email || !isEmailValid(user.email)) {
			return { isValid: false, message: "Email is Invalid" };
		}

		if (!user.password ) {
			return { isValid: false, message: "Enter password" };
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

		setProcessing(true);

		const response = await fetch(`${authBaseUrl}/auth/login/`, {
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
			setSuccess("Authentication successful");
		}

		setProcessing(false);

	};

	return (
		<div className="signin-wrapper">
			<div className="signin-image-container">
				<img
					src={SignInImage}
					alt=""
				/>
			</div>

			<div className="signin-container">
				<div>
					<Logo />
				</div>
				<div className="header">
					<span className="pr-2">Sign In</span>
					<Arrow />
				</div>
				<form onSubmit={handleSubmit}>
					<div className="mt-5">
						<Input
							label="Email"
							type="text"
							name="email"
							onChange={handleInput}

						/>
					</div>
					<div className="mt-5">
						<Input
							label="Password"
							type="password"
							name="password"
							onChange={handleInput}
						/>
					</div>
					<div className="pt-5 pb-4">
						<Button style={{ width: "100%", color: "white", padding: "15px" }} primary label="Sign In" type="submit" processing={processing} />
					</div>
				</form>
				{error && (
					<span style={{color: "#d92b21"}}>{error}</span>
				)}

				{success && (
					<span style={{color: "#71dd78"}}>{success}</span>
				)}
				<div className="line-container">
					<div className="line-style">
						<span>or</span>
					</div>
				</div>
				<div className="mt-4 mb-4">
					<Button secondary logo={Googlelogo} label="Continue with Google" />
				</div>
				<div className="mt-1 mb-4">
					<Button secondary logo={FacebookLogo} label="Continue with Facebook" />
				</div>
				<div>
					<span>Dont have an account? <Link to="/signup" style={{ color: "#D92B21" }}>Create New</Link></span>
				</div>
			</div>
		</div>
	);
}