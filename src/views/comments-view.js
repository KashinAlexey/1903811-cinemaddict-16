import { EMOJIS } from '../constants.js';
import he from 'he';
import SmartView from '../views/smart-view.js';
import { timeSince } from '../utils/commons.js';

const emptyComment = {
  emotion: null,
  comment: '',
};

const createEmojItmImage = (emoji) => (`
  <img
    src="./images/emoji/${emoji}.png"
    width="30"
    height="30"
    alt="emoji"
  />`
);

const createFilmDetailsEmojiItem = (isDisabled) => (
  EMOJIS.map((emoji) => `<input
    class="film-details__emoji-item visually-hidden"
    name="comment-emoji"
    type="radio"
    id="emoji-${emoji}"
    value="${emoji}"
    ${isDisabled ? 'disabled' : ''}
  />
  <label
    class="film-details__emoji-label"
    for="emoji-${emoji}">
    ${createEmojItmImage(emoji, isDisabled)}
  </label>`).join('')
);

const createFilmDetailsComment = (commentItm, isDisabled) => {
  const { id, author, emotion, comment, date, isDeleting } = commentItm;

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
          ${timeSince(date)}
        </span>
        <button class="film-details__comment-delete"
        ${isDisabled ? 'disabled' : ''}>
        ${isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </p>
    </div>
  </li>`;
};

const createFilmDetailsComments = (comments, isDisabled) => {
  const commentsTemplate = comments.map((comment) => createFilmDetailsComment(comment, isDisabled)).join('');

  return `<ul class="film-details__comments-list">
    ${commentsTemplate}
  </ul>`;
};

const createFilmDetailsCommentsTemplate = (comments) => {
  const commentsCount = comments.length;
  const { isDisabled } = comments;

  return `<div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">
        Comments
        <span class="film-details__comments-count">
          ${commentsCount}
        </span>
      </h3>

      ${createFilmDetailsComments(comments, isDisabled)}

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
            ${isDisabled ? 'disabled' : ''}
          ></textarea>
        </label>

        <div class="film-details__emoji-list">
          ${createFilmDetailsEmojiItem(isDisabled)}
        </div>
      </div>
    </section>
  </div>`;
};

export default class CommentsView extends SmartView {
  #userComment = null;
  #textAreaElement = null;
  #userEmodjiElement = null;
  _data = null;

  constructor(comments) {
    super();
    this._data = CommentsView.parseCommentsToData(comments);
    this.#userComment = Object.assign({}, emptyComment);
    this.#setEmojiClickHandler();
    this.#textAreaElement = this.element.querySelector('.film-details__comment-input');
    this.#userEmodjiElement = this.element.querySelector('.film-details__add-emoji-label').querySelector('img');
  }

  get template() {
    return createFilmDetailsCommentsTemplate(this._data);
  }

  static parseCommentsToData = (comments) => {
    const parsedComments = comments.map((comment) => {
      const obj = Object.assign({},comment);
      obj.isDisabled = false;
      obj.isDeleting = false;
      return obj;
    });

    parsedComments.sDisabled = false;
    return parsedComments;
  };

  restoreHandlers = () => {
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.#setEmojiClickHandler(this._callback.emojiClick);
  }

  setAborting = (id) => {
    this.shake(() => this.updateComment(id, {isDisabled: false,isDeleting: false,}));
  }

  updateComment = (id, update) => {
    if (!update) {
      return;
    }

    const { isDisabled, isDeleting } = update;

    if (id) {
      const index = this._data.findIndex((data) => data.id === id);

      if (index === -1) {
        return;
      }

      const updatedData = {...this._data[index], isDeleting: isDeleting};
      this._data = [
        ...this._data.slice(0, index),
        updatedData,
        ...this._data.slice(index + 1),
      ];
    }

    this._data.isDisabled = isDisabled;

    this.updateElement();
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
    this.#textAreaElement = this.element.querySelector('.film-details__comment-input');
    this.#userComment.comment = he.encode(this.#textAreaElement.value);
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(evt.target.closest('li').id);
  }

  #emojiClickHandler = (evt) => {
    this.#userEmodjiElement = this.element.querySelector('.film-details__add-emoji-label').querySelector('img');
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
