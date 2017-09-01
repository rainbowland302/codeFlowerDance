import {
  arrayToTree,
  treeToArray,
  arrayToLink,
  linkToArray
} from './utils';
import longestCommonPrefix from './longestCommonPrefix';
import numberComplement from './numberComplement';
import findRelativeRanks from './relativeRank';
import firstUniqChar from './firstUniqueCharacter';
import sumNestedArray from './sumNestedArray';
import possibleBinary from './possibleBinary';
import mergeTrees from './mergeTrees';
import islandPerimeter from './islandPerimeter';
import MyQueue from './stackToQueue';
import MyStack from './queueToStack';
import numberDisappeared from './numberDisappeared';
import permutation from './permutation';
import diameterOfBinaryTree from './diameterTree';
import generateParenthesis from './parenthesis';
import reverseWords from './reverseWords';
import convertBST from './convertBST';
import isSubtree from './isSubtree';
import isPalindrome from './isPalindromeLink';
import getIntersectionNode from './linkIntersection';

describe("leetcode", function () {
  it("longest common prefix", function () {
    expect(longestCommonPrefix(["whose", "what", "wh"])).toEqual('wh');
    expect(longestCommonPrefix(["loo", "loa", "lob"])).toEqual('lo');
    expect(longestCommonPrefix(["a", "", "b"])).toEqual('');
  });

  it("number complement", function () {
    expect(numberComplement(5)).toBe(2);
    expect(numberComplement(1)).toBe(0);
    expect(numberComplement(16)).toBe(15);
  });

  it("relative rank", function () {
    const arr = [10, 3, 8, 9, 4];
    const exp = ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"];
    expect(findRelativeRanks(arr)).toEqual(exp);
  });

  it("first unique character", function () {
    expect(firstUniqChar('loveleetcode')).toBe(2);
    expect(firstUniqChar('lool')).toBe(-1);
  });

  it("sum nested array", function () {
    const nestedArr = [1, [2, 3],
      [4, [5, [6],
        [7]
      ]]
    ];
    expect(sumNestedArray([])).toBe(0);
    expect(sumNestedArray(nestedArr)).toBe(28);
  });

  it("possible binary combination", function () {
    const exp3 = ["110", "010", "100", "000", "111", "011", "101", "001"];
    const exp2 = ["10", "00", "11", "01"];
    expect(possibleBinary(3).length).toBe(exp3.length);
    expect(possibleBinary(3)).toEqual(jasmine.arrayContaining(exp3));
    expect(possibleBinary(2).length).toBe(exp2.length);
    expect(possibleBinary(2)).toEqual(jasmine.arrayContaining(exp2));
  });

  it("merge trees", function () {
    const t1 = arrayToTree([1, 2, 3, 4, 5, 6, 7]);
    const t2 = arrayToTree([1, 2, 3, 4, 5, 6, 7]);
    const t3 = arrayToTree([2, 4, 6, 8, 10, 12, 14]);
    const res = treeToArray(mergeTrees(t1, t2));
    const exp = treeToArray(t3);
    expect(res.length).toEqual(exp.length);
    expect(res).toEqual(jasmine.arrayContaining(exp));
  });

  it("island perimeter", function () {
    const island = [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0]
    ]
    expect(islandPerimeter(island)).toEqual(16);
  });

  it("stack to queue", function () {
    let queue = new MyQueue();
    expect(queue.empty()).toEqual(true);
    queue.push(1);
    queue.push(2);
    queue.push(3);
    expect(queue.empty()).toEqual(false);
    expect(queue.pop()).toEqual(1);
    expect(queue.peek()).toEqual(2);
    expect(queue.pop()).toEqual(2);
    expect(queue.pop()).toEqual(3);
  });

  it("queue to stack", function () {
    let stack = new MyStack();
    expect(stack.empty()).toEqual(true);
    stack.push(3);
    stack.push(2);
    expect(stack.empty()).toEqual(false);
    expect(stack.pop()).toEqual(2);
    expect(stack.top()).toEqual(3);
    stack.push(1);
    expect(stack.top()).toEqual(1);
    expect(stack.pop()).toEqual(1);
    expect(stack.pop()).toEqual(3);
  });

  it("number disappeared", function () {
    expect(numberDisappeared([4, 3, 2, 7, 8, 2, 3, 1])).toEqual([5, 6]);
  });

  it("permutation", function () {
    const permutes = [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1]
    ];
    expect(permutation([1, 2, 3])).toEqual(jasmine.arrayContaining(permutes));
  });

  it("diameter of tree", function () {
    const tree = arrayToTree([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(diameterOfBinaryTree(tree)).toEqual(5);
  });

  it("generate all possible parenthesis", function () {
    expect(generateParenthesis(1)).toEqual(["()"]);
    expect(generateParenthesis(2)).toEqual(["(())", "()()"]);
    expect(generateParenthesis(3)).toEqual(["((()))", "(()())", "(())()", "()(())", "()()()"]);
  });

  it("reverse only letter in word", function () {
    expect(reverseWords("Let's take LeetCode contest")).toEqual("s'teL ekat edoCteeL tsetnoc");
  });

  it("convert BST to great tree", function () {
    const srcTree = arrayToTree([4, 2, 6, 1, 3, 5, 7]);
    const tarTree = arrayToTree([22, 27, 13, 28, 25, 18, 7])
    expect(treeToArray(convertBST(srcTree))).toEqual(treeToArray(tarTree));
  })


  it("is substree", function () {
    const tree = arrayToTree([4, 2, 6, 1, 3, 5, 7, 8]);
    const subtree = arrayToTree([6, 5, 7]);
    const nonSubtree = arrayToTree([2, 1, 3]);
    expect(isSubtree(tree, subtree)).toEqual(true);
    expect(isSubtree(tree, nonSubtree)).toEqual(false);
  })

  it("is palindrome link", function () {
    const link1 = arrayToLink([1, 2, 3, 2, 1]);
    const link2 = arrayToLink([1, 2, 3, 3, 2, 1]);
    const link3 = arrayToLink([1, 2, 3, 4, 2, 1]);
    expect(isPalindrome(link1)).toEqual(true);
    expect(isPalindrome(link2)).toEqual(true);
    expect(isPalindrome(link3)).toEqual(false);
  })

  it("get link intersection", function () {
    const link1 = arrayToLink([1, 2, 3]);
    const link2 = arrayToLink([1, 2]);
    const link3 = arrayToLink([4, 5]);
    const link4 = arrayToLink([6, 7]);
    expect(linkToArray(link1.add(link3))).toEqual([1,2,3,4,5]);
    expect(linkToArray(link2.add(link3))).toEqual([1,2,4,5]);
    expect(getIntersectionNode(link1, link2)).toEqual(link3);
    expect(getIntersectionNode(link1, link3)).toEqual(link3);
    expect(getIntersectionNode(link2, link3)).toEqual(link3);
    expect(getIntersectionNode(link1, link4)).toEqual(null);
  })
});
