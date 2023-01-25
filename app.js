class Node {
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    add(data) {
        const node = this.root;
        if (node === null){
            this.root = new Node(data);
            return;
        } else {
            const searchTree = function(node) {
                // if the data we pass in is less than node's data, node will go on the left side of the tree
                if (data < node.data) {
                    // if node.left is null, assign new Node and return
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    // if node.left is not null, continue searching recursively with searchTree on node.left
                    } else if (node.left !== null){
                        return searchTree(node.left);
                    }
                // if the data we pass in is greater than node's data, node will go on the right side of the tree
                } else if(data > node.data){
                    // if node.right is null, assign to new Node and return
                    if(node.right === null){
                        node.right = new Node(data);
                        return;
                    // if node.right is not null, continue searching recursively with searchTree on node.right
                    } else if (node.right !== null){
                        return searchTree(node.right);
                    }
                // if data is equal to node.data, return and do not add to tree
                } else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }
    // smallest node will always be on the left side of binary search tree
    findMin(){
        // set current node to root node
        let current = this.root;
        // while the left of the current node isn't null (i.e. there is a smaller node to its left), continue looping through nodes, assigning current.left to current with each pass
        while(current.left !== null){
            current = current.left;
        }
        // when current.left is null, that means current is currently the smallest node in the tree, and you will return its data
        return current.data;
    }

    // largest node will always be on the right side of the binary search tree
    findMax(){
        // set current node to root node
        let current = this.root;
        // while the right of the current node isn't null (i.e. there is a larger node to its right), continue looping through nodes, assigning current.right to current with each pass
        while(current.right !== null){
            current = current.right;
        }
        // when current.right is null, that means current is currently the largest node in the tree, and you will return its data
        return current.data;
    }
    // will return data of node requested if it exisits in BST. Will return null if it doesn't
    find(data){
        // set current node to the root node of BST
        let current = this.root;
        // while there is a current node, loop through all nodes
        while(current){
            // if the data passed into the function doesn't equal the current node's data, then the data does exisit and should be returned
            if (data === current.data){
                return current;
            }
            // if 
            if (data < current.data){
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }
    // will return whether data is in BST, in the form of true or false
    isPresent(data){
        // set current to root node
        let current = this.root;
        // while there is a current node, loop through nodes
        while(current){
            // if the data passed into the function equals the current node's data, then the data does exist and should be returned as true
            if (data === current.data) {
                return true;
            }
            // if the data passed into the function doesn't equal the current node's data, begin assigning current.left (if the data is smaller) or current.right (if the data is larger) to current during looping
            if (data < current.data){
                current = current.left;
            } else {
                current = current.right;
            }
        }
        // if data passed into function does not equal any of the nodes' data in BST, then return false
        return false;
    }

    // will remove the equivalent data passed into the function from the BST
    remove(data){
        // create function that will be used recursively to locate node based on data passed in
        const removeNode = function(node, data) {
            // if the node is null (i.e. empty tree), return null
            if (node === null){
                return null;
            }
            // if data equals node's data and the node to be removed is found, there are a few different scenarios that need to be addressed
            if (data == node.data){
                // if node has no children, just delete node and return null
                if(node.left == null && node.right == null){
                    // when returning null, you are setting the reference or pointer to that node to null
                    return null;
                }
                // if node has one child, in which there no child on the left, replace the original node with the node on the right by returning node.right as the reference
                if (node.left == null){
                    return node.right;
                }
                // if node has one child, in which there is no child on the right, replace the original node with the node on the left by returning node.left as the reference
                if (node.right == null){
                    return node.left;
                }
                // if node has two children, it must be replaced with the left most node (smallest) after taking the larger node on the tree 
                // start by making a temp node, in which node.right is assigned
                let tempNode = node.right;
                // loop through the left hand nodes of the tempNode, assigning tempNode.left to tempNode with each pass in which tempNode doesnt equal null
                while(tempNode.left !== null){
                    tempNode = tempNode.left;
                }
                // assign the data of the tempNode to the data of the node we are wanting to delete
                node.data = tempNode.data;
                // assign the removeNode function to node.right with node.right and tempNode.data passed into it, enabling recursive functionality to the right handside of the tree. then return node.
                node.right = removeNode(node.right, tempNode.data);
                return node;
            // if the data passed into the function is less than the compared node's data, move to the left side of the tree
            } else if (data < node.data){
                // assign removeNode recursively to node.left, while passing it node.left and the data originally passed. after it finishes, return the node
                node.left = removeNode(node.left, data);
                return node;
            // if the data passed into the function is greater than the compared node's data, move to the right side of the tree
            } else {
                // assign removeNode recursively to node.right, while passing it node.right and the data originally passed. after it finishes, return the node
                node.right = removeNode(node.right, data);
                return node;
            }
        }
        // call removeNode function, passing in this.root and the data originally provided to the function
        this.root = removeNode(this.root, data)
    }

    isBalanced(){
        // 
        return (this.minHeight() >= this.maxHeight() - 1);
    }
}

// const prettyPrint = (node, prefix = '', isLeft = true) => {
//     if (node.right !== null) {
//       prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
//     }
//     console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
//     if (node.left !== null) {
//       prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
//     }
// }

// const arrayTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const newTree = new Tree(arrayTest);

// newTree.buildTree(arrayTest, 0, 9);

const bst = new Tree();

bst.add(4);
bst.add(2);
bst.add(6);
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(7);
bst.remove(4);
console.log(bst.findMin());
console.log(bst.findMax());
bst.remove(7);
console.log(bst.findMax());
console.log(bst.isPresent(4));