import React from 'react';
import PropTypes from 'prop-types';
import { CustomSelect } from 'components/Controls';
import { InputBase } from '@material-ui/core';
import _ from 'lodash';
import { compose } from 'redux';
import { createStyles, withStyles } from '@material-ui/core/styles';

import { styles } from '../styles';

import { MULTIPLE_OPTIONS } from '../../constants';

const SelectInput = withStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: 'white',
      fontSize: 12,
      padding: '6px 8px 6px 2px',
      borderColor: 1,
      cursor: 'pointer',

      '&:focus': {
        borderRadius: 4,
        boxShadow: 'none',
        backgroundColor: 'white',
      },
      '&::selection': {
        background: 'transparent',
      },
      '&::placeholder': {
        color: '#00000',
        opacity: 1,
      },
    },
  }),
)(InputBase);

class MultipleSelectView extends React.Component {
  constructor() {
    super();

    this.state = {
      isMoved: false,
      multipleRows: [],
    };
  }

  onLeave = () => {
    this.setState({ multipleRows: [] });
  };

  onMove = () => {
    this.setState({ isMoved: true });
  };

  onPress = e => {
    const { assessmentItems } = this.props;
    const start = assessmentItems && assessmentItems.size ? assessmentItems.size : 0;
    const lastSelection = Number(e.currentTarget.getAttribute('value')) + 1;
    this.setState({ multipleRows: _.range(start + 1, lastSelection) });
  };

  onTouchEnd = () => {
    const { isMoved, multipleRows } = this.state;

    if (!isMoved) {
      this.props.addRows(multipleRows);
      this.setState({ multipleRows: [] });
    }
    this.setState({ isMoved: false });
  };

  render() {
    const { assessmentItems, classes, setStateData } = this.props;
    const { multipleRows } = this.state;
    return (
      <CustomSelect
        id="add-row-actions"
        multiple
        maxWidth
        isOpen
        isLabel={false}
        optionProps={{
          actions: {
            onMouseLeave: () => this.onLeave(),
            onMouseEnter: e => this.onPress(e),
            onTouchStart: e => this.onPress(e),
            onTouchEnd: () => this.onTouchEnd(),
            onTouchMove: () => this.onMove(),
          },
          classes: { option: classes.add_multiple_rows_options, paper: classes.paper },
        }}
        options={MULTIPLE_OPTIONS(assessmentItems)}
        selectInput={SelectInput}
        value={multipleRows}
        onChange={() => this.props.addRows(multipleRows)}
        onClose={() => {
          this.setState({ multipleRows: [] });
          setStateData({ isMultipleRows: false });
        }}
      />
    );
  }
}

MultipleSelectView.propTypes = {
  assessmentItems: PropTypes.object,
  classes: PropTypes.object,
  addRows: PropTypes.func,
  setStateData: PropTypes.func,
};

export default compose(withStyles(styles))(MultipleSelectView);
