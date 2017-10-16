//API
import scrapApi from './api';

//Actions
const SEARCH_NEW_INDEXS = 'SEARCH_NEW_INDEXS';
const CLEAR_INDEXS = 'CLEAR_INDEXS';

export function loadNewIndexs(query) {
    return {
        type: SEARCH_NEW_INDEXS,
        payload: scrapApi.getNewIndex(query)
    };
}
export function clearIndex(query) {
    return {
        type: CLEAR_INDEXS,
        payload: scrapApi.getClearIndex(query)
    };
}