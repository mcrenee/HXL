# 把本网页项目同步到 GitHub

## 当前状态

- **新目录位置**：`c:\WeCom\WXWork\1688857177805703\Cache\File\2026-01\genspark-web`
- **已配置的远程仓库**：`https://github.com/Davidsea-z/GameHotelModel.git`
- **问题**：当前路径在企业微信缓存目录下，存在权限/锁文件，导致 Git 无法正常完成 `add`/`commit`。

---

## 方案一：在本机其它位置重新建仓再推送（推荐）

1. **复制整个 `genspark-web` 文件夹**到没有权限限制的目录，例如：
   - `C:\Users\davidwang\Documents\genspark-web`
   - 或 `C:\Users\davidwang\Desktop\genspark-web`

2. **删除复制后的 `.git` 文件夹**（避免沿用旧的锁/配置）。

3. **在复制后的目录里打开 PowerShell 或 CMD**，执行：

   ```powershell
   cd C:\Users\davidwang\Documents\genspark-web   # 换成你的实际路径

   git init
   git add .
   git commit -m "Initial commit: esports hotel report web"
   git branch -M main
   git remote add origin https://github.com/Davidsea-z/GameHotelModel.git
   git push -u origin main
   ```

4. 若 GitHub 上 **GameHotelModel** 仓库已存在且不为空，可先拉再推：

   ```powershell
   git pull origin main --allow-unrelated-histories
   git push -u origin main
   ```

---

## 方案二：在当前目录尝试修复锁文件后再推送

仅在你有把握能修改企业微信缓存目录权限时使用。

1. **关闭**所有可能占用该目录的程序（Cursor、资源管理器预览、其它终端等）。

2. **手动删除**以下文件（若存在）：
   - `genspark-web\.git\index.lock`
   - `genspark-web\.git\config.lock`

3. 若仍报错，可尝试**以管理员身份**打开 PowerShell，再执行：

   ```powershell
   cd "c:\WeCom\WXWork\1688857177805703\Cache\File\2026-01\genspark-web"
   git add .
   git commit -m "Initial commit: esports hotel report web"
   git push -u origin main
   ```

---

## 若你要换一个新仓库

1. 在 GitHub 网页上新建一个空仓库（不要勾选 README）。
2. 在本地（建议用方案一复制后的目录）执行：

   ```powershell
   git remote remove origin
   git remote add origin https://github.com/你的用户名/新仓库名.git
   git push -u origin main
   ```

---

**建议**：优先用 **方案一**，把项目放到 `Documents` 或 `Desktop` 再初始化并推送，最省事且不受企业微信目录权限影响。
