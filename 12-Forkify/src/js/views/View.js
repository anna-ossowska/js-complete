import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  // Generating a new markup and comparing an old html to te new one
  // Updating only text and attributes that have actually changed
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Converting newMarkup into DOM object that we can then use to compare
    // with actual DOM that is on the page
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // Selecting all elements
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // Current elements rendered in the DOM
    const currElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];
      // console.log(currEl, newEl.isEqualNode(currEl));

      // Update changed text
      // prettier-ignore
      if (!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        // console.log('xxx', newEl.firstChild.nodeValue.trim());
        currEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(currEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const html = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderError(msg = this._errorMsg) {
    const html = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderMsg(msg = this._msg) {
    const html = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>
    `;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }
}
