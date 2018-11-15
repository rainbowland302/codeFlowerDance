/*
Example 1:

Input: A = "this apple is sweet", B = "this apple is sour"
Output: ["sweet","sour"]
Example 2:

Input: A = "apple apple", B = "banana"
Output: ["banana"]
*/

/**
 * @param {string} A
 * @param {string} B
 * @return {string[]}
 */
var uncommonFromSentences = function(A, B) {
  const arr = A.split(' ').concat(B.split(' '));
  const map = {};
  const res = [];
  arr.forEach(a => {
    if(map[a]) {
      map[a] += 1;
    } else {
      map[a] = 1
    }
  });
  for(let key in map) {
    if(map[key] === 1) {
      res.push(key);
    }
  }
  return res;
};
