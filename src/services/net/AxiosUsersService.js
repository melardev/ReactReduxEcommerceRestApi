import {UsersService} from './../local/UsersService'
import {AxiosService} from "./base/AxiosService";


export const AxiosUsersService = {


    login(user) {
        return AxiosService.post('/auth/login/', user);
    },

    logout() {
        if (typeof window !== "undefined")
            UsersService.clearSession();
    },

    create(user) {
        return AxiosService.post('/users/', user);
    },

    fetchAll() {

    },
};
