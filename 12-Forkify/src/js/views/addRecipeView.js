import View from './View.js';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _msg = 'Recipe was successfully uploaded!';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super(); // generates 'this' keyword
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(subscriber) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      // 'this' points to _parentEl, which is an upload form itself
      // output: [nameOfTheField, value]
      const dataArr = [...new FormData(this)];
      // Converting an Array to Object
      const data = Object.fromEntries(dataArr);
      subscriber(data);
    });
  }
  _generateMarkup() {}
}

export default new addRecipeView();
