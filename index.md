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
        }
        input, button {
            padding: 10px;
            margin: 5px 0;
            border-radius: 3px;
            border: 1px solid #ddd;
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
        }
        .error {
            color: #f44336;
        }
        .success {
            color: #4CAF50;
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
            <input type="text" id="cdk-input" placeholder="输入CDK兑换码">
            <button onclick="redeemCDK()">兑换</button>
            <p id="message"></p>
        </div>
        
        <div id="websites">
            <h2>您的可访问网站</h2>
            <div id="website-list"></div>
        </div>
    </div>

    <script>
        // 模拟数据库 - 实际应该使用GitHub API检查
        const validWebsites = {
            "GAME-1234": ["https://example.com/game1", "游戏1"],
            "GAME-ABCD": ["https://example.com/game2", "游戏2"],
            "VIP-2023": ["https://example.com/vip", "VIP专区"],
            "MULTI-001": [
                ["https://site1.example.com", "网站1"],
                ["https://site2.example.com", "网站2"]
            ]
        };

        // 存储已兑换的CDK
        let redeemedCDKs = JSON.parse(localStorage.getItem('redeemedCDKs') || [];
        
        function redeemCDK() {
            const cdk = document.getElementById('cdk-input').value.trim();
            const messageEl = document.getElementById('message');
            
            if (!cdk) {
                messageEl.textContent = "请输入CDK兑换码";
                messageEl.className = "error";
                return;
            }
            
            // 检查是否已兑换
            if (redeemedCDKs.includes(cdk)) {
                messageEl.textContent = "该CDK已兑换过";
                messageEl.className = "error";
                return;
            }
            
            // 检查CDK有效性
            if (validWebsites[cdk]) {
                redeemedCDKs.push(cdk);
                localStorage.setItem('redeemedCDKs', JSON.stringify(redeemedCDKs));
                messageEl.textContent = "兑换成功！";
                messageEl.className = "success";
                
                // 显示可访问的网站
                showWebsites();
            } else {
                messageEl.textContent = "无效的CDK兑换码";
                messageEl.className = "error";
            }
        }
        
        function showWebsites() {
            const websiteListEl = document.getElementById('website-list');
            const websitesSection = document.getElementById('websites');
            
            websiteListEl.innerHTML = '';
            websitesSection.style.display = 'block';
            
            redeemedCDKs.forEach(cdk => {
                const websites = validWebsites[cdk];
                
                if (Array.isArray(websites[0])) {
                    // 多个网站
                    websites.forEach(web => {
                        addWebsiteCard(web[0], web[1]);
                    });
                } else {
                    // 单个网站
                    addWebsiteCard(websites[0], websites[1]);
                }
            });
        }
        
        function addWebsiteCard(url, name) {
            const websiteListEl = document.getElementById('website-list');
            const card = document.createElement('div');
            card.className = 'website-card';
            card.innerHTML = `
                <h3>${name}</h3>
                <a href="${url}" target="_blank">访问网站</a>
            `;
            websiteListEl.appendChild(card);
        }
        
        // 页面加载时检查已有兑换
        if (redeemedCDKs.length > 0) {
            showWebsites();
        }
    </script>
</body>
</html>
