import {AxiosService} from "./base/AxiosService";

export const ProductAxiosService = {
    fetchPage(query = {location: '/products', page: 1, page_size: 5}) {
        return AxiosService.fetchPage(query.location, query);
    },
    getBySlug(slug) {
        if (typeof slug !== "string") {
            throw new Error(
                "Slug must be a string"
            );
        }
        return AxiosService.get(`/products/${slug}`);
    },

    create(slug, payload) {
        return AxiosService.post(`articles/${slug}/comments`, {
            comment: {body: payload}
        });
    },
    createProduct(formData) {
        return AxiosService.post(`products`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    },
    delete(slug, commentId) {
        return AxiosService.delete(`articles/${slug}/comments/${commentId}`);
    }
};
