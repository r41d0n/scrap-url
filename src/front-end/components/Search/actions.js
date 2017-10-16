//API
import searchApi from './api';

//Actions
const SEARCH_LIST_PAGES = 'SEARCH_LIST_PAGES';

export function loadPagesOcurrency(query) {
    console.log('el query del action es', query);
    return {
        type: SEARCH_LIST_PAGES,
        payload: searchApi.getPagesOcurrency(query)
    };
}