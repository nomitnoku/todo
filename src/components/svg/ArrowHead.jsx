import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({ width, stroke }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    viewBox="0 0 16 16"
  >
    <path
      fill="none"
      fillRule="evenodd"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6l4 4m4-4l-4 4"
    />
  </svg>

);

Svg.propTypes = {
  width: PropTypes.string.isRequired,
  stroke: PropTypes.string.isRequired,
};

export default Svg;
