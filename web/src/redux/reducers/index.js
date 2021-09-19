import { combineReducers } from "redux";

//Add Additional Reducers Here 
import authReducer from "./authReducer";

//add here also and give the name to the reducer
const allReducers = combineReducers({
	//name: reducer
	auth: authReducer
});

export default allReducers;