import {AxiosService} from "./base/AxiosService";

export const PagesAxiosService = {
    getHome() {
        return AxiosService.get('/');
    },
    getAbout() {

    }
};