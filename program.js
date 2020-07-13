import pkg from 'commander';
import { openFile, loadPage } from './src/index.js';

export default () => {
  const { Command } = pkg;
  const program = new Command();

  program
    .version('0.0.1')
    .description('downloading pages from the network');

  program
    .option('-o, --output <dir>', 'output directory [dir]', `${process.cwd()}`)
    .arguments('<url>')
    .action((url) => loadPage(url, program.output));

  program
    .command('open <source>')
    .action((source) => openFile(source));

  program.parse(process.argv);
};
