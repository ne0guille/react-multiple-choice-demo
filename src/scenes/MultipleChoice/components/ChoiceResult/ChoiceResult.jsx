import React from 'react';
import PropTypes from 'prop-types';

function ChoiceResult(props) {
  return (
    <h3 className="choice-result">
      {`TOTAL SCORE: ${props.total}/${props.count} - ${(props.total / props.count) * 100}%`}      
    </h3>
  )
}

ChoiceResult.propTypes = {
  count: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired
};

export default ChoiceResult;