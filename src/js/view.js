import template from "./../templates/card.hbs";

export default class View {
  constructor() {
    this.refs = {};

    this.refs.form = document.querySelector('.form');
    this.refs.input = this.refs.form.querySelector('.form__input');
    this.refs.pictList = document.querySelector('.picture__list');
    this.refs.showMoreBtn = document.querySelector('.js-more');
    this.refs.page = document.querySelector('body');
    //=============================
    this.refs.delete = document.querySelector('.js-delete');
    this.refs.listFavorites = document.querySelector('.picture__list.favorites__list');
    this.refs.btnFavourite = document.querySelector('.header__favorites');
    this.refs.modaleImage = document.querySelector('.modal__img');
    this.refs.home = document.querySelector('.js-home');
    this.refs.prev = document.querySelector('.js-prev');
    this.refs.next = document.querySelector('.js-next');
    this.refs.select = document.querySelector('.js-select');
    this.refs.close = document.querySelector('.js-close');

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
// const refs = {
//     page: document.querySelector("body"),
//     form: document.querySelector(".header__form"),
//     btnSearch: document.querySelector(".form__btn"),
    // delete: document.querySelector(".js-delete"),
    // more: document.querySelector(".js-more"),
    // list: document.querySelector(".picture__list"),
    // listFavorites: document.querySelector(".picture__list.favorites__list"),
    // btnFavourite:  document.querySelector(".header__favorites"),
    // logo: document.querySelector(".header__logo"),
    // home: document.querySelector(".js-home"),
    // prev: document.querySelector(".js-prev"),
    // next: document.querySelector(".js-next"),
    // select: document.querySelector(".js-select"),
    // close: document.querySelector(".js-close")
// };

// function favoriteOpen(event) {
//     event.preventDefault();
//     console.log(refs.btnFavourite.classList.contains('js-home'))
//     if(refs.btnFavourite.classList.contains('js-home')){
//         refs.btnFavourite.classList.remove('js-home');
//         refs.page.classList.remove('favorites--active');
//         refs.btnFavourite.textContent = "Избранное";
//         return
//     }
//     refs.page.classList.add('favorites--active');
//     refs.btnFavourite.textContent = "На главную";
//     refs.btnFavourite.classList.add('js-home');

// }
// function favoriteClose(event) {
//     event.preventDefault();
//     refs.page.classList.remove('favorites--active');
//     refs.btnFavourite.textContent = "Избранное";
//     refs.btnFavourite.classList.remove('js-home');
// }

// refs.btnFavourite.addEventListener('click', favoriteOpen);
// refs.logo.addEventListener('click', favoriteClose);

/* const refs = {
     page: document.querySelector("body"),
     form: document.querySelector(".header__form"),
     btnSearch: document.querySelector(".form__btn"),
 delete: document.querySelector(".js-delete"),
 more: document.querySelector(".js-more"),
 list: document.querySelector(".picture__list"),
 listFavorites: document.querySelector(".picture__list.favorites__list"),
 btnFavourite:  document.querySelector(".header__favorites"),
 logo: document.querySelector(".header__logo"),
 home: document.querySelector(".js-home"),
 prev: document.querySelector(".js-prev"),
 next: document.querySelector(".js-next"),
 select: document.querySelector(".js-select"),
 close: document.querySelector(".js-close")
 };

 const popUpClose = () => refs.page.classList.remove('modale-open');

 function popUpOpen(event) {
     event.preventDefault();
     const target = event.target;
     console.log("event target: ", target);  //посмотрите что тут
     if (target.nodeName !== "LI") return;
     refs.page.classList.add('modale-open');
 }
 function favoriteOpen(event) {
     event.preventDefault();
     console.log(refs.btnFavourite.classList.contains('js-home'))
     if(refs.btnFavourite.classList.contains('js-home')){
         refs.btnFavourite.classList.remove('js-home');
         refs.page.classList.remove('favorites--active');
         refs.btnFavourite.textContent = "Избранное";
         return
     }
     refs.page.classList.add('favorites--active');
     refs.btnFavourite.textContent = "На главную";
     refs.btnFavourite.classList.add('js-home');

 }
 function favoriteClose(event) {
     event.preventDefault();
     refs.page.classList.remove('favorites--active');
     refs.btnFavourite.textContent = "Избранное";
     refs.btnFavourite.classList.remove('js-home');
 }

 refs.list.addEventListener('click', popUpOpen);
 refs.close.addEventListener('click', popUpClose);
 refs.btnFavourite.addEventListener('click', favoriteOpen);
 refs.logo.addEventListener('click', favoriteClose);
*/
