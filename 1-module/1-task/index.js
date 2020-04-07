/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let factori = 1
  for (let i=1; i<= n; i++){
    factori *= i;
  }
  return factori;
}
