import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'components/Controls';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { IconSelecType } from 'components/Svgs';
import { UserHeaderLayout } from 'components/Layouts';
import { Typography } from '@material-ui/core';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { styles } from './styles';
import messages from './messages';

import { BUTTON_LABELS } from './constants';

class SelectType extends Component {
  goToPage = role => {
    const { history } = this.props;
    history.push(role === 'teacher' ? '/sign_up/' : '/join/');
  };

  render() {
    const { classes, history, intl } = this.props;
    const { formatMessage } = intl;
    return (
      <Fragment>
        <UserHeaderLayout history={history} />
        <div className={classes.create_account}>
          <IconSelecType style={{ maxWidth: 260, maxHeight: 218 }} className={classes.icon_create_account} />
          <Typography variant="h2" className={classes.create_account_title}>
            <FormattedMessage {...messages.createAnAccount} />
          </Typography>
          <div>
            {BUTTON_LABELS.map(data => {
              const label = formatMessage(data.message);
              return (
                <DefaultButton
                  text={label}
                  className={classNames(classes.type_btn, { teacher: data.value === 'teacher' })}
                  onClick={() => this.goToPage(data.value)}
                />
              );
            })}
          </div>
          <p className={classes.login_signup}>
            <FormattedMessage {...messages.alreadyHaveAnAccount} />
            <a role="button" onClick={() => history.push('/sign_in/')} tabIndex={0}>
              <FormattedMessage {...messages.logIn} />
            </a>
          </p>
        </div>
      </Fragment>
    );
  }
}

SelectType.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(SelectType);
