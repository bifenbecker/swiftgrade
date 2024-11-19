import React from 'react';
import PropTypes from 'prop-types';

const IconDownloadResults = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    width="512.000000pt"
    height="512.000000pt"
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill={props.color} stroke="none">
      <path d="M2460 4668 c-25 -14 -58 -44 -75 -67 l-30 -43 -5 -1274 -5 -1274 -360 361 c-237 237 -374 367 -400 380 -172 81 -361 -95 -290 -269 22 -51 1124 -1156 1180 -1183 51 -24 119 -24 170 0 27 13 223 203 607 587 595 597 588 590 588 674 0 76 -50 154 -121 191 -49 25 -131 25 -184 0 -26 -13 -163 -143 -400 -380 l-360 -361 -5 1273 -5 1274 -27 39 c-44 62 -90 88 -167 92 -55 3 -74 -1 -111 -20z" />
      <path d="M590 1701 c-78 -25 -132 -75 -150 -139 -8 -25 -10 -194 -8 -518 l3 -481 27 -39 c15 -21 44 -50 65 -64 l37 -25 1996 0 1996 0 37 25 c21 14 50 43 65 64 l27 39 3 481 c2 324 0 493 -8 518 -42 143 -233 190 -348 84 -56 -50 -57 -53 -62 -436 l-5 -355 -1705 0 -1705 0 -5 355 c-5 383 -6 386 -62 436 -52 48 -143 73 -198 55z" />
    </g>
  </svg>
);

IconDownloadResults.propTypes = {
  color: PropTypes.string,
};

export default IconDownloadResults;
