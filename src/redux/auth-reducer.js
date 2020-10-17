import { LoginAPI } from '../api/api-login';
import { stopSubmit } from "redux-form";

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_PROCESS = 'LOGIN_PROCESS';
const USER_LOGOUT = 'USER_LOGOUT';

const user = JSON.parse(localStorage.getItem('jwt-token'));

const initialState = user
    ? { isLoggedIn: true, isLoading: false }
    : { isLoggedIn: false, isLoading: false };

const userLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true
            }
        case LOGIN_PROCESS:
            return {
                ...state,
                isLoading: action.payload,
            }
        case USER_LOGOUT: {
            return {
                ...state,
                isLoggedIn: false
            }

        }
        default:
            return state;
    }
}

export const userLoginSuccessAC = () => ({ type: LOGIN_SUCCESS })
export const userLoginProcessAC = (isLoading) => ({ type: LOGIN_PROCESS, payload: isLoading })
export const userLogoutAC = () => ({ type: USER_LOGOUT })

export const userLogin = (username, password) => async (dispatch) => {
    try {
        dispatch(userLoginProcessAC(true))
        let response = await LoginAPI.login(username, password)
        let token = response.headers['x-test-app-jwt-token']
        localStorage.setItem('jwt-token', JSON.stringify(token))
        dispatch(userLoginSuccessAC(response.data.status))
    } catch (error) {
        dispatch(userLoginProcessAC(false))
        let errorMessage = error.response.data.description
        dispatch(stopSubmit('login', { _error: errorMessage }))
    }
}

export const userLogout = () => (dispatch) => {
    localStorage.removeItem('jwt-token');
    dispatch(userLogoutAC())
}

export default userLoginReducer;