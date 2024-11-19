import React from 'react';
import PropTypes from 'prop-types';
import RealtimeUpdate from 'containers/RealtimeUpdate';
import { GenericDownload } from 'containers/Generic';

export class GenericDownloadPage extends React.PureComponent {
  render() {
    const { history, location, match } = this.props;
    const { assessmentId, groupId } = match.params;
    return (
      <RealtimeUpdate location={location}>
        <GenericDownload assessmentId={assessmentId} groupId={groupId} history={history} />
      </RealtimeUpdate>
    );
  }
}

GenericDownloadPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default GenericDownloadPage;
