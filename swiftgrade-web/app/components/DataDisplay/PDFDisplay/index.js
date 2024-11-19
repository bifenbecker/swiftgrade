import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Document, Page } from 'react-pdf';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

import './styles.scss';

class PDFDisplay extends Component {
  state = {
    page: 1,
    pages: null,
  };

  onChangePage = key => {
    let { page } = this.state;

    if (key === 'next') {
      page = this.hasNext() ? page + 1 : page;
    } else {
      page = this.hasPrev() ? page - 1 : page;
    }
    this.setState({ page });
  };

  hasNext = () => {
    const { page, pages } = this.state;
    return page < pages;
  };

  hasPrev = () => {
    const { page } = this.state;
    return page > 1;
  };

  onChangePages = ({ numPages }) => {
    this.setState({ pages: numPages });
  };

  onLoadSuccess = data => {
    const { onPDFLoaded } = this.props;
    this.onChangePages(data);

    if (onPDFLoaded) {
      onPDFLoaded();
    }
  };

  render() {
    const { classes, genericPreview, isLoading, selectedClasses, studentNamesIncluded, url } = this.props;
    const { page, pages } = this.state;
    return (
      <Fragment>
        {studentNamesIncluded && _.isEmpty(_.filter(selectedClasses, i => i.selected)) ? (
          <div className={classes.no_selected_title}>
            <FormattedMessage {...messages.noClassesSelected} />
          </div>
        ) : (
          <div>
            {genericPreview && (
              <div className={classes.pdf_title}>
                <FormattedMessage {...messages.preview} />
              </div>
            )}
            {!genericPreview && (
              <div className={classes.pagination}>
                <ChevronLeftIcon
                  className={pages === 1 ? classes.not_allowed : classes.allowed}
                  onClick={() => this.onChangePage('prev')}
                />
                <FormattedMessage {...messages.pageOfPages} values={{ page, pages }} />
                <ChevronRightIcon
                  className={pages === 1 ? classes.not_allowed : classes.allowed}
                  onClick={() => this.onChangePage('next')}
                />
              </div>
            )}
            {isLoading ? (
              <div className={classes.pdf_text}>
                <FormattedMessage {...messages.loadingPDF} />
                <div className={classes.takesTime}>
                  <FormattedMessage {...messages.takesTime} />
                </div>
              </div>
            ) : (
              <Document
                file={url}
                onLoadSuccess={this.onLoadSuccess}
                className={classes.document}
                loading={
                  <div className={classes.pdf_text}>
                    <FormattedMessage {...messages.loadingPDF} />
                    <div className={classes.takesTime}>
                      <FormattedMessage {...messages.takesTime} />
                    </div>
                  </div>
                }
                error={
                  <div className={classes.pdf_text}>
                    <FormattedMessage {...messages.errorPDF} />
                  </div>
                }
                noData={
                  <div className={classes.pdf_text}>
                    <FormattedMessage {...messages.noPDFData} />
                  </div>
                }
              >
                <Page pageNumber={page} className="react-pdf__Page" />
              </Document>
            )}
          </div>
        )}
      </Fragment>
    );
  }
}

PDFDisplay.propTypes = {
  classes: PropTypes.object,
  genericPreview: PropTypes.bool,
  isLoading: PropTypes.bool,
  onPDFLoaded: PropTypes.func,
  selectedClasses: PropTypes.array,
  studentNamesIncluded: PropTypes.bool,
  url: PropTypes.string,
};

PDFDisplay.defaultProps = {
  isLoading: false,
};

export default compose(withStyles(styles))(PDFDisplay);
