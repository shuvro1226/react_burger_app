import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBC9Zb8wb-nkNt4ss14WdOsRxf9xQSlX7I';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBC9Zb8wb-nkNt4ss14WdOsRxf9xQSlX7I';
        }

        axios.post(url, authData)
            .then(res => {
                dispatch(authSuccess(res.data));
            })
            .catch(error => {
                dispatch(authFailed(error));
            });
    }
}