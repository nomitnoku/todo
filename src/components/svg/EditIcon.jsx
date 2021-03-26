import * as React from 'react';
import PropTypes from 'prop-types';

const EditIcon = (props) => {
  const {
    width, height, stroke,
  } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 12"
    >
      <path
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 1.5l2 2L3.5 9h-2V7L7 1.5h0zm-5.5 9h9"
      />
    </svg>
  );
};

EditIcon.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  stroke: PropTypes.string.isRequired,
};

export default EditIcon;
