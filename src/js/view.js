import template from "./../templates/card.hbs";

export default class View {
  constructor() {
    this.refs = {};

    this.refs.form = document.querySelector('.form');
    this.refs.input = this.refs.form.querySelector('.form__input');
    this.refs.pictList = document.querySelector('.picture__list');
    this.refs.showMoreBtn = document.querySelector('.js-more');
    this.refs.page = document.querySelector('body');
    this.refs.delete = document.querySelector('.js-delete');
    this.refs.listFavorites = document.querySelector('.picture__list.favorites__list');
    this.refs.btnFavourite = document.querySelector('.header__favorites');
    this.refs.modaleImage = document.querySelector('.modal__img');
    this.refs.home = document.querySelector('.js-home');
    this.refs.prev = document.querySelector('.js-prev');
    this.refs.next = document.querySelector('.js-next');
    this.refs.select = document.querySelector('.js-select');
    this.refs.close = document.querySelector('.js-close');
    this.refs.headerLogo = document.querySelector('.header__logo');
  }

  init(items) {
    const markup = items.reduce((acc, item) => {
      return acc + this.createCard(item);
    }, '');
    this.refs.pictList.innerHTML = markup;
  }

  addPicture(items) {
    const markup = items.reduce((acc, item) => {
      return acc + this.createCard(item);
    }, '');
    this.refs.pictList.insertAdjacentHTML('beforeend', markup);
  }

  createCard(item) {
    const markup = template(item);
    return markup;
  }

}