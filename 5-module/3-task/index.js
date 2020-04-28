let currentItem = 0;
let currentPosition = 0;
let elemCarusel = document.querySelector(".carousel__inner");
let elemSlide = document.querySelector(".carousel__slide");


function initCarousel() {
  document.querySelector(".carousel__arrow_right").addEventListener('click', () => {
    currentPosition += elemCarusel.offsetWidth;
    currentItem++;
    elemCarusel.style.transform = 'translateX(-' + currentPosition + 'px)';     
  });
  document.querySelector(".carousel__arrow_left").addEventListener('click', () => {
    currentPosition -= elemCarusel.offsetWidth;
    currentItem--;
    elemCarusel.style.transform = 'translateX(-' + currentPosition + 'px)';
  });
  document.querySelector(".carousel__arrow_left").addEventListener('click', showHideButton);
  document.querySelector(".carousel__arrow_right").addEventListener('click', showHideButton);
  document.querySelector(".carousel__arrow_left").style.display = 'none';

}

function showHideButton() {
  document.querySelector(".carousel__arrow_left").style.display = '';
  document.querySelector(".carousel__arrow_right").style.display = '';
  if (this == document.querySelector(".carousel__arrow_right") && currentItem >= 3) {this.style.display = 'none';}
  if (this == document.querySelector(".carousel__arrow_left") && currentItem <= 0) {this.style.display = 'none';}
}