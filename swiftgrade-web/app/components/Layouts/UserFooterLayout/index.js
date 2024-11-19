import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IconLogoBottom } from 'components/Svgs';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

const FOOTER_ITEMS = [
  {
    key: 'company',
    message: <FormattedMessage {...messages.company} />,
    items: [
      { href: '#', key: 'terms_and_conditions', message: <FormattedMessage {...messages.termsAndConditions} /> },
      { href: '#', key: 'privacy_policy', message: <FormattedMessage {...messages.privacyPolicy} /> },
    ],
  },
  {
    key: 'product',
    message: <FormattedMessage {...messages.product} />,
    items: [
      { href: '#howitworks', key: 'how_it_works', message: <FormattedMessage {...messages.howItWorks} /> },
      { href: '#answerTypes', key: 'answer_types', message: <FormattedMessage {...messages.answerTypes} /> },
      { href: '#benefits', key: 'benefits', message: <FormattedMessage {...messages.benefits} /> },
    ],
  },
  {
    key: 'contact',
    message: <FormattedMessage {...messages.contact} />,
    items: [{ href: 'mailto:hello@goswiftgrade.com', key: 'terms_and_conditions', message: 'hello@goswiftgrade.com' }],
  },
];

function UserFooterLayout(props) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_container}>
        <div className={classes.footer_logo}>
          <a href="#">
            <IconLogoBottom style={{ width: 81, height: 97 }} />
            <span>
              <FormattedMessage {...messages.swiftGrade} />
            </span>
          </a>
          <p className={classes.copy}>
            <FormattedMessage {...messages.copyright} />
          </p>
          <p className={classes.copy}>
            <FormattedMessage {...messages.educora} />
          </p>
        </div>
        <div className={classes.footer_menu}>
          {FOOTER_ITEMS.map(footerItem => (
            <div className={classes.footer_menu__item}>
              <h3>{footerItem.message}</h3>
              <ul className={classes.footer_menu__item_list}>
                {footerItem.items.map(subitem => (
                  <li key={subitem.key}>
                    <a href={subitem.href}>{subitem.message}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

UserFooterLayout.propTypes = {
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(UserFooterLayout);
