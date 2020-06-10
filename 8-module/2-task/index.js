import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.currentProducts = this.products.concat();
    
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    this.render();
    
  }

  render() {
    
    let tempElem = document.createElement('div');
    tempElem.classList.add('products-grid__inner');
    this.elem.append(tempElem);
    for (let i = 0; i < this.currentProducts.length; i++) {
      tempElem = document.createElement('div');
      tempElem.classList.add('card');
      this.elem.firstChild.append(tempElem);
      tempElem = document.createElement('div');
      tempElem.classList.add('card__top');
      this.elem.firstChild.lastChild.append(tempElem);
      tempElem = document.createElement('img');
      tempElem.src = '/assets/images/products/' + this.currentProducts[i].image;
      tempElem.classList.add('card__image');
      tempElem.alt = 'product';
      this.elem.firstChild.lastChild.firstChild.append(tempElem);
      tempElem = document.createElement('span');
      tempElem.classList.add('card__price');
      tempElem.innerHTML = '&euro;' + (this.currentProducts[i].price).toFixed(2);
      this.elem.firstChild.lastChild.firstChild.append(tempElem);
      tempElem = document.createElement('div');
      tempElem.classList.add('card__body');
      this.elem.firstChild.lastChild.append(tempElem);
      tempElem = document.createElement('div');
      tempElem.classList.add('card__title');
      tempElem.innerHTML = this.currentProducts[i].name;
      this.elem.firstChild.lastChild.lastChild.append(tempElem);
      tempElem = document.createElement('button');
      tempElem.classList.add('card__button');
      tempElem.type = 'button';
      tempElem.onclick = () => {
        let event = new CustomEvent("product-add", {detail: this.currentProducts[i].id, bubbles: true});  
        this.elem.dispatchEvent(event);
      };
      this.elem.firstChild.lastChild.lastChild.append(tempElem);
      tempElem = document.createElement('img');
      tempElem.src = '/assets/images/icons/plus-icon.svg';
      tempElem.alt = 'icon';
      this.elem.firstChild.lastChild.lastChild.lastChild.append(tempElem);
    }
  }

  updateFilter(condition) {
    Object.assign(this.filters, condition);
    this.currentProducts = (this.products).filter(item => (this.filters.noNuts != item.nuts) || !(this.filters.noNuts) )
    .filter(item => ((this.filters.vegeterianOnly || this.filters.vegetarian) && item.vegeterian) || !(this.filters.vegeterianOnly || this.filters.vegetarian) )
    .filter(item => (this.filters.maxSpiciness >= item.spiciness) || !(this.filters.maxSpiciness) )
    .filter(item => (this.filters.category === item.category) || !(this.filters.category) );
    this.elem.innerHTML = '';
    this.render();
  }
}
