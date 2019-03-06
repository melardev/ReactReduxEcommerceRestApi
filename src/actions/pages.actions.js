import NProgress from "nprogress";
import {PagesAxiosService} from "../services/net/PagesAxiosService";
import {UiActionCreator} from "./ui.actions";
import {PageAction} from "./types";

function fetchedHome(tags, categories) {
    return {
        type: PageAction.FETCH_HOME_SUCCESS,
        tags, categories
    }
}

const fetchHome = () => {
    NProgress.start(0.0);
    console.trace('PageAction::fetchHome');
    return (dispatch) => {
        console.trace('PageAction::fetchHome_Async');
        dispatch(UiActionCreator.info('Loading home'));
        PagesAxiosService.getHome().then(res => {
            if (res.data.success && res.data.tags && res.data.categories)
                dispatch(PageActionCreator.fetchedHome(res.data.tags, res.data.categories));
            else
                dispatch(UiActionCreator.showErrorAlert(res.data.full_messages ? res.data.full_messages : 'An error occurred'));
        }).catch(err => {
            console.error(err);
        });
    }
};

export const PageActionCreator = {
    fetchHome,
    fetchedHome,
};
