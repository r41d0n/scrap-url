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

}

export default ScraphApi;