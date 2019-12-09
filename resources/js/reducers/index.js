import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import authReducer from "./authReducer";
import birthdaysReducer from "./birthdaysReducer";
import notificatorReducer from "./notificatorReducer";

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    birthdays: birthdaysReducer,
    notification: notificatorReducer
});
