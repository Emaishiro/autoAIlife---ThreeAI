
const gameState = {
    // 游戏时间
    startTime: new Date('2025-03-04T08:00:00'),
    currentTime: new Date('2025-03-04T08:00:00'),
    timeMultiplier: 1, // 时间流逝倍率，1为真实时间
    currentHoliday: null, // 当前节假日信息
    holidayDescription: '工作日', // 节假日描述

    // 公寓状态
    apartment: {
        rooms: {
            livingRoom: {
                name: "客厅",
                description: "宽敞明亮的客厅，有沙发、电视和茶几。",
                items: ["沙发", "电视", "茶几", "空调"]
            },
            kitchen: {
                name: "厨房",
                description: "设备齐全的厨房，有冰箱、灶台和厨具。",
                items: ["冰箱", "灶台", "微波炉", "电饭煲", "厨具套装"]
            },
            bathroom: {
                name: "卫生间",
                description: "干净的卫生间，有马桶和洗手台。",
                items: ["马桶", "洗手台", "镜子", "卫生纸"]
            },
            bathRoom: {
                name: "浴室",
                description: "独立的浴室，有淋浴设备和热水器。",
                items: ["淋浴设备", "热水器", "浴巾", "洗漱用品"]
            },
            studyRoom: {
                name: "书房",
                description: "安静的书房，有书桌、书架和电脑。",
                items: ["书桌", "书架", "台式电脑", "办公椅"]
            },
            bedroom1: {
                name: "惠舞的卧室",
                description: "惠舞的卧室，整洁简单，书桌上堆满了专业书籍。",
                items: ["单人床", "书桌", "衣柜", "台灯"]
            },
            bedroom2: {
                name: "三玖的卧室",
                description: "三玖的卧室，布置简约，有淡淡的清香。",
                items: ["单人床", "梳妆台", "衣柜", "小沙发"]
            },
            bedroom3: {
                name: "五月的卧室",
                description: "五月的卧室，稍微有些杂乱，零食包装袋随处可见。",
                items: ["单人床", "书桌", "衣柜", "零食箱"]
            }
        },
        // 公共物品
        sharedItems: ["Wi-Fi路由器", "洗衣机", "烘干机", "吸尘器"],

        // 房间连接关系（双向）
        connections: {
            livingRoom: ["kitchen", "bathroom", "bathRoom", "studyRoom", "bedroom1", "bedroom2", "bedroom3", "outside"],
            kitchen: ["livingRoom"],
            bathroom: ["livingRoom"],
            bathRoom: ["livingRoom"],
            studyRoom: ["livingRoom"],
            bedroom1: ["livingRoom"],
            bedroom2: ["livingRoom"],
            bedroom3: ["livingRoom"],
            outside: ["livingRoom"] // 外出只能返回客厅
        }
    },

    // 角色状态
    characters: {
        huiwu: {
            name: "惠舞",
            gender: "male",
            age: 22,
            personality: "榆木脑袋的顶尖学霸，非常认真负责，会主动找人聊天，空闲时看新闻",
            mood: 80, // 心情值 0-100
            energy: 90, // 精力值 0-100
            satiety: 70, // 饱腹值 0-100（100为完全饱腹，0为极度饥饿）
            hygiene: 85, // 卫生度 0-100
            wallet: 5000, // 钱包余额（人民币）
            career: "AI算法工程师",
            monthlyIncome: 15000,
            skills: ["编程", "数学", "逻辑分析", "阅读"],
            currentRoom: "livingRoom",
            currentAction: "无",
            status: "awake", // 状态：awake（清醒）, unconscious（晕倒）, sleeping（睡眠）
            // 睡眠系统
            sleepStartTime: null, // 开始睡眠的游戏时间
            sleepDuration: 0, // 已睡眠时长（分钟）
            isSleeping: false, // 是否处于睡眠状态
            lastDisturbance: null, // 上次被惊醒的时间（用于冷却期）
            relationship: {
                sanjiu: 20, // 与三玖的关系值 -100 到 100
                wuyue: 20  // 与五月的关系值 -100 到 100
            },
            // 长期疲劳系统
            workHoursToday: 0, // 今天累计工作小时数
            consecutiveWorkDays: 0, // 连续工作天数
            fatigueLevel: 0, // 疲劳等级 0-100（影响行为和能量消耗）
            lastRestTime: new Date('2025-03-04T08:00:00'), // 上次休息时间
            lastWorkCheckTime: new Date('2025-03-04T08:00:00'), // 上次检查工作时间的游戏时刻
            // 行为连续性系统
            actionHistory: [], // 最近3次行为简述
            lastActionType: 'rest', // 上一次行为类型：'work'|'rest'|'eat'|'hygiene'|'social'
        },
        sanjiu: {
            name: "三玖",
            gender: "female",
            age: 21,
            personality: "沉默寡言，不擅长表达感情，内向但也不介意别人的好意，空闲时看电影，空闲时听歌",
            mood: 70,
            energy: 85,
            satiety: 60,
            hygiene: 90,
            wallet: 4000,
            career: "插画师",
            monthlyIncome: 8000,
            skills: ["绘画", "设计", "阅读"],
            currentRoom: "livingRoom",
            currentAction: "无",
            status: "awake", // 状态：awake（清醒）, unconscious（晕倒）, sleeping（睡眠）
            sleepStartTime: null,
            sleepDuration: 0,
            isSleeping: false,
            lastDisturbance: null,
            relationship: {
                huiwu: 20,
                wuyue: 30
            },
            // 长期疲劳系统
            workHoursToday: 0,
            consecutiveWorkDays: 0,
            fatigueLevel: 0,
            lastRestTime: new Date(),
            // 行为连续性系统
            actionHistory: [],
            lastActionType: 'rest',
        },
        wuyue: {
            name: "五月",
            gender: "female",
            age: 21,
            personality: "努力认真，不擅长撒谎，空闲时喜欢吃东西，有当老师的梦想，会主动找人聊天，爱分享趣事，空闲时看时尚杂志",
            mood: 85,
            energy: 95,
            satiety: 40,
            hygiene: 75,
            wallet: 3000,
            career: "美食博主",
            monthlyIncome: 10000,
            skills: ["烹饪", "摄影", "视频编辑"],
            currentRoom: "livingRoom",
            currentAction: "无",
            status: "awake", // 状态：awake（清醒）, unconscious（晕倒）, sleeping（睡眠）
            sleepStartTime: null,
            sleepDuration: 0,
            isSleeping: false,
            lastDisturbance: null,
            relationship: {
                huiwu: 20,
                sanjiu: 30
            },
            // 长期疲劳系统
            workHoursToday: 0,
            consecutiveWorkDays: 0,
            fatigueLevel: 0,
            lastRestTime: new Date(),
            lastWorkCheckTime: new Date('2025-03-04T08:00:00'),
            // 行为连续性系统
            actionHistory: [],
            lastActionType: 'rest',
        }
    },

    // 游戏控制状态
    isProcessing: false,
    isPaused: false,
    shouldStop: false,
    loopTimeoutId: null,
    actionTimeoutId: null,
    actionResolve: null,
    apiKey: "",
    lastArtworkPromptTime: 0,  // 防止短时间内重复触发文生图生成

    // 游戏事件记录
    lastActionTime: null,
    dayCount: 1,
    dailyInteractions: [] // 当天互动记录，用于夜晚关系结算
};

// 初始化节假日信息
const initialHolidayInfo = CalendarPlugin.isHoliday(gameState.currentTime);
gameState.currentHoliday = initialHolidayInfo;
gameState.holidayDescription = initialHolidayInfo.isHoliday ? initialHolidayInfo.name : '工作日';

// UI 元素
const ui = {
    // 时间显示
    gameTime: document.getElementById('game-time'),
    realTime: document.getElementById('real-time'),
    timeMultiplier: document.getElementById('time-multiplier'),
    holidayInfo: document.getElementById('holiday-info'),

    // 容器
    roomsContainer: document.getElementById('rooms-container'),
    charactersContainer: document.getElementById('characters-container'),
    gameLog: document.getElementById('game-log'),
    logSection: document.getElementById('log-section'),

    // 控制元素
    apiKeyInput: document.getElementById('api-key'),
    startBtn: document.getElementById('start-btn'),
    pauseBtn: document.getElementById('pause-btn'),

    // 时间控制按钮
    speed1x: document.getElementById('speed-1x'),
    speed2x: document.getElementById('speed-2x'),
    speed5x: document.getElementById('speed-5x'),
    speed10x: document.getElementById('speed-10x'),

    // 存档元素
    saveTimes: [
        document.getElementById('save-time-1'),
        document.getElementById('save-time-2'),
        document.getElementById('save-time-3')
    ],
    saveBtns: [
        document.getElementById('save-btn-1'),
        document.getElementById('save-btn-2'),
        document.getElementById('save-btn-3')
    ],
    loadBtns: [
        document.getElementById('load-btn-1'),
        document.getElementById('load-btn-2'),
        document.getElementById('load-btn-3')
    ],
    exportBtn: document.getElementById('export-btn'),
    importBtn: document.getElementById('import-btn'),
    importInput: document.getElementById('import-input')
};

// 格式化游戏时间为完整日期字符串
function formatGameTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
}

// 更新 UI 状态
function updateUI() {
    // 更新时间显示
    const currentTime = gameState.currentTime;
    ui.gameTime.innerText = formatGameTime(currentTime);

    const realTime = new Date();
    ui.realTime.innerText = `${realTime.getHours().toString().padStart(2, '0')}:${realTime.getMinutes().toString().padStart(2, '0')}`;

    ui.timeMultiplier.innerText = `${gameState.timeMultiplier}x`;

    // 更新节假日显示
    if (ui.holidayInfo) {
        ui.holidayInfo.innerText = gameState.holidayDescription;
        // 根据是否为节假日添加不同的CSS类和属性
        if (gameState.holidayDescription !== '工作日') {
            ui.holidayInfo.className = 'holiday-active';
            ui.holidayInfo.setAttribute('data-holiday', gameState.holidayDescription);
        } else {
            ui.holidayInfo.className = '';
            ui.holidayInfo.removeAttribute('data-holiday');
        }
    }

    // 更新房间状态
    updateRoomsUI();

    // 更新角色状态
    updateCharactersUI();
}

// 更新房间UI
function updateRoomsUI() {
    ui.roomsContainer.innerHTML = '';

    for (const [roomId, room] of Object.entries(gameState.apartment.rooms)) {
        const roomDiv = document.createElement('div');
        roomDiv.className = 'room-card';
        roomDiv.innerHTML = `
            <h4>${room.name}</h4>
            <p>${room.description}</p>
            <div class="room-occupants">
                ${getRoomOccupants(roomId).map(char => char.name).join(', ') || '空'}
            </div>
            <div class="room-items">
                物品: ${room.items.join(', ')}
            </div>
        `;
        ui.roomsContainer.appendChild(roomDiv);
    }
}

// 关系等级查询
function getRelationshipLevel(val) {
    if (val >= 100) return '至死不渝';
    if (val >= 90)  return '灵魂伴侣';
    if (val >= 80)  return '初级恋人';
    if (val >= 70)  return '暧昧/心动';
    if (val >= 60)  return '亲密知己';
    if (val >= 50)  return '可靠朋友';
    if (val >= 40)  return '志趣相投';
    if (val >= 30)  return '初步好感';
    if (val >= 20)  return '普通熟人';
    if (val >= 10)  return '点头之交';
    if (val >= 0)   return '素昧平生';
    if (val >= -10) return '轻微排斥';
    if (val >= -20) return '心生反感';
    if (val >= -30) return '公开不睦';
    if (val >= -40) return '交恶状态';
    if (val >= -50) return '心怀怨恨';
    if (val >= -60) return '敌对关系';
    if (val >= -70) return '势不两立';
    if (val >= -80) return '宿怨深仇';
    if (val >= -90) return '不共戴天';
    return '不死不休';
}

// 更新角色UI
function updateCharactersUI() {
    ui.charactersContainer.innerHTML = '';

    for (const char of Object.values(gameState.characters)) {
        const charDiv = document.createElement('div');
        charDiv.className = 'character-card';
        charDiv.innerHTML = `
            <h4>${char.name} (${char.age}岁)</h4>
            <p>性格: ${char.personality}</p>
            <p>职业: ${char.career} (月收入: ¥${char.monthlyIncome})</p>
            <div class="stats">
                <span class="stat">心情: ${char.mood}</span>
                <span class="stat">精力: ${char.energy}</span>
                <span class="stat">饱腹: ${char.satiety}</span>
                <span class="stat">卫生: ${char.hygiene}</span>
                <span class="stat ${char.status === 'unconscious' ? 'stat-warning' : ''}">状态: ${char.status === 'unconscious' ? '晕倒中' : '清醒'}</span>
            </div>
            <p>钱包: ¥${char.wallet}</p>
            <p>当前位置: ${char.currentRoom === 'outside' ? '外出' : (gameState.apartment.rooms[char.currentRoom]?.name || '未知')}</p>
            <p>当前行为: ${char.currentAction}</p>
            <div class="stats">
                ${Object.entries(char.relationship).map(([id, val]) => `<span class="stat">与${gameState.characters[id]?.name || id}: ${val}（${getRelationshipLevel(val)}）</span>`).join('')}
            </div>
        `;
        ui.charactersContainer.appendChild(charDiv);
    }
}

// 获取房间内的角色
function getRoomOccupants(roomId) {
    const occupants = [];
    for (const char of Object.values(gameState.characters)) {
        if (char.currentRoom === roomId) {
            occupants.push(char);
        }
    }
    return occupants;
}

// 打印日志
function addLog(message, type = 'info') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;

    // 使用游戏时间而不是现实时间
    const gameTime = gameState.currentTime;
    const timeStr = formatGameTime(gameTime);

    entry.innerText = `[${timeStr}] ${message}`;
    ui.gameLog.appendChild(entry); // 改为 appendChild 配合滚动

    // 限制日志数量
    if (ui.gameLog.children.length > 50) {
        ui.gameLog.removeChild(ui.gameLog.firstChild);
    }

    // 自动滚动到底部
    ui.logSection.scrollTop = ui.logSection.scrollHeight;
}

// 获取季节信息
function getSeason(date) {
    const month = date.getMonth() + 1;
    if (month >= 3 && month <= 5) return '春季';
    if (month >= 6 && month <= 8) return '夏季';
    if (month >= 9 && month <= 11) return '秋季';
    return '冬季';
}

// 获取星期几
function getDayOfWeek(date) {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[date.getDay()];
}

// 生成丰富的游戏时间信息
function generateTimeInfo(currentTime, dayCount) {
    const dateStr = currentTime.toLocaleDateString('zh-CN');
    const timeStr = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
    const dayOfWeek = getDayOfWeek(currentTime);
    const season = getSeason(currentTime);

    return {
        fullInfo: `${dateStr} ${dayOfWeek} ${timeStr} (${season})`,
        date: dateStr,
        time: timeStr,
        dayOfWeek,
        season,
        dayCount,
        hour: currentTime.getHours()
    };
}

// 根据性别获取敬语
function getHonorific(gender) {
    return gender === 'male' ? '先生' : '女士';
}

function getPronoun(gender) {
    return gender === 'male' ? '他' : '她';
}

// ==================== 动态恢复action生成系统 ====================

// 根据角色性格和状态生成个性化恢复action
function generateRestAction(character, otherCharacters) {
    const restActions = {
        huiwu: [
            { // 玩游戏
                thought: "脑子有些过载了，强行继续只会写出更烂的代码。玩个游戏让手指替代大脑，暂时放松一下。",
                action: "靠在书房椅背上，打开平板上收藏的像素风格游戏，手指在屏幕上飞快移动，嘴里轻声嘟囔着攻略",
                result: "打过了卡了很久的关，肩膀瞬间松弛下来，感觉整个人都重新有了活力",
                duration: 20,
                stat_changes: { mood: 12, energy: 22, satiety: -2, hygiene: 0, wallet: 0 },
                effort: 'medium'
            },
            { // 看新闻
                thought: "盯屏幕太久了，眼睛需要休息。看点新闻，让脑子在信息的碎片里放松，这样反而能重新整理思路。",
                action: "推开书房的门，在客厅沙发上坐下，打开新闻客户端，边喝水边浏览科技新闻",
                result: "一条关于新型芯片的报道重新激发了灵感，他若有所思地掏出手机记了几个关键词",
                duration: 15,
                stat_changes: { mood: 8, energy: 16, satiety: -2, hygiene: 0, wallet: 0 },
                invitable: true,
                effort: 'low'
            },
            { // 独自思考
                thought: "需要让脑子彻底放空，什么都别想，只是坐着、呼吸、感受当下的安静。",
                action: "走到窗边，靠着墙静静地站着，目光飘向远方的城市轮廓，脑子里一片平静",
                result: "十分钟后，整个人都放松了下来，精神状态明显好转",
                duration: 10,
                stat_changes: { mood: 10, energy: 18, satiety: -1, hygiene: 0, wallet: 0 },
                effort: 'minimal'
            }
        ],
        sanjiu: [
            { // 看电影
                thought: "眼睛太累了，不适合再看画册。看部喜欢的电影，让画面和音乐把自己包裹起来，忘记疲劳。",
                action: "回到卧室，拉上窗帘，打开笔记本，选了一部很久没看的老电影，蜷在被子里看起来",
                result: "两小时后，当片尾曲响起，她感觉心里被治愈了，疲劳也随之消散",
                duration: 25,
                stat_changes: { mood: 15, energy: 20, satiety: -3, hygiene: 0, wallet: 0 },
                invitable: true,
                effort: 'low'
            },
            { // 听音乐冥想
                thought: "不想做任何事，只想让音乐流淌过整个身体，让身心都慢下来。",
                action: "戴上耳机，躺到床上，闭上眼睛，让钢琴曲轻轻地包围自己，呼吸也跟着旋律放缓",
                result: "音乐结束时，她已经完全放松，整个人像被重新启动了一遍",
                duration: 18,
                stat_changes: { mood: 12, energy: 19, satiety: 0, hygiene: 0, wallet: 0 },
                effort: 'minimal'
            },
            { // 用笔画一些涂鸦
                thought: "不想画大作品，只想让手动一动，画些无意义的涂鸦，让手脑放空。",
                action: "坐到窗边，拿出速写本，笔尖在纸上随意游走，画些线条、点点、简单的图案",
                result: "不知不觉画了一整页，看着这些无意义却很治愈的涂鸦，心情明显好转",
                duration: 15,
                stat_changes: { mood: 11, energy: 17, satiety: -1, hygiene: -1, wallet: 0 },
                effort: 'medium'
            }
        ],
        wuyue: [
            { // 看杂志+零食
                thought: "需要舒服地坐着，翻翻时尚杂志，吃点喜欢的零食，这是最简单有效的放松方式。",
                action: "窝进客厅的懒人沙发，翻出收藏的时尚杂志，咔嚓咔嚓地吃着坚果和蜜饯",
                result: "一个小时后，杂志翻完了，零食也吃完了，整个人神清气爽",
                duration: 20,
                stat_changes: { mood: 14, energy: 21, satiety: 12, hygiene: -1, wallet: -15 },
                effort: 'minimal'
            },
            { // 逛街（虚拟）+ 逛超市
                thought: "想象自己在商场里走一走，看看衣服、鞋子、各种新鲜的东西，这样能让心情飞扬起来。",
                action: "打开购物app，浏览最新款的衣服和包包，时不时加入购物车，嘴里还在哼着歌",
                result: "看到一件满意的衣服，果断下单，那种买东西的快乐感顿时驱散了所有疲劳",
                duration: 20,
                stat_changes: { mood: 16, energy: 19, satiety: -2, hygiene: 0, wallet: -80 },
                effort: 'low'
            },
            { // 做简单的点心
                thought: "需要用手做点东西，简单的、能立刻吃的东西。这样既能放松又能收获成就感。",
                action: "走进厨房，简单地打发几个蛋白做蛋白糖，或者烤点饼干，厨房里很快弥漫起甜蜜的香气",
                result: "二十分钟后，热乎的点心出炉了，咬一个还温热的蛋白糖，所有疲劳都烟消云散",
                duration: 20,
                stat_changes: { mood: 13, energy: 18, satiety: 10, hygiene: -2, wallet: -20 },
                invitable: true,
                effort: 'medium'
            }
        ]
    };

    // 基于疲劳等级选择恢复action
    const actions = restActions[character.name] || [];
    if (actions.length === 0) return null;

    // 高疲劳时优先选择低努力的恢复方式
    let selectedAction;
    const fatigueLevel = character.fatigueLevel || 0;
    if (fatigueLevel > 70) {
        // 极度疲劳：只选择minimal或low effort的action
        const easyActions = actions.filter(a => a.effort === 'minimal' || a.effort === 'low');
        if (easyActions.length > 0) {
            selectedAction = easyActions[Math.floor(Math.random() * easyActions.length)];
        } else {
            selectedAction = actions[Math.floor(Math.random() * actions.length)];
        }
    } else if (fatigueLevel > 40) {
        // 中度疲劳：倾向选择low或minimal effort的action
        const preferredActions = actions.filter(a => a.effort !== 'medium');
        if (preferredActions.length > 0 && Math.random() < 0.7) {
            selectedAction = preferredActions[Math.floor(Math.random() * preferredActions.length)];
        } else {
            selectedAction = actions[Math.floor(Math.random() * actions.length)];
        }
    } else {
        // 低疲劳：任意选择
        selectedAction = actions[Math.floor(Math.random() * actions.length)];
    }

    // 如果这个action可邀请，并且有其他清醒的角色，50%概率邀请
    let interaction_with = null;
    if (selectedAction.invitable && Math.random() < 0.5) {
        const awakeOthers = otherCharacters.filter(c =>
            c.status === 'awake' && c.name !== character.name && Math.random() < 0.4
        );
        if (awakeOthers.length > 0) {
            interaction_with = awakeOthers.map(c => c.name).join('、');
        }
    }

    return {
        character: character.name,
        thought: selectedAction.thought,
        action: selectedAction.action,
        result: selectedAction.result,
        duration: selectedAction.duration,
        stat_changes: { ...selectedAction.stat_changes },
        interaction_with: interaction_with,
        new_room: character.currentRoom
    };
}

// 共享的 API 配置常量
const API_CONFIG = {
    ENDPOINT: 'https://api.deepseek.com/chat/completions',
    MODEL: 'deepseek-chat',
    METHOD: 'POST'
};

// 清理并解析 JSON 响应（处理 markdown 包装）
function cleanAndParseJSON(rawContent) {
    try {
        // 第一步：去掉两端空白
        let cleaned = rawContent.trim();

        // 第二步：处理 markdown 代码块包装
        // 匹配 ```json...``` 或 ```...```
        if (cleaned.startsWith('```')) {
            // 去掉开头的 ```json 或 ```
            cleaned = cleaned.replace(/^```(?:json)?\s*\n/, '');
            // 去掉结尾的 ```
            cleaned = cleaned.replace(/\n?```\s*$/, '');
        }

        // 第三步：再次清理空白
        cleaned = cleaned.trim();

        // 第四步：尝试解析
        return JSON.parse(cleaned);
    } catch (parseError) {
        // 提供详细的调试信息
        console.error('JSON解析失败:', {
            error: parseError.message,
            position: parseError.message.match(/position (\d+)/)?.[1],
            line: parseError.message.match(/line (\d+)/)?.[1],
            column: parseError.message.match(/column (\d+)/)?.[1],
            rawLength: rawContent.length,
            cleanedLength: cleaned?.length,
            first200: rawContent.substring(0, 200),
            errorContext: rawContent.substring(Math.max(0, 2337-200), Math.min(rawContent.length, 2337+200))
        });
        throw parseError;
    }
}

// 获取 DeepSeek API headers
function getDeepseekHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gameState.apiKey}`
    };
}

// 调用 DeepSeek API 的通用函数
async function callDeepseekAPI(messages, useJsonFormat = true, maxTokens = 2000) {
    const requestBody = {
        model: API_CONFIG.MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: maxTokens
    };

    if (useJsonFormat) {
        requestBody.response_format = { type: 'json_object' };
    }

    const response = await fetch(API_CONFIG.ENDPOINT, {
        method: API_CONFIG.METHOD,
        headers: getDeepseekHeaders(),
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error(`API错误: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // 检查是否为空
    if (!content || content.trim().length === 0) {
        throw new Error('API返回空内容');
    }

    // 检查finish_reason是否为"length"（表示被截断）
    if (data.choices[0].finish_reason === 'length') {
        console.warn('警告: API响应被截断（max_tokens不足），正在尝试解析...');
    }

    return cleanAndParseJSON(content);
}

// 根据角色当前状态生成动态性格描述
function generateDynamicPersonality(character) {
    const char = gameState.characters[character];
    if (!char) return '';

    const pronoun = getPronoun(char.gender);

    // 基础性格模板
    const basePersonality = {
        huiwu: "男性，22岁，榆木脑袋的顶尖学霸，极度理性，不善言辞，但内心细腻；思考方式像工程师，会用逻辑来解释情感，但情感本身是真实的。",
        sanjiu: "女性，21岁，沉默寡言，不擅表达，情感藏得极深；对艺术有近乎本能的感知，行动缓慢而精确，说话极少但每句都有重量。",
        wuyue: "女性，22岁，努力认真，不会撒谎，对食物有真诚的热爱；表达直接，情绪写在脸上，会用做饭来表达关心，偶尔有点小贪心但从不掩饰。"
    };

    let personality = basePersonality[character] || '';

    // 睡眠状态优先级最高
    if (char.isSleeping) {
        personality += ` 【🌙 睡眠状态：${pronoun}已经睡着，呼吸平稳，在梦乡中安睡。】`;
    }
    // 紧急恢复状态（精力极低，需要立即休息）
    else if (char.energy < 10) {
        personality += ` 【⚠️ 紧急状态：精力接近耗尽（${Math.round(char.energy)}/100），${pronoun}必须立刻停下手上的工作，找个地方坐下休息，否则会晕倒！这是身体的紧急求救信号。】`;
    }
    // 根据精力值调整状态
    else if (char.energy < 30) {
        personality += ` 【当前状态：疲惫不堪，思维迟钝，动作缓慢，容易烦躁。${pronoun}的眼神有些涣散。】`;
    } else if (char.energy < 60) {
        personality += ` 【当前状态：有些疲倦，反应迟缓，缺乏热情。${pronoun}动作略显无力。】`;
    } else if (char.energy > 85) {
        personality += ` 【当前状态：精力充沛，思维敏捷，行动积极。${pronoun}眼中闪烁着光芒。】`;
    }

    // 根据疲劳度调整状态
    if ((char.fatigueLevel || 0) > 70) {
        personality += ` 【疲劳状态：极度疲惫，${pronoun}已经工作很久，需要充分休息。】`;
    } else if ((char.fatigueLevel || 0) > 40) {
        personality += ` 【疲劳状态：有些疲累，${pronoun}工作效率可能下降，容易出错。】`;
    }

    // 根据心情值调整情绪
    if (char.mood < 40) {
        personality += ` 【情绪状态：沮丧消沉，对事物缺乏兴趣，言语冷淡。${pronoun}表情显得有些灰暗。】`;
    } else if (char.mood < 60) {
        personality += ` 【情绪状态：心情平平，有些无所谓，反应平淡。${pronoun}的表情不太生动。】`;
    } else if (char.mood > 80) {
        personality += ` 【情绪状态：心情愉快，充满热情，言语热情。${pronoun}脸上带着笑容。】`;
    }

    // 根据饱腹值调整状态
    if (char.satiety < 30) {
        personality += ` 【生理需求：极度饥饿，思想被饥饿占据，行动动力增强。${pronoun}的肚子可能在咕咕叫。】`;
    } else if (char.satiety < 50) {
        personality += ` 【生理需求：有些饥饿，注意力难以集中。${pronoun}会时不时地想起食物。】`;
    } else if (char.satiety > 85) {
        personality += ` 【生理需求：刚吃饱，满足感强，有些懒散。${pronoun}的动作变得慵懒。】`;
    }

    // 根据卫生度调整状态
    if (char.hygiene < 40) {
        personality += ` 【卫生状况：感觉邋遢不适，急需洗漱或洗澡，行动带有烦躁。${pronoun}想快点去洗个澡。】`;
    } else if (char.hygiene < 60) {
        personality += ` 【卫生状况：感觉有些不爽。${pronoun}偶尔会挠一挠。】`;
    }

    // 根据关系值调整对他人的态度
    const relationships = Object.entries(char.relationship).map(([key, value]) => {
        const relationChar = gameState.characters[key];
        if (!relationChar) return '';
        if (value < 0) {
            return `对${relationChar.name}有些不满，交互保持距离。`;
        } else if (value < 20) {
            return `与${relationChar.name}关系淡漠，交互平淡。`;
        } else if (value < 50) {
            return `与${relationChar.name}有基本的好感，愿意小幅主动互动。`;
        } else if (value < 70) {
            return `对${relationChar.name}有较好的感情，交互自然亲近。`;
        } else {
            return `对${relationChar.name}感情深厚，交互充满温暖。`;
        }
    });

    if (relationships.length > 0) {
        personality += ` 【关系状态：${relationships.join(" ")}】`;
    }

    return personality;
}

// 调用 DeepSeek API - 获取角色行为决策
async function callAI(prompt) {
    if (!gameState.apiKey) {
        return mockAIResponse(prompt);
    }

    try {
        // 生成动态的角色性格描述
        const dynamicPersonalities = {
            huiwu: generateDynamicPersonality('huiwu'),
            sanjiu: generateDynamicPersonality('sanjiu'),
            wuyue: generateDynamicPersonality('wuyue')
        };

        const systemPrompt = `你是一位文学素养极高的生活模拟游戏叙事者，负责为公寓里三位角色生成日常生活行为。

【角色性格设定】
1. 惠舞：${dynamicPersonalities.huiwu}
2. 三玖：${dynamicPersonalities.sanjiu}
3. 五月：${dynamicPersonalities.wuyue}

【职业行为规范——生成action时必须参考】
- 惠舞（AI算法工程师，月薪¥15000）：工作日他有正式的工作责任感，上午9-12点和下午14-18点有明确的工作时段。工作时会在书房长时间专注编程，状态好时可连续工作2-3小时。不是随时都愿意被打扰。
- 三玖（插画师，月薪¥8000）：自由职业者，工作时间灵活但有自律性。上午10-13点、下午15-18点会专注创作，创作时沉浸其中，外人难以打断。她的"工作"是绘画而非家务。
- 五月（美食博主，月薪¥10000）：她的工作包括烹饪内容创作、拍摄、剪辑、发布，【不等于每顿饭都要亲自做给别人吃】。她也需要在电脑前工作（剪辑视频、写稿）。早晨偶尔做早餐是她表达关心的方式，但这不是她的职责，也不是每天都做的事。

【性别代词】
- 惠舞（${gameState.characters.huiwu.gender === 'male' ? '男' : '女'}）：用"他"代指
- 三玖（${gameState.characters.sanjiu.gender === 'male' ? '男' : '女'}）：用"她"代指
- 五月（${gameState.characters.wuyue.gender === 'male' ? '男' : '女'}）：用"她"代指

【场景设定】三室一厅公寓，房间 ID 如下：
- livingRoom: 客厅  - kitchen: 厨房  - bathroom: 卫生间
- bathRoom: 浴室  - studyRoom: 书房
- bedroom1: 惠舞的卧室  - bedroom2: 三玖的卧室  - bedroom3: 五月的卧室  - outside: 外出

【写作风格要求——极为重要】
"thought" 和 "action" 必须像优秀短篇小说里的句子，而非游戏任务说明。具体要求：
- "thought"：用第三人称写角色内心世界，要有具体的感官细节、情绪温度和性格逻辑，不得写成"他想去做某事"的简单陈述。要有画面感，有潜台词。
- "action"：描写行为的过程和细节，包括肢体动作、神态、环境感受，如同电影镜头，而非流水账。避免"他去做了X"这种干燥写法。
- "result"：要有余韵，不只是陈述结果，要带出一点情绪或感受。
- "narrative"：用散文笔法串联三人，要有意象、有节奏，像一段精炼的小说场景描写。

【反例——禁止这样写】
思考："精力低了，应该去厨房吃东西补充能量。"
行为："惠舞保存文件，走向厨房，询问五月是否可以一起吃东西。"

【正例——应该这样写】
思考："脑子像是被抽空了一层，屏幕上的字开始发虚。不是累，是那种过载之后的空白——饿也是真的饿，只是这会儿连饥饿感都变得很远。"
行为："推开书房的门，走廊里有点冷，他没去开灯，摸黑走进厨房，打开冰箱，冷光照在脸上，他就那么站着，盯着里面看了好一会儿，才慢慢伸手拿出牛奶。"

你必须严格返回 JSON 格式，包含以下字段：
1. "actions": 数组，包含三个角色的行为，每个元素包含：
   - "character": 角色名称（"惠舞", "三玖" 或 "五月"）
   - "thought": 角色内心世界（文学化，50-120字）
   - "action": 行为过程描写（文学化，50-150字）
   - "result": 结果与余韵（30-80字）
   - "duration": 行为持续时间（分钟，5-120之间）
   - "stat_changes": { "mood": -10到+10, "energy": -20到+10, "satiety": -15到+25（吃东西为正，活动消耗为负）, "hygiene": -15到+10, "wallet": 消费变化 }
   - "interaction_with": 互动的角色名（无则为null）
   - "new_room": 目标房间英文ID（不得含中文）
   - "actionType": 行为类型分类，必须是以下之一：
     * "primary_work" — 角色正在直接进行职业工作（惠舞编程/写代码，三玖画图/创作，五月拍摄/剪辑/写内容）
     * "secondary_work" — 与工作相关的辅助活动（查资料、整理桌面、构思方案、回工作消息）
     * "daily_life" — 日常生活行为（吃饭、做饭、洗漱、购物、打扫）
     * "leisure" — 休闲娱乐（看电影、听音乐、玩游戏、散步、看书消遣）
     * "rest" — 休息或睡眠（睡觉、小憩、冥想、静坐）
     * "social" — 社交互动（与他人对话、陪伴、互动）
   - "workOutput": （可选，仅创作类角色）若本次行为中角色真正"完成"了一件具体可见的创作成果，填写此字段，否则省略。
     * 适用：三玖完成一幅画作/插画/素描，五月完成一道菜品摄影/一期视频剪辑
     * 不适用：未完成草稿、日常练习、中途进展
     * 结构：{ "title": "作品名（可自拟，如《沉默的女孩》）", "type": "illustration|food_photo|video", "description": "30字内中文描述作品内容" }

【关系等级对照表——必须据此调整 thought/action 的措辞距离感与情感浓度】
正向：0素昧平生 | 10点头之交 | 20普通熟人 | 30初步好感 | 40志趣相投 | 50可靠朋友 | 60亲密知己 | 70暧昧/心动 | 80初级恋人 | 90灵魂伴侣 | 100至死不渝
负向：-10轻微排斥 | -20心生反感 | -30公开不睦 | -40交恶状态 | -50心怀怨恨 | -60敌对关系 | -70势不两立 | -80宿怨深仇 | -90不共戴天 | -100不死不休
→ 关系等级越高，角色之间越自然默契，语言越省略，肢体越放松，思考里对方越具体真实；等级越低，越疏离、回避、甚至敌意。请务必让 thought 和 action 的细节体现出这种差异。

2. "narrative": 散文化场景叙述（80-150字）
3. "time_passed": 游戏时间流逝分钟数

严格返回JSON，不含任何额外文字。`;

        return await callDeepseekAPI([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
        ], true, 2000);
    } catch (error) {
        addLog(`API 调用失败: ${error.message}`, 'error');
        return null;
    }
}

// 根据精力、饱腹、卫生、关系值计算心情
function updateCharactersMood() {
    for (const char of Object.values(gameState.characters)) {
        // 精力影响 (30%)
        const energyFactor = (char.energy / 100 - 0.5) * 30;

        // 饱腹影响 (25%) - 最佳范围 40-80
        let satietyFactor;
        if (char.satiety < 30) satietyFactor = -25;
        else if (char.satiety < 50) satietyFactor = -10;
        else if (char.satiety <= 80) satietyFactor = 15;
        else if (char.satiety <= 95) satietyFactor = 5;
        else satietyFactor = -20;

        // 卫生影响 (20%)
        const hygieneFactor = (char.hygiene / 100 - 0.6) * 25;

        // 关系影响 (25%)
        const relationValues = Object.values(char.relationship);
        const avgRelation = relationValues.length > 0
            ? relationValues.reduce((a, b) => a + b, 0) / relationValues.length
            : 50;
        const relationFactor = (avgRelation / 100 - 0.5) * 25;

        // 综合计算
        const moodInfluence =
            energyFactor * 0.30 +
            satietyFactor * 0.25 +
            hygieneFactor * 0.20 +
            relationFactor * 0.25;

        // 基础心情75 + 各属性影响 (-40 到 +40 的范围)
        const targetMood = 75 + Math.max(-40, Math.min(40, moodInfluence));

        // 逐步衰减：不直接跳跃，而是逐渐靠近目标心情（每次最多变化3点）
        const moodGap = targetMood - char.mood;
        char.mood += Math.sign(moodGap) * Math.min(Math.abs(moodGap), 3);
        char.mood = Math.max(0, Math.min(100, char.mood));
    }
}

// Mock 模式
function mockAIResponse(prompt) {
    console.log("Mocking Prompt:", prompt);
    return new Promise(resolve => {
        setTimeout(() => {
            // 根据当前时间生成不同的行为
            const hour = gameState.currentTime.getHours();
            const holidayInfo = CalendarPlugin.getHolidayInfo(gameState.currentTime);
            const isHoliday = holidayInfo.isHoliday;
            const holidayName = holidayInfo.name;
            let mockResponse;

            // 如果是节假日，生成节假日特定的行为
            // 传入角色对象以支持状态感知的行为生成
            if (isHoliday) {
                mockResponse = CalendarPlugin.generateHolidayMockResponse(holidayName, hour, gameState.characters);
            } else if (hour >= 7 && hour < 9) {
                // 早晨
                mockResponse = {
                    actions: [
                        {
                            character: "惠舞",
                            thought: "闹钟响之前就醒了——脑子里那个昨晚没解决的bug还在转，像一根卡进齿轮的沙粒。越躺着越清醒，索性起来，用代码把它磨碎。",
                            action: "洗了把脸走进书房，在椅子上坐定，打开编译器，盯着昨晚留下的那行报错，食指缓缓敲击桌面，忽然停住，俯身开始打字",
                            result: "那个bug被找到了，藏在一个极不起眼的类型转换里；修完跑了一遍测试，绿灯亮起的瞬间，肩膀悄悄松了一口气",
                            duration: 60,
                            stat_changes: { mood: 5, energy: -10, satiety: -10, hygiene: -5, wallet: 0 },
                            interaction_with: null,
                            new_room: "studyRoom",
                            actionType: "primary_work"
                        },
                        {
                            character: "三玖",
                            thought: "早晨的光是最诚实的——它会把你画面里所有糊弄过去的地方全都照出来。三玖不怕这种诚实，她反而喜欢在这样的光线下动笔，错了就改，改了就好。",
                            action: "把画板支在窗边，对着窗外的一角街景起稿，铅笔线条又轻又稳，像是怕打扰了早晨的安静",
                            result: "画了几根电线杆和半棵梧桐树，构图简单，却有一种克制的完整",
                            duration: 45,
                            stat_changes: { mood: 8, energy: -8, satiety: -8, hygiene: -3, wallet: 0 },
                            interaction_with: null,
                            new_room: "livingRoom",
                            actionType: "primary_work"
                        },
                        {
                            character: "五月",
                            thought: "肚子比闹钟更准时。五月还没睁开眼，胃就已经在催了——先把自己喂饱，顺手多做一份，惠舞那个书呆子肯定又没想着吃东西。",
                            action: "在厨房打两个鸡蛋，切了几片吐司，一边煎蛋一边把面包片压进烤架，等待的间隙顺手洗了昨晚泡着的碗",
                            result: "端出两份早餐，一份放在书房门口，轻轻敲了两下门说'吃饭了'，没等回应就转身去吃自己的",
                            duration: 30,
                            stat_changes: { mood: 10, energy: 8, satiety: -5, hygiene: -2, wallet: 0 },
                            interaction_with: "惠舞",
                            new_room: "kitchen",
                            actionType: "daily_life"
                        }
                    ],
                    narrative: "晨光还没完全铺展开，公寓就已经各自醒来了。惠舞与一个隐藏在代码深处的错误展开了安静的较量；三玖用铅笔捕捉窗外那一角普通的街景；而五月的厨房里，黄油在锅里轻轻滋响，一份没有署名的早餐，悄悄出现在了书房的门口。",
                    time_passed: 60
                };
            } else if (hour >= 9 && hour < 12) {
                // 上午工作时段
                mockResponse = {
                    actions: [
                        {
                            character: "惠舞",
                            thought: "昨晚的bug虽然搞定了，但今天的需求评审会已经在脑子里放映了一遍——新功能的架构思路需要梳理清楚，要不然下午的代码会写得很累。",
                            action: "坐在书房的椅子上，打开文档和代码，先梳理了新需求的逻辑流程，在纸上画了一张结构图，越画思路越清晰，手指在键盘上开始敲出框架代码",
                            result: "框架搭建完毕，剩下的就是填充业务逻辑，他对自己今天的进度满意得点了点头",
                            duration: 90,
                            stat_changes: { mood: 3, energy: -12, satiety: -8, hygiene: 0, wallet: 0 },
                            interaction_with: null,
                            new_room: "studyRoom",
                            actionType: "primary_work"
                        },
                        {
                            character: "三玖",
                            thought: "早稿已经完成，现在是细化和着色的阶段。这个过程很考验耐心，但也很治愈——笔触一点点覆盖纸面，就像给这个世界一点点上色。",
                            action: "在书房的角落支起画架，铺开调色盘，先用细笔勾勒出人物的五官轮廓，再一层层叠加色彩，中间停下来退后看几步，确认效果后继续深入",
                            result: "画到中午前，人物的面部已经初步成型，那种寂寞而坚定的眼神也出来了，三玖对自己的作品点了点头",
                            duration: 150,
                            stat_changes: { mood: 10, energy: -15, satiety: -10, hygiene: -2, wallet: 0 },
                            interaction_with: null,
                            new_room: "studyRoom",
                            actionType: "primary_work"
                        },
                        {
                            character: "五月",
                            thought: "昨天的视频反响还不错，今天要趁热打铁，赶紧把素材整理出来进行初步剪辑。但首先得把下周的内容选题定下来——菜单得多样化，这样才能保持粉丝的新鲜感。",
                            action: "坐在电脑前，打开编辑软件，先快速浏览了所有的素材，给重点片段做了标记，然后打开文档开始写这期视频的脚本和旁白词，边写边在脑子里预演镜头顺序",
                            result: "脚本写完了，大致框架也理清了，五月感觉这条视频的故事线比上一条更完整，下午可以全力剪辑",
                            duration: 120,
                            stat_changes: { mood: 5, energy: -8, satiety: -6, hygiene: 0, wallet: 0 },
                            interaction_with: null,
                            new_room: "livingRoom",
                            actionType: "primary_work"
                        }
                    ],
                    narrative: "上午的阳光透过窗户洒进公寓，三个人各自陷入深度工作的状态——惠舞的指尖在键盘上舞动，为虚拟世界搭建结构；三玖的笔尖在画纸上游走，为角色赋予灵魂；五月对着屏幕喃喃自语，规划着下一个故事的叙述。公寓在这个上午显得安静而充满力量。",
                    time_passed: 90
                };
            } else if (hour >= 12 && hour < 14) {
                // 中午
                mockResponse = {
                    actions: [
                        {
                            character: "惠舞",
                            thought: "写了三个小时的代码，眼睛开始拒绝对焦。胃里传来更实际的抗议——泡面，快，不然下午的思路会更乱。",
                            action: "走进厨房，撕开一包泡面，烧水的间隙靠着冰箱盯着天花板发呆；面泡好后端回书房，一边吃一边盯着屏幕上的函数，筷子像是在空中悬着",
                            result: "面条吸溜到一半，突然想到了一个新的架构思路，赶紧腾出一只手在便利贴上飞速写下三行字，面条凉了也没察觉",
                            duration: 20,
                            stat_changes: { mood: 3, energy: 10, satiety: 20, hygiene: -2, wallet: -10 },
                            interaction_with: null,
                            new_room: "kitchen",
                            actionType: "daily_life"
                        },
                        {
                            character: "三玖",
                            thought: "画到一半，眼睛开始酸，脑子也有些转不动了。不是卡住了，只是需要停一停，让那些颜色在脑子里沉淀一下，再重新看的时候，往往会有新的想法。",
                            action: "放下画笔，躺到沙发上，把靠垫压在脸上，让光线变暗；不是真的要睡，只是想安静地不做任何事",
                            result: "闭眼躺了二十分钟，脑子里莫名其妙地浮现出新画面的构图，爬起来拿笔快速记了下来",
                            duration: 20,
                            stat_changes: { mood: 5, energy: 15, satiety: -5, hygiene: 0, wallet: 0 },
                            interaction_with: null,
                            new_room: "livingRoom",
                            actionType: "rest"
                        },
                        {
                            character: "五月",
                            thought: "脚本写完了，这会儿得吃点东西垫垫肚子。简单弄点午餐吧，快手面疙瘩汤，十分钟搞定，然后继续回电脑前处理素材库。",
                            action: "在厨房快速烧了一锅汤，揪了面疙瘩进去，加了点青菜，十分钟出锅；坐在餐桌边，一边吃一边漫无目的地看手机，粉丝的留言又多了很多",
                            result: "汤喝完了，肚子也有了点饱腹感，五月擦了嘴，感觉下午有精力继续工作了",
                            duration: 15,
                            stat_changes: { mood: 6, energy: 8, satiety: 18, hygiene: -1, wallet: -8 },
                            interaction_with: null,
                            new_room: "kitchen",
                            actionType: "daily_life"
                        }
                    ],
                    narrative: "午间的公寓被各自的事务切割成三个独立的小世界：惠舞在泡面的热气里捕捞着从代码缝隙里漏出的灵感；三玖用靠垫盖住脸，在黑暗里等待新的画面自己浮现；而五月则在厨房的烟火气中短暂地停歇，为下午的工作补充能量。",
                    time_passed: 35
                };
            } else if (hour >= 14 && hour < 17) {
                // 下午工作时段
                mockResponse = {
                    actions: [
                        {
                            character: "惠舞",
                            thought: "午休过后脑子清醒了不少，下午就该把上午设计的框架代码填满了。这个功能模块相对独立，今天能把它搞完的话，明天就能进入集成测试阶段。",
                            action: "回到书房坐下，打开上午的代码，逐行阅读自己的框架，脑子快速模拟一遍逻辑流程，然后开始细致地填充业务逻辑，手速飞快但每一个字符都是精确的",
                            result: "下午四点，测试通过，这个模块的核心功能已经完整了，惠舞伸了个长懒腰，眼神里闪着满足感",
                            duration: 120,
                            stat_changes: { mood: 8, energy: -14, satiety: -12, hygiene: 0, wallet: 0 },
                            interaction_with: null,
                            new_room: "studyRoom",
                            actionType: "primary_work"
                        },
                        {
                            character: "三玖",
                            thought: "午睡后眼睛舒服多了，继续着色吧。这个女孩的故事还没讲完，衣服的褶皱、头发的光泽、背景的虚化，都还需要更多的笔触来完成。",
                            action: "回到书房，继续昨天未完的作品，笔尖在画纸上游走，从细节开始——衣料的质感、光影在脸上的流动、那一丝若有若无的表情。每完成一个部分就停下来看看整体效果",
                            result: "三个小时的工作下来，这幅画已经完成度很高了，三玖感觉这可能是这个月最满意的作品",
                            duration: 180,
                            stat_changes: { mood: 12, energy: -18, satiety: -14, hygiene: -3, wallet: 0 },
                            interaction_with: null,
                            new_room: "bedroom2",
                            actionType: "primary_work",
                            workOutput: {
                                title: "那个女孩",
                                type: "illustration",
                                description: "衣料质感细腻的少女，光影在脸上流动，若有若无的神情"
                            }
                        },
                        {
                            character: "五月",
                            thought: "脚本已经敲定，剩下的工作就是在timeline上把素材组织起来，配音、配乐、特效，一步步把素材变成一个完整的故事。下午的光线很好，得抓紧时间。",
                            action: "坐在电脑前打开pr，把上午标记的重点素材一段段地拖进timeline，粗剪完成后开始对着脚本录制旁白，嗓子有点累但声音的节奏越来越顺畅",
                            result: "傍晚六点，第一版剪辑完成，五月看了一遍回放，虽然细节还可以优化，但整体故事线已经很完整了，明天可以进行精细调整",
                            duration: 150,
                            stat_changes: { mood: 7, energy: -16, satiety: -10, hygiene: -2, wallet: 0 },
                            interaction_with: null,
                            new_room: "livingRoom",
                            actionType: "primary_work",
                            workOutput: {
                                title: "美食记录Vol.12",
                                type: "video",
                                description: "有完整故事线的美食视频，旁白节奏流畅，充满烟火气"
                            }
                        }
                    ],
                    narrative: "下午的公寓洋溢着创意和代码的芬芳。惠舞的书房里，屏幕闪烁着调试的色彩；三玖的卧室里，笔尖舞动着一个完整的世界；而五月的电脑屏幕上，素材像音符一样在timeline上排列成了一首视觉之歌。三个人各自沉浸在自己的工作中，却又在这个共同的下午里，用专注书写着各自的故事。",
                    time_passed: 120
                };
            } else if (hour >= 17 && hour < 20) {
                // 傍晚时段
                mockResponse = {
                    actions: [
                        {
                            character: "惠舞",
                            thought: "长时间对着屏幕，脑子已经有点懵了。站起来活动一下身体，晚餐时间也快到了。今天的工作量已经够了，下班的感觉终于来了。",
                            action: "从书房走出来，在客厅的沙发上坐下，随便翻着手机上的新闻，有一搭没一搭地看着，偶尔站起来伸个懒腰走到阳台看看外面",
                            result: "脑子逐渐从代码的世界里退出来，开始变得有些懒散，这是该放松的时候了",
                            duration: 50,
                            stat_changes: { mood: 4, energy: 12, satiety: -8, hygiene: 0, wallet: 0 },
                            interaction_with: null,
                            new_room: "livingRoom",
                            actionType: "leisure"
                        },
                        {
                            character: "三玖",
                            thought: "今天的创作已经完成了，再看下去也只是重复打磨。这幅画可以放一放，明天用新的眼光再看一遍，往往会发现今天看不到的问题。该休息了。",
                            action: "收起所有的画具，洗了手，窝进卧室的懒人沙发，打开平板放了部喜欢的老电影，就这样窝着看，让脑子彻底放空",
                            result: "电影的背景音乐舒缓而温和，三玖的眼神逐渐放松，整个人都陷入了舒适的懒散中",
                            duration: 90,
                            stat_changes: { mood: 8, energy: 16, satiety: -6, hygiene: 0, wallet: 0 },
                            interaction_with: null,
                            new_room: "bedroom2",
                            actionType: "leisure"
                        },
                        {
                            character: "五月",
                            thought: "剪辑工作告一段落了，这会儿得进入职业生活的另一个角色——把自己换成一个会做饭的女孩。晚餐得给三个人都准备上，算算时间应该来得及。",
                            action: "走进厨房，看了看冰箱里的食材，决定做个简单的番茄鸡蛋面和清汤青菜。开始洗菜、切菜、烧水，厨房里很快就热气腾腾的，偶尔尝一口汤的咸淡",
                            result: "饭菜差不多同时出锅，五月擦了擦手，轻声叫了两个室友来吃饭，自己也坐下来吃了一碗，虽然今天没专门给别人做什么特殊的，但这顿饭也饱含了她作为室友的用心",
                            duration: 60,
                            stat_changes: { mood: 6, energy: 2, satiety: -8, hygiene: -4, wallet: -15 },
                            interaction_with: "惠舞、三玖",
                            new_room: "kitchen",
                            actionType: "daily_life"
                        }
                    ],
                    narrative: "傍晚降临，公寓从紧张的工作节奏渐渐放松下来。惠舞卸下了代码工程师的角色，恢复成一个需要休息的普通人；三玖把画笔搁置在一边，让自己在电影的陪伴下静静地发呆；而五月则自然地转换到家务的角色，厨房里的热汤和家常菜的香气，宣告了这一天工作的落幕。三个人围坐在一起，享受着彼此陪伴的傍晚。",
                    time_passed: 60
                };
            } else if (hour >= 20 || hour < 5) {
                // 晚间和深夜
                mockResponse = {
                    actions: [
                        {
                            character: "惠舞",
                            thought: "夜晚了，继续工作也不是个办法，眼睛已经开始抗议。洗个澡清醒一下，然后早点睡，明天的冲刺还要靠充足的睡眠保障。",
                            action: "进浴室洗了个热水澡，热水冲在身体上，所有的疲惫都随着水流往下淌。洗完擦干身体后，穿上睡衣，靠在床上用手机看了会儿代码论坛，越看越困",
                            result: "手机掉在了身边，眼睛已经睁不开，一天的工作圆满地以睡眠收尾",
                            duration: 90,
                            stat_changes: { mood: 5, energy: 32, satiety: -5, hygiene: 25, wallet: 0 },
                            interaction_with: null,
                            new_room: "bedroom1",
                            actionType: "rest"
                        },
                        {
                            character: "三玖",
                            thought: "电影看完了，窗外已经是深夜的寂静。洗个澡吧，把一天的工作的痕迹都冲洗掉，然后好好睡一觉，让身体和脑子都得到充分的修复。",
                            action: "进浴室洗澡，用温水浸泡，闭眼感受水的温度，脑子里闪过今天创作的各个细节。洗好后穿上睡衣，躺在床上，窝进被子里，整个人都蜷缩在温暖中",
                            result: "黑暗中，三玖的呼吸逐渐变得均匀，一天的疲惫在睡眠中悄悄消解",
                            duration: 80,
                            stat_changes: { mood: 6, energy: 28, satiety: -3, hygiene: 24, wallet: 0 },
                            interaction_with: null,
                            new_room: "bedroom2",
                            actionType: "rest"
                        },
                        {
                            character: "五月",
                            thought: "晚饭后收拾了碗筷，整个下午都在电脑前，此刻眼睛有点酸。在客厅窝进沙发，看会儿综艺节目放松一下，别想那些工作的事了。",
                            action: "窝进客厅的沙发，打开电视翻到综艺频道，一边看一边吃了点晚间小零食，节目的欢笑声填满了夜晚的安静。看到困了，才缓缓起身走向卧室",
                            result: "躺在床上，脑子里还有节目欢笑声的余音，五月面带微笑地闭上眼睛，进入了梦乡",
                            duration: 120,
                            stat_changes: { mood: 8, energy: 26, satiety: 8, hygiene: 0, wallet: -20 },
                            interaction_with: null,
                            new_room: "bedroom3",
                            actionType: "leisure"
                        }
                    ],
                    narrative: "夜幕降临，公寓进入了宁静的休息模式。三个人各自完成了自己的一天，用洗澡、娱乐、睡眠来犒赏疲惫的身体。在梦乡中，他们将在明天的晨光里重新醒来，开始新的循环。而这个小小的公寓，见证了每一个平凡而充实的日子。",
                    time_passed: 90
                };
            } else {
                // 其他时间 - 使用动态恢复action生成系统
                const allChars = Object.values(gameState.characters);
                const actions = [];

                for (const char of allChars) {
                    const restAction = generateRestAction(char, allChars);
                    if (restAction) {
                        actions.push(restAction);
                    }
                }

                mockResponse = {
                    actions: actions.length === 3 ? actions : [
                        // 备用方案，如果动态生成失败
                        {
                            character: "惠舞",
                            thought: "脑子有些过载了，强行继续只会写出更烂的代码。去厨房泡杯咖啡，用咖啡因给脑子充充电。",
                            action: "走出书房，在厨房用速溶咖啡冲了一杯热水，靠着水槽端着杯子，每一口都喝得很慢",
                            result: "咖啡喝完，脑子清醒了不少，他感觉整个人又活过来了",
                            duration: 15,
                            stat_changes: { mood: 8, energy: 18, satiety: -3, hygiene: 0, wallet: -5 },
                            interaction_with: null,
                            new_room: "kitchen"
                        },
                        {
                            character: "三玖",
                            thought: "眼睛和脑子都需要休息。与其勉强画画，不如小憩一会儿。",
                            action: "在卧室铺好被子，靠在枕头上，闭上眼睛，身体完全放松",
                            result: "小憩后，睁开眼睛时感觉整个人都重新活过来了",
                            duration: 20,
                            stat_changes: { mood: 10, energy: 20, satiety: -3, hygiene: 0, wallet: 0 },
                            interaction_with: null,
                            new_room: "bedroom2"
                        },
                        {
                            character: "五月",
                            thought: "需要舒服地坐着，喝点热茶，吃点零食，让身心都放松下来。",
                            action: "在厨房给自己泡了杯热茶，用小碗装了点坚果，坐到客厅的沙发上",
                            result: "十五分钟后，五月感觉神清气爽，站起来拍拍手，准备继续工作",
                            duration: 15,
                            stat_changes: { mood: 10, energy: 15, satiety: 5, hygiene: 0, wallet: -12 },
                            interaction_with: null,
                            new_room: "livingRoom"
                        }
                    ],
                    narrative: "下午时光变得柔和，公寓里的三个人各自找到了属于自己的放松方式。有人在热饮里寻找灵感，有人在短暂的休息中恢复元气，有人在闲适中重拾能量。",
                    time_passed: 45
                };
            }

            resolve(mockResponse);
        }, 1000);
    });
}

// ====================== 夜晚关系结算 ======================

// mock：无 API 时的夜晚结算结果
function mockNightlyReview() {
    const chars = Object.values(gameState.characters);
    const reviews = [];
    for (let i = 0; i < chars.length; i++) {
        for (let j = 0; j < chars.length; j++) {
            if (i === j) continue;
            const hasInteraction = gameState.dailyInteractions.some(
                item => item.actor === chars[i].name && item.with.includes(chars[j].name)
            );
            reviews.push({
                from: chars[i].name,
                to: chars[j].name,
                delta: hasInteraction ? 1 : 0,
                reason: hasInteraction ? '今日有互动，感情略有升温' : '今日无直接互动'
            });
        }
    }
    return { reviews };
}

// 调用 AI 进行夜晚关系综合评估
async function callNightlyReviewAI(reviewPrompt) {
    try {
        return await callDeepseekAPI([
            {
                role: 'system',
                content: '你是游戏AI，负责评估角色关系日终变化。严格返回JSON，不含任何额外文字或markdown代码块。'
            },
            { role: 'user', content: reviewPrompt }
        ], false, 800);
    } catch (error) {
        throw new Error(`夜晚结算API错误: ${error.message}`);
    }
}

// ==================== 作品文生图命令词相关函数 ====================

/**
 * 获取预设的 mock 文生图 prompt
 */
function getMockArtworkPrompt(charName, type) {
    const mockPrompts = {
        '三玖': {
            illustration: {
                description: "衣料质感细腻的少女坐在窗边，背对观众，长黑发被秋风吹起，细腻的线条刻画出若有若无的表情",
                prompt: "a quiet girl sitting by the window, back facing viewer, long dark hair blown by autumn breeze, soft morning light, detailed illustration, anime style, melancholic atmosphere, watercolor texture, delicate linework, muted blue and gray colors, professional quality",
                negativePrompt: "lowres, bad anatomy, blurry, ugly, text, watermark, signature, deformed",
                style: "anime illustration"
            }
        },
        '五月': {
            video: {
                description: "热气腾腾的面碗从正上方俯拍，温暖的光线照亮食材细节，视频剪辑流畅节奏感强，旁白声音清晰温暖",
                prompt: "food photography cinematic thumbnail, steaming bowl of noodles overhead shot, warm golden hour lighting, bokeh background, styled on dark wood table, professional food styling, shallow depth of field, appetizing composition",
                negativePrompt: "blurry, amateur, bad lighting, ugly food, text overlay, watermark, low quality",
                style: "food photography"
            },
            food_photo: {
                description: "精心摆盘的菜肴在自然窗光中闪闪发光，餐具搭配精妙，每个细节都呈现出餐饮艺术的审美",
                prompt: "close-up food photography, beautifully plated dish, natural window light, shallow depth of field, warm tones, professional styling, fresh ingredients visible, artistic composition, high end restaurant presentation",
                negativePrompt: "blurry, bad lighting, ugly food, amateur, text, watermark, low quality",
                style: "food photography"
            }
        }
    };
    return mockPrompts[charName]?.[type] || null;
}

/**
 * 根据角色和作品类型返回英文风格提示词
 */
function getStyleHint(charName, type) {
    const hints = {
        '三玖_illustration': "anime illustration, soft linework, Japanese manga style, pastel palette, emotional depth",
        '五月_food_photo': "food photography, bokeh, warm daylight, overhead shot, professional styling, appetizing",
        '五月_video': "cinematic food vlog, dramatic lighting, close-up detail shots, editorial style, warm color grading"
    };
    return hints[`${charName}_${type}`] || "artistic, high quality, detailed";
}

/**
 * 调用 deepseek 生成作品的文生图命令词
 */
async function generateArtworkImagePrompt(char, workOutput, action) {
    // Mock 模式：无 API Key 时返回预设 prompt
    if (!gameState.apiKey) {
        return getMockArtworkPrompt(char.name, workOutput.type);
    }

    // 惠舞（工程师）跳过
    if (char.name === '惠舞') {
        return null;
    }

    const styleHint = getStyleHint(char.name, workOutput.type);

    const messages = [
        {
            role: 'system',
            content: '你是专业的AI绘图Prompt工程师，精通Stable Diffusion和Midjourney提示词。根据角色作品信息生成高质量的中英双语描述。严格返回JSON，不含其他文字。'
        },
        {
            role: 'user',
            content: `角色：${char.name}（${char.career}，${char.age}岁）
作品类型：${workOutput.type}
作品描述：${workOutput.description}
完成背景：${action.result ? action.result.slice(0, 80) : ''}
风格参考：${styleHint}

请生成该作品的中英双语描述。返回 JSON：
{
  "description": "中文作品描述（30-50字，从观众视角）",
  "prompt": "英文SD/MJ提示词（60-120词，逗号分隔）",
  "negativePrompt": "负向提示词（20-30词）",
  "style": "1-3个英文风格标签"
}`
        }
    ];

    try {
        return await callDeepseekAPI(messages, true, 400);
    } catch (error) {
        console.warn('文生图prompt生成失败:', error.message);
        return null;
    }
}

// ==================== 夜晚关系结算函数 ====================
async function doNightlyRelationshipReview() {
    addLog('=== 夜晚关系结算开始 ===', 'system');

    if (gameState.dailyInteractions.length === 0) {
        addLog('今日无互动记录，关系值保持不变。', 'system');
        return;
    }

    const interactionSummary = gameState.dailyInteractions.map((item, i) =>
        `${i + 1}. ${item.actor}与${item.with}：${item.action}${item.result ? ' → ' + item.result : ''}`
    ).join('\n');

    const charSummary = Object.values(gameState.characters).map(char =>
        `${char.name}：${Object.entries(char.relationship).map(([id, val]) =>
            `与${gameState.characters[id]?.name || id}: ${val}（${getRelationshipLevel(val)}）`
        ).join(', ')}`
    ).join('\n');

    const reviewPrompt = `今天是第${gameState.dayCount - 1}天，三位角色度过了完整的一天。

【今日互动记录（共${gameState.dailyInteractions.length}条）】
${interactionSummary}

【当前关系值】
${charSummary}

请对每对角色之间今日互动进行综合评估，给出关系值调整。评估维度：互动频率、情感质量、相互理解程度。
调整档次（只能从这五个值中选择）：-2（明显恶化）/ -1（略有疏远）/ 0（无变化）/ +1（略有升温）/ +2（明显升温）

返回 JSON：
{
  "reviews": [
    { "from": "角色名A", "to": "角色名B", "delta": 数字, "reason": "一句话理由" },
    ...
  ]
}
必须覆盖全部六对方向（惠舞→三玖、惠舞→五月、三玖→惠舞、三玖→五月、五月→惠舞、五月→三玖）。严格返回JSON，不含额外文字。`;

    try {
        let result;
        if (gameState.apiKey) {
            result = await callNightlyReviewAI(reviewPrompt);
        } else {
            result = mockNightlyReview();
        }

        if (result && Array.isArray(result.reviews)) {
            for (const review of result.reviews) {
                const fromChar = getCharacterByName(review.from);
                const toId = Object.keys(gameState.characters).find(
                    id => gameState.characters[id].name === review.to
                );
                if (fromChar && toId && fromChar.relationship[toId] !== undefined) {
                    const oldVal = fromChar.relationship[toId];
                    const newVal = Math.max(-100, Math.min(100, oldVal + review.delta));
                    fromChar.relationship[toId] = newVal;
                    const sign = review.delta > 0 ? `+${review.delta}` : `${review.delta}`;
                    addLog(
                        `【结算】${review.from}→${review.to}: ${sign} → ${newVal}（${getRelationshipLevel(newVal)}）${review.reason ? ' | ' + review.reason : ''}`,
                        'interaction'
                    );
                }
            }
        }
    } catch (e) {
        addLog(`夜晚关系结算出错: ${e.message}`, 'error');
    }

    gameState.dailyInteractions = [];
    addLog('=== 夜晚关系结算完成 ===', 'system');
    updateUI();
}

// 检测是否为工作相关行为
function isWorkRelatedAction(action, thought) {
    // 通用工作关键词
    const commonWorkKeywords = [
        '工作', '上班', '编程', '开发', '代码', '会议', '讨论',
        '学习', '研究', '分析', '处理', '完成', '算法',
        '项目', '任务', '文件', '报告', '数据', '创意'
    ];

    // 职业特定的工作关键词
    const jobSpecificKeywords = {
        '插画师': ['画', '绘画', '插画', '设计', '素描', '创作', '手绘', '稿件', '修改'],
        '美食博主': ['烹饪', '做饭', '做菜', '菜谱', '料理', '烘焙', '食谱', '美食', '博主', '拍摄', '视频'],
        'AI算法工程师': ['编程', '开发', '代码', '会议', '算法', '项目']
    };

    // 日常生活关键词（绝对不是工作）
    const dailyLifeKeywords = [
        '洗脸', '刷牙', '洗澡', '洗手', '洗漱', '吃饭', '喝水',
        '睡觉', '走向', '进入', '靠在', '躺', '坐', '站起'
    ];

    let text = (action + thought).toLowerCase();

    // 第1步：去掉比喻内容（"像..."、"如同..."等）
    // 去掉"像...这样"、"像...似的"等
    text = text.replace(/像[^，。，。！！？？]*?([这那]样|似的|的样子)/g, '');
    // 去掉"如同..."结构
    text = text.replace(/如同[^，。，。]*?[，。]/g, '');
    // 去掉"像是..."结构
    text = text.replace(/像是[^，。，。]*?[，。]/g, '');

    // 第2步：检查绝对不是工作的关键词
    if (dailyLifeKeywords.some(keyword => text.includes(keyword))) {
        return false;
    }

    // 第3步：检查通用工作关键词
    if (commonWorkKeywords.some(keyword => text.includes(keyword))) {
        return true;
    }

    // 第4步：检查职业特定关键词
    for (const keywords of Object.values(jobSpecificKeywords)) {
        if (keywords.some(keyword => text.includes(keyword))) {
            return true;
        }
    }

    return false;
}

// 检测是否为休息相关行为
function isRestRelatedAction(action, thought) {
    const restKeywords = [
        '休息', '睡觉', '睡眠', '放松', '休闲', '玩耍', '娱乐',
        '看电影', '玩游戏', '听音乐', '喝咖啡', '午憩', '冥想',
        '冲澡', '洗澡', '洗漱', '涂鸦', '绘画', '看杂志', '零食',
        '逛街', '看新闻', '思考', '沉思', '发呆'
    ];
    const text = (action + thought).toLowerCase();
    return restKeywords.some(keyword => text.includes(keyword));
}

// 检测是否是睡眠相关行为
function isSleepRelatedAction(action, thought) {
    const sleepKeywords = ['睡眠', '睡觉', '上床', '躺在床上', '闭眼', '入睡', '梦', '昏昏欲睡'];
    const text = (action + thought).toLowerCase();
    return sleepKeywords.some(keyword => text.includes(keyword));
}

// 检查是否该睡觉（基于时间和精力）
function shouldSleep(character) {
    const hour = gameState.currentTime.getHours();
    // 晚上10点至早上6点为睡眠窗口
    const isSleepWindow = hour >= 22 || hour < 6;
    // 精力低于50时更容易睡眠，或在睡眠窗口内精力低于70
    const isEnergyLow = character.energy < 50 || (isSleepWindow && character.energy < 70);
    return isSleepWindow && isEnergyLow;
}

// 检查是否有"大动静"在其他房间（判断是否应该惊醒睡眠的角色）
function hasDisturbanceInOtherRooms(sleepingCharRoom) {
    // 如果有人在其他房间进行"大动静"活动，就会惊醒睡眠的角色
    const noisyKeywords = ['尖叫', '大喊', '摔', '碎', '打破', '爆炸', '呕吐', '呻吟', '哭', '大声'];

    // 检查最后一个action中是否有嘈杂行为
    let text = '';
    for (const char of Object.values(gameState.characters)) {
        if (char.currentRoom !== sleepingCharRoom && char.isSleeping === false) {
            text += (char.currentAction || '').toLowerCase();
        }
    }

    return noisyKeywords.some(keyword => text.includes(keyword));
}

// 核心游戏循环
// 核心游戏循环 - 公寓生活模拟
async function gameLoop() {
    if (gameState.isProcessing || gameState.isPaused || gameState.shouldStop) return;

    gameState.isProcessing = true;

    // 更新节假日信息
    const holidayInfo = CalendarPlugin.getHolidayInfo(gameState.currentTime);
    gameState.currentHoliday = holidayInfo;
    gameState.holidayDescription = holidayInfo.isHoliday ? holidayInfo.name : '工作日';

    addLog("模拟器正在生成角色行为...", 'system');

    // 1. 构建当前状态提示词
    const holidayDesc = gameState.holidayDescription;
    const holidayInfoText = holidayDesc !== '工作日' ? `今天是一个特殊的日子：${holidayDesc}` : '今天是普通的工作日';

    // 生成丰富的时间信息
    const timeInfo = generateTimeInfo(gameState.currentTime, gameState.dayCount);

    const actionPrompt = `当前游戏时间：${timeInfo.fullInfo}
${holidayInfoText}

公寓房间状态（必须使用英文 ID 作为移动目标）：
${Object.entries(gameState.apartment.rooms).map(([id, room]) =>
    `- ${id} (${room.name}): ${room.description} (物品: ${room.items.join(', ')})`
).join('\n')}

角色当前状态：
${Object.values(gameState.characters).map(char => `
${char.name} (${char.age}岁, ${char.personality})：
- 当前位置 ID: ${char.currentRoom} (名称: ${gameState.apartment.rooms[char.currentRoom]?.name || '未知'})
- 状态: ${char.status === 'unconscious' ? '晕倒中（无法行动）' : '清醒'}
- 心情: ${char.mood}/100, 精力: ${char.energy}/100, 饱腹: ${char.satiety}/100, 卫生: ${char.hygiene}/100
- 疲劳度: ${Math.round(char.fatigueLevel || 0)}/100 (当日工作: ${Math.round((char.workHoursToday || 0) * 10) / 10}h, 连续工作天数: ${char.consecutiveWorkDays || 0})
- 钱包: ¥${char.wallet}, 职业: ${char.career} (月收入: ¥${char.monthlyIncome})
- 当前行为: ${char.currentAction}
- 与他人关系: ${Object.entries(char.relationship).map(([id, val]) => `与${gameState.characters[id]?.name || id}: ${val}（${getRelationshipLevel(val)}）`).join(', ')}
`).join('\n')}

特殊状况：
${(() => {
    const unconsciousChars = Object.values(gameState.characters).filter(char => char.status === 'unconscious');
    if (unconsciousChars.length === 0) return '无晕倒角色';
    return unconsciousChars.map(char =>
        `${char.name}晕倒在${gameState.apartment.rooms[char.currentRoom]?.name || char.currentRoom}，需要照顾（其他角色可以尝试帮助）`
    ).join('\n');
})()}

请为三位角色生成接下来一段时间（5-120分钟）的日常生活行为。
生成行为时，如果涉及移动到新房间，请在 "new_room" 字段中使用对应的【英文 ID】（例如：想去厨房，new_room 应填写 "kitchen"；如果没有移动，请填写当前所在的【英文 ID】）。
请确保 "new_room" 字段绝不包含中文。

⚠️ **紧急优先级规则**：
- 如果某角色精力 < 10，该角色【必须】立刻去做恢复精力的事情（如卧室休息、看电影、听音乐、喝咖啡等），暂停其他一切计划。这是生理需求，不容商量。
- 精力 10-30 范围：应该优先考虑休息而非工作。
- 精力 > 30：可以正常工作或进行其他活动。

考虑因素：
1. 当前时间段：${timeInfo.hour >= 5 && timeInfo.hour < 12 ? '上午' : timeInfo.hour >= 12 && timeInfo.hour < 17 ? '下午' : timeInfo.hour >= 17 && timeInfo.hour < 21 ? '晚上' : '深夜'}（${timeInfo.hour}点）
2. 星期几影响：${timeInfo.dayOfWeek}${timeInfo.dayOfWeek.includes('六') || timeInfo.dayOfWeek.includes('日') ? '（周末，角色可能有不同安排）' : '（工作日）'}
3. 季节背景：${timeInfo.season}（影响角色的室外活动和衣着）
4. 角色的性格特点
5. 角色的当前状态（心情、精力、饥饿、卫生、状态）
6. 如果角色状态为"晕倒中"，该角色无法行动，其他角色可以照顾或帮助晕倒的角色（例如：将晕倒角色移动到卧室、喂食、陪伴等）
7. 角色之间的互动可能性
8. 房间的可用性和功能
9. 职业工作时段（工作日必须遵守）：
   - 惠舞（AI算法工程师）：上午9-12点、下午14-18点 应优先安排编程/开发工作，除非精力<30或正在吃饭
   - 三玖（插画师）：上午10-13点、下午15-18点 应优先安排绘画/设计创作，除非精力<30
   - 五月（美食博主）：她的职业工作包括【内容选题、脚本写作、食材采购、拍摄、剪辑、发布】，这些都是她的工作，每天需有1-3个工作型action；做饭只在早晨和晚上为合理，中间时段应做博主相关工作
10. 行为连续性规则：
   - 角色上一次行为如果是工作，下一次在工作时段内应继续工作（除非精力<40）
   - 角色上一次行为如果是吃饭，下一次应回到工作或休息，不应再做饭
   - 五月连续两次做饭后，下一次必须安排非烹饪行为
11. 行为类型说明（actionType 必须精确标注）：
   - primary_work = 主要职业工作（惠舞编程、三玖画画、五月拍摄/剪辑/写脚本）
   - secondary_work = 辅助工作（查资料、整理工作台、头脑风暴、构思方案）
   - daily_life = 日常生活（吃饭、做饭、洗漱、购物、打扫）
   - leisure = 休闲娱乐（看电影、听音乐、玩游戏、散步、看书）
   - rest = 休息睡眠（睡觉、小憩、冥想、静坐）
   - social = 社交互动（与他人对话、陪伴、互动、聊天）
12. 角色上一轮行为（用于判断连续性）：
   - 惠舞：${gameState.characters.huiwu.currentAction.slice(0, 40) || '无'}（行为类型：${gameState.characters.huiwu.lastActionType}）
   - 三玖：${gameState.characters.sanjiu.currentAction.slice(0, 40) || '无'}（行为类型：${gameState.characters.sanjiu.lastActionType}）
   - 五月：${gameState.characters.wuyue.currentAction.slice(0, 40) || '无'}（行为类型：${gameState.characters.wuyue.lastActionType}）

请确保行为自然、符合角色性格，并考虑真实的生活逻辑。
特别注意：如果是节假日，角色可能会有特殊的活动安排，比如：
- 周末：可能会睡懒觉、放松、外出购物或娱乐
- 春节：可能会有家庭聚会、准备年夜饭、拜年等活动
- 国庆节/劳动节：可能会有旅游计划、朋友聚会、休息放松
- 其他节假日：根据节日特点安排相应的活动
例如：饿了会去厨房找吃的，困了会去卧室睡觉，脏了会去洗澡等。

严格返回要求的 JSON 格式。`;

    // 在调用 AI 前，先根据属性计算角色的心情值
    updateCharactersMood();

    const decision = await callAI(actionPrompt);

    if (decision && decision.actions && Array.isArray(decision.actions)) {
        // 显示叙事描述
        if (decision.narrative) {
            addLog(`场景: ${decision.narrative}`, 'narrative');
        }

        // 处理每个角色的行为
        for (const action of decision.actions) {
            const char = getCharacterByName(action.character);
            if (!char) continue;

            // 如果角色晕倒，跳过AI生成的行为，保持晕倒状态
            if (char.status === 'unconscious') {
                char.currentAction = '晕倒中（需要照顾）';
                continue; // 跳过这个角色的行为处理，等待其他角色照顾
            }

            // 如果角色正在睡眠，跳过行为处理（由advanceGameTime管理睡眠）
            if (char.isSleeping) {
                char.currentAction = '在熟睡中...';
                continue; // 睡眠期间不执行新action
            }

            // 记录行为
            addLog(`${char.name}的思考: ${action.thought}`, 'thought');
            addLog(`${char.name}的行为: ${action.action}`, 'action');

            // 检测是否进入睡眠行为（需要满足时间和地点条件）
            if (isSleepRelatedAction(action.action, action.thought) &&
                action.new_room && action.new_room.includes('bedroom')) {
                // 检查时间是否在睡眠窗口（22-6点）
                const hour = gameState.currentTime.getHours();
                if (hour >= 22 || hour < 6) {
                    // 标记为进入睡眠状态
                    char.isSleeping = true;
                    char.status = 'sleeping';
                    char.sleepStartTime = gameState.currentTime;
                    char.sleepDuration = 0;
                    char.currentRoom = action.new_room;
                    addLog(`✨ ${char.name}躺下睡觉了（预计睡眠7-11小时）`, 'system');
                    continue;
                }
            }

            // 更新角色位置
            if (action.new_room !== undefined && action.new_room !== null) {
                const fromRoom = char.currentRoom;
                const toRoom = action.new_room;

                // 处理外出（字符串 'outside' 或 null）
                if (toRoom === 'outside') {
                    // 检查是否可以外出（只有客厅可以外出）
                    if (fromRoom === 'livingRoom') {
                        char.currentRoom = 'outside';
                    } else {
                        addLog(`${char.name}无法从${gameState.apartment.rooms[fromRoom]?.name || fromRoom}外出，只能从客厅外出`, 'error');
                    }
                }
                // 处理正常房间移动
                else if (gameState.apartment.rooms[toRoom]) {
                    // 如果目标房间与当前房间相同，直接允许
                    if (fromRoom === toRoom) {
                        char.currentRoom = toRoom;
                    } else if (fromRoom === 'outside') {
                        // 从外面只能进入客厅（保留此逻辑以维持逻辑一致性，除非您也想取消它）
                        if (toRoom === 'livingRoom') {
                            char.currentRoom = toRoom;
                        } else {
                            addLog(`${char.name}试图从外面直接进入${gameState.apartment.rooms[toRoom]?.name || toRoom}，但只能进入客厅`, 'error');
                        }
                    } else {
                        // 公寓内房间之间现在可以直接移动，不再检查 connections
                        char.currentRoom = toRoom;
                    }
                } else {
                    // 无效的房间ID
                    addLog(`${char.name}试图移动到无效的房间"${action.new_room}"，位置未更新`, 'error');
                }
            } else if (action.new_room === null) {
                // 角色外出（兼容旧版本，使用null表示外出）
                const fromRoom = char.currentRoom;
                if (fromRoom === 'livingRoom') {
                    char.currentRoom = 'outside';
                } else {
                    addLog(`${char.name}无法从${gameState.apartment.rooms[fromRoom]?.name || fromRoom}外出，只能从客厅外出`, 'error');
                }
            }
            // 如果action.new_room是undefined，不更新位置

            // 更新角色状态
            if (action.stat_changes) {
                char.mood = Math.max(0, Math.min(100, char.mood + (action.stat_changes.mood || 0)));
                char.energy = Math.max(0, Math.min(100, char.energy + (action.stat_changes.energy || 0)));
                char.satiety = Math.max(0, Math.min(100, char.satiety + (action.stat_changes.satiety || 0)));
                char.hygiene = Math.max(0, Math.min(100, char.hygiene + (action.stat_changes.hygiene || 0)));
                char.wallet = Math.max(0, char.wallet + (action.stat_changes.wallet || 0));
            }

            // 追踪工作小时数（基于实际游戏时间流逝）
            const actionType = action.actionType || null;
            const isWorkAction = actionType
                ? (actionType === 'primary_work' || actionType === 'secondary_work')
                : isWorkRelatedAction(action.action, action.thought);

            if (isWorkAction) {
                // 计算自上次工作检查以来实际流逝的游戏时间（分钟）
                // 确保两个时间都是Date对象
                const currentTime = gameState.currentTime instanceof Date ? gameState.currentTime : new Date(gameState.currentTime);
                const lastCheckTime = char.lastWorkCheckTime instanceof Date ? char.lastWorkCheckTime : new Date(char.lastWorkCheckTime);

                const timeSinceLastCheck = (currentTime - lastCheckTime) / (1000 * 60);
                if (timeSinceLastCheck > 0) {
                    const workHours = timeSinceLastCheck / 60;
                    char.workHoursToday = (char.workHoursToday || 0) + workHours;
                    addLog(`${char.name}工作了${Math.round(timeSinceLastCheck * 10) / 10}分钟（当日累计: ${Math.round(char.workHoursToday * 10) / 10}h）`, 'system');
                }
            }
            // 更新上次工作检查时间（无论是否工作，都更新到当前时刻）
            char.lastWorkCheckTime = gameState.currentTime instanceof Date ? new Date(gameState.currentTime) : new Date(gameState.currentTime);

            // 追踪休息时间
            const isRestAction = isRestRelatedAction(action.action, action.thought);
            if (isRestAction) {
                char.lastRestTime = gameState.currentTime;
            }

            // 更新当前行为
            char.currentAction = action.action;

            // 追踪行为历史
            if (!char.actionHistory) char.actionHistory = [];
            const shortAction = action.action.slice(0, 40);
            char.actionHistory.unshift(shortAction);
            if (char.actionHistory.length > 3) char.actionHistory.pop();

            // 更新行为类型
            // 优先用 actionType；无则用旧逻辑兜底
            if (actionType) {
                char.lastActionType = actionType;  // 直接存6态值
            } else {
                const isWork = isWorkRelatedAction(action.action, action.thought);
                const isEat = (action.stat_changes?.satiety || 0) > 5;
                const isHygiene = action.new_room === 'bathroom' || action.new_room === 'bathRoom';
                char.lastActionType = isWork ? 'work' : isEat ? 'eat' : isHygiene ? 'hygiene' : 'rest';
            }

            // 记录结果
            if (action.result) {
                addLog(`${char.name}的行为结果: ${action.result}`, 'result');
            }

            // 检测作品完成，触发文生图命令词生成（fire-and-forget）
            const workOutput = action.workOutput || null;
            if (workOutput && (char.name === '三玖' || char.name === '五月')) {
                const now = Date.now();
                if (now - (gameState.lastArtworkPromptTime || 0) > 5000) {  // 5秒节流
                    gameState.lastArtworkPromptTime = now;
                    generateArtworkImagePrompt(char, workOutput, action).then(promptResult => {
                        if (promptResult) {
                            const title = workOutput.title ? `《${workOutput.title}》` : '';
                            addLog(`✦ ${char.name} 完成了新作品 ${title}`, 'artwork');
                            if (promptResult.description) {
                                addLog(`  ${promptResult.description}`, 'artwork');
                            }
                            addLog(`[SD Prompt] ${promptResult.prompt}`, 'artwork-prompt');
                            if (promptResult.negativePrompt) {
                                addLog(`[Negative] ${promptResult.negativePrompt}`, 'artwork-prompt');
                            }
                            ui.logSection.scrollTop = ui.logSection.scrollHeight;
                        }
                    }).catch(() => {});  // 静默失败，不影响主循环
                }
            }

            // 记录互动（累积到当天记录，供夜晚统一结算）
            if (action.interaction_with) {
                addLog(`${char.name}与${action.interaction_with}进行了互动`, 'interaction');
                gameState.dailyInteractions.push({
                    actor: char.name,
                    with: action.interaction_with,
                    thought: action.thought || '',
                    action: action.action || '',
                    result: action.result || ''
                });

                // 如果清醒角色在照顾晕倒的角色，将晕倒的角色移动到照顾者所在的房间
                const targetChars = action.interaction_with.split('、').map(name => name.trim());
                for (const targetName of targetChars) {
                    const targetChar = getCharacterByName(targetName);
                    if (targetChar && targetChar.status === 'unconscious' && action.new_room) {
                        // 只有当照顾者移动到新房间时，才移动晕倒的角色
                        targetChar.currentRoom = action.new_room;
                        addLog(`${char.name}将晕倒的${targetName}移动到${gameState.apartment.rooms[action.new_room]?.name || action.new_room}`, 'system');
                    }
                }
            }
        }

        // 更新时间
        let dayChanged = false;
        if (decision.time_passed && decision.time_passed > 0) {
            dayChanged = advanceGameTime(decision.time_passed);
        } else {
            // 默认前进30分钟
            dayChanged = advanceGameTime(30);
        }

        // 晕倒角色的卧室恢复加速（如果被照顾者移动到了卧室）
        for (const char of Object.values(gameState.characters)) {
            if (char.status === 'unconscious' && char.currentRoom.includes('bedroom')) {
                // 在卧室的晕倒角色额外恢复精力（快速恢复）
                char.energy = Math.min(100, char.energy + 10);
                // 如果精力恢复到50以上，自动清醒
                if (char.energy >= 50) {
                    char.status = 'awake';
                    char.currentAction = '刚刚从昏迷中清醒';
                    addLog(`${char.name}在${gameState.apartment.rooms[char.currentRoom]?.name}中逐渐清醒过来`, 'system');
                }
            }
        }

        // 新一天开始前：夜晚关系结算
        if (dayChanged) {
            await doNightlyRelationshipReview();
        }

        // 检查是否需要支付工资（每月1号）
        if (gameState.currentTime.getDate() === 1 && gameState.lastActionTime &&
            gameState.lastActionTime.getDate() !== 1) {
            payMonthlySalaries();
        }

        gameState.lastActionTime = new Date(gameState.currentTime);
    } else {
        addLog("AI 返回了无效的响应格式", 'error');
        // 默认前进30分钟
        advanceGameTime(30);
    }

    gameState.isProcessing = false;
    updateUI();

    // 根据时间倍率设置下一次循环
    if (!gameState.shouldStop && !gameState.isPaused) {
        if (gameState.loopTimeoutId) {
            clearTimeout(gameState.loopTimeoutId);
        }

        // 计算下次循环时间（真实时间）
        // 默认每分钟执行一次循环，模拟时间流逝由AI决定
        const realTimeInterval = 60000 / gameState.timeMultiplier;
        gameState.loopTimeoutId = setTimeout(gameLoop, realTimeInterval);
    }
}

// 根据名称获取角色
function getCharacterByName(name) {
    for (const [charId, char] of Object.entries(gameState.characters)) {
        if (char.name === name) {
            return char;
        }
    }
    return null;
}

// 推进游戏时间，返回是否跨越了新的一天
function advanceGameTime(minutes) {
    const oldTime = gameState.currentTime;
    const newTime = new Date(oldTime.getTime() + minutes * 60000);
    gameState.currentTime = newTime;

    let dayChanged = false;
    // 检查是否过了一天
    if (newTime.getDate() !== oldTime.getDate()) {
        gameState.dayCount++;
        dayChanged = true;
        addLog(`>>> 新的一天开始了！现在是第${gameState.dayCount}天 <<<`, 'system');

        // 每天重置：累计工作小时数清零，处理连续工作天数
        for (const char of Object.values(gameState.characters)) {
            // 检查昨天是否充分休息（休息小时 >= 8小时）
            const restHours = 24 - (char.workHoursToday || 0);
            if (restHours < 8 && char.workHoursToday > 0) {
                // 没有充分休息，连续工作天数+1
                char.consecutiveWorkDays = (char.consecutiveWorkDays || 0) + 1;
            } else {
                // 充分休息，重置连续工作天数
                char.consecutiveWorkDays = 0;
            }

            // 重置今天的工作小时数
            char.workHoursToday = 0;
            char.lastRestTime = newTime;
        }
    }

    // 分时段精力消耗/恢复
    const hoursPassed = minutes / 60;
    const hour = newTime.getHours();
    for (const char of Object.values(gameState.characters)) {
        // 更新疲劳等级（基于连续工作天数和今天工作时长）
        char.fatigueLevel = Math.min(100,
            (char.consecutiveWorkDays || 0) * 15 + (char.workHoursToday || 0) * 3
        );

        // ==================== 睡眠管理系统 ====================
        if (char.isSleeping) {
            // 角色正在睡眠中
            char.sleepDuration = (char.sleepDuration || 0) + minutes;

            // 检查是否被惊醒（其他房间有大动静）
            if (hasDisturbanceInOtherRooms(char.currentRoom)) {
                // 生成被惊醒日志
                const disturbedRoom = Object.values(gameState.characters).find(c =>
                    c.currentRoom !== char.currentRoom && c.isSleeping === false
                );
                if (disturbedRoom) {
                    addLog(`${char.name}被${disturbedRoom.name}在${gameState.apartment.rooms[disturbedRoom.currentRoom]?.name}的动静惊醒了`, 'system');
                }
                char.isSleeping = false;
                char.status = 'awake';
                char.currentAction = '被惊醒了';
                char.lastDisturbance = newTime;
            }
            // 检查睡眠时长是否超过上限（11小时 = 660分钟）
            else if (char.sleepDuration >= 660) {
                addLog(`${char.name}睡饱了，自然醒来`, 'system');
                char.isSleeping = false;
                char.status = 'awake';
                char.currentAction = '睡醒了';
                char.sleepStartTime = null;
                char.sleepDuration = 0;
            }
            // 睡眠时每小时恢复精力（更快的恢复速度）
            else {
                char.energy = Math.min(100, char.energy + Math.floor(hoursPassed * 25)); // 睡眠恢复25点/小时
                // 继续睡眠，每小时最多睡7-11小时
            }
        } else if (char.status === 'awake' && char.isSleeping === false) {
            // 角色清醒中，检查是否应该入睡
            // 只有在卧室才能进入睡眠状态
            if (char.currentRoom.includes('bedroom') && isSleepRelatedAction(char.currentAction, '')) {
                // 如果精力够高（>90）且晚上10-6点时间窗口，不自动进入睡眠，需要AI主动生成睡眠action
                if (shouldSleep(char)) {
                    // 标记为睡眠状态
                    char.isSleeping = true;
                    char.status = 'sleeping';
                    char.sleepStartTime = newTime;
                    char.sleepDuration = 0;
                    addLog(`${char.name}进入了梦乡`, 'system');
                }
            }
        }

        // 检测同房间是否有其他清醒角色
        const othersInRoom = Object.values(gameState.characters).filter(c =>
            c.name !== char.name && c.currentRoom === char.currentRoom && c.status === 'awake' && !c.isSleeping
        );
        const hasCompanyInRoom = othersInRoom.length > 0;

        // 跳过已睡眠角色的能量计算
        if (char.isSleeping) continue;

        if (char.currentRoom.includes('bedroom')) {
            // 疲劳高时恢复速度稍慢
            const fatigueMultiplier = 1 - (char.fatigueLevel || 0) / 500;
            // 有同伴时恢复加速20%（陪伴带来心理舒适）
            const companionBonus = hasCompanyInRoom ? 1.2 : 1.0;
            char.energy = Math.min(100, char.energy + Math.floor(hoursPassed * 20 * fatigueMultiplier * companionBonus));
        } else if (char.currentRoom === 'bathroom' || char.currentRoom === 'bathRoom') {
            // 在浴室洗漱也能小幅恢复（每小时恢复8点）
            char.energy = Math.min(100, char.energy + Math.floor(hoursPassed * 8));
        } else {
            // 其他房间：缓慢恢复（每小时1点基础恢复）+ 有陪伴时加速
            let passiveRecovery = 1; // 基础被动恢复
            if (hasCompanyInRoom) {
                passiveRecovery = 3; // 有陪伴时恢复加快到3点/小时
            }

            // 清醒状态根据时段消耗精力（大幅降低消耗）
            let energyRate;
            if (hour >= 0 && hour < 5) {
                // 0-5点：深夜，消耗较少（每小时3点）
                energyRate = 6;
            } else if (hour >= 5 && hour < 20) {
                // 5-20点：白天正常活动（每小时2点）
                energyRate = 2;
            } else {
                // 20-24点：晚上，消耗稍多（每小时3点）
                energyRate = 4;
            }

            // 疲劳高时能量消耗增加，但被动恢复抵消部分消耗
            const fatigueMultiplier = 1 + (char.fatigueLevel || 0) / 300;
            const netEnergyChange = -(hoursPassed * energyRate * fatigueMultiplier) + (hoursPassed * passiveRecovery);
            char.energy = Math.max(0, char.energy + Math.floor(netEnergyChange));
        }

        // 随时间降低饱腹值（每小时减少2点）
        char.satiety = Math.max(0, char.satiety - Math.floor(hoursPassed * 2));

        // 随时间降低卫生度（每小时降低3点）
        char.hygiene = Math.max(0, char.hygiene - Math.floor(hoursPassed * 3));

        // 高疲劳时心情也会下降
        if ((char.fatigueLevel || 0) > 70) {
            char.mood = Math.max(0, char.mood - Math.floor(hoursPassed * 1));
        }

        // 检查晕倒/恢复状态（睡眠状态不检查晕倒）
        if (!char.isSleeping) {
            if (char.energy <= 0 && char.status !== 'unconscious') {
                // 精力耗尽，角色晕倒
                char.status = 'unconscious';
                char.currentAction = '晕倒中';
                addLog(`${char.name}精力耗尽晕倒了（位置: ${gameState.apartment.rooms[char.currentRoom]?.name || char.currentRoom}，疲劳度: ${char.fatigueLevel}/100）`, 'warning');
            } else if (char.status === 'unconscious' && char.energy >= 30) {
                // 精力部分恢复，角色清醒（从40改为30，更容易脱离晕倒，因为消耗已大幅降低）
                char.status = 'awake';
                char.currentAction = '刚刚恢复清醒';
                addLog(`${char.name}精力恢复，从晕倒中清醒过来`, 'system');
            }
        }
    }

    return dayChanged;
}

// 支付月薪
function payMonthlySalaries() {
    for (const char of Object.values(gameState.characters)) {
        char.wallet += char.monthlyIncome;
        addLog(`${char.name}收到了本月工资 ¥${char.monthlyIncome}，当前余额: ¥${char.wallet}`, 'system');
    }
}

// 生成新地图

// 重置游戏
function resetGame() {
    // 停止当前游戏循环
    gameState.shouldStop = true;

    // 清除所有超时
    if (gameState.loopTimeoutId) {
        clearTimeout(gameState.loopTimeoutId);
        gameState.loopTimeoutId = null;
    }
    if (gameState.actionTimeoutId) {
        clearInterval(gameState.actionTimeoutId);
        gameState.actionTimeoutId = null;
    }
    if (gameState.actionResolve) {
        gameState.actionResolve();
        gameState.actionResolve = null;
    }

    // 重置游戏状态（保留 apiKey）
    const savedApiKey = gameState.apiKey;

    // 完全重置 gameState - 公寓生活模拟器版本
    gameState.startTime = new Date('2025-03-04T08:00:00');
    gameState.currentTime = new Date('2025-03-04T08:00:00');
    gameState.timeMultiplier = 1;
    gameState.dayCount = 1;
    gameState.lastActionTime = null;

    // 重置节假日信息
    const holidayInfo = CalendarPlugin.isHoliday(gameState.currentTime);
    gameState.currentHoliday = holidayInfo;
    gameState.holidayDescription = holidayInfo.isHoliday ? holidayInfo.name : '工作日';

    // 重置角色状态
    gameState.characters.huiwu.mood = 80;
    gameState.characters.huiwu.energy = 90;
    gameState.characters.huiwu.satiety = 70;
    gameState.characters.huiwu.hygiene = 85;
    gameState.characters.huiwu.wallet = 5000;
    gameState.characters.huiwu.currentRoom = "livingRoom";
    gameState.characters.huiwu.currentAction = "无";
    gameState.characters.huiwu.status = "awake";
    gameState.characters.huiwu.workHoursToday = 0;
    gameState.characters.huiwu.consecutiveWorkDays = 0;
    gameState.characters.huiwu.fatigueLevel = 0;
    gameState.characters.huiwu.isSleeping = false;
    gameState.characters.huiwu.sleepStartTime = null;
    gameState.characters.huiwu.sleepDuration = 0;

    gameState.characters.sanjiu.mood = 70;
    gameState.characters.sanjiu.energy = 85;
    gameState.characters.sanjiu.satiety = 60;
    gameState.characters.sanjiu.hygiene = 90;
    gameState.characters.sanjiu.wallet = 4000;
    gameState.characters.sanjiu.currentRoom = "livingRoom";
    gameState.characters.sanjiu.currentAction = "无";
    gameState.characters.sanjiu.status = "awake";
    gameState.characters.sanjiu.workHoursToday = 0;
    gameState.characters.sanjiu.consecutiveWorkDays = 0;
    gameState.characters.sanjiu.fatigueLevel = 0;
    gameState.characters.sanjiu.isSleeping = false;
    gameState.characters.sanjiu.sleepStartTime = null;
    gameState.characters.sanjiu.sleepDuration = 0;

    gameState.characters.wuyue.mood = 85;
    gameState.characters.wuyue.energy = 95;
    gameState.characters.wuyue.satiety = 40;
    gameState.characters.wuyue.hygiene = 75;
    gameState.characters.wuyue.wallet = 3000;
    gameState.characters.wuyue.currentRoom = "livingRoom";
    gameState.characters.wuyue.currentAction = "无";
    gameState.characters.wuyue.status = "awake";
    gameState.characters.wuyue.workHoursToday = 0;
    gameState.characters.wuyue.consecutiveWorkDays = 0;
    gameState.characters.wuyue.fatigueLevel = 0;
    gameState.characters.wuyue.isSleeping = false;
    gameState.characters.wuyue.sleepStartTime = null;
    gameState.characters.wuyue.sleepDuration = 0;

    // 重置关系值
    gameState.characters.huiwu.relationship.sanjiu = 60;
    gameState.characters.huiwu.relationship.wuyue = 70;
    gameState.characters.sanjiu.relationship.huiwu = 60;
    gameState.characters.sanjiu.relationship.wuyue = 75;
    gameState.characters.wuyue.relationship.huiwu = 70;
    gameState.characters.wuyue.relationship.sanjiu = 75;

    // 重置控制状态
    gameState.isProcessing = false;
    gameState.isPaused = false;
    gameState.shouldStop = false;
    gameState.loopTimeoutId = null;
    gameState.actionTimeoutId = null;
    gameState.actionResolve = null;
    gameState.dailyInteractions = [];
    gameState.apiKey = savedApiKey;

    // 清空游戏日志
    ui.gameLog.innerHTML = '';

    // 重置 UI 按钮状态
    ui.startBtn.innerText = "重置模拟"; // 保持重置按钮文本
    ui.startBtn.disabled = false; // 确保按钮可用
    ui.apiKeyInput.disabled = true; // 保持 API Key 输入框禁用
    ui.pauseBtn.disabled = false; // 暂停按钮可用
    ui.pauseBtn.innerText = "暂停模拟"; // 重置暂停按钮文本

    // 添加重置日志
    addLog("模拟器已重置。正在重新启动公寓生活模拟...", 'system');

    // 更新 UI 显示重置后的状态
    updateUI();

    // 重新开始游戏循环
    gameLoop();
}

// 初始化
ui.startBtn.addEventListener('click', () => {
    if (ui.startBtn.innerText === "开始模拟") {
        // 启动游戏
        gameState.apiKey = ui.apiKeyInput.value;
        if (!gameState.apiKey) {
            addLog("未提供 API Key，启动模拟演示模式 (Mock Mode)", 'warning');
        } else {
            addLog("API Key 已锁定，连接 DeepSeek 神经网络...", 'system');
        }

        ui.startBtn.innerText = "重置模拟";
        ui.startBtn.disabled = false;
        ui.apiKeyInput.disabled = true;
        ui.pauseBtn.disabled = false;

        updateUI();
        gameLoop();
    } else if (ui.startBtn.innerText === "重置模拟") {
        // 重置游戏
        resetGame();
    }
});

ui.pauseBtn.addEventListener('click', () => {
    console.log('Pause button clicked, current isPaused:', gameState.isPaused);
    gameState.isPaused = !gameState.isPaused;
    if (gameState.isPaused) {
        // 暂停时清除所有正在执行的动作和循环
        if (gameState.loopTimeoutId) {
            clearTimeout(gameState.loopTimeoutId);
            gameState.loopTimeoutId = null;
        }
        if (gameState.actionTimeoutId) {
            clearInterval(gameState.actionTimeoutId);
            gameState.actionTimeoutId = null;
        }
        if (gameState.actionResolve) {
            gameState.actionResolve();
            gameState.actionResolve = null;
        }
        // 确保 isProcessing 被重置，以便恢复时可以重新开始
        gameState.isProcessing = false;
        ui.pauseBtn.innerText = "继续模拟";
        addLog("模拟已暂停。", 'warning');
    } else {
        ui.pauseBtn.innerText = "暂停模拟";
        addLog("模拟继续运行...", 'system');
        // 只有在当前没有正在处理的循环时才启动
        if (!gameState.isProcessing) {
            gameLoop();
        }
    }
});

// 时间控制按钮事件监听器
if (ui.speed1x) {
    ui.speed1x.addEventListener('click', () => {
        gameState.timeMultiplier = 1;
        updateUI();
        addLog("时间流逝速度设置为 1x (真实时间)", 'system');
    });
}

if (ui.speed2x) {
    ui.speed2x.addEventListener('click', () => {
        gameState.timeMultiplier = 2;
        updateUI();
        addLog("时间流逝速度设置为 2x", 'system');
    });
}

if (ui.speed5x) {
    ui.speed5x.addEventListener('click', () => {
        gameState.timeMultiplier = 5;
        updateUI();
        addLog("时间流逝速度设置为 5x", 'system');
    });
}

if (ui.speed10x) {
    ui.speed10x.addEventListener('click', () => {
        gameState.timeMultiplier = 10;
        updateUI();
        addLog("时间流逝速度设置为 10x", 'system');
    });
}

// --- 存档功能实现 ---

// 刷新存档 UI 显示
function refreshSaveUI() {
    for (let i = 0; i < 3; i++) {
        const saveData = localStorage.getItem(`apartment_sim_save_${i + 1}`);
        if (saveData) {
            try {
                const parsed = JSON.parse(saveData);
                ui.saveTimes[i].innerText = parsed.saveTimestamp || "未知时间";
                ui.loadBtns[i].disabled = false;
            } catch (e) {
                ui.saveTimes[i].innerText = "存档损坏";
                ui.loadBtns[i].disabled = true;
            }
        } else {
            ui.saveTimes[i].innerText = "无";
            ui.loadBtns[i].disabled = true;
        }
    }
}

// 保存游戏
function saveGame(slotIndex) {
    const saveData = {
        gameState: {
            startTime: gameState.startTime,
            currentTime: gameState.currentTime,
            timeMultiplier: gameState.timeMultiplier,
            dayCount: gameState.dayCount,
            characters: gameState.characters,
            apartment: gameState.apartment, // 虽然目前是静态的，但也存一下以防未来有变动
            lastActionTime: gameState.lastActionTime
        },
        saveTimestamp: formatGameTime(new Date()) // 使用现实时间作为存档名
    };

    localStorage.setItem(`apartment_sim_save_${slotIndex + 1}`, JSON.stringify(saveData));
    addLog(`游戏已保存到存档位 ${slotIndex + 1}`, 'system');
    refreshSaveUI();
}

// 读取游戏
function loadGame(slotIndex) {
    const rawData = localStorage.getItem(`apartment_sim_save_${slotIndex + 1}`);
    if (!rawData) return;

    try {
        const data = JSON.parse(rawData);
        const loadedState = data.gameState;

        // 停止当前所有逻辑
        if (gameState.loopTimeoutId) clearTimeout(gameState.loopTimeoutId);
        if (gameState.actionTimeoutId) clearInterval(gameState.actionTimeoutId);

        // 还原状态 (Date 对象需要特殊处理，因为 JSON 不支持 Date 类型)
        gameState.startTime = new Date(loadedState.startTime);
        gameState.currentTime = new Date(loadedState.currentTime);
        gameState.timeMultiplier = loadedState.timeMultiplier;
        gameState.dayCount = loadedState.dayCount;
        gameState.characters = loadedState.characters;
        // 确保角色有状态字段（兼容旧存档）
        for (const char of Object.values(gameState.characters)) {
            if (char.status === undefined) {
                char.status = "awake"; // 默认值
            }
            // 根据精力值检查是否需要设置为晕倒
            if (char.energy <= 0) {
                char.status = "unconscious";
                char.currentAction = "晕倒中";
            } else if (char.status === "unconscious" && char.energy >= 30) {
                char.status = "awake";
            }
        }
        if (loadedState.apartment) gameState.apartment = loadedState.apartment;
        gameState.lastActionTime = loadedState.lastActionTime ? new Date(loadedState.lastActionTime) : null;

        // 确保 UI 按钮状态正确
        if (gameState.apiKey) {
            ui.startBtn.innerText = "重置模拟";
            ui.apiKeyInput.disabled = true;
            ui.pauseBtn.disabled = false;
        }

        // 恢复后暂时处于暂停状态，让用户手动开始或自动开始
        gameState.isPaused = true;
        gameState.isProcessing = false;
        ui.pauseBtn.innerText = "继续模拟";

        addLog(`已读取存档位 ${slotIndex + 1} (${data.saveTimestamp})`, 'system');
        updateUI();
    } catch (e) {
        console.error("读取存档失败:", e);
        addLog("存档读取失败，文件可能已损坏。", 'error');
    }
}

// 导出所有存档为文件
function exportAllSaves() {
    const allSaves = {};
    for (let i = 1; i <= 3; i++) {
        const key = `apartment_sim_save_${i}`;
        const data = localStorage.getItem(key);
        if (data) {
            allSaves[key] = data;
        }
    }

    if (Object.keys(allSaves).length === 0) {
        alert("没有可导出的存档。");
        return;
    }

    const blob = new Blob([JSON.stringify(allSaves, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

    a.href = url;
    a.download = `apartment_sim_saves_${timestamp}.json`;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);

    addLog("存档已导出为 JSON 文件。", 'system');
}

// 从文件导入存档
function importSaves(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            let count = 0;

            // 简单校验并写入 localStorage
            for (const key in importedData) {
                if (key.startsWith('apartment_sim_save_')) {
                    localStorage.setItem(key, importedData[key]);
                    count++;
                }
            }

            if (count > 0) {
                addLog(`成功导入 ${count} 个存档位。`, 'system');
                refreshSaveUI();
            } else {
                addLog("导入失败：文件中未发现有效的存档数据。", 'error');
            }
        } catch (err) {
            console.error("导入存档失败:", err);
            addLog("导入失败：文件格式错误或已损坏。", 'error');
        }
        // 清空输入框以便下次选择同一文件
        ui.importInput.value = '';
    };
    reader.readAsText(file);
}

// 绑定存档按钮事件
ui.saveBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => saveGame(index));
});

ui.loadBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => loadGame(index));
});

// 绑定导出/导入事件
if (ui.exportBtn) {
    ui.exportBtn.addEventListener('click', exportAllSaves);
}

if (ui.importBtn && ui.importInput) {
    ui.importBtn.addEventListener('click', () => ui.importInput.click());
    ui.importInput.addEventListener('change', importSaves);
}

// 初始化刷新存档显示
refreshSaveUI();

addLog("公寓生活模拟器就绪。请配置 API Key 后开始模拟。");
updateUI();
