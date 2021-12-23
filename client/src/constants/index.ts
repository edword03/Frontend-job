export const scheduleOptions = [
  { id: 'fullDay', value: 'Полный день' },
  { id: 'shift', value: 'Сменный график' },
  { id: 'flexible', value: 'Гибкий график' },
  { id: 'remote', value: 'Удаленная работа' },
];

export const employment = [
  {
    id: 'full',
    value: 'Полная занятость',
  },
  {
    id: 'part',
    value: 'Частичная занятость',
  },
  {
    id: 'project',
    value: 'Проектная работа',
  },
  {
    id: 'probation',
    value: 'Стажировка',
  },
];

export const experience = [
  {
    id: 'noExperience',
    value: 'Нет опыта',
  },
  {
    id: 'between1And3',
    value: 'От 1 года до 3 лет',
  },
  {
    id: 'between3And6',
    value: 'От 3 до 6 лет',
  },
  {
    id: 'moreThan6',
    value: 'Более 6 лет',
  },
];

export const currency = [
  {
    code: 'RUR',
    abbr: 'руб.',
    name: 'Рубли',
    default: true,
    rate: 1.0,
    in_use: true,
  },
  {
    code: 'EUR',
    abbr: 'EUR',
    name: 'Евро',
    default: false,
    rate: 0.011959,
    in_use: true,
  },
  {
    code: 'USD',
    abbr: 'USD',
    name: 'Доллары',
    default: false,
    rate: 0.01346,
    in_use: true,
  },
  {
    code: 'BYR',
    abbr: 'бел. руб.',
    name: 'Белорусские рубли',
    default: false,
    rate: 0.034161,
    in_use: false,
  },
  {
    code: 'KZT',
    abbr: 'KZT',
    name: 'Тенге',
    default: false,
    rate: 5.912926,
    in_use: false,
  },
  {
    code: 'UAH',
    abbr: 'грн.',
    name: 'Гривны',
    default: false,
    rate: 0.367052,
    in_use: false,
  },
];
