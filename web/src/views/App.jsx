import "../assets/styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

//Components
// import AppComponent from "../components/AppComponent";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ChatPanelContainer from "./Chat/ChatPanelContainer";
import AuthProvider from "../context/Authentication";

function App() {

	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Switch>
						<Route exact path="/signin" component={SignIn} />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/">
							<ChatPanelContainer />
						</Route>
						<Route exact path="/:channel_name">
							<ChatPanelContainer />
						</Route>
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
