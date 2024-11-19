import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Tooltip } from '@material-ui/core';
import { Field, FieldArray } from 'redux-form/immutable';
import { CustomSelectField } from 'components/Fields';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import classNames from 'classnames';
import { compose } from 'redux';
import { required } from 'utils/validations';
import { withStyles } from '@material-ui/core/styles';
import { MESSAGES } from './config';
import { MARKS } from '../constants';

import { styles } from './styles/marks';

import messages from './messages';

class Marks extends React.Component {
  isAnswer = setting => {
    const data = setting && setting.toJS ? setting.toJS() : [];
    return _.isEmpty(data) || _.isEqual(data, ['scientific_notation']) || _.isEqual(data, ['autocorrection']);
  };

  renderMarkField = (field, options, props) => (
    <Field
      customPoperClass={props.classes.marks_select}
      isLabel={false}
      component={CustomSelectField}
      disabled={props.disabled}
      name={`${field}.value`}
      options={options}
      placeholder=""
      iconStyle={{ color: 'rgba(0, 0, 0, 0.54)', width: 8, height: 8, marginRight: 2 }}
      selectClasses={{ input: props.classes.mark_select, root: props.classes.mark_root }}
      validate={[required]}
      tabIndex={-1}
      optionProps={{ actions: {}, classes: { option: props.classes.mark_option } }}
    />
  );

  renderMultipleMarks = (field, props, index, mark) => {
    const setting = props.setting && props.setting.toJS ? props.setting.toJS() : [];
    const data = mark && mark.toJS ? mark.toJS() : null;

    const isRender = data && (setting.includes(data.kind) || data.kind === 'answer');
    if (isRender) {
      return (
        <Grid item xs={12} sm={6} md={4} className={props.classes.multiple_mark}>
          <div className={props.classes.answer_kind}>{MESSAGES[data.kind]}</div>
          <div className={props.classes.answer_mark}>{this.renderMarkField(field, MARKS(data.kind), props)}</div>
        </Grid>
      );
    }
    return null;
  };

  renderAnswerMark = (field, props, mark) => {
    const data = mark && mark.toJS ? mark.toJS() : null;

    if (data && data.kind === 'answer') {
      const options = MARKS('answer');
      return this.renderMarkField(field, options, props);
    }
    return null;
  };

  renderMarks = props => {
    if (props.isAnswer) {
      return (
        <Fragment>
          {props.fields.map((field, index) => this.renderAnswerMark(field, props, props.marks.get(index)))}
        </Fragment>
      );
    }
    const score = props.marks.reduce(
      (s, x) => (x.get('kind') === 'answer' || props.setting.includes(x.get('kind')) ? s + x.get('value') : s),
      0,
    );
    return (
      <Grid container direction="column">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classNames(props.classes.marks_container, { multiple: props.multiple })}
        >
          <Grid item xs={12}>
            <Grid container direction="row" alignItems="center" justify="center">
              {props.fields.map((field, index) =>
                this.renderMultipleMarks(field, props, index, props.marks.get(index)),
              )}
            </Grid>
          </Grid>
          {props.multiple && (
            <Grid item xs={12} className={props.classes.max_score}>
              {score}
            </Grid>
          )}
        </Grid>
        {!props.multiple && (props.setting.includes('unit') || props.setting.includes('significant_figure')) && (
          <div className={props.classes.max_score_title}>
            <FormattedMessage {...messages.maxScore} values={{ score }} />
          </div>
        )}
      </Grid>
    );
  };

  renderTooltip = () => (
    <Tooltip title={<FormattedMessage {...messages.marks} />} arrow>
      {this.renderMarkFieldArray()}
    </Tooltip>
  );

  renderMarkFieldArray = () => {
    const { classes, isAddRow, name, marks, multiple, setting } = this.props;

    return (
      <div className={classNames(classes.answer_marks_wrapper, { isAddRow })}>
        <div className={classes.answer_marks}>
          <FieldArray
            classes={classes}
            component={this.renderMarks}
            isAnswer={this.isAnswer(setting)}
            marks={marks}
            multiple={multiple}
            name={name}
            setting={setting}
          />
        </div>
      </div>
    );
  };

  render() {
    const { isAddRow } = this.props;
    if (isAddRow) {
      return this.renderTooltip();
    }
    return this.renderMarkFieldArray();
  }
}

Marks.propTypes = {
  multiple: PropTypes.bool,
  name: PropTypes.string,
  width: PropTypes.string,
  classes: PropTypes.object,
  marks: PropTypes.object,
  setting: PropTypes.object,
  isAddRow: PropTypes.bool,
};

export default compose(withStyles(styles))(Marks);
