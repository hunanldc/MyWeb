function testtreesort() {
  console.log('排序测试')
  let arr = [3,5,6,2,1,8,9]
  console.log('排序前：', arr)
  let heap = createHeap(arr)
  console.log('创建堆：', heap)
  let result = heapSort(heap)
  console.log('排序后：', result)
}

// 堆排序 小顶堆 n 从0开始
let heap = [] //堆

function createHeap(arr) {
  let i = 0
  while(i < arr.length) {
    //
    heap.push(arr[i]) //在末尾添加元素
    //向上调整，找到父节点index，调整
    let index = fatherIndex(i) //eg: 1/2 = 0
    let rs = ajustNode(heap, index)
    while(rs != 0 && index >= 0) {
      index = fatherIndex(index) //计算父节点
      rs = ajustNode(heap, index)
    }
    i++
  }
  return heap
}

function heapSort(heap){
  let result = []
  let i = heap.length
  while(--i >= 0) {
    result.push(heap[0])
    swap(0, i)
    heap.pop()
    //向下调整
    let index = 0
    let rs = ajustNode(heap, index)
    while(rs !== 0 && index < heap.length) {
      index = (rs === -1)?leftIndex(index):rightIndex(index)
      rs = ajustNode(heap, index)
    }
  }
  return result
}

// n 从 0 开始
function ajustNode(heap, n) {  // return 0未调整 -1与左子节点调换 1与右子节点调换
  //左子节点 2n
  //右子节点 2n+1
  if (n >= heap.length) {
    return 0
  }
  let min = getLeft(heap, n)
  if (min) {
    let right = getRight(heap, n)
    if (right && right < min) {
      min = right
      if (min < heap[n]) {
        swap(rightIndex(n), n)
        return 1
      }
    }
    if (min < heap[n]) {
      swap(leftIndex(n), n)
      return -1
    }
  }
  return 0
}

// n 从 0 开始
function fatherIndex(n) {
  return n>0?Math.floor((n-1)/2):0
}

function leftIndex(n) {
  return 2*n + 1
}

function rightIndex(n) {
  return leftIndex(n) + 1
}

function hasLeft(heap, n) {
  return leftIndex(n) < heap.length
}

function hasRight(heap, n) {
  return rightIndex(n) < heap.length
}

function getLeft(heap, n) {
  if (hasLeft(heap, n)) {
    return heap[leftIndex(n)]
  }
  return null
}

function getRight(heap, n) {
  if (hasRight(heap, n)) {
    return heap[rightIndex(n)]
  }
  return null
}

function swap(index0, index1) {
  if (index0 === index1) {
    return
  }
  let temp = heap[index0]
  heap[index0] = heap[index1]
  heap[index1] = temp
}