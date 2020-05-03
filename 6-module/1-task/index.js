/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.elem.append(document.createElement('tbody'));
    rows.forEach((item)=>{
      let row = document.createElement('tr');
      row.innerHTML = `<td>${item.name}</td><td>${item.age}</td><td>${item.salary}</td><td>${item.city}</td><td><button class="deleteButton">X</button></td>`;
      this.elem.firstChild.append(row);
    });
    for (let btn of this.elem.querySelectorAll('.deleteButton')) {
      btn.onclick = function() {
        let el = event.currentTarget;
        el.closest('tr').remove();
      };
    }
  
  }
  
}
