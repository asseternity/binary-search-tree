class Node {
    constructor(value) {
        this.value = value,
        this.right = null,
        this.left = null
    }
}

class Tree {
    constructor() {
        this.root = null;
    }
    buildTree(array, start, end) {
        // base case
        if (start > end) { return null; }
        // find the middle and make it root if there is no root
        let middle = parseInt((start + end) / 2);
        let node = new Node(array[middle]);
        if (this.root == null) { this.root = node; }
        // recursively construct the left tree
        node.left = this.buildTree(array, start, middle - 1);
        // recursively construct the right tree
        node.right = this.buildTree(array, middle +1, end);
        // return level-0 node
        return node;    
    }
    insert(recNode, value) {
        if (value > recNode.value) {
            if (recNode.right !== null) {
                return this.insert(recNode.right, value);
            } else {
                let node = new Node(value);
                recNode.right = node;
            }
        } else if (value < recNode.value) {
            if (recNode.left !== null) {
                return this.insert(recNode.left, value);
            } else {
                let node = new Node(value);
                recNode.left = node;
            }
        } else {
            console.log('This value already exists in the tree.');
            return;
        }
    }
    delete(recNode, value) {
        if (value > recNode.value) {
            if (recNode.right !== null) {
                // check if the right node is the correct one
                if (recNode.right.value == value) {
                    // found our node
                    if (recNode.right.right == null && recNode.right.left == null) {
                        // deleted
                        recNode.right = null;
                    } else {
                        // [record the value of the node to be deleted]
                        let valueToRemove = recNode.right.value;
                        // rebuild method:
                        // [traverse through all the nodes, and record the values in an array]
                        let newArray = [];
                        let stack = [];
                        let current = this.root;
                        while (current !== null || stack.length > 0) {
                            while (current !== null) {
                                stack.push(current);
                                current = current.left;
                            }
                            current = stack.pop();
                            newArray.push(current.value);
                            current = current.right;
                        }
                        // [sort the array]
                        let newSortedArray = mergeSort(newArray);
                        // [delete the recorded node]
                        for (let i = 0; i < newSortedArray.length; i++) {
                            if (valueToRemove == newSortedArray[i]) {
                                newSortedArray.splice(i, 1);
                            }
                        }
                        // [delete the tree by removing the root]
                        this.root = null;
                        // [rebuild the tree from the array]
                        this.buildTree(newSortedArray, 0, newSortedArray.length - 1);
                    }
                // if it isn't, keep traversing
                } else {
                    return this.delete(recNode.right, value);
                }
            } else {
                console.log('Value does not exist in the tree!');
            }
        } else if (value < recNode.value) {
            if (recNode.left !== null) {
                // check if the left node is the correct one
                if (recNode.left.value == value) {
                    // found our node
                    if (recNode.left.right == null && recNode.left.left == null) {
                        // deleted
                        recNode.left = null;
                    } else {
                        // [record the value of the node to be deleted]
                        let valueToRemove = recNode.left.value;
                        // rebuild method:
                        // [traverse through all the nodes, and record the values in an array]
                        let newArray = [];
                        let stack = [];
                        let current = this.root;
                        while (current !== null || stack.length > 0) {
                            while (current !== null) {
                                stack.push(current);
                                current = current.left;
                            }
                            current = stack.pop();
                            newArray.push(current.value);
                            current = current.right;
                        }
                        // [sort the array]
                        let newSortedArray = mergeSort(newArray);
                        // [delete the recorded node]
                        for (let i = 0; i < newSortedArray.length; i++) {
                            if (valueToRemove == newSortedArray[i]) {
                                newSortedArray.splice(i, 1);
                            }
                        }
                        // [delete the tree by removing the root]
                        this.root = null;
                        // [rebuild the tree from the array]
                        this.buildTree(newSortedArray, 0, newSortedArray.length - 1);
                    }
                // if it isn't, keep traversing
                } else {
                    return this.delete(recNode.left, value);
                }
            } else {
                console.log('Value does not exist in the tree!');
            }
        }
    }
    find(recNode, value) {
        if (value > recNode.value) {
            if (recNode.right !== null) {
                // check if the right node is the correct one
                if (recNode.right.value == value) {
                    // found our node
                    return recNode.right;
                // if it isn't, keep traversing
                } else {
                    return this.find(recNode.right, value);
                }
            } else {
                console.log('Value does not exist in the tree!');
            }
        } else if (value < recNode.value) {
            if (recNode.left !== null) {
                // check if the left node is the correct one
                if (recNode.left.value == value) {
                    // found our node
                    return recNode.left;
                // if it isn't, keep traversing
                } else {
                    return this.find(recNode.left, value);
                }
            } else {
                console.log('Value does not exist in the tree!');
            }
        } else if (value == recNode.value) {
            return recNode;
        }
    }
    levelOrder(callback) {
        // perform an operation on each node, like +-*/
        let queue = [];
        let current = this.root;
        queue.push(current);
        while (queue.length !== 0) {
            current = queue[0];
            queue[0].value = callback(queue[0].value);
            if (current.left !== null) { queue.push(current.left) }
            if (current.right !== null) { queue.push(current.right) }
            queue.splice(0, 1);
        }
    }
    inOrder(callback) {
        let stack = [];
        let current = this.root;
        stack.push(current);
        while (stack.length !== 0) {
            current = stack.pop();
            let leftNode = current.left;
            let rightNode = current.right;
            // check the left branch
            while (leftNode !== null) {
                stack.push(leftNode);
                leftNode = leftNode.left;
            }
            // visit the current node
            current.value = callback(current.value);
            // check the right branch
            while (rightNode !== null) {
                stack.push(rightNode);
                rightNode = rightNode.right;
            }
        }
    }
    preOrder(callback) {
        let stack = [];
        let current = this.root;
        stack.push(current);
        while (stack.length !== 0) {
            // visit the current node
            current = stack.pop();
            current.value = callback(current.value);
            let leftNode = current.left;
            let rightNode = current.right;
            // check the left branch
            while (leftNode !== null) {
                stack.push(leftNode);
                leftNode = leftNode.left;
            }
            // check the right branch
            while (rightNode !== null) {
                stack.push(rightNode);
                rightNode = rightNode.right;
            }
        }
    }
    postOrder(callback) {
        let stack = [];
        let current = this.root;
        stack.push(current);
        while (stack.length !== 0) {
            current = stack.pop();
            let leftNode = current.left;
            let rightNode = current.right;
            // check the left branch
            while (leftNode !== null) {
                stack.push(leftNode);
                leftNode = leftNode.left;
            }
            // check the right branch
            while (rightNode !== null) {
                stack.push(rightNode);
                rightNode = rightNode.right;
            }
            // visit the current node
            current.value = callback(current.value);
        }
    }
    height(node) {
        if (node == null) { return -1; }
        if (node.left == null && node.right == null) { return 0; }
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
    depth(node) {
        if (node == null) { return -1 }
        if (node == this.root) { return 0 }
                
    }
    isBalanced(node) {

    }
    rebalance() {
        // rebuild method:
        // [traverse through all the nodes, and record the values in an array]
        let newArray = [];
        let stack = [];
        let current = this.root;
        while (current !== null || stack.length > 0) {
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            newArray.push(current.value);
            current = current.right;
        }
        // [sort the array]
        let newSortedArray = mergeSort(newArray);
        // [delete the tree by removing the root]
        this.root = null;
        // [rebuild the tree from the array]
        this.buildTree(newSortedArray, 0, newSortedArray.length - 1);
    }
}

// merge-sort
function mergeSort(unsortedArray) {
    // if one element
    if (unsortedArray.length <= 1) {
        // quit
    return unsortedArray;
    // else
    } else {
        // sort the left half
        let halfIndex = Math.ceil(unsortedArray.length / 2);
        let leftHalfArray = unsortedArray.slice(0, halfIndex);
        let leftHalfArraySorted = mergeSort(leftHalfArray);
        // sort the right half
        let rightHalfArray = unsortedArray.slice(halfIndex, unsortedArray.length);
        let rightHalfArraySorted = mergeSort(rightHalfArray);
        // merge the two arrays
        return mergeHalves(leftHalfArraySorted, rightHalfArraySorted);        
    }

}

function mergeHalves(leftArray, rightArray) {
    let mergedArray = []
    while (leftArray.length && rightArray.length) {
        if (leftArray[0] < rightArray[0]) {
            mergedArray.push(leftArray.shift());
        } else {
            mergedArray.push(rightArray.shift());
        }
    }
    return [...mergedArray, ...leftArray, ...rightArray];
}

// remove duplicates by iteration
function removeDuplicates(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == array[i+1]) {
            array.splice(i, 1);
            i--;
        }
    }
    return array;
}

// visualiser
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

// testing
let tree = new Tree();
let unsortedArray = [1, 13, 312, 2, 31, 331, 31, 9, 4, 3];
let sortedArray = mergeSort(unsortedArray);
let finalArray = removeDuplicates(sortedArray);
tree.buildTree(finalArray, 0, finalArray.length - 1);
prettyPrint(tree.root);
// console.log('removing 3');
// tree.delete(tree.root, 3);
// prettyPrint(tree.root);
// let x = tree.find(tree.root, 9)
// console.log(x);
// tree.insert(tree.root, 999);
// prettyPrint(tree.root);
// const multiplyBy2 = (num) => {
//     return num * 2;
// }
// tree.postOrder(multiplyBy2);
// prettyPrint(tree.root);
let node331 = tree.find(tree.root, 331);
console.log(tree.height(tree.root));