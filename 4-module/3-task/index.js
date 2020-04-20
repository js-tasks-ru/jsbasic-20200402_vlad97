/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  for (let row of table.rows) {
    if (row.cells[3].dataset.available === undefined) {row.setAttribute('hidden', '');}
    else {
      (row.cells[3].dataset.available == 'true') ? row.classList.add(`available`) : row.classList.add(`unavailable`);}
        
    row.cells[2].innerHTML === 'm' && row.classList.add(`male`);
    row.cells[2].innerHTML === 'f' && row.classList.add(`female`);
        
    if (parseInt(row.cells[1].innerHTML) < 18) {row.style.cssText = "text-decoration: line-through";}
  }   
}
