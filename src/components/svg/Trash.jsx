import * as React from 'react';
import PropTypes from 'prop-types';

const Svg = (props) => {
  const {
    width, height, stroke,
  } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      style={{
        width,
        height,
      }}
    >
      <g
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          stroke={stroke}
        >
          <g>
            <g>
              <g>
                <path
                  d="M7 2h2c1.054 0 1.918.816 1.995 1.85L11 4h1v8c0 1.105-.895 2-2 2h0-4c-1.105 0-2-.895-2-2h0V4h1c0-1.105.895-2 2-2zM3 4h10M6.75 7v4m2.5-4v4"
                  transform="translate(-274 -396) translate(0 280) translate(16 112) translate(258 4)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

Svg.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  stroke: PropTypes.string.isRequired,
};

export default Svg;
