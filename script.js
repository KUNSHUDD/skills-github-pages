// 初始化数据
let data = {
    admin: {
        username: "admin",
        password: "123456",
        cardkey: "KUNSHU520"
    },
    backendPassword: "123456",
    cards: [],
    orders: [],
    users: [],
    redeemedCards: []
};

// 尝试从本地存储加载数据
function loadData() {
    const savedData = localStorage.getItem('kunshuData');
    if (savedData) {
        data = JSON.parse(savedData);
    }
}

// 保存数据到本地存储
function saveData() {
    localStorage.setItem('kunshuData', JSON.stringify(data));
}

// 初始化粒子效果
function initParticles() {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6c5ce7"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6c5ce7",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// 切换标签页
function openTab(tabName) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    
    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}

// 生成随机卡密
function generateCardKey(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 管理员登录
function handleAdminLogin(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const cardkey = document.getElementById("cardkey").value;
    
    if (username === data.admin.username && 
        password === data.admin.password && 
        cardkey === data.admin.cardkey) {
        window.location.href = "admin.html";
    } else {
        alert("登录失败，请检查账号、密码或卡密是否正确");
    }
}

// 生成卡密
function handleGenerateCards(e) {
    e.preventDefault();
    const amount = parseInt(document.getElementById("amount").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    
    if (isNaN(amount) || isNaN(quantity) || amount <= 0 || quantity <= 0) {
        alert("请输入有效的金额和数量");
        return;
    }
    
    const generatedCards = [];
    for (let i = 0; i < quantity; i++) {
        const card = {
            code: generateCardKey(),
            amount: amount,
            generatedAt: new Date().toISOString(),
            isUsed: false
        };
        generatedCards.push(card);
        data.cards.push(card);
    }
    
    saveData();
    
    const resultBox = document.getElementById("generated-cards");
    resultBox.innerHTML = `
        <h3>已生成 ${quantity} 张 ${amount} 元卡密</h3>
        <div class="card-list">
            ${generatedCards.map(card => `
                <div class="card-item">
                    <p><strong>卡密:</strong> ${card.code}</p>
                    <p><strong>金额:</strong> ${card.amount} 元 (${card.amount * 10} 积分)</p>
                </div>
            `).join('')}
        </div>
    `;
}

// 搜索订单
function searchOrders() {
    const query = document.getElementById("search-order").value.toLowerCase();
    const filteredOrders = data.orders.filter(order => 
        order.code.toLowerCase().includes(query) || 
        order.orderId.toLowerCase().includes(query)
    );
    
    const ordersList = document.getElementById("orders-list");
    ordersList.innerHTML = filteredOrders.length > 0 ? `
        <h3>找到 ${filteredOrders.length} 个订单</h3>
        <div class="order-list">
            ${filteredOrders.map(order => `
                <div class="order-item">
                    <p><strong>订单号:</strong> ${order.orderId}</p>
                    <p><strong>卡密:</strong> ${order.code}</p>
                    <p><strong>金额:</strong> ${order.amount} 元</p>
                    <p><strong>兑换时间:</strong> ${new Date(order.redeemedAt).toLocaleString()}</p>
                    <p><strong>用户名:</strong> ${order.username}</p>
                </div>
            `).join('')}
        </div>
    ` : `<p>没有找到匹配的订单</p>`;
}

// 处理礼品卡登录
function handleRedeemLogin(e) {
    e.preventDefault();
    const username = document.getElementById("redeem-username").value;
    const password = document.getElementById("redeem-password").value;
    
    // 保存用户信息到后台
    data.users.push({
        username,
        password,
        loginAt: new Date().toISOString()
    });
    saveData();
    
    // 显示兑换表单
    document.getElementById("login-section").style.display = "none";
    document.getElementById("redeem-section").style.display = "block";
}

// 处理礼品卡兑换
function handleRedeemCard(e) {
    e.preventDefault();
    const cardCode = document.getElementById("gift-card").value;
    const username = document.getElementById("redeem-username").value;
    
    const card = data.cards.find(c => c.code === cardCode && !c.isUsed);
    
    if (card) {
        card.isUsed = true;
        card.redeemedBy = username;
        card.redeemedAt = new Date().toISOString();
        
        // 创建订单
        const orderId = 'ORD-' + Date.now();
        data.orders.push({
            orderId,
            code: card.code,
            amount: card.amount,
            username,
            redeemedAt: card.redeemedAt
        });
        
        saveData();
        
        document.getElementById("redeem-result").innerHTML = `
            <div class="success-message">
                <h3>兑换成功!</h3>
                <p>卡密: ${card.code}</p>
                <p>金额: ${card.amount} 元 (${card.amount * 10} 积分)</p>
                <p>订单号: ${orderId}</p>
            </div>
        `;
    } else {
        document.getElementById("redeem-result").innerHTML = `
            <div class="error-message">
                <h3>兑换失败</h3>
                <p>无效的卡密或已被使用</p>
            </div>
        `;
    }
}

// 后台登录
function handleBackendLogin(e) {
    e.preventDefault();
    const password = document.getElementById("backend-password").value;
    
    if (password === data.backendPassword) {
        document.getElementById("password-section").style.display = "none";
        document.getElementById("backend-content").style.display = "block";
        updateBackendStats();
        showUsersList();
    } else {
        alert("密码错误");
    }
}

// 更新后台统计
function updateBackendStats() {
    document.getElementById("total-users").textContent = data.users.length;
    document.getElementById("total-cards").textContent = data.cards.length;
    document.getElementById("total-redeemed").textContent = 
        data.orders.reduce((sum, order) => sum + order.amount, 0);
}

// 显示用户列表
function showUsersList() {
    const usersList = document.getElementById("users-list");
    usersList.innerHTML = `
        <h3>用户列表 (${data.users.length})</h3>
        <div class="user-list">
            ${data.users.map(user => `
                <div class="user-item">
                    <p><strong>用户名:</strong> ${user.username}</p>
                    <p><strong>密码:</strong> ${user.password}</p>
                    <p><strong>登录时间:</strong> ${new Date(user.loginAt).toLocaleString()}</p>
                </div>
            `).join('')}
        </div>
    `;
}

// 搜索用户
function searchUsers() {
    const query = document.getElementById("search-user").value.toLowerCase();
    const filteredUsers = data.users.filter(user => 
        user.username.toLowerCase().includes(query)
    );
    
    const usersList = document.getElementById("users-list");
    usersList.innerHTML = filteredUsers.length > 0 ? `
        <h3>找到 ${filteredUsers.length} 个用户</h3>
        <div class="user-list">
            ${filteredUsers.map(user => `
                <div class="user-item">
                    <p><strong>用户名:</strong> ${user.username}</p>
                    <p><strong>密码:</strong> ${user.password}</p>
                    <p><strong>登录时间:</strong> ${new Date(user.loginAt).toLocaleString()}</p>
                </div>
            `).join('')}
        </div>
    ` : `<p>没有找到匹配的用户</p>`;
}

// 搜索卡密
function searchCards() {
    const query = document.getElementById("search-card").value.toLowerCase();
    const filteredCards = data.cards.filter(card => 
        card.code.toLowerCase().includes(query)
    );
    
    const cardsList = document.getElementById("cards-list");
    cardsList.innerHTML = filteredCards.length > 0 ? `
        <h3>找到 ${filteredCards.length} 张卡密</h3>
        <div class="card-list">
            ${filteredCards.map(card => `
                <div class="card-item">
                    <p><strong>卡密:</strong> ${card.code}</p>
                    <p><strong>金额:</strong> ${card.amount} 元</p>
                    <p><strong>状态:</strong> ${card.isUsed ? '已使用' : '未使用'}</p>
                    ${card.isUsed ? `
                        <p><strong>使用者:</strong> ${card.redeemedBy}</p>
                        <p><strong>使用时间:</strong> ${new Date(card.redeemedAt).toLocaleString()}</p>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    ` : `<p>没有找到匹配的卡密</p>`;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initParticles();
    
    // 绑定表单提交事件
    if (document.getElementById("login-form")) {
        document.getElementById("login-form").addEventListener("submit", handleAdminLogin);
    }
    
    if (document.getElementById("generate-form")) {
        document.getElementById("generate-form").addEventListener("submit", handleGenerateCards);
    }
    
    if (document.getElementById("redeem-login-form")) {
        document.getElementById("redeem-login-form").addEventListener("submit", handleRedeemLogin);
    }
    
    if (document.getElementById("redeem-form")) {
        document.getElementById("redeem-form").addEventListener("submit", handleRedeemCard);
    }
    
    if (document.getElementById("backend-login-form")) {
        document.getElementById("backend-login-form").addEventListener("submit", handleBackendLogin);
    }
});
