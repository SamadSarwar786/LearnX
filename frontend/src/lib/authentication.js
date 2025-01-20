import { cookiesList, setCookie } from "./";

export const setAuthToken = (authToken, refreshToken) => {
	const payload = JSON.parse(atob(authToken.split('.')[1]));
	const expDate = new Date(payload.exp * 1000 - 60000);
	setCookie({
		name: cookiesList.authorizationToken,
		data: authToken,
		expires: expDate.toUTCString(),
	});
	if (refreshToken) {
		const refreshTokenExpiry = new Date();
		refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 30);
		setCookie({
			name: cookiesList.refreshToken,
			data: refreshToken,
			expires: refreshTokenExpiry.toUTCString(),
		});
	}
};