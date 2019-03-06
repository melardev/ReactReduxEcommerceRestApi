import {PageAction} from "../actions/types";

const INITIAL_STATE = {
    loading: false,
    tags: [],
    categories: []
};
export const PageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PageAction.FETCH_HOME:
            return {...state, loading: true};
        case PageAction.FETCH_HOME_SUCCESS:
            return {...state, tags: action.tags, categories: action.categories};
        default:
            return state;
    }
};