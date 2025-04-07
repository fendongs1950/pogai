var vueData;
document.addEventListener('DOMContentLoaded', function () {
  vueData = new Vue({
    el: '#app', // 挂载到ID为app的DOM元素
    data: {
      // 画布实例
      canvas: null,
      memeType: [
        {
          id: 1,
          name: '好色',
          count: 382,
          text: [
            "这腿我能玩一年！",
            "姐姐的腰不是腰，夺命三郎的弯刀",
            "美女加个微信？我扫你还是你扫我？",
            "这颜值，我直接一个滑跪求交往",
            "看到美女走不动道，我妈说我像被定身了",
            "你这长相，属于是老天爷追着喂饭吃",
            "不是我好色，是她们穿得太危险了",
            "美女贴贴，我直接一个猛冲！",
            "这谁顶得住啊？反正我顶不住",
            "看到美女就忍不住想叫老婆，我有罪"
          ]
        },
        {
          id: 2,
          name: '开心',
          count: 72,
          text: [
            "哈哈哈哈笑死，根本停不下来",
            "今天又是被快乐绑架的一天",
            "嘴角疯狂上扬，我妈问我是不是中彩票了",
            "笑得满地找头，谁懂啊！",
            "快乐得像只两百斤的狗子",
            "笑到邻居报警，说我扰民",
            "嘴角咧到后脑勺，根本收不住",
            "开心到原地转圈，像个陀螺",
            "今天的心情：芜湖起飞！",
            "笑得像只偷到鸡的狐狸"
          ]
        },
        {
          id: 3,
          name: '称赞',
          count: 84,
          text: [
            "你这颜值是真实存在的吗？",
            "绝了！这操作直接封神！",
            "你是吃可爱多长大的吧？",
            "这水平，建议直接开班教学",
            "你这脑子是八核处理器吧？",
            "神仙下凡辛苦了！",
            "你这手不是手，是艺术品！",
            "建议直接申遗，太牛了！",
            "你这操作，牛顿看了都得坐起来鼓掌",
            "你这长相，属于是老天爷炫技作品"
          ]
        },
        {
          id: 4,
          name: '认错',
          count: 42,
          text: [
            "我错了，下次还敢（不是）",
            "对不起，是我太嚣张了",
            "我检讨，我反思，我面壁思过",
            "给大佬磕头，砰砰砰！",
            "是我有眼不识泰山，您大人有大量",
            "我承认刚才说话声音有点大",
            "我错了，我这就去写检讨",
            "对不起，是我太年轻不懂事",
            "我认输，您才是真大佬",
            "我反思，我悔过，我痛哭流涕"
          ]
        },
        {
          id: 5,
          name: '骄傲',
          count: 43,
          text: [
            "不是我吹，在座各位都是弟弟",
            "这波操作，我自己都佩服自己",
            "无敌是多么寂寞",
            "不是我针对谁，我是说在座的各位...",
            "这水平，建议直接保送清华",
            "低调点说，我就是天选之子",
            "不是我凡尔赛，是真的太简单了",
            "这战绩，够我吹一辈子",
            "随便玩玩而已，没想到就破纪录了",
            "不是我骄傲，是实力不允许我低调"
          ]
        },
        {
          id: 6,
          name: '生气',
          count: 26,
          text: [
            "我特么直接裂开！",
            "气得我脑瓜子嗡嗡的",
            "血压直接拉满，谁懂？",
            "拳头硬了，真的硬了",
            "这操作，气得我直接卸载游戏",
            "我特么直接一个暴怒！",
            "气得我原地升天，螺旋爆炸",
            "这都能输？队友是人机吧？",
            "血压飙升，急需速效救心丸",
            "气得我直接一拳打穿显示器"
          ]
        },
        {
          id: 7,
          name: '委曲',
          count: 175,
          text: [
            "破防了，真的破防了",
            "为什么受伤的总是我？",
            "委屈，但我不说",
            "眼泪不争气地流了下来",
            "我太难了，真的太难了",
            "这世界还能不能好了？",
            "被生活按在地上摩擦",
            "委屈得像只淋雨的小狗",
            "为什么倒霉的总是我？",
            "破大防了，家人们谁懂啊"
          ]
        },
        {
          id: 8,
          name: '嚣张',
          count: 405,
          text: [
            "就这？我上我也行",
            "不是我吹，单手都能虐你",
            "你们一起上吧，我赶时间",
            "这水平也敢出来混？",
            "建议回去再练十年",
            "不是我针对谁，我是说在座的各位...",
            "就这？我奶奶来都比你强",
            "你们是不是没吃饭？用力点啊",
            "这游戏太简单了，建议加大难度",
            "不是我狂，是你们太菜了"
          ]
        },
        {
          id: 9,
          name: '咒骂',
          count: 226,
          text: [
            "你脑子是被门夹了吗？",
            "你这操作，狗看了都摇头",
            "建议回炉重造，真的",
            "你这水平，人机都比你强",
            "你是不是对面派来的卧底？",
            "你这智商，基本告别游戏了",
            "不会玩就别玩，别坑队友行吗？",
            "你这手速，乌龟都比你快",
            "建议卸载游戏，真的",
            "你这水平，不如去玩4399"
          ]
        },
        {
          id: 10,
          name: '装逼',
          count: 500,
          text: [
            "唉，随便考考就第一，真没意思",
            "这钱赚得太容易了，我都懒得数",
            "不是我凡尔赛，是真的太简单了",
            "这颜值，出门老被要微信，烦死了",
            "随便练练就破纪录了，没挑战性",
            "这车也就一般吧，才两百多万",
            "唉，长得太帅也是一种烦恼",
            "这成绩也就那样吧，年级前十而已",
            "随便投投就中了，运气真好",
            "这游戏太简单了，建议加大难度"
          ]
        },
        {
          id: 11,
          name: '呆滞宅男',
          count: 432,
          text: [
            "啊？女朋友是什么？能吃吗？",
            "新番更新了？我直接一个爆肝！",
            "现实太可怕了，还是二次元好",
            "纸片人老婆才是真爱",
            "出门？不如在家打游戏",
            "社交是什么？能兑换游戏币吗？",
            "啊？今天星期几？我忘了",
            "外卖到了？放门口就行，别敲门",
            "现实里的女生哪有动漫里的香",
            "啊？太阳好刺眼，我要回被窝"
          ]
        },
        {
          id: 12,
          name: '娇艳骚货',
          count: 255,
          text: [
            "哥哥，你女朋友不会生气吧？",
            "姐姐化妆好厉害哦，我都不会呢",
            "啊？我穿这样是不是太暴露了？",
            "哥哥，你女朋友好凶哦，不像我",
            "人家只是不小心摔倒啦，不是故意的",
            "姐姐别误会，我和哥哥只是普通朋友",
            "啊？我素颜很丑的，不敢见人",
            "哥哥，你女朋友是不是不喜欢我呀？",
            "人家只是比较笨啦，不像姐姐那么聪明",
            "啊？我是不是说错话了？对不起嘛"
          ]
        },
        {
          id: 13,
          name: '我爱学习',
          count: 54,
          text: [
            "不说了，我要去刷题了",
            "学习使我快乐，真的",
            "游戏？不如刷两套卷子",
            "今天也是沉迷学习无法自拔的一天",
            "别拦我，我要和数学结婚",
            "放假？正好可以多背点单词",
            "周末计划：刷题、复习、预习",
            "娱乐是什么？能吃吗？",
            "看到书就兴奋，我是不是没救了",
            "学习才是真爱，其他都是意外"
          ]
        },
        {
          id: 14,
          name: '孝敬大佬',
          count: 34,
          text: [
            "大佬喝茶，我给您捶腿",
            "大佬牛逼！请收下我的膝盖",
            "大佬缺挂件吗？我超会喊666",
            "大佬带带我，我给您当狗",
            "大佬说什么都是对的",
            "大佬缺小弟吗？我超乖的",
            "大佬您坐，我给您扇风",
            "大佬的腿不是腿，是塞纳河畔的春水",
            "大佬缺暖床的吗？我自带被褥",
            "大佬您歇着，脏活累活我来干"
          ]
        },
        {
          id: 15,
          name: '中国功夫',
          count: 83,
          text: [
            "咏春，叶问！",
            "我要打十个！",
            "阁下可敢接我一招？",
            "这波操作，李小龙看了都点赞",
            "在下佛山黄飞鸿，请赐教！",
            "功夫再高，也怕菜刀",
            "看我降龙十八掌！",
            "接化发！传统功夫讲究四两拨千斤",
            "年轻人不讲武德，偷袭我69岁的老同志",
            "我这一拳二十年的功力，你挡得住吗？"
          ]
        }
      ],
      DefaultType: 1, // 默认类型
      // 模板图片数据
      // templates: [
      //   { id: 1, url: '好色/1.jpg', name: '好色' },
      //   { id: 2, url: '中国功夫/1.jpg', name: '中国功夫' },
      // ],

      // 表情符号数组
      stickers: [
        // 笑脸类
        '😂', '😊', '😍', '😎', '😜',
        '😇', '😋', '😘',

        // 便便类（您特别要求的）
        '💩', '👻', '👽', '👾', '🎃',
        '🍌', '👓', '🎩', '💥',

        // 爱心类
        '❤️', '💛', '💚', '💙', '💜',
        '💔', '❣️', '💕', '💞', '💓', '💗', '💖',

        // 手势类
        '👍', '👎', '✌️', '👌',
        '👈', '👉', '👆', '👇', '✋',

        // 物品类
        '🔥', '💯', '✨', '🎉', '🎊', '🎁', '🏆',
        '⚽', '🏀', '🏈', '⚾', '🎾',

        // 动物类
        '🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼',
        '🐨', '🐯', '🐮', '🐷', '🐸', '🐵',

        // 特殊符号
        '⭐', '🌟', '🌠', '☀️', '🌈', '☁️', '⚡', '❄️',
        '💧', '🌊', '🍏', '🍎', '🍕', '🍔', '🍟', '🍦'
      ],

      // 文本相关属性
      textContent: '', // 文本内容
      fontSize: 20,    // 字体大小
      textColor: '#ffffff', // 文字颜色
      strokeColor: '#000000', // 描边颜色

      // 水印相关属性
      watermarkText: ' POGAI 熊猫人 ', // 水印文字
      showWatermark: true, // 是否显示水印

      // 控制各个工具面板的展开/折叠状态
      activeSections: {
        upload: false,    // 上传面板
        templates: false, // 模板面板
        text: true,      // 文本面板
        stickers: false,  // 贴纸面板
        watermark: false  // 水印面板
      }
    },
    computed: {
      memeTypeData() {
        return this.memeType.map(data => ({
          id: data.id,
          url: data.name + '/1.jpg',
          name: data.name,
          count: data.count
        }));
      }
    },
    // 组件挂载完成后执行
    mounted() {
      this.initCanvas(); // 初始化画布
      let randomNumber = this.getMemeRandomNumber(this.DefaultType);
      let data = {
        id: this.DefaultType,
        url: this.memeType[this.DefaultType - 1].name + '/' + randomNumber + '.jpg',
        name: this.memeType[this.DefaultType - 1].name,
        count: this.memeType[this.DefaultType - 1].count
      }
      console.log(data);
      this.loadTemplate(data); // 随机加载一个模板
      this.randomLoadText();
      window.addEventListener('keydown', this.handleKeyDown); // 监听键盘事件
    },

    methods: {
      selectTemplate(template) {
        this.DefaultType = template.id; // 设置当前选中的模板ID
        this.loadTemplateFromType(template);
      },
      // 从分类加载模板（随机选择该分类下的一个模板）
      loadTemplateFromType(template) {
        const randomNumber = this.getMemeRandomNumber(template.id);
        this.loadTemplate({
          id: template.id,
          url: `${template.name}/${randomNumber}.jpg`,
          name: template.name
        });
        this.randomLoadText();
      },
      getRandomIndex(max = 9) {
        return Math.floor(Math.random() * (max + 1));
      },
      randomLoadText(){
        let randomIndex = this.getRandomIndex();
        let randomText = this.memeType[this.DefaultType - 1].text[randomIndex];
        this.textContent = randomText;
      },
      randomLoadTemplate() {
        const randomNumber = this.getMemeRandomNumber(this.DefaultType);
        this.loadTemplate({
          id: this.DefaultType,
          url: `${this.memeType[this.DefaultType - 1].name}/${randomNumber}.jpg`,
          name: this.memeType[this.DefaultType - 1].name
        });
        this.randomLoadText();
      },
      /**
       * 生成指定分类的随机整数 (1 ≤ random ≤ count)
       * @param {number} categoryId - memeType 中的 id
       * @returns {number} 随机整数
       */
      getMemeRandomNumber(categoryId) {
        const category = this.memeType.find(item => item.id === categoryId);

        // 错误处理（无效ID或count<=0时返回1）
        if (!category || category.count <= 0) {
          console.warn(`无效的分类ID或count值: ${categoryId}`);
          return 1;
        }

        // 安全生成 1~count 的随机整数（兼容所有浏览器）
        return Math.floor(Math.random() * category.count) + 1;
      },
      // 初始化画布
      initCanvas() {
        this.canvas = new fabric.Canvas('canvas', {
          preserveObjectStacking: true,
          backgroundColor: '#f0f0f0',
          selection: true, // 启用选择
          selectionColor: 'rgba(100, 100, 255, 0.3)',
          selectionBorderColor: 'blue',
          selectionLineWidth: 2
        });

        // 确保对象可交互
        this.canvas.on('selection:created', () => {
          console.log('对象被选中:', this.canvas.getActiveObject());
        });

        // 移动端支持
        if ('ontouchstart' in window) {
          this.canvas.allowTouchScrolling = false;
          this.canvas.on('touch:drag', (e) => {
            if (e.target) e.target.setCoords();
          });
        }
      },

      addText() {
        if (!this.textContent) return;
      
        // 获取图片对象
        const imageObject = this.canvas.getObjects().find(obj => obj.type === 'image');
        
        // 计算文字位置（图片下方）
        let textTop = this.canvas.getHeight() / 2; // 默认居中
        if (imageObject) {
          textTop = imageObject.top + imageObject.height / 2 + 20; // 图片底部 + 20px间距
        }
      
        const text = new fabric.Text(this.textContent, {
          left: this.canvas.getWidth() / 2,  // 水平居中
          top: textTop,                      // 图片下方位置
          fontSize: parseInt(this.fontSize),
          fill: this.textColor,
          fontFamily: 'Impact',
          stroke: this.strokeColor,
          strokeWidth: 2,
          originX: 'center',    // 中心对齐
          originY: 'top',       // 顶部对齐（相对于文字本身）
          hasControls: true,
          hasBorders: true,
          selectable: true,
          evented: true,
          textAlign: 'center',  // 文字内容居中
          lockMovementX: false,
          lockMovementY: false,
          lockRotation: false,
          lockScalingX: false,
          lockScalingY: false
        });
      
        this.canvas.add(text);
        this.canvas.setActiveObject(text);
        this.canvas.renderAll();
        this.textContent = '';
      },

      addSticker(sticker) {
        const stickerObj = new fabric.Text(sticker, {
          left: this.canvas.getWidth() / 2,
          top: this.canvas.getHeight() / 2,
          fontSize: 60,
          fill: '#000000',
          hasControls: true,
          hasBorders: true,
          selectable: true,
          evented: true,
          lockMovementX: false,
          lockMovementY: false,
          lockRotation: false,
          lockScalingX: false,
          lockScalingY: false
        });

        this.canvas.add(stickerObj);
        this.canvas.setActiveObject(stickerObj);
        this.canvas.renderAll();
      },

      // 调整画布尺寸（响应式）
      resizeCanvas() {
        const container = document.querySelector('.canvas-container');
        if (!container || !this.canvas) return;

        // 判断是否是移动端
        const isMobile = window.innerWidth <= 768;
        // 移动端使用容器宽度，桌面端固定500px
        const newWidth = isMobile ? container.clientWidth : 500;
        // 保持正方形比例
        const newHeight = isMobile ? container.clientWidth : 500;

        // 设置画布新尺寸
        this.canvas.setDimensions({
          width: newWidth,
          height: newHeight
        });

        // 调整画布上所有图片对象的大小和位置
        this.canvas.getObjects().forEach(obj => {
          if (obj._element && obj._element.tagName === 'IMG') {
            const scale = Math.min(
              newWidth * 0.8 / obj.width,
              newHeight * 0.8 / obj.height
            );
            obj.scaleToWidth(newWidth * 0.8); // 缩放图片
            obj.center(); // 居中图片
          }
        });

        this.canvas.renderAll(); // 重新渲染画布
      },

      // 加载模板图片
      loadTemplate(template) {
        this.canvas.clear(); // 清空画布

        fabric.Image.fromURL(template.url, img => {
          // 获取当前画布宽度
          const canvasWidth = this.canvas.getWidth();
          const canvasHeight = this.canvas.getHeight();

          // 计算缩放比例（使图片宽度等于画布宽度）
          const scale = canvasWidth / img.width;

          // 计算缩放后的高度
          const scaledHeight = img.height * scale;

          // 如果缩放后高度超过画布，则重新计算比例
          const finalScale = scaledHeight > canvasHeight
            ? canvasHeight / img.height  // 改用高度适配
            : scale;                    // 保持宽度适配

          // 设置图片属性
          img.set({
            left: canvasWidth / 2,
            top: canvasHeight / 2,
            originX: 'center',
            originY: 'center',
            scaleX: finalScale,
            scaleY: finalScale,
            hasControls: true,
            hasBorders: true,
            lockMovementX: false,
            lockMovementY: false,
            lockRotation: false,
            lockScalingX: false,
            lockScalingY: false
          });

          this.canvas.add(img);
          this.canvas.sendToBack(img);
          // this.applyWatermark();
          this.addText();
          // 调试用：打印尺寸信息
          console.log(`画布: ${canvasWidth}x${canvasHeight} | 图片原始: ${img.width}x${img.height} | 缩放比例: ${finalScale}`);
        });
      },

      // 切换工具面板的展开/折叠状态
      toggleSection(section) {
        this.activeSections[section] = !this.activeSections[section];
      },

      // 触发文件上传点击事件
      triggerUpload() {
        document.getElementById('image-upload').click();
      },

      // 处理图片上传
      handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          fabric.Image.fromURL(event.target.result, img => {
            const scale = this.canvas.getWidth() / img.width;

            img.set({
              left: this.canvas.getWidth() / 2,
              top: this.canvas.getHeight() / 2,
              originX: 'center',
              originY: 'center',
              scaleX: scale,
              scaleY: scale,
              hasControls: true,
              hasBorders: true
            });

            // 1. 先添加图片到顶层（便于用户操作）
            this.canvas.add(img);
            this.canvas.bringToFront(img); // 临时置顶
            this.canvas.setActiveObject(img);

            // 2. 强制水印重新置顶（会覆盖图片的顶层状态）
            // this.applyWatermark(); 

            // 3. 可选：添加事件监听确保水印始终在最前
            // img.on('moving', () => {
            //   this.applyWatermark(); // 图片移动时重新置顶水印
            // });
          });
        };
        reader.readAsDataURL(file);
      },

      // 删除选中的对象
      deleteSelected() {
        const activeObject = this.canvas.getActiveObject();
        if (activeObject) {
          this.canvas.remove(activeObject);
        }
      },

      // 应用水印
      applyWatermark() {
        // 先移除现有的水印
        this.canvas.getObjects().forEach(obj => {
          if (obj.isWatermark) {
            this.canvas.remove(obj);
          }
        });

        if (!this.showWatermark) return;

        // 创建更醒目的水印（带半透明背景）
        const watermarkText = new fabric.Text(this.watermarkText, {
          fontSize: 15,
          fill: '#ffffff',  // 白色文字
          fontFamily: 'Arial',
          fontWeight: 'bold',
          shadow: 'rgba(0,0,0,0.5) 1px 1px 2px' // 文字阴影增强可读性
        });

        // 创建背景矩形
        const watermarkBg = new fabric.Rect({
          width: watermarkText.getScaledWidth(),
          height: watermarkText.getScaledHeight(),
          fill: 'rgba(0,0,0,0.3)',  // 半透明黑色背景
          rx: 4,  // 圆角
          ry: 4
        });

        // 组合成水印组
        const watermarkObj = new fabric.Group([watermarkBg, watermarkText], {
          left: this.canvas.getWidth() - 20,
          top: this.canvas.getHeight() - 20,
          originX: 'right',
          originY: 'bottom',
          selectable: false,
          evented: false,
          isWatermark: true,
          lockMovementX: true,  // 完全锁定位置
          lockMovementY: true
        });

        // 先添加到画布
        this.canvas.add(watermarkObj);

        // 强制置顶（3次确保可靠）
        this.canvas.bringToFront(watermarkObj);
        this.canvas.renderAll();
        setTimeout(() => {
          this.canvas.bringToFront(watermarkObj);
          this.canvas.renderAll();
        }, 100);
      },

      // 导出图片
      // exportImage() {
      //   // 创建临时Canvas
      //   const tempCanvas = document.createElement('canvas');
      //   tempCanvas.width = this.canvas.getWidth();
      //   tempCanvas.height = this.canvas.getHeight();
      //   const tempCtx = tempCanvas.getContext('2d');
      
      //   // 绘制白色背景（解决透明背景变黑问题）
      //   tempCtx.fillStyle = '#ffffff';
      //   tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      
      //   // 使用toDataURLWithMultiplier替代clone方案
      //   const dataURL = this.canvas.toDataURL({
      //     format: 'png',
      //     quality: 1,
      //     multiplier: 2
      //   });
      
      //   // 统一使用Blob方案处理下载（兼容所有现代浏览器）
      //   this.downloadWithBlob(dataURL, '熊猫人表情包.png');
      // },
      
      // // 通用Blob下载方法（兼容PC/手机）
      // downloadWithBlob(dataURL, filename) {
      //   // 1. 转换为Blob
      //   const blob = this.dataURLtoBlob(dataURL);
      //   const url = URL.createObjectURL(blob);
      
      //   // 2. 创建下载链接
      //   const link = document.createElement('a');
      //   link.href = url;
      //   link.download = filename;
        
      //   // 3. 兼容iOS Safari的特殊处理
      //   if (this.isIOS()) {
      //     // iOS需要用户主动触发点击
      //     link.target = '_blank';
      //     link.click();
      //     this.showStatusMessage('请在新页面长按保存图片');
      //   } 
      //   // 4. 其他平台标准下载
      //   else {
      //     document.body.appendChild(link);
      //     link.click();
      //     document.body.removeChild(link);
      //     this.showStatusMessage('下载已开始...');
      //   }
      
      //   // 5. 延迟释放内存
      //   setTimeout(() => {
      //     URL.revokeObjectURL(url);
      //   }, 100);
      // },
      
      // // 增强版DataURL转Blob
      // dataURLtoBlob(dataURL) {
      //   try {
      //     const arr = dataURL.split(',');
      //     const mime = arr[0].match(/:(.*?);/)[1];
      //     const bstr = atob(arr[1]);
      //     const u8arr = new Uint8Array(bstr.length);
          
      //     for (let i = 0; i < bstr.length; i++) {
      //       u8arr[i] = bstr.charCodeAt(i);
      //     }
          
      //     return new Blob([u8arr], { type: mime });
      //   } catch (e) {
      //     console.error('Blob转换失败:', e);
      //     // 备用方案：使用原始DataURL
      //     return dataURL;
      //   }
      //},
      exportImage() {
        // 1. 创建临时离屏Canvas（避免污染主画布）
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.getWidth();
        tempCanvas.height = this.canvas.getHeight();
        const tempCtx = tempCanvas.getContext('2d');

        // 2. 绘制背景（解决透明背景变黑问题）
        tempCtx.fillStyle = this.canvas.backgroundColor || '#ffffff';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        // 3. 导出Fabric画布到临时Canvas
        this.canvas.clone(clone => {
          // 4. 添加临时水印（如果需要）
          if (this.showWatermark) {
            const watermark = new fabric.Text(this.watermarkText, {
              left: tempCanvas.width - 10,
              top: tempCanvas.height - 10,
              originX: 'right',
              originY: 'bottom',
              fontSize: 15,
              fill: '#ffffff',  // 白色文字
              fontFamily: 'Arial',
              fontWeight: 'bold',
              shadow: 'rgba(0,0,0,0.5) 1px 1px 2px' // 文字阴影增强可读性
            });
            clone.add(watermark);
            clone.renderAll();
          }

          // 5. 转换为图片数据
          const dataURL = clone.toDataURL({
            format: 'png',
            quality: 1,
            multiplier: 2 // 高清导出
          });

          // 6. 原生下载实现
          this.nativeDownload(dataURL, 'pogai_on_bsc'+Date.now()+'.png');
        });
      },

      // 原生下载方法（兼容所有浏览器）
      nativeDownload(dataURL, filename) {
        // 方法1：优先使用Blob（更可靠）
        if (window.Blob && window.URL) {
          const blob = this.dataURLToBlob(dataURL);
          const url = URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = filename;

          // 兼容iOS Safari
          if (/iP(hone|ad|od)/i.test(navigator.userAgent)) {
            window.open(url);
          } else {
            link.click();
          }

          // 延迟释放内存
          setTimeout(() => {
            URL.revokeObjectURL(url);
          }, 100);
        }
        // 方法2：备用方案（兼容老旧浏览器）
        else {
          const win = window.open();
          win.document.write(`<img src="${dataURL}" onload="this.parentNode.removeChild(this)">`);
        }
      },

      // DataURL转Blob
      dataURLToBlob(dataURL) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        const u8arr = new Uint8Array(bstr.length);

        for (let i = 0; i < bstr.length; i++) {
          u8arr[i] = bstr.charCodeAt(i);
        }

        return new Blob([u8arr], { type: mime });
      },
      // 处理键盘事件
      handleKeyDown(e) {
        // 按Delete或Backspace键删除选中对象
        if (e.key === 'Delete' ) { //|| e.key === 'Backspace'
          this.deleteSelected();
        }
      }
    },

    // 组件销毁前执行
    beforeDestroy() {
      // 移除事件监听器
      window.removeEventListener('resize', this.resizeCanvas);
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  });
});
// // 辅助函数：DataURL转Blob
// function dataURLToBlob(dataURL) {
//   const arr = dataURL.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new Blob([u8arr], { type: mime });
// }
