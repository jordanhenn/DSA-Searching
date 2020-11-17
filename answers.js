// 1. How many searches?
// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and using the recursive binary search algorithm, identify the sequence of numbers that each recursive call will search to try and find 8.
// 12 -> 6 -> 8
// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and using the recursive binary search algorithm, identify the sequence of numbers that each recursive call will search to try and find 16.
// 12 --> 17 --> 18 --> -1 (not found)

//3. Imagine you are looking for a book in a library with a Dewey Decimal index. How would you go about it? Can you express this process as a search algorithm? Implement your algorithm to find a book whose Dewey and book title is provided.
//Assuming the array is a sorted list of objects with dewey decimal numbers as the key and the book title
//as the value, you could use a binary search method like so:

function deweySearch(array, value, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;

    if (start > end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = Object.keys(array[index])[0];

    console.log(start, end);
    if (item == value) {
        const result = array[index];
        return result;
    }
    else if (item < value) {
        return binarySearch(array, value, index + 1, end);
    }
    else if (item > value) {
        return binarySearch(array, value, start, index - 1);
    }
};

//4. Searching in a BST
//1) Given a binary search tree whose in-order and pre-order traversals are respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. What would be its postorder traversal?
//90 91 79 89 27 19 14 15 25 35
//2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8. What is its pre-order traversal?
//8 10 11 9 6 7 5


//5. Implement different tree traversals
// Using your BinarySearchTree class from your previous lesson, create a binary search tree with the following dataset: 25 15 50 10 24 35 70 4 12 18 31 44 66 90 22. Then implement inOrder(), preOrder(), and postOrder() functions. Test your functions with the following datasets.

class _Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
    }

    enqueue(data) {
        const node = new _Node(data);

        if (this.first === null) {
            this.first = node;
        }

        if (this.last) {
            this.last.next = node;
        }

        this.last = node;
    }

    dequeue() {
        if (this.first === null) {
            return;
        }
        const node = this.first
        this.first = this.first.next

        if (node === this.last) {
            this.last === null;
        }
        return node.value;
    }
}

class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value) {
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }
        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        }
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
    find(key) {
        if (this.key == key) {
            return this.value;
        }
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

    dfsInOrder(values=[]) {
        if (this.left) {
            values = this.left.dfsInOrder(values);
        }
        values.push(this.value);
    
        if (this.right) {
            values = this.right.dfsInOrder(values);
        }
        return values;
    }

    dfsPreOrder(values=[]) {
        values.push(this.value);
    
        if (this.left) {
            values = this.left.dfsPreOrder(values);
        }
    
        if (this.right) {
            values = this.right.dfsPreOrder(values);
        }
        return values;
    }

    dfsPostOrder(values=[]) {
        if (this.left) {
            values = this.left.dfsPostOrder(values);
        }
    
        if (this.right) {
            values = this.right.dfsPostOrder(values);
        }
    
        values.push(this.value);
    
        return values;
    }
}

function rankOrder(tree, values = []) {
    const queue = new Queue(); 
    const node = tree.root;
    queue.enqueue(node);
    while (queue.length) {
        const node = queue.dequeue(); 
        values.push(node.value);

        if (node.left) {
            queue.enqueue(node.left); 
        }

        if (node.right) {
            queue.enqueue(node.right); 
        }
    }

    return values;
}


function main() {
    const BST = new BinarySearchTree();
    BST.insert(25, 25)
    BST.insert(15, 15)
    BST.insert(50, 50)
    BST.insert(10, 10)
    BST.insert(24, 24)
    BST.insert(35, 35)
    BST.insert(70, 70)
    BST.insert(4, 4)
    BST.insert(12, 12)
    BST.insert(18, 18)
    BST.insert(31, 31)
    BST.insert(44, 44)
    BST.insert(66, 66)
    BST.insert(90, 90)
    BST.insert(22, 22)
    console.log(BST.dfsInOrder());
    console.log(BST.dfsPreOrder());
    console.log(BST.dfsPostOrder());

    const rankBST = new BinarySearchTree();
    rankBST.insert(8, 'Captain Picard');
    rankBST.insert(6, 'Commander Riker');
    rankBST.insert(9, 'Commander Data');
    rankBST.insert(5, 'Lt. Cmdr. Worf');
    rankBST.insert(7, 'Lt. Cmdr. Laforge');
    rankBST.insert(4, 'Lieutenant security-officer');
    rankBST.insert(11, 'Lieutenant Cmdr. Crusher');
    rankBST.insert(10, 'Lieutenant Selar');
    console.log(rankOrder(rankBST));
}

main();

function profit(prices) {
    if (!prices.length) return null;

    let buy = prices[0]
    let sell = prices[0]
    let profit = 0

    for (let i = 1; i < prices.length; i++) {
        sell = prices[i]
        if (sell < buy) {
            buy = sell;
        }
        if (sell - buy > profit) {
            profit = sell - buy;
        }
    }
    return profit;
}

console.log(profit([128, 97, 121, 123, 98, 97, 105]));
