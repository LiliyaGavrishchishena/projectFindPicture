export default class Controller {
  constructor(model, view) {
    this._view = view;
    this._model = model;

    this._view.refs.form.addEventListener(
      'submit',
      this.handleFormSubmit.bind(this));

    this._view.refs.showMoreBtn.addEventListener(
      'click',
      this.handleShowMore.bind(this));

    this._view.refs.pictList.addEventListener(
      'click',
      this.popUpOpen.bind(this));

    this._view.refs.close.addEventListener(
      'click',
      this.popUpClose.bind(this));

    this._view.refs.next.addEventListener(
      'click',
      this.popUpNext.bind(this));

    this._view.refs.prev.addEventListener(
      'click',
      this.popUpPrev.bind(this));

    this._view.refs.select.addEventListener(
      'click',
      this.popUpSelect.bind(this));

    this._view.refs.headerLogo.addEventListener(
      'click',
      this.handleHeaderLogo.bind(this));

    this._view.refs.btnFavourite.addEventListener(
      'click',
      this.handleFavouriteList.bind(this));

  }

  handleFormSubmit(e) {
    e.preventDefault();
    const input = this._view.refs.input;

    this._model.getRequest(input.value).then(createdItems => {
      if (createdItems === undefined) return;
      this._view.init(createdItems);
      if (createdItems.length !== 0) {
        this._view.refs.showMoreBtn.classList.add('active');
      } else {
        this._view.refs.showMoreBtn.classList.remove('active');
      }
    });
  }

  handleShowMore(e) {
    e.preventDefault();
    const val = this._view.refs.input.value;
    this._model.getRequest(val).then(createdItems => {
      if (createdItems === undefined) return;
      this._view.addPicture(createdItems);
      if (createdItems.length !== 0) {
        this._view.refs.showMoreBtn.classList.add('active');
      } else {
        this._view.refs.showMoreBtn.classList.remove('active');
      }
    });
  }

  popUpOpen(e) {
    const target = e.target;
    const targetImg = target.querySelector('img');
    if (target.nodeName !== 'LI') return;
    this._view.refs.page.classList.add('modale-open');
    this._view.refs.modaleImage.setAttribute('src', targetImg.dataset.fullview);
    this._view.refs.modaleImage.setAttribute(
      'alt',
      targetImg.getAttribute('alt')
    );
    this._view.refs.modaleImage.setAttribute(
      'id',
      targetImg.parentNode.dataset.idItem
    );

    const activeImgUrl = this._view.refs.modaleImage.getAttribute('src');
    const itemList = this._view.refs.pictList.querySelectorAll('img');
    Array.from(itemList).map(img => {
      if (img.dataset.fullview === activeImgUrl) {
        const currentNumber = Array.from(itemList).indexOf(img);
        if (currentNumber + 1 === itemList.length) {
          this._view.refs.next.setAttribute('disabled', 'disabled');
        }
        if (currentNumber === 0) {
          this._view.refs.prev.setAttribute('disabled', 'disabled');
        }
      }
    });
  }

  popUpClose() {
    this._view.refs.page.classList.remove('modale-open');
    this._view.refs.prev.removeAttribute('disabled');
    this._view.refs.next.removeAttribute('disabled');
  }

  popUpNext() {
    //Это точка отсчета == ссылка активного слайда
    const activeImgUrl = this._view.refs.modaleImage.getAttribute('src');
    //Это массив всех изображений
    const itemList = this._view.refs.pictList.querySelectorAll('img');
    Array.from(itemList).map(img => {
      if (img.dataset.fullview === activeImgUrl) {
        const currentNumber = Array.from(itemList).indexOf(img);
        const next = Array.from(itemList)[currentNumber + 1];
        if (currentNumber + 1 < itemList.length) {
          console.log('Номер следующего слайда меньше длины');
          this._view.refs.next.removeAttribute('disabled');
          this._view.refs.prev.removeAttribute('disabled');
          this._view.refs.modaleImage.setAttribute(
            'src',
            next.dataset.fullview
          );
        }
        if (currentNumber + 1 === itemList.length - 1) {
          console.log('Номер следующего слайда Равен длине');
          this._view.refs.next.setAttribute('disabled', 'disabled');
        }
      }
    });
  }

  popUpPrev() {
    const activeImgUrl = this._view.refs.modaleImage.getAttribute('src');
    const itemList = this._view.refs.pictList.querySelectorAll('img');
    Array.from(itemList).map(img => {
      if (img.dataset.fullview === activeImgUrl) {
        const currentNumber = Array.from(itemList).indexOf(img);
        const next = Array.from(itemList)[currentNumber - 1];
        this._view.refs.modaleImage.setAttribute('src', next.dataset.fullview);
        if (currentNumber - 1 > 0) {
          //console.log('Номер предыдущего слайда:',currentNumber - 1, '>0')
          this._view.refs.next.removeAttribute('disabled');
          this._view.refs.modaleImage.setAttribute(
            'src',
            next.dataset.fullview
          );
        } else if (currentNumber - 1 === 0) {
          //console.log('Номер предыдущего слайда:',currentNumber - 1, '=0')
          this._view.refs.prev.setAttribute('disabled', 'disabled');
        }
      }
    });
  }

  popUpSelect(e) {

  }

  handleHeaderLogo(e) {
    e.preventDefault();
    this._view.init([]);
    this._view.refs.input.value = '';
    this._view.refs.showMoreBtn.classList.remove('active');
  }

  handleFavouriteList(e) {
    e.preventDefault();
    console.log(this._view.refs.btnFavourite.classList.contains('js-home'));
    if (this._view.refs.btnFavourite.classList.contains('js-home')) {
      this._view.refs.btnFavourite.classList.remove('js-home');
      this._view.refs.page.classList.remove('favorites--active');
      this._view.refs.btnFavourite.textContent = 'Избранное';
      return;
    }
    this._view.refs.page.classList.add('favorites--active');
    this._view.refs.btnFavourite.textContent = 'На главную';
    this._view.refs.btnFavourite.classList.add('js-home');
  }
}
