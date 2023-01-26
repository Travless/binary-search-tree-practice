// Class Creation

class Node {
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray);
    }

    // function that builds binary tree off of a provided array of data
    buildTree(sortedArray){
        // loop through each array element, taking it's data and using the insert function to indert it into binary tree nodes and place it appropriately within the tree
        if(sortedArray.length === 0){
            return null;
        }
        let mid = Math.floor(sortedArray.length / 2);
        let root = new Node(sortedArray[mid]);

        root.left = this.buildTree(sortedArray.slice(0, mid));
        root.right = this.buildTree(sortedArray.slice(mid+1));

        return root;
    }

    // add node to BST
    insert(data) {
        // assign the root node to the node variable
        const node = this.root;
        // if no root node exisits (meaning no tree exisits), assign a new node created with the node class to the root node;
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
    delete(data){
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

    // will return the minimum level height of the binary tree
    // pass in node, or if a node isn't passed in, the functions assigns the root node to the node
    minHeight(node = this.root){
        // check if node is null. if it is, return -1
        if(node == null) {
            return -1;
        }
        // assign the function recursively to two different variables, left and right, while passing in the left and right data of the node
        let left = this.minHeight(node.left);
        let right = this.minHeight(node.right);
        // compare both nodes to see if left or right is less than its counterpart, and if it is, return the node plus 1
        if(left < right){
            return left + 1;
        } else {
            return right + 1;
        };
    }

    // will return the maximum level height of the binary search tree
    // pass in node, or if a node isn't passed in, the function assigns the root node to the node
    maxHeight(node = this.root){
        // check if node is null. if it is, return -1
        if (node == null){
            return -1;
        }
        // assign the function recursively to two different variables, left and right, while passing in the left and right data of the node
        let left = this.maxHeight(node.left);
        let right = this.maxHeight(node.right);
        // compare both nodes to see if left or right is greater than its counterpart, and if it is, return the node plus 1
        if(left > right){
            return left + 1;
        } else {
            return right + 1;
        };
    }

    isBalanced(){
        // will return true or false if the minHeight of the binary tree is greater than or equal to the maxHeight of the tree minus 1
        return (this.minHeight() >= this.maxHeight() - 1);
    }

    rebalance(){
        let results = this.inOrder()
        this.root = this.buildTree(results);
    }


    // Depth-First Order
    inOrder(){
        // check if BST exisits
        if(this.root == null){
            return null;
        } else {
            // if there is a BST, create a new array and add each value found via inOrder to the array
            let result = new Array();
            // create function traversalInOrder that takes in a node and that will be recursive in checking and adding data to the result array
            // inorder = Left -> Data -> Right (LDR)
            function traversalInOrder(node){
                // use short circut evaluation to check if node.left exisits and if it does exisit, run the traversalInOrder function on node.left
                node.left && traversalInOrder(node.left);
                // push data from node to result array
                result.push(node.data);
                 // use short circut evaluation to check if node.right exisits and if it does exisit, run the traversalInOrder function on node.right
                node.right && traversalInOrder(node.right);
            }
            // run traversalInOrder function on the root node and resturn the result
            traversalInOrder(this.root);
            return result;
        }
    }

    preOrder(){
        // check if BST exisits
        if(this.root == null){
            return null;
        } else {
            // if there is a BST, create a new array and add each value found via inOrder to the array
            let result = new Array();
            // create function traversalInOrder that takes in a node and that will be recursive in checking and adding data to the result array
            // preorder = Data -> Left -> Right (DLR)
            function traversalInOrder(node){
                // push data from node to result array
                result.push(node.data);
                // use short circut evaluation to check if node.left exisits and if it does exisit, run the traversalInOrder function on node.left
                node.left && traversalInOrder(node.left);
                 // use short circut evaluation to check if node.right exisits and if it does exisit, run the traversalInOrder function on node.right
                node.right && traversalInOrder(node.right);
            }
            // run traversalInOrder function on the root node and resturn the result
            traversalInOrder(this.root);
            return result;
        }
    }

    postOrder(){
        if(this.root == null){
            return null;
        } else {
            // if there is a BST, create a new array and add each value found via inOrder to the array
            let result = new Array();
            // create function traversalInOrder that takes in a node and that will be recursive in checking and adding data to the result array
            // postorder = Left - Right - Data (LRD)
            function traversalInOrder(node){
                // use short circut evaluation to check if node.left exisits and if it does exisit, run the traversalInOrder function on node.left
                node.left && traversalInOrder(node.left);
                 // use short circut evaluation to check if node.right exisits and if it does exisit, run the traversalInOrder function on node.right
                node.right && traversalInOrder(node.right);
                // push data from node to result array
                result.push(node.data);
            }
            // run traversalInOrder function on the root node and resturn the result
            traversalInOrder(this.root);
            return result;
        }
    }

    // records the count of edges within the BST
    // set the node variable to the root node and the edge count to 0 when initialized
    depth(nodeValue, node = this.root, edge = 0){
        // if no BST exisits, return null
        if (node === null){
            return;
        }
        // if the value of the node's data equals the nodeValue variable, return the edge count
        if (node.value === nodeValue){
            return edge;
        }
        // if the value of the node is less than the nodeValue variable, recursively execute the depth functions, with nodeValue, node.right, and the edge count increased by 1 passed into it
        if (node.value < nodeValue){
            return this.depth(nodeValue, node.right, edge++);
        // if the value of the node is greater than the nodeValue variable, recursively execute the depth functions, with nodeValue, node.left, and the edge count increased by 1 passed into it
        } else {
            return this.depth(nodeValue, node.left, edge++);
        }
    }


    // Breadth-First Order

    // use queue to help while looping through nodes, dequeueing as the nodes are pushed to a results array
    levelOrder(){
        // create results array to put sorted nodes based on level order, and create a queue array to house nodes during sorting process
        let results = [];
        let queue = [];
        // check if there is a BST by checking if the root node isn't null
        // if it isn't null, push the root node into the queue
        if(this.root != null){
            queue.push(this.root);
            // begin looping through elements adding them to the tree based on their location on the tree at that level
            while(queue.length > 0){
                // use shift function to return the first element of the queue and assign it to the node variable
                let node = queue.shift();
                // push the data of that returned node from the queue into the results array
                results.push(node.data);
                // if the node has a left child, push that node data into the queue
                if (node.left != null){
                    queue.push(node.left);
                };
                // if the node has a right child, push that node data into the queue
                if (node.right != null){
                    queue.push(node.right);
                };
            };
            // when the loop finishes, meaning the queue has no remaining nodes, return the results array
            return results;
        } else {
            return null;
        };
    };
}


// Ancillary functions
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

const arrayRandomizer = (length) => {
    return Array.from({ length: length }, () => Math.floor(Math.random() * 100))
}



// TESTING

// Creaate BST from random array
const randomArray = arrayRandomizer(10);
const bst = new Tree(randomArray);

// Confirm that tree is balanced
console.log(bst.isBalanced());

// Print our all elements in level, pre, post, and in order
console.log(bst.levelOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());
console.log(bst.inOrder());


// Unbalance tree by additing numbers
bst.insert(300);
bst.insert(600);

// Confirm that tree is unbalanced
console.log(bst.isBalanced());

// Rebalance tree
bst.rebalance();

// Confirm that tree is balanced
console.log(bst.isBalanced())

// Print out elements in level, pre, post, and in order again
console.log(bst.levelOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());
console.log(bst.inOrder());
