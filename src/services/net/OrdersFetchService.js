import {environment} from "../environment";

export const OrdersFetchService = {
    create(params, credentials, order, token) {
        return fetch(`${environment.urls.orders}/${params.userId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({order: order, token: token})
        })
            .then((response) => {
                return response.json()
            }).catch((err) => console.log(err))
    },
    listByShop(params, credentials) {
        return fetch(`${environment.urls.orders}/${params.shopId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        }).then((response) => {
            return response.json()
        }).catch((err) => {
            console.log(err)
        })
    },

    update(params, credentials, product) {
        return fetch(`${environment.urls.orders}/status/${params.shopId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(product),
        }).then((response) => {
            return response.json()
        }).catch((err) => {
            console.log(err);
        });
    },

    cancelProduct(params, credentials, product) {
        return fetch(`${environment.urls.orders}/${params.shopId}/cancel/${params.productId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(product)
        }).then((response) => {
            return response.json()
        }).catch((err) => {
            console.log(err)
        })
    },

    processCharge(params, credentials, product) {
        return fetch(`${environment.urls.orders}/${params.orderId}/charge/${params.userId}/${params.shopId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(product)
        }).then((response) => {
            return response.json()
        }).catch((err) => {
            console.log(err)
        });
    },

    getStatusValues() {
        return fetch(`${environment.urls.orders}/status_values`, {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).catch((err) => console.log(err))
    },

    listByUser(params, credentials) {
        return fetch(`${environment.urls.orders} / from_user / ${params.userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        }).then((response) => {
            return response.json()
        }).catch((err) => {
            console.log(err)
        })
    },
    read(params, credentials) {
        return fetch(`${environment.urls.orders} / ${params.orderId}`, {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).catch((err) => console.log(err))
    }
};