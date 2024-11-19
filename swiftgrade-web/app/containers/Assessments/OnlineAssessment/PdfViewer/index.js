import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormControl, Select } from '@material-ui/core';

import { Viewer } from '@react-pdf-viewer/core';
import { ScrollMode, scrollModePlugin } from '@react-pdf-viewer/scroll-mode';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { searchPlugin } from '@react-pdf-viewer/search';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

import IconArrow from 'components/Svgs/IconArrowDown';
import { useStyles } from './styles';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import '@react-pdf-viewer/scroll-mode/lib/styles/index.css';

const PdfViewer = ({ files, tab }) => {
  const [count, setCount] = useState(0);
  const classes = useStyles();

  const scrollModePluginInstance = scrollModePlugin({
    scrollMode: ScrollMode.Vertical,
  });

  const zoom = zoomPlugin();
  const rotate = rotatePlugin();
  const search = searchPlugin();
  const fullScreen = fullScreenPlugin();
  const pageNavigation = pageNavigationPlugin();
  const plugins = [rotate, zoom, fullScreen, search, pageNavigation, scrollModePluginInstance];

  const { ShowSearchPopoverButton } = search;
  const { CurrentPageInput, CurrentPageLabel } = pageNavigation;
  const { EnterFullScreenButton } = fullScreen;
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoom;
  const { RotateBackwardButton, RotateForwardButton } = rotate;

  const onSelect = event => setCount(event.target.value);

  const FileChooser = () => (
    <FormControl size="small">
      <Select
        native
        value={count}
        onChange={onSelect}
        IconComponent={IconArrow}
        classes={{ root: classes.select_root, icon: classes.select_icon }}
      >
        {files.map((file, index) => (
          <option value={index} key={index}>
            {file.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );

  const Toolbar = () => (
    <div className={classes.toolbar}>
      <div>
        <div>
          <CurrentPageInput />
          <CurrentPageLabel>{prop => <span>{`of ${prop.numberOfPages}`}</span>}</CurrentPageLabel>
        </div>
        <ShowSearchPopoverButton />
        <RotateBackwardButton />
        <RotateForwardButton />
        <EnterFullScreenButton />
      </div>
      <div>
        <ZoomOutButton />
        <div style={{ minWidth: '67px' }}>
          <ZoomPopover />
        </div>
        <ZoomInButton />
      </div>
      <div>
        <FileChooser />
      </div>
    </div>
  );
  return (
    <div className={tab === 0 ? classes.viewer : classes.full_viewer}>
      <Toolbar />
      <Viewer fileUrl={files[count].pdf_link || files[count].link} plugins={plugins} />
    </div>
  );
};

PdfViewer.propTypes = {
  files: PropTypes.array,
  tab: PropTypes.number,
};

export default PdfViewer;
