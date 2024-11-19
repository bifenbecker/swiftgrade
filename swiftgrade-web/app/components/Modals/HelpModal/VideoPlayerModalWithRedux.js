import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Selectors
import { updateCurrentUserRequest } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';

// Components
import { hideModal, showModal } from 'components/Modals/Modal/actions';
import { VideoPlayerModal } from 'components/Modals';

/**
 * Additional layer for VideoPlayerModal from 'components/Modals' with connected Redux
 * and props user, hideModal, showModal and etc
 * @param {title, name, uuid, onFinishClick} props
 * @returns {React.ReactElement} The VideoPlayerModalWithRedux.
 */
const VideoPlayerModalWithRedux = props => (
  <VideoPlayerModal
    {...props}
    titleContent={
      <div>
        <FormattedMessage {...props.title} />
      </div>
    }
    onFinishClick={() => {
      props.onFinishClick();
      props.hideModal();
    }}
  />
);

/**
 * Prop Types
 */
VideoPlayerModalWithRedux.propTypes = {
  name: PropTypes.string,
  title: PropTypes.object,
  uuid: PropTypes.any,
  onFinishClick: PropTypes.func,
  user: PropTypes.object,
  updateCurrentUser: PropTypes.func,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
};

const mapDispatchToProps = {
  updateCurrentUser: updateCurrentUserRequest,
  hideModal,
  showModal,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VideoPlayerModalWithRedux);
