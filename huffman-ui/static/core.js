// 定义哈夫曼树节点类
class HuffmanNode {
    constructor(char, frequency) {
        this.char = char;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
}

// 构建哈夫曼树
function buildHuffmanTree(string) {
    // 计算字符频率
    const frequencyMap = new Map();
    for (let char of string)
        frequencyMap.set(char, frequencyMap.has(char) ? frequencyMap.get(char) + 1 : 1);
    // 创建哈夫曼树节点
    const nodes = [];
    for (let [char, frequency] of frequencyMap)
        nodes.push(new HuffmanNode(char, frequency));
    // 处理只包含一个字符的情况
    if (nodes.length === 1) {
        const root = new HuffmanNode(null, nodes[0].frequency);
        root.left = root.right = nodes[0];
        return root;
    }
    // 构建哈夫曼树
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.frequency - b.frequency);
        const left = nodes.shift();
        const right = nodes.shift();
        const parent = new HuffmanNode(null, left.frequency + right.frequency);
        parent.left = left;
        parent.right = right;
        nodes.push(parent);
    }
    return nodes[0];
}

// 构建字符编码表
function buildEncodingTable(root) {
    const encodingTable = new Map();
    function traverse(node, code) {
        if (node.char)
            encodingTable.set(node.char, code);
        else {
            traverse(node.left, code + '0');
            traverse(node.right, code + '1');
        }
    }
    traverse(root, '');
    return encodingTable;
}

// 哈夫曼编码
function encode(string, encodingTable) {
    let encodedString = '';
    for (let char of string)
        encodedString += encodingTable.get(char);
    return encodedString;
}

// 哈夫曼解码
function decode(undecodedString, encodingTable) {
    const decodingTable = new Map(Array.from(encodingTable, ([key, value]) => [value, key]));
    let decodedString = '';
    let currentCode = '';
    for (let bit of undecodedString) {
        currentCode += bit;
        if (decodingTable.has(currentCode)) {
            decodedString += decodingTable.get(currentCode);
            currentCode = '';
        }
    }
    return decodedString;
}

try {
    module.exports = { buildHuffmanTree, buildEncodingTable, encode, decode }
} catch (e) { console.log(`可能在浏览器环境中:\n${e}`); }
