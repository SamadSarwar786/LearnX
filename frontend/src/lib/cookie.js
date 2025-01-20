
export const cookiesList = {
	authorizationToken: '__learnx_auth_state',
	refreshToken: '__learnx_refresh_state',
	issuedAt: '__learnx_iss',
	deviceToken: '__learnx_uat',
	hcToken: 'token',
};

export const getCookies = () => {
	const c = document.cookie.split('; ').reduce((a, c) => a.set(c.split('=')[0], c.split('=')[1]), new Map());
	return c;
};

export const setCookie = ({
	name,
	data,
	expires,
	domain,
	path = '/',
	priority = 'HIGH',
	secure = true,
	httpOnly = true,
}) => {
	document.cookie = `${name}=${data}; expires=${expires}; priority=${priority}; ${
		domain ? `domain=${domain};` : ''
	} path=${path}; ${secure ? 'Secure:true;' : null}; ${httpOnly ? 'HttpOnly:true;' : null}`;
};

export const removeCookie = (name, domain) => {
	setCookie({
		name,
		domain,
		data: '',
		expires: new Date().toUTCString(),
	});
};
