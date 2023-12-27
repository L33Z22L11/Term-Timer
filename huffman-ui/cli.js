// 导入所需模块
const core = require('./static/core');
const fs = require('fs');
const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });

// 检查命令行参数
if (process.argv.length > 2) {
    const filePath = process.argv[2];
    // 解码模式
    if (filePath.match('.encoded.')) {
        let fileName = filePath.split('.encoded.')[0];
        const undcodedData = JSON.parse(fs.readFileSync(fileName + '.encoded.json', 'utf8'));
        const undcodedContent = [...fs.readFileSync(fileName + '.encoded.bin', 'hex')]
            .map(hex => parseInt(hex, 16).toString(2).padStart(4, '0')).join('') + undcodedData.remainder;
        const decodedContent = core.decode(undcodedContent, Object.entries(undcodedData.encodingTable));
        fs.writeFileSync(fileName + '.decoded', decodedContent, 'utf8');
        console.log(`文件 ${fileName} 解码成功，位于 ${fileName}.decoded`);
    } else {
        // 编码模式
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const encodingTable = core.buildEncodingTable(core.buildHuffmanTree(fileContent));
        const encodedContent = core.encode(fileContent, encodingTable);
        fs.writeFileSync(filePath + '.encoded.json', JSON.stringify({
            encodingTable: Object.fromEntries([...encodingTable]),
            remainder: encodedContent.slice(-encodedContent.length % 8),
        }), 'utf8');
        let payload = '';
        for (let i = 0; i < encodedContent.length - 7; i += 8)
            payload += parseInt(encodedContent.substr(i, 8), 2).toString(16).padStart(2, "0");
        fs.writeFileSync(filePath + '.encoded.bin', payload, 'hex');
        console.log(`文件 ${filePath} 成功编码至 ${filePath}.encoded.bin, 码表和余量位于 ${filePath}.encoded.json`);
    }
    process.exit(0);
}

// 循环执行交互式文本编码模式
(function runInteractiveEncoding() {
    rl.question('输入以编码 (按Ctrl-C退出): ', (inputString) => {
        const encodingTable = core.buildEncodingTable(core.buildHuffmanTree(inputString));
        const encodedString = core.encode(inputString, encodingTable);
        console.log('编码表:', encodingTable);
        console.log('编码结果:', encodedString);
        console.log('解码结果:', core.decode(encodedString, encodingTable));
        runInteractiveEncoding();
    });
})();
