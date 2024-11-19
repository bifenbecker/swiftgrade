import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';

import { MUCheckbox } from 'components/Controls';
import { styles } from './styles';
import messages from '../../messages';
import { COEFFICIENT } from '../../config';

class SelectClasses extends React.Component {
  renderClassCheckbox = (group, index) => {
    const { classes, intl, selectedClasses, onChangeCheckboxValue } = this.props;
    return (
      <div>
        <MUCheckbox
          id="generic"
          checked={selectedClasses[index].selected}
          disabled={selectedClasses[index].selectDisabled}
          label={group.name}
          tooltipMessage={
            selectedClasses[index].selectDisabled
              ? intl.formatMessage(messages.genericSheetPreviewClassesNoStudentsTooltip)
              : null
          }
          value={group.id}
          onChange={event => onChangeCheckboxValue(event.target.value, event.target.checked)}
          checkboxClasses={{
            checkbox: {
              root: `${classes.checkbox_root} ${selectedClasses[index].selected && 'option_checked'} ${selectedClasses[
                index
              ].selectDisabled && 'option_disabled'}`,
              checked: classes.checked_checkbox_root,
            },
            label: {
              root: `${classes.checkbox_label_root} ${selectedClasses[index].selectDisabled && 'option_disabled'}`,
              label: `${classes.checkbox_label} ${selectedClasses[index].selectDisabled && 'option_disabled'}`,
            },
          }}
        />
      </div>
    );
  };

  render() {
    const { classes, height, groups, studentNamesIncluded } = this.props;
    const coefficient = COEFFICIENT(height);

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        className={classes.select_classes_container}
      >
        <Grid item xs={12} sm={6} md={5} className={classes.select_classes_title}>
          <FormattedMessage {...messages.selectClasses} />
        </Grid>
        {studentNamesIncluded && groups.length > 0 && (
          <Grid
            item
            xs={12}
            sm={6}
            md={7}
            className={classes.select_classes_list}
            style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: height * coefficient }}
          >
            {groups.map((group, index) => this.renderClassCheckbox(group, index))}
          </Grid>
        )}
        {!studentNamesIncluded && (
          <Grid item xs={12} sm={6} md={7} className={classes.any_class_text} style={{ height: height * coefficient }}>
            <FormattedMessage {...messages.anyClassCompatible} />
          </Grid>
        )}
      </Grid>
    );
  }
}

SelectClasses.propTypes = {
  classes: PropTypes.object,
  groups: PropTypes.any,
  height: PropTypes.number,
  intl: PropTypes.object,
  selectedClasses: PropTypes.array,
  studentNamesIncluded: PropTypes.bool,
  onChangeCheckboxValue: PropTypes.func,
};

export default withStyles(styles)(SelectClasses);
