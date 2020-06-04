function testBinarySearchMain() {
  let arr = [12,13,15,17,4,5,6,3,1,9,7,20,13,14]
  fastSort(arr)
  console.log('被查对象：', arr)
  console.log('查找：',1, findIndex(arr,1))
  console.log('查找：',4, findIndex(arr,4))
  console.log('查找：',5, findIndex(arr,5))
  console.log('查找：',6, findIndex(arr,6))
  console.log('查找：',7, findIndex(arr,7))
  console.log('查找：',20, findIndex(arr,20))
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