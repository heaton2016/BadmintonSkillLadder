import { Skill, MasteryLevel } from './types';

// Levels based on the provided text:
// Level 1 (羽焉不详): Grip, Basic Standing.
// Level 2 (羽过拔毛): Basic Serve, Basic Footwork, Forehand Clear (Basic), Net Drop (Basic).
// Level 3 (佳羽有约): Cross steps, Drop, Drive, Basic Net Spin, Basic Backhand.
// Level 4 (羽不自禁): Full court footwork, Backhand Drop, Hook, Consistency.
// Level 5 (春风化羽): Backhand Clear, Slice Drop, Stick Smash, Advanced Net.
// Level 6 (羽翼丰满): Jump Smash, Backhand Smash, Deception, Diving.

export const BADMINTON_SKILLS: Skill[] = [
  // --- Level 1 Items ---
  {
    id: 1,
    category: "握拍技术",
    name: "正、反手握拍",
    difficulty: "入门 (易)",
    difficultyLevel: 1,
    cnLevel: 1,
    checkPoints: "正手：拇指贴宽面，握拍放松；反手：拇指顶宽面，四指并拢",
    commonMistakes: "正手：握拍过紧；反手：拇指未发力 (击球无力)"
  },
  {
    id: 2,
    category: "准备技术",
    name: "场地中心站位",
    difficulty: "入门 (易)",
    difficultyLevel: 1,
    cnLevel: 1,
    checkPoints: "双脚踩中心圆点，前后微错步，视野覆盖全场",
    commonMistakes: "偏离中心、重心后仰、视野局限 (启动滞后)"
  },
  {
    id: 3,
    category: "准备技术",
    name: "分腿半蹲准备姿势",
    difficulty: "入门 (易)",
    difficultyLevel: 1,
    cnLevel: 1,
    checkPoints: "双脚与肩同宽，膝盖微屈外展，重心在两脚之间",
    commonMistakes: "深蹲 / 直立、膝盖内扣、重心偏移 (影响启动)"
  },
  {
    id: 5,
    category: "准备技术",
    name: "架拍动作 (击球前置)",
    difficulty: "入门 (易)",
    difficultyLevel: 1,
    cnLevel: 1,
    checkPoints: "拍举头顶前上方，拍面 45° 对网，侧身对球",
    commonMistakes: "拍位过低、正对来球、重心后仰 (影响击球质量)"
  },

  // --- Level 2 Items ---
  {
    id: 4,
    category: "准备技术",
    name: "启动步 (准备→移动衔接)",
    difficulty: "入门 (易)",
    difficultyLevel: 1,
    cnLevel: 2,
    checkPoints: "双脚小跳垫步，前脚掌蹬地，快速调整方向",
    commonMistakes: "跳幅过大、蹬地无力、启动拖沓 (漏球)"
  },
  {
    id: 6,
    category: "发球技术",
    name: "正、反手发网前球",
    difficulty: "入门 (易)",
    difficultyLevel: 1,
    cnLevel: 2,
    checkPoints: "正手：轻擦球托底部，弧线贴网；反手：身体侧转，手腕轻推",
    commonMistakes: "正手：弧线过高；反手：发力过猛 (出界)"
  },
  {
    id: 7,
    category: "发球技术",
    name: "正手发高远球",
    difficulty: "入门 (易)",
    difficultyLevel: 1,
    cnLevel: 2,
    checkPoints: "侧身引拍，击球点在右前上方，大臂带动小臂，手腕前臂内旋发力",
    commonMistakes: "击球点偏低、没有转体、发力僵硬 (球飞不到底线)"
  },
  {
    id: 10,
    category: "步法技术",
    name: "垫步 (基础移动)",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 2,
    checkPoints: "前脚掌蹬地，小步调整重心，落地平稳",
    commonMistakes: "步幅过大、重心后仰 (衔接滞后)"
  },
  {
    id: 11,
    category: "步法技术",
    name: "蹬转步 (转身移动)",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 2,
    checkPoints: "脚跟蹬地 + 转体，衔接击球自然",
    commonMistakes: "转体过快、重心偏移 (击球点偏差)"
  },
  {
    id: 16,
    category: "前场技术",
    name: "正、反手放网前小球",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 2,
    checkPoints: "正手：轻托球托，落点网沿；反手：反手握拍，手腕微调",
    commonMistakes: "正手：用力过大 (下网)；反手：握拍过紧 (失衡)"
  },
  {
    id: 19,
    category: "后场技术",
    name: "正手 / 头顶高远球 (基础)",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 2,
    checkPoints: "正手：正对来球，头顶前上方击球；头顶：侧转，头顶正上方",
    commonMistakes: "正手：未正对来球；头顶：转体不充分 (球速不足)"
  },

  // --- Level 3 Items ---
  {
    id: 8,
    category: "发球技术",
    name: "正、反手发平高球",
    difficulty: "入门 (易)",
    difficultyLevel: 1,
    cnLevel: 3,
    checkPoints: "正手：弧线略过起跳点，落点底线前；反手：弧线低平，过中场线",
    commonMistakes: "正手：弧线过高；反手：发力脱节 (落点浅)"
  },
  {
    id: 9,
    category: "发球技术",
    name: "正、反手发平快球",
    difficulty: "入门 (易)",
    difficultyLevel: 1,
    cnLevel: 3,
    checkPoints: "正手：前臂快推，弧线极低平；反手：手腕快推，落点中场",
    commonMistakes: "正手：发力失控 (出界)；反手：弧线过高 (被拦)"
  },
  {
    id: 13,
    category: "步法技术",
    name: "并步 (侧向移动)",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 3,
    checkPoints: "同侧脚先动，异侧脚跟进并拢，步幅均匀",
    commonMistakes: "并步拖沓、身体晃动 (击球点偏移)"
  },
  {
    id: 14,
    category: "步法技术",
    name: "弓箭步 (前场 / 中场跨步)",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 3,
    checkPoints: "蹬地跨步，前腿弓、后腿直，重心在前脚",
    commonMistakes: "跨步不足、重心过高 (击球点偏后)"
  },
  {
    id: 17,
    category: "前场技术",
    name: "正、反手挑球 (前场→后场)",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 3,
    checkPoints: "正手：前臂上挥，球过底线；反手：拇指发力，弧线适中",
    commonMistakes: "正手：发力不足 (弧线低)；反手：拍面偏移 (不到位)"
  },
  {
    id: 20,
    category: "中场技术",
    name: "正、反手平抽球",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 3,
    checkPoints: "正手：拍面垂直，前臂快挥，球速迅猛；反手：反手握拍，前臂内旋发力",
    commonMistakes: "正手：击球点过高；反手：发力不畅 (球速慢)"
  },
  {
    id: 22,
    category: "中场技术",
    name: "接杀挡网 (被动过渡)",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 3,
    checkPoints: "重心压低，拍面轻挡球托，弧线贴网",
    commonMistakes: "挡球力度过大、弧线过高 (给抢攻机会)"
  },
  {
    id: 23,
    category: "后场技术",
    name: "正手吊球 (基础款)",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 3,
    checkPoints: "击球点同高远球，拍面内扣轻压，弧线中等下坠",
    commonMistakes: "弧线过高、落点居中 (给回防时间)"
  },
  {
    id: 26,
    category: "步法技术",
    name: "交叉步 (前后场移动)",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 3,
    checkPoints: "异侧脚交叉迈步，重心快速转移",
    commonMistakes: "步幅过大、回位过慢 (漏球)"
  },
  {
    id: 31,
    category: "前场技术",
    name: "正、反手搓球 (基础)",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 3,
    checkPoints: "正手：斜切球托，手腕轻搓；反手：反手握拍，手腕轻拧",
    commonMistakes: "正手：力度过大 (出界 / 下网)；反手：搓幅不足 (旋转差)"
  },

  // --- Level 4 Items ---
  {
    id: 12,
    category: "步法技术",
    name: "头顶小碎步调整步",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 4,
    checkPoints: "中心启动，小碎步调整头顶击球点，重心前压",
    commonMistakes: "碎步过多、调整过慢 (击球点滞后)"
  },
  {
    id: 15,
    category: "步法技术",
    name: "击球后回动步 (中心复位)",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 4,
    checkPoints: "击球后立即垫步 / 并步，快速返回场中心，保持准备姿势",
    commonMistakes: "回动过慢、偏离中心、未保持准备姿势 (漏接下一球)"
  },
  {
    id: 18,
    category: "前场技术",
    name: "正、反手推球",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 4,
    checkPoints: "正手：拍面前倾，前臂快推，弧线低平；反手：拇指顶拍，手腕发力",
    commonMistakes: "正手：发力过猛 (出界)；反手：弧线过高 (被拦)"
  },
  {
    id: 21,
    category: "中场技术",
    name: "正、反手挡球",
    difficulty: "基础 (中易)",
    difficultyLevel: 2,
    cnLevel: 4,
    checkPoints: "正手：拍面轻挡，弧线低平；反手：反手握拍，手腕缓冲卸力",
    commonMistakes: "正手：挡球力度过大；反手：弧线过高 (被反击)"
  },
  {
    id: 24,
    category: "后场技术",
    name: "后场过渡吊球",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 4,
    checkPoints: "击球点偏低，拍面贴网，落点网前边线",
    commonMistakes: "弧线过高、落点过深 (无法摆脱被动)"
  },
  {
    id: 25,
    category: "后场技术",
    name: "后场过渡平高球",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 4,
    checkPoints: "弧线低平，落点中场与后场交界处",
    commonMistakes: "发力过猛、落点过深 (延续被动)"
  },
  {
    id: 30,
    category: "后场技术",
    name: "反手吊球 (过渡)",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 4,
    checkPoints: "反手握拍，拇指发力，拍面内扣轻送",
    commonMistakes: "击球点偏后、发力不足 (落点过深)"
  },
  {
    id: 32,
    category: "前场技术",
    name: "正、反手勾对角",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 4,
    checkPoints: "正手：拍面轻转，对角发力；反手：拇指调面，轻送",
    commonMistakes: "正手：发力失控 (落点偏)；反手：拍面不当 (暴露)"
  },

  // --- Level 5 Items ---
  {
    id: 27,
    category: "步法技术",
    name: "头顶交叉步 (前后移动)",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 5,
    checkPoints: "异侧脚交叉，转体同步，击球点前置",
    commonMistakes: "交叉过晚、转体脱节 (击球点偏后)"
  },
  {
    id: 28,
    category: "后场技术",
    name: "正手劈吊 (快速下坠)",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 5,
    checkPoints: "击球点略高，拍面 30°-45° 内扣，发力集中下压",
    commonMistakes: "发力过猛 (出界)、弧线过平 (下坠不足)"
  },
  {
    id: 29,
    category: "后场技术",
    name: "滑板吊球 (隐蔽性)",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 5,
    checkPoints: "拍面横向滑动≤3cm，弧线贴网，落点隐蔽",
    commonMistakes: "滑动幅度过大、落点暴露 (被预判)"
  },
  {
    id: 33,
    category: "前场技术",
    name: "正、反手扑球 (网前突击)",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 5,
    checkPoints: "正手：蹬地前跳，拍面前压；反手：侧身起跳，手腕微调",
    commonMistakes: "正手：起跳过早 (下网 / 出界)；反手：侧身不充分 (无力)"
  },
  {
    id: 34,
    category: "中场技术",
    name: "接杀抽平球 (主动转换)",
    difficulty: "进阶 (中难)",
    difficultyLevel: 3,
    cnLevel: 5,
    checkPoints: "重心前移，前臂快速平抽，球速快且低平",
    commonMistakes: "反应过慢、拍面僵硬 (回球质量差)"
  },
  {
    id: 38,
    category: "后场技术",
    name: "反手高远球 (熟练)",
    difficulty: "高阶 (难)",
    difficultyLevel: 4,
    cnLevel: 5,
    checkPoints: "反手引拍，拇指发力，前臂外旋送球，弧线高深",
    commonMistakes: "击球点偏后、发力不足 (不到位)"
  },
  {
    id: 40,
    category: "后场技术",
    name: "正手、头顶点杀",
    difficulty: "高阶 (难)",
    difficultyLevel: 4,
    cnLevel: 5,
    checkPoints: "正手：正对来球，短引拍手腕发力；头顶：侧转，短引拍精准落点",
    commonMistakes: "正手：重心后仰；头顶：转体不充分 (发力不足)"
  },

  // --- Level 6 Items ---
  {
    id: 35,
    category: "步法技术",
    name: "马来步 (后场对角线移动)",
    difficulty: "高阶 (难)",
    difficultyLevel: 4,
    cnLevel: 6,
    checkPoints: "启动垫步 + 同侧脚交叉前插，重心贴地",
    commonMistakes: "步幅失控、交叉过晚 (击球点偏后)"
  },
  {
    id: 36,
    category: "步法技术",
    name: "头顶并步起跳击球步",
    difficulty: "高阶 (难)",
    difficultyLevel: 4,
    cnLevel: 6,
    checkPoints: "并步侧身启动→后场头顶区→蹬地向上起跳→升高击球点",
    commonMistakes: "起跳过早、落地不稳 (回防滞后)"
  },
  {
    id: 37,
    category: "步法技术",
    name: "中国跳 (中后场拦截进攻)",
    difficulty: "高阶 (难)",
    difficultyLevel: 4,
    cnLevel: 6,
    checkPoints: "中场启动→双脚蹬地快速起跳→空中拦截平高球→发力反击",
    commonMistakes: "起跳时机不当、侧身不充分 (拦截无力)"
  },
  {
    id: 39,
    category: "后场技术",
    name: "正手 / 头顶杀球 (重杀)",
    difficulty: "高阶 (难)",
    difficultyLevel: 4,
    cnLevel: 6,
    checkPoints: "正手：正对来球，全身协调下压；头顶：侧转起跳，发力集中",
    commonMistakes: "正手：重心后仰；头顶：起跳时机不当 (角度差)"
  },
  {
    id: 41,
    category: "后场技术",
    name: "反手杀球 (高阶进攻)",
    difficulty: "高阶 (难 +)",
    difficultyLevel: 5,
    cnLevel: 6,
    checkPoints: "反手握拍强化拇指发力，肩前上方击球，前臂内旋下压",
    commonMistakes: "击球点偏后、发力脱节、拍面失控 (下网 / 出界)"
  },
  {
    id: 42,
    category: "步法技术",
    name: "鱼跃救球 (极限防守)",
    difficulty: "高阶 (难 +)",
    difficultyLevel: 5,
    cnLevel: 6,
    checkPoints: "蹬地向前扑跃，手臂伸展击球，落地时胸腹 / 大腿缓冲",
    commonMistakes: "蹬地无力 (扑距不足)、落地不稳 (受伤风险)、击球点偏差"
  }
];

export const DIFFICULTY_COLORS = {
  1: "bg-green-100 text-green-800 border-green-200",
  2: "bg-blue-100 text-blue-800 border-blue-200",
  3: "bg-indigo-100 text-indigo-800 border-indigo-200",
  4: "bg-purple-100 text-purple-800 border-purple-200",
  5: "bg-red-100 text-red-800 border-red-200",
};

export const MASTERY_COLORS = {
  [MasteryLevel.Unknown]: "bg-gray-100 text-gray-400 border-gray-200",
  [MasteryLevel.Basic]: "bg-yellow-100 text-yellow-700 border-yellow-200",
  [MasteryLevel.Mastered]: "bg-green-500 text-white border-green-600 shadow-sm",
};
