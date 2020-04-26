function hideSelf() {
  let elements = document.getElementsByClassName('hide-self-button');
  for (let elem of elements) {
    elem.addEventListener( "click", () => event.currentTarget.setAttribute('hidden', ''));
  }
}
