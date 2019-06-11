/*
Example:

Input: 5
Output:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
*/

/**
 * @param {number} numRows
 * @return {number[][]}
 */

// iteration:
var generate = function(numRows) {
  const res = [];
  for (let i = 0; i < numRows; i++) {
    const cur = [];
    if (i === 0) {
      cur.push(1);
    } else {
      const pre = res[i - 1];
      pre.forEach((num, j) => {
        j > 0 ? cur.push(pre[j] + pre[j - 1]) : cur.push(pre[j]);
      });
      cur.push(1);
    }
    res.push(cur);
  }
  return res;
};

// var generate = function(numRows) {
//   const res = [];
//   for (let i = 1; i < numRows + 1; i++) {
//     const cur = [];
//     for (let j = 0; j < i; j++) {
//       if (j < 1 || j > i - 2) {
//         cur.push(1);
//       } else {
//         cur.push(res[i-2][j-1] + res[i-2][j])
//       }
//     }
//     res.push(cur);
//   }
//   return res;
// };

// recursion:
var generate = function(numRows) {
  if (numRows === 0) return [];

  var res = generate(numRows - 1);

  res.push(generateRow(numRows));

  return res;
};

var generateRow = function(numRows) {
  if (numRows === 1) return [1];

  const res = [1];
  generateRow(numRows - 1).forEach((num, i, arr) => {
    if (i > 0) {
      res.push(arr[i] + arr[i - 1]);
    }
  })
  res.push(1);
  return res;
}