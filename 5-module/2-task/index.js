function toggleText() {
  let buttons = document.getElementsByClassName('toggle-text-button');
  for (let button of buttons) {
    button.addEventListener("click", function() {
      let elem = document.getElementById('text');
      elem.hidden = !elem.hidden;
    });
  }
}
