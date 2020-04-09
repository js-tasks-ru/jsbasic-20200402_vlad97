/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
 return (str.toLowerCase().includes('xxx') || str.toLowerCase().includes('1xbet')) ? true : false;
}
