//eg1. 给定一个递增的正整数序列a和一个正整数M，求序列中不同位置的数a和b，是的它们的和恰好为M，输出所有满足条件的方案。
function sumEqualM(a, m) {
  if (!a || !m) {
    return []
  }
  a = a || []
  var i = 0
  var j = a.length-1
  let result = []
  while (i < j) {
    if (a[i] + a[j] === m) {
      result.push([a[i], a[j]])
      i++
      j--
    } else if (a[i] + a[j] > m) {
      j--
    } else if (a[i] + a[j] < m) {
      i++
    }
  }
  return result
}

//找出有序数组中两数和为m的所有解
function testSumEqualM() {
  let a = [1, 2,3,4,5,7,8,8,8,9,9,9,10,11]
  let rs = sumEqualM(a, 8) 
  let i = 0
  while (i < rs.length) {
    let value = rs[i++]
    console.log(value[0], '', value[1])
  }
}

// eg3. PAT B1030 完美数列
/* https://www.cnblogs.com/zle1992/p/5969295.html
给定一个正整数数列，和正整数p，设这个数列中的最大值是M，最小值是m，如果M <= m * p，则称这个数列是完美数列。

现在给定参数p和一些正整数，请你从中选择尽可能多的数构成一个完美数列。

输入格式：

输入第一行给出两个正整数N和p，其中N（<= 105）是输入的正整数的个数，p（<= 109）是给定的参数。第二行给出N个正整数，每个数不超过109。

输出格式：

在一行中输出最多可以选择多少个数可以用它们组成一个完美数列。

输入样例：
10 8
2 3 20 4 5 1 6 7 8 9
输出样例：
8
*/

function perfectArray(a, len, p) {
  if (!a || len === 0 || !p) {
    return 0
  }
  

}

function testtwopoint() {
  testSumEqualM()
}