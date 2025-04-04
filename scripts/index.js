window.onload = async function () {
    createBubbles();
    // 汉堡菜单切换逻辑
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        // 切换菜单显示状态
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    // 点击菜单项后关闭移动菜单
    document.querySelectorAll(".nav-links li").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });
    document.getElementById("text-to-copy").addEventListener('click', function () {
        copyTextToClipboard("0xdfa86A77C9C99C2A1d33e56F42081b40Fc3BDFcC", "唯一合约地址已复制");
    });
    document.getElementById("devWallet").addEventListener('click', function () {
        copyTextToClipboard("0x5Fda28034F328acB0971Fdab9e960a452B215AB8", "捐赠地址已复制");
    });
    // 最佳实践：在用户交互事件中调用（避免被浏览器拦截）
    document.getElementById('go-to-buy').addEventListener('click', function (e) {
        e.preventDefault();
        openAdvancedTab('https://pancakeswap.finance/?outputCurrency=0xdfa86A77C9C99C2A1d33e56F42081b40Fc3BDFcC');
    });
    // document.getElementsByClassName('contactEmail')[0].addEventListener('click', function(e) {
    //   e.preventDefault();
    //   openAdvancedTab('https://pancakeswap.finance/?outputCurrency=0xdfa86A77C9C99C2A1d33e56F42081b40Fc3BDFcC');
    // });
    document.getElementsByClassName('contactTelegram')[0].addEventListener('click', function (e) {
        e.preventDefault();
        openAdvancedTab('https://t.me/pogaictoq');
    });
    document.getElementsByClassName('contactTwitter')[0].addEventListener('click', function (e) {
        e.preventDefault();
        openAdvancedTab('https://x.com/_pogai_');
    });

    document.getElementById('devX').addEventListener('click', function (e) {
        e.preventDefault();
        openAdvancedTab('https://x.com/Fendongsx');
    });
    document.getElementById('dao').addEventListener('click', function (e) {
        e.preventDefault();
        openAdvancedTab('https://snapshot.box/#/s:pogaibsc.eth');
    });
    document.getElementById('coin_analysis').addEventListener('click', function (e) {
        e.preventDefault();
        openAdvancedTab('https://memeai.pogai.top/');
    });
    document.getElementById('github_link').addEventListener('click', function (e) {
        e.preventDefault();
        openAdvancedTab('https://fendongs1950.github.io/pogai/');
    });
    // 创建图表
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, config);
}
// 多语言支持
const STEP = {
    'zh': {
        step1: "1. 下载并安装 Metamask 或 TPWallet 钱包，创建/导入 BSC 加密账户",
        step2: "2. 获取BNB：可通过钱包转账或交易所购买后发送至BSC账户",
        step3: "3. 访问PancakeSwap → 连接钱包 → 粘贴$POGAI地址 → 确认交易 → 签名授权",
        step4: "4. 兑换BNB为$POGAI（零交易税，根据市场波动调整滑点设置）",
    },
    'en': {
        step1: "1. Download and install a Metamask or TPWallet, wallet, and create / import a BSC encrypted account",
        step2: "2.GetBNB: It can be sent to BSC account through wallet transfer or exchange purchase",
        step3: "3. Access the PancakeSwap connection wallet and paste the $ POGAI address to confirm the transaction signature authorization",
        step4: "4. Exchange BNB is $ POGAI (zero transaction tax, sliding point setting adjusted according to market fluctuations)",
    }
}
const langData = {
    zh: {
        mainTitle: "$&nbsp;POGAI",
        subTitle: `表情包文化之旅.
                <br>POGAI 对于看着大家无穷无尽地传递 Frog Inu 币感到厌倦了。Inu 类代币已经流行过一阵子了。现在是全球最具辨识度的表情包接管互联网国王地位的时候了。
                <br>POGAI 来了，要让表情包代币再次伟大起来。在没有任何预售、零交易税、流动性提供者代币已烧毁且合约已放弃的情况下低调发行，这是一枚真正属于人民的代币，永远如此。由纯粹的表情包力量驱动，让POGAI 带领你走向正确的道路。`,
        about: '关于',
        subTitle_about: `
                <br>POGAI 是基于全球最流行表情包文化诞生的去中心化加密货币，旨在通过区块链技术重新定义互联网原生文化的价值传递。厌倦了市场上泛滥的 "Frog Inu" 类代币和短期投机热潮，POGAI 以 「表情包力量」 为核心，构建一个真正由社区驱动、公平透明的数字资产生态。
                <br><br>使命：让表情包文化成为加密世界的核心叙事，推动可持续的社区价值创造。
                <br>愿景：成为全球最具辨识度的表情包代币，引领互联网原生文化的金融化浪潮。
                <br>无预售、零交易税：彻底杜绝团队割韭菜行为，所有代币通过公开市场自由流通。
                <br>流动性代币永久销毁：LP 代币已烧毁至黑洞地址，流动性池永久锁定，无法撤出。
                <br>合约放弃所有权：开发者已放弃合约控制权，确保项目完全由社区自治。
                <br>文化根基：基于全球通用的「Pogai」表情包，天然具备跨语言、跨地域的传播力。`,

        visionTitle: "社区愿景",
        visionText: "我们的目标是创建一个充满乐趣和创新的互联网社区，通过共享和庆祝全球文化中的表情包来促进世界各地的人们之间的理解和友谊。",
        timeline1Title: "2010 起源",
        timeline1Text: "香港高登讨论区首次出现「扑街」表情图",
        timeline2Title: "2012 演化",
        timeline2Text: "「扑街三连」表情包开始在华语圈病毒式传播",
        timeline3Title: "2025-02-12 08:00 诞生",
        timeline3Text: "$POGAI在Four.meme平台公开公平发射",
        timeline4Title: "2025-02-24: 新纪元",
        timeline4Text: "CTO接管POGAI项目，并开始开发POGAI的下一代产品",
        timeline5Title: "2025-03-21: DAO成立",
        timeline5Text: "DAO（Dec去中心化自治组织，Decentralized Autonomous Organization）的成立标志着一种全新的组织形态和治理模式的诞生，其核心是通过区块链技术和智能合约实现去中心化的协作与决策",
        cardTitle1: "无脸男",
        cardText1: "「你的‘脸’可以是包容万物的空白画布——今天想填入善意、好奇心，还是安静的陪伴？",
        cardTitle2: "中二宣言",
        cardText2: "当我掏出钛合金红眼皮肤，阁下该如何应对？",
        cardTitle3: "最屌华流",
        cardText3: "你说得对，但这就是熊猫人，举牌速度200迈，华流纯度1000%的东方的神秘力量。",
        cardTitle4: "灵魂升天",
        cardText4: "这不是表情包，这是一场赛博朋克式的金融巫术——用肛门和月亮的超现实抛物线，完成对资本权力的祛魅仪式！",
        contactEmail: "电子邮箱",
        contactTelegram: "TG社区",
        contactTwitter: "社交媒体",
        homeText: "首页",
        aboutText: "关于",
        buyText: "如何购买",
        roadmapText: "时间线",
        tokenText: "代币经济",
        buy_btn_text: "去购买",
        buyTexts: "如何购买",
        display:"展示",
        contactTelegram1:'最屌,最活跃的Meme社区',
        ChartText1:"发行总量",
        ChartText2:"0税收，0套路。就这么简单。",
        ChartText3:"LP代币已烧毁，合同所有权已放弃。",
        devText1:"开发者自述",
        devText2:"开发者：POGAI社区成员 @Memes_168",
        devText3:"社区不是一个人的社区,建设需基础资源",
        devText4:"捐赠地址: 点击复制",
        devText5:"友情链接",
        devText6:"熊猫头合成器",
        devText7:"官方1站",
        devText8:"官方2站",
        devText9:"返馈",
        daoText:"参与治理",
        coin_analysis:"合约AI检测",
        POGAI_tool:"POGAI工具",
    },  
    en: {
        POGAI_tool:"POGAI Tool",
        coin_analysis:"Contract AI check up",
        daoText:"Participate in governance",
        devText1:"Developer",
        devText2:"DEV：POGAI community member @Memes_168",
        devText3:"Community is not a person's community, and the construction needs basic resources",
        devText4:"Donation address: click to copy",
        devText5:"Friendship links",
        devText6:"Panda Head Generator",
        devText7:"official hub",
        devText8:"official secondary site",
        devText9:"Refeed",
        ChartText1:"Token Supply",
        ChartText2:"No Taxes, No Bullshit. It’s that simple.",
        ChartText3:"LP tokens are burnt, and contract ownership is renounced.",
        contactTelegram1:'The best, the most active Meme community',
        display:"Display",
        mainTitle: "$&nbsp;POGAI",
        subTitle: `A Journey Through Meme History.
                <br>POGAI is tired of watching everyone play hot potato with the endless derivative Frog Inu coins. The Inu’s have had their day. It’s time for the most recognizable meme in the world to take his reign as king of the internet.
                <br>POGAI is here to make memecoins great again. Launched stealth with no presale, zero taxes, LP burnt and contract renounced, $POGAI is a coin for the people, forever. Fueled by pure memetic power, let $POGAI show you the way.`,
        about: 'about',
        subTitle_about: `
                <br>POGAI Is a decentralized cryptocurrency born based on the culture of the most popular emoji in the world, aiming to redefine the value transmission of the native culture of the Internet through blockchain technology. Tired of the market & quo;Frog Inu & quo; token-like and short-term speculative boom, POGAI focuses on the "power of memes" to build a truly community-driven, fair and transparent digital asset ecosystem.
                <br><br>Mission: Make meme culture the core narrative of the crypto world and promote sustainable community value creation.
                <br>Vision: To become the most recognizable expression package token in the world, leading the wave of financialization of Internet native culture.
                <br>No pre-sale, zero transaction tax: completely put an end to the team cutting leek behavior, all tokens through the open market free circulation.
                <br>Permanent destruction of liquid tokens: LP tokens have been burned to the black hole address, and the liquidity pool is permanently locked and cannot be withdrawn.
                <br>Contract abandonment: The developer has given up control of the contract, ensuring that the project is fully autonomous by the community.
                <br>Cultural foundation: Based on the global universal "Pog" emoji package, it naturally has cross-language and cross-regional communication power.`,
        visionTitle: "Community Vision",
        visionText: "Our goal is to create a fun and innovative internet community, promoting understanding and friendship among people around the world by sharing and celebrating memes in global culture.",
        timeline1Title: "2010 Origin",
        timeline1Text: "First appearance on Hong Kong forum",
        timeline2Title: "2012 Evolution",
        timeline2Text: "Viral spread in Chinese communities",
        timeline3Title: "2025-02-12 08:00 Be born",
        timeline3Text: "$ POGAI launches openly and fairly on the Four.meme platform",
        timeline4Title: "2025-02-24: New era",
        timeline4Text: "Community took over the POGAI project, organized, promoted and started developing the next generation of POGAI products...",
        timeline5Title: "2025-03-21: DAO",
        timeline5Text: "The establishment of DAO (Dec Centralized Autonomous Organization, Decentralized Autonomous Organization) marks the birth of a new organizational form and governance model, the core of which is decentralized collaboration and decision-making through blockchain technology and smart contracts",
        cardTitle1: "Face-less man",
        cardText1: "Can your 'face' be a blank canvas that contains everything —— today want to fill in kindness, curiosity, or quiet company?",
        cardTitle2: "The second declaration",
        cardText2: "When I take out my titanium red-eye skin, what do you do?",
        cardTitle3: "The most diaosi Chinese flow",
        cardText3: "You are right, but this is the panda man, the speed of 200 miles, the pure 1000% of the mysterious power of the East.",
        cardTitle4: "Soul rise to heaven",
        cardText4: "This is not a meme, this is a cyberpunk financial witchcraft —— with the surreal parabola of the anus and the moon, to complete the disenchantment ceremony of capital power!",
        contactEmail: "Email",
        contactTelegram: "Telegram",
        contactTwitter: "Social Media",
        homeText: "Home",
        aboutText: "About",
        buyText: "How to buy",
        roadmapText: "Time line",
        tokenText: "Tokenomics",
        buy_btn_text: "GO TO BUY",
        buyTexts: "How to buy",
    }
};
function getStepTest(str) {
    let stepTest = {};
    for (let i = 1; i <= 4; i++) {
        stepTest[`step${i}`] = STEP[str][`step${i}`];
    }
    return stepTest;
}
// var runStepStatus = false;
// async function runStep(str) {
//     // 添加光标动画样式
//     if (runStepStatus) return false;
//     runStepStatus = true;
//     try {
//         const style = document.createElement('style');
//         style.textContent = `
//                 @keyframes typing-cursor {
//                     0%, 100% { opacity: 0; }
//                     50% { opacity: 1; }
//                 }
//                 .typing-cursor {
//                     display: inline-block;
//                     width: 2px;
//                     background: #c084fc;
//                     margin-left: 2px;
//                     animation: typing-cursor 0.8s infinite;
//                 }
//             `;
//         document.head.appendChild(style);

//         // 打字动画函数
//         async function startTypingAnimation() {
//             const elements = document.querySelectorAll('.typing-text');
//             elements.forEach((element, index) => {
//                 element.innerText = '';
//             });
//             let delay = 50; // 初始延迟
//             let stepTest = getStepTest(str);
//             elements.forEach((element, index) => {
//                 const text = stepTest[`step${index + 1}`];
//                 const cursorSpan = document.createElement('span');
//                 cursorSpan.className = 'typing-cursor';

//                 setTimeout(() => {
//                     element.appendChild(cursorSpan);
//                     let charIndex = 0;

//                     const typeInterval = setInterval(() => {
//                         if (charIndex < text.length) {
//                             const char = document.createTextNode(text[charIndex]);
//                             element.insertBefore(char, cursorSpan);
//                             charIndex++;

//                             // 滚动到可视区域
//                             if (index === elements.length - 1 && charIndex === text.length) {
//                                 element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//                             }
//                         } else {
//                             clearInterval(typeInterval);
//                             cursorSpan.remove();
//                         }
//                     }, 50); // 调整打字速度(毫秒/字)
//                 }, delay);

//                 delay += text.length * 50 + 800; // 自动计算步骤间隔
//             });
//         }
//         await startTypingAnimation();
//     } catch (err) {
//         console.log(err);
//     } finally {
//         runStepStatus = false;
//     }
// };

var runStepStatus = false;

async function runStep(str) {
    if (runStepStatus) return;
    runStepStatus = true;

    try {
        const style = document.createElement('style');
        style.textContent = `
    @keyframes typing-cursor {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    .typing-cursor {
        display: inline-block;
        width: 2px;
        background: #c084fc;
        margin-left: 2px;
        animation: typing-cursor 0.8s infinite;
    }
`;
        document.head.appendChild(style);

        await new Promise(resolve => startTypingAnimation(str, resolve)); // 关键修改
    } finally {
        runStepStatus = false;
    }
}

// 重构后的动画函数
function startTypingAnimation(str, onComplete) {
    const elements = document.querySelectorAll('.typing-text');
    elements.forEach(el => el.innerText = '');

    const stepTest = getStepTest(str);
    let completedSteps = 0;

    elements.forEach((element, index) => {
        const text = stepTest[`step${index + 1}`];
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';

        // 链式延迟确保顺序执行
        setTimeout(() => {
            element.appendChild(cursorSpan);
            let charIndex = 0;

            const interval = setInterval(() => {
                if (charIndex < text.length) {
                    element.insertBefore(document.createTextNode(text[charIndex]), cursorSpan);
                    charIndex++;
                } else {
                    clearInterval(interval);
                    cursorSpan.remove();
                    if (++completedSteps === elements.length) onComplete(); // 完成检测
                }
            }, 50);
        }, calculateDelay(index, stepTest)); // 动态计算精确延迟
    });
}

// 计算累计延迟时间
function calculateDelay(currentIndex, stepTest) {
    return Array.from({ length: currentIndex }, (_, i) =>
        stepTest[`step${i + 1}`].length * 50 + 800
    ).reduce((a, b) => a + b, 0);
}
// 页面加载后启动动画
document.addEventListener('DOMContentLoaded', function () {
    runStep("zh");
});
function switchLang(lang) {
    document.querySelectorAll('[id]').forEach(el => {
        if (langData[lang][el.id]) {
            el.innerHTML = langData[lang][el.id];
        }
    });
    //runStepStatus = false;
    runStep(lang);
}

// 优化动态气泡生成
function createBubbles() {
    const container = document.body;
    const bubbleCount = window.innerWidth > 768 ? 5 : 3;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'deco-bubble';
        bubble.style.cssText = `
                    width: ${Math.random() * 100 + 50}px;
                    height: ${Math.random() * 100 + 50}px;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation-delay: ${Math.random() * 15}s;
                `;
        container.appendChild(bubble);
    }
}


// 窗口大小变化时重置气泡
window.addEventListener('resize', () => {
    document.querySelectorAll('.deco-bubble').forEach(b => b.remove());
    createBubbles();
});

// 复制文本到剪贴板，支持多种环境
function copyTextToClipboard(text, tipStr) {
    try {
        // 创建一个临时的 textarea 元素
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed"; // 防止页面滚动
        document.body.appendChild(textarea);
        textarea.select();

        // 尝试使用 document.execCommand 复制文本
        const success = document.execCommand("copy");
        document.body.removeChild(textarea);

        if (success) {
            // 显示复制成功的提示弹窗
            showCopySuccessPopup(tipStr);
        } else {
            console.log("无法复制文本: 复制命令失败");
        }
    } catch (err) {
        console.log("无法复制文本: ", err);
    }
}
// 显示复制成功的提示弹窗
function showCopySuccessPopup(textStr) {
    const popup = document.createElement('div');
    popup.className = 'copy-success-popup';
    popup.textContent = textStr == undefined ? '文本已复制' : textStr;
    document.body.appendChild(popup);

    // 设置弹窗样式
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#050d0550';
    popup.style.color = 'white';
    popup.style.padding = '13px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';
    popup.style.fontSize = '13px';

    // 3秒后自动消失弹窗
    setTimeout(() => {
        document.body.removeChild(popup);
    }, 3000);
}

/**
 * 高级版打开新标签页
 * @param {string} url - 要打开的网址
 * @param {Object} [options] - 配置选项
 * @param {boolean} [options.focus=true] - 是否聚焦到新窗口
 */
function openAdvancedTab(url, { focus = true } = {}) {
    const newWindow = window.open(url, '_blank');

    if (!newWindow) {
        console.error('弹出窗口被拦截！');
        return;
    }

    newWindow.opener = null;
    focus && newWindow.focus();
}

const data = {
    labels: ['CZ holdings (drop)', 'fair launch '],
    datasets: [{
        label: '数据分布',
        data: [4, 96],
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
        ],
        borderWidth: 2,
        hoverOffset: 20,
        radius: '70%',
        hoverRadius: '75%',
    }]
};

const config = {
    type: 'pie',
    data: data,
    plugins: [ChartDataLabels], // 取消注释启用插件
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20,
                bottom: 20
            }
        },
        plugins: {
            datalabels: {
                color: function (context) {
                    // 动态颜色：深色背景用浅色文字，浅色背景用深色文字
                    const bgColor = context.dataset.backgroundColor[context.dataIndex];
                    return bgColor.startsWith('rgba(255,') ? '#333' : '#fff';
                },
                font: {
                    size: 8,
                    weight: 'bold',
                    family: 'Arial'
                },
                formatter: (value, context) => {
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    return ((value / total) * 100).toFixed(1) + '%';
                },
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowBlur: 3,
                textStrokeColor: 'rgba(255, 255, 255, 0.5)',
                textStrokeWidth: 1,
                anchor: 'center',
                align: 'center',
                clamp: true,
                display: function (context) {
                    // 仅显示超过3%的标签
                    return (context.dataset.data[context.dataIndex] /
                        context.dataset.data.reduce((a, b) => a + b, 0)) * 100 >= 3;
                }
            },
            title: {
                display: true,
                text: 'scale',
                font: { size: 18, weight: 'bold' }
            },
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { size: 12 }
                }
            },
            tooltip: {
                enabled: true,
                bodyFont: { size: 14 },
                callbacks: {
                    label: (context) => {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        },
        animation: {
            duration: 800,
            easing: 'easeOutQuart'
        },
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        }
    }
};
function smoothScrollTo(id) {
    // 获取目标元素
    const target = document.getElementById(id);

    // 元素存在性校验
    if (!target) {
        console.error(`Element with id "${id}" not found`);
        return;
    }

    // 现代浏览器原生方法
    if ('scrollBehavior' in document.documentElement.style) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start' // 对齐到视口顶部
        });
    }
    // 旧浏览器兼容方案
    else {
        const startPosition = window.pageYOffset;
        const targetPosition = target.offsetTop;
        const distance = targetPosition - startPosition;
        const duration = 500; // 动画时长(ms)
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // 缓动函数
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }
}


