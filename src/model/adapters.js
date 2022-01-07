export const adaptToClient = (data) => {
  const filmInfo = data['film_info'];
  const release = filmInfo['release'];
  const userDetails = data['user_details'];

  const adaptedRelease = {...release,
    releaseCountry: release['release_country'],
  };

  delete adaptedRelease['release_country'];

  const adaptedFilmInfo = {...filmInfo,
    ageRating: filmInfo['age_rating'],
    alternativeTitle: filmInfo['alternative_title'],
    release: adaptedRelease,
    totalRating: filmInfo['total_rating'],
  };

  delete adaptedFilmInfo['age_rating'];
  delete adaptedFilmInfo['alternative_title'];
  delete adaptedFilmInfo['total_rating'];

  const adaptedUserDetails = {...userDetails,
    alreadyWatched: userDetails['already_watched'],
    watchingDate: userDetails['watching_date'] !== null ? new Date(userDetails['watching_date']) : userDetails['watching_date'],
  };

  delete adaptedUserDetails['already_watched'];
  delete adaptedUserDetails['watching_date'];

  const adaptedData = {...data,
    filmInfo: data['film_info'],
    userDetails: adaptedUserDetails,
  };

  delete adaptedData['film_info'];
  delete adaptedData['user_details'];

  return adaptedData;
};

export const adaptToServer = (data) => {
  const adaptedUserDetails = {...data.userDetails,
    'already_watched': data.userDetails.alreadyWatched,
    'watching_date': data.userDetails.watchingDate instanceof Date ? data.userDetails.watchingDate.toISOString(): null,
  };

  delete adaptedUserDetails.userDetails.alreadyWatched;
  delete adaptedUserDetails.userDetails.watchingDate;

  const adaptedData = {...data,
    'user_details': adaptedUserDetails,
  };

  delete adaptedData.userDetails;

  return adaptedData;
};

/*
const film_info = {
  actors: ['Harrison Ford', 'Takeshi Kitano', 'Gary Oldman', 'Leonardo DiCaprio', 'Al Pacino', 'Edward Norton', 'Tom Hanks'],
  age_rating: 18,
  alternative_title: "A Lion With Him",
  description: "Oscar-winning film, true masterpiece where love and death are closer to heroes than their family.",
  director: "Tom Ford",
  genre: ['Action', 'Drama', 'Horror'],
  poster: "images/posters/the-great-flamarion.jpg",
  release: {date: '1997-02-27T05:26:29.773Z',
  release_country: 'Germany'},
  runtime: 92,
  title: "A Man On The Darkness",
  total_rating: 7.8,
  writers: ['Hayao Miazaki', 'Stephen King', 'Quentin Tarantino', 'Robert Zemeckis'],
}

const user_details = {
  watchlist: true,
  already_watched: true,
  watching_date: '2021-04-16T13:23:46.035Z',
  favorite: false,
};

const comment = {
  id: '3558',
  author: 'Nevada Romanov',
  emotion: 'smile',
  comment: "my friend and I went to watch this movie and never…this year, have you noticed the director's cameo.",
  date: '2022-01-07T01:57:04.607Z',
};

const data = {
  id: '1',
  film_info: film_info,
  user_details: user_details,
  comments: ['3558', '3559', '3560', '3561', '3562'],
}
*/


