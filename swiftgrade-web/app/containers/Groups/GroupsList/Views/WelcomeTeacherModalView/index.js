import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { WelcomeToSGTeacher } from 'images';
import { MUButton } from 'components/Controls';
import { useImagePreloader } from 'utils/helpers/hooks';
import messages from './messages';
import { styles } from './styles';

const WelcomeTeacherModalView = props => {
  const { classes, onClick } = props;
  const { imagesPreloaded } = useImagePreloader([WelcomeToSGTeacher]);

  useEffect(() => {
    if (imagesPreloaded) {
      props.showModal({
        withoutTitle: true,
        customBodyClass: classes.welcome_modal_body,
        customBodyBorderClass: classes.welcome_modal_body_border,
        body: renderBody(),
      });
    }
  }, [imagesPreloaded]);

  const renderBody = () => (
    <div>
      <div>
        <img className={classes.welcome_to_sg_img} src={WelcomeToSGTeacher} alt="" />
      </div>
      <div className={classes.welcome_to_sg_text}>
        <span className={classes.welcome_to_sg_title}>
          <FormattedMessage {...messages.teacherDashboardWelcomeOne} />
        </span>
        <br />
        <br />
        <span>
          <FormattedMessage {...messages.teacherDashboardWelcomeTwo} />
        </span>
        <br />
        <br />
        <MUButton
          className={classes.welcome_to_sg_button}
          onClick={onClick}
          text={<FormattedMessage {...messages.letsGo} />}
        />
      </div>
    </div>
  );

  return <></>;
};

WelcomeTeacherModalView.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func,
  showModal: PropTypes.func,
};

export default withStyles(styles)(WelcomeTeacherModalView);
