import "../assets/styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

//Components
// import AppComponent from "../components/AppComponent";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={SignIn} />
					<Route exact path="/signup" component={SignUp} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
