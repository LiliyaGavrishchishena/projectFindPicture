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

    this._view.refs.headerLogo.addEventListener("click",this.handleHeaderLogo.bind(this));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const input = this._view.refs.input;

    this._model.getRequest(input.value).then(createdItems => {
      if (createdItems === undefined) return;
      this._view.init(createdItems);
    });

    //input.value = '';
  }

  handleShowMore(e) {
    e.preventDefault();
    const input = this._view.refs.input;
    if (this._model.lastRequest === input.value) {
      this._model.getRequest(input.value).then(createdItems => {
        if (createdItems === undefined) return;
        this._view.add(createdItems);
      });
    }
  }
  handleHeaderLogo(e){
    e.preventDefault();
    this._view.init([]);
    this._view.refs.input.value="";
  }
}
