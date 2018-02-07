import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

import './Answer.css';

function Answer(props) {
  return (
    <ListGroup>
      <ListGroupItem key={props.text} 
        className={`answer ${(props.result !== undefined) ? props.isCorrect ? 'answer--correct' : 'answer--incorrect' : '' }`}>
        <label>
          <input type="radio"
            id={props.text}
            value={props.text}
            onChange={props.onAnswerChecked}
            className="answer__input"
            name={`answerGroup-${props.questionId}`}
            onChange={e => props.onAnswerChecked(e, props.questionId)}
          />
          {props.text}
        </label>
      </ListGroupItem>
    </ListGroup>
  );
}

Answer.propTypes = {
  text: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  onAnswerChecked: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool,
  result: PropTypes.string
};

export default Answer;