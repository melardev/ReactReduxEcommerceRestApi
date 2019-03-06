import {UiActionCreator} from "./ui.actions";
import {AxiosAddressesService} from "../services/net/AxiosAddressesService";
import {AddressesAction} from "./types";

const fetchedAddresses = (page_meta, addresses) => {
    return {
        type: AddressesAction.FETCH_ADDRESSES_SUCCESS,
        addressesData: {
            page_meta, addresses
        }
    }
};

const createFetchAction = () => {
    return {type: AddressesAction.FETCH_ADDRESSES}
};

const fetchAddresses = () => {
    console.trace('AddressesActionCreator::fetchAddresses');
    return (dispatch) => {
        console.trace('AddressesActionCreator::fetchAddresses_Async');
        dispatch(UiActionCreator.info('Loading addresses'));
        dispatch(AddressesActionCreator.createFetchAction());
        AxiosAddressesService.fetchAll().then(res => {

            if (res.data.success)
                dispatch(AddressesActionCreator.fetchedAddresses(res.data.page_meta, res.data.addresses));
            else
                dispatch(UiActionCreator.showErrorAlert(res.data.full_messages ? res.data.full_messages : 'An error occurred'));
        }).catch(err => {
            console.error(err);
        });
    }
};

export const AddressesActionCreator = {
    fetchAddresses, fetchedAddresses, createFetchAction
};
