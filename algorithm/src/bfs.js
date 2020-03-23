function bfSearch(node) {
    if (!node) {
        return
    }
    const stack = []
    stack.push(node)
    while(stack.length !== 0) {
        const cur = stack.shift()
        console.log(cur)
        if (!!cur.left) {
            stack.push(cur.left)
        }
        if (!!cur.right) {
            stack.push(cur.right)
        }
    }
}

function bfRecursionSearch(nodes) {
    if (!!nodes && nodes instanceof Node) {
        nodes = [nodes]
    }
    if (!nodes || !(nodes instanceof Array) || nodes.length === 0) {
        return
    }
    const nextNodes = []
    for (var i = 0; i<nodes.length; i++) {
        const node = nodes[i]
        console.log(node)
        if(!!node.left) {
            nextNodes.push(node.left)
        }
        if (!!node.right) {
            nextNodes.push(node.right)
        }
    }
    bfRecursionSearch(nextNodes)
}