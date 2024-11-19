import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import _ from 'lodash';
import classNames from 'classnames';
import { Vault, i18n, message } from 'vault_4.0.0_enterprise';
import 'vault_4.0.0_enterprise/codebase/vault.css';
import 'vault_4.0.0_enterprise/codebase/vault.min.css';
import './styles.scss';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const VAULT = (headerParams, isDownload, mode, target, toolbar) => {
  const data = { mode, toolbar };
  if (isDownload) {
    data.downloadURL = '';
  } else {
    const params = { Authorization: localStorage.getItem('auth_token') };
    data.uploader = { headerParams: params, target };
  }
  return data;
};

const TRANSLATIONS = formatMessage => ({
  dragAndDrop: formatMessage(messages.dragAndDrop),
  or: null,
  filesOrFoldersHere: formatMessage(messages.filesOrFoldersHere),
});

class FileUploader extends React.Component {
  componentDidMount() {
    const { attachments, headerParams, isDownload, intl, mode, target, toolbar, disallowSubmit } = this.props;

    i18n.setLocale('vault', TRANSLATIONS(intl.formatMessage));
    this.vault = new Vault(this.el, VAULT(headerParams, isDownload, mode, target, toolbar));

    this.vault.events.on('BeforeAdd', item => {
      const isValid = this.onBeforeAdd(item);
      disallowSubmit();
      return isValid;
    });
    this.vault.events.on('UploadComplete', this.props.allowSubmit);
    this.vault.events.on('UploadFile', file => {
      this.onUploadFileSuccess(file);
      return file;
    });
    this.vault.events.on('BeforeRemove', file => {
      if (isDownload) {
        return false;
      }
      this.onRemoveFile(file);
      return true;
    });
    this.vault.events.on('removeAll', () => this.onRemoveFiles());
    this.vault.events.on('Cancel', this.onCancelFiles);

    if (isDownload && attachments) {
      this.vault.data.parse(attachments);
    }
  }

  componentWillUnmount() {
    this.vault.destructor();
  }

  getFilesSize = (sumOfUploadedFiles, file) => {
    if (['uploaded', 'queue'].includes(file.status)) {
      return sumOfUploadedFiles + file.size;
    }
    return sumOfUploadedFiles;
  };

  onBeforeAdd = item => {
    const { maxFilesSize, maxNumberOfFiles } = this.props;
    const { formatMessage } = this.props.intl;
    const totalUploadedFilesSize = this.vault.data.reduce(
      (sumOfUploadedFiles, file) => this.getFilesSize(sumOfUploadedFiles, file),
      0,
    );

    if (this.vault.data.getLength() >= maxNumberOfFiles) {
      message({ text: formatMessage(messages.maxFilesAmountReached), expire: 5000 });
      return false;
    }
    if (item.file.size + totalUploadedFilesSize > maxFilesSize) {
      message({
        css: 'max_files_size_message',
        expire: 5000,
        text: formatMessage(messages.maxFilesSizeReached),
      });
      return false;
    }
  };

  onRemoveFile = file => {
    if (file.status === 'uploaded') {
      const response = JSON.parse(file.request.response);
      return new Promise(() => {
        const handleSuccess = () => {
          const { attachments } = this.props;
          if (attachments.contains(response.id)) {
            const index = attachments.indexOf(response.id);
            const newAttachments = attachments.delete(index);
            this.props.setFormValue('attachments', newAttachments);
          }
        };
        const { assessment } = this.props;
        this.props.deleteAssessmentFileRequest({ assessmentId: assessment.id, fileId: response.id, handleSuccess });
      });
    }
  };

  onRemoveFiles = () => {
    const { isDownload } = this.props;
    if (isDownload) {
      return false;
    }
    return new Promise(() => {
      const handleSuccess = () => {
        this.props.setFormValue('attachments', List([]));
      };
      const { assessment, attachments } = this.props;
      this.props.deleteAssessmentFilesRequest({
        assessmentId: assessment.id,
        data: { files_ids: attachments.toArray() },
        handleSuccess,
      });
    });
  };

  onCancelFiles = () => {
    this.props.setKeySubmit('cancel');
    const failedFiles = this.vault.data.findAll(file => file.status === 'failed');
    failedFiles.forEach(file => this.vault.data.remove(file.id));
  };

  onUploadFileSuccess = file => {
    const { attachments } = this.props;
    const response = JSON.parse(file.request.response);
    if (!attachments.contains(response.id)) {
      const newAttachments = attachments.push(response.id);
      this.props.setFormValue('attachments', newAttachments);
    }
    this.vault.data.update(response.file_id, { link: response.url });
  };

  render() {
    const { className } = this.props;
    return (
      <div ref={el => (this.el = el)} className={classNames('widget-box', { [className]: !_.isNil(className) })} />
    );
  }
}

FileUploader.propTypes = {
  intl: intlShape.isRequired,
  attachments: PropTypes.any,
  toolbar: PropTypes.any,
  isDownload: PropTypes.bool,
  maxFilesSize: PropTypes.number,
  maxNumberOfFiles: PropTypes.number,
  className: PropTypes.string,
  mode: PropTypes.string,
  target: PropTypes.string,
  assessment: PropTypes.object,
  headerParams: PropTypes.object,
  deleteAssessmentFileRequest: PropTypes.func,
  deleteAssessmentFilesRequest: PropTypes.func,
  setFormValue: PropTypes.func,
  setKeySubmit: PropTypes.func,
  allowSubmit: PropTypes.func,
  disallowSubmit: PropTypes.func,
};

FileUploader.defaultProps = {
  attachments: [],
  className: null,
  deleteAssessmentFileRequest: null,
  deleteAssessmentFilesRequest: null,
  headerParams: { Authorization: localStorage.getItem('auth_token') },
  isDownload: false,
  maxFilesSize: 52428800,
  maxNumberOfFiles: 5,
  mode: 'list',
  setFormValue: null,
  toolbar: true,
};

export default injectIntl(FileUploader);
