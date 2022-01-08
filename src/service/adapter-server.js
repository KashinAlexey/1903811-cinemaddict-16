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
