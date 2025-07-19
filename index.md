<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roblox礼品卡兑换中心</title>
    <style>
        :root {
            --primary: #00a2ff;
            --secondary: #007acc;
            --dark: #1a1a1a;
            --light: #f0f0f0;
            --success: #00c853;
            --danger: #ff3d00;
            --warning: #ffab00;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #121212;
            color: white;
            min-height: 100vh;
            background-image: 
                radial-gradient(circle at 25% 25%, rgba(0, 162, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(0, 122, 204, 0.1) 0%, transparent 50%);
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 30px;
        }
        
        .logo {
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            display: flex;
            align-items: center;
        }
        
        .logo::before {
            content: "🎁";
            margin-right: 10px;
            font-size: 32px;
        }
        
        .admin-btn {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }
        
        .admin-btn:hover {
            background-color: var(--secondary);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .card {
            background-color: rgba(30, 30, 30, 0.8);
            border-radius: 10px;
            padding: 25px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 30px;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
        }
        
        .card-title {
            font-size: 22px;
            margin-bottom: 20px;
            color: var(--primary);
            display: flex;
            align-items: center;
        }
        
        .card-title::before {
            content: "✨";
            margin-right: 10px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        input, select {
            width: 100%;
            padding: 12px 15px;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            color: white;
            font-size: 16px;
            transition: all 0.3s;
        }
        
        input:focus, select:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(0, 162, 255, 0.3);
        }
        
        .btn {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            transition: all 0.3s;
            display: inline-block;
            text-align: center;
        }
        
        .btn-block {
            display: block;
            width: 100%;
        }
        
        .btn:hover {
            background-color: var(--secondary);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        .btn-success {
            background-color: var(--success);
        }
        
        .btn-danger {
            background-color: var(--danger);
        }
        
        .btn-warning {
            background-color: var(--warning);
            color: var(--dark);
        }
        
        .result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.1);
            display: none;
        }
        
        .success {
            background-color: rgba(0, 200, 83, 0.2);
            border-left: 4px solid var(--success);
            display: block;
        }
        
        .error {
            background-color: rgba(255, 61, 0, 0.2);
            border-left: 4px solid var(--danger);
            display: block;
        }
        
        .info {
            background-color: rgba(0, 162, 255, 0.2);
            border-left: 4px solid var(--primary);
            display: block;
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
        }
        
        .modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background-color: #1e1e1e;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            padding: 25px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            transform: translateY(-50px);
            transition: all 0.3s;
        }
        
        .modal.active .modal-content {
            transform: translateY(0);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .modal-title {
            font-size: 20px;
            font-weight: bold;
            color: var(--primary);
        }
        
        .close-modal {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .close-modal:hover {
            color: var(--danger);
            transform: rotate(90deg);
        }
        
        .tabs {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .tab {
            padding: 10px 20px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s;
        }
        
        .tab.active {
            border-bottom-color: var(--primary);
            color: var(--primary);
            font-weight: bold;
        }
        
        .tab-content {
            display: none;
        }
        
        .tab-content.active {
            display: block;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        
        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        th {
            background-color: rgba(0, 162, 255, 0.2);
            color: var(--primary);
        }
        
        tr:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 50px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .badge-success {
            background-color: rgba(0, 200, 83, 0.2);
            color: var(--success);
        }
        
        .badge-danger {
            background-color: rgba(255, 61, 0, 0.2);
            color: var(--danger);
        }
        
        .badge-warning {
            background-color: rgba(255, 171, 0, 0.2);
            color: var(--warning);
        }
        
        .hidden {
            display: none;
        }
        
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
            margin-left: 10px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .roblox-login {
            background-color: #212121;
            border-radius: 8px;
            padding: 30px;
            max-width: 400px;
            margin: 0 auto;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .roblox-header {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .roblox-logo {
            font-size: 32px;
            font-weight: bold;
            color: white;
            margin-bottom: 10px;
        }
        
        .roblox-title {
            font-size: 18px;
            color: #aaa;
        }
        
        .roblox-input {
            background-color: #2d2d2d;
            border: 1px solid #3d3d3d;
            color: white;
        }
        
        .roblox-input:focus {
            border-color: var(--primary);
        }
        
        .roblox-btn {
            background-color: var(--primary);
            width: 100%;
        }
        
        .roblox-footer {
            text-align: center;
            margin-top: 20px;
            color: #777;
            font-size: 14px;
        }
        
        .order-result {
            background-color: rgba(30, 30, 30, 0.8);
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            border-left: 4px solid var(--primary);
        }
        
        .order-result h4 {
            margin-bottom: 10px;
            color: var(--primary);
        }
        
        .order-result p {
            margin-bottom: 5px;
        }
        
        .order-result .highlight {
            color: var(--primary);
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">Roblox礼品卡兑换中心</div>
            <button class="admin-btn" id="adminBtn">管理员登录</button>
        </header>
        
        <div class="card">
            <h2 class="card-title">礼品卡兑换</h2>
            <div id="loginSection">
                <div class="roblox-login">
                    <div class="roblox-header">
                        <div class="roblox-logo">Roblox</div>
                        <div class="roblox-title">登录以兑换您的礼品卡</div>
                    </div>
                    <div class="form-group">
                        <label for="username">用户名</label>
                        <input type="text" id="username" class="roblox-input" placeholder="输入您的Roblox用户名">
                    </div>
                    <div class="form-group">
                        <label for="password">密码</label>
                        <input type="password" id="password" class="roblox-input" placeholder="输入您的密码">
                    </div>
                    <button class="btn roblox-btn" id="loginBtn">登录</button>
                    <div class="roblox-footer">
                        兑换礼品卡即表示您同意我们的服务条款
                    </div>
                </div>
            </div>
            
            <div id="redeemSection" class="hidden">
                <div class="form-group">
                    <label for="cardCode">礼品卡代码</label>
                    <input type="text" id="cardCode" placeholder="输入16位礼品卡代码">
                </div>
                <button class="btn btn-block" id="redeemBtn">兑换礼品卡</button>
                <div id="redeemResult" class="result"></div>
            </div>
        </div>
        
        <div class="card">
            <h2 class="card-title">订单查询</h2>
            <div class="form-group">
                <label for="orderId">订单ID或卡密</label>
                <input type="text" id="orderId" placeholder="输入订单ID或卡密">
            </div>
            <button class="btn btn-block" id="queryOrderBtn">查询订单</button>
            <div id="orderResult" class="order-result hidden">
                <h4>订单详情</h4>
                <p><span class="highlight">订单ID:</span> <span id="resultOrderId"></span></p>
                <p><span class="highlight">卡密:</span> <span id="resultCardCode"></span></p>
                <p><span class="highlight">用户名:</span> <span id="resultUsername"></span></p>
                <p><span class="highlight">兑换时间:</span> <span id="resultRedeemTime"></span></p>
                <p><span class="highlight">金额:</span> <span id="resultAmount"></span> 元</p>
                <p><span class="highlight">状态:</span> <span id="resultStatus"></span></p>
            </div>
        </div>
    </div>
    
    <!-- 管理员登录模态框 -->
    <div class="modal" id="adminModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">管理员登录</h3>
                <button class="close-modal" id="closeAdminModal">&times;</button>
            </div>
            <div class="form-group">
                <label for="adminUsername">管理员账号</label>
                <input type="text" id="adminUsername" placeholder="输入管理员账号">
            </div>
            <div class="form-group">
                <label for="adminPassword">管理员密码</label>
                <input type="password" id="adminPassword" placeholder="输入管理员密码">
            </div>
            <button class="btn btn-block" id="adminLoginBtn">登录</button>
            <div id="adminLoginResult" class="result"></div>
        </div>
    </div>
    
    <!-- 管理员后台模态框 -->
    <div class="modal" id="adminPanelModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">管理员后台</h3>
                <button class="close-modal" id="closeAdminPanelModal">&times;</button>
            </div>
            
            <div class="tabs">
                <div class="tab active" data-tab="generate">生成卡密</div>
                <div class="tab" data-tab="check">检测卡密</div>
                <div class="tab" data-tab="users">用户数据</div>
            </div>
            
            <div class="tab-content active" id="generateTab">
                <div class="form-group">
                    <label for="cardAmount">卡密金额 (元)</label>
                    <input type="number" id="cardAmount" placeholder="输入卡密金额" min="1">
                </div>
                <div class="form-group">
                    <label for="cardQuantity">生成数量</label>
                    <input type="number" id="cardQuantity" placeholder="输入生成数量" min="1" value="1">
                </div>
                <button class="btn btn-block" id="generateCardBtn">生成卡密</button>
                <div id="generateResult" class="result"></div>
                <div id="generatedCards" class="result info hidden">
                    <h4>生成的卡密:</h4>
                    <textarea id="cardCodesOutput" rows="5" style="width: 100%; background: transparent; color: white; border: 1px solid rgba(255,255,255,0.2); padding: 10px; border-radius: 5px; margin-top: 10px;"></textarea>
                    <button class="btn btn-success" id="copyCardsBtn" style="margin-top: 10px;">复制卡密</button>
                </div>
            </div>
            
            <div class="tab-content" id="checkTab">
                <div class="form-group">
                    <label for="checkCardCode">卡密代码</label>
                    <input type="text" id="checkCardCode" placeholder="输入要检测的卡密">
                </div>
                <button class="btn btn-block" id="checkCardBtn">检测卡密</button>
                <div id="checkCardResult" class="result"></div>
            </div>
            
            <div class="tab-content" id="usersTab">
                <div class="form-group">
                    <input type="text" id="searchUser" placeholder="搜索用户名或卡密" style="margin-bottom: 15px;">
                    <button class="btn btn-block" id="searchUserBtn">搜索</button>
                </div>
                <div style="overflow-x: auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>用户名</th>
                                <th>密码</th>
                                <th>卡密</th>
                                <th>金额</th>
                                <th>兑换时间</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody id="usersTableBody">
                            <!-- 用户数据将在这里动态生成 -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // 初始化本地存储
        if (!localStorage.getItem('cardSystem')) {
            const initialData = {
                cards: [
                    { code: 'KUNSHU520', amount: 100, used: false, usedBy: '', usedAt: '' }
                ],
                users: [],
                orders: []
            };
            localStorage.setItem('cardSystem', JSON.stringify(initialData));
        }
        
        // 获取DOM元素
        const adminBtn = document.getElementById('adminBtn');
        const adminModal = document.getElementById('adminModal');
        const closeAdminModal = document.getElementById('closeAdminModal');
        const adminLoginBtn = document.getElementById('adminLoginBtn');
        const adminLoginResult = document.getElementById('adminLoginResult');
        const adminPanelModal = document.getElementById('adminPanelModal');
        const closeAdminPanelModal = document.getElementById('closeAdminPanelModal');
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        const generateCardBtn = document.getElementById('generateCardBtn');
        const generateResult = document.getElementById('generateResult');
        const cardCodesOutput = document.getElementById('cardCodesOutput');
        const copyCardsBtn = document.getElementById('copyCardsBtn');
        const generatedCards = document.getElementById('generatedCards');
        const checkCardBtn = document.getElementById('checkCardBtn');
        const checkCardResult = document.getElementById('checkCardResult');
        const usersTableBody = document.getElementById('usersTableBody');
        const searchUserBtn = document.getElementById('searchUserBtn');
        const loginBtn = document.getElementById('loginBtn');
        const redeemBtn = document.getElementById('redeemBtn');
        const loginSection = document.getElementById('loginSection');
        const redeemSection = document.getElementById('redeemSection');
        const redeemResult = document.getElementById('redeemResult');
        const queryOrderBtn = document.getElementById('queryOrderBtn');
        const orderResult = document.getElementById('orderResult');
        
        // 当前登录用户
        let currentUser = null;
        
        // 打开管理员登录模态框
        adminBtn.addEventListener('click', () => {
            adminModal.classList.add('active');
        });
        
        // 关闭管理员登录模态框
        closeAdminModal.addEventListener('click', () => {
            adminModal.classList.remove('active');
            adminLoginResult.textContent = '';
            adminLoginResult.className = 'result';
        });
        
        // 管理员登录
        adminLoginBtn.addEventListener('click', () => {
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;
            
            if (username === 'admin' && password === '123456') {
                adminLoginResult.textContent = '登录成功！';
                adminLoginResult.className = 'result success';
                
                setTimeout(() => {
                    adminModal.classList.remove('active');
                    adminPanelModal.classList.add('active');
                    adminLoginResult.textContent = '';
                    adminLoginResult.className = 'result';
                    document.getElementById('adminUsername').value = '';
                    document.getElementById('adminPassword').value = '';
                    
                    // 加载用户数据
                    loadUsersData();
                }, 1000);
            } else {
                adminLoginResult.textContent = '账号或密码错误！';
                adminLoginResult.className = 'result error';
            }
        });
        
        // 关闭管理员后台模态框
        closeAdminPanelModal.addEventListener('click', () => {
            adminPanelModal.classList.remove('active');
        });
        
        // 切换标签页
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(tabId + 'Tab').classList.add('active');
            });
        });
        
        // 生成卡密
        generateCardBtn.addEventListener('click', () => {
            const amount = parseInt(document.getElementById('cardAmount').value);
            const quantity = parseInt(document.getElementById('cardQuantity').value);
            
            if (!amount || amount <= 0) {
                generateResult.textContent = '请输入有效的金额！';
                generateResult.className = 'result error';
                return;
            }
            
            if (!quantity || quantity <= 0 || quantity > 100) {
                generateResult.textContent = '请输入有效的数量 (1-100)！';
                generateResult.className = 'result error';
                return;
            }
            
            const systemData = JSON.parse(localStorage.getItem('cardSystem'));
            const newCards = [];
            
            for (let i = 0; i < quantity; i++) {
                const code = generateCardCode();
                newCards.push({
                    code: code,
                    amount: amount,
                    used: false,
                    usedBy: '',
                    usedAt: ''
                });
            }
            
            systemData.cards = systemData.cards.concat(newCards);
            localStorage.setItem('cardSystem', JSON.stringify(systemData));
            
            // 显示生成的卡密
            const codesText = newCards.map(card => `${card.code} - ${card.amount}元`).join('\n');
            cardCodesOutput.value = codesText;
            generatedCards.classList.remove('hidden');
            
            generateResult.textContent = `成功生成 ${quantity} 张卡密，总金额 ${amount * quantity} 元！`;
            generateResult.className = 'result success';
        });
        
        // 复制卡密
        copyCardsBtn.addEventListener('click', () => {
            cardCodesOutput.select();
            document.execCommand('copy');
            
            const originalText = copyCardsBtn.textContent;
            copyCardsBtn.textContent = '已复制！';
            
            setTimeout(() => {
                copyCardsBtn.textContent = originalText;
            }, 2000);
        });
        
        // 检测卡密
        checkCardBtn.addEventListener('click', () => {
            const code = document.getElementById('checkCardCode').value.trim();
            
            if (!code) {
                checkCardResult.textContent = '请输入卡密代码！';
                checkCardResult.className = 'result error';
                return;
            }
            
            const systemData = JSON.parse(localStorage.getItem('cardSystem'));
            const card = systemData.cards.find(c => c.code === code);
            
            if (!card) {
                checkCardResult.textContent = '卡密不存在！';
                checkCardResult.className = 'result error';
                return;
            }
            
            if (card.used) {
                checkCardResult.innerHTML = `
                    <p>卡密: <strong>${card.code}</strong></p>
                    <p>金额: <strong>${card.amount} 元</strong></p>
                    <p>状态: <span class="badge badge-danger">已使用</span></p>
                    <p>使用者: <strong>${card.usedBy}</strong></p>
                    <p>使用时间: <strong>${card.usedAt}</strong></p>
                `;
                checkCardResult.className = 'result error';
            } else {
                checkCardResult.innerHTML = `
                    <p>卡密: <strong>${card.code}</strong></p>
                    <p>金额: <strong>${card.amount} 元</strong></p>
                    <p>状态: <span class="badge badge-success">未使用</span></p>
                `;
                checkCardResult.className = 'result success';
            }
        });
        
        // 加载用户数据
        function loadUsersData(searchTerm = '') {
            const systemData = JSON.parse(localStorage.getItem('cardSystem'));
            let users = systemData.users;
            
            if (searchTerm) {
                searchTerm = searchTerm.toLowerCase();
                users = users.filter(user => 
                    user.username.toLowerCase().includes(searchTerm) || 
                    user.cardCode.toLowerCase().includes(searchTerm)
                );
            }
            
            usersTableBody.innerHTML = '';
            
            if (users.length === 0) {
                usersTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">没有找到用户数据</td></tr>';
                return;
            }
            
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>${user.cardCode}</td>
                    <td>${user.amount} 元</td>
                    <td>${user.redeemTime}</td>
                    <td><span class="badge badge-success">已兑换</span></td>
                `;
                usersTableBody.appendChild(row);
            });
        }
        
        // 搜索用户
        searchUserBtn.addEventListener('click', () => {
            const searchTerm = document.getElementById('searchUser').value;
            loadUsersData(searchTerm);
        });
        
        // 生成随机卡密
        function generateCardCode() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            
            for (let i = 0; i < 16; i++) {
                if (i > 0 && i % 4 === 0) result += '-';
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            
            return result;
        }
        
        // 用户登录
        loginBtn.addEventListener('click', () => {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!username || !password) {
                redeemResult.textContent = '请输入用户名和密码！';
                redeemResult.className = 'result error';
                return;
            }
            
            // 模拟登录过程
            redeemResult.textContent = '登录中...';
            redeemResult.className = 'result info';
            
            setTimeout(() => {
                currentUser = { username, password };
                loginSection.classList.add('hidden');
                redeemSection.classList.remove('hidden');
                redeemResult.textContent = '';
                redeemResult.className = 'result';
            }, 1500);
        });
        
        // 兑换礼品卡
        redeemBtn.addEventListener('click', () => {
            const cardCode = document.getElementById('cardCode').value.trim().toUpperCase();
            
            if (!cardCode) {
                redeemResult.textContent = '请输入礼品卡代码！';
                redeemResult.className = 'result error';
                return;
            }
            
            const systemData = JSON.parse(localStorage.getItem('cardSystem'));
            const cardIndex = systemData.cards.findIndex(c => c.code === cardCode);
            
            if (cardIndex === -1) {
                redeemResult.textContent = '无效的礼品卡代码！';
                redeemResult.className = 'result error';
                return;
            }
            
            if (systemData.cards[cardIndex].used) {
                redeemResult.textContent = '该礼品卡已被使用！';
                redeemResult.className = 'result error';
                return;
            }
            
            // 标记卡密为已使用
            systemData.cards[cardIndex].used = true;
            systemData.cards[cardIndex].usedBy = currentUser.username;
            systemData.cards[cardIndex].usedAt = new Date().toLocaleString();
            
            // 创建订单
            const orderId = 'ORD-' + Date.now();
            const amount = systemData.cards[cardIndex].amount;
            const robux = amount * 10; // 100元=10Robux
            
            const order = {
                orderId,
                cardCode,
                username: currentUser.username,
                amount,
                robux,
                redeemTime: new Date().toLocaleString(),
                status: '已完成'
            };
            
            // 保存用户数据
            const userData = {
                username: currentUser.username,
                password: currentUser.password,
                cardCode,
                amount,
                robux,
                redeemTime: new Date().toLocaleString()
            };
            
            systemData.orders.push(order);
            systemData.users.push(userData);
            localStorage.setItem('cardSystem', JSON.stringify(systemData));
            
            redeemResult.innerHTML = `
                <p>兑换成功！</p>
                <p>订单ID: <strong>${orderId}</strong></p>
                <p>获得Robux: <strong>${robux}</strong></p>
                <p>卡密金额: <strong>${amount} 元</strong></p>
                <p>兑换时间: <strong>${order.redeemTime}</strong></p>
            `;
            redeemResult.className = 'result success';
            
            // 清空输入框
            document.getElementById('cardCode').value = '';
        });
        
        // 查询订单
        queryOrderBtn.addEventListener('click', () => {
            const query = document.getElementById('orderId').value.trim();
            
            if (!query) {
                orderResult.classList.add('hidden');
                return;
            }
            
            const systemData = JSON.parse(localStorage.getItem('cardSystem'));
            let order = null;
            
            // 先尝试按订单ID查找
            order = systemData.orders.find(o => o.orderId === query);
            
            // 如果没有找到，尝试按卡密查找
            if (!order) {
                order = systemData.orders.find(o => o.cardCode === query);
            }
            
            if (order) {
                document.getElementById('resultOrderId').textContent = order.orderId;
                document.getElementById('resultCardCode').textContent = order.cardCode;
                document.getElementById('resultUsername').textContent = order.username;
                document.getElementById('resultRedeemTime').textContent = order.redeemTime;
                document.getElementById('resultAmount').textContent = order.amount;
                document.getElementById('resultStatus').textContent = order.status;
                orderResult.classList.remove('hidden');
            } else {
                orderResult.classList.add('hidden');
                const tempResult = document.createElement('div');
                tempResult.className = 'result error';
                tempResult.textContent = '未找到相关订单！';
                orderResult.parentNode.insertBefore(tempResult, orderResult.nextSibling);
                
                setTimeout(() => {
                    tempResult.remove();
                }, 3000);
            }
        });
        
        // 初始化页面
        loadUsersData();
    </script>
</body>
</html>
