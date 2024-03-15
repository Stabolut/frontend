
import invoke from '../../uitls/invoke';
import { config } from '../../config/config';


export const signup = (data) => {

    return invoke({
        method: 'POST',
        baseURL: config.baseuUrl,
        route: 'auth/register',
        data: data
    });
}

export const login = (data) => {

    return invoke({
        method: 'POST',
        baseURL: config.baseuUrl,
        route: 'auth/login',
        data: data
    });
}
