
// ===== 动态配置系统：GAME_CONFIG 和 GAME_PRESETS =====

// 深度克隆工具函数（用于预设拷贝）
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (obj instanceof Object) {
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = deepClone(obj[key]);
            }
        }
        return cloned;
    }
}

function escapeAttr(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// 主游戏配置对象
const GAME_CONFIG = {
    version: "2.0",
    worldSetting: "",
    sceneName: "公寓",
    npcs: [],
    characters: [
        {
            id: "huiwu",  // 保留原ID以维持代码兼容性
            name: "惠舞",
            color: "#00d4ff",
            gender: "male",
            age: 22,
            personality: "榆木脑袋的顶尖学霸，非常认真负责，会主动找人聊天，空闲时看新闻",
            career: "AI算法工程师",
            monthlyIncome: 15000,
            careerPrompt: "工作日上午9-12点和下午14-18点为明确工作时段。工作中应该展示专业和认真的态度。",
            skills: ["编程", "数学", "逻辑分析", "阅读"],
            initialStats: {
                mood: 80,
                energy: 90,
                satiety: 70,
                hygiene: 85,
                wallet: 5000
            },
            initialRelationships: {
                "sanjiu": 20,
                "wuyue": 20
            },
            bedroomId: "bedroom1"
        },
        {
            id: "sanjiu",
            name: "三玖",
            color: "#ff79c6",
            gender: "female",
            age: 21,
            personality: "沉默寡言，不擅长表达感情，内向但也不介意别人的好意，空闲时看电影，空闲时听歌",
            career: "插画师",
            monthlyIncome: 8000,
            careerPrompt: "创意工作者，工作没有固定时段，主要通过作品输出来体现。",
            skills: ["绘画", "设计", "阅读"],
            initialStats: {
                mood: 70,
                energy: 85,
                satiety: 60,
                hygiene: 90,
                wallet: 4000
            },
            initialRelationships: {
                "huiwu": 20,
                "wuyue": 30
            },
            bedroomId: "bedroom2"
        },
        {
            id: "wuyue",
            name: "五月",
            color: "#ffb86c",
            gender: "female",
            age: 21,
            personality: "努力认真，不擅长撒谎，空闲时喜欢吃东西，有当老师的梦想，会主动找人聊天，爱分享趣事，空闲时看时尚杂志",
            career: "美食博主",
            monthlyIncome: 10000,
            careerPrompt: "需要定期产出内容。通常会在厨房进行美食制作或拍摄。",
            skills: ["烹饪", "摄影", "视频编辑"],
            initialStats: {
                mood: 85,
                energy: 95,
                satiety: 40,
                hygiene: 75,
                wallet: 3000
            },
            initialRelationships: {
                "huiwu": 20,
                "sanjiu": 30
            },
            bedroomId: "bedroom3"
        }
    ],
    rooms: [
        {
            id: "livingRoom",
            name: "客厅",
            description: "宽敞明亮的客厅，有沙发、电视和茶几。",
            items: ["沙发", "电视", "茶几", "空调"],
            isHub: true
        },
        {
            id: "kitchen",
            name: "厨房",
            description: "设备齐全的厨房，有冰箱、灶台和厨具。",
            items: ["冰箱", "灶台", "微波炉", "电饭煲", "厨具套装"],
            isHub: false
        },
        {
            id: "bathroom",
            name: "卫生间",
            description: "干净的卫生间，有马桶和洗手台。",
            items: ["马桶", "洗手台", "镜子", "卫生纸"],
            isHub: false
        },
        {
            id: "bathRoom",
            name: "浴室",
            description: "独立的浴室，有淋浴设备和热水器。",
            items: ["淋浴设备", "热水器", "浴巾", "洗漱用品"],
            isHub: false
        },
        {
            id: "studyRoom",
            name: "书房",
            description: "安静的书房，有书桌、书架和电脑。",
            items: ["书桌", "书架", "台式电脑", "办公椅"],
            isHub: false
        },
        {
            id: "bedroom1",
            name: "惠舞的卧室",
            description: "惠舞的卧室，整洁简单，书桌上堆满了专业书籍。",
            items: ["单人床", "书桌", "衣柜", "台灯"],
            isBedroom: true,
            ownerCharId: "huiwu"
        },
        {
            id: "bedroom2",
            name: "三玖的卧室",
            description: "三玖的卧室，布置简约，有淡淡的清香。",
            items: ["单人床", "梳妆台", "衣柜", "小沙发"],
            isBedroom: true,
            ownerCharId: "sanjiu"
        },
        {
            id: "bedroom3",
            name: "五月的卧室",
            description: "五月的卧室，稍微有些杂乱，零食包装袋随处可见。",
            items: ["单人床", "书桌", "衣柜", "零食箱"],
            isBedroom: true,
            ownerCharId: "wuyue"
        }
    ],
    sharedItems: ["Wi-Fi路由器", "洗衣机", "烘干机", "吸尘器"],
    startTime: "2025-03-04T08:00:00"
};

// 游戏预设库
const GAME_PRESETS = {
    "default_threegirls": {
        id: "default_threegirls",
        label: "默认：惠舞/三玖/五月",
        description: "三室一厅公寓，三位性格各异的室友",
        config: deepClone(GAME_CONFIG)
    },
    "blank": {
        id: "blank",
        label: "空白配置",
        description: "从零开始自定义角色和房间",
        config: {
            version: "2.0",
            worldSetting: "",
            sceneName: "公寓",
            npcs: [],
            characters: [],
            rooms: [
                {
                    id: "livingRoom",
                    name: "客厅",
                    description: "公共生活区",
                    items: [],
                    isHub: true
                }
            ],
            sharedItems: [],
            startTime: "2025-03-04T08:00:00"
        }
    }
};

// 当前活跃配置（游戏运行时使用）
let activeConfig = deepClone(GAME_PRESETS["default_threegirls"].config);

// ===== 动态初始化函数 =====

// 根据房间配置动态生成房间连接关系
function buildRoomConnections(rooms) {
    const connections = {};
    const hubRooms = rooms.filter(r => r.isHub).map(r => r.id);

    for (const room of rooms) {
        if (room.isHub) {
            // Hub房间连接所有其他房间 + outside
            connections[room.id] = rooms
                .filter(r => r.id !== room.id)
                .map(r => r.id)
                .concat(["outside"]);
        } else {
            // 非Hub房间只连接Hub房间
            connections[room.id] = [...hubRooms];
        }
    }
    connections["outside"] = [...hubRooms];
    return connections;
}

// 从 activeConfig 动态初始化 gameState
function initGameStateFromConfig(config) {
    // 构建 characters 对象（以 char.id 为键）
    const characters = {};
    for (const charConfig of config.characters) {
        characters[charConfig.id] = {
            // 从 config 读取的静态属性
            name: charConfig.name,
            color: charConfig.color,
            gender: charConfig.gender,
            age: charConfig.age,
            personality: charConfig.personality,
            career: charConfig.career,
            monthlyIncome: charConfig.monthlyIncome,
            careerPrompt: charConfig.careerPrompt,
            skills: [...charConfig.skills],
            bedroomId: charConfig.bedroomId,

            // 从 initialStats 读取的可变属性
            ...deepClone(charConfig.initialStats),

            // 运行时字段（固定初始值）
            currentRoom: "livingRoom",
            currentAction: "无",
            status: "awake",
            sleepStartTime: null,
            sleepDuration: 0,
            isSleeping: false,
            lastDisturbance: null,
            targetSleepDuration: null,
            workHoursToday: 0,
            consecutiveWorkDays: 0,
            fatigueLevel: 0,
            lastRestTime: new Date(config.startTime),
            lastWorkCheckTime: new Date(config.startTime),
            actionHistory: [],
            lastActionType: 'rest',
            artworks: [],
            inventory: deepClone(charConfig.initialInventory || []),

            // 关系值（克隆 initialRelationships）
            relationship: deepClone(charConfig.initialRelationships)
        };
    }

    // 构建 apartment 对象
    const rooms = {};
    for (const roomConfig of config.rooms) {
        rooms[roomConfig.id] = {
            name: roomConfig.name,
            description: roomConfig.description,
            items: [...roomConfig.items]
        };
    }

    const connections = buildRoomConnections(config.rooms);

    return {
        startTime: new Date(config.startTime),
        currentTime: new Date(config.startTime),
        timeMultiplier: 1,
        currentHoliday: null,
        holidayDescription: '工作日',
        apartment: { rooms, sharedItems: [...config.sharedItems], connections },
        characters,
        isProcessing: false,
        isPaused: false,
        shouldStop: false,
        loopTimeoutId: null,
        actionTimeoutId: null,
        actionResolve: null,
        apiKey: "",
        lastArtworkPromptTime: 0,
        lastActionTime: null,
        dayCount: 1,
        dailyInteractions: [],
        recentEvents: [],  // 近几轮关键事件，供下轮 prompt 使用
        coupleStatus: {}   // 恋爱/婚姻状态 key:"charId1,charId2"(排序) value:{status,since}
    };
}

// 使用 activeConfig 初始化 gameState
let gameState = initGameStateFromConfig(activeConfig);

// ===== 动态颜色系统（阶段3）=====

// 应用角色颜色 - 每次gameState的角色改变时调用
function applyCharacterColors() {
    const style = document.getElementById('dynamic-char-styles')
        || (() => {
            const s = document.createElement('style');
            s.id = 'dynamic-char-styles';
            document.head.appendChild(s);
            return s;
        })();

    let css = '';
    for (const [charId, char] of Object.entries(gameState.characters)) {
        // 使用 data-color-id 属性而非CSS类来存储颜色
        css += `.log-entry[data-color-id="${charId}"] { color: ${char.color}; border-left-color: ${char.color}; }\n`;
        // 也支持CSS类作为备用
        css += `.character-${charId} { color: ${char.color}; border-left-color: ${char.color}; }\n`;
    }
    style.textContent = css;
}

// 动态构建角色颜色映射（名字 -> ID）

// ===== 技能学习系统（阶段5）=====

// 处理技能变化 - 接受角色对象
function applySkillChanges(charOrName, skillChanges) {
    if (!skillChanges) return;

    // 兼容两种输入：角色对象或角色名字
    let char;
    if (typeof charOrName === 'string') {
        char = getCharacterByName(charOrName);
    } else {
        char = charOrName;
    }

    if (!char) return;

    // 获取角色ID（用于更新activeConfig）
    let charId = null;
    for (const [id, c] of Object.entries(gameState.characters)) {
        if (c === char) {
            charId = id;
            break;
        }
    }

    // 处理学习的技能
    if (skillChanges.learn && Array.isArray(skillChanges.learn)) {
        for (const skill of skillChanges.learn) {
            if (!char.skills.includes(skill)) {
                char.skills.push(skill);
                addLog(`${char.name} 学会了新技能：【${skill}】`, 'system', char.name);

                // 同步更新 activeConfig
                if (charId) {
                    const charConfig = activeConfig.characters.find(c => c.id === charId);
                    if (charConfig && !charConfig.skills.includes(skill)) {
                        charConfig.skills.push(skill);
                    }
                }
            }
        }
    }

    // 处理遗忘的技能
    if (skillChanges.forget && Array.isArray(skillChanges.forget)) {
        for (const skill of skillChanges.forget) {
            const idx = char.skills.indexOf(skill);
            if (idx >= 0) {
                char.skills.splice(idx, 1);
                addLog(`${char.name} 遗忘了技能：【${skill}】`, 'system', char.name);

                // 同步更新 activeConfig
                if (charId) {
                    const charConfig = activeConfig.characters.find(c => c.id === charId);
                    if (charConfig) {
                        const cfgIdx = charConfig.skills.indexOf(skill);
                        if (cfgIdx >= 0) charConfig.skills.splice(cfgIdx, 1);
                    }
                }
            }
        }
    }
}

// ===== 配置系统第一阶段已完成 =====

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

    // 更新速度按钮高亮
    [ui.speed1x, ui.speed2x, ui.speed5x, ui.speed10x].forEach((btn, i) => {
        if (btn) {
            const multipliers = [1, 2, 5, 10];
            btn.classList.toggle('active', gameState.timeMultiplier === multipliers[i]);
        }
    });

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

// ===== 恋爱/婚姻状态工具函数 =====

function getCoupleKey(id1, id2) {
    return [id1, id2].sort().join(',');
}

function getCoupleStatus(id1, id2) {
    return gameState.coupleStatus?.[getCoupleKey(id1, id2)] || null;
}

function getCoupleStatusLabel(status) {
    if (status === 'married') return '💍已婚';
    if (status === 'lovers')  return '❤️恋人';
    if (status === 'ambiguous') return '💕暧昧';
    return '';
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
                <span class="stat ${char.status === 'unconscious' ? 'stat-warning' : ''}">状态: ${(char.isSleeping || char.status === 'sleeping') ? '睡眠中' : (char.status === 'unconscious' ? '晕倒中' : '清醒')}</span>
            </div>
            <p>钱包: ¥${char.wallet}</p>
            <p>当前位置: ${char.currentRoom === 'outside' ? '外出' : (gameState.apartment.rooms[char.currentRoom]?.name || '未知')}</p>
            <p>当前行为: ${char.currentAction}</p>
            ${char.inventory && char.inventory.length > 0
                ? `<div class="char-inventory"><span class="inventory-label">背包:</span> ${char.inventory.map(i => `<span class="inventory-item">${i.name}${(i.quantity||1)>1?` <span style="opacity:0.7">×${i.quantity}</span>`:''}</span>`).join('')}</div>`
                : '<div class="char-inventory"><span class="inventory-label">背包:</span> <span class="inventory-empty">空</span></div>'
            }
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

// 角色颜色映射
const characterColors = {
    '惠舞': 'huiwu',
    '三玖': 'sanjiu',
    '五月': 'wuyue'
};

// 从消息中提取第一个角色名称
function extractCharacterName(message) {
    // 首先从 gameState 中动态查找角色
    if (gameState && gameState.characters) {
        for (const charId in gameState.characters) {
            const char = gameState.characters[charId];
            if (char.name && message.includes(char.name)) {
                return char.name;
            }
        }
    }

    // 备用：使用硬编码的角色名（用于兼容）
    for (const charName of Object.keys(characterColors)) {
        if (message.includes(charName)) {
            return charName;
        }
    }
    return null;
}

// 通过角色名查找角色ID
function findCharacterIdByName(charName) {
    if (!charName || !gameState || !gameState.characters) return null;

    for (const charId in gameState.characters) {
        if (gameState.characters[charId].name === charName) {
            return charId;
        }
    }
    return null;
}

// 打印日志
function addLog(message, type = 'info', characterName = null) {
    const entry = document.createElement('div');

    // 确定CSS类名
    let classes = `log-entry`;

    // 从消息中检测角色名（如果没有提供的话）
    const charName = characterName || extractCharacterName(message);

    // 仅当需要特定的非角色颜色时才使用type
    const specialTypes = ['thought', 'result', 'warning', 'error', 'system', 'interaction', 'progress', 'environment', 'artwork', 'artwork-prompt', 'narrative'];

    if (specialTypes.includes(type)) {
        // 这些类型有自己的特殊颜色
        classes += ` ${type}`;
    } else if (charName) {
        // 动态查找角色ID，通过 charName 匹配角色
        const charId = findCharacterIdByName(charName);
        if (charId) {
            // 使用 data-color-id 属性将日志条目与角色ID关联
            // 这样当颜色更新时，CSS 会自动应用
            entry.setAttribute('data-color-id', charId);
        }
    }

    entry.className = classes;

    // 使用游戏时间而不是现实时间
    const gameTime = gameState.currentTime;
    const timeStr = formatGameTime(gameTime);

    entry.innerText = `[${timeStr}] ${message}`;
    ui.gameLog.appendChild(entry);

    // 限制日志数量
    if (ui.gameLog.children.length > 150) {
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

// 根据角色性格和状态生成个性化恢复action（有API Key时调用AI，否则用静态备用池）
async function generateRestAction(character, otherCharacters) {
    if (gameState.apiKey) {
        try {
            return await generateRestActionWithAI(character, otherCharacters);
        } catch (error) {
            console.warn(`[恢复action] AI生成失败，已跳过: ${error.message}`);
            return null;
        }
    }
    return generateRestActionFromPool(character, otherCharacters);
}

// 调用 DeepSeek AI 为角色动态生成个性化恢复action
async function generateRestActionWithAI(character, otherCharacters) {
    const fatigueLevel = character.fatigueLevel || 0;
    const effortConstraint = fatigueLevel > 70
        ? 'minimal（极度疲劳，只能做最轻松被动的事，如躺着听音乐、发呆、闭眼休息）'
        : fatigueLevel > 40
            ? 'low（中度疲劳，适度放松，如看视频、看书、喝热饮）'
            : 'low或medium（轻度疲劳，可以做稍微有趣的事，如玩游戏、做手工、整理物品）';

    const otherCharsInfo = otherCharacters
        .filter(c => c.name !== character.name)
        .map(c => `- ${c.name}：${c.status === 'sleeping' ? '睡眠中' : c.status === 'unconscious' ? '晕倒中' : '清醒'}`)
        .join('\n');

    const hour = gameState.currentTime.getHours();
    const timeDesc = hour >= 5 && hour < 12 ? '上午' : hour >= 12 && hour < 17 ? '下午' : hour >= 17 && hour < 21 ? '晚上' : '深夜';

    const prompt = `你正在为一个生活模拟游戏生成角色的恢复休息行为，需要高度个性化，体现该角色独特的内心世界。

角色信息：
- 姓名：${character.name}
- 性格：${character.personality}
- 职业：${character.career}
- 当前精力：${character.energy}/100
- 当前心情：${character.mood}/100
- 疲劳等级：${fatigueLevel}/100
- 当前时间：${timeDesc}${hour}点

其他室友状态：
${otherCharsInfo || '（无）'}

生成要求：
1. thought要真实体现该角色的内心独白，不能套话（20-50字）
2. action要具体生动，有细节感，符合角色的日常习惯和性格（30-60字）
3. result要自然，体现恢复效果（20-40字）
4. effort级别：${effortConstraint}
5. stat_changes中energy和mood必须为正整数（恢复精力和心情）
6. duration为10-30之间的整数（分钟）
7. invitable：如果这个休息方式适合邀请他人一起，设为true，否则false
8. 若行为含吃东西，食物必须具体且多样

严格返回JSON格式，不要有任何额外文字：
{"thought":"...","action":"...","result":"...","duration":数字,"stat_changes":{"mood":数字,"energy":数字,"satiety":数字,"hygiene":数字,"wallet":数字},"effort":"minimal/low/medium","invitable":true或false}`;

    const result = await callDeepseekAPI(
        [{ role: 'user', content: prompt }],
        true,
        500
    );

    if (!result.thought || !result.action || !result.result) {
        throw new Error('AI返回字段不完整');
    }

    // 保证恢复类数值合理
    const sc = result.stat_changes || {};
    if (!sc.energy || sc.energy <= 0) sc.energy = 15;
    if (!sc.mood || sc.mood <= 0) sc.mood = 10;

    // 处理邀请逻辑
    let interaction_with = null;
    if (result.invitable && Math.random() < 0.5) {
        const awakeOthers = otherCharacters.filter(c =>
            c.status === 'awake' && c.name !== character.name && Math.random() < 0.4
        );
        if (awakeOthers.length > 0) {
            interaction_with = awakeOthers.map(c => c.name).join('、');
        }
    }

    return {
        character: character.name,
        thought: result.thought,
        action: result.action,
        result: result.result,
        duration: result.duration || 15,
        stat_changes: {
            mood: sc.mood ?? 10,
            energy: sc.energy ?? 15,
            satiety: sc.satiety ?? -1,
            hygiene: sc.hygiene ?? 0,
            wallet: sc.wallet ?? 0
        },
        interaction_with,
        new_room: character.currentRoom
    };
}

// 静态备用池（无API Key或AI调用失败时使用）
function generateRestActionFromPool(character, otherCharacters) {
    const restActions = {
        '惠舞': [
            {
                thought: "脑子有些过载了，强行继续只会写出更烂的代码。玩个游戏让手指替代大脑，暂时放松一下。",
                action: "靠在书房椅背上，打开平板上收藏的像素风格游戏，手指在屏幕上飞快移动，嘴里轻声嘟囔着攻略",
                result: "打过了卡了很久的关，肩膀瞬间松弛下来，感觉整个人都重新有了活力",
                duration: 20,
                stat_changes: { mood: 12, energy: 22, satiety: -2, hygiene: 0, wallet: 0 },
                effort: 'medium'
            },
            {
                thought: "盯屏幕太久了，眼睛需要休息。看点新闻，让脑子在信息的碎片里放松，这样反而能重新整理思路。",
                action: "推开书房的门，在客厅沙发上坐下，打开新闻客户端，边喝水边浏览科技新闻",
                result: "一条关于新型芯片的报道重新激发了灵感，他若有所思地掏出手机记了几个关键词",
                duration: 15,
                stat_changes: { mood: 8, energy: 16, satiety: -2, hygiene: 0, wallet: 0 },
                invitable: true,
                effort: 'low'
            },
            {
                thought: "需要让脑子彻底放空，什么都别想，只是坐着、呼吸、感受当下的安静。",
                action: "走到窗边，靠着墙静静地站着，目光飘向远方的城市轮廓，脑子里一片平静",
                result: "十分钟后，整个人都放松了下来，精神状态明显好转",
                duration: 10,
                stat_changes: { mood: 10, energy: 18, satiety: -1, hygiene: 0, wallet: 0 },
                effort: 'minimal'
            }
        ],
        '三玖': [
            {
                thought: "眼睛太累了，不适合再看画册。看部喜欢的电影，让画面和音乐把自己包裹起来，忘记疲劳。",
                action: "回到卧室，拉上窗帘，打开笔记本，选了一部很久没看的老电影，蜷在被子里看起来",
                result: "两小时后，当片尾曲响起，她感觉心里被治愈了，疲劳也随之消散",
                duration: 25,
                stat_changes: { mood: 15, energy: 20, satiety: -3, hygiene: 0, wallet: 0 },
                invitable: true,
                effort: 'low'
            },
            {
                thought: "不想做任何事，只想让音乐流淌过整个身体，让身心都慢下来。",
                action: "戴上耳机，躺到床上，闭上眼睛，让钢琴曲轻轻地包围自己，呼吸也跟着旋律放缓",
                result: "音乐结束时，她已经完全放松，整个人像被重新启动了一遍",
                duration: 18,
                stat_changes: { mood: 12, energy: 19, satiety: 0, hygiene: 0, wallet: 0 },
                effort: 'minimal'
            },
            {
                thought: "不想画大作品，只想让手动一动，画些无意义的涂鸦，让手脑放空。",
                action: "坐到窗边，拿出速写本，笔尖在纸上随意游走，画些线条、点点、简单的图案",
                result: "不知不觉画了一整页，看着这些无意义却很治愈的涂鸦，心情明显好转",
                duration: 15,
                stat_changes: { mood: 11, energy: 17, satiety: -1, hygiene: -1, wallet: 0 },
                effort: 'medium'
            }
        ],
        '五月': [
            {
                thought: "需要舒服地坐着，翻翻时尚杂志，吃点喜欢的零食，这是最简单有效的放松方式。",
                action: "窝进客厅的懒人沙发，翻出收藏的时尚杂志，咔嚓咔嚓地吃着坚果和蜜饯",
                result: "一个小时后，杂志翻完了，零食也吃完了，整个人神清气爽",
                duration: 20,
                stat_changes: { mood: 14, energy: 21, satiety: 12, hygiene: -1, wallet: -15 },
                effort: 'minimal'
            },
            {
                thought: "想象自己在商场里走一走，看看衣服、鞋子、各种新鲜的东西，这样能让心情飞扬起来。",
                action: "打开购物app，浏览最新款的衣服和包包，时不时加入购物车，嘴里还在哼着歌",
                result: "看到一件满意的衣服，果断下单，那种买东西的快乐感顿时驱散了所有疲劳",
                duration: 20,
                stat_changes: { mood: 16, energy: 19, satiety: -2, hygiene: 0, wallet: -80 },
                effort: 'low'
            },
            {
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

    const actions = restActions[character.name] || [];
    if (actions.length === 0) return null;

    const fatigueLevel = character.fatigueLevel || 0;
    let selectedAction;
    if (fatigueLevel > 70) {
        const easyActions = actions.filter(a => a.effort === 'minimal' || a.effort === 'low');
        selectedAction = easyActions.length > 0
            ? easyActions[Math.floor(Math.random() * easyActions.length)]
            : actions[Math.floor(Math.random() * actions.length)];
    } else if (fatigueLevel > 40) {
        const preferredActions = actions.filter(a => a.effort !== 'medium');
        selectedAction = (preferredActions.length > 0 && Math.random() < 0.7)
            ? preferredActions[Math.floor(Math.random() * preferredActions.length)]
            : actions[Math.floor(Math.random() * actions.length)];
    } else {
        selectedAction = actions[Math.floor(Math.random() * actions.length)];
    }

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
        interaction_with,
        new_room: character.currentRoom
    };
}

// 共享的 API 配置常量
const API_CONFIG = {
    ENDPOINT: 'https://api.deepseek.com/chat/completions',
    MODEL: 'deepseek-v4-flash',
    METHOD: 'POST',
    THINKING: true,
    THINKING_STYLE: 'default' // 'default' | 'inner_os' | 'no_inner_os'
};

// DeepSeek V4 思维链风格指令 Marker
const INNER_OS_MARKER = "\n\n【角色沉浸要求】在你的思考过程（<think>标签内）中，请遵守以下规则：\n" +
    "1. 请以角色第一人称进行内心独白，用括号包裹内心活动，例如\"（心想：……）\"或\"(内心OS：……)\"\n" +
    "2. 用第一人称描写角色的内心感受，例如\"我心想\"\"我觉得\"\"我暗自\"等\n" +
    "3. 思考内容应沉浸在角色中，通过内心独白分析剧情和规划回复";

const NO_INNER_OS_MARKER = "\n\n【思维模式要求】在你的思考过程（<think>标签内）中，请遵守以下规则：\n" +
    "1. 禁止使用圆括号包裹内心独白，例如\"（心想：……）\"或\"(内心OS：……)\"，所有分析内容直接陈述即可\n" +
    "2. 禁止以角色第一人称描写内心活动，例如\"我心想\"\"我觉得\"\"我暗自\"等，请用分析性语言替代\n" +
    "3. 思考内容应聚焦于剧情走向分析和回复内容规划，不要在思考中进行角色扮演式的内心戏表演";

// 逐字符修复 JSON：转义字符串内未转义引号/控制字符，并补全被截断的结构
function repairJSONStrings(str) {
    let result = '';
    let i = 0;
    const len = str.length;
    const stack = []; // 跟踪未闭合的 { 和 [

    while (i < len) {
        const ch = str[i];

        if (ch !== '"') {
            // 在字符串外跟踪括号层级
            if (ch === '{' || ch === '[') stack.push(ch);
            else if (ch === '}' || ch === ']') stack.pop();
            result += ch;
            i++;
            continue;
        }

        // 进入 JSON 字符串
        result += '"';
        i++;
        let closed = false;

        while (i < len) {
            const c = str[i];

            if (c === '\\') {
                result += c;
                i++;
                if (i < len) { result += str[i]; i++; }
                continue;
            }

            if (c === '"') {
                // 向前看紧跟的非空白字符，判断是否为合法字符串结尾
                let j = i + 1;
                while (j < len && /\s/.test(str[j])) j++;
                const next = j < len ? str[j] : '';
                if (next === ':' || next === ',' || next === '}' || next === ']' || j >= len) {
                    result += '"';
                    i++;
                    closed = true;
                    break;
                } else {
                    // 字符串内部的未转义引号
                    result += '\\"';
                    i++;
                    continue;
                }
            }

            // 控制字符转义
            if (c === '\n') { result += '\\n'; i++; continue; }
            if (c === '\r') { result += '\\r'; i++; continue; }
            if (c === '\t') { result += '\\t'; i++; continue; }

            result += c;
            i++;
        }

        // 字符串被截断（到达输入末尾仍未闭合）
        if (!closed) result += '"';
    }

    // 补全截断导致的未闭合括号（倒序关闭）
    for (let k = stack.length - 1; k >= 0; k--) {
        result += stack[k] === '{' ? '}' : ']';
    }

    return result;
}

// 清理并解析 JSON 响应（处理 markdown 包装及前后杂文）
function cleanAndParseJSON(rawContent) {
    let cleaned = rawContent.trim();

    // 处理 markdown 代码块包装
    if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\s*\n/, '');
        cleaned = cleaned.replace(/\n?```\s*$/, '');
        cleaned = cleaned.trim();
    }

    // 去掉 JSON 不合法的正数 + 号，如 +12 → 12
    cleaned = cleaned.replace(/:\s*\+(\d)/g, ': $1');

    // 去掉尾随逗号，如 "value", } 或 "value", ]
    cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');

    // 修复 AI 忘记给字段值加引号的情况，如 "thought": （内心独白...）
    // 匹配冒号后跟全角括号包裹的未引用值，补全外层引号
    cleaned = cleaned.replace(/(:\s*)(（[^\n]*）)(?=\s*[,\n}])/g, (_, colon, val) => {
        return `${colon}"${val.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    });

    // 尝试直接解析
    try {
        return JSON.parse(cleaned);
    } catch (e) {
        // 修复未转义引号和控制字符后重试
        try {
            return JSON.parse(repairJSONStrings(cleaned));
        } catch (e2) { /* 继续下面的修复策略 */ }

        // 按错误位置截断，修复截断点之前的内容（处理 "Expected ',' or '}'" 等位置型错误）
        const posMatch = e.message.match(/position (\d+)/);
        if (posMatch) {
            const errorPos = parseInt(posMatch[1]);
            const beforeError = cleaned.substring(0, errorPos);
            const lastComma = beforeError.lastIndexOf(',');
            if (lastComma > 0) {
                try {
                    return JSON.parse(repairJSONStrings(beforeError.substring(0, lastComma)));
                } catch (e3) { /* 继续 */ }
            }
            try {
                return JSON.parse(repairJSONStrings(beforeError));
            } catch (e3) { /* 继续 */ }
        }

        // 检查是否是未终止的字符串错误
        if (e.message.includes('Unterminated string')) {
            const start = cleaned.indexOf('{');
            const end = cleaned.lastIndexOf('}');
            if (start !== -1 && end > start) {
                let partial = cleaned.slice(start, end + 1);

                // 更激进的修复策略：如果检测到被截断的字符串，直接移除它
                // 找到最后一个完整的双引号对
                let lastValidEnd = -1;
                let inString = false;
                let escaped = false;

                for (let i = 0; i < partial.length; i++) {
                    if (escaped) {
                        escaped = false;
                        continue;
                    }
                    if (partial[i] === '\\') {
                        escaped = true;
                        continue;
                    }
                    if (partial[i] === '"') {
                        inString = !inString;
                        if (!inString) {
                            lastValidEnd = i;
                        }
                    }
                }

                // 如果最后还在字符串中（即被截断了），从最后完整的字符串结束位置重建JSON
                if (inString && lastValidEnd !== -1) {
                    // 从最后一个完整的字符串结束位置向前找，找到它所属的键值对
                    // 简单策略：找到最后一个逗号后的冒号，然后截断到那里
                    const beforeUnfinished = partial.substring(0, lastValidEnd + 1);

                    // 找最后一个逗号
                    const lastComma = beforeUnfinished.lastIndexOf(',');
                    if (lastComma !== -1) {
                        // 截断到最后一个逗号，然后加上 }
                        partial = beforeUnfinished.substring(0, lastComma) + '}';
                    } else {
                        // 没有逗号，说明这是第一个字段，直接加 }
                        partial = beforeUnfinished + '}';
                    }
                }

                try {
                    return JSON.parse(partial);
                } catch (e2) { /* 继续到兜底方案 */ }
            }
        }

        // 兜底：从文本中提取第一个完整 JSON 对象（适用于 reasoner 前后带杂文的情况）
        const start = cleaned.indexOf('{');
        const end = cleaned.lastIndexOf('}');
        if (start !== -1 && end > start) {
            try {
                return JSON.parse(cleaned.slice(start, end + 1));
            } catch (e2) { /* 继续抛出原始错误 */ }
        }

        // 详细的错误日志
        const errorDetails = {
            error: e.message,
            position: e.message.match(/position (\d+)/) ? RegExp.$1 : 'unknown',
            rawLength: rawContent.length,
            cleanedLength: cleaned.length,
            first300: cleaned.substring(0, 300),
            problemArea: e.message.includes('position') ? cleaned.substring(Math.max(0, parseInt(RegExp.$1) - 50), parseInt(RegExp.$1) + 50) : 'N/A'
        };

        console.error('❌ JSON解析失败详情:', errorDetails);
        addLog(`JSON解析失败: ${e.message} 位置: ${errorDetails.position}`, 'error');
        addLog(`响应开始: ${errorDetails.first300}...`, 'debug');

        throw e;
    }
}

// 获取 DeepSeek API headers
// 更新API Key状态显示
function updateApiKeyStatus() {
    const statusEl = document.getElementById('api-key-status');
    if (statusEl) {
        if (gameState.apiKey) {
            statusEl.style.display = 'inline';
            statusEl.textContent = '✓ API Key已设置';
            statusEl.style.color = '#00ff41';
        } else {
            statusEl.style.display = 'none';
        }
    }
}

function initModelToggle() {
    const v4Btn = document.getElementById('model-v4-btn');
    const v4ProBtn = document.getElementById('model-v4pro-btn');
    const label = document.getElementById('model-label');
    if (!v4Btn) return;

    const allBtns = [v4Btn, v4ProBtn].filter(Boolean);

    const thinkingDefaultBtn = document.getElementById('thinking-default-btn');
    const thinkingInnerBtn = document.getElementById('thinking-inner-btn');
    const thinkingAnalysisBtn = document.getElementById('thinking-analysis-btn');
    const allStyleBtns = [thinkingDefaultBtn, thinkingInnerBtn, thinkingAnalysisBtn].filter(Boolean);

    function setThinkingStyle(style, activeBtn) {
        API_CONFIG.THINKING_STYLE = style;
        allStyleBtns.forEach(b => b.classList.remove('active'));
        if (activeBtn) activeBtn.classList.add('active');
    }

    if (thinkingDefaultBtn) thinkingDefaultBtn.addEventListener('click', () => setThinkingStyle('default', thinkingDefaultBtn));
    if (thinkingInnerBtn) thinkingInnerBtn.addEventListener('click', () => setThinkingStyle('inner_os', thinkingInnerBtn));
    if (thinkingAnalysisBtn) thinkingAnalysisBtn.addEventListener('click', () => setThinkingStyle('no_inner_os', thinkingAnalysisBtn));

    v4Btn.addEventListener('click', () => {
        API_CONFIG.MODEL = 'deepseek-v4-flash';
        API_CONFIG.THINKING = true;
        allBtns.forEach(b => b.classList.remove('active'));
        v4Btn.classList.add('active');
        label.textContent = '新模型·思考模式';
    });

    if (v4ProBtn) {
        v4ProBtn.addEventListener('click', () => {
            API_CONFIG.MODEL = 'deepseek-v4-pro';
            API_CONFIG.THINKING = true;
            allBtns.forEach(b => b.classList.remove('active'));
            v4ProBtn.classList.add('active');
            label.textContent = '旗舰模型·思考模式';
        });
    }
}

function getDeepseekHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gameState.apiKey}`
    };
}

function normalizeApiTextContent(content) {
    if (typeof content === 'string') {
        const trimmed = content.trim();
        return trimmed || null;
    }

    if (Array.isArray(content)) {
        const merged = content.map(part => {
            if (typeof part === 'string') return part;
            if (!part || typeof part !== 'object') return '';
            if (typeof part.text === 'string') return part.text;
            if (typeof part.content === 'string') return part.content;
            if (typeof part.value === 'string') return part.value;
            return '';
        }).filter(Boolean).join('\n').trim();
        return merged || null;
    }

    if (content && typeof content === 'object') {
        if (typeof content.text === 'string') {
            const trimmed = content.text.trim();
            return trimmed || null;
        }
        if (typeof content.content === 'string') {
            const trimmed = content.content.trim();
            return trimmed || null;
        }
    }

    return null;
}

function extractDeepseekResponseContent(data) {
    const choice = data?.choices?.[0];
    const message = choice?.message || {};

    if (message.parsed && typeof message.parsed === 'object') {
        return message.parsed;
    }

    return normalizeApiTextContent(message.content)
        || normalizeApiTextContent(choice?.text)
        || normalizeApiTextContent(data?.output_text);
}

// 调用 DeepSeek API 的通用函数
async function callDeepseekAPI(messages, useJsonFormat = true, maxTokens = 8000) {
    const isThinking = API_CONFIG.THINKING;
    const requestBody = {
        model: API_CONFIG.MODEL,
        messages: messages,
        max_tokens: isThinking ? Math.max(maxTokens, 16000) : maxTokens
    };

    if (!isThinking) {
        requestBody.temperature = 0.7;
    }

    // v4-flash 开启思考模式时传入 thinking 参数
    if (isThinking) {
        requestBody.thinking = { type: 'enabled' };
    }

    if (useJsonFormat) {
        requestBody.response_format = { type: 'json_object' };
    }

    console.log('[DeepSeek 发送请求]', requestBody);
    const response = await fetch(API_CONFIG.ENDPOINT, {
        method: API_CONFIG.METHOD,
        headers: getDeepseekHeaders(),
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        let detail = '';
        try {
            const errBody = await response.json();
            detail = errBody.error?.message || errBody.message || JSON.stringify(errBody);
        } catch (_) {}
        throw new Error(`API错误: ${response.status}${detail ? ' — ' + detail : ''}`);
    }

    const data = await response.json();
    console.log('[DeepSeek 原始响应]', data.choices?.[0]?.message || data);
    const extractedContent = extractDeepseekResponseContent(data);

    if (extractedContent && typeof extractedContent === 'object') {
        return extractedContent;
    }

    const content = extractedContent || '';

    // 检查是否为空
    if (!content || content.trim().length === 0) {
        console.error('❌ DeepSeek 响应缺少可解析内容:', data);
        throw new Error('API返回空内容');
    }

    // 检查finish_reason是否为"length"（表示被截断）
    if (data.choices?.[0]?.finish_reason === 'length') {
        console.warn('警告: API响应被截断（max_tokens不足），正在尝试解析...');
    }

    return cleanAndParseJSON(content);
}

// 根据角色当前状态生成动态性格描述
function generateDynamicPersonality(character) {
    const char = gameState.characters[character];
    if (!char) return '';

    const pronoun = getPronoun(char.gender);

    // 使用角色配置中的性格描述作为基础（支持任意数量的自定义角色）
    let personality = char.personality || '';

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

    // 根据关系值和恋爱状态调整对他人的态度
    const relationships = Object.entries(char.relationship).map(([key, value]) => {
        const relationChar = gameState.characters[key];
        if (!relationChar) return '';
        const couple = getCoupleStatus(character, key);
        if (couple?.status === 'married') {
            return `与${relationChar.name}是夫妻，彼此是人生伴侣，深度依赖，生活紧密交织，可用"老公/老婆"等亲密称谓称呼对方。`;
        } else if (couple?.status === 'lovers') {
            return `与${relationChar.name}是恋人，感情深厚，行为举止亲密，主动关心体贴，可用"宝贝/亲爱的"等称谓。`;
        } else if (couple?.status === 'ambiguous') {
            return `与${relationChar.name}处于暧昧阶段，内心有特别的感情，言行中带有含蓄的情感流露。`;
        } else if (value <= -61) {
            return `对${relationChar.name}怀有强烈敌意，言行充满对立，极力回避或针对对方。`;
        } else if (value <= -31) {
            return `对${relationChar.name}明显反感，尽量回避接触，态度冷漠甚至带有敌意。`;
        } else if (value < 0) {
            return `对${relationChar.name}有些不满，交互保持距离，言辞略带生硬。`;
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

// ===== 动态 AI Prompt 构建（阶段4）=====

// 动态生成系统提示词
function buildSystemPrompt() {
    const chars = Object.values(gameState.characters);

    // 生成动态的角色性格描述
    const dynamicPersonalities = {};
    for (const [charId, char] of Object.entries(gameState.characters)) {
        dynamicPersonalities[char.name] = generateDynamicPersonality(charId);
    }

    // 构建角色列表（最多5个）
    let charDescriptions = '';
    chars.forEach((char, idx) => {
        charDescriptions += `${idx + 1}. ${char.name}：${dynamicPersonalities[char.name]}\n`;
    });

    // 构建职业规范
    let careerRules = '';
    chars.forEach(char => {
        careerRules += `- ${char.name}（${char.career}，月薪¥${char.monthlyIncome}）：${char.careerPrompt || '自由安排工作时间。'}\n`;
    });

    // 构建性别代词规则
    let pronounRules = '';
    chars.forEach(char => {
        const pronoun = char.gender === 'male' ? '他' : '她';
        pronounRules += `- ${char.name}（${char.gender === 'male' ? '男' : '女'}）：用"${pronoun}"代指\n`;
    });

    // 构建房间列表（动态，最多12个）
    let roomList = '';
    for (const [roomId, room] of Object.entries(gameState.apartment.rooms)) {
        roomList += `- ${roomId}: ${room.name}  `;
    }
    roomList += `- outside: 外出`;

    // 构建角色数量提示
    const charCount = chars.length;
    const actionCountText = charCount === 1 ? '一个' : charCount === 2 ? '两个' : charCount === 3 ? '三个' : charCount.toString();

    const worldBlock = activeConfig.worldSetting
        ? `【世界观设定】\n${activeConfig.worldSetting}\n\n`
        : '';

    const npcList = (activeConfig.npcs || []);
    const npcBlock = npcList.length > 0
        ? `【NPC配角】\n以下是场景中已记录的配角，可自然地将他们写入叙事和角色行为中：\n${npcList.map(n => `- ${n.name}（${n.role}）${n.note ? '：' + n.note : ''}`).join('\n')}\n⚠️ 以上已记录的配角【禁止】再次出现在 new_npcs 字段中。只有上方列表里完全没有的全新陌生人，才可通过 new_npcs 添加。\n\n`
        : `【NPC配角】\n场景中暂无预设配角。如果行为中自然出现了有意义的陌生人（邻居、同事、快递员等），可通过 new_npcs 字段记录他们。\n\n`;

    const sceneName = activeConfig.sceneName || '公寓';

    const systemPrompt = `你是一位文学素养极高的生活模拟游戏叙事者，负责为${sceneName}里${actionCountText}位角色生成日常生活行为。

${worldBlock}${npcBlock}【角色性格设定】
${charDescriptions}

【职业行为规范——生成action时必须参考】
${careerRules}

【性别代词】
${pronounRules}

【场景设定】${sceneName}，房间 ID 如下：
${roomList}

【写作风格要求——极为重要】
"thought" 和 "action" 必须像优秀短篇小说里的句子，而非游戏任务说明。具体要求：
- "thought"：用第三人称写角色内心世界，要有具体的感官细节、情绪温度和性格逻辑，不得写成"他想去做某事"的简单陈述。要有画面感，有潜台词，可以有联想、回忆、矛盾感。
- "action"：描写行为的全过程和细节，包括肢体动作、神态、环境感受、物件触感，如同电影镜头，而非流水账。可以包含短促的心理插入，让行为更有层次。
- "result"：要有余韵，不只是陈述结果，要带出一点情绪或感受，甚至留下悬念或微小的转变。
- "narrative"：用散文笔法串联${actionCountText}人，要有意象、有节奏、有空间感，像一段精炼的小说场景描写，让读者感受到同一时间轴上不同角色的呼吸。

【反例——禁止这样写】
思考："精力低了，应该去厨房吃东西补充能量。"
行为："角色保存文件，走向厨房，询问是否可以一起吃东西。"

【正例——应该这样写】
思考："脑子像是被抽空了一层，屏幕上的字开始发虚。不是累，是那种过载之后的空白——饿也是真的饿，只是这会儿连饥饿感都变得很远。窗外有风，她听见窗框在轻微震动，不知道为什么这个声音让她觉得有点安心。"
行为："推开房间的门，走廊里有点冷，没去开灯，摸黑走进厨房，打开冰箱，冷光照在脸上，就那么站着，盯着里面看了好一会儿，才慢慢伸手拿出食物。冰箱的嗡嗡声在黑暗里显得格外清晰，她把盒子放在台面上，没有急着打开，就先靠在那里，等自己的心跳稳下来。"

你必须严格返回 JSON 格式，包含以下字段：
1. "actions": 数组，包含${actionCountText}个角色的行为，每个元素包含：
   - "character": 角色名称（${chars.map(c => `"${c.name}"`).join(', ')} 之一）
   - "thought": 角色内心世界（文学化，150-250字）。⚠️ 值必须是普通 JSON 字符串，直接写内容，禁止用（）或()包裹整段文字
   - "action": 行为过程描写（文学化，150-280字）
   - "result": 结果与余韵（80-150字）
   - "duration": 行为持续时间（分钟，5-120之间）
   - "stat_changes": { "mood": -10到+10, "energy": -20到+10, "satiety": -15到+25, "hygiene": -15到+10, "wallet": 消费变化 }
   - "interaction_with": 互动的角色名（无则为null）
   - "dialogue": （当interaction_with不为null时必填）角色间的实际对话，数组，6-14句，严格符合各自性格，来回自然流动，对话要有情绪起伏，格式：[{"speaker": "角色名", "line": "对话内容"}, ...]
   - "new_room": 目标房间英文ID
   - "actionType": 行为类型（primary_work|secondary_work|daily_life|leisure|rest|social）
   - "workOutput": （可选）创作成果，结构：{ "title": "作品名", "type": "illustration|food_photo|video", "description": "30字内描述" }
   - "skill_changes": （可选）技能变化，结构：{ "learn": ["新技能"], "forget": ["失去的技能"] }，仅当角色通过本次行为确实学到或失去了技能时填写
   - "purchases": （可选）购买物品，结构：[{"item": "物品名称", "dest": "inventory 或 房间英文ID", "cost": 价格数字, "quantity": 数量（可选，默认1）}]。规则：①仅当角色确实去购物或网购时才填写；②cost 必须从 wallet 中扣除（stat_changes.wallet 不需要再重复扣）；③余额不足时不得购买；④物品要符合角色性格、职业和用途；⑤价格参考：日用品5-50，食材10-100，家居小物件50-500，电子产品500-5000，家具200-3000；⑥随身携带小物件（食材、外带食物、书籍、小礼物等）dest填"inventory"，家具/家电等固定物件填房间ID；⑦外卖/拼单等捆绑包必须拆分为独立物品（如外卖三份写成三明治×2、饮料×1等分别条目），不得写成一整条捆绑名称
   - "consume_items": （可选）本次行为中实际用尽或消耗掉的物品，结构：[{"item": "物品名称", "from": "inventory（背包）或 房间英文ID", "quantity": 数量（可选，默认1）}]。规则：①仅填写真正被用完的消耗品，如食材、零食、饮料、面膜、卫生纸等；②家具、家电、工具等耐用品不填；③物品必须确实存在于对应位置；④from填"inventory"表示消耗角色背包里的物品，填房间ID表示消耗房间里的物品；⑤有quantity字段时可消耗多份（如吃掉2个包子填quantity:2），背包里剩余份数会相应减少；⑥quantity不得超过背包实际持有数量
   - "item_actions": （可选）物品互动，结构：[{"type": "pick_up|put_down|give", "item": "物品名称", "quantity": 数量（可选，默认1）, "from_room": "房间ID（pick_up时填）", "to_room": "房间ID（put_down时填，留空则用当前房间）", "to_char": "角色名（give时填）"}]。规则：①pick_up从房间拾取物品入背包；②put_down将背包物品放到房间；③give将背包物品赠给同房间角色；④物品必须确实存在于对应位置；⑤give时quantity可大于1（如送2个饼干）

2. "narrative": 散文化场景叙述（150-280字）
3. "time_passed": 游戏时间流逝分钟数
4. "new_npcs": （可选）本轮行为中自然出现的新配角，数组，每项：{"name": "姓名或称呼", "role": "身份/职业", "note": "与角色的关系或特点"}。仅当确实出现了有意义的新面孔时填写，不要强行创造。
5. "love_events": （可选）当本轮发生重要感情事件时填写，数组，每项：{"type": "confession（表白）|accepted（接受）|proposal（求婚）|married（结婚）|breakup（分手）|divorce（离婚）", "from": "角色名", "to": "角色名", "description": "一句话描述"}。规则：①好感值双方≥65时角色才可能表白；②双方≥82且已是恋人才可求婚；③表白/求婚是否成功由对方角色性格决定；④分手/离婚需一方明显心灰意冷；⑤不要强行创造，只在叙事中确实发生时填写。

严格返回JSON，不含任何额外文字。`;

    return systemPrompt;
}

// 调用 DeepSeek API - 获取角色行为决策
async function callAI(prompt) {
    if (!gameState.apiKey) {
        return mockAIResponse(prompt);
    }

    try {
        const systemPrompt = buildSystemPrompt();

        let userContent = prompt;
        if (API_CONFIG.THINKING && API_CONFIG.THINKING_STYLE !== 'default') {
            userContent += API_CONFIG.THINKING_STYLE === 'inner_os' ? INNER_OS_MARKER : NO_INNER_OS_MARKER;
        }

        return await callDeepseekAPI([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent }
        ], true, 10000);
    } catch (error) {
        console.error('❌ AI 调用完整错误:', error);
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
        setTimeout(async () => {
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
                    const restAction = await generateRestAction(char, allChars);
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

// mock：无 API 时的夜晚结算结果（只评估有互动的配对，非互动配对由衰减机制处理）
function mockNightlyReview(interactedNamePairs) {
    const chars = Object.values(gameState.characters);
    const reviews = [];
    for (let i = 0; i < chars.length; i++) {
        for (let j = 0; j < chars.length; j++) {
            if (i === j) continue;
            const namePair = [chars[i].name, chars[j].name].sort().join(',');
            if (!interactedNamePairs.has(namePair)) continue;
            reviews.push({
                from: chars[i].name,
                to: chars[j].name,
                delta: 1,
                reason: '今日有互动'
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
        ], false, 1500);
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

    const styleHint = getStyleHint(char.name, workOutput.type);
    const isNatural = getArtworkPromptMode() === 'natural';

    const messages = isNatural ? [
        {
            role: 'system',
            content: '你是专业的图像创作描述师，擅长用自然语言生动描绘视觉画面。判断标准：作品本身必须是视觉产物（画、插画、照片、视频截图）才返回 applicable: true。代码、程序、文字报告等非视觉产物返回 applicable: false。严格返回JSON，不含其他文字。'
        },
        {
            role: 'user',
            content: `角色：${char.name}（${char.career}，${char.age}岁）
作品类型：${workOutput.type}
作品描述：${workOutput.description}
完成背景：${action.result ? action.result.slice(0, 80) : ''}
风格参考：${styleHint}

请判断并返回JSON（无其他文字）：
{
  "applicable": true/false,
  "description": "中文自然语言描述（60-100字，生动描绘画面场景、氛围、光线、细节，false时留空）",
  "prompt": "英文自然语言描述（40-80词，适合DALL-E 3等自然语言图像生成器，false时留空）",
  "negativePrompt": "",
  "style": "风格标签，false时留空"
}`
        }
    ] : [
        {
            role: 'system',
            content: '你是专业的AI绘图Prompt工程师，精通Stable Diffusion和Midjourney提示词。判断标准：作品本身必须是一件视觉产物（如一幅画、一张插画、一张照片、一帧视频截图），才返回 applicable: true 并生成提示词。若作品是代码、程序、算法、软件、文字报告、工程项目等非视觉产物必须返回 applicable: false。严格返回JSON，不含其他文字。'
        },
        {
            role: 'user',
            content: `角色：${char.name}（${char.career}，${char.age}岁）
作品类型：${workOutput.type}
作品描述：${workOutput.description}
完成背景：${action.result ? action.result.slice(0, 80) : ''}
风格参考：${styleHint}

请判断并返回JSON（无其他文字）：
{
  "applicable": true/false,
  "description": "中文描述（30-50字，false时留空）",
  "prompt": "英文提示词（最多120词，false时留空）",
  "negativePrompt": "负向提示词（最多30词，false时留空）",
  "style": "风格标签，false时留空"
}`
        }
    ];

    try {
        return await callDeepseekAPI(messages, true, 2400);
    } catch (error) {
        console.warn('文生图prompt生成失败，已跳过:', error.message);
        return null;
    }
}

// ==================== 夜晚关系结算函数 ====================
async function doNightlyRelationshipReview() {
    addLog('=== 夜晚关系结算开始 ===', 'system');

    // 构建今日有互动的配对集合（排序后的名字对）
    const interactedNamePairs = new Set();
    for (const item of gameState.dailyInteractions) {
        const targets = item.with.split('、').map(s => s.trim());
        for (const t of targets) {
            if (t) interactedNamePairs.add([item.actor, t].sort().join(','));
        }
    }

    // 有互动才调用 AI 评估
    if (gameState.dailyInteractions.length > 0) {
        const interactionSummary = gameState.dailyInteractions.map((item, i) => {
            let entry = `${i + 1}. ${item.actor}与${item.with}：${item.action}${item.result ? ' → ' + item.result : ''}`;
            if (Array.isArray(item.dialogue) && item.dialogue.length > 0) {
                const dialogueText = item.dialogue.map(d => `${d.speaker}：「${d.line}」`).join(' / ');
                entry += `\n   对话：${dialogueText}`;
            }
            return entry;
        }).join('\n');

        const charSummary = Object.values(gameState.characters).map(char =>
            `${char.name}：${Object.entries(char.relationship).map(([id, val]) =>
                `与${gameState.characters[id]?.name || id}: ${getRelationshipLevel(val)}`
            ).join(', ')}`
        ).join('\n');

        // 只要求 AI 评估有互动的配对（双向）
        const reviewPairSet = new Set();
        const reviewPairs = [];
        for (const namePair of interactedNamePairs) {
            const [nameA, nameB] = namePair.split(',');
            const dirAB = `${nameA}→${nameB}`;
            const dirBA = `${nameB}→${nameA}`;
            if (!reviewPairSet.has(dirAB)) { reviewPairSet.add(dirAB); reviewPairs.push(dirAB); }
            if (!reviewPairSet.has(dirBA)) { reviewPairSet.add(dirBA); reviewPairs.push(dirBA); }
        }
        const pairDesc = reviewPairs.join('、');

        const reviewPrompt = `今天是第${gameState.dayCount - 1}天。

【今日互动记录（共${gameState.dailyInteractions.length}条）】
${interactionSummary}

【当前关系值】
${charSummary}

请对今日有互动的角色对进行严格评估，给出关系值调整。评分标准：
- +2：发生了深刻的情感共鸣、坦诚的倾诉、或化解了重大矛盾
- +1：互动有实质的温度，双方都感到被理解或愉快
- 0：普通对话、简单寒暄、例行互动——有说话但无特别情感连接
- -1：互动尴尬、话不投机、或一方明显敷衍
- -2：发生争吵、冲突、或造成明显伤害

【重要】日常打招呼、一起吃饭聊天等普通互动，默认给 0，不要因为"有互动"就给正值。

返回 JSON：
{
  "reviews": [
    { "from": "角色名A", "to": "角色名B", "delta": 数字, "reason": "一句话理由" },
    ...
  ]
}
只需覆盖有互动的${reviewPairs.length}对方向（${pairDesc}）。严格返回JSON，不含额外文字。`;

        try {
            let result;
            if (gameState.apiKey) {
                result = await callNightlyReviewAI(reviewPrompt);
            } else {
                result = mockNightlyReview(interactedNamePairs);
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
    } else {
        addLog('今日无互动记录。', 'system');
    }

    // 方案A：自然疏远衰减——无互动的配对每天 -1
    const charEntries = Object.entries(gameState.characters);
    let decayPairs = 0;
    for (let i = 0; i < charEntries.length; i++) {
        for (let j = i + 1; j < charEntries.length; j++) {
            const [id1, char1] = charEntries[i];
            const [id2, char2] = charEntries[j];
            const namePair = [char1.name, char2.name].sort().join(',');
            if (!interactedNamePairs.has(namePair)) {
                if (char1.relationship?.[id2] !== undefined && char1.relationship[id2] > -100) {
                    char1.relationship[id2] = Math.max(-100, char1.relationship[id2] - 1);
                }
                if (char2.relationship?.[id1] !== undefined && char2.relationship[id1] > -100) {
                    char2.relationship[id1] = Math.max(-100, char2.relationship[id1] - 1);
                }
                decayPairs++;
            }
        }
    }
    if (decayPairs > 0) {
        addLog(`💨 自然疏远：${decayPairs} 对配对今日无互动，关系值各 -1`, 'system');
    }

    gameState.dailyInteractions = [];
    addLog('=== 夜晚关系结算完成 ===', 'system');
    checkRelationshipRegression();
    updateUI();
}

// 处理 AI 返回的感情事件
function processLoveEvents(events) {
    if (!Array.isArray(events) || events.length === 0) return;

    for (const event of events) {
        if (!event.type || !event.from || !event.to) continue;

        const fromChar = getCharacterByName(event.from);
        const toChar   = getCharacterByName(event.to);
        if (!fromChar || !toChar) continue;

        // 找到两个角色的 ID
        const fromId = Object.keys(gameState.characters).find(id => gameState.characters[id] === fromChar);
        const toId   = Object.keys(gameState.characters).find(id => gameState.characters[id] === toChar);
        if (!fromId || !toId) continue;

        const key      = getCoupleKey(fromId, toId);
        const current  = gameState.coupleStatus?.[key]?.status || null;
        const relFrom  = fromChar.relationship?.[toId]  ?? 0;
        const relTo    = toChar.relationship?.[fromId]  ?? 0;

        switch (event.type) {
            case 'confession': {
                if (relFrom < 65 || relTo < 65) break;
                if (!gameState.coupleStatus[key]) {
                    gameState.coupleStatus[key] = { status: 'ambiguous', since: gameState.dayCount };
                    if (event.description) addLog(event.description, 'system');
                    addLog(`💕 ${fromChar.name} 向 ${toChar.name} 表白了，两人关系变得暧昧`, 'system');
                }
                break;
            }
            case 'accepted': {
                if (relFrom < 65 || relTo < 65) break;
                // 接受表白 → 升级为恋人
                gameState.coupleStatus[key] = { status: 'lovers', since: gameState.dayCount };
                if (event.description) addLog(event.description, 'system');
                addLog(`❤️ ${fromChar.name} 与 ${toChar.name} 确认了恋人关系！`, 'system');
                break;
            }
            case 'lovers': {
                // AI 直接写成恋人（容错）
                if (relFrom < 65 || relTo < 65) break;
                gameState.coupleStatus[key] = { status: 'lovers', since: gameState.dayCount };
                if (event.description) addLog(event.description, 'system');
                addLog(`❤️ ${fromChar.name} 与 ${toChar.name} 确认了恋人关系！`, 'system');
                break;
            }
            case 'proposal':
            case 'married': {
                if (relFrom < 82 || relTo < 82 || current !== 'lovers') break;
                gameState.coupleStatus[key] = { status: 'married', since: gameState.dayCount };
                if (event.description) addLog(event.description, 'system');
                addLog(`💍 ${fromChar.name} 与 ${toChar.name} 结婚了！`, 'system');
                break;
            }
            case 'breakup': {
                if (current !== 'ambiguous' && current !== 'lovers') break;
                delete gameState.coupleStatus[key];
                if (event.description) addLog(event.description, 'system');
                addLog(`💔 ${fromChar.name} 与 ${toChar.name} 分手了`, 'system');
                break;
            }
            case 'divorce': {
                if (current !== 'married') break;
                delete gameState.coupleStatus[key];
                if (event.description) addLog(event.description, 'system');
                addLog(`💔 ${fromChar.name} 与 ${toChar.name} 离婚了`, 'system');
                break;
            }
        }
    }
}

// 夜间倒退检查：关系值跌落时自动触发分手/离婚
function checkRelationshipRegression() {
    if (!gameState.coupleStatus) return;
    for (const [key, info] of Object.entries(gameState.coupleStatus)) {
        const [id1, id2] = key.split(',');
        const char1 = gameState.characters[id1];
        const char2 = gameState.characters[id2];
        if (!char1 || !char2) { delete gameState.coupleStatus[key]; continue; }

        const rel1 = char1.relationship?.[id2] ?? 0;
        const rel2 = char2.relationship?.[id1] ?? 0;

        if (info.status === 'married' && (rel1 < 35 || rel2 < 35)) {
            delete gameState.coupleStatus[key];
            addLog(`💔 ${char1.name} 与 ${char2.name} 的婚姻走到了尽头，两人离婚了`, 'system');
        } else if (info.status === 'lovers' && (rel1 < 45 || rel2 < 45)) {
            delete gameState.coupleStatus[key];
            addLog(`💔 ${char1.name} 与 ${char2.name} 分手了`, 'system');
        } else if (info.status === 'ambiguous' && (rel1 < 55 || rel2 < 55)) {
            delete gameState.coupleStatus[key];
        }
    }
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

// 检测是否为睡眠相关行为
function isSleepRelatedAction(action, thought, result = '') {
    const sleepKeywords = [
        '睡觉', '睡眠', '上床', '躺下', '入睡', '休眠', '卧床',
        '睡觉去', '睡着', '梦乡', '昏昏欲睡', '打瞌睡', 'sleep', 'bed', 'bedroom',
        '被窝', '钻进被', '掀开被', '盖好被', '拉上被',
        '关台灯', '关灯', '熄灯',
        '闭上眼', '合眼', '闭眼',
        '入眠', '安眠', '沉睡', '熟睡', '沉入梦',
        '侧躺', '躺好', '躺进', '躺下来',
        '眼皮沉', '困意', '困倦',
    ];
    const text = (action + thought + result).toLowerCase();
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

// 应用睡眠不足惩罚
function applySleepPenalty(character) {
    const sleepHours = (character.sleepDuration || 0) / 60;

    if (sleepHours < 5) {
        // 睡眠少于5小时，扣40精力值
        character.energy = Math.max(20, character.energy - 40);
        addLog(`⚠️ ${character.name}睡眠严重不足（${Math.round(sleepHours * 10) / 10}小时），精力大幅下降`, 'warning');
    } else if (sleepHours < 7) {
        // 睡眠少于7小时，扣20精力值
        character.energy = Math.max(20, character.energy - 20);
        addLog(`⚠️ ${character.name}睡眠不足（${Math.round(sleepHours * 10) / 10}小时），精力略有下降`, 'warning');
    }
    // 如果睡眠充足（>=7小时），不扣精力
}

// 检查是否有"大动静"在房间内（判断是否应该惊醒睡眠的角色）
function hasDisturbanceInOtherRooms(sleepingCharRoom) {
    // 检查当前房间内是否有嘈杂活动
    const noisyKeywords = ['尖叫', '大喊', '摔', '碎', '打破', '爆炸', '呕吐', '呻吟', '哭', '大声'];

    // 检查同房间的清醒角色是否在进行嘈杂活动
    const othersInRoom = Object.values(gameState.characters).filter(char =>
        char.currentRoom === sleepingCharRoom && !char.isSleeping
    );

    return othersInRoom.some(char => {
        const actionText = (char.currentAction || '').toLowerCase();
        return noisyKeywords.some(keyword => actionText.includes(keyword));
    });
}

// 核心游戏循环
async function gameLoop() {
    if (gameState.isProcessing || gameState.isPaused || gameState.shouldStop) return;

    gameState.isProcessing = true;

    try {

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

${activeConfig.sceneName || '公寓'}房间状态（必须使用英文 ID 作为移动目标）：
${Object.entries(gameState.apartment.rooms).map(([id, room]) =>
    `- ${id} (${room.name}): ${room.description} (物品: ${room.items.join(', ')})`
).join('\n')}

角色当前状态：
${Object.values(gameState.characters).map(char => `
${char.name} (${char.age}岁, ${char.personality})：
- 当前位置 ID: ${char.currentRoom} (名称: ${gameState.apartment.rooms[char.currentRoom]?.name || '未知'})
- 状态: ${(char.isSleeping || char.status === 'sleeping') ? '睡眠中（不应分配新行为）' : (char.status === 'unconscious' ? '晕倒中（无法行动）' : '清醒')}
- 心情: ${char.mood}/100, 精力: ${char.energy}/100, 饱腹: ${char.satiety}/100, 卫生: ${char.hygiene}/100
- 疲劳度: ${Math.round(char.fatigueLevel || 0)}/100 (当日工作: ${Math.round((char.workHoursToday || 0) * 10) / 10}h, 连续工作天数: ${char.consecutiveWorkDays || 0})
- 钱包: ¥${char.wallet}, 职业: ${char.career} (月收入: ¥${char.monthlyIncome})
- 背包: ${char.inventory && char.inventory.length > 0 ? char.inventory.map(i => (i.quantity || 1) > 1 ? `${i.name}×${i.quantity}` : i.name).join('、') : '（空）'}
- 当前行为: ${char.currentAction}
- 与他人关系: ${Object.entries(char.relationship).map(([id, val]) => `与${gameState.characters[id]?.name || id}: ${getRelationshipLevel(val)}`).join(', ')}
`).join('\n')}

特殊状况：
${(() => {
    const specialChars = Object.values(gameState.characters).filter(char => char.status === 'unconscious' || char.isSleeping || char.status === 'sleeping');
    if (specialChars.length === 0) return '无特殊角色状态';
    return specialChars.map(char => {
        if (char.status === 'unconscious') {
            return `${char.name}晕倒在${gameState.apartment.rooms[char.currentRoom]?.name || char.currentRoom}，需要照顾（其他角色可以尝试帮助）`;
        }
        return `${char.name}正在${gameState.apartment.rooms[char.currentRoom]?.name || char.currentRoom}睡眠，不应被分配新行为，除非被惊醒或自然醒来`;
    }).join('\n');
})()}

请为${Object.keys(gameState.characters).length}位角色生成接下来一段时间（5-120分钟）的日常生活行为。

⚠️ **紧急优先级规则**：
- 如果某角色精力 < 10，该角色【必须】立刻去做恢复精力的事情，暂停其他一切计划。不容商量。
- 精力 10-30 范围：应该优先考虑休息。
- 精力 > 30：可以正常工作或进行其他活动。

考虑因素：
1. 当前时间段：${timeInfo.hour >= 5 && timeInfo.hour < 12 ? '上午' : timeInfo.hour >= 12 && timeInfo.hour < 17 ? '下午' : timeInfo.hour >= 17 && timeInfo.hour < 21 ? '晚上' : '深夜'}（${timeInfo.hour}点）
2. 星期几影响：${timeInfo.dayOfWeek}${timeInfo.dayOfWeek.includes('六') || timeInfo.dayOfWeek.includes('日') ? '（周末，角色可能有不同安排）' : '（工作日）'}
3. 季节背景：${timeInfo.season}（影响角色的室外活动和衣着）
4. 角色的性格特点
5. 角色的当前状态（心情、精力、饥饿、卫生、状态）
6. 如果角色状态为"晕倒中"，该角色无法行动，其他角色可以照顾或帮助晕倒的角色（例如：将晕倒角色移动到卧室、喂食、陪伴等）
7. 如果角色状态为"睡眠中"（isSleeping=true 或 status='sleeping'），该角色本轮必须返回休眠行为（如"在熟睡中..."），不得生成新的行动计划
8. 角色之间的互动可能性
9. 房间的可用性和功能
10. 职业工作时段（工作日必须遵守）：
${Object.values(gameState.characters).map(char => `   - ${char.name}（${char.career}）：${char.careerPrompt || '自由安排工作时间。'}`).join('\n')}
11. 行为连续性规则：
   - 角色上一次行为如果是工作，下一次在工作时段内应继续工作（除非精力<40）
   - 角色上一次行为如果是吃饭，下一次应回到工作或休息，不应再做饭
   - 角色连续两次做饭后，下一次必须安排非烹饪行为
12. 行为类型说明（actionType 必须精确标注）：
   - primary_work = 主要职业工作（各角色的核心职业行为，如编程、绘画、拍摄/剪辑/写脚本等）
   - secondary_work = 辅助工作（查资料、整理工作台、头脑风暴、构思方案）
   - daily_life = 日常生活（洗漱、购物、打扫）
   - leisure = 休闲娱乐（看电影、听音乐、玩游戏、散步、看书）
   - rest = 休息睡眠（睡觉、小憩、冥想、静坐）
   - social = 社交互动（与他人对话、陪伴、互动、聊天）
13. 角色上一轮行为（用于判断连续性）：
${Object.values(gameState.characters).map(char => `   - ${char.name}：${(char.currentAction || '').slice(0, 40) || '无'}（行为类型：${char.lastActionType || '无'}）`).join('\n')}
${gameState.recentEvents.length > 0 ? `
14. 近期事件记忆（严格基于此保持上下文连贯，不得重复已发生的对话内容）：
${gameState.recentEvents.map((e, i) => `【第${i === gameState.recentEvents.length - 1 ? '上' : '上上'}轮】\n${e}`).join('\n')}
` : ''}

请确保行为自然、符合角色性格，并考虑真实的生活逻辑。
特别注意：如果是节假日，角色可能会有特殊的活动安排，比如：
- 周末：可能会睡懒觉、放松、外出购物或娱乐
- 春节：可能会有家庭聚会、准备年夜饭、拜年等活动
- 节假日：根据节日特点安排相应的活动

⚠️ **食物多样性要求**：涉及吃东西时，必须从以下丰富选项中自由发挥：
- 从冰箱取食（甜点/零食）：布丁、慕斯蛋糕、冰淇淋、蛋挞、奶冻等各种甜食点心
- 从冰箱取食（水果）：各种水果
- 零食（卧室/客厅）：薯片、坚果、蜜饯、饼干、威化、豆干等各种零食
- 正餐：泡面、速冻饺子、速冻汤圆、三明治、吐司等各种正餐
- 做饭菜肴：红烧肉、蒜蓉西兰花、番茄炒蛋等各种菜肴
每次生成含食物的行为，必须具体点名食物，且与前几轮不重复。

严格返回要求的 JSON 格式。${(() => {
    const npcs = activeConfig.npcs || [];
    if (npcs.length === 0 || Math.random() > 0.35) return '';
    const npc = npcs[Math.floor(Math.random() * npcs.length)];
    return `\n\n【NPC互动提示（可选）】今天${npc.name}（${npc.role}）可能会出现，可以安排一次自然的互动，让 ta 带来一条消息或引发一个小事件。`;
})()}`;

    // 在调用 AI 前，先根据属性计算角色的心情值
    updateCharactersMood();

    const decision = await callAI(actionPrompt);

    if (!decision || !Array.isArray(decision.actions)) {
        addLog('⚠️ AI 调用失败或返回无效响应，本轮已跳过', 'error');
    } else {
        // 显示叙事描述
        if (decision.narrative) {
            addLog(`场景: ${decision.narrative}`, 'narrative');
        }

        // 处理每个角色的行为
        // 用 Set 记录本轮已展示的对话内容签名，避免同一段对话被多个角色重复渲染
        const shownDialogueContent = new Set();
        // 用 Set 记录本轮已展示的互动标题（名字排序后的 key），避免同一对互动打两次标题
        const shownInteractionPairs = new Set();
        for (const action of decision.actions) {
            const char = getCharacterByName(action.character);
            if (!char) continue;

            // 如果角色晕倒，跳过AI生成的行为，保持晕倒状态
            if (char.status === 'unconscious') {
                char.isSleeping = false;
                char.currentAction = '晕倒中（需要照顾）';
                char.lastWorkCheckTime = new Date(gameState.currentTime);
                continue; // 跳过这个角色的行为处理，等待其他角色照顾
            }

            // 如果角色正在睡眠，跳过行为处理（由advanceGameTime管理睡眠）
            if (char.isSleeping || char.status === 'sleeping') {
                char.isSleeping = true;
                char.status = 'sleeping';
                char.currentAction = '在熟睡中...';
                char.lastWorkCheckTime = new Date(gameState.currentTime);
                continue; // 睡眠期间不执行新action
            }

            // 记录行为
            addLog(`${char.name}的思考: ${action.thought}`, 'thought');
            addLog(`${char.name}的行为: ${action.action}`, 'action', char.name);

            // 检测是否进入睡眠行为（需要满足时间和地点条件）
            if (isSleepRelatedAction(action.action, action.thought, action.result) &&
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
                    char.lastWorkCheckTime = new Date(gameState.currentTime);
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
                    // 允许从任何房间外出
                    char.currentRoom = 'outside';
                }
                // 处理正常房间移动
                else if (gameState.apartment.rooms[toRoom]) {
                    char.currentRoom = toRoom;
                } else {
                    // 无效的房间ID
                    addLog(`${char.name}试图移动到无效的房间"${action.new_room}"，位置未更新`, 'error');
                }
            } else if (action.new_room === null) {
                // 角色外出（兼容旧版本，使用null表示外出）
                char.currentRoom = 'outside';
            }
            // 如果action.new_room是undefined，不更新位置

            // 更新角色状态
            if (action.stat_changes) {
                char.mood = Math.max(0, Math.min(100, char.mood + (action.stat_changes.mood || 0)));
                char.energy = Math.max(1, Math.min(100, char.energy + (action.stat_changes.energy || 0)));
                char.satiety = Math.max(0, Math.min(100, char.satiety + (action.stat_changes.satiety || 0)));
                char.hygiene = Math.max(0, Math.min(100, char.hygiene + (action.stat_changes.hygiene || 0)));
                char.wallet = Math.max(0, char.wallet + (action.stat_changes.wallet || 0));
            }

            // 处理购物（支持 dest: "inventory" 或 房间ID；兼容旧格式 room 字段）
            if (Array.isArray(action.purchases) && action.purchases.length > 0) {
                for (const purchase of action.purchases) {
                    if (!purchase.item || typeof purchase.cost !== 'number') continue;
                    if (char.wallet < purchase.cost) {
                        addLog(`${char.name}想买${purchase.item}，但余额不足（¥${char.wallet}）`, 'system');
                        continue;
                    }
                    char.wallet = Math.max(0, char.wallet - purchase.cost);
                    const pQty = purchase.quantity || 1;
                    const pQtyLabel = pQty > 1 ? ` ×${pQty}` : '';
                    const dest = purchase.dest || purchase.room; // 兼容旧 room 字段
                    if (dest === 'inventory') {
                        addToInventory(char, purchase.item, pQty);
                        addLog(`${char.name}花费 ¥${purchase.cost} 购入了「${purchase.item}」${pQtyLabel}，放入背包。余额：¥${char.wallet}`, 'system');
                    } else if (dest && gameState.apartment.rooms[dest]) {
                        addRoomItem(dest, purchase.item);
                        addLog(`${char.name}花费 ¥${purchase.cost} 购入了「${purchase.item}」${pQtyLabel}，放在${gameState.apartment.rooms[dest].name}。余额：¥${char.wallet}`, 'system');
                    } else {
                        addToInventory(char, purchase.item, pQty);
                        addLog(`${char.name}花费 ¥${purchase.cost} 购入了「${purchase.item}」${pQtyLabel}，放入背包。余额：¥${char.wallet}`, 'system');
                    }
                }
            }

            // 处理消耗品（从房间移除用完的物品）
            if (Array.isArray(action.consume_items) && action.consume_items.length > 0) {
                for (const consumed of action.consume_items) {
                    if (!consumed.item) continue;
                    const consumeFrom = consumed.from || consumed.room; // 兼容旧字段
                    if (consumeFrom === 'inventory') {
                        // 从背包消耗（有就删，没有静默跳过）
                        const cQty = consumed.quantity || 1;
                        if (removeFromInventory(char, consumed.item, cQty)) {
                            const cLabel = cQty > 1 ? ` ×${cQty}` : '';
                            addLog(`${char.name}用掉了背包里的「${consumed.item}」${cLabel}。`, 'system');
                        }
                    } else if (consumeFrom) {
                        // 从房间消耗
                        const targetRoom = gameState.apartment.rooms[consumeFrom];
                        if (!targetRoom) continue;
                        const idx = targetRoom.items.indexOf(consumed.item);
                        if (idx === -1) {
                            // 房间找不到则尝试从背包兜底
                            if (removeFromInventory(char, consumed.item)) {
                                addLog(`${char.name}用掉了背包里的「${consumed.item}」。`, 'system');
                            }
                            continue;
                        }
                        removeRoomItem(consumeFrom, idx);
                        addLog(`${char.name}用掉了「${consumed.item}」，${targetRoom.name}里已没有了。`, 'system');
                    }
                }
            }

            // 处理物品互动（pick_up / put_down / give）
            if (Array.isArray(action.item_actions) && action.item_actions.length > 0) {
                for (const ia of action.item_actions) {
                    processItemAction(char, ia);
                }
            }

            // 处理技能变化（阶段5）
            if (action.skill_changes) {
                applySkillChanges(char, action.skill_changes);
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
            if (workOutput) {
                const now = Date.now();
                if (now - (gameState.lastArtworkPromptTime || 0) > 5000) {  // 5秒节流
                    gameState.lastArtworkPromptTime = now;
                    generateArtworkImagePrompt(char, workOutput, action).then(promptResult => {
                        if (promptResult && promptResult.applicable !== false) {
                            const title = workOutput.title ? `《${workOutput.title}》` : '';
                            addLog(`✦ ${char.name} 完成了新作品 ${title}`, 'artwork');
                            if (promptResult.description) {
                                addLog(`  ${promptResult.description}`, 'artwork');
                            }
                            const promptLabel = getArtworkPromptMode() === 'natural' ? '[自然描述]' : '[SD Prompt]';
                            addLog(`${promptLabel} ${promptResult.prompt}`, 'artwork-prompt');
                            if (promptResult.negativePrompt) {
                                addLog(`[Negative] ${promptResult.negativePrompt}`, 'artwork-prompt');
                            }
                            ui.logSection.scrollTop = ui.logSection.scrollHeight;

                            // 作品名+类型存入角色数据（随存档保存）
                            if (!char.artworks) char.artworks = [];
                            char.artworks.push({
                                title: workOutput.title || '',
                                type: workOutput.type || ''
                            });

                            // 完整提示词存入独立日志（不绑定存档槽）
                            const artworkLog = JSON.parse(localStorage.getItem('artwork_prompt_log') || '[]');
                            artworkLog.push({
                                charName: char.name,
                                title: workOutput.title || '',
                                type: workOutput.type || '',
                                description: promptResult.description || '',
                                prompt: promptResult.prompt || '',
                                negativePrompt: promptResult.negativePrompt || '',
                                style: promptResult.style || '',
                                mode: getArtworkPromptMode(),
                                gameTime: gameState.currentTime ? formatGameTime(new Date(gameState.currentTime)) : '',
                                day: gameState.dayCount || 1
                            });
                            // 最多保留50条，超出时删除最旧的
                            if (artworkLog.length > 50) artworkLog.splice(0, artworkLog.length - 50);
                            localStorage.setItem('artwork_prompt_log', JSON.stringify(artworkLog));
                        }
                    }).catch(err => { console.warn('作品记录保存失败:', err); });  // 静默失败，不影响主循环
                }
            }

            // 记录互动（累积到当天记录，供夜晚统一结算）
            if (action.interaction_with) {
                const pairKey = [char.name, ...action.interaction_with.split('、')].sort().join(',');
                if (!shownInteractionPairs.has(pairKey)) {
                    shownInteractionPairs.add(pairKey);
                    addLog(`${char.name}与${action.interaction_with}进行了互动`, 'interaction');
                }
                // 用对话内容签名判重，避免同一段对话因出现在多个角色的 action 里而重复打印
                if (Array.isArray(action.dialogue) && action.dialogue.length > 0) {
                    // 独白检测：所有台词都是同一人说的，说明 AI 只给了该角色的独白，不是真正对话，跳过
                    const speakers = new Set(action.dialogue.map(d => d.speaker).filter(Boolean));
                    const dialogueKey = action.dialogue.map(d => `${d.speaker}:${d.line}`).join('\n');
                    if (speakers.size >= 2 && !shownDialogueContent.has(dialogueKey)) {
                        shownDialogueContent.add(dialogueKey);
                        for (const line of action.dialogue) {
                            const speaker = line.speaker || '';
                            // AI 有时用 text/content/dialogue 代替 line 字段
                            const text = line.line ?? line.text ?? line.content ?? line.dialogue ?? '';
                            if (!speaker || !text) continue;
                            addLog(`💬 ${speaker}：「${text}」`, 'interaction');
                        }
                    }
                }
                gameState.dailyInteractions.push({
                    actor: char.name,
                    with: action.interaction_with,
                    thought: action.thought || '',
                    action: action.action || '',
                    result: action.result || '',
                    dialogue: action.dialogue || []
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

        // 处理 AI 新增的 NPC
        if (Array.isArray(decision.new_npcs)) {
            activeConfig.npcs = activeConfig.npcs || [];
            for (const n of decision.new_npcs) {
                if (!n.name || !n.role) continue;
                const exists = activeConfig.npcs.some(existing =>
                    existing.name.trim().toLowerCase() === n.name.trim().toLowerCase()
                );
                if (!exists) {
                    activeConfig.npcs.push({
                        id: `npc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
                        name: n.name,
                        role: n.role,
                        note: n.note || ''
                    });
                    addLog(`📋 新增配角：${n.name}（${n.role}）`, 'system');
                }
            }
        }

        // 处理感情事件
        if (Array.isArray(decision.love_events) && decision.love_events.length > 0) {
            processLoveEvents(decision.love_events);
        }

        // 将本轮关键事件存入 recentEvents，供下轮 prompt 使用（保留最近2轮）
        const roundSummary = decision.actions.map(a => {
            let s = `${a.character}：${(a.action || '').slice(0, 60)}`;
            if (a.interaction_with && Array.isArray(a.dialogue) && a.dialogue.length > 0) {
                s += `\n  与${a.interaction_with}的对话：` + a.dialogue.map(d => `${d.speaker}「${d.line}」`).join(' / ');
            }
            return s;
        }).join('\n');
        gameState.recentEvents.push(roundSummary);
        if (gameState.recentEvents.length > 2) gameState.recentEvents.shift();

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
    }

    } catch (loopErr) {
        console.error('gameLoop 异常:', loopErr);
        addLog(`本轮生成出错已跳过: ${loopErr.message}`, 'error');
    } finally {
        gameState.isProcessing = false;
        updateUI();
    }

    // 根据时间倍率设置下一次循环
    if (!gameState.shouldStop && !gameState.isPaused) {
        if (gameState.loopTimeoutId) {
            clearTimeout(gameState.loopTimeoutId);
        }

        // 计算下次循环时间（真实时间）
        // 默认每90秒执行一次循环，模拟时间流逝由AI决定
        const realTimeInterval = 90000 / gameState.timeMultiplier;
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
        autoSave();

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
        if (char.isSleeping || char.status === 'sleeping') {
            char.isSleeping = true;
            char.status = 'sleeping';
            // 角色正在睡眠中
            char.sleepDuration = (char.sleepDuration || 0) + minutes;

            // 计算随机的清醒阈值（4-9小时之间）
            // 如果还没有设置目标睡眠时长，就在入睡时随机生成一个
            if (!char.targetSleepDuration) {
                // 随机睡眠时长：4-9小时，每次+0.5小时
                char.targetSleepDuration = (4 + Math.random() * 5.5) * 60; // 转换为分钟
            }

            // 检查是否被惊醒（其他房间有大动静）
            if (hasDisturbanceInOtherRooms(char.currentRoom)) {
                // 生成被惊醒日志
                const disturbedRoom = Object.values(gameState.characters).find(c =>
                    c.currentRoom !== char.currentRoom && c.isSleeping === false
                );
                if (disturbedRoom) {
                    addLog(`${char.name}被${disturbedRoom.name}在${gameState.apartment.rooms[disturbedRoom.currentRoom]?.name}的动静惊醒了`, 'system');
                }
                // 应用睡眠不足惩罚
                applySleepPenalty(char);
                char.isSleeping = false;
                char.status = 'awake';
                char.currentAction = '被惊醒了';
                char.lastDisturbance = newTime;
                char.targetSleepDuration = null;
            }
            // 检查是否到了目标睡眠时长
            else if (char.sleepDuration >= char.targetSleepDuration) {
                const sleepHours = Math.round(char.sleepDuration / 60 * 10) / 10;
                addLog(`${char.name}睡饱了，自然醒来（睡眠${sleepHours}小时）`, 'system');
                // 应用睡眠不足惩罚
                applySleepPenalty(char);
                char.isSleeping = false;
                char.status = 'awake';
                char.currentAction = '睡醒了';
                char.sleepStartTime = null;
                char.sleepDuration = 0;
                char.targetSleepDuration = null;
            }
            // 检查是否超过绝对上限（11小时 = 660分钟），强制醒来
            else if (char.sleepDuration >= 660) {
                addLog(`${char.name}已经睡得够久了，强行起床`, 'system');
                // 睡眠充足，不应用惩罚
                char.isSleeping = false;
                char.status = 'awake';
                char.currentAction = '睡醒了';
                char.sleepStartTime = null;
                char.sleepDuration = 0;
                char.targetSleepDuration = null;
            }
            // 睡眠时每小时恢复精力（更快的恢复速度）
            else {
                char.energy = Math.min(100, char.energy + Math.floor(hoursPassed * 25)); // 睡眠恢复25点/小时
            }
        } else if (char.status === 'awake' && !char.isSleeping) {
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
                    char.targetSleepDuration = null; // 重置目标睡眠时长
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
        if (char.isSleeping || char.status === 'sleeping') continue;

        if (char.currentRoom.includes('bedroom')) {
            // 疲劳高时恢复速度稍慢
            const fatigueMultiplier = 1 - (char.fatigueLevel || 0) / 500;
            // 有同伴时恢复加速20%（陪伴带来心理舒适）
            const companionBonus = hasCompanyInRoom ? 1.2 : 1.0;
            char.energy = Math.min(100, char.energy + Math.floor(hoursPassed * 20 * fatigueMultiplier * companionBonus));
        } else if (char.currentRoom === 'bathroom' || char.currentRoom === 'bathRoom') {
            // 在浴室洗漱的精力恢复
            const isSleepWindow = hour >= 22 || hour < 6;
            const recoveryRate = isSleepWindow ? 2 : 8; // 睡眠窗口期恢复2点/小时，其他时间8点/小时
            char.energy = Math.min(100, char.energy + Math.floor(hoursPassed * recoveryRate));
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
            char.energy = Math.max(1, char.energy + Math.floor(netEnergyChange));
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
        // 暂时禁用晕倒事件，精力最低保持在1
        if (false && !(char.isSleeping || char.status === 'sleeping')) {
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

    // 用当前 activeConfig 重建干净的 gameState（支持动态角色配置）
    gameState = initGameStateFromConfig(activeConfig);
    setupPanelState.currentConfig = deepClone(activeConfig);
    syncSetupRelationshipValuesFromConfig();
    setupPanelState.loadedGameState = null;

    // 清空游戏日志
    ui.gameLog.innerHTML = '';

    updateUI();
    addLog("模拟器已重置，请重新配置后开始游戏。", 'system');

    // 恢复 UI 到初始状态（等待玩家重新配置）
    ui.startBtn.innerText = "开始模拟";
    ui.startBtn.disabled = false;
    ui.apiKeyInput.disabled = false;
    ui.apiKeyInput.value = '';
    ui.pauseBtn.disabled = true;
    ui.pauseBtn.innerText = "暂停模拟";

    // 重新渲染设置面板并显示
    renderPresetCards();
    renderCharacterEditor();
    renderRoomEditor();
    renderSaveSlots();
    document.getElementById('setup-overlay').classList.remove('hidden');
}

// 初始化
ui.startBtn.addEventListener('click', () => {
    if (ui.startBtn.innerText === "开始模拟") {
        // 启动游戏
        gameState.apiKey = ui.apiKeyInput.value;
        updateApiKeyStatus();
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
// 自动存档（每过一个游戏天触发，写入专用槽）
function autoSave() {
    // 调试：检查角色是否有relationship字段
    for (const [charId, char] of Object.entries(gameState.characters)) {
        if (!char.relationship || typeof char.relationship !== 'object') {
            console.warn(`❌ 自动保存前检测到角色 ${charId} (${char.name}) 缺少 relationship 字段`);
        } else {
            const relationshipCount = Object.keys(char.relationship).length;
            console.log(`✅ 角色 ${charId} (${char.name}) 有 ${relationshipCount} 个关系值:`, char.relationship);
        }
    }

    const saveData = {
        configSnapshot: deepClone(activeConfig),
        gameState: {
            startTime: gameState.startTime,
            currentTime: gameState.currentTime,
            timeMultiplier: gameState.timeMultiplier,
            dayCount: gameState.dayCount,
            characters: gameState.characters,
            apartment: gameState.apartment,
            lastActionTime: gameState.lastActionTime,
            dailyInteractions: gameState.dailyInteractions,
            coupleStatus: gameState.coupleStatus
        },
        saveTimestamp: formatGameTime(new Date()),
        isAutoSave: true
    };

    // 调试：检查保存的数据中是否有relationship字段
    const firstCharId = Object.keys(saveData.gameState.characters)[0];
    if (firstCharId) {
        const firstChar = saveData.gameState.characters[firstCharId];
        console.log(`🔍 自动保存数据中第一个角色 ${firstCharId} (${firstChar?.name}) 的 relationship 字段:`, firstChar?.relationship);
    }

    localStorage.setItem('apartment_sim_autosave', JSON.stringify(saveData));
    addLog(`💾 自动存档（第${gameState.dayCount}天）`, 'system');
    renderSaveSlots();
}

// 尝试在页面启动时加载自动存档
function tryLoadAutoSaveOnStartup() {
    const rawData = localStorage.getItem('apartment_sim_autosave');
    if (!rawData) {
        console.log('ℹ️ 无自动存档，使用初始配置');
        return false;
    }

    try {
        const data = JSON.parse(rawData);
        const loadedState = data.gameState;

        if (!loadedState || !loadedState.characters) {
            console.warn('⚠️ 自动存档数据不完整，使用初始配置');
            return false;
        }

        console.log('🔄 检测到自动存档，正在恢复游戏状态...');

        // 恢复配置（世界设定、场景名称、NPC 等）
        if (data.configSnapshot) {
            activeConfig = deepClone(data.configSnapshot);
        }

        // 恢复游戏状态
        gameState.startTime = new Date(loadedState.startTime);
        gameState.currentTime = new Date(loadedState.currentTime);
        gameState.timeMultiplier = loadedState.timeMultiplier;
        gameState.dayCount = loadedState.dayCount;
        gameState.characters = loadedState.characters;
        if (loadedState.apartment) gameState.apartment = loadedState.apartment;
        gameState.lastActionTime = loadedState.lastActionTime ? new Date(loadedState.lastActionTime) : null;
        gameState.dailyInteractions = loadedState.dailyInteractions || [];
        gameState.coupleStatus = loadedState.coupleStatus || {};

        // 设置游戏状态为暂停（等待用户手动开始）
        gameState.isPaused = true;
        gameState.isProcessing = false;
        gameState.shouldStop = false;

        // 确保角色有必要的字段（兼容性）
        for (const [charId, char] of Object.entries(gameState.characters)) {
            if (!char.inventory) char.inventory = [];
            // 检查 relationship 字段
            if (!char.relationship || typeof char.relationship !== 'object') {
                console.warn(`❌ 启动时加载：角色 ${charId} (${char.name}) 缺少 relationship 字段，正在初始化`);
                char.relationship = {};

                // 尝试从 config 恢复
                const configChar = activeConfig?.characters?.find(c => c.id === charId);
                if (configChar && configChar.initialRelationships) {
                    char.relationship = deepClone(configChar.initialRelationships);
                    console.log(`  ✅ 从 config 恢复了 relationship 字段`);
                }
            } else {
                const relationshipCount = Object.keys(char.relationship).length;
                console.log(`✅ 角色 ${charId} (${char.name}) 有 ${relationshipCount} 个关系值`);
            }

            // 确保其他必要字段存在
            if (char.status === undefined) char.status = "awake";
            if (char.isSleeping === undefined) char.isSleeping = false;

            // 转换 Date 字段
            if (char.lastRestTime) char.lastRestTime = new Date(char.lastRestTime);
            if (char.lastWorkCheckTime) char.lastWorkCheckTime = new Date(char.lastWorkCheckTime);
            if (char.sleepStartTime) char.sleepStartTime = new Date(char.sleepStartTime);
        }

        console.log('✅ 自动存档恢复完成，游戏时间:', formatGameTime(gameState.currentTime), '第', gameState.dayCount, '天');
        console.log('✅ 游戏状态: 暂停中，等待用户点击"开始模拟"');
        return true;
    } catch (error) {
        console.error('❌ 自动存档恢复失败:', error);
        return false;
    }
}


function saveGame(slotIndex) {
    const saveData = {
        configSnapshot: deepClone(activeConfig),
        gameState: {
            startTime: gameState.startTime,
            currentTime: gameState.currentTime,
            timeMultiplier: gameState.timeMultiplier,
            dayCount: gameState.dayCount,
            characters: gameState.characters,
            apartment: gameState.apartment,
            lastActionTime: gameState.lastActionTime,
            dailyInteractions: gameState.dailyInteractions,
            coupleStatus: gameState.coupleStatus
        },
        saveTimestamp: formatGameTime(new Date())
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

        // 恢复配置（世界设定、场景名称、NPC 等）
        if (data.configSnapshot) {
            activeConfig = deepClone(data.configSnapshot);
        }

        // 还原状态 (Date 对象需要特殊处理，因为 JSON 不支持 Date 类型)
        gameState.startTime = new Date(loadedState.startTime);
        gameState.currentTime = new Date(loadedState.currentTime);
        gameState.timeMultiplier = loadedState.timeMultiplier;
        gameState.dayCount = loadedState.dayCount;
        gameState.characters = loadedState.characters;
        // 确保角色有状态字段（兼容旧存档）
        for (const [charId, char] of Object.entries(gameState.characters)) {
            if (!char.inventory) char.inventory = [];
            // 从 activeConfig 回填旧存档中缺失的静态描述字段
            const configChar = activeConfig?.characters?.find(c => c.id === charId);
            if (!char.careerPrompt) char.careerPrompt = configChar?.careerPrompt || '';
            if (!char.personality)  char.personality  = configChar?.personality  || '';
            if (!char.career)       char.career       = configChar?.career       || '';
            if (!char.color)        char.color        = configChar?.color        || '#ff00ff';
            if (char.status === undefined) {
                char.status = "awake"; // 默认值
            }
            if (char.isSleeping === undefined) {
                char.isSleeping = char.status === "sleeping";
            }
            if (char.isSleeping && char.status !== "sleeping") {
                char.status = "sleeping";
            }
            if (char.status === "sleeping" && !char.isSleeping) {
                char.isSleeping = true;
            }
            // 根据精力值检查是否需要设置为晕倒
            if (char.energy <= 0) {
                char.isSleeping = false;
                char.status = "unconscious";
                char.currentAction = "晕倒中";
            } else if (char.status === "unconscious" && char.energy >= 30) {
                char.status = "awake";
            }

            if (char.status === "sleeping") {
                char.currentAction = "在熟睡中...";
                if (char.sleepDuration === undefined || char.sleepDuration === null) {
                    char.sleepDuration = 0;
                }
                if (char.sleepStartTime) {
                    char.sleepStartTime = new Date(char.sleepStartTime);
                } else {
                    char.sleepStartTime = gameState.currentTime;
                }
            }

            if (char.lastDisturbance) {
                char.lastDisturbance = new Date(char.lastDisturbance);
            }
            if (char.lastRestTime) {
                char.lastRestTime = new Date(char.lastRestTime);
            }
            if (char.lastWorkCheckTime) {
                char.lastWorkCheckTime = new Date(char.lastWorkCheckTime);
            }

            // 调试：检查 relationship 字段
            if (!char.relationship || typeof char.relationship !== 'object') {
                console.warn(`❌ 加载存档时检测到角色 ${charId} (${char.name}) 缺少 relationship 字段，正在初始化`);
                char.relationship = {};

                // 尝试从 config 恢复 initialRelationships
                if (configChar && configChar.initialRelationships) {
                    char.relationship = deepClone(configChar.initialRelationships);
                    console.log(`  ✅ 从 config 恢复了 relationship:`, char.relationship);
                } else {
                    console.log(`  ⚠️  config 中也无 initialRelationships，创建空对象`);
                }
            } else {
                const relationshipCount = Object.keys(char.relationship).length;
                console.log(`✅ 角色 ${charId} (${char.name}) 加载了 ${relationshipCount} 个关系值:`, char.relationship);
            }
        }
        if (loadedState.apartment) gameState.apartment = loadedState.apartment;
        gameState.lastActionTime = loadedState.lastActionTime ? new Date(loadedState.lastActionTime) : null;
        gameState.dailyInteractions = loadedState.dailyInteractions || [];
        gameState.coupleStatus = loadedState.coupleStatus || {};

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

// 将存档格式化为易读的文本格式（支持人工编辑）
function formatSaveDataForExport(saveData) {
    const data = JSON.parse(saveData);
    const gs = data.gameState;

    let output = '';
    output += `╔═══════════════════════════════════════════════════════════════╗\n`;
    output += `║                    公寓生活模拟器 存档文件                      ║\n`;
    output += `╚═══════════════════════════════════════════════════════════════╝\n\n`;

    // 保存信息
    output += `【保存信息】\n`;
    output += `保存时间: ${data.saveTimestamp}\n`;
    output += `导出时间: ${new Date().toLocaleString('zh-CN')}\n\n`;

    // 游戏进度
    output += `【游戏进度】\n`;
    output += `当前日期: 第 ${gs.dayCount} 天\n`;
    output += `当前时间: ${formatGameTime(new Date(gs.currentTime))}\n`;
    output += `游戏时间倍率: ${gs.timeMultiplier}x\n\n`;

    // 角色状态
    output += `【角色状态】\n`;
    for (const [charName, char] of Object.entries(gs.characters)) {
        output += `\n${charName}:\n`;
        output += `  位置: ${char.currentLocation}\n`;
        output += `  精力: ${char.energy}/100\n`;
        output += `  状态: ${char.status}\n`;
        output += `  当前行为: ${char.currentAction}\n`;
    }
    output += `\n\n`;

    // 原始 JSON 数据（用于导入）
    output += `【完整数据】\n`;
    output += `${JSON.stringify({gameState: gs, saveTimestamp: data.saveTimestamp}, null, 2)}\n`;

    return output;
}

// 从导出的文本格式提取 JSON 数据
function extractJsonFromExportFormat(text) {
    // 查找【完整数据】部分
    const startIdx = text.indexOf('【完整数据】\n');
    if (startIdx === -1) {
        // 如果是纯 JSON，直接解析
        try {
            return JSON.parse(text);
        } catch {
            return null;
        }
    }

    const jsonStr = text.substring(startIdx + 6).trim();
    try {
        return JSON.parse(jsonStr);
    } catch {
        return null;
    }
}

// 导出所有存档为单个JSON文件（易读 + 可恢复）
function exportAllSaves() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const allSaves = {};

    for (let i = 1; i <= 3; i++) {
        const key = `apartment_sim_save_${i}`;
        const data = localStorage.getItem(key);
        if (data) {
            try {
                allSaves[key] = JSON.parse(data);
            } catch (e) {
                console.error(`处理存档 ${i} 失败:`, e);
            }
        }
    }

    if (Object.keys(allSaves).length === 0) {
        alert("没有可导出的存档。");
        return;
    }

    // 导出单个JSON文件（2空格缩进，易读 + 可恢复）
    const jsonBlob = new Blob(
        [JSON.stringify(allSaves, null, 2)],
        { type: 'application/json; charset=utf-8' }
    );
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const jsonA = document.createElement('a');
    jsonA.href = jsonUrl;
    jsonA.download = `apartment_sim_saves_${timestamp}.json`;
    document.body.appendChild(jsonA);
    jsonA.click();

    setTimeout(() => {
        document.body.removeChild(jsonA);
        URL.revokeObjectURL(jsonUrl);
    }, 100);

    addLog("✅ 存档已导出为 JSON 文件。", 'system');
}

// 从文件导入存档
function importSaves(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const fileContent = e.target.result;
            let importedData = null;

            // 尝试解析 JSON
            try {
                const parsed = JSON.parse(fileContent);

                // 检查是否包含 apartment_sim_save_* 键
                if (Object.keys(parsed).some(key => key.startsWith('apartment_sim_save_'))) {
                    importedData = parsed;
                }
            } catch {
                // 如果不是有效的 JSON，尝试从文本格式提取
                if (fileContent.includes('【完整数据】')) {
                    const regex = /【完整数据】\n([\s\S]*?)(?=存档位|$)/g;
                    let match;
                    importedData = {};
                    let slotNum = 1;

                    while ((match = regex.exec(fileContent)) !== null) {
                        const jsonStr = match[1].trim();
                        try {
                            const parsed = JSON.parse(jsonStr);
                            const key = `apartment_sim_save_${slotNum}`;
                            importedData[key] = parsed;
                            slotNum++;
                        } catch {
                            console.warn(`无法解析存档位 ${slotNum}`);
                        }
                    }
                }
            }

            if (!importedData || Object.keys(importedData).length === 0) {
                throw new Error("无法识别文件格式");
            }

            let count = 0;

            // 写入 localStorage
            for (const key in importedData) {
                if (key.startsWith('apartment_sim_save_')) {
                    const value = typeof importedData[key] === 'string'
                        ? importedData[key]
                        : JSON.stringify(importedData[key]);
                    localStorage.setItem(key, value);
                    count++;
                }
            }

            if (count > 0) {
                addLog(`✅ 成功导入 ${count} 个存档位。`, 'system');
                refreshSaveUI();
            } else {
                throw new Error("文件中未找到有效的存档数据");
            }
        } catch (err) {
            console.error("导入存档失败:", err);
            addLog(`❌ 导入失败：${err.message}`, 'error');
        }
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

// ===== 游戏前设置面板系统（阶段9）=====

let setupPanelState = {
    selectedPreset: 'default_threegirls',
    currentConfig: deepClone(GAME_PRESETS['default_threegirls'].config),
    relationshipValues: {}  // 存储关系度值，格式: "fromId>toId": value
};

function getSetupRelationshipKey(fromId, toId) {
    return `${fromId}>${toId}`;
}

function syncSetupRelationshipValuesFromConfig() {
    const chars = setupPanelState.currentConfig.characters || [];
    const nextValues = {};

    chars.forEach(char => {
        if (!char.initialRelationships || typeof char.initialRelationships !== 'object') {
            char.initialRelationships = {};
        }
    });

    for (const fromChar of chars) {
        for (const toChar of chars) {
            if (fromChar.id === toChar.id) continue;

            const relKey = getSetupRelationshipKey(fromChar.id, toChar.id);
            const parsedValue = Number.parseInt(fromChar.initialRelationships[toChar.id], 10);
            const relValue = Number.isFinite(parsedValue) ? parsedValue : 0;

            fromChar.initialRelationships[toChar.id] = relValue;
            nextValues[relKey] = relValue;
        }
    }

    setupPanelState.relationshipValues = nextValues;
}

function refreshSetupRelationshipLabels(charId) {
    const char = (setupPanelState.currentConfig.characters || []).find(item => item.id === charId);
    if (!char) return;

    document.querySelectorAll(`[data-setup-rel-char="${charId}"]`).forEach(el => {
        el.textContent = char.name;
        el.style.color = char.color;
    });
}

// 初始化设置面板
function initSetupPanel() {
    renderPresetCards();
    renderCharacterEditor();
    renderRoomEditor();
    renderSaveSlots();
    setupTabNavigation();
    setupEventListeners();
    setupLoadDataListeners();
    syncWorldTabUI();
    const saved = localStorage.getItem('deepseek_api_key');
    if (saved) {
        const input = document.getElementById('setup-api-key');
        if (input) input.value = saved;
    }
}

// 标签页导航
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.setup-tab-btn');
    const tabContents = document.querySelectorAll('.setup-tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            // 移除所有active
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // 添加active到当前标签
            btn.classList.add('active');
            document.getElementById(`tab-${tabName}`).classList.add('active');
        });
    });
}

// 渲染预设卡片
function renderPresetCards() {
    const container = document.getElementById('preset-cards-container');
    container.innerHTML = '';

    for (const [presetId, preset] of Object.entries(GAME_PRESETS)) {
        const card = document.createElement('div');
        card.className = 'preset-card';
        if (setupPanelState.selectedPreset === presetId) {
            card.classList.add('selected');
        }

        card.innerHTML = `
            <div class="preset-card-title">${preset.label}</div>
            <div class="preset-card-desc">${preset.description}</div>
        `;

        card.addEventListener('click', () => selectPreset(presetId));
        container.appendChild(card);
    }
}

// 选择预设
function selectPreset(presetId) {
    setupPanelState.selectedPreset = presetId;
    setupPanelState.currentConfig = deepClone(GAME_PRESETS[presetId].config);
    syncSetupRelationshipValuesFromConfig();
    renderPresetCards();
    renderCharacterEditor();
    renderRoomEditor();
    syncWorldTabUI();
}

function updateSceneName(value) {
    setupPanelState.currentConfig.sceneName = value || '公寓';
}

function updateWorldSetting(value) {
    setupPanelState.currentConfig.worldSetting = value;
}

function updateStartTime(value) {
    if (value) {
        setupPanelState.currentConfig.startTime = value + ':00';
    }
}

function syncWorldTabUI() {
    const cfg = setupPanelState.currentConfig;
    const sceneInput = document.getElementById('sceneNameInput');
    const worldInput = document.getElementById('worldSettingInput');
    const startInput = document.getElementById('startTimeInput');
    if (sceneInput) sceneInput.value = cfg.sceneName || '公寓';
    if (worldInput) worldInput.value = cfg.worldSetting || '';
    if (startInput) startInput.value = (cfg.startTime || '').slice(0, 16);
    renderSetupNPCList();
}

// ===== 设置面板 NPC 管理 =====

function renderSetupNPCList() {
    const container = document.getElementById('setup-npc-list');
    if (!container) return;
    const npcs = setupPanelState.currentConfig.npcs || [];
    if (npcs.length === 0) {
        container.innerHTML = '<div style="color:#555; font-size:12px; padding:6px 0;">暂无配角，AI 会在游戏中自动记录遇到的新面孔。</div>';
        return;
    }
    container.innerHTML = npcs.map((npc, idx) => `
        <div style="background:#0d0d0d; border:1px solid #2a2a2a; border-radius:4px; padding:10px; margin-bottom:8px;">
            <div style="display:flex; gap:6px; margin-bottom:6px;">
                <input type="text" value="${escapeAttr(npc.name)}" placeholder="名字" oninput="updateSetupNPC(${idx},'name',this.value)"
                    style="flex:1; background:#1a1a1a; color:#e0e0e0; border:1px solid #333; border-radius:3px; padding:5px 8px; font-size:12px;" />
                <input type="text" value="${escapeAttr(npc.role)}" placeholder="身份/职业" oninput="updateSetupNPC(${idx},'role',this.value)"
                    style="flex:1; background:#1a1a1a; color:#e0e0e0; border:1px solid #333; border-radius:3px; padding:5px 8px; font-size:12px;" />
                <button onclick="removeSetupNPC(${idx})" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:14px; padding:0 4px;">✕</button>
            </div>
            <input type="text" value="${escapeAttr(npc.note)}" placeholder="备注（与角色的关系、特点…）" oninput="updateSetupNPC(${idx},'note',this.value)"
                style="width:100%; box-sizing:border-box; background:#1a1a1a; color:#e0e0e0; border:1px solid #333; border-radius:3px; padding:5px 8px; font-size:12px;" />
        </div>
    `).join('');
}

function addSetupNPC() {
    if (!setupPanelState.currentConfig.npcs) setupPanelState.currentConfig.npcs = [];
    setupPanelState.currentConfig.npcs.push({
        id: `npc_${Date.now()}`,
        name: '',
        role: '',
        note: ''
    });
    renderSetupNPCList();
}

function removeSetupNPC(idx) {
    setupPanelState.currentConfig.npcs.splice(idx, 1);
    renderSetupNPCList();
}

function updateSetupNPC(idx, field, value) {
    if (setupPanelState.currentConfig.npcs?.[idx]) {
        setupPanelState.currentConfig.npcs[idx][field] = value;
    }
}

// 渲染角色编辑器
function renderCharacterEditor() {
    const container = document.getElementById('char-list-editor');
    container.innerHTML = '';

    const chars = setupPanelState.currentConfig.characters || [];
    const canAdd = chars.length < 5;

    const addBtn = document.getElementById('add-char-btn');
    addBtn.disabled = !canAdd;

    chars.forEach((char, idx) => {
        const item = document.createElement('div');
        item.className = 'char-editor-item';
        const stats = char.initialStats || {};
        const roomOptions = (setupPanelState.currentConfig.rooms || [])
            .map(room => `<option value="${room.id}" ${char.bedroomId === room.id ? 'selected' : ''}>${room.name}（${room.id}）</option>`)
            .join('');
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <h4 style="color: #00ff41; margin: 0;">角色 ${idx + 1}</h4>
                <button class="btn-remove" onclick="removeCharacter(${idx})">删除</button>
            </div>
            <div class="editor-field-row">
                <div class="editor-field-group">
                    <div class="editor-field-label">名字</div>
                    <input type="text" value="${char.name}" oninput="updateCharField(${idx}, 'name', this.value)" />
                </div>
                <div class="editor-field-group" style="flex: 0.6;">
                    <div class="editor-field-label">颜色</div>
                    <div class="color-input-group" style="gap: 4px;">
                        <input type="color" class="color-picker" data-char-id="${char.id}" value="${char.color}" oninput="updateSetupCharColor('${char.id}', this.value)" style="width: 40px; flex-shrink: 0;" />
                        <input type="text" class="color-code" data-char-id="${char.id}" value="${char.color}" oninput="updateSetupCharColor('${char.id}', this.value)" style="flex: 1; font-size: 11px;" />
                    </div>
                </div>
            </div>
            <div class="editor-field-row">
                <div class="editor-field-group">
                    <div class="editor-field-label">性别</div>
                    <select onchange="updateCharField(${idx}, 'gender', this.value)" style="width: 100%;">
                        <option value="male" ${char.gender === 'male' ? 'selected' : ''}>男</option>
                        <option value="female" ${char.gender === 'female' ? 'selected' : ''}>女</option>
                    </select>
                </div>
                <div class="editor-field-group">
                    <div class="editor-field-label">年龄</div>
                    <input type="number" value="${char.age || 20}" oninput="updateCharField(${idx}, 'age', parseInt(this.value))" min="1" max="100" />
                </div>
            </div>
            <div class="editor-field-row">
                <div class="editor-field-group">
                    <div class="editor-field-label">职业</div>
                    <input type="text" value="${char.career}" oninput="updateCharField(${idx}, 'career', this.value)" />
                </div>
                <div class="editor-field-group">
                    <div class="editor-field-label">月收入</div>
                    <input type="number" value="${char.monthlyIncome}" oninput="updateCharField(${idx}, 'monthlyIncome', parseInt(this.value))" />
                </div>
            </div>
            <div class="editor-field-group">
                <div class="editor-field-label">技能（用英文逗号分隔）</div>
                <input type="text" value="${(char.skills || []).join(', ')}" onchange="updateCharSkills(${idx}, this.value)" placeholder="例如：编程, 数学, 逻辑分析" />
            </div>
            <div class="editor-field-group">
                <div class="editor-field-label">🎒 初始背包物品</div>
                <div style="margin-bottom: 4px; display: flex; flex-wrap: wrap; gap: 4px; min-height: 22px;">
                    ${(char.initialInventory || []).map((name, i) =>
                        `<span style="background:rgba(255,149,0,0.15);border:1px solid rgba(255,149,0,0.4);color:#ffb84d;border-radius:3px;padding:1px 6px;font-size:12px;cursor:pointer;" onclick="removeSetupInventoryItem(${idx},${i})">${name} ✕</span>`
                    ).join('')}
                </div>
                <input type="text" placeholder="输入物品名，按Enter添加"
                       onkeypress="if(event.key==='Enter'&&this.value.trim()){addSetupInventoryItem(${idx},this.value.trim());this.value='';}"
                       style="width:100%;" />
            </div>
            <div class="editor-field-group">
                <div class="editor-field-label">性格描述</div>
                <textarea oninput="updateCharField(${idx}, 'personality', this.value)" style="height: 80px;">${char.personality}</textarea>
            </div>
            <div class="editor-field-group">
                <div class="editor-field-label">工作提示（AI 行为规则）</div>
                <textarea oninput="updateCharField(${idx}, 'careerPrompt', this.value)" style="height: 70px;" placeholder="例如：工作日上午9-12点为明确工作时段...">${char.careerPrompt || ''}</textarea>
            </div>
            <div class="editor-field-group">
                <div class="editor-field-label">初始状态</div>
                <div class="editor-field-row" style="flex-wrap: wrap; gap: 6px;">
                    <div class="editor-field-group" style="flex: 1; min-width: 70px;">
                        <div class="editor-field-label" style="font-size: 10px;">心情 (0-100)</div>
                        <input type="number" value="${stats.mood ?? 70}" min="0" max="100" oninput="updateCharInitStat(${idx}, 'mood', parseInt(this.value))" />
                    </div>
                    <div class="editor-field-group" style="flex: 1; min-width: 70px;">
                        <div class="editor-field-label" style="font-size: 10px;">精力 (0-100)</div>
                        <input type="number" value="${stats.energy ?? 80}" min="0" max="100" oninput="updateCharInitStat(${idx}, 'energy', parseInt(this.value))" />
                    </div>
                    <div class="editor-field-group" style="flex: 1; min-width: 70px;">
                        <div class="editor-field-label" style="font-size: 10px;">饱食 (0-100)</div>
                        <input type="number" value="${stats.satiety ?? 60}" min="0" max="100" oninput="updateCharInitStat(${idx}, 'satiety', parseInt(this.value))" />
                    </div>
                    <div class="editor-field-group" style="flex: 1; min-width: 70px;">
                        <div class="editor-field-label" style="font-size: 10px;">卫生 (0-100)</div>
                        <input type="number" value="${stats.hygiene ?? 80}" min="0" max="100" oninput="updateCharInitStat(${idx}, 'hygiene', parseInt(this.value))" />
                    </div>
                    <div class="editor-field-group" style="flex: 1; min-width: 90px;">
                        <div class="editor-field-label" style="font-size: 10px;">钱包 (¥)</div>
                        <input type="number" value="${stats.wallet ?? 3000}" min="0" oninput="updateCharInitStat(${idx}, 'wallet', parseInt(this.value))" />
                    </div>
                </div>
            </div>
            <div class="editor-field-group">
                <div class="editor-field-label">专属卧室</div>
                <select onchange="updateCharField(${idx}, 'bedroomId', this.value)" style="width: 100%;">
                    <option value="" ${!char.bedroomId ? 'selected' : ''}>-- 未分配 --</option>
                    ${roomOptions}
                </select>
            </div>
        `;
        container.appendChild(item);
    });

    // 添加关系度设置部分
    if (chars.length > 1) {
        syncSetupRelationshipValuesFromConfig();

        const relationshipItem = document.createElement('div');
        relationshipItem.className = 'char-editor-item';
        relationshipItem.style.backgroundColor = '#1a1a2e';
        relationshipItem.style.borderLeft = '4px solid #00ff41';

        let relationshipHtml = `
            <h4 style="color: #00ff41; margin: 0 0 12px 0;">❤️ 角色间好感度</h4>
        `;

        for (let i = 0; i < chars.length; i++) {
            for (let j = 0; j < chars.length; j++) {
                if (i === j) continue;
                const char1 = chars[i];
                const char2 = chars[j];
                const relKey = getSetupRelationshipKey(char1.id, char2.id);
                const currentRel = setupPanelState.relationshipValues[relKey] ?? 0;

                relationshipHtml += `
                    <div style="margin-bottom: 10px;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                            <span data-setup-rel-char="${char1.id}" style="color: ${char1.color}; font-weight: bold;">${char1.name}</span>
                            <span style="color: #888;">→</span>
                            <span data-setup-rel-char="${char2.id}" style="color: ${char2.color}; font-weight: bold;">${char2.name}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <input type="range" min="-100" max="100" value="${currentRel}"
                                   oninput="updateSetupRelationship('${relKey}', this.value); this.nextElementSibling.textContent = this.value"
                                   style="flex: 1; cursor: pointer;" />
                            <span style="color: #00ff41; min-width: 35px; text-align: right;">${currentRel}</span>
                        </div>
                    </div>
                `;
            }
        }

        relationshipItem.innerHTML = relationshipHtml;
        container.appendChild(relationshipItem);
    }
}


// 添加角色
function addSetupInventoryItem(charIdx, itemName) {
    const char = setupPanelState.currentConfig.characters[charIdx];
    if (!char) return;
    if (!char.initialInventory) char.initialInventory = [];
    if (!char.initialInventory.includes(itemName)) {
        char.initialInventory.push(itemName);
        renderCharacterEditor();
    }
}

function removeSetupInventoryItem(charIdx, itemIdx) {
    const char = setupPanelState.currentConfig.characters[charIdx];
    if (!char || !char.initialInventory) return;
    char.initialInventory.splice(itemIdx, 1);
    renderCharacterEditor();
}

function addCharacter() {
    if ((setupPanelState.currentConfig.characters || []).length >= 5) return;

    const newChar = {
        id: `char_${Date.now()}`,
        name: `角色${(setupPanelState.currentConfig.characters?.length || 0) + 1}`,
        color: '#ff00ff',
        gender: 'female',
        age: 20,
        personality: '新角色',
        career: '职业',
        monthlyIncome: 10000,
        careerPrompt: '工作提示',
        skills: [],
        initialInventory: [],
        initialStats: { mood: 70, energy: 80, satiety: 60, hygiene: 80, wallet: 3000 },
        initialRelationships: {},
        bedroomId: `bedroom_${(setupPanelState.currentConfig.characters?.length || 0)}`
    };

    if (!setupPanelState.currentConfig.characters) {
        setupPanelState.currentConfig.characters = [];
    }

    const existingChars = setupPanelState.currentConfig.characters;
    existingChars.forEach(char => {
        if (!char.initialRelationships || typeof char.initialRelationships !== 'object') {
            char.initialRelationships = {};
        }
        char.initialRelationships[newChar.id] = 0;
        newChar.initialRelationships[char.id] = 0;
    });

    setupPanelState.currentConfig.characters.push(newChar);
    syncSetupRelationshipValuesFromConfig();
    renderCharacterEditor();
}

// 删除角色
function removeCharacter(idx) {
    const removedChar = setupPanelState.currentConfig.characters[idx];
    setupPanelState.currentConfig.characters.splice(idx, 1);

    if (removedChar) {
        (setupPanelState.currentConfig.characters || []).forEach(char => {
            if (char.initialRelationships) {
                delete char.initialRelationships[removedChar.id];
            }
        });
    }

    syncSetupRelationshipValuesFromConfig();
    renderCharacterEditor();
}

// 更新角色字段（不重渲染，避免输入框失去焦点）
function updateCharField(idx, field, value) {
    setupPanelState.currentConfig.characters[idx][field] = value;

    if (field === 'name') {
        refreshSetupRelationshipLabels(setupPanelState.currentConfig.characters[idx].id);
    }
}

// 设置面板中更新角色颜色
function updateSetupCharColor(charId, newColor) {
    const char = setupPanelState.currentConfig.characters.find(c => c.id === charId);
    if (!char) return;

    // 验证颜色格式
    if (!newColor.match(/^#[0-9a-fA-F]{6}$/)) {
        console.warn(`Invalid color format: ${newColor}`);
        return;
    }

    char.color = newColor;
    // 同步选色器和文本框
    document.querySelectorAll(`[data-char-id="${charId}"]`).forEach(el => {
        if (el.value !== newColor) el.value = newColor;
    });

    refreshSetupRelationshipLabels(charId);
}

// 更新角色初始状态数值
function updateCharInitStat(idx, stat, value) {
    if (!setupPanelState.currentConfig.characters[idx].initialStats) {
        setupPanelState.currentConfig.characters[idx].initialStats = {};
    }
    setupPanelState.currentConfig.characters[idx].initialStats[stat] = value;
}

// 更新角色技能（从逗号分隔字符串解析）
function updateCharSkills(idx, skillsString) {
    if (setupPanelState.currentConfig.characters[idx]) {
        const skills = skillsString
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0);
        setupPanelState.currentConfig.characters[idx].skills = skills;
    }
}

// 更新设置面板中的关系度值
function updateSetupRelationship(relKey, value) {
    const parsedValue = Number.parseInt(value, 10);
    const relValue = Number.isFinite(parsedValue) ? parsedValue : 0;
    setupPanelState.relationshipValues[relKey] = relValue;

    const [fromId, toId] = relKey.split('>');
    const fromChar = (setupPanelState.currentConfig.characters || []).find(char => char.id === fromId);
    if (!fromChar) return;

    if (!fromChar.initialRelationships || typeof fromChar.initialRelationships !== 'object') {
        fromChar.initialRelationships = {};
    }

    fromChar.initialRelationships[toId] = relValue;
}

// 渲染房间编辑器
function renderRoomEditor() {
    const container = document.getElementById('room-list-editor');
    container.innerHTML = '';

    const rooms = setupPanelState.currentConfig.rooms || [];
    const canAdd = rooms.length < 12;

    const addBtn = document.getElementById('add-room-btn');
    addBtn.disabled = !canAdd;

    rooms.forEach((room, idx) => {
        const item = document.createElement('div');
        item.className = 'room-editor-item';
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <h4 style="color: #00ff41; margin: 0;">房间 ${idx + 1}</h4>
                <button class="btn-remove" onclick="removeRoom(${idx})" ${room.isHub ? 'disabled' : ''} title="${room.isHub ? '中心房间不可删除' : ''}">删除</button>
            </div>
            <div class="editor-field-row">
                <div class="editor-field-group">
                    <div class="editor-field-label">名字</div>
                    <input type="text" value="${room.name}" onchange="updateRoomField(${idx}, 'name', this.value)" />
                </div>
                <div class="editor-field-group">
                    <div class="editor-field-label">ID</div>
                    <input type="text" value="${room.id}" readonly style="background: #333; cursor: not-allowed;" />
                </div>
            </div>
            <div class="editor-field-group">
                <div class="editor-field-label">描述</div>
                <textarea onchange="updateRoomField(${idx}, 'description', this.value)" style="height: 60px;">${room.description}</textarea>
            </div>
        `;
        container.appendChild(item);
    });
}

// 添加房间
function addRoom() {
    if ((setupPanelState.currentConfig.rooms || []).length >= 12) return;

    const newRoom = {
        id: `room_${Date.now()}`,
        name: `房间${(setupPanelState.currentConfig.rooms?.length || 0) + 1}`,
        description: '新房间描述',
        items: [],
        isHub: false
    };

    if (!setupPanelState.currentConfig.rooms) {
        setupPanelState.currentConfig.rooms = [];
    }
    setupPanelState.currentConfig.rooms.push(newRoom);
    renderRoomEditor();
    renderCharacterEditor();
}

// 删除房间
function removeRoom(idx) {
    const room = setupPanelState.currentConfig.rooms[idx];
    if (room.isHub) return;

    const removedRoomId = room.id;
    setupPanelState.currentConfig.rooms.splice(idx, 1);

    (setupPanelState.currentConfig.characters || []).forEach(char => {
        if (char.bedroomId === removedRoomId) {
            char.bedroomId = '';
        }
    });

    renderRoomEditor();
    renderCharacterEditor();
}

// 更新房间字段
function updateRoomField(idx, field, value) {
    setupPanelState.currentConfig.rooms[idx][field] = value;

    if (field === 'name') {
        renderCharacterEditor();
    }
}

// 事件绑定
function setupEventListeners() {
    const startBtn = document.getElementById('start-game-btn');
    const addCharBtn = document.getElementById('add-char-btn');
    const addRoomBtn = document.getElementById('add-room-btn');
    const apiKeyInput = document.getElementById('setup-api-key');

    startBtn.addEventListener('click', startGameFromSetup);
    addCharBtn.addEventListener('click', addCharacter);
    addRoomBtn.addEventListener('click', addRoom);
}

// ===== 存档读取和导入功能 =====

// 渲染本地存档槽位
function renderSaveSlots() {
    const container = document.getElementById('setup-save-slots');
    if (!container) return;

    container.innerHTML = '';

    for (let i = 1; i <= 3; i++) {
        const saveKey = `apartment_sim_save_${i}`;
        const rawData = localStorage.getItem(saveKey);

        const slot = document.createElement('div');
        slot.className = rawData ? 'setup-save-slot' : 'setup-save-slot empty';

        if (rawData) {
            try {
                const saveData = JSON.parse(rawData);
                const timestamp = saveData.saveTimestamp || '未知时间';

                // 获取角色数量和房间数量
                const charCount = saveData.configSnapshot?.characters?.length
                                ?? Object.keys(saveData.gameState?.characters || {}).length;
                const roomCount = saveData.configSnapshot?.rooms?.length
                                ?? Object.keys(saveData.gameState?.apartment?.rooms || {}).length;

                // 获取游戏时间信息
                const gameTime = saveData.gameState?.currentTime || saveData.configSnapshot?.startTime;
                const gameTimeStr = gameTime ? formatGameTime(new Date(gameTime)) : '未知';
                const dayCount = saveData.gameState?.dayCount || 1;

                // 获取各角色当前行为
                const charLines = saveData.gameState?.characters
                    ? Object.values(saveData.gameState.characters)
                        .map(c => `<span style="color:${c.color||'#ccc'}">${c.name}</span>：${c.currentAction || '未知'}`)
                        .join('<br>')
                    : '无角色信息';

                slot.innerHTML = `
                    <div class="setup-save-slot-header">
                        <div class="setup-save-slot-title">存档 ${i}</div>
                        <div class="setup-save-slot-time">${timestamp}</div>
                    </div>
                    <div class="setup-save-slot-info">
                        <strong>游戏时间:</strong> ${gameTimeStr}<br>
                        <strong>游戏天数:</strong> ${dayCount}<br>
                        <strong>角色 (${charCount}):</strong><br>
                        <div style="margin: 4px 0 4px 8px; font-size: 11px; line-height: 1.7;">${charLines}</div>
                        <strong>房间:</strong> ${roomCount} 个
                    </div>
                    <div class="setup-save-slot-actions">
                        <button onclick="loadSaveSlotToSetup(${i})">读取此存档</button>
                        <button class="btn-secondary" onclick="deleteSaveSlot(${i})">删除</button>
                    </div>
                `;
            } catch (e) {
                slot.innerHTML = `
                    <div class="setup-save-slot-header">
                        <div class="setup-save-slot-title">存档 ${i}</div>
                    </div>
                    <div class="setup-save-slot-info" style="color: #ff9500;">
                        ⚠️ 存档数据损坏
                    </div>
                    <div class="setup-save-slot-actions">
                        <button class="btn-secondary" onclick="deleteSaveSlot(${i})">删除</button>
                    </div>
                `;
            }
        } else {
            slot.innerHTML = `
                <div class="setup-save-slot-header">
                    <div class="setup-save-slot-title">存档 ${i}</div>
                </div>
                <div class="setup-save-slot-info">
                    [空]
                </div>
            `;
        }

        container.appendChild(slot);
    }

    // 自动存档槽
    const autoRaw = localStorage.getItem('apartment_sim_autosave');
    const autoSlot = document.createElement('div');
    if (autoRaw) {
        try {
            const saveData = JSON.parse(autoRaw);
            const timestamp = saveData.saveTimestamp || '未知时间';
            const charCount = saveData.configSnapshot?.characters?.length
                            ?? Object.keys(saveData.gameState?.characters || {}).length;
            const roomCount = saveData.configSnapshot?.rooms?.length
                            ?? Object.keys(saveData.gameState?.apartment?.rooms || {}).length;
            const gameTime = saveData.gameState?.currentTime || saveData.configSnapshot?.startTime;
            const gameTimeStr = gameTime ? formatGameTime(new Date(gameTime)) : '未知';
            const dayCount = saveData.gameState?.dayCount || 1;
            const charLines = saveData.gameState?.characters
                ? Object.values(saveData.gameState.characters)
                    .map(c => `<span style="color:${c.color||'#ccc'}">${c.name}</span>：${c.currentAction || '未知'}`)
                    .join('<br>')
                : '无角色信息';

            autoSlot.className = 'setup-save-slot';
            autoSlot.innerHTML = `
                <div class="setup-save-slot-header">
                    <div class="setup-save-slot-title">💾 自动存档</div>
                    <div class="setup-save-slot-time">${timestamp}</div>
                </div>
                <div class="setup-save-slot-info">
                    <strong>游戏时间:</strong> ${gameTimeStr}<br>
                    <strong>游戏天数:</strong> ${dayCount}<br>
                    <strong>角色 (${charCount}):</strong><br>
                    <div style="margin: 4px 0 4px 8px; font-size: 11px; line-height: 1.7;">${charLines}</div>
                    <strong>房间:</strong> ${roomCount} 个
                </div>
                <div class="setup-save-slot-actions">
                    <button onclick="loadAutoSaveToSetup()">读取此存档</button>
                </div>
            `;
        } catch (e) {
            autoSlot.className = 'setup-save-slot';
            autoSlot.innerHTML = `
                <div class="setup-save-slot-header">
                    <div class="setup-save-slot-title">💾 自动存档</div>
                </div>
                <div class="setup-save-slot-info" style="color: #ff9500;">⚠️ 存档数据损坏</div>
            `;
        }
    } else {
        autoSlot.className = 'setup-save-slot empty';
        autoSlot.innerHTML = `
            <div class="setup-save-slot-header">
                <div class="setup-save-slot-title">💾 自动存档</div>
            </div>
            <div class="setup-save-slot-info">[暂无自动存档]</div>
        `;
    }
    container.appendChild(autoSlot);
}

// 从存档读取配置到设置面板
function loadSaveSlotToSetup(slotIndex) {
    const saveKey = `apartment_sim_save_${slotIndex}`;
    const rawData = localStorage.getItem(saveKey);

    if (!rawData) {
        alert('该存档槽位为空');
        return;
    }

    try {
        const saveData = JSON.parse(rawData);

        // 优先使用 configSnapshot，其次使用 gameState 中的数据
        if (saveData.configSnapshot) {
            setupPanelState.currentConfig = deepClone(saveData.configSnapshot);
            setupPanelState.selectedPreset = null;
        } else if (saveData.gameState) {
            // 从旧存档格式恢复
            const gameState = saveData.gameState;
            const newConfig = deepClone(GAME_PRESETS['default_threegirls'].config);

            // 尝试恢复角色信息
            if (gameState.characters) {
                newConfig.characters = [];
                for (const [id, char] of Object.entries(gameState.characters)) {
                    newConfig.characters.push({
                        id: id,
                        name: char.name,
                        color: char.color || '#ff00ff',
                        gender: char.gender,
                        age: char.age,
                        personality: char.personality,
                        career: char.career,
                        monthlyIncome: char.monthlyIncome,
                        careerPrompt: char.careerPrompt || '',
                        skills: [...(char.skills || [])],
                        initialStats: {
                            mood: char.mood,
                            energy: char.energy,
                            satiety: char.satiety,
                            hygiene: char.hygiene,
                            wallet: char.wallet
                        },
                        initialRelationships: deepClone(char.relationship || {}),
                        bedroomId: char.bedroomId || `bedroom_${newConfig.characters.length}`
                    });
                }
            }

            setupPanelState.currentConfig = newConfig;
            setupPanelState.selectedPreset = null;
        }

        // 保存游戏状态信息（用于恢复游戏进度）
        setupPanelState.loadedGameState = saveData.gameState ? deepClone(saveData.gameState) : null;
        syncSetupRelationshipValuesFromConfig();

        // 刷新所有编辑器
        renderPresetCards();
        renderCharacterEditor();
        renderRoomEditor();
        syncWorldTabUI();

        // 切换到预设标签页并提示用户
        document.querySelector('[data-tab="presets"]').click();
        addLog(`✅ 已从存档 ${slotIndex} 读取配置`, 'system');
    } catch (e) {
        alert(`读取存档失败: ${e.message}`);
    }
}

// 读取自动存档到设置面板
function loadAutoSaveToSetup() {
    const rawData = localStorage.getItem('apartment_sim_autosave');
    if (!rawData) { alert('暂无自动存档'); return; }

    try {
        const saveData = JSON.parse(rawData);
        if (saveData.configSnapshot) {
            setupPanelState.currentConfig = deepClone(saveData.configSnapshot);
            setupPanelState.selectedPreset = null;
        }
        setupPanelState.loadedGameState = saveData.gameState ? deepClone(saveData.gameState) : null;
        syncSetupRelationshipValuesFromConfig();
        renderPresetCards();
        renderCharacterEditor();
        renderRoomEditor();
        syncWorldTabUI();
        document.querySelector('[data-tab="presets"]').click();
        addLog('✅ 已从自动存档读取配置', 'system');
    } catch (e) {
        alert(`读取自动存档失败: ${e.message}`);
    }
}

// 删除存档
function deleteSaveSlot(slotIndex) {
    if (!confirm(`确定要删除存档 ${slotIndex} 吗？`)) return;

    const saveKey = `apartment_sim_save_${slotIndex}`;
    localStorage.removeItem(saveKey);
    renderSaveSlots();
}

// 设置导入功能
function setupLoadDataListeners() {
    const importBtn = document.getElementById('setup-import-btn');
    const importInput = document.getElementById('setup-import-input');
    const confirmBtn = document.getElementById('confirm-import-btn');

    if (importBtn && importInput) {
        importBtn.addEventListener('click', () => importInput.click());
    }

    if (importInput) {
        importInput.addEventListener('change', (e) => previewImportFile(e));
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmImportData);
    }
}

// 预览导入的文件
function previewImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const content = e.target.result;
            let importData;

            // 尝试解析 JSON
            try {
                importData = JSON.parse(content);
            } catch {
                // 如果不是 JSON，尝试从文本中提取
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    throw new Error('无法识别文件格式');
                }
                importData = JSON.parse(jsonMatch[0]);
            }

            console.log('导入的数据对象键:', Object.keys(importData));

            // 识别文件格式：是多个存档汇总还是单个存档
            const hasApartmentSimKey = Object.keys(importData).some(key => key.startsWith('apartment_sim_save_'));

            // 显示预览
            if (hasApartmentSimKey) {
                // 多个存档汇总，用第一个用于预览，但保存所有存档
                console.log('检测到多个存档格式');
                const firstKey = Object.keys(importData).find(key => key.startsWith('apartment_sim_save_'));
                const firstSave = importData[firstKey];
                console.log('用于预览的存档:', firstKey);
                showImportPreview(firstSave);
                window.pendingImportData = importData; // 保存所有存档
            } else {
                // 单个存档
                console.log('检测到单个存档格式');
                showImportPreview(importData);
                window.pendingImportData = importData;
            }
        } catch (err) {
            console.error('previewImportFile error:', err);
            alert(`文件读取失败: ${err.message}`);
        }
    };
    reader.readAsText(file);
}

// 显示导入预览
function showImportPreview(data) {
    const previewDiv = document.getElementById('import-preview');
    const previewContent = document.getElementById('import-preview-content');

    if (!previewDiv || !previewContent) {
        console.error('预览容器不存在');
        return;
    }

    console.log('showImportPreview 接收的数据:', data);
    console.log('数据的键:', Object.keys(data || {}));

    let previewHtml = '';

    // 检测配置快照
    if (data && data.configSnapshot) {
        const config = data.configSnapshot;
        previewHtml += `
            <div class="import-preview-item">
                <div class="import-preview-label">📋 配置快照</div>
                <div class="import-preview-value">
                    角色: ${config.characters?.length || 0} 个<br>
                    房间: ${config.rooms?.length || 0} 个
                </div>
            </div>
        `;
    } else if (data && data.gameState) {
        const gs = data.gameState;
        const charCount = gs.characters ? Object.keys(gs.characters).length : 0;
        const roomCount = gs.apartment?.rooms ? Object.keys(gs.apartment.rooms).length : 0;

        // 获取游戏时间
        const gameTime = gs.currentTime ? new Date(gs.currentTime).toLocaleString('zh-CN') : '未知';

        previewHtml += `
            <div class="import-preview-item">
                <div class="import-preview-label">📊 游戏状态</div>
                <div class="import-preview-value">
                    游戏时间: ${gameTime}<br>
                    游戏天数: ${gs.dayCount || 1}<br>
                    角色: ${charCount} 个<br>
                    房间: ${roomCount} 个
                </div>
            </div>
        `;
    } else {
        // 如果既不是配置快照也不是游戏状态，显示错误信息
        console.warn('数据不包含有效的 configSnapshot 或 gameState');
        previewHtml = `
            <div class="import-preview-item">
                <div class="import-preview-label" style="color: #ff9500;">⚠️ 文件格式错误</div>
                <div class="import-preview-value">
                    该文件不是有效的游戏配置或存档文件。<br>
                    请确保导入的是来自本游戏的配置文件或存档。<br>
                    <small style="color: #666; margin-top: 8px;">调试信息: ${data ? Object.keys(data).join(', ') : '空对象'}</small>
                </div>
            </div>
        `;
        previewContent.innerHTML = previewHtml;
        previewDiv.style.display = 'block';
        return;
    }

    // 显示角色列表
    if (data && (data.configSnapshot?.characters || data.gameState?.characters)) {
        const chars = data.configSnapshot?.characters || Object.values(data.gameState.characters || {});
        previewHtml += `
            <div class="import-preview-item">
                <div class="import-preview-label">👥 角色列表</div>
                <div class="import-preview-value">
                    ${chars.map(c => `• ${c.name || c} (${c.career || '未知'})`).join('<br>')}
                </div>
            </div>
        `;
    }

    previewContent.innerHTML = previewHtml;
    previewDiv.style.display = 'block';
}

// 确认导入数据
function confirmImportData() {
    if (!window.pendingImportData) {
        alert('没有待导入的数据');
        return;
    }

    try {
        const data = window.pendingImportData;

        // 检查是否是多个存档汇总格式
        const isMultipleSaves = Object.keys(data).some(key => key.startsWith('apartment_sim_save_'));

        if (isMultipleSaves) {
            // 导入多个存档，直接保存到 localStorage
            console.log('导入多个存档汇总');
            let importCount = 0;
            for (const key in data) {
                if (key.startsWith('apartment_sim_save_')) {
                    localStorage.setItem(key, JSON.stringify(data[key]));
                    importCount++;
                    console.log(`已导入 ${key}`);
                }
            }

            // 加载第一个存档到编辑面板（用于预览）
            const firstKey = Object.keys(data).find(k => k.startsWith('apartment_sim_save_'));
            const firstSave = data[firstKey];

            if (firstSave.configSnapshot) {
                setupPanelState.currentConfig = deepClone(firstSave.configSnapshot);
                if (firstSave.gameState) {
                    setupPanelState.loadedGameState = deepClone(firstSave.gameState);
                }
            } else if (firstSave.gameState) {
                // 从游戏状态重建配置
                const gs = firstSave.gameState;
                const newConfig = deepClone(GAME_PRESETS['default_threegirls'].config);

                if (gs.characters) {
                    newConfig.characters = Object.values(gs.characters).map((char, idx) => ({
                        id: char.id || `char_${idx}`,
                        name: char.name,
                        color: char.color || '#ff00ff',
                        gender: char.gender,
                        age: char.age,
                        personality: char.personality,
                        career: char.career,
                        monthlyIncome: char.monthlyIncome,
                        careerPrompt: char.careerPrompt || '',
                        skills: [...(char.skills || [])],
                        initialStats: {
                            mood: char.mood || 70,
                            energy: char.energy || 80,
                            satiety: char.satiety || 60,
                            hygiene: char.hygiene || 80,
                            wallet: char.wallet || 3000
                        },
                        initialRelationships: deepClone(char.relationship || {}),
                        bedroomId: char.bedroomId || `bedroom_${idx}`
                    }));
                }
                setupPanelState.currentConfig = newConfig;
                setupPanelState.loadedGameState = deepClone(gs);
            }

            setupPanelState.selectedPreset = null;
            syncSetupRelationshipValuesFromConfig();

            // 刷新编辑器和存档显示
            renderPresetCards();
            renderCharacterEditor();
            renderRoomEditor();
            renderSaveSlots();
            syncWorldTabUI();

            // 隐藏预览
            document.getElementById('import-preview').style.display = 'none';
            document.getElementById('setup-import-input').value = '';

            alert(`✅ 成功导入 ${importCount} 个存档！`);
        } else {
            // 单个存档
            if (data.configSnapshot) {
                setupPanelState.currentConfig = deepClone(data.configSnapshot);
                if (data.gameState) {
                    setupPanelState.loadedGameState = deepClone(data.gameState);
                }
            } else if (data.gameState) {
                // 从游戏状态重建配置
                const gs = data.gameState;
                const newConfig = deepClone(GAME_PRESETS['default_threegirls'].config);

                if (gs.characters) {
                    newConfig.characters = Object.values(gs.characters).map((char, idx) => ({
                        id: char.id || `char_${idx}`,
                        name: char.name,
                        color: char.color || '#ff00ff',
                        gender: char.gender,
                        age: char.age,
                        personality: char.personality,
                        career: char.career,
                        monthlyIncome: char.monthlyIncome,
                        careerPrompt: char.careerPrompt || '',
                        skills: [...(char.skills || [])],
                        initialStats: {
                            mood: char.mood || 70,
                            energy: char.energy || 80,
                            satiety: char.satiety || 60,
                            hygiene: char.hygiene || 80,
                            wallet: char.wallet || 3000
                        },
                        initialRelationships: deepClone(char.relationship || {}),
                        bedroomId: char.bedroomId || `bedroom_${idx}`
                    }));
                }

                setupPanelState.currentConfig = newConfig;
                setupPanelState.loadedGameState = deepClone(gs);
            } else {
                throw new Error('文件格式不正确，无法识别的数据');
            }

            setupPanelState.selectedPreset = null;
            syncSetupRelationshipValuesFromConfig();

            // 保存到第1个存档槽位
            const saveData = {
                configSnapshot: deepClone(setupPanelState.currentConfig),
                gameState: setupPanelState.loadedGameState || {},
                saveTimestamp: new Date().toLocaleString('zh-CN')
            };

            localStorage.setItem('apartment_sim_save_1', JSON.stringify(saveData));

            // 刷新编辑器和存档显示
            renderPresetCards();
            renderCharacterEditor();
            renderRoomEditor();
            renderSaveSlots();
            syncWorldTabUI();

            // 隐藏预览
            document.getElementById('import-preview').style.display = 'none';
            document.getElementById('setup-import-input').value = '';

            alert('✅ 配置导入成功！已保存到存档位 1');
        }
    } catch (e) {
        console.error('导入失败:', e);
        alert(`导入失败: ${e.message}`);
    }
}

// 从设置面板开始游戏
function startGameFromSetup() {
    // 应用配置
    activeConfig = setupPanelState.currentConfig;
    gameState = initGameStateFromConfig(activeConfig);

    // 如果有读取的存档游戏状态，则恢复进度
    if (setupPanelState.loadedGameState) {
        const loadedState = setupPanelState.loadedGameState;

        // 恢复游戏时间和进度
        gameState.startTime = new Date(loadedState.startTime);
        gameState.currentTime = new Date(loadedState.currentTime);
        gameState.dayCount = loadedState.dayCount;
        gameState.timeMultiplier = loadedState.timeMultiplier;

        // 恢复角色状态（全量恢复，包含 currentAction、relationship 等所有字段）
        // 覆盖前先保存 config 里的静态描述字段，旧存档可能没有这些字段
        for (const charId in loadedState.characters) {
            if (gameState.characters[charId]) {
                const configBackup = {
                    careerPrompt: gameState.characters[charId].careerPrompt,
                    personality:  gameState.characters[charId].personality,
                    career:       gameState.characters[charId].career,
                    color:        gameState.characters[charId].color,
                };
                gameState.characters[charId] = deepClone(loadedState.characters[charId]);
                const char = gameState.characters[charId];
                if (!char.careerPrompt) char.careerPrompt = configBackup.careerPrompt || '';
                if (!char.personality)  char.personality  = configBackup.personality  || '';
                if (!char.career)       char.career       = configBackup.career       || '';
                if (!char.color)        char.color        = configBackup.color        || '#ff00ff';
            }
        }

        // 兼容性检查与 Date 字段转换（与 loadGame 保持一致）
        for (const char of Object.values(gameState.characters)) {
            if (char.status === undefined) char.status = 'awake';
            if (char.isSleeping === undefined) char.isSleeping = char.status === 'sleeping';
            if (char.isSleeping && char.status !== 'sleeping') char.status = 'sleeping';
            if (char.status === 'sleeping' && !char.isSleeping) char.isSleeping = true;
            if (char.energy <= 0) {
                char.isSleeping = false;
                char.status = 'unconscious';
                char.currentAction = '晕倒中';
            } else if (char.status === 'unconscious' && char.energy >= 30) {
                char.status = 'awake';
            }
            if (char.status === 'sleeping') {
                char.currentAction = '在熟睡中...';
                if (!char.sleepDuration) char.sleepDuration = 0;
                char.sleepStartTime = char.sleepStartTime ? new Date(char.sleepStartTime) : gameState.currentTime;
            }
            if (char.lastDisturbance) char.lastDisturbance = new Date(char.lastDisturbance);
            if (char.lastRestTime) char.lastRestTime = new Date(char.lastRestTime);
            if (char.lastWorkCheckTime) char.lastWorkCheckTime = new Date(char.lastWorkCheckTime);
        }

        // 恢复房间状态和最后行动时间
        if (loadedState.apartment) gameState.apartment = loadedState.apartment;
        gameState.lastActionTime = loadedState.lastActionTime ? new Date(loadedState.lastActionTime) : null;
        gameState.dailyInteractions = loadedState.dailyInteractions || [];
        gameState.coupleStatus = loadedState.coupleStatus || {};

        // 清除临时存档状态
        setupPanelState.loadedGameState = null;
    }

    // 应用关系度值到 gameState
    const chars = setupPanelState.currentConfig.characters || [];
    for (let i = 0; i < chars.length; i++) {
        for (let j = 0; j < chars.length; j++) {
            if (i === j) continue;
            const relKey = getSetupRelationshipKey(chars[i].id, chars[j].id);
            const relValue = setupPanelState.relationshipValues[relKey];
            const char1 = gameState.characters[chars[i].id];
            const char2 = gameState.characters[chars[j].id];
            if (char1 && char2) {
                if (!char1.relationship || typeof char1.relationship !== 'object') {
                    char1.relationship = {};
                }
                char1.relationship[chars[j].id] = relValue ?? 0;
            }
        }
    }

    // 获取API Key
    const apiKeyInput = document.getElementById('setup-api-key');
    gameState.apiKey = apiKeyInput.value.trim();
    if (gameState.apiKey) localStorage.setItem('deepseek_api_key', gameState.apiKey);

    // 同步API Key到右侧面板的输入框
    ui.apiKeyInput.value = gameState.apiKey;
    updateApiKeyStatus();

    // 调试日志
    if (gameState.apiKey) {
        console.log('✓ API Key 已从设置面板读取并同步到游戏控制面板');
    } else {
        console.log('⚠ 未提供 API Key，将使用模拟模式');
    }

    // 隐藏设置面板
    const overlay = document.getElementById('setup-overlay');
    overlay.classList.add('hidden');

    // 刷新UI和开始游戏
    updateUI();
    applyCharacterColors();
    addLog("公寓生活模拟器已启动！");
    addLog(`已加载配置：${setupPanelState.selectedPreset ?? '自定义配置'}`);

    // 直接启动游戏循环（避免按钮文字为"重置模拟"时误触 resetGame）
    ui.startBtn.innerText = "重置模拟";
    ui.startBtn.disabled = false;
    ui.apiKeyInput.disabled = true;
    ui.pauseBtn.disabled = false;
    gameLoop();
}

// 页面加载完成时初始化设置面板
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSetupPanel);
} else {
    initSetupPanel();
}

// ===== 游戏中编辑抽屉系统（阶段10）=====

let drawerState = {
    isOpen: false
};

// 初始化编辑抽屉
function initEditDrawer() {
    const openBtn = document.getElementById('open-editor-btn');
    const closeBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('edit-drawer');

    openBtn.addEventListener('click', () => toggleDrawer());
    closeBtn.addEventListener('click', () => toggleDrawer());

    // 标签页导航
    const drawerTabBtns = document.querySelectorAll('.drawer-tab-btn');
    const drawerContents = document.querySelectorAll('.drawer-content');

    drawerTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.drawerTab;

            drawerTabBtns.forEach(b => b.classList.remove('active'));
            drawerContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`drawer-${tabName}`).classList.add('active');

            // 刷新内容
            if (tabName === 'chars') {
                renderDrawerCharacters();
            } else if (tabName === 'rooms') {
                renderDrawerRooms();
            } else if (tabName === 'world') {
                renderDrawerWorld();
            }
        });
    });

    // 初始渲染
    renderDrawerCharacters();
}

// 切换抽屉
function toggleDrawer() {
    const drawer = document.getElementById('edit-drawer');
    drawerState.isOpen = !drawerState.isOpen;

    if (drawerState.isOpen) {
        drawer.classList.remove('hidden');
        drawer.classList.add('visible');
        renderDrawerCharacters();
    } else {
        drawer.classList.remove('visible');
        setTimeout(() => {
            drawer.classList.add('hidden');
        }, 300);
    }
}

// 渲染抽屉中的角色编辑器
function renderDrawerCharacters() {
    const container = document.getElementById('drawer-chars');
    container.innerHTML = '';

    for (const [charId, char] of Object.entries(gameState.characters)) {
        const item = document.createElement('div');
        item.className = 'drawer-char-item';

        // 构建技能标签
        let skillsHtml = '<div class="skills-container">';
        if (char.skills && char.skills.length > 0) {
            char.skills.forEach((skill, idx) => {
                skillsHtml += `<span class="skill-tag" onclick="removeSkill('${charId}', ${idx})">${skill} ✕</span>`;
            });
        }
        skillsHtml += '</div>';

        // 构建关系值显示
        let relationsHtml = '';
        for (const [otherId, otherChar] of Object.entries(gameState.characters)) {
            if (otherId !== charId && char.relationship && char.relationship[otherId] !== undefined) {
                const relValue = char.relationship[otherId];
                const coupleInfo = getCoupleStatus(charId, otherId);
                const badge = coupleInfo ? `<span style="margin-left:6px;font-size:0.85em;">${getCoupleStatusLabel(coupleInfo.status)}</span>` : '';
                relationsHtml += `
                    <div class="drawer-field">
                        <div class="relation-display">
                            <span>与 ${otherChar.name}：</span>
                            <input type="range" min="-100" max="100" value="${relValue}"
                                   oninput="updateRelationship('${charId}', '${otherId}', this.value); this.nextElementSibling.textContent = this.value"
                                   style="flex: 1; margin: 0 8px; cursor: pointer;" />
                            <span class="relation-value">${relValue}</span>${badge}
                        </div>
                    </div>
                `;
            }
        }

        item.innerHTML = `
            <div class="drawer-item-header">
                <span>${char.name}</span>
                <span style="color: ${char.color};">●</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
                <div class="drawer-field">
                    <div class="drawer-field-label">👤 性别</div>
                    <select onchange="updateDrawerCharField('${charId}', 'gender', this.value)" style="width: 100%; padding: 6px;">
                        <option value="male" ${char.gender === 'male' ? 'selected' : ''}>男</option>
                        <option value="female" ${char.gender === 'female' ? 'selected' : ''}>女</option>
                    </select>
                </div>
                <div class="drawer-field">
                    <div class="drawer-field-label">🎂 年龄</div>
                    <input type="number" value="${char.age || 20}" oninput="updateDrawerCharField('${charId}', 'age', parseInt(this.value))" min="1" max="100" style="width: 100%; padding: 6px;" />
                </div>
            </div>
            <div class="drawer-field">
                <div class="drawer-field-label">🎨 颜色</div>
                <div style="display: flex; gap: 6px;">
                    <input type="color" value="${char.color}"
                           oninput="updateCharColorLive('${charId}', this.value)"
                           onchange="updateCharColor('${charId}', this.value)"
                           style="width: 40px; padding: 2px;" />
                    <input type="text" value="${char.color}" data-color-text="${charId}"
                           onchange="updateCharColor('${charId}', this.value)"
                           style="flex: 1;" />
                </div>
            </div>
            <div class="drawer-field">
                <div class="drawer-field-label">💼 职业</div>
                <input type="text" value="${char.career || ''}" oninput="updateDrawerCharField('${charId}', 'career', this.value)" style="width: 100%;" />
            </div>
            <div class="drawer-field">
                <div class="drawer-field-label">🧠 性格描述</div>
                <textarea oninput="updateDrawerCharField('${charId}', 'personality', this.value)" style="width: 100%; height: 70px; resize: vertical; box-sizing: border-box;">${char.personality || ''}</textarea>
            </div>
            <div class="drawer-field">
                <div class="drawer-field-label">📋 工作提示</div>
                <textarea oninput="updateDrawerCharField('${charId}', 'careerPrompt', this.value)" style="width: 100%; height: 70px; resize: vertical; box-sizing: border-box;">${char.careerPrompt || ''}</textarea>
            </div>
            <div class="drawer-field">
                <div class="drawer-field-label">📚 技能</div>
                ${skillsHtml}
                <input type="text" placeholder="输入新技能，按Enter添加" class="skills-input"
                       onkeypress="if(event.key==='Enter') addSkill('${charId}', this.value); this.value = '';" />
            </div>
            <div class="drawer-field">
                <div class="drawer-field-label">🎒 背包 (${(char.inventory || []).length})</div>
                <div style="margin: 4px 0; font-size: 11px; color: #888;">
                    ${(char.inventory || []).length === 0
                        ? '<span style="color:#555;">（空）</span>'
                        : (char.inventory || []).map((itm, idx) => `
                        <div style="display: flex; justify-content: space-between; padding: 2px 0;">
                            <span>${itm.name}${(itm.quantity||1)>1?` <span style="color:#ffb84d;font-size:10px;">×${itm.quantity}</span>`:''}</span>
                            <button onclick="removeInventoryItem('${charId}', ${idx})" style="background: none; border: none; color: #ff3333; cursor: pointer; font-size: 10px;">移除</button>
                        </div>`).join('')
                    }
                </div>
                <input type="text" placeholder="手动添加物品，按Enter"
                       onkeypress="if(event.key==='Enter'&&this.value.trim()){addInventoryItem('${charId}',this.value.trim());this.value='';}"
                       style="margin-top: 4px;" />
            </div>
            ${relationsHtml}
        `;
        container.appendChild(item);
    }
}

// 抽屉背包操作
function addInventoryItem(charId, itemName) {
    const char = gameState.characters[charId];
    if (!char) return;
    addToInventory(char, itemName);
    renderDrawerCharacters();
}

function removeInventoryItem(charId, idx) {
    const char = gameState.characters[charId];
    if (!char || !char.inventory) return;
    char.inventory.splice(idx, 1);
    renderDrawerCharacters();
}

// 更新抽屉中的角色字段（性别、年龄等）
function updateDrawerCharField(charId, field, value) {
    const char = gameState.characters[charId];
    if (char) {
        char[field] = value;
        // 同步到配置
        const configChar = activeConfig.characters.find(c => c.id === charId);
        if (configChar) configChar[field] = value;

        // 文本输入字段不重渲染，避免打断 IME 输入和频繁 DOM 重建
        const textFields = ['personality', 'careerPrompt', 'career'];
        if (!textFields.includes(field)) {
            renderDrawerCharacters();
        }
    }
}

// ===== 统一的颜色管理系统 =====
// 单一入口：设置角色颜色并同步到所有位置
function setCharacterColor(charId, newColor, options = {}) {
    const char = gameState.characters[charId];
    if (!char) return false;

    // 验证颜色格式
    if (!newColor.match(/^#[0-9a-fA-F]{6}$/)) {
        console.warn(`Invalid color format: ${newColor}`);
        return false;
    }

    char.color = newColor;

    // 同步到activeConfig
    const configChar = activeConfig.characters.find(c => c.id === charId);
    if (configChar) configChar.color = newColor;

    // 应用颜色到UI
    applyCharacterColors();

    // 可选的额外操作
    if (options.updateTextInput) {
        const textInput = document.querySelector(`[data-color-text="${charId}"]`);
        if (textInput) textInput.value = newColor;
    }

    if (options.rerender) {
        renderDrawerCharacters();
    }

    return true;
}

// 旧接口保留（为了兼容性，但内部调用新函数）
function updateCharColorLive(charId, newColor) {
    setCharacterColor(charId, newColor, { updateTextInput: true });
}

function updateCharColor(charId, newColor) {
    setCharacterColor(charId, newColor, { updateTextInput: true, rerender: true });
}

// 添加技能
function addSkill(charId, skill) {
    if (!skill.trim()) return;
    const char = gameState.characters[charId];
    if (char && !char.skills.includes(skill)) {
        char.skills.push(skill);
        // 同步到配置
        const configChar = activeConfig.characters.find(c => c.id === charId);
        if (configChar && !configChar.skills.includes(skill)) {
            configChar.skills.push(skill);
        }
        addLog(`${char.name} 获得了新技能：【${skill}】`, 'system', char.name);
        renderDrawerCharacters();
    }
}

// 删除技能
function removeSkill(charId, skillIdx) {
    const char = gameState.characters[charId];
    if (char && char.skills[skillIdx]) {
        const skill = char.skills[skillIdx];
        char.skills.splice(skillIdx, 1);
        // 同步到配置
        const configChar = activeConfig.characters.find(c => c.id === charId);
        if (configChar) {
            const cfgIdx = configChar.skills.indexOf(skill);
            if (cfgIdx >= 0) configChar.skills.splice(cfgIdx, 1);
        }
        addLog(`${char.name} 失去了技能：【${skill}】`, 'system', char.name);
        renderDrawerCharacters();
    }
}

// 更新角色间关系值
function updateRelationship(fromId, toId, value) {
    const char = gameState.characters[fromId];
    if (char && char.relationship) {
        char.relationship[toId] = parseInt(value);
        // 同步到配置
        const configChar = activeConfig.characters.find(c => c.id === fromId);
        if (configChar && configChar.initialRelationships) {
            configChar.initialRelationships[toId] = parseInt(value);
        }
        // 只在完成拖动时重新渲染（不是每次 oninput 都渲染）
        // 实时修改已同步到状态，AI 调用时会用到最新值
    }
}

// 渲染抽屉中的房间编辑器
function renderDrawerRooms() {
    const container = document.getElementById('drawer-rooms');
    container.innerHTML = '';

    for (const [roomId, room] of Object.entries(gameState.apartment.rooms)) {
        const item = document.createElement('div');
        item.className = 'drawer-room-item';

        item.innerHTML = `
            <div class="drawer-item-header">
                <span>${room.name}</span>
            </div>
            <div class="drawer-field">
                <div class="drawer-field-label">📍 房间ID</div>
                <input type="text" value="${roomId}" readonly style="background: #333; cursor: not-allowed;" />
            </div>
            <div class="drawer-field">
                <div class="drawer-field-label">📝 描述</div>
                <input type="text" value="${room.description}" onchange="updateRoomDescription('${roomId}', this.value)" placeholder="房间描述" />
            </div>
            <div class="drawer-field">
                <div class="drawer-field-label">📦 物品 (${(room.items || []).length})</div>
                <div style="margin: 4px 0; font-size: 11px; color: #888;">
                    ${(room.items || []).map((item, idx) => `
                        <div style="display: flex; justify-content: space-between; padding: 2px 0;">
                            <span>${item}</span>
                            <button onclick="removeRoomItem('${roomId}', ${idx})" style="background: none; border: none; color: #ff3333; cursor: pointer; font-size: 10px;">删除</button>
                        </div>
                    `).join('')}
                </div>
                <input type="text" placeholder="输入新物品，按Enter添加"
                       onkeypress="if(event.key==='Enter') addRoomItem('${roomId}', this.value); this.value = '';"
                       style="margin-top: 4px;" />
            </div>
        `;
        container.appendChild(item);
    }
}

// 更新房间描述
function updateRoomDescription(roomId, desc) {
    const room = gameState.apartment.rooms[roomId];
    if (room) {
        room.description = desc;
    }
}

// 渲染世界观编辑器
function renderDrawerWorld() {
    const container = document.getElementById('drawer-world');
    const sceneName = activeConfig.sceneName || '公寓';
    const worldSetting = activeConfig.worldSetting || '';
    const currentTime = gameState.currentTime
        ? new Date(gameState.currentTime).toISOString().slice(0, 16)
        : (activeConfig.startTime || '2025-03-04T08:00').slice(0, 16);

    container.innerHTML = `
        <div style="padding: 12px;">
            <div style="color: #aaa; font-size: 12px; margin-bottom: 6px;">场景名称（替换 AI 提示词中的"公寓"）</div>
            <input
                type="text"
                id="drawer-scene-name"
                placeholder="公寓"
                style="width: 100%; box-sizing: border-box; background: #0d0d0d; color: #e0e0e0; border: 1px solid #333; border-radius: 4px; padding: 8px 10px; font-size: 12px;"
            />

            <div style="color: #aaa; font-size: 12px; margin: 14px 0 6px;">故事背景描述（直接注入 AI 提示词）</div>
            <textarea
                id="drawer-world-setting"
                rows="6"
                placeholder="留空则默认现代都市。可自由描述世界观，例如：赛博朋克近未来城市、架空古风仙侠世界…"
                style="width: 100%; box-sizing: border-box; background: #0d0d0d; color: #e0e0e0; border: 1px solid #333; border-radius: 4px; padding: 10px; font-size: 12px; resize: vertical; font-family: inherit;"
            ></textarea>

            <div style="color: #aaa; font-size: 12px; margin: 14px 0 6px;">游戏当前时间（修改后下次行动生效）</div>
            <input
                type="datetime-local"
                id="drawer-start-time"
                style="background: #0d0d0d; color: #e0e0e0; border: 1px solid #333; border-radius: 4px; padding: 8px 10px; font-size: 12px; width: 100%; box-sizing: border-box;"
            />

            <div style="color: #aaa; font-size: 12px; margin: 14px 0 6px;">NPC 配角</div>
            <div id="drawer-npc-list"></div>
            <button onclick="addDrawerNPC()" style="margin-top: 6px; padding: 5px 12px; background: #1a3a1a; color: #00ff41; border: 1px solid #00ff41; border-radius: 4px; cursor: pointer; font-size: 11px;">+ 添加配角</button>

            <div style="color: #aaa; font-size: 12px; margin: 18px 0 8px; border-top: 1px solid #222; padding-top: 14px;">日志字体大小</div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <input
                    type="range"
                    id="drawer-log-fontsize"
                    min="10" max="22" step="1"
                    style="flex: 1; accent-color: #00ff41;"
                    oninput="applyLogFontSize(this.value); document.getElementById('drawer-log-fontsize-val').textContent = this.value + 'px';"
                />
                <span id="drawer-log-fontsize-val" style="color: #00ff41; font-size: 12px; min-width: 32px; text-align: right;"></span>
            </div>

            <button
                onclick="applyDrawerWorldSetting()"
                style="margin-top: 14px; width: 100%; padding: 9px; background: #00a060; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: bold;"
            >应用</button>
        </div>
    `;
    document.getElementById('drawer-scene-name').value = sceneName;
    document.getElementById('drawer-world-setting').value = worldSetting;
    document.getElementById('drawer-start-time').value = currentTime;
    const savedSize = parseInt(localStorage.getItem('log_font_size') || '14');
    const slider = document.getElementById('drawer-log-fontsize');
    if (slider) { slider.value = savedSize; document.getElementById('drawer-log-fontsize-val').textContent = savedSize + 'px'; }
    renderDrawerNPCList();
}

function renderDrawerNPCList() {
    const container = document.getElementById('drawer-npc-list');
    if (!container) return;
    const npcs = activeConfig.npcs || [];
    if (npcs.length === 0) {
        container.innerHTML = '<div style="color:#555; font-size:11px; padding:4px 0;">暂无配角。</div>';
        return;
    }
    container.innerHTML = npcs.map((npc, idx) => `
        <div style="background:#0d0d0d; border:1px solid #2a2a2a; border-radius:3px; padding:8px; margin-bottom:6px;">
            <div style="display:flex; gap:5px; margin-bottom:5px;">
                <input type="text" value="${escapeAttr(npc.name)}" placeholder="名字" oninput="updateDrawerNPC(${idx},'name',this.value)"
                    style="flex:1; background:#1a1a1a; color:#e0e0e0; border:1px solid #333; border-radius:3px; padding:4px 7px; font-size:11px;" />
                <input type="text" value="${escapeAttr(npc.role)}" placeholder="身份" oninput="updateDrawerNPC(${idx},'role',this.value)"
                    style="flex:1; background:#1a1a1a; color:#e0e0e0; border:1px solid #333; border-radius:3px; padding:4px 7px; font-size:11px;" />
                <button onclick="removeDrawerNPC(${idx})" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:13px; padding:0 3px;">✕</button>
            </div>
            <input type="text" value="${escapeAttr(npc.note)}" placeholder="备注（关系、特点…）" oninput="updateDrawerNPC(${idx},'note',this.value)"
                style="width:100%; box-sizing:border-box; background:#1a1a1a; color:#e0e0e0; border:1px solid #333; border-radius:3px; padding:4px 7px; font-size:11px;" />
        </div>
    `).join('');
}

function addDrawerNPC() {
    if (!activeConfig.npcs) activeConfig.npcs = [];
    activeConfig.npcs.push({ id: `npc_${Date.now()}`, name: '', role: '', note: '' });
    renderDrawerNPCList();
}

function removeDrawerNPC(idx) {
    activeConfig.npcs.splice(idx, 1);
    renderDrawerNPCList();
}

function updateDrawerNPC(idx, field, value) {
    if (activeConfig.npcs?.[idx]) {
        activeConfig.npcs[idx][field] = value;
    }
}

function applyDrawerWorldSetting() {
    const sceneVal = document.getElementById('drawer-scene-name').value;
    const worldVal = document.getElementById('drawer-world-setting').value;
    const timeVal = document.getElementById('drawer-start-time').value;

    activeConfig.sceneName = sceneVal || '公寓';
    activeConfig.worldSetting = worldVal;

    if (timeVal) {
        const newTime = new Date(timeVal);
        if (!isNaN(newTime.getTime())) {
            gameState.currentTime = newTime;
            updateUI();
        }
    }

    addLog('世界设定已更新', 'system');
}

// ===== 物品系统 =====

function addToInventory(char, itemName, qty = 1) {
    if (!char.inventory) char.inventory = [];
    const existing = char.inventory.find(i => i.name === itemName);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + qty;
    } else {
        char.inventory.push({ id: `itm_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, name: itemName, quantity: qty });
    }
}

function removeFromInventory(char, itemName, qty = 1) {
    if (!char.inventory) return false;
    const idx = char.inventory.findIndex(i => i.name === itemName);
    if (idx === -1) return false;
    const item = char.inventory[idx];
    const curQty = item.quantity || 1;
    if (curQty <= qty) {
        char.inventory.splice(idx, 1);
    } else {
        item.quantity = curQty - qty;
    }
    return true;
}

function processItemAction(char, ia) {
    if (!ia || !ia.type || !ia.item) return;
    const itemName = ia.item;

    if (ia.type === 'pick_up') {
        const roomId = ia.from_room || char.currentRoom;
        const room = gameState.apartment.rooms[roomId];
        if (!room) return;
        const idx = room.items.indexOf(itemName);
        // 物品不在房间列表里：静默跳过，防止幻象物品
        if (idx === -1) return;
        room.items.splice(idx, 1);
        const configRoom = activeConfig.rooms.find(r => r.id === roomId);
        if (configRoom) { const ci = configRoom.items.indexOf(itemName); if (ci !== -1) configRoom.items.splice(ci, 1); }
        renderDrawerRooms();
        addToInventory(char, itemName);
        addLog(`${char.name}将「${itemName}」从${room.name}取走，放入背包`, 'system');

    } else if (ia.type === 'put_down') {
        // 验证 to_room 是合法房间 ID，AI 偶尔会错误地填 "inventory" 等非房间值
        const requestedRoom = ia.to_room || char.currentRoom;
        const roomId = gameState.apartment.rooms[requestedRoom] ? requestedRoom : char.currentRoom;
        const pdQty = ia.quantity || 1;
        // 只有背包里有才能放下，防止幻象物品进入房间
        const removed = removeFromInventory(char, itemName, pdQty);
        if (!removed) return;
        addRoomItem(roomId, itemName);
        const pdLabel = pdQty > 1 ? ` ×${pdQty}` : '';
        addLog(`${char.name}将「${itemName}」${pdLabel}放在了${gameState.apartment.rooms[roomId]?.name || roomId}`, 'system');

    } else if (ia.type === 'give') {
        const toChar = getCharacterByName(ia.to_char);
        if (!toChar) return;
        const gQty = ia.quantity || 1;
        // 只有背包里有才能赠出
        const removed = removeFromInventory(char, itemName, gQty);
        if (!removed) return;
        addToInventory(toChar, itemName, gQty);
        const gLabel = gQty > 1 ? ` ×${gQty}` : '';
        addLog(`${char.name}将「${itemName}」${gLabel}赠给了${ia.to_char}`, 'system');
    }
}

// 添加房间物品
function addRoomItem(roomId, item) {
    if (!item.trim()) return;
    const room = gameState.apartment.rooms[roomId];
    if (room && !room.items.includes(item)) {
        room.items.push(item);
        // 同步到配置
        const configRoom = activeConfig.rooms.find(r => r.id === roomId);
        if (configRoom && !configRoom.items.includes(item)) {
            configRoom.items.push(item);
        }
        renderDrawerRooms();
    }
}

// 删除房间物品
function removeRoomItem(roomId, itemIdx) {
    const room = gameState.apartment.rooms[roomId];
    if (room && room.items[itemIdx]) {
        room.items.splice(itemIdx, 1);
        // 同步到配置
        const configRoom = activeConfig.rooms.find(r => r.id === roomId);
        if (configRoom && configRoom.items[itemIdx]) {
            configRoom.items.splice(itemIdx, 1);
        }
        renderDrawerRooms();
    }
}

// 页面加载时初始化编辑抽屉
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initEditDrawer, 500);
    });
} else {
    initEditDrawer();
}

// ==================== 作品提示词记录弹窗 ====================
const ARTWORK_LOG_KEY = 'artwork_prompt_log';
const ARTWORK_LOG_MAX = 50;
const ARTWORK_MODE_KEY = 'artwork_prompt_mode';

function getArtworkPromptMode() {
    return localStorage.getItem(ARTWORK_MODE_KEY) || 'sd';
}

function toggleArtworkPromptMode() {
    const next = getArtworkPromptMode() === 'sd' ? 'natural' : 'sd';
    localStorage.setItem(ARTWORK_MODE_KEY, next);
    updateArtworkModeToggleBtn();
    renderArtworkLog();
}

function updateArtworkModeToggleBtn() {
    const btn = document.getElementById('artwork-mode-toggle-btn');
    if (!btn) return;
    const mode = getArtworkPromptMode();
    btn.textContent = mode === 'sd' ? 'SD模式' : '自然语言';
    btn.style.background = mode === 'sd' ? '#4a5a7a' : '#3a6a4a';
}

function openArtworkLogModal() {
    const modal = document.getElementById('artwork-log-modal');
    modal.style.display = 'flex';
    updateArtworkModeToggleBtn();
    renderArtworkLog();
}

function closeArtworkLogModal() {
    document.getElementById('artwork-log-modal').style.display = 'none';
}

function renderArtworkLog() {
    const list = document.getElementById('artwork-log-list');
    const log = JSON.parse(localStorage.getItem(ARTWORK_LOG_KEY) || '[]');

    if (log.length === 0) {
        list.innerHTML = '<div style="color:#666; text-align:center; padding:40px 0; font-size:13px;">暂无作品记录</div>';
        return;
    }

    list.innerHTML = '';
    // 最新的显示在最前面
    [...log].reverse().forEach((item, reversedIdx) => {
        const realIdx = log.length - 1 - reversedIdx;
        const card = document.createElement('div');
        card.style.cssText = 'background:#2a2a3e; border:1px solid #3a3a5a; border-radius:6px; padding:12px 14px;';
        const isNaturalEntry = item.mode === 'natural';
        const modeTag = isNaturalEntry
            ? '<span style="color:#7ec8a0; font-size:10px; background:#1a3a2a; border-radius:3px; padding:1px 5px; margin-left:6px;">自然语言</span>'
            : '<span style="color:#8ab4d4; font-size:10px; background:#1a2a3a; border-radius:3px; padding:1px 5px; margin-left:6px;">SD</span>';
        const promptLabel = isNaturalEntry ? '自然描述' : 'SD Prompt';
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <div>
                    <span style="color:#b0d4f1; font-weight:bold; font-size:13px;">${item.charName}</span>
                    <span style="color:#ccc; font-size:13px; margin-left:6px;">${item.title ? '《' + item.title + '》' : '（无标题）'}</span>
                    ${modeTag}
                    <span style="color:#666; font-size:11px; margin-left:8px;">${item.type || ''} · 第${item.day || 1}天 ${item.gameTime || ''}</span>
                </div>
                <div style="display:flex; gap:6px; flex-shrink:0; margin-left:10px;">
                    <button onclick="copyArtworkEntry(${realIdx})" style="padding:3px 9px; background:#3a5a3a; color:#aeffae; border:none; border-radius:3px; cursor:pointer; font-size:11px;">复制</button>
                    <button onclick="deleteArtworkEntry(${realIdx})" style="padding:3px 9px; background:#5a3a3a; color:#ffaeae; border:none; border-radius:3px; cursor:pointer; font-size:11px;">删除</button>
                </div>
            </div>
            ${item.description ? `<div style="color:${isNaturalEntry ? '#c8ddc8' : '#aaa'}; font-size:${isNaturalEntry ? '13px' : '12px'}; margin-bottom:6px; line-height:1.5;">${item.description}</div>` : ''}
            ${item.prompt ? `<div style="color:#e0e0e0; font-size:11px; background:#1a1a2e; border-radius:4px; padding:7px 10px; margin-bottom:4px; word-break:break-all;"><span style="color:#666; margin-right:4px;">${promptLabel}:</span>${item.prompt}</div>` : ''}
            ${item.negativePrompt ? `<div style="color:#999; font-size:11px; background:#1a1a2e; border-radius:4px; padding:5px 10px; word-break:break-all;">Negative: ${item.negativePrompt}</div>` : ''}
        `;
        list.appendChild(card);
    });
}

function deleteArtworkEntry(idx) {
    const log = JSON.parse(localStorage.getItem(ARTWORK_LOG_KEY) || '[]');
    log.splice(idx, 1);
    localStorage.setItem(ARTWORK_LOG_KEY, JSON.stringify(log));
    renderArtworkLog();
}

function copyArtworkEntry(idx) {
    const log = JSON.parse(localStorage.getItem(ARTWORK_LOG_KEY) || '[]');
    const item = log[idx];
    if (!item) return;
    const isNaturalEntry = item.mode === 'natural';
    const text = isNaturalEntry ? [
        item.title ? `作品：${item.title}` : '',
        item.description ? `描述：${item.description}` : '',
        item.prompt ? `自然描述: ${item.prompt}` : '',
        item.style ? `Style: ${item.style}` : ''
    ].filter(Boolean).join('\n') : [
        item.title ? `作品：${item.title}` : '',
        item.description ? `描述：${item.description}` : '',
        item.prompt ? `Prompt: ${item.prompt}` : '',
        item.negativePrompt ? `Negative: ${item.negativePrompt}` : '',
        item.style ? `Style: ${item.style}` : ''
    ].filter(Boolean).join('\n');
    navigator.clipboard.writeText(text).catch(() => {});
}

function exportArtworkLog() {
    const log = JSON.parse(localStorage.getItem(ARTWORK_LOG_KEY) || '[]');
    if (log.length === 0) return;
    const lines = log.map((item, i) => [
        `=== 第${i + 1}条 | ${item.charName} | ${item.title ? '《' + item.title + '》' : '无标题'} | 第${item.day || 1}天 ===`,
        item.description ? `描述：${item.description}` : '',
        `Prompt: ${item.prompt}`,
        item.negativePrompt ? `Negative: ${item.negativePrompt}` : '',
        item.style ? `Style: ${item.style}` : '',
        ''
    ].filter(s => s !== undefined && !(s === '' && !item.description)).join('\n'));
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'artwork_prompts.txt';
    a.click();
    URL.revokeObjectURL(a.href);
}

function clearArtworkLog() {
    if (!confirm('确定清空所有作品提示词记录吗？')) return;
    localStorage.removeItem(ARTWORK_LOG_KEY);
    renderArtworkLog();
}

function applyLogFontSize(size) {
    const px = Math.max(10, Math.min(22, parseInt(size)));
    const log = document.getElementById('game-log');
    if (log) log.style.fontSize = px + 'px';
    localStorage.setItem('log_font_size', px);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('open-artwork-log-btn').addEventListener('click', openArtworkLogModal);
    document.getElementById('close-artwork-log-btn').addEventListener('click', closeArtworkLogModal);
    document.getElementById('artwork-log-export-btn').addEventListener('click', exportArtworkLog);
    document.getElementById('artwork-log-clear-btn').addEventListener('click', clearArtworkLog);
    document.getElementById('artwork-log-modal').addEventListener('click', e => {
        if (e.target === e.currentTarget) closeArtworkLogModal();
    });
    initModelToggle();
    applyLogFontSize(localStorage.getItem('log_font_size') || '14');

    // 尝试加载自动存档
    const autoSaveLoaded = tryLoadAutoSaveOnStartup();
    if (autoSaveLoaded) {
        console.log('✅ 自动存档已加载，游戏状态已恢复');
        // 更新UI
        updateUI();
        applyCharacterColors();
        // 游戏保持暂停状态，等待用户点击"开始模拟"
    }
});
