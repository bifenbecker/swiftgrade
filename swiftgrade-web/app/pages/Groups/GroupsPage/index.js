import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'components/Layouts';
import { GroupsList, Logic } from 'containers/Groups';

export class GroupsPage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    const newLocation = location;
    const { pathname } = newLocation;
    if (pathname.includes('/teacher/')) {
      newLocation.pathname = pathname.replace(/\/teacher\/(new)?\/?/, '/');
    }
    if (pathname.includes('/student/')) {
      newLocation.pathname = pathname.replace(/\/student\/(new)?\/?/, '/');
    }
    return (
      <Layout>
        <Logic>
          <GroupsList history={history} location={newLocation} />
        </Logic>
      </Layout>
    );
  }
}

GroupsPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default GroupsPage;
