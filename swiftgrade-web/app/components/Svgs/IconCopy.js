import React from 'react';
import PropTypes from 'prop-types';

const IconCopy = props => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="192.000000pt"
    height="192.000000pt"
    viewBox="0 0 192.000000 192.000000"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g transform="translate(0.000000,192.000000) scale(0.100000,-0.100000)" fill={props.color} stroke="none">
      <path
        d="M232 1820 c-18 -11 -41 -34 -52 -52 -19 -32 -20 -52 -20 -620 l0
  -588 80 0 80 0 0 560 0 560 480 0 480 0 0 80 0 80 -507 0 c-489 0 -509 -1
  -541 -20z"
      />
      <path
        d="M552 1500 c-18 -11 -41 -34 -52 -52 -19 -32 -20 -52 -20 -648 0 -596
  1 -616 20 -648 11 -18 34 -41 52 -52 32 -19 52 -20 528 -20 476 0 496 1 528
  20 18 11 41 34 52 52 19 32 20 52 20 648 0 596 -1 616 -20 648 -11 18 -34 41
  -52 52 -32 19 -52 20 -528 20 -476 0 -496 -1 -528 -20z m968 -700 l0 -560
  -440 0 -440 0 0 560 0 560 440 0 440 0 0 -560z"
      />
    </g>
  </svg>
);

IconCopy.propTypes = {
  color: PropTypes.string,
};

export default IconCopy;
