import * as React from 'react';
import PropTypes from 'prop-types';
import { DotLoader } from 'react-spinners';

function Spinner(props) {
  const { isLoading } = props;

  return (
    <div className="sweet-loading">
      <DotLoader
        color={'#0099FF'}
        loading={isLoading}
      />
    </div>
  );
};

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Spinner;