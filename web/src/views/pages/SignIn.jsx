import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../sub-components/Button";
import Input from "../../sub-components/Input";
import SignInImage from "../../assets/icons/Login.png";
import {ReactComponent as Logo} from "../../assets/icons/logo/Logo.svg";
import {ReactComponent as Arrow} from "../../assets/icons/arrows/shape.svg";
import Googlelogo from "../../assets/icons/logo/Google Icon.svg";
import FacebookLogo from "../../assets/icons/logo/Facebook Icon.svg";


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
		<div className="signin-wrapper">
			<div className="signin-image-container">
				<img
					src={SignInImage}
					alt=""
				/>
			</div>
        
			<div className="signin-container">
				<div>
					<Logo/>
				</div>
				<div className="header">
					<span className="pr-2">Sign In</span>
					<Arrow/>
				</div>
				<div className="mt-5">
					<Input
						label="Email"
						type="text"
						name="email"
						
					/>
				</div>
				<div className="mt-5">
					<Input
						label="Password"
						type="text"
						name="password"
					/>
				</div>
				<div className="pt-5 pb-4">
					<Button style={{width:"100%", color:"white", padding:"15px" }} primary label="Sign In"/>
				</div>
				<div className="line-container">
					<div className="line-style">
						<span>or</span> 
					</div>
				</div>
				<div className="mt-4 mb-4">
					<Button secondary logo={Googlelogo} label="Continue with Google"/>
				</div>
				<div className="mt-1 mb-4">
					<Button secondary logo={FacebookLogo} label="Continue with Facebook"/>
				</div>
				<div>
					<span>Dont have an account? <Link to="/signup" style={{color: "#D92B21"}}>Create New</Link></span>
				</div>
			</div>
		</div>
	);
}