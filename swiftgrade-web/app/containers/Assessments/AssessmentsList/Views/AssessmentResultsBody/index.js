import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MUButton } from 'components/Controls';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

function AssessmentResultsBody(props) {
  const { classes, group } = props;
  return (
    <Fragment>
      <div className={classes.processing_modal_text}>
        <FormattedMessage {...messages.processingNotCompleteInfo} />
      </div>
      <div className={classes.processing_modal_button}>
        <MUButton text={<FormattedMessage {...messages.okay} />} customColor={group.color} onClick={props.hideModal} />
      </div>
    </Fragment>
  );
}

AssessmentResultsBody.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  hideModal: PropTypes.func,
};

export default compose(withStyles(styles))(AssessmentResultsBody);
