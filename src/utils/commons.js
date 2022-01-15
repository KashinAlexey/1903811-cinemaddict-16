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
