<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KUNSHU 卡密系统</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="particles" id="particles-js"></div>
        <div class="card">
            <h1 class="logo">KUNSHU 卡密系统</h1>
            <p class="tagline">高级卡密管理与兑换平台</p>
            
            <div class="tabs">
                <button class="tab-btn active" onclick="openTab('admin')">管理员登录</button>
                <button class="tab-btn" onclick="openTab('redeem')">礼品卡兑换</button>
            </div>
            
            <div id="admin" class="tab-content active">
                <form id="login-form">
                    <div class="form-group">
                        <label for="username">管理员账号</label>
                        <input type="text" id="username" placeholder="输入管理员账号" required>
                    </div>
                    <div class="form-group">
                        <label for="password">密码</label>
                        <input type="password" id="password" placeholder="输入密码" required>
                    </div>
                    <div class="form-group">
                        <label for="cardkey">卡密</label>
                        <input type="text" id="cardkey" placeholder="输入卡密" required>
                    </div>
                    <button type="submit" class="btn">登录</button>
                </form>
            </div>
            
            <div id="redeem" class="tab-content">
                <div class="info-box">
                    <p>请先登录您的账户以兑换礼品卡</p>
                    <button onclick="window.location.href='redeem.html'" class="btn">前往兑换页面</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
