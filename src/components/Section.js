// Section class doesn't have markup. Class receieve markup through callback. Then insert inside the container.
export default class Section {
  // items function as array of data
  // renderer is to create and render data on page
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem(element) {
    this._container.append(element);
  }
}
