import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import authReducer from "./authReducer";
import birthdaysReducer from "./birthdaysReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    birthdays: birthdaysReducer
});
