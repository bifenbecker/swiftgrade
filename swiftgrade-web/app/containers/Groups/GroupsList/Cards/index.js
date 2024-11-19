import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Grid, Tooltip, Button } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import { IconEmptyGroups, IconClosePopup, IconVideoPlayer } from 'components/Svgs';

import { LightenDarkenColor } from 'lighten-darken-color';
import _, { get as lodashGet } from 'lodash';
import { getCardIcon, cardStyle } from 'utils/helpers/groupsHelper';
import { isTeacher } from 'utils/helpers/usersHelper';
import { withStyles } from '@material-ui/core/styles';
import { BANNER_TUTORIAL_VIDEOS_LINK } from 'globalConstants';
import { HOW_TO_USE_MODAL_DATA } from '../constants';
import '../font/style.scss';

import GroupMenu from '../GroupMenu';
import messages from './messages';
import { styles } from './styles';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsHeight: null,
      innerHeight: window.innerHeight,
    };
  }

  changeInnerHeight = () => {
    this.setState({ innerHeight: window.innerHeight });
  };

  componentDidMount() {
    this.changeInnerHeight();
    this.changeCardsHeight();
    window.addEventListener('resize', this.changeInnerHeight);
  }

  componentDidUpdate() {
    this.changeCardsHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeInnerHeight);
  }

  changeCardsHeight = () => {
    const { user } = this.props;
    const { cardsHeight } = this.state;
    const cardsElement = document.getElementById('dashboard-cards');
    const newCardsHeight = lodashGet(cardsElement, 'clientHeight', null);
    if (isTeacher(user) && _.isInteger(newCardsHeight) && newCardsHeight !== cardsHeight) {
      this.setState({ cardsHeight: newCardsHeight });
    }
  };

  getStudentsCountDescription = count =>
    count === 1 ? (
      <FormattedMessage {...messages.studentCount} />
    ) : (
      <FormattedMessage {...messages.studentsCount} values={{ count }} />
    );

  openInNewTabVideosTutorial = () => window.open(BANNER_TUTORIAL_VIDEOS_LINK);

  renderTutorialVideosButton = () => {
    const { classes } = this.props;
    return (
      <div className={classes.tutorial_videos_link_wrapper}>
        <Tooltip
          position="top-start"
          title={
            <div className={classes.tutorial_videos_link_tooltip_wrapper}>
              <FormattedMessage {...messages.quickStartVideos} />
              <OpenInNew className={classes.tutorial_videos_link_tooltip_icon} />
            </div>
          }
        >
          <Button className={classes.tutorial_videos_link_button} onClick={this.openInNewTabVideosTutorial}>
            <IconVideoPlayer className={classes.tutorial_videos_link_icon} />
          </Button>
        </Tooltip>
      </div>
    );
  };

  renderCard = (index, group) => {
    const { classes, user } = this.props;
    const { color, name, students_count: count, teacher_name: teacherName } = group;
    return (
      <Grid id={`groups-card-container-${index}`} container className={classes.card} style={cardStyle(color)}>
        <Grid item md={8} xs={8}>
          <div className={classes.card_title}>{name}</div>
          <div className={classes.card_description}>
            {isTeacher(user) ? this.getStudentsCountDescription(count) : teacherName}
          </div>
        </Grid>
        <Grid item md={4} xs={4} className={classes.card_icon_wrapper} style={{ color: LightenDarkenColor(color, 60) }}>
          {getCardIcon(classes, group)}
        </Grid>
      </Grid>
    );
  };

  renderHowToUseModal = () => {
    const { classes, user } = this.props;
    const { cardsHeight, innerHeight } = this.state;
    const isShowInstructions =
      user && user.role === 'teacher' && _.has(user, 'enabled_popups') && user.enabled_popups.how_to_use_swiftgrade;
    const availableHeight = innerHeight - 320;
    return isShowInstructions ? (
      <div className={classNames(classes.tutorial, { isFixed: cardsHeight < availableHeight })}>
        <div className={classes.tutorial_title}>
          <span className={classes.tutorial_head}>
            <h3>
              <FormattedMessage {...messages.useTitle} />
            </h3>
          </span>

          <Tooltip
            arrow
            placement="left"
            title={
              <div className={classes.tooltip_tutorial_close_wrapper}>
                <FormattedMessage {...messages.permanentlyClose} />
              </div>
            }
          >
            <span className={classes.tutorial_close}>
              <IconClosePopup onClick={this.props.onDoNotShowModal} />
            </span>
          </Tooltip>
        </div>
        <div className={classes.tutorial_description}>
          {HOW_TO_USE_MODAL_DATA.map(item => (
            <div className={classes.tutorial_link_wrapper}>
              <a className={classes.tutorial_link} href={item.path} target="_blank">
                <FormattedMessage {...item.message} />
              </a>
            </div>
          ))}
          {this.renderTutorialVideosButton()}
        </div>
      </div>
    ) : null;
  };

  render() {
    const { classes, groups, history, user } = this.props;
    const withFooterBanner = user && user.enabled_popups.how_to_use_swiftgrade;

    if (_.isArray(groups) && !_.isEmpty(groups)) {
      return (
        <div className={classes.cards_wrapper}>
          <Grid container spacing={6} className={classes.cards} id="dashboard-cards">
            {groups.map((group, i) => (
              <Grid item md={4} xs={12} className={classes.card_item}>
                <div style={{ position: 'relative' }}>
                  {isTeacher(user) && <GroupMenu group={group} user={user} onChange={this.props.onChange} />}
                  {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                  <div
                    onClick={() =>
                      history.push(`groups/${group.id}/${isTeacher(user) ? 'assessments' : 'assigned_assessments'}/`)
                    }
                  >
                    {this.renderCard(i, group)}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
          {this.renderHowToUseModal()}
        </div>
      );
    }

    return (
      <Grid container spacing={10} className={classNames(classes.empty_page, { withFooterBanner })}>
        <IconEmptyGroups className={classNames(classes.empty_page_icon, { withFooterBanner })} />
        {this.renderHowToUseModal()}
      </Grid>
    );
  }
}

Cards.propTypes = {
  classes: PropTypes.object,
  groups: PropTypes.array,
  history: PropTypes.object,
  onChange: PropTypes.func,
  user: PropTypes.object,
  onDoNotShowModal: PropTypes.func,
};

export default compose(
  withRouter,
  withStyles(styles),
)(Cards);
