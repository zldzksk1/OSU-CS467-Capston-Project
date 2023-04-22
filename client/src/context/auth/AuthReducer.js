/* eslint-disable import/no-anonymous-default-export */
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER
} from '../types';

const authReducer = (state, action) => {
    switch (action.type) {
			case REGISTER_SUCCESS:
				return {
					...state,
					...action.payload,
					isAuthenticated: true,
					loading: false,
				};
			case REGISTER_FAIL:
				return {
					...state,
					token: null,
					isAuthenticated: false,
					loading: false,
					user: null,
					error: action.payload,
				};
			case CLEAR_ERRORS:
				return {
					...state,
					error: null,
				};
			case USER_LOADED:
				return {
					...state,
					isAuthenticated: true,
					loading: false,
					user: action.payload,
				};
			case AUTH_ERROR:
				return {
					...state,
					token: null,
					isAuthenticated: false,
					loading: false,
					user: null,
					error: action.payload,
				};
			case LOGIN_SUCCESS:
				return {
					...state,
					...action.payload,
					isAuthenticated: true,
					loading: false,
				};
			case LOGIN_FAIL:
				return {
					...state,
					token: null,
					isAuthenticated: false,
					loading: true,
					user: null,
					error: action.payload,
				};
			case LOGOUT:
				return {
					...state,
					token: null,
					isAuthenticated: false,
					loading: true,
					user: null,
					error: action.payload,
				};
			case UPDATE_USER_SUCCESS:
				return {
                    ...state,
                    user: state.user._id === action.payload._id ? action.payload : state.user,
					isAuthenticated: true,
					loading: false,
					updated: true
				};
            case UPDATE_USER_FAIL:
				return {
					...state,
					loading: false, 
					error: action.payload
				}
        	case PASSWORD_CHANGE_SUCCESS:
				return {
					...state,
					...action.payload,
					isAuthenticated: true,
					loading: false
				}
        	case PASSWORD_CHANGE_FAIL:
				return {
					...state,
					loading: true,
					error: action.payload
				}
			case DELETE_USER:
				return {
					...state,
					token: null,
					isAuthenticated: false,
					loading: true,
					user: null,
				};
			default:
				throw new Error(`Unsupported type of: ${action.type}`);
		}
}

export default authReducer;