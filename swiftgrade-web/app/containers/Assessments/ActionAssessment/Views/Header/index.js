import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AssessmentNameForm } from 'components/Forms';
import { AssessmentLayout } from 'components/Layouts';
import _ from 'lodash';
import { withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { styles } from './styles';

class Header extends Component {
  componentDidMount() {
    window.addEventListener('popstate', this.onPopState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onPopState);
  }

  onPopState = e => {
    if (_.isNull(this.props.assessment)) {
      this.props.hideModal();
    }
    window.history.pushState(null, null, window.location.pathname);
    e.preventDefault();

    const { group, history } = this.props;
    if (this.props.isDirty) {
      this.props.onBackButtonClick();
    } else {
      history.push(`/groups/${group.id}/assessments/`);
    }
  };

  getActionText = () => {
    const { assessment } = this.props;
    if (!_.isNull(assessment) && assessment.results_exist) {
      return <FormattedMessage {...messages.editAndRemark} />;
    }
    return <FormattedMessage {...messages.edit} />;
  };

  render() {
    const { assessment, classes, group, history, isDirty, isMobilePortrait, setTutorialModalVisibility } = this.props;
    const assessmentExists = !_.isNull(assessment);
    return (
      <AssessmentLayout
        isActionAssessment
        isDirty={isDirty}
        isMobilePortrait={isMobilePortrait}
        group={group}
        history={history}
        keyName="assessment"
        onBackButtonClick={this.props.onBackButtonClick}
        setTutorialModalVisibility={setTutorialModalVisibility}
      >
        <div className={classes.assessment_title}>
          {assessmentExists && <div className={classes.action_text}>{this.getActionText()}</div>}
          <AssessmentNameForm
            checkAssessmentName={this.props.checkAssessmentName}
            disabled={assessmentExists}
            isMobilePortrait={isMobilePortrait}
            name={_.has(assessment, 'name') ? assessment.name : null}
          />
        </div>
      </AssessmentLayout>
    );
  }
}

Header.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  checkAssessmentName: PropTypes.func,
  group: PropTypes.object,
  history: PropTypes.object,
  isDirty: PropTypes.bool,
  isMobilePortrait: PropTypes.bool,
  onBackButtonClick: PropTypes.func,
  hideModal: PropTypes.func,
  setTutorialModalVisibility: PropTypes.func,
};

Header.defaultProps = {
  assessment: null,
  checkAssessmentName: null,
  isDirty: false,
};

export default withStyles(styles)(Header);
