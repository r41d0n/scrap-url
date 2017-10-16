//Utils
import { getNewState } from '../../../lib/utils/frontend';

const initialState = {
    pages: {}
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case 'SEARCH_LIST_PAGES_SUCCESS': {
            const { payload: { response = {} } } = action;

            console.log('en el reducer el responce', response);
            console.log('en el reducer el action', action);
            return getNewState(state, {
                pages: response
            });
        }
        default: return state;

    }
}