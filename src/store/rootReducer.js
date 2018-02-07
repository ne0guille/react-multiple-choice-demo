import { combineReducers } from 'redux';

import { reducer as questions } from '../scenes/MultipleChoice/reducer';

const rootReducer = combineReducers({
    questions
});

export default rootReducer;
