import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.cartItems = []; // [product: {...}, count: N]
    this.addEventListeners();
  }

  addProduct(product) {
    let n = -1;
    if (this.cartItems.length > 0) {this.cartItems.forEach((item, index, array)=>{ if (item.product.name === product.name) { n = index;}});}
    if (n < 0) {this.cartItems.push({'product': product, 'count': 1});}
    else {this.cartItems[n].count++;}
    this.onProductUpdate();
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index, array) =>{
      if (item.product.name.toLowerCase().split(' ').join('-') == productId) { item.count += amount;}
    });
    this.cartItems = this.cartItems.filter((item)=> item.count > 0);
    this.onProductUpdate();
  }

  isEmpty() {
    if (this.getTotalCount() === 0) {return true;}
    else {return false;}
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach((item) => {totalCount += item.count;});
    return totalCount;
  }

  getTotalPrice() {
    let itogo = 0;
    this.cartItems.forEach((item)=>{itogo += item.product.price * item.count;});
    return itogo;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let rootElem = document.createElement('div');
    rootElem.classList.add('modal');
    let tempElem = document.createElement('div');
    tempElem.classList.add('modal__overlay');
    rootElem.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('modal__inner');
    rootElem.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('modal__header');
    rootElem.lastChild.append(tempElem);
    tempElem = document.createElement('button');
    tempElem.type = 'button';
    tempElem.classList.add('modal__close');
    tempElem.onclick = () => {rootElem.remove(); document.body.classList.remove('is-modal-open');};
    rootElem.lastChild.firstChild.append(tempElem);
    tempElem = document.createElement('img');
    tempElem.src = '/assets/images/icons/cross-icon.svg';
    tempElem.alt = 'close-icon';
    rootElem.lastChild.firstChild.firstChild.append(tempElem);
    tempElem = document.createElement('h3');
    tempElem.classList.add('modal__title');
    tempElem.innerHTML = 'Your order';
    rootElem.lastChild.firstChild.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('modal__body');
    rootElem.lastChild.append(tempElem);    
    for (let i = 0; i < this.cartItems.length; i++) {
      tempElem = this.renderProduct(this.cartItems[i].product, this.cartItems[i].count);
      rootElem.lastChild.lastChild.append(tempElem);
    };
    tempElem = this.renderOrderForm();
    rootElem.lastChild.lastChild.append(tempElem);
    rootElem.addEventListener('click', (event) => {
      if (event.target.closest('.cart-counter__button')) {
        if (event.target.closest('.cart-counter__button').classList.contains('cart-counter__button_minus')) 
        { this.updateProductCount(event.target.closest('.cart-product').dataset.productId, -1)}
        else { this.updateProductCount(event.target.closest('.cart-product').dataset.productId, 1)};
      }
    });
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { rootElem.remove(); document.body.classList.remove('is-modal-open');}      
    });
    document.body.append(rootElem);
    document.body.classList.add('is-modal-open');
    document.body.querySelector('.cart-form').onsubmit = () => {this.onSubmit(event)};
  }

  onProductUpdate() {
    this.cartIcon.update(this);
    if (document.body.classList.contains('is-modal-open')) {
      let cartColection = document.body.querySelectorAll('.cart-product');
      let indexId;
      for (let i = 0; i < cartColection.length; i++) {
        indexId = this.cartItems.map(item => item.product.id).indexOf(cartColection[i].dataset.productId);
        if (indexId < 0) {cartColection[i].remove()}
        else {cartColection[i].querySelector('.cart-product__price').innerHTML = `€${(this.cartItems[indexId].product.price * this.cartItems[indexId].count).toFixed(2)}`;
          cartColection[i].querySelector('.cart-counter__count').innerHTML = this.cartItems[indexId].count;}
        
      }
      document.body.querySelector(`.cart-buttons__info-price`).innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      cartColection = document.body.querySelectorAll('.cart-product');
      if (cartColection.length == 0) {document.body.querySelector('.modal').remove(); document.body.classList.remove('is-modal-open');}
    }
   
  }

  async onSubmit(event) {
    event.preventDefault();
    document.body.querySelector('button[type="submit"]').classList.add('is-loading');
    let formData = new FormData(document.body.querySelector('.cart-form'));
    let response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      document.body.querySelector('.modal__title').innerHTML = 'Success!';
      this.cartItems=[];
      document.body.querySelector('.modal__body').innerHTML = `<div class="modal__body-inner">
      <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
      </p>
      </div>`;
      this.cartIcon.update(this);
    }
    
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

