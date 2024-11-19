import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DefaultButton } from 'components/Controls';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import messages from './messages';

function ErrorsModalBody(props) {
  const { data, classes, color, onClick } = props;
  const scans = item => (
    <div>
      <li>
        {item.student ? (
          <FormattedMessage
            {...messages.processingErrorForStudent}
            values={{ id: item.id, name: `${item.student.first_name} ${item.student.last_name}` }}
          />
        ) : (
          <FormattedMessage {...messages.processingErrorForUnnamedStudent} values={{ id: item.id }} />
        )}
      </li>
    </div>
  );
  return (
    <Fragment>
      <Fragment>
        <div className={classes.description1}>
          <FormattedMessage {...messages.processingErrorsDescription1} />
        </div>
        <ul>{data.map(item => scans(item))}</ul>
        <div className={classes.description2}>
          <b>
            <FormattedMessage
              {...messages.processingErrorsDescription2}
              values={{ email: <a href={`mailto:${process.env.SUPPORT_EMAIL}`}>{process.env.SUPPORT_EMAIL}</a> }}
            />
          </b>
        </div>
        <br />
        <div>
          <FormattedMessage {...messages.processingErrorsDescription3} />
        </div>
      </Fragment>
      <div className={classes.okay_btn}>
        <DefaultButton
          backgroundColor={color}
          borderRadius={4}
          text={<FormattedMessage {...messages.okay} />}
          onClick={onClick}
        />
      </div>
    </Fragment>
  );
}

ErrorsModalBody.propTypes = {
  color: PropTypes.string,
  data: PropTypes.array,
  classes: PropTypes.object,
  onClick: PropTypes.func,
};

export default withStyles(styles)(ErrorsModalBody);
