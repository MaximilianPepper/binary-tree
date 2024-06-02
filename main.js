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
    // Remove duplicates
    sortedArray = [...new Set(sortedArray)];
    this.root = this.buildTree(sortedArray);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);
    node.leftE = this.buildTree(arr, start, mid - 1);
    node.rightE = this.buildTree(arr, mid + 1, end);
    return node;
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

  deleteNode(root = this.root, value) {
    // Base case
    if (root === null) return root;

    // If the key to be deleted is smaller than the root's key, then it lies in the left subtree
    if (value < root.value) {
      root.leftE = this.deleteNode(root.leftE, value);
    }
    // If the key to be deleted is greater than the root's key, then it lies in the right subtree
    else if (value > root.value) {
      root.rightE = this.deleteNode(root.rightE, value);
    }
    // If key is same as root's key, then this is the node to be deleted
    else {
      // Node with only one child or no child
      if (root.leftE === null) return root.rightE;
      else if (root.rightE === null) return root.leftE;

      // Node with two children: Get the inorder successor (smallest in the right subtree)
      root.value = this.minValue(root.rightE);

      // Delete the inorder successor
      root.rightE = this.deleteNode(root.rightE, root.value);
    }
    return root;
  }

  minValue(node) {
    let current = node;
    while (current.leftE !== null) {
      current = current.leftE;
    }
    return current.value;
  }

  findValue(value) {
    let tmp = this.root;
    while (tmp !== null) {
      if (value === tmp.value) return tmp;
      else if (value > tmp.value) tmp = tmp.rightE;
      else if (value < tmp.value) tmp = tmp.leftE;
    }
    console.log("not found");
  }
  levelOrder(callback) {
    let queue = [];
    let array = [];
    let node = this.root;
    if (node === null) return array;
    queue.push(node);
    while (queue.length > 0) {
      let current = queue[0];
      array.push(current);
      queue.splice(0, 1);
      if (current.leftE !== null) queue.push(current.leftE);
      if (current.rightE !== null) queue.push(current.rightE);
    }
    if (!callback) return array.map((n) => n.value);
    else {
      return array.map(callback);
    }
  }
  preOrder(callback) {
    let node = this.root;
    let array = [];
    if (node === null) return array;
    let traverse = (callback, node) => {
      if (callback) {
        callback(node);
      } else {
        array.push(node.value);
      }
      if (node.leftE !== null) {
        traverse(callback, node.leftE);
      }
      if (node.rightE !== null) {
        traverse(callback, node.rightE);
      }
    };
    traverse(callback, node);
    return array;
  }
  inOrder(callback) {
    let node = this.root;
    let array = [];
    if (node === null) return array;
    let traverse = (callback, node) => {
      if (node.leftE !== null) {
        traverse(callback, node.leftE);
      }
      if (callback) {
        callback(node);
      } else {
        array.push(node.value);
      }
      if (node.rightE !== null) {
        traverse(callback, node.rightE);
      }
    };
    traverse(callback, node);
    return array;
  }
  postOrder(callback) {
    let node = this.root;
    let array = [];
    if (node === null) return array;
    let traverse = (callback, node) => {
      if (node.leftE !== null) {
        traverse(callback, node.leftE);
      }
      if (node.rightE !== null) {
        traverse(callback, node.rightE);
      }
      if (callback) {
        callback(node);
      } else {
        array.push(node.value);
      }
    };
    traverse(callback, node);
    return array;
  }
  nodeHeight(node) {
    if (node === null) return 0;
    else {
      let l = this.nodeHeight(node.leftE);
      let r = this.nodeHeight(node.rightE);
      if (l > r) return l + 1;
      else return r + 1;
    }
  }
  nodeDepth(node) {
    if (node === null) return 0;
    let tmp = this.root;
    let depth = 0;
    while (node.value !== tmp.value) {
      if (node.value > tmp.value) {
        tmp = tmp.rightE;
        depth++;
      } else {
        tmp = tmp.leftE;
        depth++;
      }
    }
    return depth;
  }
  isBalanced() {
    let traverse = (node) => {
      if (node == null) return { isBalanced: true, height: -1 };

      let left = traverse(node.leftE);
      let right = traverse(node.rightE);

      let isBalanced =
        left.isBalanced &&
        right.isBalanced &&
        Math.abs(left.height - right.height) <= 1;
      let height = Math.max(left.height, right.height) + 1;

      return { isBalanced: isBalanced, height: height };
    };

    return traverse(this.root).isBalanced;
  }
  rebalance() {
    let array = this.inOrder();
    this.root = this.buildTree(array);
  }
}

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

module.exports = {
  Node,
  Tree,
  prettyPrint,
};
