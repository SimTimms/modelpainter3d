import stormBolter from './assets/stormBolter.jpg';
import sword from './assets/sword.jpg';
import assault from './assets/assault.jpg';
import flamer from './assets/flamer.jpg';
import head from './assets/head.jpg';
import helmet from './assets/helmet.jpg';
import cloak from './assets/cloak.jpg';
import ironHalo from './assets/ironhalo.jpg';
import shield from './assets/shield.jpg';
import flayer from './assets/reaper.jpg';
import reaper from './assets/flayer.jpg';

export const defaultState = {
  armR: { 0: 'boltgun', 1: 'flamer', 2: 'auto', 3: 'boltgun', 4: 'boltgun' },
  head: { 0: 'helmet', 1: 'helmet', 2: 'helmet', 3: 'helmet', 4: 'helmet' },
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
  head: { 0: '', 1: '', 2: '', 3: '', 4: '' },
  attachment: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  },
  ironCross: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  },
  shield: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  },
};

export const defaultSisterState = {
  armR: { 0: 'flayer', 1: 'reaper', 2: 'reaper', 3: 'reaper', 4: 'reaper' },
  head: { 0: '', 1: '', 2: '', 3: '', 4: '' },
  attachment: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  },
  ironCross: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  },
  shield: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  },
};

export const defaultTyranidState = {
  armR: { 0: '', 1: '', 2: '', 3: '', 4: '' },
  head: { 0: '', 1: '', 2: '', 3: '', 4: '' },
  attachment: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  },
  ironCross: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  },
  shield: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: '',
  },
};

export const attachmentOptions = [
  { name: 'armR', value: 'sword', title: 'Sword', img: sword },
  { name: 'armR', value: 'boltgun', title: 'Boltgun', img: stormBolter },
  { name: 'armR', value: 'auto', title: 'Assualt Cannon', img: assault },
  { name: 'armR', value: 'flamer', title: 'Flamer', img: flamer },
  {
    name: 'head',
    value: ['helmet', 'face'],
    title: 'Helmet',
    img: [helmet, head],
  },
  { name: 'attachment', value: ['cloak', ''], title: 'Cloak', img: cloak },
  {
    name: 'ironCross',
    value: ['ironCross', ''],
    title: 'Cross',
    img: ironHalo,
  },
  { name: 'shield', value: ['shield', ''], title: 'Plates', img: shield },
];

export const attachmentOptionsNecron = [
  { name: 'armR', value: 'flayer', title: 'Flayer', img: flayer },
  { name: 'armR', value: 'reaper', title: 'Reaper', img: reaper },
];

export const attachmentOptionsSister = [];
export const attachmentOptionsTyranid = [];
