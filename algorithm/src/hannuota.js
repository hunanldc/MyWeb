
function HNTStack (name, stack) {
  this.name = name
  this.stack = stack
}

function hannuotaMain() {
  console.log('汉诺塔...')
  let stackA = new HNTStack('A', [5,4,3,2,1,0])
  let stackB = new HNTStack('B', [])
  let stackC = new HNTStack('C', [])
  console.log('移动前：',stackA, stackB, stackC)
  hntMove(stackA, stackB, stackC, 6)
  console.log('移动后：',stackA, stackB, stackC)
}

//A 0 1 B C
function hntMove(stackA, stackB, stackC, length) {
  if (!length || length === 0) {
    return
  } else if (length === 1) {
    let node = stackA.stack.pop()
    stackC.stack.push(node)
    console.log('移动：', stackA.name,'->', stackC.name,':',node)
  } else {
    hntMove(stackA, stackC, stackB, length - 1)
    hntMove(stackA, stackB, stackC, 1)
    hntMove(stackB, stackA, stackC, length - 1)
  }
}
