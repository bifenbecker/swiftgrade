import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DefaultButton } from 'components/Controls';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import messages from './messages';
import { styles } from './styles';

function AssessmentValidationInfo(props) {
  const { classes, data, group, onClose, onCreate, action } = props;
  const msg = data.compare_by_characters;
  const createButtons = (
    <div className={classes.create_assessment_error_button}>
      <div className={classes.validation_info_buttons}>
        <DefaultButton
          className={classes.validation_info_button}
          text={<FormattedMessage {...messages.back} />}
          onClick={onClose}
        />
        <DefaultButton
          className={classes.validation_info_button}
          backgroundColor={group.color}
          text={<FormattedMessage {...messages.okay} />}
          onClick={() => onSelectType(true)}
        />
      </div>
    </div>
  );
  const editButton = (
    <div className={classes.validation_info_buttons}>
      <DefaultButton
        className={classes.validation_info_button}
        backgroundColor={group.color}
        text={<FormattedMessage {...messages.okay} />}
        onClick={onClose}
      />
    </div>
  );

  const selectedButton = action === 'edit' ? editButton : createButtons;
  const onSelectType = compareByCharacters => {
    const { formData } = props;
    onCreate(formData, '', compareByCharacters);
    props.onClose();
  };
  return (
    <div className={classes.create_validation_info}>
      <FormattedMessage {...messages.MFCouldNotBeValidatedBody} />
      <br />
      {msg}
      {selectedButton}
    </div>
  );
}

AssessmentValidationInfo.propTypes = {
  data: PropTypes.any,
  assessment: PropTypes.object,
  assessmentDetails: PropTypes.object,
  classes: PropTypes.object,
  group: PropTypes.object,
  formData: PropTypes.any,
  action: PropTypes.string,
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  setAssessmentDetails: PropTypes.func,
};

export default compose(withStyles(styles))(AssessmentValidationInfo);
