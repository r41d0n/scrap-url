// Constants
import {
    API
} from '../../constants/api';

//Utils
import {
    apiFetch
} from '../../../lib/utils/api';

class ScraphApi {
    static getNewIndex(query) {
        return apiFetch(API.Scrap.Indexs, {}, query);
    };
    static getClearIndex() {
        return apiFetch(API.Scrap.Clear);
    };

}

export default ScraphApi;