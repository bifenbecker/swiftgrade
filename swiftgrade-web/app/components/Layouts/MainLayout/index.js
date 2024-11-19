import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modals';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

function MainLayout(props) {
  const { children, location } = props;
  return (
    <div location={location}>
      {children}
      <Modal />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default compose(withRouter)(MainLayout);
