import { combineReducers } from 'redux';

import { choiceQuestionReducer, choiceLoadingReducer, choiceResultReducer } from './data/reducer';

export const reducer = combineReducers({
  data: choiceQuestionReducer,
  isLoading: choiceLoadingReducer,
  result: choiceResultReducer,
});