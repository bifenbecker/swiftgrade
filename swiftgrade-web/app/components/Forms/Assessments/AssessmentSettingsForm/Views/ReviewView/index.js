import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames';
import { MUCheckbox, RadioGroup } from 'components/Controls';
import { IconNotReleaseResults, IconReleaseResults, IconAutoReleaseFiles } from 'components/Svgs';
import { CheckboxField } from 'components/Fields';
import { styles } from '../../styles';
import messages from '../../messages';
import { RELEASE_RESULTS_TYPES } from '../../const';

const THEME = color =>
  createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });

class ReviewView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  getCheckboxLabel = (classes, checked) => {
    const Icon = checked ? IconReleaseResults : IconNotReleaseResults;
    return (
      <Fragment>
        <FormattedMessage {...messages.releaseResults} />
        <Icon className={classNames(classes.release_results_icon, { checked })} />
      </Fragment>
    );
  };

  onChange = e => {
    const { setFormValue } = this.props;
    const { checked } = e.target;
    this.setState({ checked });
    setFormValue('release_results_type', checked ? 'mark' : null);
  };

  renderAutoReleaseAttachedFiles = classes => {
    const { attachments } = this.props;
    const label = (
      <div>
        <FormattedMessage {...messages.alsoReleaseAttachedFiles} />
        <IconAutoReleaseFiles className={classes.auto_release_files_icon} />
      </div>
    );
    return (
      <div className={classes.release_results_types}>
        <Field
          disabled={attachments.size === 0}
          name="is_auto_release_files_checked"
          checkboxClasses={{
            checkbox: { root: classes.attached_files_checkbox_root },
            label: { label: classes.checkbox_label, root: classes.attached_files_root },
          }}
          component={CheckboxField}
          label={label}
        />
      </div>
    );
  };

  renderCheckbox = (classes, checked) => (
    <MUCheckbox
      checkboxClasses={{ label: { label: classes.checkbox_label } }}
      checked={checked}
      label={this.getCheckboxLabel(classes, checked)}
      onChange={e => this.onChange(e)}
    />
  );

  renderReleaseResultsTypes = () => {
    const { classes, color } = this.props;
    return (
      <div className={classes.release_results_types}>
        <ThemeProvider theme={THEME(color)}>
          <Field
            name="release_results_type"
            component={RadioGroup}
            customClasses={{ root: classes.radio_btn_root, label: classes.radio_btn_label }}
            options={RELEASE_RESULTS_TYPES}
            size="small"
          />
        </ThemeProvider>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    return (
      <div className={classes.setting_block_container}>
        {this.renderCheckbox(classes, checked)}
        {checked && this.renderReleaseResultsTypes()}
        {checked && this.renderAutoReleaseAttachedFiles(classes)}
      </div>
    );
  }
}

ReviewView.propTypes = {
  attachments: PropTypes.any,
  classes: PropTypes.object,
  color: PropTypes.string,
  releaseResultsType: PropTypes.string,
  setFormValue: PropTypes.func,
};

export default withStyles(styles)(ReviewView);
