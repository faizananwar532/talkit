import React, { createContext, useContext } from "react";

const AuthContext = createContext({

});

export function useAuthentication() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {

	return (
		<AuthContext.Provider value={""}>
			{children}
		</AuthContext.Provider>
	);

}