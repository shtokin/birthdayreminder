import axios from 'axios';
import moment from "moment";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_BIRTHDAYS,
  CREATE_BIRTHDAY,
  UPDATE_BIRTHDAY,
  FETCH_BIRTHDAY,
  DELETE_BIRTHDAY,
  SHOW_NOTIFICATION,
  FETCH_SETTINGS,
  SAVE_LANGUAGE,
  SAVE_THEME
} from "./types";
import history from "../history";

export const signIn = (user) => {
  return {
    type: SIGN_IN,
    payload: user
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const getBirthdaysList = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  if (userId) {
    const {data} = await axios.get(`/api/birthday/${userId}/list`);
    dispatch({
      type: FETCH_BIRTHDAYS,
      payload: data
    });
  }
};

export const createBirthday = (formData) => async (dispatch, getState) => {
  let postData = new FormData();
  let dataString = formData.date ? moment(formData.date).format('MM/DD/YYYY') : '';
  postData.append('date', dataString);
  postData.append('name', formData.name ? formData.name : '');
  postData.append('description', formData.description ? formData.description : '');
  postData.append('photo', formData.photo ? formData.photo : '');
  postData.append('userId', getState().auth.userId);

  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  };

  const { data } = await axios.post(
    '/api/birthday',
    postData,
    config
  );
  dispatch({
    type: CREATE_BIRTHDAY,
    payload: data
  });

  history.push("/");
};

export const updateBirthday = (formData, birthdayId) => async (dispatch, getState) => {
  let postData = new FormData();
  let dataString = moment(formData.date).format('MM/DD/YYYY');
  postData.append('date', dataString);
  postData.append('name', formData.name);
  postData.append('description', formData.description);
  postData.append('photo', formData.photo);
  postData.append('userId', getState().auth.userId);

  const config = {
    headers: { 'content-type': 'multipart/form-data' }
  };

  // use post due to laravel can't manage put request with multipart/form-data
  const { data } = await axios.post(
    `/api/birthday/${birthdayId}`,
    postData,
    config
  );
  dispatch({
    type: UPDATE_BIRTHDAY,
    payload: data
  });

  history.push("/");
};

export const deleteBirthday = (birthdayId) => async (dispatch, getState)  => {
  const userId = getState().auth.userId;
  const { data } = await axios.delete(
    `/api/birthday/${userId}/${birthdayId}`
  );
  dispatch({ type: DELETE_BIRTHDAY, payload: birthdayId });
};

export const getBirthday = (birthdayId) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  if (userId) {
    const {data} = await axios.get(`/api/birthday/${userId}/${birthdayId}`);
    dispatch({
      type: FETCH_BIRTHDAY,
      payload: data
    });
  }
};

export const setNotificationShowed = () => {
  return {
    type: SHOW_NOTIFICATION,
    payload: { isShowed: true }
  };
};

export const fetchSettings = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  if (userId) {
    const {data} = await axios.get(`/api/settings/${userId}`);
    dispatch({
      type: FETCH_SETTINGS,
      payload: data
    });
  }
};

export const saveLanguage = (lang) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  if (userId) {
    let postData = new FormData();
    postData.append('language', lang);
    const { data } = await axios.post(
      `/api/settings/${userId}/language`,
      postData
    );
    dispatch({
      type: SAVE_LANGUAGE,
      payload: data
    });
  }
};

export const saveTheme = (lang) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  if (userId) {
    let postData = new FormData();
    postData.append('theme', lang);
    const { data } = await axios.post(
      `/api/settings/${userId}/theme`,
      postData
    );
    dispatch({
      type: SAVE_THEME,
      payload: data
    });
  }
};


