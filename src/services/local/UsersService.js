import {LocalStorageService} from "./base/LocalStorageService";


const USER_KEY = 'user';


export const UsersService = {

    isAuthenticated() {
        if (typeof window === "undefined")
            return false;
        const user = LocalStorageService.get(USER_KEY);
        return !!user;
    },

    authenticate(userObj) {
        if (typeof window !== 'undefined') {
            LocalStorageService.set(USER_KEY, JSON.stringify(userObj));
        }

    },

    getToken() {
        const user = LocalStorageService.get('user');
        return user ? user.token : null;
    },

    saveUser(user) {
        LocalStorageService.set('user', JSON.stringify(user));
    },

    getUser() {
        try {
            return JSON.parse(LocalStorageService.get('user'));
        } catch (err) {
            return null;
        }
    },

    clearSession() {
        LocalStorageService.clear('user');
    },

    isNotAuthenticated() {
        return !this.isAuthenticated();
    },
};
