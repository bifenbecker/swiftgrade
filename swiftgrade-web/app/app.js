/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import './global-styles.scss';
import 'vault_4.0.0_enterprise/codebase/vault.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
import { Worker } from '@react-pdf-viewer/core';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./images/block.png';
import '!file-loader?name=[name].[ext]!./images/virtual_keyboard/a_subscript_b.svg';
import '!file-loader?name=[name].[ext]!./images/virtual_keyboard/a_superscript_2.svg';
import '!file-loader?name=[name].[ext]!./images/virtual_keyboard/a_superscript_b.svg';
import '!file-loader?name=[name].[ext]!./images/virtual_keyboard/backspace.svg';
import '!file-loader?name=[name].[ext]!./images/virtual_keyboard/sqrt_n.svg';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions

// import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

import store from './store';

const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <App />
          </Worker>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js'), import('intl/locale-data/jsonp/de.js')])) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
