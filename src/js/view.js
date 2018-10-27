import template from "./../templates/card.hbs";

export default class View {
  constructor() {
    this.form = document.querySelector('.form');
    this.input = this.form.querySelector('.form__input');
    this.pictList = document.querySelector('.picture__list');
    this.showMoreBtn = document.querySelector('.js-more');
    this.page = document.querySelector('body');
    this.delete = document.querySelector('.js-delete');
    this.listFavorites = document.querySelector('.favorites__list');
    this.btnFavourite = document.querySelector('.header__favorites');
    this.modaleImage = document.querySelector('.modal__img');
    this.home = document.querySelector('.js-home');
    this.prev = document.querySelector('.js-prev');
    this.next = document.querySelector('.js-next');
    this.select = document.querySelector('.js-select');
    this.close = document.querySelector('.js-close');
    this.headerLogo = document.querySelector('.header__logo');
  }

  init(items) {
    const markup = items.reduce((acc, item) => {
      return acc + this.createCard(item);
    }, '');
    this.pictList.innerHTML = markup;
  }

  addPicture(items) {
    const markup = items.reduce((acc, item) => {
      return acc + this.createCard(item);
    }, '');
    this.pictList.insertAdjacentHTML('beforeend', markup);
  }

  addFavoritesPicture(item) {
      const markup =  this.createCard(item);
      this.listFavorites.insertAdjacentHTML('beforeend', markup);
  }

  createCard(item) {
    const markup = template(item);
    return markup;
  }

}