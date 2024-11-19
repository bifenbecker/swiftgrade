import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { DefaultButton } from 'components/Controls';
import { compose } from 'redux';
import { styles } from './styles';
import messages from './messages';

function GroupsDelete(props) {
  const { classes, group, onCancel } = props;
  return (
    <Fragment>
      <div className={classes.modal_text}>
        <FormattedMessage {...messages.deleteQuestion} />
        <br />
        <br />
        <FormattedMessage {...messages.deleteSentence} />
        <br />
      </div>
      <div className={classes.modal_buttons}>
        <div className={classes.modal_button}>
          <DefaultButton borderRadius={4} text={<FormattedMessage {...messages.cancel} />} onClick={() => onCancel()} />
        </div>
        <div>
          <DefaultButton
            text={<FormattedMessage {...messages.delete} />}
            backgroundColor={group.color}
            borderRadius={4}
            type="submit"
            onClick={() => props.onSubmit(group)}
          />
        </div>
      </div>
    </Fragment>
  );
}

GroupsDelete.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default compose(withStyles(styles))(GroupsDelete);
