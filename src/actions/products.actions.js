import {UiActionCreator} from "./ui.actions";
import {ProductAxiosService} from "../services/net/ProductAxiosService";
import {ProductAction} from "./types";
import NProgress from "nprogress";

const BASE_URL = 'localhost:8080/api';
const BASE_URL_PRODUCTS = `${BASE_URL}/products`;

// {     headers: {authorization: localStorage.getItem('jwt')}}

const fetchedProducts = (page_meta, products) => {
    return {
        type: ProductAction.FETCH_PRODUCTS_SUCCESS,
        products_data: {page_meta, products}
    }
};

const fetchedProduct = (product) => {
    return {
        type: ProductAction.FETCH_PRODUCT_SUCCESS,
        product
    };
};

const fetchProducts = function (query) {
    console.trace('ProductActionCreator::fetchProducts');
    return (dispatch) => {
        console.trace('ProductActionCreator::fetchProducts_Async');
        dispatch(UiActionCreator.info('Loading products'));
        ProductAxiosService.fetchPage(query).then(res => {
            dispatch(UiActionCreator.successToast('Fetched products'));
            if (res.data.success)
                dispatch(ProductActionCreator.fetchedProducts(res.data.page_meta, res.data.products));
            else
                dispatch(UiActionCreator.showErrorAlert(res.data.full_messages ? res.data.full_messages : 'An error occurred'));
        }).catch(err => {
            console.error(err);
        });
    }
};

export function fetchProduct(slug) {
    console.trace('ProductActionCreator::fetchProduct');
    return (dispatch) => {
        console.trace('ProductActionCreator::fetchProduct_Async');
        //dispatch(UiActionCreator.info('Loading products'));
        ProductAxiosService.getBySlug(slug).then(res => {
            if (res.data.success) {
                //       dispatch(UiActionCreator.clearToast());
                dispatch(ProductActionCreator.fetchedProduct(res.data));
            } else
                dispatch(UiActionCreator.showErrorAlert(res.data.full_messages ? res.data.full_messages : 'An error occurred'));
        }).catch(err => {
            console.error(err);
        });
    }
}

export function createProduct(product) {
    console.trace('ProductActionCreator::fetchProduct');
    return (dispatch) => {
        console.trace('ProductActionCreator::createProduct_Async');
        //dispatch(UiActionCreator.info('Loading products'));
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('stock', product.stock);
        formData.append('price', product.price);
        const images = product.images;

        for (let i = 0; images != null && i < images.length; i++) {
            formData.append('images[]', images[i], images[i].name);
        }

        ProductAxiosService.createProduct(formData)
            .then(res => {
                if (res.data.success) {
                    //       dispatch(UiActionCreator.clearToast());
                    delete res.data.success;
                    delete res.data.full_messages;
                    dispatch(createdProduct(res.data));
                } else
                    dispatch(UiActionCreator.showErrorAlert(res.data.full_messages ? res.data.full_messages : 'An error occurred'));
            }).catch(err => {
            console.error(err);
        });
    }
}

function createdProduct(product) {
    return {
        type: ProductAction.CREATED_PRODUCT_SUCCESS,
        product
    }
}

function clearProductCreated() {
    return {
        type: ProductAction.CLEAR_PRODUCT_CREATED
    }
}

export const ProductActionCreator = {
    fetchProducts,
    fetchedProducts,
    fetchProduct,
    fetchedProduct,
    createProduct,
    clearProductCreated
};
