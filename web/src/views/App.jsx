import "../assets/styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

//Components
import AppComponent from "../components/AppComponent";

function App() {

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={AppComponent} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
