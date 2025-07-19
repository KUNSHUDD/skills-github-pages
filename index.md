<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KUNSHU 卡密管理系统</title>
    <style>
        :root {
            --primary: #6c5ce7;
            --secondary: #a29bfe;
            --dark: #2d3436;
            --light: #f5f6fa;
            --success: #00b894;
            --danger: #d63031;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #2d3436, #000000);
            color: var(--light);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow-x: hidden;
        }
        
        .container {
            width: 90%;
            max-width: 1200px;
            background: rgba(45, 52, 54, 0.8);
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            padding: 30px;
            margin: 20px 0;
            position: relative;
            overflow: hidden;
        }
        
        .container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(108, 92, 231, 0.1), transparent 70%);
            animation: rotate 20s linear infinite;
            z-index: -1;
        }
        
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        h1, h2, h3 {
            color: var(--light);
            text-align: center;
            margin-bottom: 20px;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            font-size: 2.5rem;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }
        
        input, select, button {
            width: 100%;
            padding: 12px 15px;
            border: none;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.1);
            color: var(--light);
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        input:focus, select:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 0 2px var(--primary);
        }
        
        button {
            background: linear-gradient(to right, var(--primary), var(--secondary));
            color: white;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
            box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(108, 92, 231, 0.6);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        .card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        .hidden {
            display: none;
        }
        
        .result {
            margin-top: 20px;
            padding: 15px;
            border-radius: 10px;
            background: rgba(0, 184, 148, 0.1);
            border-left: 4px solid var(--success);
            word-break: break-all;
        }
        
        .error {
            background: rgba(214, 48, 49, 0.1);
            border-left: 4px solid var(--danger);
        }
        
        .tabs {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .tab {
            padding: 10px 20px;
            cursor: pointer;
            position: relative;
            opacity: 0.7;
            transition: all 0.3s ease;
        }
        
        .tab:hover {
            opacity: 1;
        }
        
        .tab.active {
            opacity: 1;
            color: var(--primary);
        }
        
        .tab.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            border-radius: 3px 3px 0 0;
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
            background: rgba(108, 92, 231, 0.2);
            font-weight: 500;
        }
        
        tr:hover {
            background: rgba(255, 255, 255, 0.05);
        }
        
        .robox-login {
            max-width: 400px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
        }
        
        .robox-login::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(to right, #ff4757, #eccc68, #2ed573, #1e90ff);
        }
        
        .robox-logo {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .robox-logo img {
            width: 150px;
            height: auto;
        }
        
        .glow {
            animation: glow 2s infinite alternate;
        }
        
        @keyframes glow {
            from {
                box-shadow: 0 0 5px rgba(108, 92, 231, 0.5);
            }
            to {
                box-shadow: 0 0 20px rgba(108, 92, 231, 0.8);
            }
        }
        
        .admin-panel {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .admin-btn {
            background: var(--danger);
            padding: 8px 15px;
            border-radius: 50px;
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            box-shadow: 0 4px 10px rgba(214, 48, 49, 0.4);
        }
        
        .admin-btn i {
            margin-right: 5px;
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        }
        
        .modal.active {
            opacity: 1;
            pointer-events: all;
        }
        
        .modal-content {
            background: var(--dark);
            border-radius: 15px;
            padding: 30px;
            width: 90%;
            max-width: 500px;
            transform: scale(0.8);
            transition: all 0.3s ease;
            position: relative;
        }
        
        .modal.active .modal-content {
            transform: scale(1);
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: var(--light);
            opacity: 0.7;
        }
        
        .close-modal:hover {
            opacity: 1;
        }
        
        .dashboard {
            display: grid;
            grid-template-columns: 250px 1fr;
            gap: 20px;
        }
        
        .sidebar {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            padding: 20px;
        }
        
        .sidebar-menu {
            list-style: none;
        }
        
        .sidebar-menu li {
            margin-bottom: 10px;
        }
        
        .sidebar-menu a {
            display: block;
            padding: 10px 15px;
            color: var(--light);
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .sidebar-menu a:hover, .sidebar-menu a.active {
            background: rgba(108, 92, 231, 0.3);
            color: var(--secondary);
        }
        
        .main-content {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px;
            padding: 20px;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            padding: 15px;
            text-align: center;
        }
        
        .stat-card h3 {
            font-size: 14px;
            margin-bottom: 10px;
            color: var(--secondary);
        }
        
        .stat-card p {
            font-size: 24px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <!-- 主界面 -->
    <div class="container" id="main-container">
        <h1>KUNSHU 卡密管理系统</h1>
        
        <div class="tabs">
            <div class="tab active" data-tab="generate">生成卡密</div>
            <div class="tab" data-tab="redeem">兑换礼品卡</div>
            <div class="tab" data-tab="orders">订单查询</div>
        </div>
        
        <!-- 生成卡密 -->
        <div class="tab-content" id="generate-tab">
            <div class="card">
                <h3>生成新卡密</h3>
                <div class="form-group">
                    <label for="generate-amount">金额 (元)</label>
                    <input type="number" id="generate-amount" placeholder="输入要生成的卡密金额" min="10" step="10">
                </div>
                <div class="form-group">
                    <label for="generate-quantity">数量</label>
                    <input type="number" id="generate-quantity" placeholder="输入要生成的卡密数量" min="1" value="1">
                </div>
                <button id="generate-btn">生成卡密</button>
                <div class="result hidden" id="generate-result"></div>
            </div>
        </div>
        
        <!-- 兑换礼品卡 -->
        <div class="tab-content hidden" id="redeem-tab">
            <div class="robox-login" id="login-section">
                <div class="robox-logo">
                    <svg viewBox="0 0 56 18" width="120" height="40" fill="#fff">
                        <path d="M10.8 10.8h3.6V7.2h-3.6v3.6zM7.2 7.2H3.6v3.6h3.6V7.2zm14.4-3.6h-3.6v3.6h3.6V3.6zm-3.6 14.4h3.6v-3.6h-3.6v3.6zm7.2-7.2h3.6V7.2h-3.6v3.6z"></path>
                    </svg>
                    <h3>兑换礼品卡</h3>
                </div>
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input type="text" id="username" placeholder="输入您的用户名">
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input type="password" id="password" placeholder="输入您的密码">
                </div>
                <button id="login-btn">登录</button>
            </div>
            
            <div class="card hidden" id="redeem-section">
                <h3>输入礼品卡卡密</h3>
                <div class="form-group">
                    <label for="card-code">卡密</label>
                    <input type="text" id="card-code" placeholder="输入礼品卡卡密">
                </div>
                <button id="redeem-btn">兑换</button>
                <div class="result hidden" id="redeem-result"></div>
            </div>
        </div>
        
        <!-- 订单查询 -->
        <div class="tab-content hidden" id="orders-tab">
            <div class="card">
                <h3>订单查询</h3>
                <div class="form-group">
                    <label for="search-type">查询类型</label>
                    <select id="search-type">
                        <option value="card">按卡密查询</option>
                        <option value="date">按日期查询</option>
                        <option value="amount">按金额查询</option>
                    </select>
                </div>
                <div class="form-group" id="search-input-container">
                    <label for="search-input">卡密</label>
                    <input type="text" id="search-input" placeholder="输入要查询的卡密">
                </div>
                <button id="search-btn">查询</button>
                
                <div class="result hidden" id="search-result">
                    <table>
                        <thead>
                            <tr>
                                <th>卡密</th>
                                <th>金额</th>
                                <th>生成时间</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody id="orders-table">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 管理员按钮 -->
    <div class="admin-panel">
        <div class="admin-btn" id="admin-btn">
            <i>🔑</i> 管理员
        </div>
    </div>
    
    <!-- 管理员登录模态框 -->
    <div class="modal" id="admin-login-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>管理员登录</h2>
            <div class="form-group">
                <label for="admin-username">用户名</label>
                <input type="text" id="admin-username" placeholder="输入管理员用户名">
            </div>
            <div class="form-group">
                <label for="admin-password">密码</label>
                <input type="password" id="admin-password" placeholder="输入管理员密码">
            </div>
            <button id="admin-login-btn">登录</button>
            <div class="result hidden" id="admin-login-result"></div>
        </div>
    </div>
    
    <!-- 管理员面板 -->
    <div class="modal" id="admin-panel-modal">
        <div class="modal-content" style="max-width: 900px; width: 95%;">
            <span class="close-modal">&times;</span>
            <h2>管理员面板</h2>
            
            <div class="dashboard">
                <div class="sidebar">
                    <ul class="sidebar-menu">
                        <li><a href="#" class="active" data-admin-tab="dashboard">仪表盘</a></li>
                        <li><a href="#" data-admin-tab="cards">卡密管理</a></li>
                        <li><a href="#" data-admin-tab="users">用户管理</a></li>
                        <li><a href="#" data-admin-tab="transactions">交易记录</a></li>
                        <li><a href="#" data-admin-tab="settings">系统设置</a></li>
                    </ul>
                </div>
                
                <div class="main-content">
                    <!-- 仪表盘 -->
                    <div class="admin-tab-content" id="admin-dashboard-tab">
                        <h3>系统概览</h3>
                        <div class="stats">
                            <div class="stat-card">
                                <h3>总卡密数量</h3>
                                <p id="total-cards">0</p>
                            </div>
                            <div class="stat-card">
                                <h3>已使用卡密</h3>
                                <p id="used-cards">0</p>
                            </div>
                            <div class="stat-card">
                                <h3>总金额</h3>
                                <p id="total-amount">¥0</p>
                            </div>
                            <div class="stat-card">
                                <h3>兑换金额</h3>
                                <p id="redeemed-amount">¥0</p>
                            </div>
                        </div>
                        
                        <h3>最近交易</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>时间</th>
                                    <th>用户</th>
                                    <th>卡密</th>
                                    <th>金额</th>
                                </tr>
                            </thead>
                            <tbody id="recent-transactions">
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- 卡密管理 -->
                    <div class="admin-tab-content hidden" id="admin-cards-tab">
                        <h3>卡密管理</h3>
                        <div class="form-group">
                            <label for="admin-card-filter">筛选</label>
                            <select id="admin-card-filter">
                                <option value="all">全部</option>
                                <option value="used">已使用</option>
                                <option value="unused">未使用</option>
                            </select>
                        </div>
                        <button id="admin-export-cards">导出卡密</button>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>卡密</th>
                                    <th>金额</th>
                                    <th>生成时间</th>
                                    <th>使用时间</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="admin-cards-table">
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- 用户管理 -->
                    <div class="admin-tab-content hidden" id="admin-users-tab">
                        <h3>用户管理</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>用户名</th>
                                    <th>注册时间</th>
                                    <th>最后登录</th>
                                    <th>兑换总额</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="admin-users-table">
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- 交易记录 -->
                    <div class="admin-tab-content hidden" id="admin-transactions-tab">
                        <h3>交易记录</h3>
                        <div class="form-group">
                            <label for="transaction-filter">筛选</label>
                            <select id="transaction-filter">
                                <option value="all">全部</option>
                                <option value="today">今天</option>
                                <option value="week">本周</option>
                                <option value="month">本月</option>
                            </select>
                        </div>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>时间</th>
                                    <th>用户</th>
                                    <th>卡密</th>
                                    <th>金额</th>
                                    <th>IP地址</th>
                                </tr>
                            </thead>
                            <tbody id="admin-transactions-table">
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- 系统设置 -->
                    <div class="admin-tab-content hidden" id="admin-settings-tab">
                        <h3>系统设置</h3>
                        <div class="form-group">
                            <label for="system-currency">货币单位</label>
                            <select id="system-currency">
                                <option value="CNY">人民币 (¥)</option>
                                <option value="USD">美元 ($)</option>
                                <option value="EUR">欧元 (€)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="system-rate">兑换比例 (100=?)</label>
                            <input type="number" id="system-rate" value="10">
                        </div>
                        <div class="form-group">
                            <label for="system-admin">管理员用户名</label>
                            <input type="text" id="system-admin" value="admin" disabled>
                        </div>
                        <button id="save-settings">保存设置</button>
                        <div class="result hidden" id="settings-result"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // 存储数据
        let cards = JSON.parse(localStorage.getItem('cards')) || [];
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        let settings = JSON.parse(localStorage.getItem('settings')) || {
            currency: 'CNY',
            rate: 10,
            admin: {
                username: 'admin',
                password: '123456'
            }
        };
        
        // 当前登录用户
        let currentUser = null;
        let adminLoggedIn = false;
        
        // DOM元素
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        const adminBtn = document.getElementById('admin-btn');
        const adminLoginModal = document.getElementById('admin-login-modal');
        const adminPanelModal = document.getElementById('admin-panel-modal');
        const closeModals = document.querySelectorAll('.close-modal');
        const adminLoginBtn = document.getElementById('admin-login-btn');
        const adminUsername = document.getElementById('admin-username');
        const adminPassword = document.getElementById('admin-password');
        const adminLoginResult = document.getElementById('admin-login-result');
        const adminTabs = document.querySelectorAll('[data-admin-tab]');
        const adminTabContents = document.querySelectorAll('.admin-tab-content');
        
        // 初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 绑定标签切换
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    const tabId = tab.getAttribute('data-tab') + '-tab';
                    tabContents.forEach(content => content.classList.add('hidden'));
                    document.getElementById(tabId).classList.remove('hidden');
                });
            });
            
            // 绑定管理员按钮
            adminBtn.addEventListener('click', () => {
                adminLoginModal.classList.add('active');
            });
            
            // 关闭模态框
            closeModals.forEach(close => {
                close.addEventListener('click', () => {
                    adminLoginModal.classList.remove('active');
                    adminPanelModal.classList.remove('active');
                });
            });
            
            // 点击模态框外部关闭
            [adminLoginModal, adminPanelModal].forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                });
            });
            
            // 管理员登录
            adminLoginBtn.addEventListener('click', () => {
                const username = adminUsername.value.trim();
                const password = adminPassword.value.trim();
                
                if (username === settings.admin.username && password === settings.admin.password) {
                    adminLoginResult.textContent = '登录成功！';
                    adminLoginResult.classList.remove('error');
                    adminLoginResult.classList.add('success');
                    adminLoginResult.classList.remove('hidden');
                    
                    adminLoggedIn = true;
                    
                    setTimeout(() => {
                        adminLoginModal.classList.remove('active');
                        adminPanelModal.classList.add('active');
                        adminUsername.value = '';
                        adminPassword.value = '';
                        adminLoginResult.classList.add('hidden');
                        
                        // 加载管理员面板数据
                        loadAdminDashboard();
                    }, 1000);
                } else {
                    adminLoginResult.textContent = '用户名或密码错误！';
                    adminLoginResult.classList.remove('success');
                    adminLoginResult.classList.add('error');
                    adminLoginResult.classList.remove('hidden');
                }
            });
            
            // 管理员标签切换
            adminTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    adminTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    const tabId = 'admin-' + tab.getAttribute('data-admin-tab') + '-tab';
                    adminTabContents.forEach(content => content.classList.add('hidden'));
                    document.getElementById(tabId).classList.remove('hidden');
                    
                    // 加载对应标签的数据
                    switch(tab.getAttribute('data-admin-tab')) {
                        case 'cards':
                            loadAdminCards();
                            break;
                        case 'users':
                            loadAdminUsers();
                            break;
                        case 'transactions':
                            loadAdminTransactions();
                            break;
                    }
                });
            });
            
            // 生成卡密
            document.getElementById('generate-btn').addEventListener('click', generateCards);
            
            // 登录
            document.getElementById('login-btn').addEventListener('click', loginUser);
            
            // 兑换卡密
            document.getElementById('redeem-btn').addEventListener('click', redeemCard);
            
            // 查询订单
            document.getElementById('search-btn').addEventListener('click', searchOrders);
            
            // 查询类型变化
            document.getElementById('search-type').addEventListener('change', function() {
                const container = document.getElementById('search-input-container');
                const input = document.getElementById('search-input');
                
                switch(this.value) {
                    case 'card':
                        container.innerHTML = '<label for="search-input">卡密</label>';
                        input = document.createElement('input');
                        input.type = 'text';
                        input.id = 'search-input';
                        input.placeholder = '输入要查询的卡密';
                        container.appendChild(input);
                        break;
                    case 'date':
                        container.innerHTML = '<label for="search-input">日期</label>';
                        input = document.createElement('input');
                        input.type = 'date';
                        input.id = 'search-input';
                        container.appendChild(input);
                        break;
                    case 'amount':
                        container.innerHTML = '<label for="search-input">金额</label>';
                        input = document.createElement('input');
                        input.type = 'number';
                        input.id = 'search-input';
                        input.placeholder = '输入要查询的金额';
                        input.min = '10';
                        input.step = '10';
                        container.appendChild(input);
                        break;
                }
            });
            
            // 保存设置
            document.getElementById('save-settings').addEventListener('click', saveSettings);
            
            // 导出卡密
            document.getElementById('admin-export-cards').addEventListener('click', exportCards);
            
            // 初始化设置
            document.getElementById('system-currency').value = settings.currency;
            document.getElementById('system-rate').value = settings.rate;
        });
        
        // 生成卡密
        function generateCards() {
            const amount = parseInt(document.getElementById('generate-amount').value);
            const quantity = parseInt(document.getElementById('generate-quantity').value);
            const result = document.getElementById('generate-result');
            
            if (!amount || amount < 10 || amount % 10 !== 0) {
                result.textContent = '请输入有效的金额（必须是10的倍数）';
                result.classList.remove('success');
                result.classList.add('error');
                result.classList.remove('hidden');
                return;
            }
            
            if (!quantity || quantity < 1) {
                result.textContent = '请输入有效的数量';
                result.classList.remove('success');
                result.classList.add('error');
                result.classList.remove('hidden');
                return;
            }
            
            const newCards = [];
            let cardsText = `成功生成 ${quantity} 张 ${amount} 元卡密：\n\n`;
            
            for (let i = 0; i < quantity; i++) {
                const card = {
                    code: generateCardCode(),
                    amount: amount,
                    generatedAt: new Date().toISOString(),
                    used: false,
                    usedAt: null,
                    usedBy: null
                };
                
                newCards.push(card);
                cardsText += `${card.code}\n`;
            }
            
            cards = [...cards, ...newCards];
            saveData('cards', cards);
            
            result.textContent = cardsText;
            result.classList.remove('error');
            result.classList.add('success');
            result.classList.remove('hidden');
        }
        
        // 生成卡密代码
        function generateCardCode() {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let code = '';
            
            for (let i = 0; i < 16; i++) {
                if (i > 0 && i % 4 === 0) code += '-';
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            
            // 确保卡密唯一
            if (cards.some(card => card.code === code)) {
                return generateCardCode();
            }
            
            return code;
        }
        
        // 用户登录
        function loginUser() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const loginSection = document.getElementById('login-section');
            const redeemSection = document.getElementById('redeem-section');
            
            if (!username || !password) {
                alert('请输入用户名和密码');
                return;
            }
            
            // 简单模拟登录
            currentUser = {
                username,
                password,
                lastLogin: new Date().toISOString()
            };
            
            // 如果用户不存在则创建
            if (!users.some(u => u.username === username)) {
                users.push({
                    username,
                    password,
                    registeredAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    totalRedeemed: 0
                });
                saveData('users', users);
            } else {
                // 更新最后登录时间
                users = users.map(u => {
                    if (u.username === username) {
                        u.lastLogin = new Date().toISOString();
                    }
                    return u;
                });
                saveData('users', users);
            }
            
            // 显示兑换界面
            loginSection.classList.add('hidden');
            redeemSection.classList.remove('hidden');
        }
        
        // 兑换卡密
        function redeemCard() {
            const code = document.getElementById('card-code').value.trim().toUpperCase();
            const result = document.getElementById('redeem-result');
            
            if (!code) {
                result.textContent = '请输入卡密';
                result.classList.remove('success');
                result.classList.add('error');
                result.classList.remove('hidden');
                return;
            }
            
            // 检查卡密
            const cardIndex = cards.findIndex(c => c.code === code);
            
            if (cardIndex === -1) {
                result.textContent = '卡密无效';
                result.classList.remove('success');
                result.classList.add('error');
                result.classList.remove('hidden');
                return;
            }
            
            if (cards[cardIndex].used) {
                result.textContent = '该卡密已被使用';
                result.classList.remove('success');
                result.classList.add('error');
                result.classList.remove('hidden');
                return;
            }
            
            // 兑换卡密
            cards[cardIndex].used = true;
            cards[cardIndex].usedAt = new Date().toISOString();
            cards[cardIndex].usedBy = currentUser.username;
            
            // 更新用户信息
            users = users.map(u => {
                if (u.username === currentUser.username) {
                    u.totalRedeemed = (u.totalRedeemed || 0) + cards[cardIndex].amount;
                }
                return u;
            });
            
            // 记录交易
            transactions.push({
                cardCode: code,
                amount: cards[cardIndex].amount,
                userId: currentUser.username,
                redeemedAt: new Date().toISOString(),
                ip: '模拟IP'
            });
            
            saveData('cards', cards);
            saveData('users', users);
            saveData('transactions', transactions);
            
            result.textContent = `成功兑换 ${cards[cardIndex].amount} 元！`;
            result.classList.remove('error');
            result.classList.add('success');
            result.classList.remove('hidden');
            
            document.getElementById('card-code').value = '';
        }
        
        // 查询订单
        function searchOrders() {
            const type = document.getElementById('search-type').value;
            const input = document.getElementById('search-input').value.trim();
            const result = document.getElementById('search-result');
            const table = document.getElementById('orders-table');
            
            let filteredCards = [...cards];
            
            switch(type) {
                case 'card':
                    filteredCards = filteredCards.filter(card => card.code.includes(input));
                    break;
                case 'date':
                    filteredCards = filteredCards.filter(card => {
                        const cardDate = new Date(card.generatedAt).toDateString();
                        const searchDate = new Date(input).toDateString();
                        return cardDate === searchDate;
                    });
                    break;
                case 'amount':
                    filteredCards = filteredCards.filter(card => card.amount === parseInt(input));
                    break;
            }
            
            table.innerHTML = '';
            
            if (filteredCards.length === 0) {
                result.classList.add('error');
                result.classList.remove('success');
                table.innerHTML = '<tr><td colspan="4" style="text-align: center;">没有找到匹配的订单</td></tr>';
            } else {
                result.classList.remove('error');
                result.classList.add('success');
                
                filteredCards.forEach(card => {
                    const row = document.createElement('tr');
                    
                    row.innerHTML = `
                        <td>${card.code}</td>
                        <td>${card.amount} 元</td>
                        <td>${formatDate(card.generatedAt)}</td>
                        <td>${card.used ? '已使用' : '未使用'}</td>
                    `;
                    
                    table.appendChild(row);
                });
            }
            
            result.classList.remove('hidden');
        }
        
        // 加载管理员仪表盘
        function loadAdminDashboard() {
            document.getElementById('total-cards').textContent = cards.length;
            document.getElementById('used-cards').textContent = cards.filter(c => c.used).length;
            
            const totalAmount = cards.reduce((sum, card) => sum + card.amount, 0);
            document.getElementById('total-amount').textContent = `¥${totalAmount}`;
            
            const redeemedAmount = cards
                .filter(c => c.used)
                .reduce((sum, card) => sum + card.amount, 0);
            document.getElementById('redeemed-amount').textContent = `¥${redeemedAmount}`;
            
            // 最近交易
            const recentTable = document.getElementById('recent-transactions');
            recentTable.innerHTML = '';
            
            const recentTransactions = [...transactions]
                .sort((a, b) => new Date(b.redeemedAt) - new Date(a.redeemedAt))
                .slice(0, 5);
            
            recentTransactions.forEach(trans => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${formatDate(trans.redeemedAt)}</td>
                    <td>${trans.userId}</td>
                    <td>${trans.cardCode}</td>
                    <td>${trans.amount} 元</td>
                `;
                
                recentTable.appendChild(row);
            });
        }
        
        // 加载卡密管理
        function loadAdminCards() {
            const filter = document.getElementById('admin-card-filter').value;
            const table = document.getElementById('admin-cards-table');
            table.innerHTML = '';
            
            let filteredCards = [...cards];
            
            switch(filter) {
                case 'used':
                    filteredCards = filteredCards.filter(c => c.used);
                    break;
                case 'unused':
                    filteredCards = filteredCards.filter(c => !c.used);
                    break;
            }
            
            filteredCards.forEach(card => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${card.code}</td>
                    <td>${card.amount} 元</td>
                    <td>${formatDate(card.generatedAt)}</td>
                    <td>${card.used ? formatDate(card.usedAt) : '-'}</td>
                    <td>${card.used ? '<span style="color: #00b894;">已使用</span>' : '<span style="color: #d63031;">未使用</span>'}</td>
                    <td>
                        ${!card.used ? `<button style="padding: 5px 10px; font-size: 12px;" onclick="deleteCard('${card.code}')">删除</button>` : ''}
                    </td>
                `;
                
                table.appendChild(row);
            });
        }
        
        // 加载用户管理
        function loadAdminUsers() {
            const table = document.getElementById('admin-users-table');
            table.innerHTML = '';
            
            users.forEach(user => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${formatDate(user.registeredAt)}</td>
                    <td>${formatDate(user.lastLogin)}</td>
                    <td>${user.totalRedeemed || 0} 元</td>
                    <td>
                        <button style="padding: 5px 10px; font-size: 12px;" onclick="deleteUser('${user.username}')">删除</button>
                    </td>
                `;
                
                table.appendChild(row);
            });
        }
        
        // 加载交易记录
        function loadAdminTransactions() {
            const filter = document.getElementById('transaction-filter').value;
            const table = document.getElementById('admin-transactions-table');
            table.innerHTML = '';
            
            let filteredTransactions = [...transactions];
            const now = new Date();
            
            switch(filter) {
                case 'today':
                    filteredTransactions = filteredTransactions.filter(trans => {
                        const transDate = new Date(trans.redeemedAt);
                        return transDate.toDateString() === now.toDateString();
                    });
                    break;
                case 'week':
                    const weekStart = new Date(now);
                    weekStart.setDate(now.getDate() - now.getDay());
                    weekStart.setHours(0, 0, 0, 0);
                    
                    filteredTransactions = filteredTransactions.filter(trans => {
                        const transDate = new Date(trans.redeemedAt);
                        return transDate >= weekStart;
                    });
                    break;
                case 'month':
                    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                    
                    filteredTransactions = filteredTransactions.filter(trans => {
                        const transDate = new Date(trans.redeemedAt);
                        return transDate >= monthStart;
                    });
                    break;
            }
            
            filteredTransactions.forEach(trans => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${formatDate(trans.redeemedAt)}</td>
                    <td>${trans.userId}</td>
                    <td>${trans.cardCode}</td>
                    <td>${trans.amount} 元</td>
                    <td>${trans.ip}</td>
                `;
                
                table.appendChild(row);
            });
        }
        
        // 保存设置
        function saveSettings() {
            settings.currency = document.getElementById('system-currency').value;
            settings.rate = parseInt(document.getElementById('system-rate').value);
            
            saveData('settings', settings);
            
            const result = document.getElementById('settings-result');
            result.textContent = '设置已保存！';
            result.classList.remove('error');
            result.classList.add('success');
            result.classList.remove('hidden');
            
            setTimeout(() => {
                result.classList.add('hidden');
            }, 2000);
        }
        
        // 导出卡密
        function exportCards() {
            const filter = document.getElementById('admin-card-filter').value;
            let filteredCards = [...cards];
            
            switch(filter) {
                case 'used':
                    filteredCards = filteredCards.filter(c => c.used);
                    break;
                case 'unused':
                    filteredCards = filteredCards.filter(c => !c.used);
                    break;
            }
            
            if (filteredCards.length === 0) {
                alert('没有可导出的卡密');
                return;
            }
            
            let exportText = '卡密,金额,生成时间,状态\n';
            
            filteredCards.forEach(card => {
                exportText += `${card.code},${card.amount}元,${formatDate(card.generatedAt)},${card.used ? '已使用' : '未使用'}\n`;
            });
            
            const blob = new Blob([exportText], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `卡密导出_${new Date().toISOString().slice(0, 10)}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        // 删除卡密
        function deleteCard(code) {
            if (confirm(`确定要删除卡密 ${code} 吗？`)) {
                cards = cards.filter(c => c.code !== code);
                saveData('cards', cards);
                loadAdminCards();
            }
        }
        
        // 删除用户
        function deleteUser(username) {
            if (confirm(`确定要删除用户 ${username} 吗？`)) {
                users = users.filter(u => u.username !== username);
                saveData('users', users);
                loadAdminUsers();
            }
        }
        
        // 格式化日期
        function formatDate(dateString) {
            const date = new Date(dateString);
            return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
        }
        
        function padZero(num) {
            return num < 10 ? `0${num}` : num;
        }
        
        // 保存数据到本地存储
        function saveData(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    </script>
</body>
</html>
