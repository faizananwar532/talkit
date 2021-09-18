import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../sub-components/Button";
import Input from "../../sub-components/Input";
import SignUpImage from "../../assets/icons/Signup.png";
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
		<div className="signup-wrapper">
			<div className="signup-image-container">
				<img
					src={SignUpImage}
					alt=""
				/>
			</div>
        
			<div className="signup-container">
				<div>
					<Logo/>
				</div>
				<div className="header">
					<span className="pr-2">Sign Up</span>
					<Arrow/>
				</div>
				<div className="d-flex mt-5 w-100 justify-content-between" >
					<Input
						label="First Name"
						type="text"
						name="firstname"
						style={{width:"48%"}}
					/>
					<Input
						label="Last Name"
						type="text"
						name="lastname"
						style={{width:"48%"}}
					/>
				</div>
                    
				<div className="mt-5">
					<Input
						label="Email"
						type="text"
						name="email"
					/>
				</div>
				<div className="d-flex mt-5 w-100 justify-content-between">
					
					<Input
						label="Password"
						type="text"
						name="password"
						style={{width:"48%"}}
					/>
					
					
					<Input
						label="Confirm Password"
						type="text"
						name="confirmpassword"
						style={{width:"48%"}}
					/>
					
				</div>
				<div className="pt-5 pb-4">
					<Button style={{width:"100%", color:"white", padding:"15px" }} primary label="Sign Up"/>
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
					<span>Already a member?<Link to="/signin" style={{color: "#D92B21"}}>Sign In</Link></span>
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
			
