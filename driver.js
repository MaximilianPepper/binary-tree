const { Node, Tree, prettyPrint } = require("./main.js");
// driver script
const arrSize = 15;
function generateArr() {
  let arr = new Array(arrSize);
  for (let i = 0; i < arrSize; i++) {
    arr[i] = Math.round(Math.random() * 100);
  }
  return arr;
}
const arr = generateArr();
let tree = new Tree(arr);
console.log("Driver Script\n");
prettyPrint(tree.root);
console.log("Is the tree balanced?");
console.log(tree.isBalanced());
console.log("\n\n");
// unbalacing tree
tree.insert(300);
tree.insert(222);
tree.insert(236);
tree.insert(244);
prettyPrint(tree.root);
console.log("Is the tree balanced?");
console.log(tree.isBalanced());
console.log("\n\n");
tree.rebalance();
console.log("Rebalancing tree\n");
prettyPrint(tree.root);
console.log("Is the tree balanced?");
console.log(tree.isBalanced());
console.log("\n\n");

var level = tree.levelOrder();
var pre = tree.preOrder();
var post = tree.postOrder();
var inO = tree.inOrder();
console.log("Printing Elements:");
console.log("Level order: " + level);
console.log("Pre order: " + pre);
console.log("Post order: " + post);
console.log("In order: " + inO);
