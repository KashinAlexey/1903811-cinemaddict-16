export const adaptToServer = (data) => {
  const filmInfo = data.filmInfo;
  const release = filmInfo.release;
  const userDetails = data.userDetails;

  const adaptedRelease = {...release,
    'date': release.date instanceof Date ? release.date.toISOString(): null,
    'release_country': release.releaseCountry,
  };

  delete adaptedRelease.releaseCountry;

  const adaptedFilmInfo = {...filmInfo,
    'age_rating': filmInfo.ageRating,
    'alternative_title': filmInfo.alternativeTitle,
    'release': adaptedRelease,
    'total_rating': filmInfo.totalRating,
  };

  delete adaptedFilmInfo.ageRating;
  delete adaptedFilmInfo.alternativeTitle;
  delete adaptedFilmInfo.totalRating;

  const adaptedUserDetails = {...userDetails,
    'already_watched': userDetails.alreadyWatched,
    'watching_date': userDetails.watchingDate instanceof Date ? data.userDetails.watchingDate.toISOString(): null,
  };

  delete adaptedUserDetails.alreadyWatched;
  delete adaptedUserDetails.watchingDate;

  const adaptedData = {...data,
    'film_info': adaptedFilmInfo,
    'user_details': adaptedUserDetails,
  };

  delete adaptedData.userDetails;
  delete adaptedData.filmInfo;

  return adaptedData;
};
