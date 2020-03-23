//先根遍历 前序遍历
function mfRecursionTravel(node) {
    if (!node || !(node instanceof Node)) {
        return
    }
    console.log(node)
    if (!!node.left) {
        mfRecursionTravel(node.left)
    }
    if (!!node.right) {
        mfRecursionTravel(node.right)
    }
}

function mfTravel(node) {
    if (!node || !(node instanceof Node)) {
        return
    }
    const stack = []
    stack.push(node)
    while (stack.length > 0) {
        node = stack.pop()
        console.log(node)
        if (!!node.right) {
            stack.push(node.right)
        }
        if (!!node.left) {
            stack.push(node.left)
        }
    }
}

//中序遍历
function ffRecursionTravel(node) {
    if (!node || !(node instanceof Node)) {
        return
    }
    if (!!node.left) {
        ffRecursionTravel(node.left)
    }
    console.log(node)
    if (!!node.right) {
        ffRecursionTravel(node.right)
    }
}

function ffTravel(node) {
    if (!node || !(node instanceof Node)) {
        return
    }
    //标记所有子树的根(中间)节点
    const centerMap = {}

    const stack = []
    stack.push(node) 
    while (stack.length > 0) {
        node = stack.pop()
        //根(中间)节点，直接输出，不再重复入栈其左右子节点
        if (!!centerMap[node.value]) {
            console.log(node)
            continue
        }
        //入栈顺序(右中左)与出栈顺序(左中右)相反
        if (!!node.right) {
            stack.push(node.right)
        }
        if (!!node.left) {
            stack.push(node)
            centerMap[node.value] = node
            stack.push(node.left)
        } else {
            console.log(node)
        }
    }
}

//后序遍历 左右中
function lfRecursionTravel(node) {
    if (!node || !(node instanceof Node)) {
        return
    }
    if (!!node.left) {
        lfRecursionTravel(node.left)
    }
    if (!!node.right) {
        lfRecursionTravel(node.right)
    }
    console.log(node)
}

function lfTravel(node) {
    if (!node || !(node instanceof Node)) {
        return
    }
    //标记所有子树的根(中间)节点
    const centerMap = {}

    const stack = []
    stack.push(node)
    while(stack.length > 0) {
        node = stack.pop()
        if (!!centerMap[node.value]) {
            console.log(node)
            continue
        }
        stack.push(node)
        centerMap[node.value] = node
        if (!!node.right) {
             stack.push(node.right)
        }
        if (!!node.left) {
            stack.push(node.left)
        }
    }
}