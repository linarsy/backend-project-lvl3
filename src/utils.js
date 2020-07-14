import path from 'path';

const normalize = (name) => {
  const regex = /[^a-zA-Z0-9]/gi;
  return name.replace(regex, '-');
};

export const createPagePath = (url, dirpath, ext) => {
  const { host, pathname } = new URL(url);
  const { root } = path.parse(pathname);
  const relativePath = path.relative(root, pathname);
  const pageName = `${normalize(host)}-${normalize(relativePath)}${ext}`;
  return path.resolve(dirpath, pageName);
};

const createFilename = (url) => {
  const { pathname } = new URL(url);
  const { root, dir, base } = path.parse(pathname);
  const relativePath = path.relative(root, dir);
  if (relativePath === '') return base;
  return `${normalize(relativePath)}-${base}`;
};

export const createResourcePath = (url, dirpath) => {
  const filename = createFilename(url);
  return path.resolve(dirpath, filename);
};

export const createRelativePath = (url, dirpath) => {
  const filename = createFilename(url);
  const { name } = path.parse(dirpath);
  return path.join(name, filename);
};
