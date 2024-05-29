class Node {
  constructor(value) {
    this.value = value;
    this.leftE = null;
    this.rightE = null;
  }
}

class Tree {
  constructor(array) {
    let sortedArray = array.sort((a, b) => a - b);
    for (let i = 1; i < sortedArray.length; i++) {
      if (sortedArray[i] === sortedArray[i - 1]) {
        sortedArray.splice(i, 1);
        i--;
      }
    }
    this.root = buildTree(sortedArray);
  }
  insert(value) {
    let tmp = this.root;
    while (true) {
      if (value > tmp.value) {
        if (tmp.rightE === null) {
          tmp.rightE = new Node(value);
          return;
        }
        tmp = tmp.rightE;
      } else {
        if (tmp.leftE === null) {
          tmp.leftE = new Node(value);
          return;
        }
        tmp = tmp.leftE;
      }
    }
  }
  deleteValue(value) {
    // find parent of the value
    let node = this.findValue(value);
    // no children
    if (node.rightE === null && node.leftE === null) {
      node = null;
      return;
    }
    // one child
    if (node.rightE === null || node.leftE === null) {
      if (node.rightE === null) {
        node = node.leftE;
        return;
      } else {
        node = node.rightE;
        return;
      }
    } else {
      // two child (Find inorder successor)
      let tmp = node.rightE; // right branch
      while (tmp.leftE !== null) {
        tmp = tmp.leftE; // find lowest number
      }
      // invert branch of lowest number and replace it as the root of the change
      tmp.rightE = tmp.leftE;
      tmp.leftE = null;
      node = tmp;
    }
  }
  findValue(value) {
    let tmp = this.root;
    while (tmp !== null) {
      if (value === tmp.value) return tmp;
      else if (value > tmp.value) tmp = tmp.rightE;
      else if (value < tmp.value) tmp = tmp.leftE;
    }
    return console.log("not found");
  }
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) {
    return null;
  }
  let mid = parseInt((start + end) / 2);
  let node = new Node(arr[mid]);
  node.leftE = buildTree(arr, start, mid - 1);
  node.rightE = buildTree(arr, mid + 1, end);

  return node;
}

var arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let node = new Tree(arr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightE !== null) {
    prettyPrint(node.rightE, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftE !== null) {
    prettyPrint(node.leftE, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
console.log(node.deleteValue(4));
prettyPrint(node.root);
