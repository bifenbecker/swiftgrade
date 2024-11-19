import React from 'react';
import PropTypes from 'prop-types';
import { GenericPreview } from 'containers/Generic';

export class GenericPreviewPage extends React.PureComponent {
  render() {
    const { history } = this.props;
    return <GenericPreview history={history} />;
  }
}

GenericPreviewPage.propTypes = {
  history: PropTypes.object,
};

export default GenericPreviewPage;
