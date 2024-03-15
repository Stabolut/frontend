
import invoke from '../../uitls/invoke';
import { config } from '../../config/config';


export const subscribeUser = (data) => {

    return invoke({
        method: 'POST',
        baseURL: config.baseuUrl,
        route: 'subscribe',
        data: data
    });
}

export const sendContactUsEmail = (data) => {

    return invoke({
        method: 'POST',
        baseURL: config.baseuUrl,
        route: 'contact-us-email',
        data: data
       
    });
}
