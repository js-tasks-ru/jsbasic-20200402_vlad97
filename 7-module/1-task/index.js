import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    let tempElem = document.createElement('button');
    tempElem.classList.add('ribbon__arrow');
    tempElem.classList.add('ribbon__arrow_left');
    this.elem.append(tempElem);
    tempElem = document.createElement('img');
    tempElem.src = '/assets/images/icons/angle-icon.svg';
    tempElem.alt = 'icon';
    this.elem.firstChild.append(tempElem);
    tempElem = document.createElement('nav');
    tempElem.classList.add('ribbon__inner');
    this.elem.append(tempElem);
    for (let category of categories) {
      tempElem = document.createElement('a');
      tempElem.classList.add('ribbon__item');
      if (category.id === '') {tempElem.classList.add('ribbon__item_active');}
      tempElem.dataset.id = category.id;
      tempElem.innerHTML = category.name;
      tempElem.onclick = () => {
        event.preventDefault();
        document.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        event.currentTarget.classList.add('ribbon__item_active');
        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: category.id,
          bubbles: true
        }));
      };
      this.elem.lastChild.append(tempElem);
    }
    tempElem = document.createElement('button');
    tempElem.classList.add('ribbon__arrow');
    tempElem.classList.add('ribbon__arrow_right');
    tempElem.classList.add('ribbon__arrow_visible');
    this.elem.append(tempElem);
    tempElem = document.createElement('img');
    tempElem.src = '/assets/images/icons/angle-icon.svg';
    tempElem.alt = 'icon';
    this.elem.lastChild.append(tempElem);
    this.elem.querySelector(".ribbon__arrow_right").addEventListener('click', () => {
      this.elem.querySelector(".ribbon__arrow_left").classList.add('ribbon__arrow_visible');
      this.elem.querySelector(".ribbon__inner").scrollBy(350, 0);
      let scrollWidth = this.elem.querySelector(".ribbon__inner").scrollWidth;
      let scrollLeft = this.elem.querySelector(".ribbon__inner").scrollLeft;
      let clientWidth = this.elem.querySelector(".ribbon__inner").clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;
      if (scrollRight === 0) {this.elem.querySelector(".ribbon__arrow_right").classList.remove('ribbon__arrow_visible');}
    });
    this.elem.querySelector(".ribbon__arrow_left").addEventListener('click', () => {
      this.elem.querySelector(".ribbon__arrow_right").classList.add('ribbon__arrow_visible');
      this.elem.querySelector(".ribbon__inner").scrollBy(-350, 0);
      if (this.elem.querySelector(".ribbon__inner").scrollLeft === 0) {this.elem.querySelector(".ribbon__arrow_left").classList.remove('ribbon__arrow_visible');}
    });
  }
}
