import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement('div');
    this.elem.classList.add('card');
    let tempElem = document.createElement('div');
    tempElem.classList.add('card__top');
    this.elem.append(tempElem);
    tempElem = document.createElement('img');
    tempElem.src = '/assets/images/products/' + product.image;
    tempElem.classList.add('card__image');
    tempElem.alt = 'product';
    this.elem.firstChild.append(tempElem);
    tempElem = document.createElement('span');
    tempElem.classList.add('card__price')
    tempElem.innerHTML = '&euro;' + (product.price).toFixed(2);
    this.elem.firstChild.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('card__body');
    this.elem.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('card__title');
    tempElem.innerHTML = product.name;
    this.elem.lastChild.append(tempElem);
    tempElem = document.createElement('button');
    tempElem.classList.add('card__button');
    tempElem.type = 'button';
    tempElem.onclick = () => {
      let event = new CustomEvent("product-add", {detail: product.id, bubbles: true});  
      this.elem.dispatchEvent(event);
    }
    this.elem.lastChild.append(tempElem);
    tempElem = document.createElement('img');
    tempElem.src = '/assets/images/icons/plus-icon.svg';
    tempElem.alt = 'icon';
    this.elem.lastChild.lastChild.append(tempElem);
  }
}
