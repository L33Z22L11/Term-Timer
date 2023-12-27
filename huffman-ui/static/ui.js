// 获取页面元素
const unencodedText = document.getElementById('unencodedText');
const encodeButton = document.getElementById('encodeButton');
const encodedResult = document.getElementById('encodedResult');
const eleTree = document.getElementById('tree');

const undecodedText = document.getElementById('undecodedText');
const undecodedTable = document.getElementById('undecodedTable');
const decodeButton = document.getElementById('decodeButton');
const decodedResult = document.getElementById('decodedResult');

// 添加编码按钮点击事件处理程序
encodeButton.addEventListener('click', () => {
    const huffmanTree = buildHuffmanTree(unencodedText.value);
    const encodingTable = buildEncodingTable(huffmanTree);
    const encodedContent = encode(unencodedText.value, encodingTable);
    encodedResult.innerHTML = `
        编码表: ${JSON.stringify([...encodingTable])} <br>
        编码结果: ${encodedContent}`;
    eleTree.innerHTML = '<p>哈夫曼树:</p>';
    eleTree.appendChild(createVisualNode(huffmanTree));
});

// 添加解码按钮点击事件处理程序
decodeButton.addEventListener('click', () => {
    const undecodedInfo = undecodedText.value.split('\n');
    const undecodedContent = undecodedInfo[1].slice(6);
    const encodingTable = JSON.parse(undecodedInfo[0].slice(5));
    const decodedContent = decode(undecodedContent, encodingTable);
    decodedResult.textContent = `解码结果: ${decodedContent}`;
});

// 递归创建图形化节点
function createVisualNode(node) {
    const div = document.createElement('div');
    div.className = 'node';
    div.innerHTML = node ? `<p data-sub="${node.frequency}">${node.char || ' '}</p>` : '<p>空</p>';
    if (node.left || node.right) {
        div.appendChild(createVisualNode(node.left));
        div.appendChild(createVisualNode(node.right));
    }
    return div;
}
