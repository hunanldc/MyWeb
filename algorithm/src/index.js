//链表结构二叉树
function Node(value, left, right) {
    this.value = value
    this.left = left
    this.right = right
    // console.log(this)
}

function createNodeTree() {
    const node6 = new Node('node6')
    const node7 = new Node('node7')
    const node8 = new Node('node8')
    const node9 = new Node('node9')

    const node5 = new Node('node5', node9)
    const node4 = new Node('node4', node8)
    const node3 = new Node('node3', node6, node7)
    const node2 = new Node('node2', node4, node5)
    const node1 = new Node('node1', node2, node3)
    return node1
}

const myTree = createNodeTree()
//广度优先搜索
// bfSearch(myTree)
// console.log('----')
// bfRecursionSearch(myTree)
//深度优先搜索 实际等同于 前序遍历
// dfSearch1(myTree)
// console.log('----')
// dfRecursionSearch(myTree)

// console.log('###############################')
//前序遍历
// mfRecursionTravel(myTree)
// mfTravel(myTree)
//中序遍历
// ffRecursionTravel(myTree)
// console.log('----')
// ffTravel(myTree)
//后序遍历
// lfRecursionTravel(myTree)
// console.log('-----')
// lfTravel(myTree)


//数组结构二叉树 根节点：a[n] 左子节点a[2n+1] 右子节点a[2n+2] n>=0,value>0
// function createArrayTree() {
//     const a = new Array()
//     a[0] = 1
//     a[1] = 2
//     a[2] = 3
//     a[3] = 4
//     a[4] = 5
//     a[5] = 6
//     a[6] = 7
//     a[7] = 8
//     a[8] = 0//值0表示不存在该节点
//     a[9] = 9
//     return a
// }
// const a = createArrayTree()
//数组结构存储的二叉树，感觉做搜索没有意义，顺序读取不就可以了？一定要做的话，可以参照链表二叉树，只不过是修改一下节点的表示方式



const heap = [9,8,7,6,2,3,5,4,1]
const result = []
var length = heap.length
buildSmallHeap(heap, length)
while (length > 0) {
    result.push(heap[0])
    swap(heap, 0, length-1)
    length--
    ajust(heap, 0, length)
}

var i = 0
while(i < result.length) {
    console.log(result[i++])
}

//堆排序，建堆，升序对应小顶堆，降序对应大顶堆
//eg: 升序 小顶堆
//左子节点坐标
function leftIndex(curIndex) {
    return curIndex*2 + 1
}
//右子节点坐标
function rightIndex(curIndex) {
    return curIndex*2 + 2
}

//交换
function swap(a, index1, index2) {
    const temp = a[index1]
    a[index1] = a[index2]
    a[index2] = temp
}

//1 堆调整，向下调整
function ajust(a, cur, len) {
    if (!a || !(a instanceof Array) || len === 0 || cur >= len) {
        return
    }
    if (leftIndex(cur) < len) {
        if (a[leftIndex(cur)]< a[cur]) {
            swap(a, leftIndex(cur), cur)
            ajust(a, leftIndex(cur), len)
        }
    }

    if (rightIndex(cur) < len) {
        if (a[rightIndex(cur)] < a[cur]) {
            swap(a, rightIndex(cur), cur)
            ajust(a, rightIndex(cur), len)
        }
    }
}

function getValue(a, index, len) {
    if (index < len) {
        return a[index]
    } else {
        return -1
    }
}

//2 建堆
function buildSmallHeap(a, length) {
    if (!a || !(a instanceof Array) || length === 0) {
        return
    }
    //从最底层的子树开始，向下调整，逐步升到根树
    var lastParent = Math.round((length-1)/2 -1)
    if (lastParent < 0) {
        return
    }
    while (lastParent >= 0) {
        ajust(a, lastParent--, length)
    }
}