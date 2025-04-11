var vueData;
document.addEventListener('DOMContentLoaded', function () {
  vueData = new Vue({
    el: '#app', // 挂载到ID为app的DOM元素
    data: {
      pattern: false, // 选择的模式 false 是选择模式
      // 画布实例
      canvas: null,
      memeType: _vueData.memeType,
      DefaultType: 1, // 默认类型
      // 表情符号数组
      stickers: _vueData.stickers,
      // 文本相关属性
      textContent: '', // 文本内容
      fontSize: 20,    // 字体大小
      textColor: '#ffffff', // 文字颜色
      strokeColor: '#000000', // 描边颜色

      // 水印相关属性
      watermarkText: ' POGAI DFCC ', // 水印文字
      showWatermark: true, // 是否显示水印

      // 控制各个工具面板的展开/折叠状态
      activeSections: {
        upload: false,    // 上传面板
        templates: false, // 模板面板
        text: true,      // 文本面板
        stickers: false,  // 贴纸面板
        watermark: false  // 水印面板
      },
      history: [],
      historyIndex: -1,//历史记录索引
      isDrawing: false,
      brushColor: '#000000',
      brushSize: 5,
      //定义两个变量一个是重做，一个 是撤销
      redo: false,//重做
      undo: false,//撤销
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
      this.loadingCanvas(); // 加载同步画布
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
      // 切换画笔模式
      toggleBrush() {
        let dom = document.getElementById('main-canvas-container');
        if(!this.pattern)
        this.replaceClass(dom,'select-pattern','paintingBrush-pattern');
        else
        this.replaceClass(dom,'paintingBrush-pattern','select-pattern');
        this.isDrawing = !this.isDrawing;
        this.canvas.isDrawingMode = this.isDrawing;

        if (this.isDrawing) {
          this.canvas.freeDrawingBrush.color = this.brushColor;
          this.canvas.freeDrawingBrush.width = this.brushSize;
          this.canvas.selection = false; // 禁用选择模式
        } else {
          this.canvas.selection = true; // 恢复选择模式
        }
      },
      // 保存画布状态
      saveState() {
        // 只保留最新的50个状态以防止内存问题
        if(this.redo||this.undo) return;//重做和撤销不保存状态
        if (this.historyIndex < this.history.length - 1) {
          this.history = this.history.slice(0, this.historyIndex + 1);
        }

        if (this.history.length >= 50) {
          this.history.shift();
        }

        this.history.push(JSON.stringify(this.canvas.toDatalessJSON()));
        this.historyIndex = this.history.length - 1;
      },
      //撤销操作
      async undoAction() {
        this.undo = true;
        if (this.historyIndex > 0) {
            try {
              this.historyIndex--;
              await this.loadState(); // 等待状态加载完成
            } finally {
              // 确保无论如何都清除标记
              setTimeout(() => {
                this.undo = false;
              }, 100); // 稍作延迟确保 Fabric.js 内部事件触发完毕
            }
        }
      },
      
      // 重做操作
      async redoAction() {
        this.redo = true;
        if (this.historyIndex < this.history.length - 1) {
            
            try {
              this.historyIndex++;
              await this.loadState(); // 等待状态加载完成
            } finally {
              // 确保无论如何都清除标记
              setTimeout(() => {
                this.redo = false;
              }, 100); // 稍作延迟确保 Fabric.js 内部事件触发完毕
            }
        }
      },
      // 加载状态
      loadState() {
        this.canvas.loadFromJSON(this.history[this.historyIndex], () => {
            this.canvas.renderAll();
        });
      },
      // 打开颜色选择器
      openColorPicker() {
          // 创建颜色选择面板
          document.getElementById('mobileToolbar').
          style.transform = `translateX(-100%)`;
          const panel = document.createElement('div');
          panel.style.position = 'fixed';
          panel.style.top = '50%';
          panel.style.left = '50%';
          panel.style.transform = 'translate(-50%, -50%)';
          panel.style.backgroundColor = 'white';
          panel.style.padding = '20px';
          panel.style.borderRadius = '10px';
          panel.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
          panel.style.zIndex = '1000';
          panel.style.display = 'flex';
          panel.style.flexDirection = 'column';
          panel.style.gap = '15px';
          panel.style.width = '280px';
          panel.style.maxWidth = '90vw';
          
          // 标题
          const title = document.createElement('div');
          title.textContent = '画笔设置';
          title.style.fontSize = '18px';
          title.style.fontWeight = '600';
          title.style.color = '#333';
          title.style.textAlign = 'center';
          title.style.marginBottom = '10px';
          
          // 颜色选择器
          const colorGroup = document.createElement('div');
          colorGroup.style.display = 'flex';
          colorGroup.style.alignItems = 'center';
          colorGroup.style.gap = '10px';
          
          const colorLabel = document.createElement('span');
          colorLabel.textContent = '颜色:';
          colorLabel.style.fontWeight = '500';
          colorLabel.style.width = '50px';
          
          const colorInput = document.createElement('input');
          colorInput.type = 'color';
          colorInput.value = this.brushColor;
          colorInput.style.flex = '1';
          colorInput.style.height = '36px';
          colorInput.style.borderRadius = '4px';
          colorInput.style.border = '1px solid #ddd';
          colorInput.style.cursor = 'pointer';
          
          colorGroup.appendChild(colorLabel);
          colorGroup.appendChild(colorInput);
          
          // 画笔粗细设置
          const sizeGroup = document.createElement('div');
          sizeGroup.style.display = 'flex';
          sizeGroup.style.flexDirection = 'column';
          sizeGroup.style.gap = '5px';
          sizeGroup.style.alignItems = 'center';
          
          const sizeLabel = document.createElement('div');
          sizeLabel.style.display = 'flex';
          sizeLabel.style.justifyContent = 'space-between';
          sizeLabel.style.width = '100%';
          
          const sizeText = document.createElement('span');
          sizeText.textContent = '粗细:';
          sizeText.style.fontWeight = '500';
          
          const sizeValue = document.createElement('span');
          sizeValue.textContent = `${this.brushSize}px`;
          sizeValue.style.color = '#666';
          
          sizeLabel.appendChild(sizeText);
          sizeLabel.appendChild(sizeValue);
          
          // 画笔大小预览圆形
          const sizePreview = document.createElement('div');
          sizePreview.style.width = `${this.brushSize}px`;
          sizePreview.style.height = `${this.brushSize}px`;
          sizePreview.style.borderRadius = '50%';
          sizePreview.style.backgroundColor = this.brushColor;
          sizePreview.style.margin = '10px 0';
          sizePreview.style.transition = 'all 0.2s ease';
          
          const sizeInput = document.createElement('input');
          sizeInput.type = 'range';
          sizeInput.min = '1';
          sizeInput.max = '30';
          sizeInput.value = this.brushSize;
          sizeInput.style.width = '100%';
          sizeInput.style.accentColor = this.brushColor;
          
          // 实时更新粗细显示和预览
          sizeInput.addEventListener('input', () => {
            const newSize = sizeInput.value;
            sizeValue.textContent = `${newSize}px`;
            sizePreview.style.width = `${newSize}px`;
            sizePreview.style.height = `${newSize}px`;
            sizePreview.style.backgroundColor = colorInput.value;
            sizeInput.style.accentColor = colorInput.value;
          });
          
          // 颜色变化时更新预览
          colorInput.addEventListener('input', () => {
            sizePreview.style.backgroundColor = colorInput.value;
            sizeInput.style.accentColor = colorInput.value;
          });
          
          sizeGroup.appendChild(sizeLabel);
          sizeGroup.appendChild(sizePreview);
          sizeGroup.appendChild(sizeInput);
          
          // 按钮容器
          const buttonGroup = document.createElement('div');
          buttonGroup.style.display = 'flex';
          buttonGroup.style.justifyContent = 'flex-end';
          buttonGroup.style.gap = '10px';
          buttonGroup.style.marginTop = '10px';
          
          // 取消按钮
          const cancelBtn = document.createElement('button');
          cancelBtn.textContent = '取消';
          cancelBtn.style.padding = '8px 16px';
          cancelBtn.style.backgroundColor = 'transparent';
          cancelBtn.style.color = '#666';
          cancelBtn.style.border = '1px solid #ddd';
          cancelBtn.style.borderRadius = '4px';
          cancelBtn.style.cursor = 'pointer';
          
          // 确认按钮
          const confirmBtn = document.createElement('button');
          confirmBtn.textContent = '确定';
          confirmBtn.style.padding = '8px 16px';
          confirmBtn.style.backgroundColor = this.brushColor;
          confirmBtn.style.color = 'white';
          confirmBtn.style.border = 'none';
          confirmBtn.style.borderRadius = '4px';
          confirmBtn.style.cursor = 'pointer';
          confirmBtn.style.transition = 'background-color 0.2s';
          
          // 按钮颜色随选择变化
          colorInput.addEventListener('input', () => {
            confirmBtn.style.backgroundColor = colorInput.value;
          });
          
          // 关闭面板函数
          const closePanel = () => {
            document.body.removeChild(panel);
            document.body.removeChild(overlay);
            document.getElementById('mobileToolbar').
            style.transform = `translateX(0%)`;
          };
          
          // 取消按钮点击事件
          cancelBtn.addEventListener('click', closePanel);
          
          // 确认按钮点击事件
          confirmBtn.addEventListener('click', () => {
            this.brushColor = colorInput.value;
            this.brushSize = parseInt(sizeInput.value);
            
            if (this.isDrawing) {
              this.canvas.freeDrawingBrush.color = this.brushColor;
              this.canvas.freeDrawingBrush.width = this.brushSize;
            }
            
            closePanel();
          });
          
          // 半透明遮罩层
          const overlay = document.createElement('div');
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
          overlay.style.zIndex = '999';
          
          // 点击遮罩层关闭面板
          overlay.addEventListener('click', closePanel);
          
          // 组装面板
          panel.appendChild(title);
          panel.appendChild(colorGroup);
          panel.appendChild(sizeGroup);
          buttonGroup.appendChild(cancelBtn);
          buttonGroup.appendChild(confirmBtn);
          panel.appendChild(buttonGroup);
          
          // 添加到DOM
          document.body.appendChild(overlay);
          document.body.appendChild(panel);
          
          // 聚焦颜色选择器以便键盘操作
          colorInput.focus();
      },
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
      getRandomIndex(max = 29) {
        return Math.floor(Math.random() * (max + 1));
      },
      randomLoadText() {
        let randomIndex = this.getRandomIndex();
        let randomText = this.memeType[this.DefaultType - 1].text[randomIndex];
        
        // 直接通过 ref 更新
        this.$refs.textInput.value = randomText;
        // 同时更新数据绑定
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
        // 监听画布变化，用于撤销/重做功能
        this.canvas.on('object:modified', this.saveState);
        this.canvas.on('object:added', this.saveState);
        this.canvas.on('object:removed', this.saveState);
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
      // 增强版：结合用户代理和屏幕尺寸（推荐）
      /**
      * 根据屏幕宽度判断设备类型
      * @returns {string} 设备类型标识
      * - 'mobile' - 手机 (宽度 < 768px)
      * - 'tablet' - 平板 (768px ≤ 宽度 < 992px) 
      * - 'desktop' - 电脑 (宽度 ≥ 992px)
      * - 'unknown' - 未知设备
      */
      loadingCanvas() {
        const screenWidth =
          document.documentElement.clientWidth ||
          document.body.clientWidth || window.innerWidth;

        // 标准响应式断点 (参考Bootstrap)
        if (screenWidth < 768) {
          let mobile = document.getElementsByClassName("upper-canvas ")[0];
          mobile.style.width = "100%";
          mobile.style.height = screenWidth + "px";
          // document.getElementById("app-desc").style.display = "none";
          // document.getElementById("user-actions").style.display = "none";
          // document.getElementById("logo").style.display = "none";
          let container = document.getElementsByClassName("canvas-container")[0];
          container.style.width = "100%";
          container.style.height = screenWidth + "px";
        } else {
          let desktop = document.getElementsByClassName("upper-canvas ")[0];
          desktop.style.width = "500px";
          desktop.style.height = "500px";
          let mainCanvas = document.getElementById("main-canvas-container");
          let toolbar = document.getElementById("toolbar");
          toolbar.style.height = mainCanvas.style.height;//两边高度同步
        }
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
          this.nativeDownload(dataURL, 'pogai_on_bsc' + Date.now() + '.png');
        });
      },
      // exportImage() {
      //   // 1. 克隆主画布（保留原始画布不受影响）
      //   this.canvas.clone(clone => {
      //     // 2. 添加水印到克隆画布（如果需要）
      //     if (this.showWatermark) {
      //       const watermark = new fabric.Text(this.watermarkText, {
      //         left: clone.getWidth() - 10,
      //         top: clone.getHeight() - 10,
      //         originX: 'right',
      //         originY: 'bottom',
      //         fontSize: 15,
      //         fill: '#ffffff',
      //         fontFamily: 'Arial',
      //         fontWeight: 'bold',
      //         shadow: 'rgba(0,0,0,0.5) 1px 1px 2px'
      //       });
      //       clone.add(watermark);
      //       clone.renderAll();
      //     }

      //     // 3. 直接从克隆画布导出
      //     const dataURL = clone.toDataURL({
      //       format: 'png',
      //       quality: 1,
      //       multiplier: 2 // 高清导出
      //     });

      //     // 4. 触发下载
      //     this.nativeDownload(dataURL, 'pogai_on_bsc_'+Date.now()+'.png');

      //     // 5. 销毁克隆画布释放内存
      //     clone.dispose();
      //   });
      // },
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
      replaceClass(element, oldClass, newClass) {
        if (!element || !oldClass || !newClass) return;
        this.pattern = !this.pattern;
        // 移除旧类名（兼容包含多个类名的情况）
        element.classList.remove(oldClass);
        
        // 添加新类名（避免重复添加）
        if (!element.classList.contains(newClass)) {
          element.classList.add(newClass);
        }
      },
      // 处理键盘事件
      handleKeyDown(e) {
        // 按Delete或Backspace键删除选中对象
        if (e.key === 'Delete') { //|| e.key === 'Backspace'
          this.deleteSelected();
        }
      },
      // togglePanel(panelId, bottomValue = '100%') {
      //   const panel = document.getElementById(panelId);
      //   if (!panel) return;
        
      //   // 检查当前状态
      //   const isActive = panel.classList.contains('active-panel');
        
      //   if (isActive) {
      //     // 关闭面板
      //     panel.classList.remove('active-panel');
      //     panel.style.transform = 'translateY(100%)';
      //     document.removeEventListener('click', this.handleOutsideClick);
      //   } else {
      //     // 打开面板
      //     panel.classList.add('active-panel');
      //     panel.style.transform = `translateY(-${bottomValue})`;
      //     //panel.style.bottom = bottomValue;
      //     // 添加全局点击监听
      //     this.handleOutsideClick = (event) => {
      //       if (!panel.contains(event.target)) {
      //         this.togglePanel(panelId, bottomValue);
      //       }
      //     };
      //     document.addEventListener('click', this.handleOutsideClick);
      //   }
      // },
      togglePanel(panelId, show = true, targetPosition = '100%') {
        const panel = document.getElementById(panelId);
        if (!panel) return;
      
        if (show) {
          // 显示面板：移动到指定位置
          document.getElementById('mobileToolbar').
          style.transform = `translateX(-100%)`;
          panel.style.transform = `translateY(-${targetPosition})`;
          // this.handleOutsideClick = (event) => {
          //   if (!panel.contains(event.target)) {
          //     this.togglePanel(panelId,false, '-100%');
          //   }
          // };
          // document.addEventListener('click', this.handleOutsideClick);
        } else {
          // 隐藏面板：移回底部
          // document.removeEventListener('click', this.handleOutsideClick);
          panel.style.transform = 'translateY(100%)';
          document.getElementById('mobileToolbar').
          style.transform = `translateX(0%)`;
        }
      },
      //写一个隐藏工具栏的函数
      hideToolbar(panelId) {
        this.togglePanel(panelId, false, '-100%');
      },
      // 翻转图片
  flipImage(direction) {
    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) return;
    
    if (direction === 'horizontal') {
      activeObject.set('flipX', !activeObject.flipX);
    } else if (direction === 'vertical') {
      activeObject.set('flipY', !activeObject.flipY);
    }
    
    activeObject.setCoords();
    this.canvas.renderAll();
    this.saveState(); // 如果需要撤销功能
  },
  
  // 旋转图片
  rotateImage(degrees) {
    const activeObject = this.canvas.getActiveObject();
    if (!activeObject) return;
    
    const newAngle = (activeObject.angle + degrees) % 360;
    activeObject.angle = newAngle;
    activeObject.setCoords();
    this.canvas.renderAll();
    this.saveState(); // 如果需要撤销功能
  }
    },
    
    // 组件销毁前执行
    beforeDestroy() {
      // 移除事件监听器
      window.removeEventListener('resize', this.resizeCanvas);
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  });
  setTimeout(() => {
    vueData.loadingCanvas(); // 加载同步画布
  }, 3000);
});