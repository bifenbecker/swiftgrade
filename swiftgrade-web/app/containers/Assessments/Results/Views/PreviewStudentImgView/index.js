import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { DefaultButton, Loading } from 'components/Controls';

import {
  getFullScansForPreviewSuccess,
  getFullScansForPreviewRequest,
  getDownloadFullScansRequest,
} from 'containers/Assessments/config/actions';
import { makeSelectViewFullScans } from 'containers/Assessments/config/selectors';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { styles } from './styles';
import messages from './messages';
import './styles.scss';

class PreviewStudentImgView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentWillUnmount() {
    this.props.getFullScansForPreviewSuccess(null);
  }

  donwloadSingleImg = (assessment, result) => {
    const imageIndex = this.imageGallery.getCurrentIndex();
    const fileName = `${result.first_name || 'Blank'} ${result.last_name || 'Blank'} - ${
      assessment.name
    } pg.${imageIndex + 1}.jpeg`;
    return new Promise(() => {
      const handleSuccess = response => {
        const a = document.createElement('a');
        a.href = `data:image/png;base64,${response.data}`;
        a.download = fileName;
        a.click();
        this.setState({ loading: false });
      };
      const data = { page: imageIndex };
      this.props.getDownloadFullScansRequest({
        resultId: result.id,
        assessmentId: assessment.id,
        data,
        handleSuccess,
      });
      this.setState({ loading: true });
    });
  };

  downloadZip = (assessment, result) =>
    new Promise(() => {
      const handleSuccess = response => {
        const zip = new JSZip();
        const folder = zip.folder(`${assessment.name}`);

        response.data.forEach((image, idx) => {
          const fileName = `${result.first_name || 'Blank'} ${result.last_name || 'Blank'} - ${
            assessment.name
          } pg.${idx + 1}.jpeg`;
          folder.file(fileName, image, { base64: true });
        });

        zip.generateAsync({ type: 'blob' }).then(content => {
          FileSaver.saveAs(
            content,
            `${result.first_name || 'Blank'} ${result.last_name || 'Blank'} - ${assessment.name}.zip`,
          );
        });
        this.setState({ loading: false });
      };
      this.props.getDownloadFullScansRequest({
        resultId: result.id,
        assessmentId: assessment.id,
        handleSuccess,
      });
      this.setState({ loading: true });
    });

  renderLoadingButton = () => (
    <Button disabled>
      <Loading size={40} />
    </Button>
  );

  renderDownloadButton = result => {
    const { fullScans, group, assessment } = this.props;
    const { loading } = this.state;
    if (loading) {
      return this.renderLoadingButton();
    }
    return (
      <DefaultButton
        disabled={loading}
        borderRadius={4}
        backgroundColor={group.color}
        onClick={() => {
          if (fullScans.data.length > 1) {
            this.downloadZip(assessment, result);
          } else {
            this.donwloadSingleImg(assessment, result);
          }
        }}
        text={<FormattedMessage {...messages.download} />}
      />
    );
  };

  render() {
    const { classes, fullScans, assessment, scans, results } = this.props;
    const result = results.find(item => item.id === scans[0]);
    if (!fullScans) {
      this.props.getFullScansForPreviewRequest({ resultId: result.id, assessmentId: assessment.id });
      return null;
    }

    return (
      <div>
        <ImageGallery
          items={fullScans.data}
          showBullets={fullScans.data.length > 1}
          infinite={false}
          showPlayButton={false}
          showThumbnails={false}
          lazyLoad
          ref={i => {
            this.imageGallery = i;
          }}
        />
        <div className={classes.preview_buttons}>{this.renderDownloadButton(result)}</div>
      </div>
    );
  }
}

PreviewStudentImgView.propTypes = {
  classes: PropTypes.object,
  fullScans: PropTypes.object,
  group: PropTypes.string,
  assessment: PropTypes.object,
  scans: PropTypes.array,
  results: PropTypes.object,
  onCancel: PropTypes.func,
  getFullScansForPreviewRequest: PropTypes.func,
  getFullScansForPreviewSuccess: PropTypes.func,
  getDownloadFullScansRequest: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  fullScans: makeSelectViewFullScans(),
});

const mapDispatchToProps = {
  getFullScansForPreviewRequest,
  getFullScansForPreviewSuccess,
  getDownloadFullScansRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(PreviewStudentImgView);
