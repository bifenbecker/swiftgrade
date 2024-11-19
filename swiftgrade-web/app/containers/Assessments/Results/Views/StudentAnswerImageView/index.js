import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { styles } from './styles';

class StudentAnswerImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {},
    };
  }

  getImageStyle = (item, value) => ({
    maxWidth: value.unit_url ? 300 : 400,
    maxHeight: item.correct_answer && item.correct_answer.height ? item.correct_answer.height * 35 : 40,
    border: value.answer_url && '1px solid black',
  });

  getUnitImageStyle = height => ({
    maxHeight: height || 40,
  });

  onImgLoad = e => {
    this.setState({
      dimensions: {
        height: e.target.offsetHeight,
      },
    });
  };

  render() {
    const { classes, item, value } = this.props;
    const isUnitExist = _.has(item, 'setting') && item.setting.includes('unit');
    const { height } = this.state.dimensions;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {value.answer_url && (
          <img
            className={classes.student_answer_image}
            onLoad={this.onImgLoad}
            style={this.getImageStyle(item, value)}
            src={value.answer_url}
            alt="answer"
          />
        )}
        {isUnitExist && value.unit_url && (
          <img
            className={classes.student_unit_image}
            style={this.getUnitImageStyle(height)}
            src={value.unit_url}
            alt="unit"
          />
        )}
      </div>
    );
  }
}

StudentAnswerImageView.propTypes = {
  classes: PropTypes.object,
  item: PropTypes.object,
  value: PropTypes.object,
};

export default compose(withStyles(styles))(StudentAnswerImageView);
