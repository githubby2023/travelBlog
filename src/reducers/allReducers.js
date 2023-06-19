import registerErrorMessageReducer from './registerErrorMessageReducer';
import UserReducer from './userReducer';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    registerErrorMessage: registerErrorMessageReducer,
    user: UserReducer,
});

export default allReducers;