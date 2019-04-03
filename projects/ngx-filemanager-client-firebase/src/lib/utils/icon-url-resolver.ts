import {guesser} from './file-icon-guesser';

export const getFileIcon = (filename: string) => {
  return '/assets/fileicons/' + guesser.getFileIconName(filename) + '.svg';
};
export const getFolderIcon = (filename: string) => {
  return '/assets/fileicons/' + guesser.getFolderIconName(filename) + '.svg';
};

