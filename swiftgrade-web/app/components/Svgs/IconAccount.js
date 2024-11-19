import React from 'react';
import PropTypes from 'prop-types';

const IconAccount = props => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="980.000000pt"
    height="980.000000pt"
    viewBox="0 0 980.000000 980.000000"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <g transform="translate(0.000000,980.000000) scale(0.100000,-0.100000)" fill={props.color} stroke="none">
      <path
        d="M4565 9789 c-1523 -106 -2917 -924 -3761 -2209 -1007 -1533 -1072
  -3485 -169 -5085 428 -759 1094 -1425 1860 -1861 908 -516 1980 -726 3025
  -593 1640 208 3070 1242 3796 2744 245 508 395 1038 460 1630 25 225 25 745 0
  970 -65 588 -214 1120 -456 1622 -542 1124 -1485 2002 -2640 2456 -663 261
  -1404 375 -2115 326z m656 -329 c1140 -88 2154 -562 2949 -1376 730 -748 1168
  -1685 1280 -2739 6 -55 13 -206 17 -335 29 -1116 -353 -2198 -1079 -3057 -111
  -132 -338 -363 -478 -486 -1314 -1157 -3176 -1459 -4785 -777 -784 332 -1477
  895 -1972 1600 -683 973 -956 2176 -762 3355 199 1208 884 2291 1899 3002 667
  467 1449 747 2270 812 155 12 507 13 661 1z"
      />
      <path
        d="M4770 7874 c-409 -31 -739 -179 -1011 -454 -194 -196 -330 -448 -390
  -723 -25 -118 -35 -342 -20 -468 65 -558 455 -1035 1002 -1227 177 -62 272
  -77 499 -77 161 0 223 4 290 18 584 126 1028 543 1173 1102 40 156 50 250 44
  419 -10 272 -89 513 -245 745 -72 108 -241 284 -352 367 -146 109 -354 207
  -538 253 -131 33 -336 53 -452 45z"
      />
      <path
        d="M4040 4764 c-341 -52 -670 -197 -931 -410 -103 -84 -277 -270 -351
  -374 -142 -201 -252 -456 -305 -710 -24 -114 -27 -146 -27 -355 l-1 -230 33
  -67 c77 -157 261 -255 577 -307 179 -30 315 -40 695 -52 426 -14 2419 -6 2630
  10 492 37 749 110 890 251 107 106 130 209 111 487 -6 92 -20 213 -32 268
  -159 777 -793 1370 -1594 1490 -144 21 -1552 20 -1695 -1z"
      />
    </g>
  </svg>
);

IconAccount.propTypes = {
  color: PropTypes.string,
};

IconAccount.defaultProps = {
  // color: 'black',
};

export default IconAccount;
