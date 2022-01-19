export const updateRating = (films) => {
  let rating = null;
  const ratingCount = films.filter((film) => film.userDetails.alreadyWatched === true).length;

  if (ratingCount > 20) {
    rating = 'Movie Buff';
  } else if (ratingCount <= 20 && ratingCount > 10) {
    rating = 'Fun';
  } else if (ratingCount <= 10 && ratingCount > 0) {
    rating = 'Novice';
  }

  return rating;
};

// Date format
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

export const timeSince = (date) => {

  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'year' : 'years'} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'month' : 'months'} ago`;
  }

  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'week' : 'weeks'} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'day' : 'days'} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} ${interval === 1 ? 'hour' : 'hours'} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return 'few minutes ago';
  }

  return 'now';
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
