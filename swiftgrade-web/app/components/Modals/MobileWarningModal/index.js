import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MUButton } from 'components/Controls';
import messages from './messages';
import { styles } from './styles';

const MobileWarningModal = props => {
  const { classes, color } = props;

  useEffect(() => {
    renderWarningModal();
  }, []);

  const renderButton = () => (
    <div>
      <MUButton
        className={classes.warning_modal_btn}
        style={{ backgroundColor: color }}
        onClick={props.hideModal}
        text={<FormattedMessage {...messages.okay} />}
      />
    </div>
  );

  const renderWarningModal = () => {
    props.showModal({
      customStyles: {
        top: 'auto',
      },
      title: <FormattedMessage {...messages.useComputer} />,
      body: (
        <div>
          <div className={classes.first_mobile_msg}>
            <FormattedMessage {...messages.firstMobileWarningMessage} />
          </div>
          <br />
          <br />
          {renderButton()}
        </div>
      ),
    });
  };

  return <></>;
};

MobileWarningModal.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  learnMoreModal: PropTypes.any,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
};

export default withStyles(styles)(MobileWarningModal);
