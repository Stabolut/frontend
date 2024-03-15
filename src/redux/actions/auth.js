import { SET_CURRENT_USER } from '../types/auth'
import { isEmpty } from 'lodash'
// import * as commonType from '../common/common.types'
//For Login
import jwt_decode from 'jwt-decode'



export const setCurrentUser = (decodedUser) => {
    //LOGOUT Case
    if (isEmpty(decodedUser)) {
        return {
            type: SET_CURRENT_USER,
            payload: decodedUser,
        }
    }
    //LOGIN Case
    if (!isEmpty(decodedUser)) {
        return {
            type: SET_CURRENT_USER,
            payload: decodedUser,
        }
    }
}
