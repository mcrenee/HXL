# GitHub Pages 部署指南

## 📝 如何重新发布 GitHub Pages

如果您之前 unpublish 了 GitHub Pages，请按照以下步骤重新发布：

### 方法 1：通过 GitHub 网站手动启用

1. 打开仓库页面：https://github.com/ashley-worklab/SuperFranchise_SW

2. 点击 **Settings**（设置）标签

3. 在左侧菜单找到 **Pages**

4. 在 **Source** 部分：
   - 选择 **GitHub Actions** 作为 source
   - 或者选择 **Deploy from a branch**，然后选择 `main` 分支和 `/ (root)` 目录

5. 点击 **Save**（保存）

6. 等待 1-2 分钟，GitHub Actions 会自动部署

7. 部署完成后，访问：https://ashley-worklab.github.io/SuperFranchise_SW/

### 方法 2：通过 GitHub Actions 自动部署

我已经创建了 GitHub Actions workflow 文件（`.github/workflows/deploy.yml`），它会在以下情况自动部署：

- ✅ 每次推送到 `main` 分支时
- ✅ 手动触发 workflow

**手动触发步骤：**

1. 打开：https://github.com/ashley-worklab/SuperFranchise_SW/actions

2. 点击左侧的 **Deploy to GitHub Pages** workflow

3. 点击右上角的 **Run workflow** 按钮

4. 选择 `main` 分支

5. 点击绿色的 **Run workflow** 按钮

6. 等待部署完成（通常需要 1-2 分钟）

### 检查部署状态

1. 打开 Actions 页面：https://github.com/ashley-worklab/SuperFranchise_SW/actions

2. 查看最新的 workflow 运行状态

3. 如果显示绿色的 ✓，说明部署成功

4. 如果显示红色的 ✗，点击查看错误日志

### 可能的问题和解决方案

#### 问题 1：Pages 未启用

**解决方案：**
- 进入 Settings > Pages
- 确保 Source 设置为 **GitHub Actions**
- 或者设置为 **Deploy from a branch** 并选择 `main` 分支

#### 问题 2：Workflow 权限不足

**解决方案：**
1. 进入 Settings > Actions > General
2. 滚动到 **Workflow permissions**
3. 选择 **Read and write permissions**
4. 勾选 **Allow GitHub Actions to create and approve pull requests**
5. 点击 **Save**

#### 问题 3：404 错误

**解决方案：**
- 等待 5-10 分钟，GitHub Pages 缓存可能需要时间更新
- 使用 Ctrl+Shift+R（Windows）或 Cmd+Shift+R（Mac）强制刷新浏览器
- 检查仓库是否是 Public（GitHub Pages 免费版仅支持公开仓库）

## 🔗 访问链接

- **GitHub Pages**: https://ashley-worklab.github.io/SuperFranchise_SW/
- **GitHub 仓库**: https://github.com/ashley-worklab/SuperFranchise_SW
- **Sandbox 测试**: https://3000-i49d6wavuddl73vouz90d-0e616f0a.sandbox.novita.ai

## 📊 当前状态

- ✅ 代码已推送到 GitHub
- ✅ GitHub Actions workflow 已配置
- ✅ 已触发自动部署（空提交）
- ⏳ 等待 GitHub Pages 发布...

请访问 GitHub Actions 页面查看部署进度。
