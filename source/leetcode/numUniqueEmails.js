/*
Input: ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
Output: 2
Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails

*/

/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function(emails) {
  return new Set(
    emails.map(str => {
      let [local, domain] = str.split('@');
      local = local.split('+')[0].replace(/\./g, '');
      return `${local}@${domain}`;
    })
  ).size;
};