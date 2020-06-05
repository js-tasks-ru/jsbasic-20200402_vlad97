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

    this.elem.querySelector('.slider__thumb').addEventListener('pointerdown', function() {
      this.parentElement.classList.add('slider_dragging');
      this.ondragstart = () => false;
      
      function mouseMove() {
        moveAt(event.pageX);
      }
      function moveAt(pageX) {
        let thumb = document.querySelector('.slider__thumb');
        let progress = document.querySelector('.slider__progress');
        let countSteps = thumb.parentElement.lastChild.childNodes.length;
        let left = ((pageX - thumb.parentElement.getBoundingClientRect().left) / 330 * 100);
        
        if (left > 100) {left = 100;}
        if (left < 0) {left = 0;}
        let nPos = Math.round(left / (100 / (countSteps - 1)));
        left = left / (100 / (countSteps - 1));
        thumb.style.left = Math.round(left * (100 / (countSteps - 1))) + '%';
        progress.style.width = Math.round(left * (100 / (countSteps - 1))) + '%';
        document.querySelector('.slider__value').innerHTML = nPos + 1;
        
      }
      document.addEventListener('pointermove', mouseMove);
      document.onpointerup = function() {
        document.removeEventListener('pointermove', mouseMove);
        for (let elm of document.querySelector('.slider__steps').childNodes) { elm.classList.remove('slider__step-active');}
        let nPos = +(document.querySelector('.slider__value').innerHTML);
        document.querySelector('.slider__thumb').style.left = (nPos - 1) * (100 / (document.querySelector('.slider__steps').childNodes.length - 1)) + '%';
        document.querySelector('.slider__progress').style.width = (nPos - 1) * (100 / (document.querySelector('.slider__steps').childNodes.length - 1)) + '%';
        document.querySelector('.slider__steps').childNodes[nPos - 1].classList.add('slider__step-active');
        document.querySelector('.slider').dispatchEvent(new CustomEvent('slider-change', {
          detail: nPos - 1,
          bubbles: true
        }));
        console.log(nPos);
        document.querySelector('.slider_dragging').classList.remove('slider_dragging');
        document.onpointerup = null;
      };

    });
  }

}
