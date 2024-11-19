import React from 'react';
import PropTypes from 'prop-types';
import { CustomSelect } from 'components/Controls';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { formValueSelector } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { getToleranceOptions } from 'utils/helpers/assessments/getter';
import { styles } from './styles';
import { ARROW_STYLE, MOBILE_ARROW_STYLE } from './constants';

const MAPPING = {
  add: '^answers.numeric\\[(\\d+)\\].tolerance$',
  regular: '^assessment_items\\[(\\d+)\\].answers.numeric\\[(\\d+)\\].tolerance$',
};

class ToleranceField extends React.Component {
  state = {
    options: [],
  };

  componentDidMount() {
    const { answers, assessmentItems, setting } = this.props;
    const params = this.getParams();

    if (params.key === 'add') {
      this.setOptions(answers, params.index, setting);
    } else if (params.key === 'regular') {
      const item = assessmentItems.get(params.index);
      this.setOptions(item.get('answers'), params.subindex, item.get('setting'));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { answers, assessmentItems, setting } = nextProps;
    const params = this.getParams();

    if (params.key === 'add' && this.props.answers !== answers) {
      this.setOptions(answers, params.index, setting);
    } else if (
      params.key === 'regular' &&
      this.props.assessmentItems.get(params.index) !== assessmentItems.get(params.index)
    ) {
      const item = assessmentItems.get(params.index);
      this.setOptions(item.get('answers'), params.subindex, item.get('setting'));
    }
  }

  getParams = () => {
    const { input } = this.props;

    let params = {};
    Object.keys(MAPPING).map(key => {
      const matchUrl = input.name.match(MAPPING[key]);
      if (matchUrl && matchUrl[1]) {
        params = { key, index: Number(matchUrl[1]), subindex: matchUrl[2] ? Number(matchUrl[2]) : null };
      }
      return key;
    });
    return params;
  };

  onChange = value => {
    const { input } = this.props;
    input.onChange(value);
  };

  onOpen = () => {
    const { answers, assessmentItems, setting } = this.props;
    const params = this.getParams();

    if (params.key === 'add') {
      this.setOptions(answers, params.index, setting);
    } else if (params.key === 'regular') {
      const item = assessmentItems.get(params.index);
      this.setOptions(item.get('answers'), params.subindex, item.get('setting'));
    }
  };

  setOptions = (answers, index, setting) => {
    const answer = answers
      .get('numeric')
      .get(index)
      .toJS();
    const isSN = setting.get('numeric').includes('scientific_notation');
    const options = getToleranceOptions(answer, isSN);
    this.setState({ options });
  };

  render() {
    const { classes, input, meta, width, ...other } = this.props;
    const { options } = this.state;

    return (
      <CustomSelect
        iconStyle={width === 'xs' ? MOBILE_ARROW_STYLE : ARROW_STYLE}
        id={input.name}
        options={options}
        selectClasses={{ input: classes.tolerance_select }}
        value={input.value}
        onChange={this.onChange}
        onOpen={this.onOpen}
        {...other}
      />
    );
  }
}

ToleranceField.propTypes = {
  classes: PropTypes.any,
  index: PropTypes.number,
  answerIndex: PropTypes.number,
  answers: PropTypes.object,
  assessmentItems: PropTypes.object,
  setting: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  width: PropTypes.string,
  onChange: PropTypes.func,
};

const selector = formValueSelector('AssessmentForm');
const mapStateToProps = createStructuredSelector({
  answers: state => selector(state, 'answers'),
  setting: state => selector(state, 'setting'),
  assessmentItems: state => selector(state, 'assessment_items'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  withStyles(styles),
)(ToleranceField);
