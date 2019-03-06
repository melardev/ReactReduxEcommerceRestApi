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

export const ProductActionCreator = {
    fetchProducts,
    fetchedProducts,
    fetchProduct,
    fetchedProduct
};
