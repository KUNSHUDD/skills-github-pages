<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网站访问兑换中心</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .steam-style {
            background: linear-gradient(135deg, #1a2838 0%, #235784 100%);
            color: white;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        input, button {
            padding: 10px;
            margin: 5px 0;
            border-radius: 3px;
            border: 1px solid #ddd;
            font-size: 16px;
        }
        input {
            width: 300px;
        }
        button {
            background: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            transition: background 0.3s;
        }
        button:hover {
            background: #45a049;
        }
        #websites {
            display: none;
            margin-top: 20px;
        }
        .website-card {
            border: 1px solid #ddd;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            background: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .website-info {
            flex-grow: 1;
        }
        .error {
            color: #f44336;
        }
        .success {
            color: #4CAF50;
        }
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(0,0,0,.3);
            border-radius: 50%;
            border-top-color: #000;
            animation: spin 1s ease-in-out infinite;
            margin-left: 10px;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        #cdk-history {
            margin-top: 30px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="steam-style">
            <h1>网站访问兑换中心</h1>
            <p>输入您的CDK兑换码以访问专属内容</p>
        </div>
        
        <div id="redeem-section">
            <h2>兑换CDK</h2>
            <div>
                <input type="text" id="cdk-input" placeholder="输入CDK兑换码 (如 GAME-ABC123)">
                <button onclick="redeemCDK()" id="redeem-btn">兑换</button>
                <span id="loading" class="loading" style="display:none;"></span>
            </div>
            <p id="message"></p>
        </div>
        
        <div id="websites">
            <h2>您的可访问网站</h2>
            <div id="website-list"></div>
        </div>
        
        <div id="cdk-history">
            <h3>兑换历史</h3>
            <div id="history-list"></div>
        </div>
    </div>

    <script>
        // GitHub仓库信息 - 修改为你自己的
        const repoOwner = "yourusername";
        const repoName = "cdk-gateway";
        const cdkLabel = "cdk";
        
        // 从本地存储加载已兑换CDK和网站
        let redeemedCDKs = JSON.parse(localStorage.getItem('redeemedCDKs') || [];
        let accessibleWebsites = JSON.parse(localStorage.getItem('accessibleWebsites') || [];
        
        // 页面加载时显示已有内容
        document.addEventListener('DOMContentLoaded', () => {
            if (redeemedCDKs.length > 0) {
                showWebsites();
                showHistory();
            }
        });
        
        // 兑换CDK主函数
        async function redeemCDK() {
            const cdk = document.getElementById('cdk-input').value.trim().toUpperCase();
            const messageEl = document.getElementById('message');
            const redeemBtn = document.getElementById('redeem-btn');
            const loadingEl = document.getElementById('loading');
            
            // 验证输入
            if (!cdk) {
                showMessage("请输入CDK兑换码", "error");
                return;
            }
            
            // 检查是否已兑换
            if (redeemedCDKs.some(item => item.cdk === cdk)) {
                showMessage("该CDK已兑换过", "error");
                return;
            }
            
            // 开始验证
            redeemBtn.disabled = true;
            loadingEl.style.display = "inline-block";
            showMessage("正在验证CDK...", "");
            
            try {
                // 1. 获取所有CDK Issue
                const issues = await fetchGitHubIssues();
                
                // 2. 在Issue评论中查找CDK
                const cdkInfo = await findCDKInIssues(cdk, issues);
                
                if (cdkInfo) {
                    // 3. 验证成功
                    await handleValidCDK(cdk, cdkInfo.websites);
                    showMessage("兑换成功！", "success");
                    
                    // 4. 显示可访问网站
                    showWebsites();
                    showHistory();
                } else {
                    showMessage("无效的CDK兑换码", "error");
                }
            } catch (error) {
                console.error("CDK验证失败:", error);
                showMessage("验证失败，请稍后重试", "error");
            } finally {
                redeemBtn.disabled = false;
                loadingEl.style.display = "none";
                document.getElementById('cdk-input').value = "";
            }
        }
        
        // 从GitHub获取所有CDK Issue
        async function fetchGitHubIssues() {
            try {
                const response = await fetch(
                    `https://api.github.com/repos/${repoOwner}/${repoName}/issues?labels=${cdkLabel}`
                );
                
                if (!response.ok) {
                    throw new Error(`GitHub API请求失败: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error("获取GitHub Issues失败:", error);
                throw error;
            }
        }
        
        // 在Issue评论中查找CDK
        async function findCDKInIssues(cdk, issues) {
            for (const issue of issues) {
                try {
                    const comments = await fetchComments(issue.comments_url);
                    
                    for (const comment of comments) {
                        // 检查评论中是否包含CDK
                        if (comment.body && comment.body.includes(cdk)) {
                            // 提取网站信息
                            const websites = extractWebsitesFromComment(comment.body);
                            if (websites.length > 0) {
                                return { cdk, websites, issue };
                            }
                        }
                    }
                } catch (error) {
                    console.error(`处理Issue #${issue.number}失败:`, error);
                }
            }
            return null;
        }
        
        // 获取Issue评论
        async function fetchComments(commentsUrl) {
            const response = await fetch(commentsUrl);
            if (!response.ok) {
                throw new Error(`获取评论失败: ${response.status}`);
            }
            return await response.json();
        }
        
        // 从评论中提取网站信息
        function extractWebsitesFromComment(commentBody) {
            const websites = [];
            
            // 尝试从标准格式中提取
            const sitesSection = commentBody.split('可访问网站:')[1] || 
                               commentBody.split('Accessible websites:')[1];
            
            if (sitesSection) {
                const sitesText = sitesSection.split('\n')
                    .map(line => line.trim())
                    .filter(line => line && !line.startsWith('```'));
                
                for (const line of sitesText) {
                    const parts = line.split(',');
                    if (parts.length >= 1) {
                        const url = parts[0].trim();
                        const name = parts[1]?.trim() || url;
                        websites.push({ url, name });
                    }
                }
            }
            
            return websites;
        }
        
        // 处理有效CDK
        async function handleValidCDK(cdk, websites) {
            // 添加到本地存储
            redeemedCDKs.push({ 
                cdk, 
                date: new Date().toLocaleString(),
                websites: websites.map(w => w.url)
            });
            
            // 合并网站列表，去重
            const newWebsites = [...accessibleWebsites];
            websites.forEach(website => {
                if (!newWebsites.some(w => w.url === website.url)) {
                    newWebsites.push(website);
                }
            });
            
            // 保存到本地存储
            localStorage.setItem('redeemedCDKs', JSON.stringify(redeemedCDKs));
            localStorage.setItem('accessibleWebsites', JSON.stringify(newWebsites));
            accessibleWebsites = newWebsites;
        }
        
        // 显示可访问网站
        function showWebsites() {
            const websiteListEl = document.getElementById('website-list');
            const websitesSection = document.getElementById('websites');
            
            websiteListEl.innerHTML = '';
            
            if (accessibleWebsites.length === 0) {
                websitesSection.style.display = 'none';
                return;
            }
            
            websitesSection.style.display = 'block';
            
            accessibleWebsites.forEach(website => {
                const card = document.createElement('div');
                card.className = 'website-card';
                card.innerHTML = `
                    <div class="website-info">
                        <h3>${website.name}</h3>
                        <small>${website.url}</small>
                    </div>
                    <a href="${website.url}" target="_blank">
                        <button>访问</button>
                    </a>
                `;
                websiteListEl.appendChild(card);
            });
        }
        
        // 显示兑换历史
        function showHistory() {
            const historyListEl = document.getElementById('history-list');
            
            if (redeemedCDKs.length === 0) {
                historyListEl.innerHTML = "<p>暂无兑换历史</p>";
                return;
            }
            
            historyListEl.innerHTML = redeemedCDKs.map(cdk => `
                <div class="website-card">
                    <div>
                        <strong>${cdk.cdk}</strong>
                        <div><small>兑换时间: ${cdk.date}</small></div>
                        <div><small>解锁网站: ${cdk.websites.length}个</small></div>
                    </div>
                </div>
            `).join('');
        }
        
        // 显示消息
        function showMessage(text, type) {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            messageEl.className = type;
        }
    </script>
</body>
</html>
