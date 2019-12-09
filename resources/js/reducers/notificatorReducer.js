import { SHOW_NOTIFICATION } from "../actions/types";

const INITIAL_STATE = { isShowed: false };

export default (state = INITIAL_STATE, action ) => {
  if (action.type === SHOW_NOTIFICATION) {
    return {...state, isShowed: true};
  }
  return state;
}