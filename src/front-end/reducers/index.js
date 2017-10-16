//Dependencies
import {
    combineReducers
} from 'redux';

// Apps Reducers
import search from '../components/Search/reducer';
import scrap from '../components/Scrap/reducer';

// Shared Reducers
// import device from './deviceReducer';

const rootReducer = combineReducers({
    search,
    scrap
});

export default rootReducer;
    
// device,