// Constants
import {
    API
} from '../../constants/api';

//Utils
import {
    apiFetch
} from '../../../lib/utils/api';

class SearchApi {
    static getPagesOcurrency(query) {
        return apiFetch(API.Search.Sitios, {}, query);
    };

}

export default SearchApi;