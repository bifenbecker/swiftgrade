import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, SnackbarContent } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FormattedMessage } from 'react-intl';
import { IconButton } from 'components/Controls';
// import { VideoPlayer } from 'components/DataDisplay';
import { IconCopyCode } from 'components/Svgs';
import { APP_GOSWIFTGRADE_JOIN_LINK_TEXT } from 'globalConstants';
import messages from '../messages';

class StudentCodeModalBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  copyMessage = () => {
    this.setState({ isOpen: true });
    setTimeout(() => {
      this.setState({ isOpen: false });
    }, 3000);
  };

  render() {
    const { classes, group, code } = this.props;
    const { isOpen } = this.state;

    return (
      <Grid container direction="column" className={classes.student_code_container}>
        <Grid item>
          <FormattedMessage
            {...messages.studentCodeDescription}
            values={{
              link: (
                <a href={`${process.env.HOST_URL}join/`} style={{ color: group.color }} target="_blank">
                  {APP_GOSWIFTGRADE_JOIN_LINK_TEXT}
                </a>
              ),
            }}
          />
        </Grid>
        <Grid container direction="row" alignItems="center" justify="center" className={classes.student_code}>
          <div className={classes.code_item}>{code}</div>
          <CopyToClipboard text={code} className={classes.copy_button}>
            <IconButton
              className={classes.copy_icon}
              onClick={this.copyMessage}
              backgroundColor="transparent"
              icon={
                <span className={classes.copy_container} style={{ color: group.color }}>
                  <IconCopyCode style={{ height: 30 }} />
                  <div className={classes.copy_code_text}>
                    <FormattedMessage {...messages.studentCopyCode} />
                  </div>
                </span>
              }
            />
          </CopyToClipboard>

          {isOpen && (
            <Fragment>
              <SnackbarContent message="Code copied." className={classes.copy_popup} />
            </Fragment>
          )}
        </Grid>
      </Grid>
    );
  }
}

StudentCodeModalBody.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  code: PropTypes.string,
};

export default StudentCodeModalBody;
