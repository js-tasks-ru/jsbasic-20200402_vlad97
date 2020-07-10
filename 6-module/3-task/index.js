import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    let tempElem = document.createElement('div');
    tempElem.classList.add('carousel__arrow');
    tempElem.classList.add('carousel__arrow_right');
    this.elem.append(tempElem);
    tempElem = document.createElement('img');
    tempElem.src = '/assets/images/icons/angle-icon.svg';
    tempElem.alt = 'icon';
    this.elem.lastChild.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('carousel__arrow');
    tempElem.classList.add('carousel__arrow_left');
    this.elem.append(tempElem);
    tempElem = document.createElement('img');
    tempElem.src = '/assets/images/icons/angle-left-icon.svg';
    tempElem.alt = 'icon';
    this.elem.lastChild.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('carousel__inner');
    this.elem.append(tempElem);
    for (let slide of slides) {
      tempElem = document.createElement('div');
      tempElem.classList.add('carousel__slide');
      tempElem.dataset.id = slide.name;
      this.elem.lastChild.append(tempElem);
      tempElem = document.createElement('img');
      tempElem.src = '/assets/images/carousel/' + slide.image;
      tempElem.classList.add('carousel__image');
      tempElem.alt = 'slide';
      this.elem.lastChild.lastChild.append(tempElem);
      tempElem = document.createElement('div');
      tempElem.classList.add('carousel__caption');
      this.elem.lastChild.lastChild.append(tempElem);
      tempElem = document.createElement('span');
      tempElem.classList.add('carousel__price');
      tempElem.innerHTML = '&euro;' + (slide.price).toFixed(2);
      this.elem.lastChild.lastChild.lastChild.append(tempElem);
      tempElem = document.createElement('div');
      tempElem.classList.add('carousel__title');
      tempElem.innerHTML = slide.name;
      this.elem.lastChild.lastChild.lastChild.append(tempElem);
      tempElem = document.createElement('button');
      tempElem.type = 'button';
      tempElem.classList.add('carousel__button');
      tempElem.onclick = () => {
        let event = new CustomEvent("product-add", {detail: slide.id, bubbles: true});  
        this.elem.dispatchEvent(event);
      };
      this.elem.lastChild.lastChild.lastChild.append(tempElem);
      tempElem = document.createElement('img');
      tempElem.src = '/assets/images/icons/plus-icon.svg';
      tempElem. alt = 'icon';
      this.elem.lastChild.lastChild.lastChild.lastChild.append(tempElem);
    }
    let currentItem = 0;
    let currentPosition = 0;
    let elemCarusel = this.elem.querySelector(".carousel__inner");
    let elemSlide = this.elem.querySelector(".carousel__slide");
    this.elem.querySelector(".carousel__arrow_right").addEventListener('click', () => {
      currentPosition += elemCarusel.offsetWidth;
      currentItem++;
      elemCarusel.style.transform = 'translateX(-' + currentPosition + 'px)'; 
    });
    this.elem.querySelector(".carousel__arrow_left").addEventListener('click', () => {
      currentPosition -= elemCarusel.offsetWidth;
      currentItem--;
      elemCarusel.style.transform = 'translateX(-' + currentPosition + 'px)';
    });
    this.elem.querySelector(".carousel__arrow_left").addEventListener('click', showHideButton);
    this.elem.querySelector(".carousel__arrow_right").addEventListener('click', showHideButton);
    this.elem.querySelector(".carousel__arrow_left").style.display = 'none';
    function showHideButton() {
      document.querySelector(".carousel__arrow_left").style.display = '';
      document.querySelector(".carousel__arrow_right").style.display = '';
      if (this == document.querySelector(".carousel__arrow_right") && currentItem >= (slides.length - 1)) {this.style.display = 'none';}
      if (this == document.querySelector(".carousel__arrow_left") && currentItem <= 0) {this.style.display = 'none';}
    }
  }
}