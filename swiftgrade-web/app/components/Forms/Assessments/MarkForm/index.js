import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { InputField } from 'components/Fields';
import _ from 'lodash';
import { getFilters, isMarkValid } from 'utils/helpers/results/resultsHelper';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateStudentMarkRequest } from 'containers/Assessments/config/actions';

class MarkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFreeToSelect: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { dirty, mark, change } = nextProps;
    if (!dirty && this.props.mark !== mark && mark === '') {
      change('mark', this.props.defaultMark);
    }
  }

  onChangeMark = (kind, value) => {
    const { assessment, markId, orderBy, tabKey, change } = this.props;

    return new Promise(() => {
      const handleSuccess = data => {
        change('mark', data.value);
      };
      this.props.updateStudentMarkRequest({
        assessment,
        data: { kind, value },
        filters: getFilters(this.props.filters),
        markId,
        ordering: orderBy,
        tabKey,
        handleSuccess,
      });
    });
  };

  onBlur = () => {
    const { change, defaultMark, kind, mark } = this.props;
    let value = _.isUndefined(mark) ? defaultMark : mark;
    value = !_.isNull(Number(value)) ? Number(value) : null;

    if (_.isNumber(value) && value !== defaultMark) {
      this.onChangeMark(kind, value);
    } else if (value === 0 && String(value) !== String(mark)) {
      change('mark', value);
    } else {
      change('mark', defaultMark);
    }
  };

  onPaste = e => {
    const { mark } = this.props;
    const pastedValue = e.clipboardData.getData('text');

    if (!isMarkValid(pastedValue, mark, e.target)) {
      e.preventDefault();
      return false;
    }
  };

  render() {
    const { classes, defaultMark, mark } = this.props;
    const { isFreeToSelect } = this.state;

    return (
      <form form={this.props.formId}>
        <Field
          style={{ width: mark.length > 1 ? 35 : 15 }}
          component={InputField}
          name="mark"
          defaultValue={defaultMark}
          customClasses={{ root: classes.mark_textfield, input: classes.mark_textfield_input }}
          onBlurCapture={() => this.setState({ isFreeToSelect: true })}
          onClick={e => {
            if (isFreeToSelect) {
              e.target.select();
              this.setState({ isFreeToSelect: false });
            }
          }}
          onKeyPress={e => {
            if (!isMarkValid(e.key, mark, e.target)) {
              e.preventDefault();
              return false;
            }
          }}
          onBlur={() => this.onBlur()}
          onPaste={e => this.onPaste(e)}
        />
      </form>
    );
  }
}

MarkForm.propTypes = {
  dirty: PropTypes.bool,
  formId: PropTypes.string,
  kind: PropTypes.string,
  mark: PropTypes.string,
  markId: PropTypes.string,
  orderBy: PropTypes.string,
  tabKey: PropTypes.string,
  defaultMark: PropTypes.number,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  filters: PropTypes.object,
  change: PropTypes.func,
  updateStudentMarkRequest: PropTypes.func,
};

const withForm = reduxForm({
  touchOnChange: true,
  enableReinitialize: true,
});

const mapStateToProps = (state, ownProps) => {
  const form = state.get('form') ? state.get('form').get(ownProps.formId) : null;
  const initialValues = { mark: String(ownProps.defaultMark) };

  return {
    initialValues,
    form: ownProps.formId,
    mark: form && form.get('values') ? form.get('values').get('mark') : '',
  };
};

const mapDispatchToProps = {
  updateStudentMarkRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withForm,
)(MarkForm);
