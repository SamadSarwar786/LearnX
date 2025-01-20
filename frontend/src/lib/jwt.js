import { cookiesList, getCookies } from "./";

export const getJwt = () => {
    return getCookies().get(cookiesList.authorizationToken);
};

export const getRefreshToken = () => {
    return getCookies().get(cookiesList.refreshToken);
};

export const isValidJWT = (token) => {
    if (!token) return false;

    try {
        const tokenArr = token.split('.');
        if (tokenArr.length === 3) {
            const encodedPayload = tokenArr[1];
            if (encodedPayload) {
                const payload = JSON.parse(atob(encodedPayload));
                const isExpired = new Date(payload.exp * 1000).getTime() - Date.now() < 0;
                const isValidIss = payload.iss === 'www.learnx.me';
                return !isExpired && isValidIss;
            }
        }
    } catch (ex) {
        return false;
    }
    return false;
};

export const getUserInfoFromToken = (token) => {
    const tokenArr = token.split('.');
    if (tokenArr.length === 3) {
        const encodedPayload = tokenArr[1];
        if (encodedPayload) {
            try {
                return JSON.parse(atob(encodedPayload));
            } catch(ex) {
                return null;
            }
        }
    }
    return null;
};
