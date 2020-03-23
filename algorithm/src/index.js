
function createTestTree() {
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

const myTree = createTestTree()
//广度优先搜索
// bfSearch(myTree)
// bfRecursionSearch(myTree)
//深度优先搜索
// dfSearch1(myTree)
// dfRecursionSearch(myTree)
