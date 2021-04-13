import {
  ADD_CHIPS,
  DELETE_CHIPS,
  TOGGLE_FILTER,
  TOGGLE_SETTINGS,
  LOGIN,
  LOGOUT,
  ADD_FROM_PAGE,
  CLEAR_CHIPS,
  TOGGLE_RATE_WORKER_WARNING,
  SET_ERROR,
  ADD_RATE_WORKER_LIST,
  ADD_RATE_WORKER_TIME,
} from "../actionTypes";
import React from "react";
import { Redirect } from "react-router-dom";

export const addChips = (chip) => (dispatch) =>
  dispatch({
    type: ADD_CHIPS,
    payload: chip,
  });

export const deleteChips = (chip) => (dispatch) => {
  dispatch({
    type: DELETE_CHIPS,
    payload: chip,
  });
};

export const toggleFilter = () => (dispatch) => {
  dispatch({
    type: TOGGLE_FILTER,
  });
};

export const toggleSettings = () => (dispatch) => {
  dispatch({
    type: TOGGLE_SETTINGS,
  });
};

export const login = () => (dispatch) => {
  dispatch({
    type: LOGIN,
  });
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOGOUT,
  });
  return <Redirect to="/login" />;
};

export const addFromPage = (value) => (dispatch) => {
  dispatch({
    type: ADD_FROM_PAGE,
    payload: value,
  });
};

export const clearChips = () => (dispatch) => {
  dispatch({
    type: CLEAR_CHIPS,
  });
};

export const toggleRateWorkerWarning = (value) => (dispatch) => {
  dispatch({
    type: TOGGLE_RATE_WORKER_WARNING,
    payload: value,
  });
};

export const setError = (error) => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: error,
  });
};

export const addRateWorkerList = (list) => (dispatch) => {
  dispatch({
    type: ADD_RATE_WORKER_LIST,
    payload: list,
  });
};

export const addRateWorkerTime = (time) => (dispatch) => {
  dispatch({
    type: ADD_RATE_WORKER_TIME,
    payload: time,
  });
};
