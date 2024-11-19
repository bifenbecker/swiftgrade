import _ from 'lodash';

const GEN_OPTIONS = () => {
  const options = [];

  _.range(0, 201).map(item => {
    options.push({ label: String(item), value: String(item) });
    return item;
  });
  return options;
};

export const OPTIONS = GEN_OPTIONS();
