function testBinarySearchMain() {
  testListRevert()
  // let result =  permute([2,1,3])
  // console.log(result)
  // let arr = [12,13,15,17,4,5,6,3,1,9,7,20,13,14]
  // fastSort(arr)
  // console.log('被查对象：', arr)
  // console.log('查找：',1, findIndex(arr,1))
  // console.log('查找：',4, findIndex(arr,4))
  // console.log('查找：',5, findIndex(arr,5))
  // console.log('查找：',6, findIndex(arr,6))
  // console.log('查找：',7, findIndex(arr,7))
  // console.log('查找：',20, findIndex(arr,20))
}


function ListNode(val) {
    this.val = val;
    this.next = null;
}

function testListRevert() {
  let list = new ListNode(1)
  let point = list
  for (let i = 2; i<=5; i++) {
    point.next = new ListNode(i)
    point = point.next
  }
  console.log(list)
  reverseList(list)
}

var reverseList = function(head) {
  console.log(head)
  let next = head.next
  while(next) {
    let cur = next
    next = cur.next
    cur.next = head
    head = cur
  }
  console.log('result:', head)
  return head
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  nums.sort()
  console.log(nums)
  return newPermutation(nums)
};

function newPermutation(nums) {
  if (nums.length === 1) {
      return [nums]
  } else {
      let len = nums.length-1
      let number = [nums]
      while (--len >= 0) { //待加入的下标 --len
          let count = number.length 
          while(--count >= 0) {
              let baseItem = number[count]
              for (let i = len+1; i < baseItem.length; i++) {
                  let newItem = [...baseItem]
                  swap(newItem, len, i)
                  number.push(newItem)
              }
          }
      }
      return number
  }
}

function innerPermutation(nums, start, end) {
  if ( start === end || nums.length <= 1 ) {
      return [nums]
  } else {
      let result = innerPermutation(nums, start+1, end)
      if (result && result.length > 0) {
        let tempArr = []
        for (let i = 0; i < result.length; i++) {
            let item = result[i]
            for (let j = start+1; j<item.length; j++) {
                let newItem = [...item]
                swap(newItem, start, j)
                tempArr.push(newItem)
            }
        }
        result.push(...tempArr)
        return result
      } else {
        return []
      }
  }
}

function swap(arr, index0, index1) {
  let temp = arr[index0]
  arr[index0] = arr[index1]
  arr[index1] = temp
}

function findIndex(arr, value) {
  return binarySearch(arr, 0, arr.length, value)
}

//二分查找
function binarySearch(arr, start, len, value) {
  if (len <= 0) {
    return null
  } else if (len === 1) {
    return arr[start] === value ? start : null
  }
  let mid = start + Math.floor(len/2)
  if (arr[mid] === value) {
    return mid
  } else if (arr[mid] < value) {
    return binarySearch(arr, mid+1, start+len-mid-1, value)
  } else if (arr[mid] > value) {
    return binarySearch(arr, start, mid-start, value)
  }
}


