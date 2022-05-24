import { LOGIN_USER_SUCCESS, VIDEO_CODE, STATUS } from "./actionTypes";
import axios from "axios";
// import AsyncStorage from "@react-native-community/async-storage";

const baseUrl = "https://m-cure-postgres.herokuapp.com";

export const loginUserSuccess = (payload) => {
    return {
        type: LOGIN_USER_SUCCESS,
        payload,
    };
};

export const postLoginUser = (data) => {
    return async (dispatch) => {
        try {
            let response = await axios.post(`${baseUrl}/users/consultants/login`, data);
            let dataToSave = response.data;

            dispatch(loginUserSuccess(dataToSave));

            return "success";
        } catch (error) {
            return error;
        }
    };
};

export const videoCode = (payload) => {
    return {
        type: VIDEO_CODE,
        payload,
    };
};

export const postVideoCode = (data) => {
    return async (dispatch) => {
        try {
            let response = await axios.patch(`${baseUrl}/users/consultants`, data, {
                headers: {
                    access_token:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImVtYWlsIjoiZGViYnlyaWFAbWFpbC5jb20iLCJpYXQiOjE2NTM0MjcyMTUsImV4cCI6MTY1MzQ0ODgxNX0.ci_tuJ_8IXElqMxvEH-cO4XMn4eMA36wQKTR_eyrl3Q",
                },
            });
            let dataToSave = response.data;

            dispatch(videoCode(dataToSave));

            return "success";
        } catch (error) {
            return error;
        }
    };
};

export const status = (payload) => {
    return {
        type: STATUS,
        payload,
    };
};

export const postStatus = () => {
    return async (dispatch) => {
        try {
            let response = await axios.patch(`${baseUrl}/users/consultants/status`, {}
            );
            let dataToSave = response.data;

            dispatch(status(dataToSave));

            return "success";
        } catch (error) {
            return error;
        }
    };
}