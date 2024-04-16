function filterContent() {
    const fileInput = document.getElementById('fileInput');
    const stringsArea = document.getElementById('stringsToFilter');
    const file = fileInput.files[0];
    if (file) {
        document.getElementById('filteredText').value = '';
        const reader = new FileReader();
        reader.onload = function(e) {
            let content = e.target.result;
            
            // 首先过滤时间字符串
            content = content.replace(/\d{4}[-\/]\d{1,2}[-\/]\d{1,2} \d{1,2}:\d{2}(?::\d{2})?/g, '');
            
            // 分割文本区域中的字符串，每行一个字符串
            const stringsToFilter = stringsArea.value.split('\n');
            
            // 遍历每个字符串并进行过滤
            stringsToFilter.forEach(function(string) {
                if (string.trim() !== '') { // 忽略空行
                    const escapedString = string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 转义正则特殊字符
                    const regex = new RegExp(escapedString, 'g');
                    content = content.replace(regex, '');
                }
            });

            // 移除空白行
            content = content.replace(/^\s*[\r\n]/gm, '');

            document.getElementById('filteredText').value = content;
        };
        reader.readAsText(file);
    } else {
        alert("请先选择一个文件。");
    }
}
