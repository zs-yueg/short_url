document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shortenForm')
    const resultDiv = document.getElementById('result')
    const urlListDiv = document.getElementById('urlList')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const originalUrl = document.getElementById('originalUrl').value
        
        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ originalUrl })
            })
            
            const data = await response.json()
            resultDiv.innerHTML = `
                <div class="url-item">
                    <p>原始URL: <a href="${data.originalUrl}" target="_blank">${data.originalUrl}</a></p>
                    <p>短链接: <a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a></p>
                </div>
            `
            loadUrlList()
        } catch (error) {
            resultDiv.innerHTML = `<p class="error">生成短链接失败: ${error.message}</p>`
        }
    })

    async function loadUrlList() {
        try {
            const response = await fetch('/api/urls')
            const urls = await response.json()
            
            if (urls.length > 0) {
                let html = '<h2>历史记录</h2>'
                urls.forEach(url => {
                html += `
                        <div class="url-item">
                            <p>短码: ${url.shortCode}</p>
                            <p>原始URL: <a href="${url.originalUrl}" target="_blank">${url.originalUrl}</a></p>
                            <p>点击次数: ${url.clicks}</p>
                            <p>创建时间: ${new Date(url.createdAt).toLocaleString()}</p>
                            <button class="delete-btn" data-shortcode="${url.shortCode}">删除</button>
                        </div>
                    `
                })
                urlListDiv.innerHTML = html
            }
        } catch (error) {
            urlListDiv.innerHTML = `<p class="error">加载URL列表失败: ${error.message}</p>`
        }
    }

    // 初始加载URL列表
    loadUrlList()

    // 添加删除按钮事件监听
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const shortCode = e.target.dataset.shortcode
            try {
                const response = await fetch(`/api/urls/${shortCode}`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    loadUrlList()
                } else {
                    alert('删除失败')
                }
            } catch (error) {
                alert('删除失败: ' + error.message)
            }
        }
    })
})
