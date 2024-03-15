
import invoke from '../../uitls/invoke';
import { config } from '../../config/config';


export const purchase = (data) => {

    return invoke({
        method: 'POST',
        baseURL: config.baseuUrl,
        route: 'purchase-usb',
        data: data,
        // headers: {
        //     Authorization: localStorage.getItem('jwtToken')
        // }
    });
}



export const purchaseEth = (data) => {

    return invoke({
        method: 'POST',
        baseURL: config.baseuUrl,
        route: 'purchase-eth',
        data: data,
        // headers: {
        //     Authorization: localStorage.getItem('jwtToken')
        // }
    });
}


export const getAdminDepositAddress = (data) => {

    return invoke({
        method: 'GET',
        baseURL: config.baseuUrl,
        route: `get-admin-deposit-address?type=${data}`,
        // headers: {
        //     Authorization: localStorage.getItem('jwtToken')
        // }

    });
}
