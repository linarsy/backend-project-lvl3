import cheerio from 'cheerio';
import { createRelativePath } from './utils.js';

const parseHTML = (data, pageURL, resourcePath) => {
  const $ = cheerio.load(data);
  const hrefs = [];

  const tags = [
    { tag: 'img', attr: 'src' },
    { tag: 'script', attr: 'src' },
    { tag: 'link', attr: 'href' },
  ];

  tags.map(({ tag, attr }) => (
    $(tag)
      .filter(function isURL() {
        return $(this).attr(attr) !== undefined;
      })
      .each(function parseURL() {
        const rawURL = $(this).attr(attr);
        const { href } = new URL(pageURL);
        const validURL = new URL(rawURL, href);
        const relativePath = createRelativePath(validURL, resourcePath);
        hrefs.push(validURL.href);
        $(this).attr(attr, relativePath);
      })
  ));

  return { html: $.html(), hrefs };
};

export default parseHTML;
