import registerErrorMessageReducer from './registerErrorMessageReducer';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    registerErrorMessage: registerErrorMessageReducer,
});

export default allReducers;