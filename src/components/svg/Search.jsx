import React from 'react';
import PropTypes from 'prop-types';

const Svg = ({ fill, width }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17.8 17"
    style={{
      fill: 'none',
      stroke: fill,
      strokeWidth: '1.5px',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeMiterlimit: '10',
      width,
    }}
  >
    <g id="Search" transform="translate(1 1)">
      <ellipse id="Oval" className="st0" cx="6.3" cy="6" rx="6.3" ry="6" />
      <path id="Shape" className="st0" d="M15.4,14.6l-4.4-4.1" />
    </g>
  </svg>
);

Svg.propTypes = {
  fill: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default Svg;
