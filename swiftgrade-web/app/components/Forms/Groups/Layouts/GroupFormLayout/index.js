import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

const MESSAGES = {
  copy: <FormattedMessage {...messages.copy} />,
  rename: <FormattedMessage {...messages.rename} />,
};

function GroupFormLayout(props) {
  const { classes, children, group, invalid, type, handleSubmit, onCancel } = props;
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {children}
      <div className={classes.buttons}>
        <div className={classes.button}>
          <DefaultButton borderRadius={4} text={<FormattedMessage {...messages.cancel} />} onClick={onCancel} />
        </div>
        <div>
          <DefaultButton
            backgroundColor={group.color}
            borderRadius={4}
            disabled={invalid}
            text={MESSAGES[type]}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}

GroupFormLayout.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  classes: PropTypes.object,
  group: PropTypes.object,
  invalid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

GroupFormLayout.defaultProps = {
  type: 'copy',
};

export default compose(withStyles(styles))(GroupFormLayout);
