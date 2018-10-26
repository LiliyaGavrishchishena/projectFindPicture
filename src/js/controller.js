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
    if (target.nodeName !== 'LI') return;
    this._view.refs.page.classList.add('modale-open');
  }

  popUpClose () {
    this._view.refs.page.classList.remove('modale-open');
  }
}
