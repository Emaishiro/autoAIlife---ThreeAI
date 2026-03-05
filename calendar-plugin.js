// 万年历与节假日系统插件 (2025-2060)
// 包含日历数据、节假日判断及节假日特定的Mock响应

// ==================== 万年历与节假日系统 ====================
const calendar = {
    // 节假日类型
    HOLIDAY_TYPES: {
        NEW_YEAR: '元旦',           // 1月1日
        SPRING_FESTIVAL: '春节',    // 农历正月初一
        QINGMING: '清明节',         // 4月4-6日
        LABOR_DAY: '劳动节',        // 5月1-5日
        DRAGON_BOAT: '端午节',      // 农历五月初五
        MID_AUTUMN: '中秋节',       // 农历八月十五
        NATIONAL_DAY: '国庆节',     // 10月1-7日
        WEEKEND: '周末'             // 周六、周日
    },

    // 2025-2060年节假日日期（简化版本，使用公历近似日期）
    // 春节日期（公历近似）
    springFestivalDates: {
        2025: '2025-01-29', 2026: '2026-02-17', 2027: '2027-02-06', 2028: '2028-01-26',
        2029: '2029-02-13', 2030: '2030-02-03', 2031: '2031-01-23', 2032: '2032-02-11',
        2033: '2033-01-31', 2034: '2034-02-19', 2035: '2035-02-08', 2036: '2036-01-28',
        2037: '2037-02-15', 2038: '2038-02-04', 2039: '2039-01-24', 2040: '2040-02-12',
        2041: '2041-02-01', 2042: '2042-01-22', 2043: '2043-02-10', 2044: '2044-01-30',
        2045: '2045-02-17', 2046: '2046-02-06', 2047: '2047-01-26', 2048: '2048-02-14',
        2049: '2049-02-02', 2050: '2050-01-23', 2051: '2051-02-11', 2052: '2052-02-01',
        2053: '2053-02-19', 2054: '2054-02-08', 2055: '2055-01-28', 2056: '2056-02-16',
        2057: '2057-02-04', 2058: '2058-01-24', 2059: '2059-02-12', 2060: '2060-02-02'
    },

    // 端午节日期（公历近似）
    dragonBoatDates: {
        2025: '2025-05-31', 2026: '2026-06-19', 2027: '2027-06-08', 2028: '2028-05-27',
        2029: '2029-06-15', 2030: '2030-06-04', 2031: '2031-06-24', 2032: '2032-06-12',
        2033: '2033-06-01', 2034: '2034-06-20', 2035: '2035-06-09', 2036: '2036-05-28',
        2037: '2037-06-16', 2038: '2038-06-05', 2039: '2039-06-25', 2040: '2040-06-13',
        2041: '2041-06-02', 2042: '2042-06-21', 2043: '2043-06-10', 2044: '2044-05-29',
        2045: '2045-06-17', 2046: '2046-06-06', 2047: '2047-06-25', 2048: '2048-06-13',
        2049: '2049-06-02', 2050: '2050-06-21', 2051: '2051-06-10', 2052: '2052-05-29',
        2053: '2053-06-17', 2054: '2054-06-06', 2055: '2055-06-25', 2056: '2056-06-13',
        2057: '2057-06-02', 2058: '2058-06-21', 2059: '2059-06-10', 2060: '2060-05-29'
    },

    // 中秋节日期（公历近似）
    midAutumnDates: {
        2025: '2025-10-06', 2026: '2026-09-25', 2027: '2027-09-15', 2028: '2028-10-03',
        2029: '2029-09-22', 2030: '2030-09-12', 2031: '2031-10-01', 2032: '2032-09-19',
        2033: '2033-09-08', 2034: '2034-09-27', 2035: '2035-09-16', 2036: '2036-10-04',
        2037: '2037-09-24', 2038: '2038-09-13', 2039: '2039-10-02', 2040: '2040-09-21',
        2041: '2041-09-10', 2042: '2042-09-29', 2043: '2043-09-18', 2044: '2044-10-06',
        2045: '2045-09-25', 2046: '2046-09-15', 2047: '2047-10-04', 2048: '2048-09-22',
        2049: '2049-09-11', 2050: '2050-09-30', 2051: '2051-09-19', 2052: '2052-09-08',
        2053: '2053-09-27', 2054: '2054-09-16', 2055: '2055-10-05', 2056: '2056-09-23',
        2057: '2057-09-12', 2058: '2058-10-01', 2059: '2059-09-20', 2060: '2060-09-09'
    },

    // 判断日期是否为节假日（已修复：劳动节5天假期，春节7天假期）
    isHoliday(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 0-11 → 1-12
        const day = date.getDate();
        const dayOfWeek = date.getDay(); // 0=周日, 1=周一, ..., 6=周六

        // 检查周末
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return { isHoliday: true, type: this.HOLIDAY_TYPES.WEEKEND, name: '周末' };
        }

        // 元旦 (1月1日)
        if (month === 1 && day === 1) {
            return { isHoliday: true, type: this.HOLIDAY_TYPES.NEW_YEAR, name: '元旦' };
        }

        // 清明节 (4月4-6日，通常为4月4日，闰年为4月5日)
        if (month === 4 && (day === 4 || day === 5 || day === 6)) {
            return { isHoliday: true, type: this.HOLIDAY_TYPES.QINGMING, name: '清明节' };
        }

        // 劳动节 (5月1-5日，小长假5天)
        if (month === 5 && day >= 1 && day <= 5) {
            return { isHoliday: true, type: this.HOLIDAY_TYPES.LABOR_DAY, name: '劳动节' };
        }

        // 国庆节 (10月1-7日)
        if (month === 10 && day >= 1 && day <= 7) {
            return { isHoliday: true, type: this.HOLIDAY_TYPES.NATIONAL_DAY, name: '国庆节' };
        }

        // 春节 (使用预定义日期，扩展为前后各3天假期，共7天)
        const yearStr = year.toString();
        if (this.springFestivalDates[yearStr]) {
            const springDate = new Date(this.springFestivalDates[yearStr]);

            // 检查正月初一
            if (month === springDate.getMonth() + 1 && day === springDate.getDate()) {
                return { isHoliday: true, type: this.HOLIDAY_TYPES.SPRING_FESTIVAL, name: '春节' };
            }

            // 检查春节前后各3天（共7天假期）
            for (let offset = -3; offset <= 3; offset++) {
                if (offset === 0) continue; // 正月初一已经检查过
                const checkDate = new Date(springDate);
                checkDate.setDate(checkDate.getDate() + offset);
                if (month === checkDate.getMonth() + 1 && day === checkDate.getDate()) {
                    return { isHoliday: true, type: this.HOLIDAY_TYPES.SPRING_FESTIVAL, name: '春节假期' };
                }
            }
        }

        // 端午节 (使用预定义日期)
        if (this.dragonBoatDates[yearStr]) {
            const dragonDate = new Date(this.dragonBoatDates[yearStr]);
            if (month === dragonDate.getMonth() + 1 && day === dragonDate.getDate()) {
                return { isHoliday: true, type: this.HOLIDAY_TYPES.DRAGON_BOAT, name: '端午节' };
            }
        }

        // 中秋节 (使用预定义日期)
        if (this.midAutumnDates[yearStr]) {
            const midAutumnDate = new Date(this.midAutumnDates[yearStr]);
            if (month === midAutumnDate.getMonth() + 1 && day === midAutumnDate.getDate()) {
                return { isHoliday: true, type: this.HOLIDAY_TYPES.MID_AUTUMN, name: '中秋节' };
            }
        }

        return { isHoliday: false, type: null, name: null };
    },

    // 获取节假日描述
    getHolidayDescription(date) {
        const holidayInfo = this.isHoliday(date);
        if (holidayInfo.isHoliday) {
            return holidayInfo.name;
        }
        return '工作日';
    },

    // 获取节假日信息（解耦版本，接受日期参数）
    getHolidayInfo(date) {
        return this.isHoliday(date);
    }
};

// ==================== 节假日Mock响应系统 ====================

// 状态感知的文本变体生成器
// 根据角色状态调整文本的语气和内容
function generateStateAwareVariant(baseText, character, moodModifier = '') {
    // baseText: 基础文本
    // character: 角色对象，包含 mood, energy, satiety, hygiene, relationship
    // moodModifier: 特定的心情修饰（如 'tired', 'happy', 'lonely' 等）

    const mood = character?.mood ?? 75;
    const energy = character?.energy ?? 50;

    // 如果心情较低（< 40）或精力较低（< 30），添加消极语气
    if (mood < 40 || energy < 30) {
        // 用更疲惫、无力的表达替换原文中的关键词
        return baseText
            .replace(/(?:很|格外|特别|异常)/g, '有些')
            .replace(/(?:想|期待|打算)/g, '勉强')
            .replace(/满满的/g, '淡淡的')
            .replace(/(?:兴高采烈|喜悦|欢乐)/g, '疲惫')
            .replace(/满意/g, '勉强接受');
    }

    // 如果心情较高（> 80），添加积极语气
    if (mood > 80 && energy > 70) {
        return baseText
            .replace(/有些/g, '格外')
            .replace(/淡淡的/g, '满满的')
            .replace(/(?:勉强|疲惫)/g, '兴高采烈')
            .replace(/不自觉/g, '迫不及待')
            .replace(/(?:点点|一点点)/g, '满满');
    }

    // 常规心情，保持原文
    return baseText;
}

// 根据角色状态调整action执行细节
function adjustActionForState(baseAction, character) {
    if (!character) return baseAction;

    const duration = baseAction.duration;
    const energy = character.energy;

    // 精力影响执行时长和能量消耗
    let durationMultiplier = 1;
    if (energy < 30) {
        durationMultiplier = 0.6; // 疲惫时执行时间短，能量消耗也少
        baseAction.duration = Math.max(15, Math.floor(duration * 0.6));
    } else if (energy < 50) {
        durationMultiplier = 0.8;
        baseAction.duration = Math.floor(duration * 0.8);
    } else if (energy > 80) {
        durationMultiplier = 1.2; // 精力充沛时可持续更久
        baseAction.duration = Math.floor(duration * 1.2);
    }

    // 精力消耗也要按duration比例调整（防止压缩进度下消耗过快）
    if (durationMultiplier !== 1) {
        baseAction.stat_changes.energy = Math.round(baseAction.stat_changes.energy * durationMultiplier);
    }

    // 心情影响stat_changes (调幅度，避免精力消耗过快)
    const mood = character.mood;
    if (mood < 40) {
        // 低心情：mood提升较少，能量消耗稍多
        baseAction.stat_changes.mood = Math.max(0, baseAction.stat_changes.mood - 3);
        baseAction.stat_changes.energy = baseAction.stat_changes.energy - 2; // 改为-2，从-5降低
    } else if (mood > 80) {
        // 高心情：mood提升更多，能量消耗减少
        baseAction.stat_changes.mood = baseAction.stat_changes.mood + 3;
        baseAction.stat_changes.energy = Math.max(-30, baseAction.stat_changes.energy + 3); // 改为+3，从+5降低
    }

    return baseAction;
}

// 生成节假日特定的Mock响应（分发器）
// 现在接收characters对象作为参数
function generateHolidayMockResponse(holidayName, hour, characters = {}) {
    // 根据不同的节假日类型生成不同的行为
    switch(holidayName) {
        case '周末':
            return generateWeekendMockResponse(hour, characters);
        case '春节':
        case '春节假期':
            return generateSpringFestivalMockResponse(hour, characters);
        case '元旦':
            return generateNewYearMockResponse(hour, characters);
        case '清明节':
            return generateQingmingMockResponse(hour, characters);
        case '劳动节':
            return generateLaborDayMockResponse(hour, characters);
        case '端午节':
            return generateDragonBoatMockResponse(hour, characters);
        case '中秋节':
            return generateMidAutumnMockResponse(hour, characters);
        case '国庆节':
            return generateNationalDayMockResponse(hour, characters);
        default:
            // 默认使用周末的行为，但输出警告
            console.warn(`未知节假日名称: "${holidayName}"，降级为周末行为`);
            return generateWeekendMockResponse(hour, characters);
    }
}

// 周末Mock响应
function generateWeekendMockResponse(hour, characters = {}) {
    if (hour >= 9 && hour < 12) {
        // 周末早晨（通常起得晚）
        const huiwuChar = characters.huiwu;
        const sanjiu = characters.sanjiu;
        const wuyue = characters.wuyue;

        const huiwuThought = generateStateAwareVariant(
            "难得的周末，阳光懒洋洋地爬上窗帘，却驱散不了脑子里转个不停的代码。睡也睡不着，索性翻出最近收藏的几篇论文，让那些密密麻麻的公式填满这个安静的早晨。",
            huiwuChar
        );

        const huiwuAction1 = {
            character: "惠舞",
            thought: huiwuThought,
            action: "靠在床头，用平板翻阅一篇关于大模型推理效率的最新论文，时而皱眉，时而在空白处划下一道若有所思的横线",
            result: "在一个关键推导步骤上读出了灵感，随手在备忘录里记下三行笔记，心底涌起一丝隐秘的满足",
            duration: 60,
            stat_changes: { mood: 8, energy: -5, satiety: -8, hygiene: -2, wallet: 0 },
            interaction_with: null,
            new_room: "bedroom1"
        };
        adjustActionForState(huiwuAction1, huiwuChar);

        const sanjiu3Thought = generateStateAwareVariant(
            "周末的光线和平日不一样，柔软得像是被棉花过滤过。颜料盒昨晚就摆好了，调色盘上还留着上次没用完的群青——今天想画点什么，还不知道，但手已经想动了。",
            sanjiu
        );

        const sanjiu3Action = {
            character: "三玖",
            thought: sanjiu3Thought,
            action: "在客厅靠窗的地板上铺开画纸，膝盖抵着画板，用湿润的细笔蘸取淡蓝晕染天空的边缘，一笔一笔，屏着呼吸",
            result: "画出了一片记忆里故乡的屋檐，笔触比预想的更轻盈，看着看着，连自己也有些怔住",
            duration: 90,
            stat_changes: { mood: 10, energy: -12, satiety: -10, hygiene: -3, wallet: 0 },
            interaction_with: null,
            new_room: "livingRoom"
        };
        adjustActionForState(sanjiu3Action, sanjiu);

        const wuyueThought = generateStateAwareVariant(
            "平日里对付自己随便煮碗面就行了，可周末就该认认真真地对待早餐——这是五月对自己定下的不成文的规矩。冰箱里还有两个鸡蛋、半块奶油，做法式吐司刚刚好，再拌个水果沙拉，今天要好好犒劳一下大家。",
            wuyue
        );

        const wuyueAction = {
            character: "五月",
            thought: wuyueThought,
            action: "在厨房里打散鸡蛋液，将厚切吐司浸透，下锅煎至两面焦黄，黄油的香气顺着门缝飘进了客厅；切水果时把草莓摆成一个笑脸，自己先忍不住笑了",
            result: "端出两份摆盘精致的早餐，扬声叫惠舞和三玖来吃，声音里带着掩饰不住的得意",
            duration: 45,
            stat_changes: { mood: 12, energy: -8, satiety: 20, hygiene: -3, wallet: -15 },
            interaction_with: "惠舞、三玖",
            new_room: "kitchen"
        };
        adjustActionForState(wuyueAction, wuyue);

        return {
            actions: [huiwuAction1, sanjiu3Action, wuyueAction],
            narrative: "周末的晨光像蜜糖一样流淌进公寓，将一切都镀上了一层慵懒而温柔的色泽。惠舞窝在被窝里与公式为伍，三玖的画笔在纸上轻轻呼吸，而五月的厨房里，黄油与鸡蛋正在平底锅上奏出这个早晨最动听的交响。",
            time_passed: 90
        };
    } else if (hour >= 12 && hour < 15) {
        // 周末中午
        const huiwuChar = characters.huiwu;
        const sanjiu = characters.sanjiu;
        const wuyue = characters.wuyue;

        const huiwuLunchThought = generateStateAwareVariant(
            "胃里空了，代码的节奏也跟着慢下来。厨房方向飘来什么气味——是五月又在做什么了。说不清楚是真的饿了，还是只是想找个借口离开椅子。",
            huiwuChar
        );

        const huiwuLunch = {
            character: "惠舞",
            thought: huiwuLunchThought,
            action: "推开厨房的门，见五月摆了满桌，略有些不自然地拉开椅子坐下，低头扒饭，偶尔抬头看一眼五月忙碌的背影",
            result: "碗见了底，胃里有了分量，说了句'好吃'，声音不大，却是真心的",
            duration: 30,
            stat_changes: { mood: 10, energy: 15, satiety: 25, hygiene: -1, wallet: 0 },
            interaction_with: "五月",
            new_room: "kitchen"
        };
        adjustActionForState(huiwuLunch, huiwuChar);

        const sanjiuAfternoonThought = generateStateAwareVariant(
            "画了一上午，手腕有些酸，眼睛也需要休息。沙发上已经放了昨晚没看完的动画——那种安静的、不需要动脑子的故事，正好适合现在的心情。",
            sanjiu
        );

        const sanjiuAfternoon = {
            character: "三玖",
            thought: sanjiuAfternoonThought,
            action: "蜷在沙发一角，将毯子盖到下巴，眼睛追着屏幕上移动的色块，嘴角不自觉地微微上扬",
            result: "看到感人的片段时，悄悄用袖子蹭了蹭眼角，环顾四周确认没人看见，才放心地继续看",
            duration: 60,
            stat_changes: { mood: 12, energy: 10, satiety: -5, hygiene: 0, wallet: 0 },
            interaction_with: null,
            new_room: "livingRoom"
        };
        adjustActionForState(sanjiuAfternoon, sanjiu);

        const wuyueShoppingThought = generateStateAwareVariant(
            "晚餐的菜单已经在脑子里过了三遍，但食材还缺着。超市周末人多，要早去早回——这是做美食博主养成的职业习惯：对食材的新鲜度，一分钟都不肯将就。",
            wuyue
        );

        const wuyueShopping = {
            character: "五月",
            thought: wuyueShoppingThought,
            action: "挎上布袋出门，在菜市场和超市之间穿行，手指轻轻按了按西红柿，凑近嗅了嗅香菜，把最新鲜的都挑进了篮子",
            result: "满载而归，在门口把食材按类摆开，心里已经规划好了今晚每道菜的顺序",
            duration: 90,
            stat_changes: { mood: 8, energy: -15, satiety: -10, hygiene: -5, wallet: -100 },
            interaction_with: null,
            new_room: null
        };
        adjustActionForState(wuyueShopping, wuyue);

        return {
            actions: [huiwuLunch, sanjiuAfternoon, wuyueShopping],
            narrative: "午后的阳光斜斜地切进客厅，将空气分成明暗两半。惠舞在厨房与五月相对无言地共进了一顿午饭，那种沉默并不尴尬，反而带着某种说不清的踏实；三玖窝在沙发里对着屏幕偷偷落泪；而五月已经背起布袋，向今晚的那一桌菜肴进发了。",
            time_passed: 90
        };
    } else {
        // 周末其他时间
        const huiwuChar = characters.huiwu;
        const sanjiu = characters.sanjiu;
        const wuyue = characters.wuyue;

        const huiwuEveningThought = generateStateAwareVariant(
            "书房的椅子坐了一整天，背脊像是被人按住了。平时不怎么打游戏，但今晚脑子不想再转了，只想做一件不需要思考的事——让手指替代大脑，去应付那些迎面而来的关卡。",
            huiwuChar
        );

        const huiwuEvening = {
            character: "惠舞",
            thought: huiwuEveningThought,
            action: "靠在书房椅背上，把音量调到恰好盖住窗外风声的大小，在游戏里的像素世界里横冲直撞，偶尔轻声嘟囔一句",
            result: "打过了卡了很久的关，对着屏幕愣了两秒，然后默默存档，肩膀松弛下来",
            duration: 60,
            stat_changes: { mood: 15, energy: -10, satiety: -8, hygiene: -2, wallet: 0 },
            interaction_with: null,
            new_room: "studyRoom"
        };
        adjustActionForState(huiwuEvening, huiwuChar);

        const sanjiuBathThought = generateStateAwareVariant(
            "今天的颜料味还留在指尖，洗了两遍也没完全散去。泡澡是最好的仪式——热水漫过肩膀的那一刻，所有的边界都会变得模糊，人也就跟着软下去了。",
            sanjiu
        );

        const sanjiuBath = {
            character: "三玖",
            thought: sanjiuBathThought,
            action: "在浴室里慢慢注满热水，滴入几滴薰衣草精油，沉进浴缸，头发漂浮在水面，盯着天花板发了很久的呆",
            result: "泡到手指都起了皱，才不情愿地爬出来，裹上浴巾，感觉整个人像是重新熨烫过一遍",
            duration: 45,
            stat_changes: { mood: 15, energy: 20, satiety: -5, hygiene: 15, wallet: 0 },
            interaction_with: null,
            new_room: "bathRoom"
        };
        adjustActionForState(sanjiuBath, sanjiu);

        const wuyueCookingThought = generateStateAwareVariant(
            "下午买回来的食材全都洗净切好，摆在砧板上等着——这是五月最喜欢的时刻，像是一场演出的开幕。红椒、茄子、排骨，今晚要做七道菜，有点贪心，但周末嘛，就该贪心一点。",
            wuyue
        );

        const wuyueCooking = {
            character: "五月",
            thought: wuyueCookingThought,
            action: "在厨房开了排气扇，锅里的油烧到微微起烟，葱段下去的瞬间爆出一声响，五月下意识后退半步，然后笑着继续翻炒；一边炒一边哼歌，音调跑偏了也没察觉",
            result: "七道菜端上桌，热气把眼镜片弄得模糊，拍了张照发到美食群，附上'今晚不许减肥'六个字",
            duration: 75,
            stat_changes: { mood: 12, energy: -20, satiety: 10, hygiene: -5, wallet: -50 },
            interaction_with: "惠舞、三玖",
            new_room: "kitchen"
        };
        adjustActionForState(wuyueCooking, wuyue);

        return {
            actions: [huiwuEvening, sanjiuBath, wuyueCooking],
            narrative: "夜色把窗外的城市压成一幅轮廓画。书房里，惠舞在像素的战场上找回了久违的轻盈；浴室里，三玖用热水泡去了一整天的颜料与心事；而厨房里，七道菜的香气如同烟火，将这个普通周末的尾声，烘焙成了值得回忆的模样。",
            time_passed: 75
        };
    }
}

// 春节Mock响应（按小时分段，保持春节特色）
function generateSpringFestivalMockResponse(hour, characters = {}) {
    if (hour >= 9 && hour < 12) {
        // 春节早晨
        const huiwuChar = characters.huiwu;
        const sanjiu = characters.sanjiu;
        const wuyue = characters.wuyue;

        const huiwuSpringThought = generateStateAwareVariant(
            "窗外已经有人开始放鞭炮了，声音零零散散的，却带着一股说不出的年味。爸妈应该已经起床了，他们总是比自己更早感受到这股气氛——视频电话要打一个，哪怕只是说几句笨拙的新年好。",
            huiwuChar
        );

        const huiwuSpring = {
            character: "惠舞",
            thought: huiwuSpringThought,
            action: "坐在客厅沙发上，把手机架在茶几上，接通视频后沉默地愣了一秒，然后笨拙地说了句'爸，妈，新年好'，后来越说越顺，手势都多了起来",
            result: "通话挂断后，盯着变黑的屏幕又坐了一会儿，才重新拿起手机，给爸妈转了个红包，数字是精心挑的，带着两个六",
            duration: 40,
            stat_changes: { mood: 20, energy: -5, satiety: -5, hygiene: 0, wallet: -200 },
            interaction_with: "父母",
            new_room: "livingRoom"
        };
        adjustActionForState(huiwuSpring, huiwuChar);

        const sanjiuSpringThought = generateStateAwareVariant(
            "春联贴歪了就不好看了。三玖昨晚专门量好了尺寸，在纸上画了个位置图——别人觉得她安静，其实她做这些事的时候心里比谁都认真。节日的仪式感不是给别人看的，是自己和时间之间的一种约定。",
            sanjiu
        );

        const sanjiuSpring = {
            character: "三玖",
            thought: sanjiuSpringThought,
            action: "踩着椅子，将春联用双面胶小心对齐门框边缘，每贴一张都后退三步确认水平，连'福'字倒贴的角度都反复调整了两遍",
            result: "站在走廊尽头看着整个公寓焕然一新，眼神里有一种不轻易外露的满足——轻轻点了点头，算作对自己的褒奖",
            duration: 60,
            stat_changes: { mood: 15, energy: -15, satiety: -10, hygiene: -5, wallet: -30 },
            interaction_with: "五月",
            new_room: "livingRoom"
        };
        adjustActionForState(sanjiuSpring, sanjiu);

        const wuyueSpringThought = generateStateAwareVariant(
            "年夜饭是要从上午就开始准备的。鱼要先去鳞，饺子馅要提前拌好入味，红烧肉得炖够两个小时才会酥烂——五月把这些记在一张手写的清单上，每完成一道就划掉一项，像是在完成一个庄重的仪式。",
            wuyue
        );

        const wuyueSpring = {
            character: "五月",
            thought: wuyueSpringThought,
            action: "在厨房里开始处理食材，水槽里放着待洗的菜，砧板上摆着整块的五花肉，嘴里念念有词地核对清单上的步骤",
            result: "准备工作完成了一大半，洗干净手，对着清单露出一个满意的微笑，感觉这个年已经开始有了样子",
            duration: 90,
            stat_changes: { mood: 15, energy: -12, satiety: -5, hygiene: -8, wallet: -100 },
            interaction_with: null,
            new_room: "kitchen"
        };
        adjustActionForState(wuyueSpring, wuyue);

        return {
            actions: [huiwuSpring, sanjiuSpring, wuyueSpring],
            narrative: "春节的晨光里，鞭炮声零零落落地从窗外传来，像是为这个节日敲响的前奏。惠舞在视频里对父母说出了那句练习了很多遍的'新年好'；三玖用尺子和双面胶守护着家门口的仪式感；而五月的厨房里，年夜饭的序章已经悄然拉开。",
            time_passed: 90
        };
    } else if (hour >= 12 && hour < 18) {
        // 春节下午
        const huiwuChar = characters.huiwu;
        const sanjiu = characters.sanjiu;
        const wuyue = characters.wuyue;

        const huiwuAfternoonThought = generateStateAwareVariant(
            "红包发完了，消息也回复得差不多了。手机终于安静下来，这种安静和平时不一样，带着一种做完了一件事之后的踏实。窗外的阳光正好，忽然觉得今天什么代码都不想写。",
            huiwuChar
        );

        const huiwuAfternoon = {
            character: "惠舞",
            thought: huiwuAfternoonThought,
            action: "在客厅的沙发上躺下来，把手机放到一边，闭上眼睛，让阳光照在脸上，耳边是远处断断续续的鞭炮声",
            result: "就这样躺了半个小时，没有睡着，但脑子也什么都没有想，只是单纯地感受着这个春节下午的宁静",
            duration: 45,
            stat_changes: { mood: 18, energy: 10, satiety: -8, hygiene: 0, wallet: 0 },
            interaction_with: null,
            new_room: "livingRoom"
        };
        adjustActionForState(huiwuAfternoon, huiwuChar);

        const sanjiuAfternoonThought = generateStateAwareVariant(
            "画了一上午的画，手腕有些酸。窗外的街道比平时安静，偶尔有穿着新衣服的人走过。三玖想把这个场景画下来——不是热闹，是那种安静的、被节日包裹着的日常。",
            sanjiu
        );

        const sanjiuAfternoon = {
            character: "三玖",
            thought: sanjiuAfternoonThought,
            action: "重新铺开一张纸，用淡彩勾勒出窗外的街景，颜色用得比平时更暖一些，在角落里加了一个小小的红灯笼",
            result: "画完后看着那个红灯笼出了会儿神，然后轻轻在画纸背面写下日期：'乙巳年正月初一'",
            duration: 60,
            stat_changes: { mood: 12, energy: -10, satiety: -5, hygiene: -2, wallet: 0 },
            interaction_with: null,
            new_room: "livingRoom"
        };
        adjustActionForState(sanjiuAfternoon, sanjiu);

        const wuyueCookingThought = generateStateAwareVariant(
            "灶台上的四个锅同时冒着热气——鱼在蒸锅里，红烧肉在小火慢炖，饺子的水已经烧开，青菜等着最后下锅。这是五月一年中最忙碌也最享受的时刻。",
            wuyue
        );

        const wuyueCooking = {
            character: "五月",
            thought: wuyueCookingThought,
            action: "在厨房里左右开弓，右手翻炒着青菜，左手掐着红烧肉的计时器，额头冒着细汗，嘴里念叨着下一步要加什么；抽空擦了把汗，脸上却带着笑",
            result: "最后一道鱼出锅时，整个厨房都弥漫着年味十足的香气，五月满意地拍了拍手，对着满桌的菜点了点头",
            duration: 120,
            stat_changes: { mood: 20, energy: -15, satiety: 5, hygiene: -10, wallet: -150 },
            interaction_with: "惠舞、三玖",
            new_room: "kitchen"
        };
        adjustActionForState(wuyueCooking, wuyue);

        return {
            actions: [huiwuAfternoon, sanjiuAfternoon, wuyueCooking],
            narrative: "午后的阳光斜斜地穿过窗户，将这个春节的下午渲染得格外悠长。惠舞在沙发上享受着难得的放空；三玖用画笔记录下节日里安静的街道；而五月的厨房里，四口灶同时奏响的年夜饭交响曲，正进入最华彩的乐章。",
            time_passed: 120
        };
    } else {
        // 春节晚上
        const huiwuChar = characters.huiwu;
        const sanjiu = characters.sanjiu;
        const wuyue = characters.wuyue;

        const huiwuEveningThought = generateStateAwareVariant(
            "年夜饭吃得胃里满满的，连脑子都跟着变得迟缓。电视里放着春晚，但他其实没怎么认真看，只是觉得那个热闹的声音让公寓显得没那么空旷。",
            huiwuChar
        );

        const huiwuEvening = {
            character: "惠舞",
            thought: huiwuEveningThought,
            action: "靠在沙发上看电视，手里拿着遥控器，却很久都没有换台；偶尔被小品逗笑，笑完后又陷入一种说不清的安静",
            result: "看到一半忽然想起什么，拿起手机给几个老朋友发了简短的拜年消息，然后继续盯着电视发呆",
            duration: 60,
            stat_changes: { mood: 15, energy: -5, satiety: 15, hygiene: -2, wallet: -50 },
            interaction_with: null,
            new_room: "livingRoom"
        };
        adjustActionForState(huiwuEvening, huiwuChar);

        const sanjiuEveningThought = generateStateAwareVariant(
            "年夜饭很好吃，五月的厨艺总是让人安心。饭后大家坐在一起看春晚，这种热闹的安静，是三玖最喜欢的时刻——不用说话，但知道身边有人。",
            sanjiu
        );

        const sanjiuEvening = {
            character: "三玖",
            thought: sanjiuEveningThought,
            action: "蜷在沙发的一角，抱着靠垫，眼睛看着电视屏幕，但心思其实在别处；偶尔转头看看惠舞和五月，然后又转回来",
            result: "看到某个舞蹈节目时，忽然觉得那个舞者的动作很美，悄悄在手机备忘录里记下了几个关键词，想着以后可以画出来",
            duration: 60,
            stat_changes: { mood: 18, energy: -8, satiety: 10, hygiene: -2, wallet: 0 },
            interaction_with: "惠舞、五月",
            new_room: "livingRoom"
        };
        adjustActionForState(sanjiuEvening, sanjiu);

        const wuyueEveningThought = generateStateAwareVariant(
            "年夜饭被一扫而光，这是对厨师最大的褒奖。虽然累，但心里是满的。收拾完碗筷，坐在沙发上和大家一起看春晚，这种平凡的热闹，是她最喜欢的春节模样。",
            wuyue
        );

        const wuyueEvening = {
            character: "五月",
            thought: wuyueEveningThought,
            action: "和大家一起坐在沙发上看电视，偶尔评论几句节目的好坏，手里剥着橘子，分给惠舞和三玖一人一半",
            result: "看着惠舞和三玖接过橘子时脸上的表情，五月忽然觉得，这个不回家的春节，其实也挺好的",
            duration: 60,
            stat_changes: { mood: 22, energy: -15, satiety: 10, hygiene: -5, wallet: 0 },
            interaction_with: "惠舞、三玖",
            new_room: "livingRoom"
        };
        adjustActionForState(wuyueEvening, wuyue);

        return {
            actions: [huiwuEvening, sanjiuEvening, wuyueEvening],
            narrative: "春晚的歌声和笑声填满了客厅，窗外偶尔有烟花炸开，将夜空点亮一瞬。惠舞在电视的热闹里享受着一年中难得的放松；三玖在集体的安静里感受着属于自己的温暖；而五月，在年夜饭后的疲惫与满足中，找到了这个春节最圆满的句号。",
            time_passed: 60
        };
    }
}

// 元旦Mock响应（暂时使用周末逻辑，但保留扩展接口）
function generateNewYearMockResponse(hour, characters = {}) {
    // TODO: 未来可以添加元旦专属内容
    console.log("元旦：使用周末逻辑，未来可扩展");
    return generateWeekendMockResponse(hour, characters);
}

// 清明节Mock响应（保持原有内容）
function generateQingmingMockResponse(hour, characters = {}) {
    // 清明节行为不随小时变化
    const huiwuChar = characters.huiwu;
    const sanjiu = characters.sanjiu;
    const wuyue = characters.wuyue;

    const huiwuQingmingThought = generateStateAwareVariant(
        "清明前后，总会想起那些已经不在的人。不是悲伤，更像是一种钝钝的、说不清楚的惦念——打开书桌抽屉，里面有一叠照片，好久没翻出来看了。",
        huiwuChar
    );

    const huiwuQingming = {
        character: "惠舞",
        thought: huiwuQingmingThought,
        action: "坐在书房的台灯下，把那些泛黄的老照片一张张摊在桌面，指尖在某个面孔上停留，嘴唇微微动了动，没有发出声音",
        result: "把照片重新整理好，压进一个信封，在封口处用钢笔写了一行字，只有自己看得懂",
        duration: 60,
        stat_changes: { mood: 5, energy: -10, satiety: -8, hygiene: -2, wallet: 0 },
        interaction_with: null,
        new_room: "studyRoom"
    };
    adjustActionForState(huiwuQingming, huiwuChar);

    const sanjiuQingmingThought = generateStateAwareVariant(
        "清明的雨是最难调出来的颜色——不是灰，也不是蓝，是两者混在一起、又被什么东西稀释过的那种。三玖想把这种颜色捕捉下来，不知道能不能成功，但值得试一试。",
        sanjiu
    );

    const sanjiuQingming = {
        character: "三玖",
        thought: sanjiuQingmingThought,
        action: "在客厅铺开宣纸，用淡墨渲染出一片朦胧的天光，然后用细笔勾出远山的轮廓，墨还没干的时候，又用湿笔轻轻抹过，让线条化开",
        result: "画完搁笔，对着画沉默地看了很久——那种颜色，好像真的被她抓住了一点点",
        duration: 90,
        stat_changes: { mood: 8, energy: -15, satiety: -10, hygiene: -3, wallet: 0 },
        interaction_with: null,
        new_room: "livingRoom"
    };
    adjustActionForState(sanjiuQingming, sanjiu);

    const wuyueQingmingThought = generateStateAwareVariant(
        "青团的颜色要做对才好看——用艾草汁揉进糯米粉里，颜色会从浅绿慢慢变深，像是植物在面团里活过来了一样。奶奶以前每年清明都会做，五月记得那个味道，今天想试着还原它。",
        wuyue
    );

    const wuyueQingming = {
        character: "五月",
        thought: wuyueQingmingThought,
        action: "将新鲜艾草焯水榨汁，揉进糯米粉里，边揉边感受面团从松散到光滑的变化；包馅时把豆沙压成薄片，包进去，捏口，在蒸锅里排成一排",
        result: "蒸好的青团翠绿剔透，咬开一口，豆沙的甜和艾草的清苦在舌尖撞了个满怀——是记忆里的那个味道，她愣了一下，才想起来喊惠舞和三玖来吃",
        duration: 75,
        stat_changes: { mood: 10, energy: -20, satiety: 15, hygiene: -5, wallet: -40 },
        interaction_with: "惠舞、三玖",
        new_room: "kitchen"
    };
    adjustActionForState(wuyueQingming, wuyue);

    return {
        actions: [huiwuQingming, sanjiuQingming, wuyueQingming],
        narrative: "清明的空气里有一种特别的质地，像是被什么东西轻轻按住了。惠舞在台灯下与过去的影像相对；三玖用水墨锁住了雨前的那道天光；而五月的厨房里，艾草的清香漫过整个公寓，将一种叫做'记得'的情感，揉进了每一个翠绿的糯米团子里。",
        time_passed: 90
    };
}

// 劳动节Mock响应（暂时使用周末逻辑，但保留扩展接口）
function generateLaborDayMockResponse(hour, characters = {}) {
    // TODO: 未来可以添加劳动节专属内容
    console.log("劳动节：使用周末逻辑，未来可扩展");
    return generateWeekendMockResponse(hour, characters);
}

// 端午节Mock响应（保持原有内容）
function generateDragonBoatMockResponse(hour, characters = {}) {
    // 端午节行为不随小时变化
    const huiwuChar = characters.huiwu;
    const sanjiu = characters.sanjiu;
    const wuyue = characters.wuyue;

    const huiwuDragonThought = generateStateAwareVariant(
        "端午的起源他查过不止一遍，却每次读来都有新的触动——一个人为了自己相信的东西，选择了那样的结局。从算法的角度来说，那是一个代价极高的决策；但从别的角度来说，那是另一种意义上的最优解。",
        huiwuChar
    );

    const huiwuDragon = {
        character: "惠舞",
        thought: huiwuDragonThought,
        action: "在书房调暗台灯，打开一个收藏已久的历史文献页面，一边阅读一边在笔记本上划下几行感想，字迹比平时松弛了一些",
        result: "合上页面，对着窗外发呆片刻，忽然觉得今天的风比平时更有一点古意",
        duration: 45,
        stat_changes: { mood: 8, energy: -8, satiety: -8, hygiene: -2, wallet: 0 },
        interaction_with: null,
        new_room: "studyRoom"
    };
    adjustActionForState(huiwuDragon, huiwuChar);

    const sanjiuDragonThought = generateStateAwareVariant(
        "龙舟是很难画的——不在于形，在于那股劲儿。鼓声、水花、湿透的背脊、岸上人群喊出的那口气——这些都是看不见的东西，但要是画出来没有这些，就只是一条木头船。",
        sanjiu
    );

    const sanjiuDragon = {
        character: "三玖",
        thought: sanjiuDragonThought,
        action: "在客厅地板上铺开大张画纸，用宽笔先画出水纹的走势，再在其上层叠出船身和桨手的轮廓，颜色一遍遍加深，直到那股力量从画面里压出来",
        result: "站起来绕着画走了一圈，从不同角度打量——右下角的水花还差一点，重新蘸墨，补了三笔，点到即止",
        duration: 75,
        stat_changes: { mood: 10, energy: -12, satiety: -10, hygiene: -3, wallet: 0 },
        interaction_with: null,
        new_room: "livingRoom"
    };
    adjustActionForState(sanjiuDragon, sanjiu);

    const wuyueDragonThought = generateStateAwareVariant(
        "粽子要泡糯米，要洗粽叶，要调馅，要包，要煮——每一步都不能省，省了就不叫粽子了，叫糊弄。五月最烦糊弄，尤其是糊弄吃的。",
        wuyue
    );

    const wuyueDragon = {
        character: "五月",
        thought: wuyueDragonThought,
        action: "提前一晚泡好的糯米已经吸饱了水，五月把粽叶折成漏斗，舀一勺糯米垫底，放上腌好的五花肉和咸蛋黄，再盖一层米，扎紧，整整齐齐码进锅里",
        result: "煮了两个小时，拆开一个尝了口馅——咸香入味，糯米软糯不散，往客厅喊了一声'出锅了'，自己先满意地点了点头",
        duration: 90,
        stat_changes: { mood: 15, energy: -12, satiety: 10, hygiene: -5, wallet: -60 },
        interaction_with: "惠舞、三玖",
        new_room: "kitchen"
    };
    adjustActionForState(wuyueDragon, wuyue);

    return {
        actions: [huiwuDragon, sanjiuDragon, wuyueDragon],
        narrative: "粽叶的清香慢慢渗透了整个公寓，将这个仲夏的节日渲染出一种古老而亲切的气息。惠舞在史册里寻找一个关于选择的答案；三玖试图用颜料捕捉那一声鼓响之后的力量；而五月的厨房，正用最扎实的手艺，为屈子的故事配上一道热气腾腾的注脚。",
        time_passed: 90
    };
}

// 中秋节Mock响应（保持原有内容）
function generateMidAutumnMockResponse(hour, characters = {}) {
    // 中秋节行为不随小时变化
    const huiwuChar = characters.huiwu;
    const sanjiu = characters.sanjiu;
    const wuyue = characters.wuyue;

    const huiwuMoonThought = generateStateAwareVariant(
        "中秋的月亮是真的比平时大——这不是错觉，有物理依据。但看着看着，那些依据就变得无关紧要了，人只是想坐在月光里，不想那么多。",
        huiwuChar
    );

    const huiwuMoon = {
        character: "惠舞",
        thought: huiwuMoonThought,
        action: "把客厅的灯调暗，将茶几拖到靠近阳台门的位置，泡了一壶龙井，在月光和茶香里靠着椅背坐下，手机翻出几首老歌，音量调到刚好只有自己听得见",
        result: "就这样坐了很久，不看手机，不写代码，月亮从窗框左边慢慢移到了右边",
        duration: 30,
        stat_changes: { mood: 12, energy: -10, satiety: -5, hygiene: -2, wallet: -50 },
        interaction_with: null,
        new_room: "livingRoom"
    };
    adjustActionForState(huiwuMoon, huiwuChar);

    const sanjiuMoonThought = generateStateAwareVariant(
        "月亮每年都有，但每年看着都像是第一次——不知道是月亮变了，还是自己变了。想把这种感觉留下来，不是用相机，是用颜料，因为颜料里可以掺进一点自己的温度。",
        sanjiu
    );

    const sanjiuMoon = {
        character: "三玖",
        thought: sanjiuMoonThought,
        action: "在客厅铺开画纸，先用深蓝晕染背景，再用金黄点出一个并不完美的圆月；树影用细笔尖轻轻勾出，若隐若现，像是记忆里的轮廓而非眼前的实景",
        result: "画完看了一眼，觉得那个月亮画得太圆了，用手指轻轻蹭了蹭边缘，让它带上一点人间的不完整",
        duration: 60,
        stat_changes: { mood: 15, energy: -12, satiety: -8, hygiene: -3, wallet: 0 },
        interaction_with: null,
        new_room: "livingRoom"
    };
    adjustActionForState(sanjiuMoon, sanjiu);

    const wuyueMoonThought = generateStateAwareVariant(
        "市售的月饼太甜了，甜得没有层次——五月每次吃完都觉得亏待了这个节日。今年自己来，用低糖的莲蓉馅，饼皮要薄，花纹要清晰，中间压一颗完整的咸蛋黄，要让人一刀切下去就能感受到惊喜。",
        wuyue
    );

    const wuyueMoon = {
        character: "五月",
        thought: wuyueMoonThought,
        action: "称量好每一克面粉和油的比例，反复揉压面团直到表面光滑如绸；压模的时候用了全力，脱模一看，花纹清晰得像是刻出来的，五月满意地嗯了一声",
        result: "烤好的月饼放凉，切开一个，咸蛋黄的油脂渗进莲蓉里，拍了张照，光线和构图都调整了好几次，发布时配文：'给自己的中秋礼物'",
        duration: 90,
        stat_changes: { mood: 18, energy: -15, satiety: 10, hygiene: -5, wallet: -80 },
        interaction_with: "惠舞、三玖",
        new_room: "kitchen"
    };
    adjustActionForState(wuyueMoon, wuyue);

    return {
        actions: [huiwuMoon, sanjiuMoon, wuyueMoon],
        narrative: "中秋的月光漫过窗台，将公寓里每一个角落都泡进了一种柔和而悠远的光线里。惠舞坐在月光里放空了半个晚上；三玖用画笔替月亮留下了一道温柔的不完整；而五月的烤箱里，正烘焙着一个关于'认真对待节日'的承诺——连同那颗被藏进馅料深处的、完整的咸蛋黄。",
        time_passed: 90
    };
}

// 国庆节Mock响应（保持原有内容）
function generateNationalDayMockResponse(hour, characters = {}) {
    // 国庆节行为不随小时变化
    const huiwuChar = characters.huiwu;
    const sanjiu = characters.sanjiu;
    const wuyue = characters.wuyue;

    const huiwuNationalThought = generateStateAwareVariant(
        "从小就觉得阅兵很震撼——不是因为被要求感动，而是那种精准的、近乎算法级别的整齐，让他这个搞AI的人感到一种隐秘的同类共鸣。今天无论如何要看直播，这是他每年给自己定的一个不可更改的任务。",
        huiwuChar
    );

    const huiwuNational = {
        character: "惠舞",
        thought: huiwuNationalThought,
        action: "提前五分钟打开电视调好频道，泡了杯茶端坐着，方阵经过时身体不自觉地挺直，眼神跟着跑过屏幕的行列追过去，茶喝到一半就忘了",
        result: "直播结束后坐在原地又发了几分钟呆，才想起来把茶喝掉——已经凉了，但没觉得可惜",
        duration: 60,
        stat_changes: { mood: 20, energy: -5, satiety: -8, hygiene: -2, wallet: 0 },
        interaction_with: null,
        new_room: "livingRoom"
    };
    adjustActionForState(huiwuNational, huiwuChar);

    const sanjiuNationalThought = generateStateAwareVariant(
        "国庆的城市是另一个样子——不是平时那种疲惫的繁华，而是某种刻意梳洗过的盛装。三玖不喜欢人多的地方，但她喜欢把那种盛装的感觉画下来，从窗口望出去的视角，带着一点距离，也带着一点温柔的旁观。",
        sanjiu
    );

    const sanjiuNational = {
        character: "三玖",
        thought: sanjiuNationalThought,
        action: "坐在靠窗的椅子上，对着窗外的街景起稿，楼宇的轮廓用铅笔轻轻勾出，再用色铅笔一层层叠上颜色，把国旗的红画得格外饱满",
        result: "画完之后翻过来看签名处的日期，'2025.10.1'——想了想，在旁边加了个小小的五角星",
        duration: 90,
        stat_changes: { mood: 15, energy: -15, satiety: -10, hygiene: -3, wallet: 0 },
        interaction_with: null,
        new_room: "livingRoom"
    };
    adjustActionForState(sanjiuNational, sanjiu);

    const wuyueNationalThought = generateStateAwareVariant(
        "国庆大餐要有排面。烤鸭她没有专业烤炉，但可以用烤箱逼出一个接近的效果；红烧肉要炖两小时，东坡肉的方子她背得出来；再做个糖醋里脊，配上时令蔬菜——今天不是为了拍视频，是真心想让大家吃好。",
        wuyue
    );

    const wuyueNational = {
        character: "五月",
        thought: wuyueNationalThought,
        action: "从上午就开始准备，五花肉先焯水，老抽和冰糖调出琥珀色的汤汁；烤鸭在烤箱里沁出油脂的时候，整个公寓都被香气浸透了",
        result: "端上最后一道菜时，双腿已经有点站不稳，在椅子上坐下来，看着满桌的菜，疲惫却心满意足——这才叫国庆",
        duration: 120,
        stat_changes: { mood: 18, energy: -20, satiety: 10, hygiene: -8, wallet: -120 },
        interaction_with: "惠舞、三玖",
        new_room: "kitchen"
    };
    adjustActionForState(wuyueNational, wuyue);

    return {
        actions: [huiwuNational, sanjiuNational, wuyueNational],
        narrative: "国旗的红色从屏幕里漫出来，将这个普通的公寓也染上了一层节日的底色。惠舞在方阵的整齐里找到了某种技术之外的感动；三玖用色铅笔为这一天留下了一个带着五角星的签名；而五月从上午就开始在厨房奏鸣，只为今晚那一桌不是为了博主身份、只是单纯想请大家吃好的国庆大餐。",
        time_passed: 120
    };
}

// ==================== 插件导出 ====================
// 将日历和Mock函数封装成一个全局对象，避免污染全局命名空间
window.CalendarPlugin = {
    // 日历功能
    calendar: calendar,

    // Mock响应函数
    generateHolidayMockResponse: generateHolidayMockResponse,
    generateWeekendMockResponse: generateWeekendMockResponse,
    generateSpringFestivalMockResponse: generateSpringFestivalMockResponse,
    generateNewYearMockResponse: generateNewYearMockResponse,
    generateQingmingMockResponse: generateQingmingMockResponse,
    generateLaborDayMockResponse: generateLaborDayMockResponse,
    generateDragonBoatMockResponse: generateDragonBoatMockResponse,
    generateMidAutumnMockResponse: generateMidAutumnMockResponse,
    generateNationalDayMockResponse: generateNationalDayMockResponse,

    // 快捷方法
    isHoliday: (date) => calendar.isHoliday(date),
    getHolidayDescription: (date) => calendar.getHolidayDescription(date),
    getHolidayInfo: (date) => calendar.getHolidayInfo(date)
};

console.log("日历插件加载完成，可通过 CalendarPlugin 对象访问功能。");