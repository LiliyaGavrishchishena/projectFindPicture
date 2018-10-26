export default class Controller {
  constructor(model, view) {
    this._view = view;
    this._model = model;

    this._view.refs.form.addEventListener(
      'submit',
      this.handleFormSubmit.bind(this)
    );

    this._view.refs.showMoreBtn.addEventListener(
      'click',
      this.handleShowMore.bind(this)
    );

    this._view.refs.pictList.addEventListener(
      'click',
      this.popUpOpen.bind(this)
    );

    this._view.refs.close.addEventListener(
      'click',
      this.popUpClose.bind(this)
    );
    this._view.refs.next.addEventListener(
        'click',
        this.popUpNext.bind(this)
    );
      this._view.refs.prev.addEventListener(
          'click',
          this.popUpPrev.bind(this)
      );

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

    input.value = '';
  }

  handleShowMore(e) {
    e.preventDefault();
    const val = this._model.request;
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
      this._view.refs.modaleImage.setAttribute('alt', targetImg.getAttribute('alt'));
      this._view.refs.modaleImage.setAttribute('id', targetImg.getAttribute('id'));
      //console.log(this._model.getRequest(this))
      // console.log(this._view.refs.pictList);
  }

  popUpClose () {
    this._view.refs.page.classList.remove('modale-open');
  }

  popUpNext(){
    //Это точка отсчета == ссылка активного слайда
      const activeImgUrl = this._view.refs.modaleImage.getAttribute('src');
    //Это массив всех изображений
      const itemList = this._view.refs.pictList.querySelectorAll('img');
      Array.from(itemList).map(img => {
          if(img.dataset.fullview === activeImgUrl){
              const currentNumber = Array.from(itemList).indexOf(img);
              const next = Array.from(itemList)[currentNumber + 1];
              this._view.refs.modaleImage.setAttribute('src', next.dataset.fullview);
      }
      });
  }

    popUpPrev(){
        const activeImgUrl = this._view.refs.modaleImage.getAttribute('src');
        const itemList = this._view.refs.pictList.querySelectorAll('img');
        Array.from(itemList).map(img => {
            if(img.dataset.fullview === activeImgUrl){
                const currentNumber = Array.from(itemList).indexOf(img);
                const next = Array.from(itemList)[currentNumber - 1];
                this._view.refs.modaleImage.setAttribute('src', next.dataset.fullview);
            }
        });
    }
}
