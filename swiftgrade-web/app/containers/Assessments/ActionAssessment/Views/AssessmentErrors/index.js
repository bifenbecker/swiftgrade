import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DefaultButton } from 'components/Controls';
import _ from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import messages from './messages';
import { styles } from './styles';

function AssessmentErrors(props) {
  const { assessmentDetails, classes, data, group, onClose, setAssessmentDetails } = props;
  const msg = _.has(data, 'name') ? data.name : data.answer;
  const updatedMessage =
    _.isArray(msg) && msg && msg.map(item => <div className={classes.assessment_error_item}>{item}</div>);

  return (
    <div className={classes.create_assessment_error}>
      {_.isArray(msg) ? updatedMessage : msg}
      <div className={classes.create_assessment_error_button}>
        <DefaultButton
          backgroundColor={group.color}
          text={<FormattedMessage {...messages.ok} />}
          onClick={() => {
            onClose();
            if (_.has(data, 'name')) {
              const details = assessmentDetails.set('scrollTo', 'top');
              setAssessmentDetails(details);
            }
          }}
        />
      </div>
    </div>
  );
}

AssessmentErrors.propTypes = {
  data: PropTypes.any,
  assessment: PropTypes.object,
  assessmentDetails: PropTypes.object,
  classes: PropTypes.object,
  group: PropTypes.object,
  onClose: PropTypes.func,
  setAssessmentDetails: PropTypes.func,
};

export default compose(withStyles(styles))(AssessmentErrors);
