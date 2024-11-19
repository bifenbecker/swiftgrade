import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as MaterialTooltip } from '@material-ui/core';

function Tooltip(props) {
  const { content, title } = props;

  return <MaterialTooltip title={title}>{content}</MaterialTooltip>;
}

Tooltip.propTypes = {
  content: PropTypes.object,
  title: PropTypes.object,
};

export default Tooltip;
