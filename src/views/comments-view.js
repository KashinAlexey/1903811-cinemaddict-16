import AbstractView from './abstract-view.js';
import he from 'he';

const EMOJIS = ['smile', 'sleeping', 'puke', 'angry'];

const dateFormat = 'yyyy/mm/dd h:m';

const emptyComment = {
  emotion: null,
  comment: '',
};

const formatDate = (date, str = 'yyyy/mm/dd h:m') => {
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

const createEmojItmImage = (emoji) => (`
  <img
    src="./images/emoji/${emoji}.png"
    width="30"
    height="30"
    alt="emoji"
  />`
);

const createFilmDetailsEmojiItem = () => (
  EMOJIS.map((emoji) => `<input
    class="film-details__emoji-item visually-hidden"
    name="comment-emoji"
    type="radio"
    id="emoji-${emoji}"
    value="${emoji}"
  />
  <label
    class="film-details__emoji-label"
    for="emoji-${emoji}">
    ${createEmojItmImage(emoji)}
  </label>`).join('')
);

const createFilmDetailsComment = (commentItm) => {
  const { id, author, emotion, comment, date } = commentItm;

  return `<li class="film-details__comment" id="${id}">
    <span class="film-details__comment-emoji">
      <img
        src="./images/emoji/${emotion}.png"
        width="55"
        height="55"
        alt="${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">
        ${comment}
      </p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">
          ${author}
        </span>
        <span class="film-details__comment-day">
          ${formatDate(date, dateFormat)}
        </span>
        <button class="film-details__comment-delete">
          Delete
        </button>
      </p>
    </div>
  </li>`;
};

const createFilmDetailsComments = (comments) => {

  const commentsTemplate = comments.map((comment) => createFilmDetailsComment(comment)).join('');

  return `<ul class="film-details__comments-list">
    ${commentsTemplate}
  </ul>`;
};

const createFilmDetailsCommentsTemplate = (comments) => {
  const commentsCount = comments.length;

  return `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
        Comments
        <span class="film-details__comments-count">
          ${commentsCount}
        </span>
      </h3>

      ${createFilmDetailsComments(comments)}

      <div class="film-details__new-comment">
        <div class="film-details__add-emoji-label">
          <img>
        </div>

        <label
          class="film-details__comment-label">
          <textarea
            class="film-details__comment-input"
            placeholder="Select reaction below and write comment here"
            name="comment"
          ></textarea>
        </label>

        <div class="film-details__emoji-list">
          ${createFilmDetailsEmojiItem()}
        </div>
      </div>
    </section>
  </div>`;
};

export default class CommentsView extends AbstractView {
  #comments = null;
  #userComment = null;
  #textAreaElement = null;
  #userEmodjiElement = null;

  constructor(comments) {
    super();
    this.#comments = comments;
    this.#userComment = Object.assign({}, emptyComment);
    this.#setEmojiClickHandler();
    this.#textAreaElement = this.element.querySelector('.film-details__comment-input');
    this.#userEmodjiElement = this.element.querySelector('.film-details__add-emoji-label').querySelector('img');
  }

  get template() {
    return createFilmDetailsCommentsTemplate(this.#comments);
  }

  #checkValidity = () => (
    this.#userComment.comment !== '' && this.#userComment.emotion !== null
  );

  #setEmojiClickHandler = (callback) => {
    this._callback.emojiClick = callback;
    const emojiButtons = this.element.querySelectorAll('.film-details__emoji-item');
    for (const emojiButton of emojiButtons) {
      emojiButton.addEventListener('input', this.#emojiClickHandler);
    }
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    const deleteButtons = this.element.querySelectorAll('.film-details__comment-delete');
    for (const deleteButton of deleteButtons) {
      deleteButton.addEventListener('click', this.#deleteClickHandler);
    }
  }

  setCommentInputHandler = (callback) => {
    this._callback.ctrlEnterKeydown = callback;
  }

  commentInputHandler = (evt) => {
    if (evt.ctrlKey && evt.key === 'Enter') {
      this.#ctrlEnterKeydownHandler(evt);
    }

    this.#userComment.comment = he.encode(this.#textAreaElement.value);
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(evt.target.closest('li').id);
  }

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    const emoji = evt.currentTarget.value;
    this.#userEmodjiElement.src = `images/emoji/${emoji}.png`;
    this.#userEmodjiElement.width = '55';
    this.#userEmodjiElement.height = '55';
    this.#userEmodjiElement.alt = `emoji-${emoji}`;
    this.#userComment.emotion = emoji;
  }

  #ctrlEnterKeydownHandler = (evt) => {
    evt.preventDefault();
    const validity = this.#checkValidity();

    if (validity) {
      this._callback.ctrlEnterKeydown(this.#userComment);
    }
  }
}