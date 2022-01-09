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
