function dfSearch1(node) {
    const stack = []
    stack.push(node)
    while(stack.length !== 0) {
        const current = stack.pop()
        if (current.right !== undefined) {
            stack.push(current.right)
        }
        if (current.left !== undefined) {
            stack.push(current.left)
        }
        console.log(current)
    }
    return stack
}

function dfRecursionSearch(node) {
    if (!node) {
        return
    }
    console.log(node)
    if (node.left) {
        dfRecursionSearch(node.left)
    }
    if (node.right) {
        dfRecursionSearch(node.right)
    }
}