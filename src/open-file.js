import fs from 'fs/promises';
import path from 'path';

const openFile = (dir) => {
  const filePath = path.resolve(dir);
  fs.readFile(filePath, 'utf-8')
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
};

export default openFile;
