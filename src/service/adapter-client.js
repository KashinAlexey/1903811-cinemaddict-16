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
    filmInfo: adaptedFilmInfo,
    userDetails: adaptedUserDetails,
  };

  delete adaptedData['film_info'];
  delete adaptedData['user_details'];

  return adaptedData;
};
