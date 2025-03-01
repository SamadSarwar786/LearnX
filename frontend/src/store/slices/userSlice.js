import {cookiesList, removeCookie} from '@/lib';
import {getJwt, getRefreshToken, getUserInfoFromToken, isValidJWT} from '@/lib/jwt';
import {createSlice} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import localStorage from 'redux-persist/lib/storage';

const initialState = {
	user: null,
	isAuthenticated: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginSuccess: (state) => {
			state.isAuthenticated = true;
		},
		loginFailure: (state, action) => {
			state.error = action.payload;
		},
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
			removeCookie(cookiesList.authorizationToken);
			// removeCookie(cookiesList.hcToken);
		},
		validateUser: (state) => {
			const token = getJwt();
			if (token && isValidJWT(token)) {
				const userInfoFromToken = getUserInfoFromToken(token);
				state.isAuthenticated = true;
				state.user = userInfoFromToken;
				// state.fetchAccessTokenFlag = false;
			} else {
				removeCookie(cookiesList.authorizationToken);
				// removeCookie(cookiesList.hcToken);
				state.isAuthenticated = false;
				state.user = undefined;
				// if (getRefreshToken()) state.fetchAccessTokenFlag = true;
			}
		},
		updateUserDetails: (state, action) => {
			state.user = {...state.user, ...action.payload};
		},
	},
});

export const {loginStart, loginSuccess, loginFailure, logout, validateUser} = userSlice.actions;

const persistConfig = {
	key: 'user',
	storage: localStorage,
}

export default persistReducer(persistConfig, userSlice.reducer);