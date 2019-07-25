import {ProductAction} from "../actions/types";

const INITIAL_STATE = {
    loading: false,
    products_data: {
        page_meta: {},
        products: []
    },
    selected_product: {},
    product_created: false
};
export const ProductReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProductAction.FETCH_PRODUCTS:
            return {...state, loading: true};
        case ProductAction.FETCH_PRODUCTS_SUCCESS:
            return {...state, loading: false, products_data: action.products_data};
        case ProductAction.FETCH_PRODUCT:
            return {...state, loading: true};
        case ProductAction.FETCH_PRODUCT_SUCCESS:
            return {...state, loading: false, selected_product: action.product};
        case ProductAction.CREATED_PRODUCT_SUCCESS:
            const newProductsData = {...state.products_data};
            newProductsData.products.push(action.product);
            return {
                ...state, loading: false, product_created: true,
                products_data: newProductsData
            };
        case ProductAction.CLEAR_PRODUCT_CREATED:
            return {...state, product_created: false};
        default:
            return state;
    }
};
