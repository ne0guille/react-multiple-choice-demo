import { mockedQuestions } from '../../../api/mockedQuestions';
import { choiceEvaluator } from '../../../api/choiceEvaluatorService';

export const Actions = {
    CHOICE_REQUEST: 'CHOICE_REQUEST',
    CHOICE_REQUEST_SUCCESS: 'CHOICE_REQUEST_SUCCESS',
    CHOICE_REQUEST_ERROR: 'CHOICE_REQUEST_ERROR',
    CHOICE_SAVE: 'CHOICE_SAVE',
    CHOICE_SAVE_SUCCESS: 'CHOICE_SAVE_SUCCESS',
    CHOICE_SAVE_ERROR: 'CHOICE_SAVE_ERROR',
    SET_CHOICE_ANSWER: 'SET_CHOICE_ANSWER'
};

function fetchChoiceRequest(choiceId) {
  return {
    type: Actions.CHOICE_REQUEST,
    choiceId
  };
}

function fetchChoiceSuccess(choiceId, payload) {
  return {
    type: Actions.CHOICE_REQUEST_SUCCESS,
    choiceId,
    payload,
  };
}

function fetchChoiceError() {
  return {
    type: Actions.CHOICE_REQUEST_ERROR
  };
}

function saveChoiceAction(answers) {
  return {
    type: Actions.CHOICE_SAVE,
    answers
  };
}

function saveChoiceSuccess(payload) {
  return {
    type: Actions.CHOICE_SAVE_SUCCESS,
    payload
  };
}

function saveChoiceError(error) {
  return {
    type: Actions.CHOICE_SAVE_ERROR,
    error
  };
}

export function setChoiceAnswer(answer, questionId) {
  return {
    type: Actions.SET_CHOICE_ANSWER,
    payload: {questionId, answer}
  };
}

const api = {
  getChoice: () => new Promise((resolve, reject) => resolve(mockedQuestions)),
  submitChoice: (answers) => new Promise((resolve, reject) => resolve(choiceEvaluator(answers))),
};

export function fetchChoice(choiceId) {
  return (dispatch) => {
    dispatch(fetchChoiceRequest(choiceId));
    return api.getChoice().then(json => {
      setTimeout(() => dispatch(fetchChoiceSuccess(choiceId, json)), 1000);
    });
  };
}

export function saveChoice(answers) {
  return (dispatch) => {
    dispatch(saveChoiceAction(answers));
    return api.submitChoice(answers).then(response => {
      const { totalScore, ...answerStatus } = response;
      setTimeout(() => dispatch(saveChoiceSuccess({status: answerStatus, totalScore: totalScore,  })), 1000);
    })
      .catch(err => saveChoiceError(err));
  };
}
