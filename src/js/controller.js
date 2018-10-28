export default class Controller {
  constructor(model, view) {
    this._view = view;
    this._model = model;

    this._view.form.addEventListener(
      'submit',
      this.handleFormSubmit.bind(this));

    this._view.showMoreBtn.addEventListener(
      'click',
      this.handleShowMore.bind(this));

    this._view.pictList.addEventListener(
      'click',
      this.popUpOpen.bind(this));

    this._view.modalBackdrop.addEventListener(
      'click',
      this.popUpClose.bind(this));

    this._view.next.addEventListener(
      'click',
      this.popUpNext.bind(this));

    this._view.prev.addEventListener(
      'click',
      this.popUpPrev.bind(this));

    this._view.select.addEventListener(
      'click',
      this.popUpSelect.bind(this));

    this._view.headerLogo.addEventListener(
      'click',
      this.handleHeaderLogo.bind(this));

    this._view.btnFavourite.addEventListener(
      'click',
      this.handleFavouriteList.bind(this));

    // this._view.delete.addEventListener(
    //     'click',
    //     this.favoriteItemDelete.bind(this));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const input = this._view.input;

    this._model.getRequest(input.value).then(createdItems => {
      if (createdItems === undefined) return;
      this._view.init(createdItems);
      if (createdItems.length !== 0) {
        this._view.showMoreBtn.classList.add('active');
      } else {
        this._view.showMoreBtn.classList.remove('active');
      }
    });
  }

  handleShowMore(e) {
    e.preventDefault();
    const val = this._view.input.value;
    this._model.getRequest(val).then(createdItems => {
      if (createdItems === undefined) return;
      this._view.addPicture(createdItems);
      if (createdItems.length !== 0) {
        this._view.showMoreBtn.classList.add('active');
      } else {
        this._view.showMoreBtn.classList.remove('active');
      }
    });
  }

  popUpOpen(e) {
    const target = e.target;
    const targetImg = target.querySelector('img');
    if (target.nodeName !== 'LI') return;
    this._view.page.classList.add('modale-open');
    this._view.modaleImage.setAttribute('src', targetImg.dataset.fullview);
    this._view.modaleImage.setAttribute('alt', targetImg.getAttribute('alt'));
    const activeImgUrl = this._view.modaleImage.getAttribute('src');
    const itemList = this._view.pictList.querySelectorAll('img');
    Array.from(itemList).map(img => {
      if (img.dataset.fullview === activeImgUrl) {
        const currentNumber = Array.from(itemList).indexOf(img);
        if (currentNumber + 1 === itemList.length) {
          this._view.next.setAttribute('disabled', 'disabled');
        }
        if (currentNumber === 0) {
          this._view.prev.setAttribute('disabled', 'disabled');
        }
      }
    });
    document.addEventListener('keydown', this.popUpClose.bind(this));
  }

  popUpClose(e) {
    if (
      e.target === this._view.modalBackdrop ||
      e.target === this._view.close || e.key === 'Escape'
    ) {
      this._view.page.classList.remove('modale-open');
      this._view.prev.removeAttribute('disabled');
      this._view.next.removeAttribute('disabled');
    }
    document.removeEventListener('keydown', this.popUpClose.bind(this));
  }

  popUpNext() {
    const activeImgUrl = this._view.modaleImage.getAttribute('src');
    const itemList = this._view.pictList.querySelectorAll('img');

    Array.from(itemList).map(img => {
      if (img.dataset.fullview === activeImgUrl) {
        const currentNumber = Array.from(itemList).indexOf(img);
        const next = Array.from(itemList)[currentNumber + 1];
        if (currentNumber + 1 < itemList.length) {
          this._view.next.removeAttribute('disabled');
          this._view.prev.removeAttribute('disabled');
          this._view.modaleImage.setAttribute('src', next.dataset.fullview);
        }
        if (currentNumber + 1 === itemList.length - 1) {
          this._view.next.setAttribute('disabled', 'disabled');
        }
      }
    });
  }

  popUpPrev() {
    const activeImgUrl = this._view.modaleImage.getAttribute('src');
    const itemList = this._view.pictList.querySelectorAll('img');
    Array.from(itemList).map(img => {
      if (img.dataset.fullview === activeImgUrl) {
        const currentNumber = Array.from(itemList).indexOf(img);
        const next = Array.from(itemList)[currentNumber - 1];
        this._view.modaleImage.setAttribute('src', next.dataset.fullview);
        if (currentNumber - 1 > 0) {
          this._view.next.removeAttribute('disabled');
          this._view.modaleImage.setAttribute('src', next.dataset.fullview);
        } else if (currentNumber - 1 === 0) {
          this._view.prev.setAttribute('disabled', 'disabled');
        }
      }
    });
  }

  getId() {
    const itemList = this._view.pictList.querySelectorAll('li');
    const carrentSrc = this._view.modaleImage.getAttribute('src');
    let currentId;
    Array.from(itemList).map(item => {
      if (carrentSrc === item.querySelector('img').dataset.fullview) {
        currentId = item.dataset.idItem;
      }
    });
    return currentId;
  }

  popUpSelect(e) {
    const currentId = this.getId();
    //вызывает функцию, Добавить в избранное на текущем iD
    const itemObj = this._model.addToFavorite(currentId);
    this._view.addFavoritesPicture(itemObj);
  }
  //Єто не готово
  // favoriteItemDelete(e) {
  //   console.log(target)
  //     const currentId = target.id;
  //     this._model.removeFromFavorite(currentId)
  // }

  handleHeaderLogo(e) {
    e.preventDefault();
    this._view.init([]);
    this._view.input.value = '';
    this._view.showMoreBtn.classList.remove('active');
    this._view.page.classList.remove('favorites--active');
  }

  handleFavouriteList(e) {
    e.preventDefault();
    //console.log(this._view.btnFavourite.classList.contains('js-home'));
    if (this._view.btnFavourite.classList.contains('js-home')) {
      this._view.btnFavourite.classList.remove('js-home');
      this._view.page.classList.remove('favorites--active');
      this._view.btnFavourite.textContent = 'Избранное';
      return;
    }
    this._view.page.classList.add('favorites--active');
    this._view.btnFavourite.textContent = 'На главную';
    this._view.btnFavourite.classList.add('js-home');
  }
}

// {largeImageURL: "https://pixabay.com/get/ea32b70720f1083ed1584d05fb1d4796e77fe0d71bb90c4090f4c17fa0efb4b9d0_1280.jpg", webformatHeight: 426,
//     webformatWidth: 640,
//     likes: 40, imageWidth: 5905,
//      …}comments: 40
// downloads: 1094
// favorites: 9
// id: 3768859
// imageHeight:3938
// imageSize: 5472525
// imageWidth: 5905
// largeImageURL: "https://pixabay.com/get/ea32b70720f1083ed1584d05fb1d4796e77fe0d71bb90c4090f4c17fa0efb4b9d0_1280.jpg"
// likes: 40
// pageURL: "https://pixabay.com/en/rose-romantic-love-rose-bloom-3768859/"
// previewHeight: 99
// previewURL: "https://cdn.pixabay.com/photo/2018/10/23/20/12/rose-3768859_150.jpg"
// previewWidth: 150tags: "rose, romantic, love"type: "photo"user: "KleineKiwi"
// userImageURL: "https://cdn.pixabay.com/user/2018/10/07/19-51-01-992_250x250.jpeg"
// user_id: 9883074
// views: 1336
// webformatHeight: 426
// webformatURL: "https://pixabay.com/get/ea32b70720f1083ed1584d05fb1d4796e77fe0d71bb90c4090f4c17fa0efb4b9d0_640.jpg"
// webformatWidth: 640
// __proto__: Object
