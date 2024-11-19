const basis = ['b', 'kb', 'mb', 'gb'];
function getBasis(size, current, asObj) {
  current = current || 0;
  if (size < 1024) {
    return asObj
      ? {
          size: size,
          metric: basis[current],
        }
      : size + basis[current];
  }
  return this.getBasis(Math.round(size / 1024), current + 1, asObj);
}

const filesData = [
  {
    size: 100000,
    name: 'index.php',
  },
  {
    size: 25555,
    name: 'index.js',
  },
  {
    size: 2555412,
    name: 'document.doc',
  },
  {
    size: 52555,
    name: 'documentation.pdf',
  },
  {
    size: 23555,
    name: 'archive.zip',
  },
  {
    size: 72555,
    name: 'prototype.psd',
  },
];

const filesDataWithPreview = [
  {
    name: 'moon.jpg',
    preview: '/backend/upload/previews/moon.jpg',
    size: 97200,
  },
  {
    name: 'logo.psd',
    size: 46100,
  },
];

const turnOnClassName = 'radio mdi mdi-radiobox-marked';
const turnOffClassName = 'radio mdi mdi-radiobox-blank';

function checkHref() {
  const { href } = window.location;
  if (href.slice(0, 4) !== 'http') {
    dhx.message({
      text:
        'Please open this page by http:// or https://<br>You can start a local server by typing<br><br>`npm install && npm start`<br><br>from the command line.',
      css: 'dhx-error',
    });
  }
}
document.addEventListener('DOMContentLoaded', checkHref);

function fileName(f) {
  return f.name || f.file.name;
}

function fileSize(f) {
  return f.size || f.file.size;
}
