export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    let tempElem = document.createElement('div');
    tempElem.classList.add('slider__thumb');
    tempElem.style.left = (100 / steps) * value + '%';
    this.elem.append(tempElem);
    tempElem = document.createElement('span');
    tempElem.classList.add('slider__value');
    tempElem.innerHTML = value + 1;
    this.elem.firstChild.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('slider__progress');
    tempElem.style.width = (100 / steps) * value + '%';
    this.elem.append(tempElem);
    tempElem = document.createElement('div');
    tempElem.classList.add('slider__steps');
    this.elem.append(tempElem);
    for (let i = 0; i < steps; i++) {
      tempElem = document.createElement('span');
      this.elem.lastChild.append(tempElem);
    }
    this.elem.lastChild.childNodes[value].classList.add('slider__step-active');
    this.elem.addEventListener('click', (event) => {
      let tmpEl = this.elem.querySelector('.slider__thumb');
      let nPos = Math.round(((event.clientX - this.elem.getBoundingClientRect().left) / 330 * 100) / (100 / (steps - 1)));
      tmpEl.style.left = nPos * (100 / (steps - 1)) + '%';
      tmpEl = this.elem.querySelector('.slider__progress');
      tmpEl.style.width = nPos * (100 / (steps - 1)) + '%';
      tmpEl = this.elem.querySelector('.slider__value');
      tmpEl.innerHTML = nPos + 1;
      for (let elm of this.elem.lastChild.childNodes) { elm.classList.remove('slider__step-active');}
      this.elem.lastChild.childNodes[nPos].classList.add('slider__step-active');
      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: nPos,
        bubbles: true
      }));
    });
  }

}
