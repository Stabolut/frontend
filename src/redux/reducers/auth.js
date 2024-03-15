import { SET_CURRENT_USER, } from '../types/auth'
import { isEmpty } from 'lodash'

const initialState = {
    isAuthenticated: false,
   
    user: {},
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                //#TODO: //To update the Logic for Signout
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            }
      

        default:
            return state
    }
}
