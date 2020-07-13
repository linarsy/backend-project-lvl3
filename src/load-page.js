import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const normilizeFileName = (name) => {
  const regex = /[^a-zA-Z0-9]/gi;
  return name.replace(regex, '-');
};

const createFilePath = (url, dir) => {
  const { host, pathname } = new URL(url);
  const fileName = `${normilizeFileName(host)}${normilizeFileName(pathname)}.html`;
  const dirName = path.resolve(dir);
  return path.join(dirName, fileName);
};

const loadPage = (url, dir) => {
  const filePath = createFilePath(url, dir);

  axios.get(url)
    .then(({ data }) => {
      fs.writeFile(filePath, data);
    })
    .then(() => {
      console.log('success');
      console.log(filePath);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

export default loadPage;
