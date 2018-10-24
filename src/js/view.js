import template from './../templates/card.hbs';

export default class View {
  constructor() {
    this.refs = {};

    this.refs.form = document.querySelector('.form');
    this.refs.input = this.refs.form.querySelector('.form__input');
    this.refs.pictList = document.querySelector('.picture__list');

  }

  init(items) {
    const markup = items.reduce((acc, item) => {
      return acc + this.createCard(item);
    }, '');
    console.log(markup);
    this.refs.pictList.innerHTML = markup;
  }

  createCard(item) {
    const markup = template(item);
    return markup;
  }
}
