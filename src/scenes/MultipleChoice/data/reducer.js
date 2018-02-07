import { Actions } from './actions';

const updateChoiceAnswer = (questions, payload) => {
  const index = questions.findIndex(m => m.id === payload.questionId);
  const question = questions[index];
  
  return [
    ...questions.slice(0, index),
    Object.assign({}, question, { answer: payload.answer }),
    ...questions.slice(index + 1)
  ];
};

export const choiceQuestionReducer = (questions = [], action) => {
  switch (action.type) {
    case Actions.SET_CHOICE_ANSWER:
      return updateChoiceAnswer(questions, action.payload);
    case Actions.CHOICE_REQUEST_SUCCESS:
      return Object.assign([], action.payload);
    default:
      return questions;
  }
};

export const choiceLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case Actions.CHOICE_REQUEST:
      return true;
    case Actions.CHOICE_REQUEST_SUCCESS:
    case Actions.CHOICE_REQUEST_ERROR:
      return false;
    default:
      return state;
  }
};

// export const choiceSaveReducer = (state = 0, action) => {
//   switch (action.type) {
//     case Actions.CHOICE_SAVE:
//       return 0;
//     case Actions.CHOICE_SAVE_SUCCESS:
//       return action.payload;
//     case Actions.CHOICE_SAVE_ERROR:
//       return action.payload;
//     default:
//       return state;
//   }
// };

export const choiceResultReducer = (state = { totalScore: 0, correctAnswers: [] }, action) => {
  switch (action.type) {
    case Actions.CHOICE_SAVE_SUCCESS:
      return action.payload;
    case Actions.CHOICE_SAVE_ERROR:
      return action.payload;
    default:
      return state;
  }
};