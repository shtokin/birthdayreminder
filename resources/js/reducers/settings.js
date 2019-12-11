import { FETCH_SETTINGS, SAVE_THEME, SAVE_LANGUAGE } from "../actions/types";

const INITIAL_STATE = {
  language: 'en',
  theme: 'default'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SETTINGS:
      const language = action.payload.language ? action.payload.language : 'en';
      const theme = action.payload.theme ? action.payload.theme : 'default';
      return {...state, language, theme};
    case SAVE_LANGUAGE:
      return {...state, language: action.payload};
    case SAVE_THEME:
      return {...state, theme: action.payload};
    default:
      return state;
  }
}