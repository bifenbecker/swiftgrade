import Desmos from 'desmos';

import { DESMOS_OPTIONS } from './constants';

const getDesmos = () => {
  const elt = document.getElementById('desmos');
  return Desmos.GraphingCalculator(elt, DESMOS_OPTIONS);
};

export { getDesmos };
