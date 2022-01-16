export const reformatRuntime = (runtime) => {
  let timeString;

  if (runtime < 60 ) {
    timeString = `${`${Math.trunc(runtime)}`.slice(-2)}m`;
  } else if (runtime < 1440) {
    timeString = `${`${Math.trunc(runtime / 60)}`.slice(-2)}h ${`${Math.trunc(runtime % 60)}`.slice(-2)}m`;
  } else {
    timeString = `${`${Math.trunc(runtime / 1440)}`.slice(-2)}d ${`${Math.trunc((runtime % 1440) / 60)}`.slice(-2)}h ${`${Math.trunc((runtime % 1440) % 60)}`.slice(-2)}m`;
  }

  return timeString;
};

export const formatDate = (date, str = 'yyyy/mm/dd h:m') => {
  const yyyy = `${date.getFullYear()}`;
  const mm = date.getMonth() >= 10 ? `${+date.getMonth() + 1}` : `0${+date.getMonth() + 1}`;
  const dd = date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`;
  const m = date.getMinutes() >= 10 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
  const h = date.getHours() >= 10 ? `${date.getHours()}` : `0${date.getHours()}`;
  const s = date.getSeconds() >= 10 ? `${date.getSeconds()}` : `0${date.getSeconds()}`;

  str = str.includes('yyyy') ? str.replace('yyyy', yyyy) : str;
  str = str.includes('mm') ? str.replace('mm', mm) : str;
  str = str.includes('dd') ? str.replace('dd', dd) : str;
  str = str.includes('m') ? str.replace('m', m) : str;
  str = str.includes('h') ? str.replace('h', h) : str;
  str = str.includes('s') ? str.replace('s', s) : str;

  return str;
};

// Compare functions in arr.sort(foo)
const getWeightForNull = (A, B) => {
  if (A === null && B === null) {
    return 0;
  }

  if (A === null) {
    return 1;
  }

  if (B === null) {
    return -1;
  }

  return null;
};

export const sortDate = (dayA, dayB, type) => {
  const weight = getWeightForNull(dayA, dayB);

  return type === 'Up'? weight ?? dayB - dayA : weight ?? dayA - dayB;
};

export const sortNumber = (numberA, numberB, type) => {
  const weight = getWeightForNull(numberA, numberB);

  return type === 'Up'? weight ?? numberB - numberA : weight ?? numberA - numberB;
};
