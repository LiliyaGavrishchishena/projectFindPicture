export default class Controller {
  constructor(model, view) {
    this._view = view;
    this._model = model;

    this._view.refs.form.addEventListener(
      "submit",
      this.handleFormSubmit.bind(this)
    );

    this._view.refs.showMoreBtn.addEventListener(
      "click",
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

    //input.value = '';
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
    this._view.refs.modaleImage.setAttribute('alt', targetImg.getAttribute('alt'));
    this._view.refs.modaleImage.setAttribute('id', targetImg.getAttribute('id'));

    const activeImgUrl = this._view.refs.modaleImage.getAttribute('src');
    const itemList = this._view.refs.pictList.querySelectorAll('img');
    this._view.refs.page.classList.add('modale-open');
      Array.from(itemList).map(img => {
          if(img.dataset.fullview === activeImgUrl) {
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

  popUpClose () {
    this._view.refs.page.classList.remove('modale-open');
    this._view.refs.prev.removeAttribute('disabled');
    this._view.refs.next.removeAttribute('disabled');
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
              if(currentNumber + 1 < itemList.length){
                  console.log("Номер следующего слайда меньше длины");
                  this._view.refs.next.removeAttribute('disabled');
                  this._view.refs.prev.removeAttribute('disabled');
                  this._view.refs.modaleImage.setAttribute('src', next.dataset.fullview);
              }
              if(currentNumber + 1 === itemList.length - 1){
                  console.log("Номер следующего слайда Равен длине");
                  this._view.refs.next.setAttribute('disabled', 'disabled');
              }
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
                if(currentNumber - 1 > 0){
                    //console.log('Номер предыдущего слайда:',currentNumber - 1, '>0')
                    this._view.refs.next.removeAttribute('disabled');
                    this._view.refs.modaleImage.setAttribute('src', next.dataset.fullview);
                }
                else if(currentNumber - 1 === 0){
                    //console.log('Номер предыдущего слайда:',currentNumber - 1, '=0')
                    this._view.refs.prev.setAttribute('disabled', 'disabled');
                }
            }
        });
    }
}
