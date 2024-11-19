import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DefaultButton } from 'components/Controls/index';
import { createStructuredSelector } from 'reselect';
import { getFormInitialValues, getFormValues } from 'redux-form/immutable';
import _ from 'lodash';
import { List } from 'immutable';

function RemoteSubmitButton(props) {
  const {
    backgroundColor,
    borderRadius,
    buttonWrapperClassName,
    initialValues,
    formValues,
    formName,
    className,
    text,
  } = props;

  const getDisabledValue = form => {
    if (form === 'ProfileForm') {
      return (
        formValues &&
        initialValues &&
        (!formValues.every(
          value => !_.isEmpty(value) && value !== 'empty' && !(List.isList(value) && value.isEmpty()),
        ) ||
          initialValues.equals(formValues))
      );
    }
    return false;
  };
  const disabled = getDisabledValue(formName);

  return (
    <div className={buttonWrapperClassName}>
      <DefaultButton
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        disabled={disabled}
        onClick={() => props.submitForm(formName)}
        text={text}
        className={classNames(className, { disabled })}
      />
    </div>
  );
}

RemoteSubmitButton.propTypes = {
  formValues: PropTypes.object,
  initialValues: PropTypes.object,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  buttonWrapperClassName: PropTypes.object,
  className: PropTypes.object,
  formName: PropTypes.string,
  text: PropTypes.any,
  submitForm: PropTypes.func,
};

RemoteSubmitButton.defaultProps = {
  formName: '',
};

const mapStateToProps = createStructuredSelector({
  initialValues: (state, ownProps) => getFormInitialValues(ownProps.formName)(state),
  formValues: (state, ownProps) => getFormValues(ownProps.formName)(state),
});
const mapDispatchToProps = dispatch => ({
  submitForm(formName) {
    dispatch(submit(formName));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withConnect(RemoteSubmitButton);
