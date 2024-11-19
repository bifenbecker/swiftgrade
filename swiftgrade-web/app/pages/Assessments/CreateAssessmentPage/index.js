import React from 'react';
import PropTypes from 'prop-types';
import { CreateAssessment } from 'containers/Assessments';
import { Layout } from 'components/Layouts';

export class CreateAssessmentPage extends React.PureComponent {
  render() {
    const { history, location, match } = this.props;
    const { groupId } = match.params;
    return (
      <Layout>
        <CreateAssessment history={history} location={location} groupId={groupId} />
      </Layout>
    );
  }
}

CreateAssessmentPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default CreateAssessmentPage;
