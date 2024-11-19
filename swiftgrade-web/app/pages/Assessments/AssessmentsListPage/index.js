import React from 'react';
import PropTypes from 'prop-types';
import RealtimeUpdate from 'containers/RealtimeUpdate';
import { DefaultAssessments } from 'containers/Assessments';
import { AssessmentsStudentsLayout, Layout } from 'components/Layouts';

export class AssessmentsListPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: '-created_at',
    };
  }

  onOrderByChange = orderBy => {
    this.setState({ orderBy });
  };

  render() {
    const { history, location, match } = this.props;
    const { groupId } = match.params;
    const { orderBy } = this.state;
    return (
      <RealtimeUpdate location={location} orderBy={orderBy}>
        <Layout>
          <AssessmentsStudentsLayout groupId={groupId} history={history} keyName="assessments">
            <DefaultAssessments
              groupId={groupId}
              history={history}
              location={location}
              orderBy={orderBy}
              onOrderByChange={this.onOrderByChange}
            />
          </AssessmentsStudentsLayout>
        </Layout>
      </RealtimeUpdate>
    );
  }
}

AssessmentsListPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default AssessmentsListPage;
