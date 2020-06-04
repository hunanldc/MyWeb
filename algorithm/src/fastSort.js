function testFastSortMain() {
  let arr = [12,13,15,17,4,5,6,3,1,9,7,20,13,14]
  sortTest('快速排序测试', arr, fastSort)
}

function sortTest(label,arr,sort) {
  console.log(label)
  console.log('排序前：',arr)
  sort(arr)
  console.log('排序后：', arr)
}

//升序
function fastSort(arr) {
  if (!arr) {
    return
  } else {
    innerFastSort(arr, 0, arr.length)
  }
}

function innerFastSort(arr, start, len) {
  if (len <= 1) {
    //长度为小于1
    return
  } else {
    //排序 start 至 start+len
    let ref = start
    let left = start
    let right = start+len-1
    while (left < right) {
      //从右边找小于ref的节点，与ref交换
      while(left < right && arr[right] >= arr[ref]) {
        right--
      }
      if (left < right && arr[right] < arr[ref]) {
        swap(arr, ref, right)
        ref = right
      }
      while(left < right && arr[left] <= arr[ref]) {
        left++
      }
      if (left < right && arr[left] > arr[ref]) {
        swap(arr, ref, left)
        ref = left
      }
      if (left === right) {
        innerFastSort(arr, 0, left)
        innerFastSort(arr, right+1, start+len-right-1)
      } else {
        console.log('err:', left, right)
      }
    }
  }
}

function swap(arr, index0, index1) {
  let temp = arr[index0]
  arr[index0] = arr[index1]
  arr[index1] = temp
}