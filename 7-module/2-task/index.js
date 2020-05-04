import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('modal');
    let tempElem = document.createElement('div');
    tempElem.classList.add('modal__overlay');
    this.elem.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('modal__header');
    this.elem.firstChild.append(tempElem);
    tempElem = document.createElement('button');
    tempElem.type = 'button';
    tempElem.classList.add('modal__close');
    tempElem.onclick = () => {this.close();};
    this.elem.firstChild.firstChild.append(tempElem);
    tempElem = document.createElement('img');
    tempElem.src = '/assets/images/icons/cross-icon.svg';
    tempElem.alt = 'close-icon';
    this.elem.firstChild.firstChild.firstChild.append(tempElem);
    tempElem = document.createElement('h3');
    tempElem.classList.add('modal__title');
    this.elem.firstChild.firstChild.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('modal__body');
    this.elem.firstChild.append(tempElem);
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') { this.close();}      
    });
  }

  open () {
    if (document.body.classList.contains('is-modal-open')) {return;}
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle (titleText) {
    this.elem.querySelector('.modal__title').innerHTML = titleText;
  }

  setBody (bodyText) {
    this.elem.querySelector('.modal__body').append(bodyText);
  }

  close () {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
  }
}
