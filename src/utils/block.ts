import { shell } from 'electron';

const open = (blockNum: number) => {
  shell.openExternal(`https://press.one/explorer/blocks/${blockNum}`);
};

export default {
  open,
};
