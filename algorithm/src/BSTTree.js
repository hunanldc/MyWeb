function BSTNode(value, left, right) {
  this.value = value
  this.left = left
  this.right = right
}

function bsttreeMain() {
  let tree = createBSTTree([6,7,8,1,2,3,4,5,8,9,10])
  let node5 = new BSTNode(5)
  let find5 = findNode(tree, node5)
  midSearch(tree)
  // firstSearch(tree)
  console.log('删除前：', tree, find5)
  deleteNode(tree, find5)
  console.log('删除5后：', tree)
  midSearch(tree)
  // firstSearch(tree)
  deleteNode(tree, tree)
  console.log('删除root后：', tree)
  midSearch(tree)
  // firstSearch(tree)
}

function createBSTTree(nodeValues) {
  //创建树
  nodeValues = nodeValues || []
  let root = null
  for (index in nodeValues) {
    root = insertNode(root, new BSTNode(nodeValues[index]))
  }
  return root
}

function insertNode(root, node) {
  //插入节点
  if (!root) {
    root = node
  } else if (node.value < root.value) {
    root.left = insertNode(root.left, node)
  } else if (node.value > root.value) {
    root.right = insertNode(root.right, node)
  } else if (node.value === root.value) {
    //不再重复插入
    return root
  }
  return root
}

function findNode(root, node) {
  //查找对应节点
  if (!root || !node) {
    return null
  }
  if (node.value === root.value) {
    return root
  } else if (node.value < root.value) {
    return findNode(root.left, node)
  } else if (node.value > root.value) {
    return findNode(root.right, node)
  }
}

function findParentOfNode(root, node) {
  if (!root || !node || root.value === node.value) {
    return null
  }
  if (root.left === node || root.right === node) {
    return root
  } else {
    return findParentOfNode(root.left, node) || findParentOfNode(root.right, node)
  }
}

/*****************使用直接替换value的节点删除方式*******************/
function deleteNode(root, node) {
  //删除节点
  if (!root || !node) {
    return
  }
  let deleteNode = findNode(root, node)
  if (!deleteNode.left && !deleteNode.right) {
    //找到父节点
    let parent = findParentOfNode(root, node)
    if (parent.left === deleteNode) {
      parent.left = null
    } else {
      parent.right = null
    }
  } else if (deleteNode.left) {
    //有左子节点，也可能有右子节点
    //找左子树的最右节点
    let LTRNode = deleteNode.left
    //找最右节点的父节点
    LTRFNode = deleteNode
    while(LTRNode.right) {
      LTRFNode = LTRNode
      LTRNode = LTRNode.right
    }
    //最右节点，一定没有右子节点，可能有左子节点
    LTRFNode.left = LTRNode.left
    //用左子树最右节点替代被删节点
    deleteNode.value = LTRNode.value
    //删除左子树最右节点
    // LTRNode = null js 无法直接这样删除，必须用下面的一条语句
    LTRFNode.right = null
  } else {
    //只有右子节点或者没有子节点
    //找右子树最左节点
    let RTLNode = deleteNode.right
    //找最左节点父节点
    RTLFNode = deleteNode
    while(RTLNode.left) {
      RTLFNode = RTLNode
      RTLNode = RTLNode.left
    }
    //用最左节点代替被删节点
    deleteNode.value = RTLNode.value
    //最左节点一定没有左子节点，可能有右子节点
    RTLFNode.right = RTLNode.right
    //删除右子树最左节点
    // RTLNode = null js 无法直接这样删除，必须用下面的一条语句
    RTLFNode.left = null
  }
}

/*****************使用老的的节点删除方式*******************/
// function bsttreeMain() {
//   let tree = createBSTTree([6,7,8,1,2,3,4,5,8,9,10])
//   let node5 = new BSTNode(5)
//   let find5 = findNode(tree, node5)
//   console.log(tree, find5)
//   deleteNodeOld(tree, node5)
//   midSearch(tree)
//   console.log('删除后：', tree)
//   deleteNodeOld(tree, tree)
//   console.log('删除后：', tree)
//   midSearch(tree)
// }

function deleteNodeOld(root, node) {
  if (!root || !node) {
    return
  }
  if (node.left) {
    //有左子节点
    //找到左子树的最右节点
    let llrNode = node.left
    //找出llrNode的父节点
    let llrfNode = node
    while(llrNode.right) {
      llrfNode = llrNode
      llrNode = llrNode.right
    }
    //最右节点，只有可能有左子节点，用左子节点代替最右节点
    llrfNode.right = llrNode.left
    llrNode.left = node.left
    llrNode.right = node.right
    //找出node的父节点
    let fNode = findParentOfNode(root, node)
    //用最右子节点代替被删节点
    if (fNode) {
      if (fNode.left === node) {
        fNode.left = llrNode
      } else {
        fNode.right = llrNode
      }
    } else if (root === node) {
      root = llrNode
    } 
  } else if (node.right) {
    //只有右子节点，用右子节点代替当前节点
    //找出node的父节点
    let fNode = findParentOfNode(root, node)
    if (fNode) {
      if (fNode.left === node) {
        fNode.left = node.right
      } else {
        fNode.right = node.right
      }
    } else if (root === node) {
      root = node.right
    }
  } else {
    //都没有
    node = null
  }
  return root
}

/***************树搜索*****************/

//中序遍历
function midSearch(root) {
  if (root.left) {
    midSearch(root.left)
  }
  console.log(root.value)
  if (root.right) {
    midSearch(root.right)
  }
}

//先序遍历
function firstSearch(root) {
  if (!root) {
    return
  }
  console.log(root.value)
  firstSearch(root.left)
  firstSearch(root.right)
}