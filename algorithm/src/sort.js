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
    let index = Math.floor(i/2) //eg: 1/2 = 0
    let rs = ajustNode(heap, index) //
    while(rs != 0 && index >= 0) {
      index = Math.floor(index/2) // 计算父节点
      rs = ajustNode(heap, index)
    }
    i++
  }
  return heap
}

function heapSort(heap){
  let result = []
  let i = heap.length
  while(i-- >= 0) {
    result.push(heap[0])
    swap(0, heap[i])
    //向下调整
    let index = 0
    let rs = ajustNode(heap, index)
    index = (rs === -1)?index*2+1:index*2+2
    while(rs !== 0) {
      rs = ajustNode(heap, index)
      index = (rs === -1)?index*2+1:index*2+2
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
        swap(2*n + 2, n)
        return 1
      }
    }
    if (min < heap[n]) {
      swap(2*n + 1, n)
      return -1
    }
  }
  return 0
}

// n 从 0 开始
function hasLeft(heap, n) {
  return 2*n + 1 < heap.length
}

function hasRight(heap, n) {
  return 2*n + 2 < heap.length
}

function getLeft(heap, n) {
  if (hasLeft(heap, n)) {
    return heap[2*n+1]
  }
  return null
}

function getRight(heap, n) {
  if (hasRight(heap, n)) {
    return heap[2*n + 2]
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