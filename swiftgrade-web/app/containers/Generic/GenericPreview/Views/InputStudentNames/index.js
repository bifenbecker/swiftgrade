import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Tooltip, withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import { MUToggleButtonGroup } from 'components/Controls';
import { IconInfoQuestion } from 'components/Svgs';
import { GENERIC_PREVIEW_STUDENT_INFO_ID } from 'globalConstants';
import { TOGGLE_BUTTON_OPTIONS } from '../../config';
import { styles } from './styles';
import messages from '../../messages';

function InputStudentNames(props) {
  const { classes, studentNamesIncluded, onChangeStudentNamesIncluded } = props;
  const info = (
    <div>
      <FormattedMessage {...messages.infoTooltipOne} />
      <br />
      <br />
      <FormattedMessage {...messages.infoTooltipTwo} />
      <br />
      <br />
      <FormattedMessage {...messages.infoTooltipThree} />
    </div>
  );

  return (
    <Grid container className={classes.button_group_container}>
      <Grid item xs={12} sm={6} md={5}>
        <FormattedMessage {...messages.prefillStudentNames} />:
      </Grid>
      <Grid id={GENERIC_PREVIEW_STUDENT_INFO_ID} item xs={12} sm={6} md={7} className={classes.button_group}>
        <MUToggleButtonGroup
          size="small"
          onChange={(event, newValue) => onChangeStudentNamesIncluded(newValue)}
          value={studentNamesIncluded}
          options={TOGGLE_BUTTON_OPTIONS}
          toggleButtonRootClass={classes.toggle_button_root}
          tooltipMessage={
            studentNamesIncluded ? (
              <FormattedMessage {...messages.noStudentInfo} />
            ) : (
              <FormattedMessage {...messages.yesStudentInfo} />
            )
          }
        />
        <Tooltip title={info} placement="bottom" arrow>
          <div className={classes.info_icon_container}>
            <IconInfoQuestion className={classes.info_icon} />
          </div>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

InputStudentNames.propTypes = {
  classes: PropTypes.object,
  studentNamesIncluded: PropTypes.bool,
  onChangeStudentNamesIncluded: PropTypes.func,
};

export default compose(withStyles(styles))(InputStudentNames);
