import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/Controls';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { resetForm } from 'containers/App/actions';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { rebuildCollapseScans, rebuildExpendedStudentMarks } from 'utils/helpers/results/resultsHelper';
import { POPUP_SEND_EMAIL_RESULTS } from 'globalConstants';
import { getEnabledPopups } from 'utils/helpers/tutorialHelpers';
import { withStyles } from '@material-ui/core/styles';
import EmailSuccessForm from 'components/Forms/Assessments/EmailSuccessForm';

import { styles } from './styles';
import { ActionView } from '../Views';

import Header from './Header';
import ResultsTable from './ResultsTable';

import { FORM_MESSAGE } from './constants';
import messages from './messages';

class AssessmentResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseScans: [],
      expandedStudentMarks: [],
      isFirstLoading: true,
      scans: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isFirstLoading } = this.state;
    const { activeResultsData: activeData, data: results } = nextProps;
    const { data: prevAssessmentResults } = this.props;

    if (prevAssessmentResults !== results && _.isArray(results)) {
      let { collapseScans, expandedStudentMarks } = this.state;
      if (isFirstLoading && activeData && activeData.results) {
        collapseScans = activeData.results.collapseScans ? activeData.results.collapseScans : this.state.collapseScans;
        expandedStudentMarks = activeData.results.expandedStudentMarks
          ? activeData.results.expandedStudentMarks
          : this.state.expandedStudentMarks;
        this.setState({ isFirstLoading: false });
      }
      collapseScans = rebuildCollapseScans(collapseScans, results);
      expandedStudentMarks = rebuildExpendedStudentMarks(expandedStudentMarks, results);
      this.setState({ collapseScans, expandedStudentMarks });
    }
  }

  onChangeState = (key, value) => {
    this.setState({ [key]: value });
  };

  onChangeScans = (data, id = null, key = 'scans') => {
    const { data: results } = this.props;
    if (_.isNull(id)) {
      data = data.length === results.length ? [] : results.map(r => r.id);
    } else if (data.includes(id)) {
      data.splice(data.indexOf(id), 1);
    } else {
      data.push(id);
    }
    this.onChangeState(key, data);
    if (key === 'collapseScans') {
      this.props.setActiveResultsData('results', key, data);
    }
  };

  onHideSendEmailModal = () => {
    const { user } = this.props;
    const updatedEnabledPopups = { ...user.enabled_popups, [POPUP_SEND_EMAIL_RESULTS]: false };
    this.props.updateCurrentUserRequest({
      data: { enabled_popups: updatedEnabledPopups },
      userId: user.id,
    });
    this.props.hideModal();
  };

  onSendEmail = formData => {
    const showSuccessEmailSentModal = () => {
      this.props.showModal({
        customStyles: {
          width: 'inherit',
        },
        title: <FormattedMessage {...messages.emailSentSuccessTitle} />,
        body: <EmailSuccessForm hideModal={this.onHideSendEmailModal} />,
      });
    };

    const { user } = this.props;
    const { scans: ids } = this.state;
    const type = formData && formData.toJS ? formData.toJS().type : 'mark';
    const enabledPopups = getEnabledPopups(user);

    const handleSuccess = () => {
      this.setState({ scans: [] });
      this.props.onChangeIsEmailMsg();
      if (enabledPopups[POPUP_SEND_EMAIL_RESULTS]) {
        showSuccessEmailSentModal();
      } else {
        this.props.hideModal();
      }
    };
    this.props.onSendEmail({ ids, type }, handleSuccess);
  };

  onDeleteStudents = () => {
    const { scans } = this.state;
    const handleSuccess = () => {
      this.setState({ scans: [] });
    };
    this.props.hideModal();
    this.props.onDeleteStudents(scans, handleSuccess);
  };

  onEditStudentInfo = formData => {
    const { scans } = this.state;
    const handleSuccess = () => {
      this.setState({ scans: [] });
      this.props.hideModal();
    };
    return this.props.onUpdateResultStudentInfo(formData, scans[0], handleSuccess);
  };

  onCloseModal = () => {
    this.props.hideModal();
  };

  onAction = item => {
    const Form = item.form;
    const { assessment, data, classes } = this.props;
    const { scans } = this.state;
    const funcs = {
      edit: this.onEditStudentInfo,
      email: this.onSendEmail,
      remove: this.onDeleteStudents,
    };
    this.props.showModal({
      customStyles: item.key === 'edit' || item.key === 'preview' ? { top: 'auto' } : null,
      title: FORM_MESSAGE(item.key, scans, classes, this.onCloseModal),
      isCloseByOutClick: item.key === 'preview',
      body: (
        <Form
          type={assessment.type}
          group={assessment.group}
          results={data}
          scans={scans}
          assessment={assessment}
          onSubmit={funcs[item.key]}
          onCancel={() => {
            this.props.hideModal();
            this.props.resetForm(item.formName);
          }}
        />
      ),
    });
  };

  onDisplayStudentMarks = item => {
    const { expandedStudentMarks: currentExpandedStudentMarksState } = this.state;
    const expandedStudentMarks = _.cloneDeep(currentExpandedStudentMarksState);
    const id = `${item.assessment_item_id}_${item.id}`;
    if (expandedStudentMarks.includes(id)) {
      expandedStudentMarks.splice(expandedStudentMarks.indexOf(id), 1);
    } else {
      expandedStudentMarks.push(id);
    }
    this.setState({ expandedStudentMarks });
    this.props.setActiveResultsData('results', 'expandedStudentMarks', expandedStudentMarks);
  };

  renderAssessmentResults = (classes, group, color, results, scans) => {
    const { assessment, orderBy, size } = this.props;
    const { collapseScans, expandedStudentMarks } = this.state;
    return (
      <div className={classes.table_main_wrapper}>
        <ResultsTable
          assessment={assessment}
          collapseScans={collapseScans}
          color={color}
          data={results}
          expandedStudentMarks={expandedStudentMarks}
          group={group}
          orderBy={orderBy}
          scans={scans}
          size={size}
          onChangeOrdering={this.props.onChangeOrdering}
          onChangeScans={this.onChangeScans}
          onDisplayStudentMarks={this.onDisplayStudentMarks}
          onRemoveNeedGradingClick={this.props.onRemoveNeedGradingClick}
        />
      </div>
    );
  };

  renderHeader = (group, results) => {
    const { assessment, orderBy, isMobile } = this.props;
    const { collapseScans } = this.state;
    return (
      <Header
        assessment={assessment}
        collapseScans={collapseScans}
        group={group}
        orderBy={orderBy}
        results={results}
        isMobile={isMobile}
        getResults={this.props.getResults}
        onChangeScans={this.onChangeScans}
      />
    );
  };

  render() {
    const { assessment, classes, color, data, isMobile } = this.props;
    const { scans } = this.state;
    if (_.isNull(data) || (_.isObject(data) && data.isLoading)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }
    return (
      <Fragment>
        {this.renderHeader(assessment.group, data)}
        {this.renderAssessmentResults(classes, assessment.group, color, data, scans)}
        {!_.isEmpty(scans) && (
          <ActionView
            color={color}
            scans={scans}
            results={data}
            type={assessment.type}
            isMobile={isMobile}
            onAction={this.onAction}
            onChangeState={this.onChangeState}
          />
        )}
      </Fragment>
    );
  }
}

AssessmentResults.propTypes = {
  user: PropTypes.object,
  color: PropTypes.string,
  orderBy: PropTypes.string,
  data: PropTypes.array,
  activeResultsData: PropTypes.object,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  size: PropTypes.object,
  isMobile: PropTypes.bool,
  getResults: PropTypes.func,
  hideModal: PropTypes.func,
  onChangeOrdering: PropTypes.func,
  onDeleteStudents: PropTypes.func,
  onRemoveNeedGradingClick: PropTypes.func,
  onSendEmail: PropTypes.func,
  onUpdateResultStudentInfo: PropTypes.func,
  resetForm: PropTypes.func,
  setActiveResultsData: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  onChangeIsEmailMsg: PropTypes.func,
};

const mapDispatchToProps = {
  hideModal,
  resetForm,
  showModal,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(AssessmentResults);
