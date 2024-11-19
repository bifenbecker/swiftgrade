import React from 'react';
import PropTypes from 'prop-types';
import { BaseAssessmentResults } from 'containers/Assessments';
import { AssessmentResultsLayout, Layout } from 'components/Layouts';

export class AssessmentResultPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tutorialModalIsVisible: false,
    };
  }

  setTutorialModalVisibility = modalIsVisible => this.setState({ tutorialModalIsVisible: modalIsVisible });

  render() {
    const { history, location, match } = this.props;
    const { tutorialModalIsVisible } = this.state;
    const { assessmentId } = match.params;

    return (
      <Layout>
        <AssessmentResultsLayout
          assessmentId={assessmentId}
          history={history}
          location={location}
          setTutorialModalVisibility={this.setTutorialModalVisibility}
        >
          <BaseAssessmentResults
            setTutorialModalVisibility={this.setTutorialModalVisibility}
            tutorialModalIsVisible={tutorialModalIsVisible}
          />
        </AssessmentResultsLayout>
      </Layout>
    );
  }
}

AssessmentResultPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default AssessmentResultPage;
