export const createFilmListTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>`
);

// <!--
//     При загрузке данных
//       * Loading...
//     Значение отображаемого текста зависит от выбранного фильтра:
//       * All movies – 'There are no movies in our database'
//       * Watchlist — 'There are no movies to watch now';
//       * History — 'There are no watched movies now';
//       * Favorites — 'There are no favorite movies now'.
//      Значение в зависимости от блока
//       * All movies. Upcoming, Top rated, Most commented
//   -->
