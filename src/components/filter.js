import AbstractComponent from './abstract-component';
import {getFilmsByFilter, getHandlerWithProp} from '../helpers';
import {FilterType, FILTERS} from '../constants';

const classes = {
  default: `main-navigation__item`,
  active: `main-navigation__item--active`
};

export default class Filter extends AbstractComponent {
  constructor(films, currentFilter) {
    super();

    this._films = films;
    this._defaultFilter = FilterType.ALL;
    this._currentFilter = currentFilter || this._defaultFilter;
  }

  setClickHandler(handler) {
    this._clickHandler = getHandlerWithProp(`.${classes.default}`, handler);

    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _getItems() {
    return Object.entries(FILTERS).reduce((prev, [type, {name}]) => {
      let counterMarkup = ``;
      let className = `${classes.default} ${classes.default}--${type}`;

      if (type !== FilterType.ALL) {
        counterMarkup = `<span class="main-navigation__item-count">
          ${getFilmsByFilter(this._films, type).length}
        </span>`;
      }

      if (type === this._currentFilter) {
        className += ` ${classes.active}`;
      }

      return (
        `${prev} <a href="#${type}" class="${className}" data-prop="${type}">
          ${name} ${counterMarkup}
        </a>`
      );
    }, ``);
  }

  _getTmpl() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          ${this._getItems()}
        </div>

        <a href="#stats"
          class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }
}
