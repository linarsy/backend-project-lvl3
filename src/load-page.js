import axios from 'axios';
import fs from 'fs/promises';

import parseHTML from './parser.js';
import { createPagePath, createResourcePath } from './utils.js';

const loadPage = (url, outputDir) => {
  const dirpath = createPagePath(url, outputDir, '_files');
  const filepath = createPagePath(url, outputDir, '.html');

  fs.stat(dirpath)
    .then(() => console.error('такая папка уже есть'))
    .catch(() => fs.mkdir(dirpath));

  const promise = axios.get(url)
    .then(({ data }) => {
      const { html, hrefs } = parseHTML(data, url, dirpath);
      fs.writeFile(filepath, html);
      const promises = hrefs.map(axios.get);
      return Promise.all(promises);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });

  promise.then((contents) => {
    contents.map(({ config, data }) => {
      const resoursePath = createResourcePath(config.url, dirpath);
      return fs.writeFile(resoursePath, data);
    });
  });
};

export default loadPage;
