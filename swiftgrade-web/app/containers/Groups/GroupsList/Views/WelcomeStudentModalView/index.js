import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { WelcomeToSgStudent } from 'images';
import { MUButton } from 'components/Controls';
import messages from './messages';
import { styles } from './styles';

const WelcomeStudentModalView = props => {
  const { classes, isMobile, onClick } = props;

  useEffect(() => {
    props.showModal({
      customStyles: {
        maxWidth: '600px',
        top: 'auto',
        width: isMobile ? '270px' : '40%',
        minWidth: isMobile ? 'unset' : '600px',
        borderRadius: 0,
      },
      customBodyClass: classes.welcome_modal_body,
      customBodyBorderClass: classes.welcome_modal_body_border,
      withoutTitle: true,
      body: isMobile ? renderMobileBody() : renderBody(),
    });
  }, []);

  const renderMobileBody = () => (
    <div className={classes.mobile_container}>
      <img className={classes.welcome_rocket_image} src={WelcomeToSgStudent} alt="" />
      <div className={classes.top_center_text}>
        <FormattedMessage {...messages.portalStudentsWelcomeOne} />
      </div>
      <div className={classes.bottom_center_text}>
        <FormattedMessage {...messages.portalStudentsWelcomeTwo} />
      </div>
      <div className={classes.bottom_center_button}>
        <MUButton
          className={classes.welcome_student_modal_button}
          onClick={onClick}
          text={<FormattedMessage {...messages.letsGo} />}
        />
      </div>
    </div>
  );

  const renderBody = () => (
    <div className={classes.container}>
      <div className={classes.welcome_rocket_img}>
        <img className={classes.welcome_rocket_image} src={WelcomeToSgStudent} alt="" />
      </div>
      <div className={classes.welcome_text}>
        <div className={classes.welcome_text_title}>
          <FormattedMessage {...messages.portalStudentsWelcomeOne} />
        </div>
        <div className={classes.welcome_text_body}>
          <FormattedMessage {...messages.portalStudentsWelcomeTwo} />
        </div>
        <MUButton
          className={classes.welcome_student_modal_button}
          onClick={onClick}
          text={<FormattedMessage {...messages.letsGo} />}
        />
      </div>
    </div>
  );

  return <></>;
};

WelcomeStudentModalView.propTypes = {
  classes: PropTypes.object,
  isMobile: PropTypes.func,
  onClick: PropTypes.func,
  showModal: PropTypes.func,
};

export default withStyles(styles)(WelcomeStudentModalView);
