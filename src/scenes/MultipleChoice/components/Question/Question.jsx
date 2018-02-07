import React from 'react';
import PropTypes from 'prop-types';

function Question(props) {
  return (
    <h3 className="question">
      {props.text}
    </h3>
  )
}

Question.propTypes = {
  text: PropTypes.string.isRequired
};

export default Question;