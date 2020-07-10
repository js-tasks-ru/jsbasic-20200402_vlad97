import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    
    let response = await fetch('products.json');
    let allProducts = await response.json();

    this.carousel = new Carousel(slides);
    document.body.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    this.ribbonMenu = new RibbonMenu(categories);
    document.body.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    this.stepSlider = new StepSlider({steps: 5, value: 2});
    document.body.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    this.cartIcon = new CartIcon();
    document.body.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
    this.cart = new Cart(this.cartIcon);
    this.productsGrid = new ProductsGrid(allProducts);
    document.body.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.body.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.ribbonMenu.value,
    });
    document.body.addEventListener('product-add', (event) => this.cart.addProduct(allProducts[allProducts.map(item => item.id).indexOf(event.detail)]));
    document.body.querySelector('.slider').addEventListener('slider-change', (event) => this.productsGrid.updateFilter({maxSpiciness: (event.detail)}));
    document.body.querySelector('[data-ribbon-holder]').addEventListener('ribbon-select', (event) => this.productsGrid.updateFilter({ category: event.detail}));
    document.getElementById('nuts-checkbox').addEventListener('change', (event) => this.productsGrid.updateFilter({noNuts: event.target.checked}));
    document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => this.productsGrid.updateFilter({vegeterianOnly: event.target.checked}));
  }
}
