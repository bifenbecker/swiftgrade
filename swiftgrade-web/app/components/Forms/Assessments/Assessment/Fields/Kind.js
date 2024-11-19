import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Popper } from '@material-ui/core';
import { Field, change } from 'redux-form/immutable';
import { CustomSelectField } from 'components/Fields';
import _ from 'lodash';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { required } from 'utils/validations';
import { setAnswerAfterKindChanges } from 'utils/helpers/assessments';
import { setDesmos } from 'containers/Assessments/config/actions';
import { makeSelectDesmos } from 'containers/Assessments/config/selectors';

import { TYPES } from '../constants';

class Kind extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;

    if (this.props.value !== value && _.isFunction(this.props.recomputeRowHeights)) {
      this.props.recomputeRowHeights();
    }
  }

  onChange = newValue => {
    const { name, value: prevValue, changeFormValue, setFieldForFocus } = this.props;

    setFieldForFocus(null);

    if (!_.isEqual(prevValue, newValue)) {
      changeFormValue(name, newValue);
      setAnswerAfterKindChanges(newValue, prevValue, this.props);
    }
  };

  render() {
    const { classes, disabled, isAddRow, name, value, multipleSubAnswers, multipleWithSettingOn } = this.props;

    const popperSelect = props => <Popper {...props} className={classes.popper_select} placement="bottom-start" />;

    return (
      <Grid
        item
        xs={2}
        md={2}
        className={classNames(
          classes.assessment_item_type,
          value,
          { [classes.add_row_content]: isAddRow },
          { [classes.assessment_item_content]: !isAddRow },
          { multiple: multipleSubAnswers && !multipleWithSettingOn, multiple_with_setting: multipleWithSettingOn },
        )}
      >
        <Box width={{ xs: '100%', sm: '88%', md: '85%', lg: '80%' }}>
          <Field
            selectClasses={{ input: classes.assessment_item_type_input }}
            popperComponent={popperSelect}
            placeholder=""
            disabled={disabled}
            component={CustomSelectField}
            name={name}
            validate={[required]}
            options={TYPES}
            tabIndex={-1}
            onChange={v => this.onChange(v)}
            inputTypeItem="button"
            isBlurOnSelect
          />
        </Box>
      </Grid>
    );
  }
}

Kind.propTypes = {
  disabled: PropTypes.bool,
  isAddRow: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  classes: PropTypes.object,
  changeFormValue: PropTypes.func,
  recomputeRowHeights: PropTypes.func,
  setFieldForFocus: PropTypes.func,
  multipleSubAnswers: PropTypes.bool,
  multipleWithSettingOn: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  changeFormValue(name, value) {
    dispatch(change('AssessmentForm', name, value));
  },
  setDesmos(data) {
    dispatch(setDesmos(data));
  },
  setFieldForFocus(value) {
    dispatch(change('AssessmentForm', 'field_for_focus', value));
  },
});

const mapStateToProps = createStructuredSelector({
  desmos: makeSelectDesmos(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(Kind);
