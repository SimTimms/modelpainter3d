export const defaultState = {
  armR: { 0: 'boltgun', 1: 'flamer', 2: 'auto', 3: 'boltgun', 4: 'boltgun' },
  head: { 0: 'face', 1: 'helmet', 2: 'helmet', 3: 'helmet', 4: 'helmet' },
  attachment: {
    0: 'cloak',
    1: '',
    2: '',
    3: '',
    4: '',
  },
  ironCross: {
    0: 'ironCross',
    1: '',
    2: '',
    3: '',
    4: '',
  },
  shield: {
    0: 'shield',
    1: '',
    2: '',
    3: '',
    4: '',
  },
};
export const defaultNecronState = {
  armR: { 0: 'flayer', 1: 'reaper', 2: 'reaper', 3: 'reaper', 4: 'reaper' },
  head: { 0: 'face', 1: 'helmet', 2: 'helmet', 3: 'helmet', 4: 'helmet' },
  attachment: {
    0: 'cloak',
    1: '',
    2: '',
    3: '',
    4: '',
  },
  ironCross: {
    0: 'ironCross',
    1: '',
    2: '',
    3: '',
    4: '',
  },
  shield: {
    0: 'shield',
    1: '',
    2: '',
    3: '',
    4: '',
  },
};

export const attachmentOptions = [
  { name: 'armR', value: 'sword', title: 'Sword' },
  { name: 'armR', value: 'boltgun', title: 'Boltgun' },
  { name: 'armR', value: 'auto', title: 'Assualt Cannon' },
  { name: 'armR', value: 'flamer', title: 'Flamer' },
  { name: 'head', value: ['helmet', 'face'], title: 'Helmet' },
  { name: 'attachment', value: ['cloak', ''], title: 'Cloak' },
  { name: 'ironCross', value: ['ironCross', ''], title: 'Cross' },
  { name: 'shield', value: ['shield', ''], title: 'Plates' },
];
export const attachmentOptionsNecron = [
  { name: 'armR', value: 'flayer', title: 'Flayer' },
  { name: 'armR', value: 'reaper', title: 'Reaper' },
];
