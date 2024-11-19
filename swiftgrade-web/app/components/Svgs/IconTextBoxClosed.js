import React from 'react';
import PropTypes from 'prop-types';

const IconTextBoxClosed = props => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="640.000000pt"
    height="640.000000pt"
    viewBox="0 0 640.000000 640.000000"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
      <path
        d="M3580 5650 l0 -190 280 0 280 0 2 -282 3 -283 185 0 185 0 3 283 2
        282 280 0 280 0 -2 188 -3 187 -747 3 -748 2 0 -190z"
      />
      <path
        d="M0 3200 l0 -1690 2070 0 2070 0 0 1690 0 1690 -2070 0 -2070 0 0
        -1690z"
        fill={props.color}
      />
      <path
        d="M4520 3200 l0 -1690 940 0 940 0 0 1690 0 1690 -940 0 -940 0 0
        -1690z"
        fill={props.color}
      />
      <path
        d="M4147 1504 c-4 -4 -7 -133 -7 -286 l0 -278 -280 0 -280 0 0 -190 0
        -190 748 2 747 3 3 188 2 187 -280 0 -280 0 -2 283 -3 282 -181 3 c-99 1 -183
        -1 -187 -4z"
      />
    </g>
  </svg>
);

IconTextBoxClosed.propTypes = {
  color: PropTypes.string,
};

export default IconTextBoxClosed;
