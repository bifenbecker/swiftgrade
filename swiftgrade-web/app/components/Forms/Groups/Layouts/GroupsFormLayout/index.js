import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MUButton } from 'components/Controls';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

const MESSAGES = {
  join: <FormattedMessage {...messages.join} />,
  create: <FormattedMessage {...messages.create} />,
};

class GroupsFormLayout extends React.Component {
  state = {
    width: window.innerWidth,
  };

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.onChangeOrientation);
  }

  componentDidMount() {
    window.addEventListener('orientationchange', this.onChangeOrientation);
  }

  onChangeOrientation = () => {
    this.setState({ width: window.innerHeight });
  };

  render() {
    const { classes, children, type, handleSubmit, onCancel, secondaryButtonStyles } = this.props;
    const { width } = this.state;
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        {React.cloneElement(children, { color: 'red', width })}
        <div className={classes.buttons}>
          <div className={classes.button}>
            <MUButton
              text={<FormattedMessage {...messages.cancel} />}
              onClick={onCancel}
              style={{ letterSpacing: 'normal', ...secondaryButtonStyles }}
            />
          </div>
          <div>
            <MUButton customColor="#285EF4" text={MESSAGES[type]} type="submit" />
          </div>
        </div>
      </form>
    );
  }
}

GroupsFormLayout.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.any,
  type: PropTypes.string,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  secondaryButtonStyles: PropTypes.object,
};

GroupsFormLayout.defaultProps = {
  icon: null,
  secondaryButtonStyles: {},
  type: 'create',
};

export default compose(withStyles(styles))(GroupsFormLayout);
