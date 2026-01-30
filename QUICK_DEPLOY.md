# 快速部署脚本

## 📥 方式一：直接下载项目文件

### 使用浏览器下载
1. 点击右上角的 **Publish** 标签页
2. 点击 **Download** 下载所有文件
3. 解压到本地文件夹

### 项目文件清单
- ✅ `index.html` - 主页面
- ✅ `css/style.css` - 样式文件
- ✅ `js/main.js` - JavaScript 脚本
- ✅ `README.md` - 项目说明文档
- ✅ `DEPLOYMENT.md` - 部署指南

## 🚀 一键部署到 GitHub Pages

### 最简单的方法（推荐）

1. **准备文件**
   ```
   下载并解压所有文件到一个文件夹
   ```

2. **访问 GitHub**
   ```
   https://github.com
   ```

3. **创建新仓库**
   - 点击 "+" → "New repository"
   - 名称：`esports-hotel-report`
   - 设置为 Public
   - 创建仓库

4. **上传文件**
   - 点击 "uploading an existing file"
   - 拖拽所有文件（保持文件夹结构）
   - 提交

5. **启用 Pages**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Save

6. **访问网站**
   ```
   等待 1-2 分钟后访问
   https://YOUR-USERNAME.github.io/esports-hotel-report/
   ```

## 📋 命令行部署（开发者）

如果您熟悉 Git，可以使用以下命令：

```bash
# 克隆或下载项目文件后

# 1. 初始化 Git
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "部署电竞酒店可行性研究报告"

# 4. 关联远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/YOUR-USERNAME/esports-hotel-report.git

# 5. 推送
git branch -M main
git push -u origin main
```

然后在 GitHub 仓库的 Settings → Pages 启用部署。

## 🎨 自定义配置

### 修改网站标题和元数据

编辑 `index.html` 的 `<head>` 部分：

```html
<title>您的标题</title>
<meta name="description" content="您的描述">
```

### 修改 LOGO 和品牌

在 HTML 中搜索 "GENSPARK" 并替换为您的品牌名称。

### 调整配色

编辑 `css/style.css` 的 `:root` 部分：

```css
:root {
    --color-primary: #6366f1;  /* 主色调 */
    --color-secondary: #764ba2; /* 次要色 */
    /* ... 其他颜色配置 */
}
```

## 🔄 更新网站内容

### 通过 GitHub 网页编辑

1. 进入您的仓库
2. 找到要修改的文件
3. 点击编辑按钮（铅笔图标）
4. 修改后点击 "Commit changes"
5. 等待 1-2 分钟自动重新部署

### 通过 Git 更新

```bash
# 修改文件后

git add .
git commit -m "更新描述"
git push
```

## ⚙️ 环境要求

### 浏览器支持
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 不需要服务器
- ✅ 纯静态网站，无需后端
- ✅ GitHub Pages 免费托管
- ✅ 自动 HTTPS 加密

## 📞 需要帮助？

如果部署遇到问题：

1. **查看 DEPLOYMENT.md** - 详细的部署指南
2. **查看 README.md** - 项目功能说明
3. **检查浏览器控制台** - 按 F12 查看错误信息

## 🎉 部署成功！

部署成功后，您将拥有：
- ✅ 专业的在线可行性研究报告
- ✅ 交互式财务计算器
- ✅ 动态游戏风格效果
- ✅ 完全响应式设计
- ✅ 随时可访问的公开链接

现在您可以：
- 📤 分享链接给投资人
- 📊 实时调整财务参数
- 📱 在任何设备上查看
- 🔄 随时更新内容

---

**祝您部署顺利！** 🚀
