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
import techMarineBackback from './assets/techMarineBackpack.png';
import backpack from './assets/backpack.png';

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

export const defaultPrimarisState = {
  armR: { 0: 'boltgun', 1: 'flamer', 2: 'flamer', 3: 'boltgun', 4: 'boltgun' },
  head: { 0: '', 1: '', 2: '', 3: '', 4: '' },
  backpack: {
    0: 'backpack',
    1: 'backpack',
    2: 'backpack',
    3: 'backpack',
    4: 'techmarine',
  },
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

export const attachmentOptionsEldar = [
  { name: 'armR', value: 'sword', title: 'Sword', img: flayer },
  { name: 'armR', value: 'gun', title: 'Gun', img: reaper },
];

export const attachmentOptionsPrimaris = [
  {
    name: 'ironCross',
    value: ['lense', ''],
    title: 'Lense',
    img: ironHalo,
  },
  {
    name: 'ironCross',
    value: ['helmetSkull', ''],
    title: 'Helmet Skull',
    img: ironHalo,
  },
  {
    name: 'backpack',
    value: 'techmarine',
    title: 'TM Backpack',
    img: techMarineBackback,
  },
  {
    name: 'backpack',
    value: 'backpack',
    title: 'Backpack',
    img: backpack,
  },
];

export const attachmentOptionsSister = [];
export const attachmentOptionsTyranid = [];
