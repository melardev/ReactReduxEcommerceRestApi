import {UsersService} from "../local/UsersService";

let cachedUser = {};
UsersService.subscribe((user) => {
    cachedUser = user;
});
export const FetchUsersService = {


    login(user) {
        return fetch('/auth/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        });
    },

    logout() {
        //optional
        return fetch('/users/logout/', {
            method: 'GET',
        }).then(response => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            // TODO return promise success with response
            return response.json()
        }).catch((err) => console.log(err))
    },

    create(user) {
        return fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    },

    list() {
        return fetch('/api/users/', {
            method: 'GET',
        });
    },

    profile() {
        return fetch('/api/users/' + cachedUser.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cachedUser.token
            }
        });
    },

    update(data) {
        return fetch('/api/users/' + cachedUser.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cachedUser.token
            },
            body: JSON.stringify(data)
        });
    },

    destroy() {
        return fetch('/api/users/' + cachedUser.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cachedUser.token
            }
        });
    },
};
