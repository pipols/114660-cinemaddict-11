import AbstractComponent from '../abstract-component';

export default class CloseButton extends AbstractComponent {
  _getTmpl() {
    return (
      `<div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>`
    );
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
