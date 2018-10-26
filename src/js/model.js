import {
  keyLS,
  isActiveLS,
  getLS,
  setLS,
  removeLS
} from "./services/apiLocalStorage";
import { getImages } from "./services/api_pixabay";

export default class Model {
  constructor() {
    this.images = [];
    this.page = 1;
    this.request = "";
  }

  getRequest(request) {
    if (this.request === request && request !== "") {
      this.page++;

      return getImages(request, this.page).then(data => {
        this.images = [...new Set([...this.images, ...data])];
        console.log(data);
        return data;
      });
    } else {
      this.page = 1;
      this.request = request;
      this.images = [];

      return getImages(request, this.page).then(data => {
        return (this.images = data);
      });
    }
  }

  getFavoriteList() {
    return keyLS();
  }

  addToFavorite(imageID) {
    const favoriteElement = this.images.find(elem => {
      console.log(elem);
      return String(elem.id) === String(imageID);
    });

    if (!getLS(imageID)) setLS(imageID, favoriteElement);
  }

  removeFromFavorite(imageID) {
    removeLS(imageID);
  }

  /* respond example for hbs-template, array[0]:
  [{
    comments: 69
    downloads: 58994
    favorites: 170
    id: 3732867
    imageHeight: 2331
    imageSize: 3604215
    imageWidth: 3500
    largeImageURL: "https://pixabay.com/get/ea32b20d20f2063ed1584d05fb1d4796e77fe0d71bb90c4090f4c17da7e5bdb8d0_1280.jpg"
    likes: 219
    pageURL: "https://pixabay.com/en/bird-owl-eyes-animal-looking-3732867/"
    previewHeight: 99
    previewURL: "https://cdn.pixabay.com/photo/2018/10/08/14/46/bird-3732867_150.jpg"
    previewWidth: 150
    tags: "bird, owl, eyes"
    type: "photo"
    user: "ractapopulous"
    userImageURL: "https://cdn.pixabay.com/user/2016/12/11/10-56-55-842_250x250.png"
    user_id: 24766
    views: 74825
    webformatHeight: 426
    webformatURL: "https://pixabay.com/get/ea32b20d20f2063ed1584d05fb1d4796e77fe0d71bb90c4090f4c17da7e5bdb8d0_640.jpg"
    webformatWidth: 640
  }]
  */
}
