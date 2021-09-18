import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { authBaseUrl } from "../utils/BaseURL";
import { getCookie } from "../utils/Utilites";

const AuthContext = createContext({
	access_token: null,
	token_expires_at: null,
	user: null
});

export function useAuthentication() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {

	const [isLoaded, setIsLoaded] = useState(false);

	const [auth, setAuth] = useState({
		access_token: null,
		token_expires_at: null,
		user: null
	});

	const history = useHistory();

	async function refreshToken() {

		try {

			const response = await fetch(`${authBaseUrl}/auth/refresh/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				body: JSON.stringify({ refresh_token: getCookie("token") })
			});

			if (!response.ok) {
				history.push("/signin");
			}

			const json = await response.json();

			setAuth({ ...auth, access_token: json.data.access_token, token_expires_at: json.data.expiration_timestamp });

			if (window.location.pathname.includes("/signup") || window.location.pathname.includes("/signin")) {
				history.push("/");
			}

		} catch (err) {
			console.log(err);
			history.push("/signin");
		}

	}

	useEffect(async () => {

		await refreshToken();
		setIsLoaded(true);

	}, []);

	return (
		<AuthContext.Provider value={{ ...auth }}>
			{
				isLoaded ? (
					children
				) : (
					"Loading"
				)
			}
		</AuthContext.Provider>
	);

}