import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../sub-components/Button";
import Input from "../../sub-components/Input";
import SignUpImage from "../../assets/icons/Signup.png";
import { ReactComponent as Logo } from "../../assets/icons/logo/Logo.svg";
import { ReactComponent as Arrow } from "../../assets/icons/arrows/shape.svg";
import Googlelogo from "../../assets/icons/logo/Google Icon.svg";
import FacebookLogo from "../../assets/icons/logo/Facebook Icon.svg";
import { isEmailValid, isPasswordValid, setCookie } from "./../../utils/Utilites";
import { authBaseUrl } from "./../../utils/BaseURL";


export default function SignIn() {

	const [user, setUser] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		confirm_password: ""
	});

	const [processing, setProcessing] = useState(false);

	const [error, setError] = useState();
	const [success, setSuccess] = useState();

	const handleInput = (event) => {

		setUser({ ...user, [event.target.name]: event.target.value });

	};

	const validateForm = () => {

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

		setProcessing(true);

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
			setCookie("token", json.data.refresh_token, 7);
		}

		setProcessing(false);

		window.location.reload();

	};

	return (
		<div className="signup-wrapper">
			<div className="signup-image-container">
				<img
					src={SignUpImage}
					alt=""
				/>
			</div>

			<div className="signup-container">
				<div>
					<Logo />
				</div>
				<div className="header">
					<span className="pr-2">Sign Up</span>
					<Arrow />
				</div>
				<form onSubmit={handleSubmit}>
					<div className="d-flex mt-5 w-100 justify-content-between" >
						<Input
							label="First Name"
							type="text"
							name="first_name"
							style={{ width: "48%" }}
							onChange={handleInput}
						/>
						<Input
							label="Last Name"
							type="text"
							name="last_name"
							style={{ width: "48%" }}
							onChange={handleInput}
						/>
					</div>

					<div className="d-flex mt-5 w-100 justify-content-between">
						<Input
							label="Username"
							type="text"
							name="username"
							style={{ width: "48%" }}
							onChange={handleInput}
						/>
						<Input
							label="Email"
							type="text"
							name="email"
							style={{ width: "48%" }}
							onChange={handleInput}
						/>
					</div>
					<div className="d-flex mt-5 w-100 justify-content-between">

						<Input
							label="Password"
							type="password"
							name="password"
							style={{ width: "48%" }}
							onChange={handleInput}
						/>


						<Input
							label="Confirm Password"
							type="password"
							name="confirm_password"
							style={{ width: "48%" }}
							onChange={handleInput}
						/>

					</div>
					<div className="pt-5 pb-4">
						<Button style={{ width: "100%", color: "white", padding: "15px" }} primary label="Sign Up" type="submit" processing={processing} />
					</div>

					{error && (
						<span style={{ color: "#D92B21" }}>{error}</span>
					)}

					{success && (
						<span style={{ color: "#7AE582" }}>{success}</span>
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
				</form>
				<div>
					<span>Already a member?<Link to="/signin" style={{ color: "#D92B21" }}>Sign In</Link></span>
				</div>
			</div>
		</div>
	);
}




// <div className="mt-3">

// </div>
// <div className="mt-3">
// 	<Input
// 		label="Username"
// 		type="text"
// 		name="username"
// 		placeholder="Enter Username"
// 	/>
// </div>
// <div className="mt-3">
// 	<Input
// 		label="Email"
// 		type="text"
// 		name="email"
// 		placeholder="Enter email"
// 	/>
// </div>

// <div className="mt-3">
// 	<Input
// 		label="Confirm Password"
// 		type="text"
// 		name="confirmpassword"
// 		placeholder="Confirm password"
// 	/>
// </div>

