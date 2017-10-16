//Utils
import {
    getNewState
} from '../../../lib/utils/frontend';

const initialState = {
    indexs: {},
    loading: false,
    error: {}
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case 'SEARCH_NEW_INDEXS_SUCCESS':
            {
                const {
                    payload: {
                        response = {}
                    }
                } = action;

                return getNewState(state, {
                    indexs: response,
                    loading: false
                });
            }
        case 'SEARCH_NEW_INDEXS_START': {
            return getNewState(state, {
                loading: true
            });
        }
        case 'SEARCH_NEW_INDEXS_ERROR': {
            const {
                    payload: {
                        response = {}
                    }
                } = action;

            return getNewState(state, {
                loading: false,
                error: response
            });

        }
        default:
            return state;

    }
}