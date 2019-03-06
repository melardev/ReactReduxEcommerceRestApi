import {AddressesAction} from "../actions/types";

const INITIAL_STATE = {
    loading: false,
    addressesData: {
        pageMeta: {},
        addresses: []
    }
};
export const AddressesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AddressesAction.FETCH_ADDRESSES:
            return {...state, loading: true};
        case AddressesAction.FETCH_ADDRESSES_SUCCESS:
            return {
                loading: false,
                addressesData: action.addressesData
            };
        default:
            return state;
    }
};