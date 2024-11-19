import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal as MaterialModal } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import _ from 'lodash';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import { hideModal } from './actions';
import { makeSelectModalData } from './selectors';
import reducer from './reducer';
import messages from './messages';
import { styles } from './styles';

const TITLES = (classes, type) =>
  ({
    error: (
      <Fragment>
        <FormattedMessage {...messages.error} />
      </Fragment>
    ),
    default: '',
  }[type]);

class Modal extends React.Component {
  getTitle = (classes, data) => {
    if (_.has(data, 'title')) {
      return data.title;
    }

    if (_.has(data, 'withoutTitle') && data.withoutTitle) {
      return null;
    }

    const type = _.get(data, 'type', 'default');
    return TITLES(classes, type);
  };

  render() {
    const { classes, data } = this.props;
    if (_.isNull(data)) {
      return null;
    }

    const { body, isCloseByOutClick } = data;

    const customStyles = _.has(data, 'customStyles') ? data.customStyles : null;
    const maxBodyHeight = _.has(data, 'maxBodyHeight') ? data.maxBodyHeight : false;
    const customBodyClass = _.has(data, 'customBodyClass') ? data.customBodyClass : null;
    const customBodyBorderClass = _.has(data, 'customBodyBorderClass') ? data.customBodyBorderClass : null;
    const title = this.getTitle(classes, data);
    const withBorder = _.has(data, 'withBorder') ? data.withBorder : true;
    const onClose = _.has(data, 'onClose') ? data.onClose : () => {};

    const onCloseCallback = () => {
      onClose();
      this.props.hideModal();
    };

    return (
      <MaterialModal
        open={!_.isNull(data)}
        className={classes.modal}
        disableAutoFocus
        onClose={() => isCloseByOutClick && onCloseCallback()} // Enables modal closing by out of modal click
      >
        <div className={classes.paper} style={customStyles}>
          {!_.isNull(title) && <div className={classes.title}>{title}</div>}
          {withBorder && <div className={classNames(classes.name_body_border, customBodyBorderClass)} />}
          <div className={classNames(classes.body, customBodyClass, { maxBodyHeight })}>{body}</div>
        </div>
      </MaterialModal>
    );
  }
}

Modal.propTypes = {
  data: PropTypes.any,
  classes: PropTypes.object.isRequired,
  hideModal: PropTypes.func,
};

const mapDispatchToProps = {
  hideModal,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectModalData(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'modal', reducer });

export default compose(
  withReducer,
  withConnect,
  withStyles(styles),
)(Modal);
