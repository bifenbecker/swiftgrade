import React from 'react';
import PropTypes from 'prop-types';
import { IconReadBook } from 'components/Svgs';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';

function TotalMarkView(props) {
  const { assessment, classes } = props;
  const color = assessment && assessment.group ? assessment.group.color : '#000';
  return (
    <div className={classes.read_book_image}>
      <IconReadBook className={classes.read_book_icon} color={color} />
    </div>
  );
}

TotalMarkView.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(TotalMarkView);
