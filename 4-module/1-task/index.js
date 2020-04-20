/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let spisok = document.createElement("ul");
  for (let item of friends) {
    let punkt = document.createElement("li");
    punkt.innerHTML = `${item.firstName} ${item.lastName}`;
    spisok.append(punkt);
  }
  return spisok;
}