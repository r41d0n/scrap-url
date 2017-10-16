//API
import scrapApi from './api';

//Actions
const SEARCH_NEW_INDEXS = 'SEARCH_NEW_INDEXS';

export function loadNewIndexs(query) {
    return {
        type: SEARCH_NEW_INDEXS,
        payload: scrapApi.getNewIndex(query)
    };
}