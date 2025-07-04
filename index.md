<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NovaX 游戏助手系统</title>
    <style>
        :root {
            --primary: #6e00ff;
            --secondary: #00d0ff;
            --dark: #0a0a1a;
            --darker: #050510;
            --light: #e0e0ff;
            --success: #00ff88;
            --danger: #ff3860;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
        }
        body {
            background-color: var(--dark);
            color: var(--light);
            background-image: 
                radial-gradient(circle at 20% 30%, rgba(110, 0, 255, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(0, 208, 255, 0.15) 0%, transparent 50%);
            min-height: 100vh;
            overflow-x: hidden;
        }
        /* 登录界面 */
        .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .login-box {
            width: 400px;
            padding: 40px;
            background-color: rgba(10, 10, 26, 0.9);
            border-radius: 16px;
            box-shadow: 0 0 40px rgba(110, 0, 255, 0.3);
            border: 1px solid var(--primary);
            backdrop-filter: blur(10px);
            animation: pulse 6s infinite alternate;
        }
        @keyframes pulse {
            0% { box-shadow: 0 0 40px rgba(110, 0, 255, 0.3); }
            50% { box-shadow: 0 0 60px rgba(0, 208, 255, 0.3); }
            100% { box-shadow: 0 0 40px rgba(110, 0, 255, 0.5); }
        }
        .login-title {
            text-align: center;
            margin-bottom: 30px;
            font-size: 28px;
            color: var(--secondary);
            text-shadow: 0 0 15px rgba(0, 208, 255, 0.7);
            letter-spacing: 1px;
        }
        .input-group {
            margin-bottom: 25px;
            position: relative;
        }
        .input-group label {
            display: block;
            margin-bottom: 10px;
            color: var(--secondary);
            font-size: 14px;
            letter-spacing: 0.5px;
        }
        .input-group input {
            width: 100%;
            padding: 12px 15px;
            background-color: rgba(30, 30, 60, 0.7);
            border: 1px solid var(--primary);
            border-radius: 8px;
            color: var(--light);
            font-size: 16px;
            transition: all 0.3s;
        }
        .input-group input:focus {
            outline: none;
            border-color: var(--secondary);
            box-shadow: 0 0 10px rgba(0, 208, 255, 0.5);
        }
        .login-btn {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border: none;
            border-radius: 8px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-top: 10px;
        }
        .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 208, 255, 0.4);
        }
        /* 主界面 */
        .main-container {
            display: none;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid rgba(110, 0, 255, 0.3);
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: var(--secondary);
            text-shadow: 0 0 10px rgba(0, 208, 255, 0.5);
        }
        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .username {
            color: var(--secondary);
        }
        .logout-btn {
            background: none;
            border: 1px solid var(--danger);
            color: var(--danger);
            padding: 5px 15px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .logout-btn:hover {
            background-color: rgba(255, 56, 96, 0.1);
        }
        .panel {
            background-color: rgba(10, 10, 26, 0.7);
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
            border: 1px solid rgba(110, 0, 255, 0.3);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        .panel-title {
            font-size: 20px;
            margin-bottom: 20px;
            color: var(--secondary);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .panel-title svg {
            width: 24px;
            height: 24px;
            fill: var(--secondary);
        }
        .game-status {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
        }
        .status-card {
            flex: 1;
            background-color: rgba(30, 30, 60, 0.5);
            border-radius: 10px;
            padding: 20px;
            border: 1px solid rgba(110, 0, 255, 0.3);
            transition: all 0.3s;
        }
        .status-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }
        .status-title {
            font-size: 14px;
            color: var(--secondary);
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .status-value {
            font-size: 24px;
            font-weight: bold;
        }
        .status-value.detected {
            color: var(--success);
        }
        .status-value.not-detected {
            color: var(--danger);
        }
        .status-value.pending {
            color: var(--secondary);
        }
        .btn {
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
        .btn-primary {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 208, 255, 0.4);
        }
        .btn-secondary {
            background-color: rgba(30, 30, 60, 0.7);
            color: var(--secondary);
            border: 1px solid var(--primary);
        }
        .btn-secondary:hover {
            background-color: rgba(110, 0, 255, 0.2);
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .feature-card {
            background-color: rgba(30, 30, 60, 0.5);
            border-radius: 10px;
            padding: 20px;
            border: 1px solid rgba(110, 0, 255, 0.3);
            transition: all 0.3s;
        }
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
            border-color: var(--secondary);
        }
        .feature-title {
            font-size: 18px;
            margin-bottom: 15px;
            color: var(--secondary);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .feature-desc {
            font-size: 14px;
            color: rgba(224, 224, 255, 0.7);
            margin-bottom: 15px;
            line-height: 1.5;
        }
        .feature-controls {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(110, 0, 255, 0.3);
            transition: .4s;
            border-radius: 24px;
        }
        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        input:checked + .toggle-slider {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
        }
        input:checked + .toggle-slider:before {
            transform: translateX(26px);
        }
        .slider-container {
            margin-top: 20px;
        }
        .slider-label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            color: var(--secondary);
            font-size: 14px;
        }
        .slider {
            -webkit-appearance: none;
            width: 100%;
            height: 8px;
            border-radius: 4px;
            background: rgba(110, 0, 255, 0.3);
            outline: none;
        }
        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            cursor: pointer;
            transition: all 0.3s;
        }
        .slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 0 10px rgba(0, 208, 255, 0.7);
        }
        .injection-progress {
            margin-top: 30px;
            display: none;
        }
        .progress-container {
            width: 100%;
            background-color: rgba(30, 30, 60, 0.5);
            border-radius: 8px;
            height: 20px;
            margin-top: 15px;
            overflow: hidden;
            border: 1px solid rgba(110, 0, 255, 0.3);
        }
        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            width: 0%;
            transition: width 0.5s;
            position: relative;
            overflow: hidden;
        }
        .progress-bar:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0) 100%
            );
            animation: progressShine 2s infinite;
        }
        @keyframes progressShine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .progress-text {
            margin-top: 10px;
            font-size: 14px;
            color: var(--secondary);
            text-align: center;
        }
        .log-container {
            margin-top: 30px;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 8px;
            padding: 15px;
            height: 200px;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            color: var(--secondary);
            border: 1px solid rgba(110, 0, 255, 0.3);
        }
        .log-entry {
            margin-bottom: 5px;
            line-height: 1.4;
        }
        .log-time {
            color: rgba(224, 224, 255, 0.5);
        }
        .log-info {
            color: var(--secondary);
        }
        .log-success {
            color: var(--success);
        }
        .log-warning {
            color: orange;
        }
        .log-error {
            color: var(--danger);
        }
        /* 响应式设计 */
        @media (max-width: 768px) {
            .login-box {
                width: 90%;
                padding: 30px 20px;
            }
            .game-status {
                flex-direction: column;
            }
            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- 登录界面 -->
    <div class="login-container" id="login-container">
        <div class="login-box">
            <h1 class="login-title">NovaX 游戏助手系统</h1>
            <div class="input-group">
                <label for="username">用户名</label>
                <input type="text" id="username" placeholder="输入您的用户名">
            </div>
            <div class="input-group">
                <label for="password">密码</label>
                <input type="password" id="password" placeholder="输入您的密码">
            </div>
            <button class="login-btn" id="login-btn">登 录</button>
        </div>
    </div>

    <!-- 主界面 -->
    <div class="main-container" id="main-container">
        <div class="header">
            <div class="logo">NovaX <span style="font-weight: normal;">| 高级游戏助手</span></div>
            <div class="user-info">
                <span class="username" id="display-username">admin</span>
                <button class="logout-btn" id="logout-btn">退出</button>
            </div>
        </div>

        <div class="panel">
            <h2 class="panel-title">
                <svg viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M17,19V20H7V19C7,17.5 8.5,16 10,16H14C15.5,16 17,17.5 17,19M12,4A8,8 0 0,1 20,12C20,13.5 19.5,15 18.6,16.2C17.6,15.7 16.3,15.5 15,15.5H9C7.7,15.5 6.4,15.7 5.4,16.2C4.5,15 4,13.5 4,12A8,8 0 0,1 12,4M12,6A1,1 0 0,0 11,7A1,1 0 0,0 12,8A1,1 0 0,0 13,7A1,1 0 0,0 12,6M7,9A1,1 0 0,0 6,10A1,1 0 0,0 7,11A1,1 0 0,0 8,10A1,1 0 0,0 7,9M17,9A1,1 0 0,0 16,10A1,1 0 0,0 17,11A1,1 0 0,0 18,10A1,1 0 0,0 17,9Z"/>
                </svg>
                游戏状态
            </h2>
            <div class="game-status">
                <div class="status-card">
                    <div class="status-title">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 19.16,15.89 19.16,16C19.16,16.94 18.14,18 20,18Z"/>
                        </svg>
                        游戏检测
                    </div>
                    <div class="status-value pending" id="game-status">等待检测...</div>
                    <button class="btn btn-secondary" id="detect-btn" style="margin-top: 15px;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"/>
                        </svg>
                        检测游戏
                    </button>
                </div>
                <div class="status-card">
                    <div class="status-title">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H11V13H13V14H15V16H13V17H11M12,11A1,1 0 0,1 11,12A1,1 0 0,1 10,11A1,1 0 0,1 11,10A1,1 0 0,1 12,11M12,7C13.63,7 15.06,7.79 15.98,9H14A2,2 0 0,0 12,8A2,2 0 0,0 10,10H8A4,4 0 0,1 12,7Z"/>
                        </svg>
                        注入状态
                    </div>
                    <div class="status-value not-detected" id="injection-status">未注入</div>
                    <button class="btn btn-primary" id="inject-btn" style="margin-top: 15px;" disabled>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"/>
                        </svg>
                        注入功能
                    </button>
                </div>
            </div>

            <div class="injection-progress" id="injection-progress">
                <h3 style="color: var(--secondary);">量子注入进程</h3>
                <div class="progress-container">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
                <div class="progress-text" id="progress-text">初始化量子注入通道...</div>
                <div class="log-container" id="log-container">
                    <div class="log-entry"><span class="log-time">[系统]</span> <span class="log-info">准备注入环境...</span></div>
                </div>
            </div>
        </div>

        <div class="panel">
            <h2 class="panel-title">
                <svg viewBox="0 0 24 24">
                    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                </svg>
                功能模块
            </h2>
            <div class="features-grid">
                <div class="feature-card">
                    <h3 class="feature-title">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.2V15.7C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z"/>
                        </svg>
                        暴力功能
                    </h3>
                    <div class="feature-desc">
                        增强武器伤害和后坐力控制，提供更精准的射击体验和更高的伤害输出。
                    </div>
                    <div class="feature-controls">
                        <label class="toggle-switch">
                            <input type="checkbox" id="brutal-toggle">
                            <span class="toggle-slider"></span>
                        </label>
                        <span style="font-size: 12px; color: var(--secondary);">强度</span>
                        <input type="range" min="1" max="10" value="5" class="slider" id="brutal-slider">
                    </div>
                </div>
                <div class="feature-card">
                    <h3 class="feature-title">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z"/>
                        </svg>
                        ESP透视
                    </h3>
                    <div class="feature-desc">
                        显示敌人位置、血量和装备信息，提供全方位的战场视野和战术优势。
                    </div>
                    <div class="feature-controls">
                        <label class="toggle-switch">
                            <input type="checkbox" id="esp-toggle">
                            <span class="toggle-slider"></span>
                        </label>
                        <span style="font-size: 12px; color: var(--secondary);">距离</span>
                        <input type="range" min="50" max="500" value="200" class="slider" id="esp-slider">
                    </div>
                </div>
                <div class="feature-card">
                    <h3 class="feature-title">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,11.99H19C18.47,16.11 15.72,19.78 12,20.93V12H5V6.3L12,3.19V11.99Z"/>
                        </svg>
                        合法模式
                    </h3>
                    <div class="feature-desc">
                        优化游戏表现而不触发反作弊系统，提供安全的性能提升和游戏体验优化。
                    </div>
                    <div class="feature-controls">
                        <label class="toggle-switch">
                            <input type="checkbox" id="legit-toggle">
                            <span class="toggle-slider"></span>
                        </label>
                        <span style="font-size: 12px; color: var(--secondary);">隐蔽度</span>
                        <input type="range" min="1" max="10" value="8" class="slider" id="legit-slider">
                    </div>
                </div>
                <div class="feature-card">
                    <h3 class="feature-title">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12,3L2,12H5V20H19V12H22L12,3M12,7.7C14.1,7.7 15.8,9.4 15.8,11.5C15.8,14.5 12,18 12,18C12,18 8.2,14.5 8.2,11.5C8.2,9.4 9.9,7.7 12,7.7M10,11.5C10,12.3 10.7,13 11.5,13C12.3,13 13,12.3 13,11.5C13,10.7 12.3,10 11.5,10C10.7,10 10,10.7 10,11.5Z"/>
                        </svg>
                        反自瞄(AA)
                    </h3>
                    <div class="feature-desc">
                        对抗敌人的自动瞄准系统，干扰敌方锁定并提高您的生存几率。
                    </div>
                    <div class="feature-controls">
                        <label class="toggle-switch">
                            <input type="checkbox" id="antiaim-toggle">
                            <span class="toggle-slider"></span>
                        </label>
                        <span style="font-size: 12px; color: var(--secondary);">强度</span>
                        <input type="range" min="1" max="10" value="7" class="slider" id="antiaim-slider">
                    </div>
                </div>
                <div class="feature-card">
                    <h3 class="feature-title">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z"/>
                        </svg>
                        反作弊绕过
                    </h3>
                    <div class="feature-desc">
                        高级反检测技术，确保您的游戏体验安全无忧，不被系统检测。
                    </div>
                    <div class="feature-controls">
                        <label class="toggle-switch">
                            <input type="checkbox" id="anticheat-toggle">
                            <span class="toggle-slider"></span>
                        </label>
                        <span style="font-size: 12px; color: var(--secondary);">模式</span>
                        <select style="background: rgba(30,30,60,0.7); color: var(--light); border: 1px solid var(--primary); border-radius: 4px; padding: 3px 8px; font-size: 12px;">
                            <option>标准</option>
                            <option>高级</option>
                            <option>隐身</option>
                        </select>
                    </div>
                </div>
                <div class="feature-card">
                    <h3 class="feature-title">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12,2L4,5V11.09C4,16.14 7.41,20.85 12,22C16.59,20.85 20,16.14 20,11.09V5L12,2M12,4.15L18,6.54V11.09C18,15.09 15.45,18.79 12,19.92C8.55,18.79 6,15.1 6,11.09V6.54L12,4.15M12,7C10.9,7 10,7.9 10,9C10,10.1 10.9,11 12,11C13.1,11 14,10.1 14,9C14,7.9 13.1,7 12,7M8,9C9.1,9 10,9.9 10,11C10,12.1 9.1,13 8,13C6.9,13 6,12.1 6,11C6,9.9 6.9,9 8,9M16,9C17.1,9 18,9.9 18,11C18,12.1 17.1,13 16,13C14.9,13 14,12.1 14,11C14,9.9 14.9,9 16,9Z"/>
                        </svg>
                        命中率优化
                    </h3>
                    <div class="feature-desc">
                        智能调整射击参数，提高子弹命中率，让您的每一发子弹都更有价值。
                    </div>
                    <div class="feature-controls">
                        <label class="toggle-switch">
                            <input type="checkbox" id="hitrate-toggle">
                            <span class="toggle-slider"></span>
                        </label>
                        <span style="font-size: 12px; color: var(--secondary);">精准度</span>
                        <input type="range" min="1" max="10" value="6" class="slider" id="hitrate-slider">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // 登录功能
        document.getElementById('login-btn').addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if(username && password) {
                document.getElementById('login-container').style.display = 'none';
                document.getElementById('main-container').style.display = 'block';
                document.getElementById('display-username').textContent = username;
            } else {
                alert('请输入用户名和密码！');
            }
        });
        
        // 退出功能
        document.getElementById('logout-btn').addEventListener('click', function() {
            document.getElementById('main-container').style.display = 'none';
            document.getElementById('login-container').style.display = 'flex';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        });
        
        // 游戏检测功能
        document.getElementById('detect-btn').addEventListener('click', function() {
            const gameStatus = document.getElementById('game-status');
            const detectBtn = document.getElementById('detect-btn');
            const injectBtn = document.getElementById('inject-btn');
            
            gameStatus.textContent = '扫描中...';
            gameStatus.className = 'status-value pending';
            detectBtn.disabled = true;
            detectBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/></svg> 检测中...';
            
            // 模拟检测延迟
            setTimeout(function() {
                const games = ["VALORANT", "CS2", "APEX", "PUBG", "Fortnite"];
                const randomGame = games[Math.floor(Math.random() * games.length)];
                const isRunning = Math.random() > 0.3; // 70%概率检测到游戏
                
                if(isRunning) {
                    gameStatus.textContent = randomGame;
                    gameStatus.className = 'status-value detected';
                    injectBtn.disabled = false;
                    
                    // 添加到日志
                    addLog(`检测到游戏进程: ${randomGame} (PID: ${Math.floor(Math.random() * 10000) + 1000})`, 'success');
                } else {
                    gameStatus.textContent = '未检测到';
                    gameStatus.className = 'status-value not-detected';
                    injectBtn.disabled = true;
                    
                    // 添加到日志
                    addLog('未检测到受支持的游戏', 'warning');
                }
                
                detectBtn.disabled = false;
                detectBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.2V15.7C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z"/></svg> 检测游戏';
            }, 2000);
        });
        
        // 注入功能
        document.getElementById('inject-btn').addEventListener('click', function() {
            const injectBtn = document.getElementById('inject-btn');
            const progressContainer = document.getElementById('injection-progress');
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');
            const injectionStatus = document.getElementById('injection-status');
            
            injectBtn.disabled = true;
            progressContainer.style.display = 'block';
            
            // 清空日志
            document.getElementById('log-container').innerHTML = '<div class="log-entry"><span class="log-time">[系统]</span> <span class="log-info">准备注入环境...</span></div>';
            
            // 模拟注入过程
            const steps = [
                {progress: 10, text: "初始化量子注入通道...", log: "建立量子隧道连接", type: "info"},
                {progress: 20, text: "绕过内存保护机制...", log: "绕过内核保护层", type: "info"},
                {progress: 35, text: "注入纳米级代码片段...", log: "注入第一阶段载荷", type: "info"},
                {progress: 50, text: "建立神经链接接口...", log: "同步神经模式", type: "info"},
                {progress: 65, text: "加密通信通道...", log: "启用量子加密协议", type: "info"},
                {progress: 80, text: "验证功能完整性...", log: "验证所有模块签名", type: "info"},
                {progress: 90, text: "优化性能参数...", log: "调整量子计算频率", type: "info"},
                {progress: 100, text: "注入完成！", log: "量子注入成功完成", type: "success"}
            ];
            
            let currentStep = 0;
            const totalSteps = steps.length;
            
            function nextStep() {
                if(currentStep < totalSteps) {
                    const step = steps[currentStep];
                    progressBar.style.width = step.progress + '%';
                    progressText.textContent = step.text;
                    
                    // 添加到日志
                    addLog(step.log, step.type);
                    
                    // 随机延迟，模拟处理时间
                    const delay = 500 + Math.random() * 1500;
                    
                    currentStep++;
                    setTimeout(nextStep, delay);
                } else {
                    // 注入完成
                    injectionStatus.textContent = '已注入';
                    injectionStatus.className = 'status-value detected';
                    injectBtn.disabled = false;
                    injectBtn.textContent = '重新注入';
                    
                    // 显示所有功能
                    document.querySelectorAll('.feature-card').forEach(card => {
                        card.style.opacity = '1';
                    });
                }
            }
            
            // 开始注入过程
            nextStep();
        });
        
        // 添加日志条目
        function addLog(message, type) {
            const logContainer = document.getElementById('log-container');
            const time = new Date().toLocaleTimeString();
            
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            
            const timeSpan = document.createElement('span');
            timeSpan.className = 'log-time';
            timeSpan.textContent = `[${time}]`;
            
            const messageSpan = document.createElement('span');
            messageSpan.className = 'log-' + type;
            messageSpan.textContent = ' ' + message;
            
            logEntry.appendChild(timeSpan);
            logEntry.appendChild(messageSpan);
            
            logContainer.appendChild(logEntry);
            logContainer.scrollTop = logContainer.scrollHeight;
        }
        
        // 初始隐藏所有功能(半透明)
        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = '0.5';
        });
    </script>
</body>
</html>
