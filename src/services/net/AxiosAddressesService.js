import {AxiosService} from "./base/AxiosService";


export const AxiosAddressesService = {

    fetchAll() {
        return AxiosService.get('/addresses');
    },

    create() {

    }

};
