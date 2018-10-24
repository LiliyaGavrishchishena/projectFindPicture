const arr = [
  {
    id: 1,
    image: 1,
    fullview: 1,
    title: 1
  },
  {
    id: 1,
    image: 1,
    fullview: 1,
    title: 1
  },
  {
    id: 1,
    image: 1,
    fullview: 1,
    title: 1
  },
  {
    id: 1,
    image: 1,
    fullview: 1,
    title: 1
  },
  {
    id: 1,
    image: 1,
    fullview: 1,
    title: 1
  },
]

export default class Controller {
  constructor(model, view) {
    this._view = view;
    this._model = model;

    this.init();
  }

  init() {
    this._view.init(arr);
  }

}
