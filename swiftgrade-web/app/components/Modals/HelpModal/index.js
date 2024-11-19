import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Selectors
import { makeSelectGroupColor } from 'containers/Groups/selectors';
// Actions
import { showModal, hideModal } from 'components/Modals/Modal/actions';

// Components
import Body from './Body';
import Title from './Title';

// Constants
import { GET_MODAL_ITEMS, FONT_SIZE_TEXT_VALUE } from './config';

// Styles
import { useStyles } from './styles';

/**
 * General modal window for Help icon
 * @param { type, title, customStyles, onClose } props
 * @returns {React.ReactElement} The HelpModal.
 */
const HelpModal = props => {
  const { groupColor, type, title, customStyles, onClose, top } = props;
  const classes = useStyles({ color: groupColor });
  const countItems = GET_MODAL_ITEMS(type, classes, {}).length;

  // Default height of modal window
  // FONT_SIZE_TEXT_VALUE - font size in rem
  // 2.7 - height of title
  // 2 - bottom additional space
  const defaultHeight = countItems * (FONT_SIZE_TEXT_VALUE + 1) + 4.7;
  const defaultWidth = '14rem';
  const defaultTop = top || '9rem';

  const defaultStylesPos = { top: defaultTop, right: '1rem', width: defaultWidth, height: `${defaultHeight}rem` };

  const handleCloseModal = () => {
    props.hideModal();
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  useEffect(() => {
    props.showModal({
      customBodyClass: customStyles.customBodyClass || classes.help_modal_body,
      customStyles:
        (customStyles.customPaperStyles && {
          ...customStyles.customPaperStyles,
          height: `${defaultHeight}rem`, // Calculate default height depends on count of tool items
          width: defaultWidth,
        }) ||
        defaultStylesPos,
      title: <Title message={title} onClose={handleCloseModal} />,
      body: <Body type={type} groupColor={groupColor} onCloseModal={handleCloseModal} />,
      onClose,
    });
  }, []);

  return <></>;
};

HelpModal.propTypes = {
  customStyles: PropTypes.object,
  groupColor: PropTypes.string,
  title: PropTypes.object,
  type: PropTypes.string,
  top: PropTypes.string,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  onClose: PropTypes.func,
};

HelpModal.defaultProps = {
  customStyles: {
    customBodyClass: null,
    customPaperStyles: null,
  },
  onClose: () => {},
};

const mapStateToProps = createStructuredSelector({
  groupColor: makeSelectGroupColor(),
});

const mapDispatchToProps = {
  showModal,
  hideModal,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HelpModal);
