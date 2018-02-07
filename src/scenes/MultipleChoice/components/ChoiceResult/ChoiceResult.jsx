import React from 'react';
import PropTypes from 'prop-types';

function ChoiceResult(props) {
  return (
    <p className="choice-result">
      {props.result}
    </p>
  )
}

ChoiceResult.propTypes = {
  result: PropTypes.string.isRequired,
  passed: PropTypes.bool.isRequired
};

export default ChoiceResult;