import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, withStyles, Tooltip, ClickAwayListener } from '@material-ui/core';
import classNames from 'classnames';
import { DefaultButton, Loading } from 'components/Controls';
import { get as lodashGet } from 'lodash';
import PropTypes from 'prop-types';
import { IconClosePopup } from 'components/Svgs';
import { DynamicDataSheetGrid } from 'react-datasheet-grid';
import { generatePassword } from 'utils/helpers/studentsHelper';
import { isValidUsername, isValidEmail } from 'utils/validations';
import {
  manuallyAddStudentsRequest,
  checkStudentUsernameRequest,
  getDownloadStudentLoginInfoRequest,
} from 'containers/Students/actions';
import { autoGenerateUsernameRequest } from 'containers/Users/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { onDownloadFile } from 'utils/helpers/results/resultsHelper';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/Users/saga';
import { AUTO_GENERATE_BUTTONS_ID, USER_NAME_OR_EMAIL_COLUMN_ID, FIRST_TABLE_ROW_ID } from 'globalConstants';
import { columns } from './columns';
import { contextMenu } from './config';

import 'react-datasheet-grid/dist/style.css';
import './styles.scss';

import messages from './messages';
import { styles } from './styles';

const INITIAL_ITEMS_AMOUNT = 5;
const ROW_OBJECT = { firstName: '', lastName: '', username: '', password: '' };
const INITIAL_STATE = new Array(INITIAL_ITEMS_AMOUNT).fill().map(() => ROW_OBJECT);

const EditableTable = props => {
  const { classes, group, setTutorialIsRunning, isMobile } = props;
  setTutorialIsRunning();

  const [tableData, setTableData] = useState(INITIAL_STATE);
  const [prevTableData] = useState(tableData);
  const [showErrors, setShowErrors] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [maxStudentsError, setMaxStudentsError] = useState(false);
  const [apiErrors, setApiErrors] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      document.getElementsByClassName('dsg-row')[1].id = FIRST_TABLE_ROW_ID;
      document.getElementsByClassName('dsg-cell dsg-cell-header')[3].id = USER_NAME_OR_EMAIL_COLUMN_ID;
    }, 1000);
  }, []);

  const getRowValues = rowData => ({
    firstName: lodashGet(rowData, 'firstName', null),
    lastName: lodashGet(rowData, 'lastName', null),
    username: lodashGet(rowData, 'username', null),
    password: lodashGet(rowData, 'password', null),
  });

  const isRowEmpty = rowData => {
    const { firstName, lastName, username, password } = getRowValues(rowData);
    return !firstName && !lastName && !username && !password;
  };

  const isAllRowsEmpty = () => {
    const isEmpty = tableData.every(rowData => {
      const { firstName, lastName, username, password } = getRowValues(rowData);
      if (firstName || lastName || username || password) return false;
      return true;
    });
    return isEmpty;
  };

  const isValidUsernameCell = (username, rowIndex, tooltipMsg = null) => {
    let duplicateUsernameCounter = 0;
    tableData.forEach(rowData => {
      const usernameCellValue = lodashGet(rowData, 'username', null);
      if (usernameCellValue === username) duplicateUsernameCounter += 1;
    });
    if (duplicateUsernameCounter > 1) {
      if (tooltipMsg)
        tooltipMsg.push(
          <FormattedMessage {...messages.duplicateUsernameOrEmail} values={{ rowIndex: rowIndex + 1 }} />,
        );
      return false;
    }
    const apiErrorMsg = lodashGet(apiErrors[rowIndex], 'username', null);
    if (apiErrorMsg) {
      if (tooltipMsg)
        tooltipMsg.push(
          <FormattedMessage {...messages.commonError} values={{ rowIndex: rowIndex + 1, error: apiErrorMsg }} />,
        );
      return false;
    }
    if (isValidUsername(username) || isValidEmail(username)) {
      return true;
    }
    if (tooltipMsg)
      tooltipMsg.push(<FormattedMessage {...messages.invalidEmailAddress} values={{ rowIndex: rowIndex + 1 }} />);
    return false;
  };

  const hasError = (rowData, rowIndex, columnId) => {
    if (!showErrors || !columnId) return false;
    if (isAllRowsEmpty() && rowIndex === 0) return true;
    if (isRowEmpty(rowData)) return false;
    const cellValue = lodashGet(rowData, columnId, null);
    if (!cellValue) return true;
    if (columnId === 'username') {
      return !isValidUsernameCell(cellValue, rowIndex);
    }
    return false;
  };

  const createStudents = () => {
    const data = [];
    const passwords = [];
    const emptyRows = [];
    tableData.forEach((rowData, rowIndex) => {
      if (!isRowEmpty(rowData)) {
        const { firstName, lastName, username, password } = getRowValues(rowData);
        passwords.push(password);
        data.push({
          first_name: firstName,
          last_name: lastName,
          username,
          password,
        });
      } else {
        emptyRows.push(rowIndex);
      }
    });
    return new Promise(() => {
      const handleErrors = response => {
        if (typeof response.errors === 'string') {
          setMaxStudentsError(true);
        } else {
          const errors = [];
          let j = 0;
          for (let i = 0; i < tableData.length; i += 1) {
            if (emptyRows.includes(i)) {
              errors.push({});
            } else {
              errors.push(response.errors[j]);
              j += 1;
            }
          }
          setMaxStudentsError(false);
          setApiErrors(errors);
        }
        setLoadingStudents(false);
      };

      const handleSuccess = response => {
        const { students } = response;
        const userIds = [];
        students.forEach(student => userIds.push(student.user_id));
        props.onOrderByChange('first_name');
        setLoadingStudents(false);
        showDownloadPasswordsModal(userIds, passwords);
      };
      const groupId = props.group.id;
      if (data.length) setLoadingStudents(true);
      props.manuallyAddStudentsRequest({ data, groupId, handleSuccess, handleErrors });
    });
  };

  const onDownloadPasswords = (userIds, passwords) => {
    props.setDownloadStudentLoginInfo(false);
    return new Promise(() => {
      const handleSuccess = loginInfo => {
        const fileName = `${group.name} Class - Student login info.xlsx`;
        onDownloadFile(loginInfo, fileName);
        props.hideModal();
      };
      const data = {
        user_ids: userIds,
        passwords,
      };
      props.getDownloadStudentLoginInfoRequest({ data, handleSuccess });
    });
  };

  const showDownloadPasswordsModal = (userIds, passwords) => {
    props.setDownloadStudentLoginInfo(true);
    props.showModal({
      customStyles: {
        top: 'auto',
      },
      title: <FormattedMessage {...messages.downloadStudentPasswordsTitle} />,
      body: (
        <div>
          <FormattedMessage {...messages.downloadStudentPasswordsRecommendOne} />
          <br />
          <br />
          <FormattedMessage {...messages.downloadStudentPasswordsRecommendTwo} />
          <br />
          <br />
          <Grid container item direction="row" style={{ justifyContent: 'flex-end' }}>
            <div style={{ marginRight: 20 }}>
              <DefaultButton
                borderRadius={4}
                onClick={() => {
                  props.hideModal();
                  props.setDownloadStudentLoginInfo(false);
                }}
                text={<FormattedMessage {...messages.skip} />}
              />
            </div>
            <DefaultButton
              backgroundColor={group.color}
              borderRadius={4}
              onClick={() => onDownloadPasswords(userIds, passwords)}
              text={<FormattedMessage {...messages.download} />}
            />
          </Grid>
        </div>
      ),
    });
  };

  const onAddStudents = () => {
    setShowErrors(true);
    createStudents();
  };

  const onClearAll = () => {
    setTableData(prevTableData);
    setShowErrors(false);
    setMaxStudentsError(false);
  };

  const onAutoGeneratePassword = () => {
    const passwordRowIndex = [];
    tableData.forEach((rowData, rowIndex) => {
      const { password } = getRowValues(rowData);
      if (!password) {
        passwordRowIndex.push(rowIndex);
      }
    });
    setTableData(
      tableData.map((rowData, rowIndex) =>
        passwordRowIndex.indexOf(rowIndex) >= 0 ? { ...rowData, password: generatePassword() } : rowData,
      ),
    );
  };

  const onAutoGenerateUsername = () =>
    new Promise(() => {
      const usernameRowIndex = [];
      tableData.forEach((rowData, rowIndex) => {
        const { username } = getRowValues(rowData);
        if (!username) {
          usernameRowIndex.push(rowIndex);
        }
      });
      const handleSuccess = response => {
        const { usernames } = response;
        let j = -1;
        setTableData(
          tableData.map((rowData, rowIndex) => {
            if (usernameRowIndex.indexOf(rowIndex) >= 0) {
              j += 1;
              return { ...rowData, username: usernames[j] };
            }

            return rowData;
          }),
        );

        setApiErrors(
          apiErrors.map((error, errorIndex) =>
            usernameRowIndex.indexOf(errorIndex) >= 0 ? { ...error, username: '' } : error,
          ),
        );
      };
      const quantity = usernameRowIndex.length;
      props.autoGenerateUsernameRequest({ quantity, handleSuccess });
    });

  const generateUsernameBtnDisabled = () => {
    const disabled = tableData.every(rowData => {
      const { username } = getRowValues(rowData);
      return username;
    });
    return disabled;
  };

  const generatePasswordBtnDisabled = () => {
    const disabled = tableData.every(rowData => {
      const { password } = getRowValues(rowData);
      return password;
    });
    return disabled;
  };

  const getErrorsMsg = () => {
    const tooltipMsg = [<FormattedMessage {...messages.emptyCells} />];
    let emptyCell = false;
    if (isAllRowsEmpty()) {
      return tooltipMsg;
    }
    tableData.forEach((rowData, rowIndex) => {
      const { firstName, lastName, username, password } = getRowValues(rowData);
      if ((!firstName || !lastName || !username || !password) && !emptyCell && !isRowEmpty(rowData)) {
        emptyCell = true;
      }
      if (username) {
        isValidUsernameCell(username, rowIndex, tooltipMsg);
      }
    });

    if (!emptyCell) tooltipMsg.shift();
    return tooltipMsg;
  };

  const viewErrors = () => {
    let tooltipMsg = getErrorsMsg();
    if (tooltipMsg.length) {
      if (tooltipMsg.length > 10) {
        const numberOfErrors = tooltipMsg.length;
        tooltipMsg = tooltipMsg.slice(0, 10);
        tooltipMsg.push(<FormattedMessage {...messages.moreErrors} values={{ numberOfErrors: numberOfErrors - 10 }} />);
      }
      return (
        <Grid container justify="center" className={classNames(classes.view_errors_wrapper, { isMobile })}>
          <ClickAwayListener onClickAway={() => setOpenTooltip(false)}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => setOpenTooltip(false)}
              open={openTooltip}
              arrow
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <React.Fragment>
                  {tooltipMsg.map(msg => (
                    <div className={classes.errors_body}>{msg}</div>
                  ))}
                </React.Fragment>
              }
            >
              <div
                role="button"
                tabIndex={0}
                className={classes.view_errors_popup_title}
                onClick={() => setOpenTooltip(true)}
              >
                <FormattedMessage {...messages.viewErrors} />
              </div>
            </Tooltip>
          </ClickAwayListener>
        </Grid>
      );
    }
  };

  const handleUsernameChange = cell => {
    const data = { username: lodashGet(tableData[cell.row], cell.colId, null) };
    return new Promise(() => {
      const handleErrors = response => {
        setApiErrors(
          apiErrors.map((error, errorIndex) =>
            errorIndex === cell.row ? { ...error, username: response.errors } : error,
          ),
        );
      };

      const handleSuccess = () => {
        setApiErrors(
          apiErrors.map((error, errorIndex) => (errorIndex === cell.row ? { ...error, username: '' } : error)),
        );
      };
      props.checkStudentUsernameRequest({ data, handleSuccess, handleErrors });
    });
  };

  return (
    <div style={loadingStudents ? { pointerEvents: 'none' } : null}>
      {loadingStudents && (
        <div className={classes.loading}>
          <Loading />
          <span className={classes.loading_text}>
            <FormattedMessage {...messages.addManuallyTableLoading} />
          </span>
        </div>
      )}
      <button className={classes.popup_close_icon} onClick={() => props.hideModal()} type="button">
        <IconClosePopup width={15} height={15} />
      </button>

      <div className={classes.add_students_table_title}>
        <FormattedMessage {...messages.addManuallyTableTypeOrPaste} />
      </div>

      {showErrors && viewErrors()}

      {maxStudentsError && (
        <div className={classes.max_students_error}>
          <FormattedMessage {...messages.maxStudentsError} />
        </div>
      )}

      <DynamicDataSheetGrid
        value={tableData}
        autoAddRow
        createRow={() => {
          if (showErrors) {
            apiErrors.push({});
            setApiErrors(apiErrors);
          }
          return ROW_OBJECT;
        }}
        contextMenuComponent={contextMenu(tableData)}
        onChange={setTableData}
        columns={columns}
        cellClassName={({ rowData, rowIndex, columnId }) =>
          hasError(rowData, rowIndex, columnId) ? classes.cell_error : null
        }
        onBlur={({ cell }) => {
          if (showErrors && cell.colId === 'username') {
            handleUsernameChange(cell);
          }
        }}
      />

      <Grid container item direction="row" className={classes.add_students_table_buttons}>
        <div id={AUTO_GENERATE_BUTTONS_ID} className={classes.add_students_table_buttons_left}>
          <DefaultButton
            text={<FormattedMessage {...messages.addManuallyTableAutoGenerateUsername} />}
            className={classes.table_text_btn}
            onClick={() => onAutoGenerateUsername()}
            disabled={generateUsernameBtnDisabled()}
          />
          <DefaultButton
            text={<FormattedMessage {...messages.addManuallyTableAutoGeneratePassword} />}
            className={classes.table_text_btn}
            onClick={() => onAutoGeneratePassword()}
            disabled={generatePasswordBtnDisabled()}
          />
        </div>
        <div className={classes.add_students_table_buttons_right}>
          <div style={{ marginRight: 20 }}>
            <DefaultButton
              borderRadius={4}
              onClick={() => onClearAll()}
              text={<FormattedMessage {...messages.clearAll} />}
            />
          </div>
          <DefaultButton
            backgroundColor={group.color}
            borderRadius={4}
            onClick={() => onAddStudents()}
            text={<FormattedMessage {...messages.addManuallyTableAddStudents} />}
          />
        </div>
      </Grid>
    </div>
  );
};

EditableTable.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  manuallyAddStudentsRequest: PropTypes.func,
  checkStudentUsernameRequest: PropTypes.func,
  getDownloadStudentLoginInfoRequest: PropTypes.func,
  autoGenerateUsernameRequest: PropTypes.func,
  onOrderByChange: PropTypes.func,
  setTutorialIsRunning: PropTypes.func,
  setDownloadStudentLoginInfo: PropTypes.func,
  isMobile: PropTypes.bool,
};

const mapDispatchToProps = {
  manuallyAddStudentsRequest,
  checkStudentUsernameRequest,
  getDownloadStudentLoginInfoRequest,
  autoGenerateUsernameRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withConnect,
  withSaga,
  withStyles(styles),
)(EditableTable);
