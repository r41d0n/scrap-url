//Utils
import {
    getNewState
} from '../../../lib/utils/frontend';

const initialState = {
    indexs: {},
    loading: false,
    error: {},
    clear: {}
};

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case 'SEARCH_NEW_INDEXS_SUCCESS':
            {
                console.log('Se ejecuto el SUCCESS', action);
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
        case 'SEARCH_NEW_INDEXS_START':
            {
                console.log('Se ejecuto el start', action);
                return getNewState(state, {
                    loading: true,
                    error: {},
                    indexs: {},
                    clear: {}
                });
            }
        case 'SEARCH_NEW_INDEXS_ERROR':
            {
                const {
                    payload: {
                        response = {}
                    }
                } = action;

                console.log('Se ejecuto el error', action);

                return getNewState(state, {
                    loading: false,
                    error: response,
                    indexs: {},
                    clear: {}
                });

            }
        case 'CLEAR_INDEXS_START':
            {
                return getNewState(state, {
                    loading: true,
                    error: {},
                    indexs: {},
                    clear: {}
                });
            }
        case 'CLEAR_INDEXS_SUCCESS':
            {
                const {
                    payload: {
                        response = {}
                    }
                } = action;

                console.log.log('clear success', action);
                return getNewState(state, {
                    loading: false,
                    clear: response,
                    indexs: {}
                });
            }
        case 'CLEAR_INDEXS_ERROR':
            {
                const {
                    payload: {
                        response = {}
                    }
                } = action;
                return getNewState(state, {
                    loading: false,
                    error: response,
                    indexs: {}
                });
            }
        default:
            return state;

    }
}