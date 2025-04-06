const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

/**
 * 下载图片到指定目录
 * @param {string} imageUrl - 图片URL
 * @param {string} outputDir - 输出目录
 * @param {string} [filename] - 可选的自定义文件名
 * @returns {Promise<string>} 返回保存的文件路径
 */
async function downloadImage(imageUrl, outputDir, filename) {
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 从URL解析文件名（如果没有提供自定义文件名）
  const parsedUrl = new URL(imageUrl);
  const urlPathname = parsedUrl.pathname;
  const imageName = filename || path.basename(urlPathname) || `image_${Date.now()}.jpg`;

  // 确保文件名有扩展名
  const ext = path.extname(imageName) || '.jpg';
  const finalFilename = ext ? imageName : `${imageName}${ext}`;
  const outputPath = path.join(outputDir, finalFilename);

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    https.get(imageUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`请求失败，状态码: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // 删除无效文件
      reject(err);
    });
  });
}

// 使用示例（从命令行参数获取输入）
// async function main() {
//   const args = process.argv.slice(2);
  
//   if (args.length < 2) {
//     console.log('使用方法: node downloadImage.js <图片URL> <输出目录> [自定义文件名]');
//     console.log('示例: node downloadImage.js https://example.com/image.jpg ./downloads my-image.jpg');
//     return;
//   }

//   const [imageUrl, outputDir, filename] = args;

//   try {
//     const savedPath = await downloadImage(imageUrl, outputDir, filename);
//     console.log(`图片已保存到: ${savedPath}`);
//   } catch (error) {
//     console.error('下载失败:', error.message);
//   }
// }

async function main() {
    const imageUrl = "https://nbchart.com/panda/images/L/";// 图片路径
    const customaryFilename = 1;// 原来的文件名开始位置
    const form = "jpg";// 图片格式
    const outputDir = "骄傲";// 输出目录
    const filename = undefined;// 可选的自定义文件名
    const runCounts = 500; // 运行次数
    for(let i = 0; i < runCounts; i++){
        try {
        const savedPath = await downloadImage(imageUrl + (i + customaryFilename) + "." + form, outputDir, filename);
        console.log(`图片已保存到: ${savedPath}`);
        } catch (error) {
        console.error('下载失败:', error.message,);
        return -1;
        }
    }
  }
// 如果直接运行此脚本
if (require.main === module) {
  main();
}

// 导出函数供其他模块使用
module.exports = downloadImage;