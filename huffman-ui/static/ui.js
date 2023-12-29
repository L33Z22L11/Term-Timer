// 获取页面元素
const inputText = document.getElementById('inputText');
const result = document.getElementById('result');
const HuffmanTree = document.getElementById('HuffmanTree');
const undecodedTable = document.getElementById('undecodedTable');

// 编码按钮点击事件处理程序
document.getElementById('encodeButton').addEventListener('click', () => {
    const huffmanTree = buildHuffmanTree(inputText.value);
    const encodingTable = buildEncodingTable(huffmanTree);
    result.textContent = `编码表:\n${JSON.stringify([...encodingTable])}\n编码结果:\n${encode(inputText.value, encodingTable)}`;
    HuffmanTree.innerHTML = '';
    HuffmanTree.appendChild(createVisualNode(huffmanTree));
});

// 解码按钮点击事件处理程序
document.getElementById('decodeButton').addEventListener('click', () => {
    const undecodedInfo = inputText.value.split('\n');
    HuffmanTree.innerHTML = '';
    try {
        result.textContent = decode(undecodedInfo[3], JSON.parse(undecodedInfo[1]));
    } finally { alert('解码失败'); }
});

// 复制按钮点击事件处理程序
document.getElementById('resultCopyButton').addEventListener('click', () => {
    navigator.clipboard.writeText(result.textContent);
})

// 粘贴按钮点击事件处理程序
document.getElementById('resultPasteButton').addEventListener('click', async () => {
    inputText.value = await navigator.clipboard.readText();
})

// 递归创建图形化节点
function createVisualNode(node) {
    const div = document.createElement('div');
    div.className = 'node';
    div.innerHTML = `<div data-sub="${node.frequency}">${node.char || ' '}</div>`;
    if (node.left) div.appendChild(createVisualNode(node.left));
    if (node.right) div.appendChild(createVisualNode(node.right));
    return div;
}
