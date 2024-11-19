import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import { StudentAnswerView } from '../../Views';

function MostCommon(props) {
  const { classes, item, value } = props;
  return (
    <div className={classes.table_common_value}>
      {value.map(i => (
        <div className={classes.table_row}>
          <div className={classes.table_td}>
            <div className={classes.width_student_answer}>
              <StudentAnswerView item={{ kind: item.kind, marks: i.marks }} value={i.student_answer} isAnalysis />
            </div>
          </div>
          <div className={classes.table_td_progress}>
            <div className={classes.height_col} width="100%">
              <div className={classes.progress_bar} style={{ width: `${i.ratio}%` }}>
                <div className={classes.progress_value}>
                  <span className={classes.progress_count}>{i.count}</span>
                  <span className={classes.table_ratio}>({i.ratio})%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

MostCommon.propTypes = {
  value: PropTypes.array,
  classes: PropTypes.object,
  item: PropTypes.object,
};

export default compose(withStyles(styles))(MostCommon);
