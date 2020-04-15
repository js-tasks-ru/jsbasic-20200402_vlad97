/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let arrMinMax = str.split(',').join(' ').split(' ').filter(item => parseFloat(item)).map(item => parseFloat(item)).sort((a, b) => a-b).filter((item, index, arr) => (index == 0 || index == (arr.length-1)));
  return {min: arrMinMax[0], max: arrMinMax[1]};
}
