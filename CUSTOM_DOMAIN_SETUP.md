# 自定义域名配置指南

## 📝 为 GitHub Pages 配置自定义域名

### 前提条件

- ✅ 您拥有一个域名（例如：`example.com`）
- ✅ 可以访问域名的DNS管理面板
- ✅ GitHub Pages 已启用并正常运行

---

## 🔧 配置步骤

### 步骤 1：在 GitHub 仓库中配置自定义域名

1. **打开仓库设置页面**
   ```
   https://github.com/ashley-worklab/SuperFranchise_SW/settings/pages
   ```

2. **在 Custom domain 部分**
   - 输入您的域名，例如：
     - `www.yourdomain.com`（推荐使用 www 子域名）
     - 或 `yourdomain.com`（根域名）
   
3. **点击 Save 保存**

4. **勾选 Enforce HTTPS**（强制HTTPS，推荐）
   - 注意：首次配置需要等待证书颁发，可能需要 24 小时

---

### 步骤 2：配置 DNS 记录

根据您选择的域名类型，配置对应的 DNS 记录：

#### 选项 A：使用子域名（推荐：`www.yourdomain.com`）

在您的 DNS 管理面板添加 **CNAME 记录**：

| 类型  | 名称/主机 | 值/目标                                    | TTL  |
|-------|-----------|-------------------------------------------|------|
| CNAME | www       | ashley-worklab.github.io                  | 3600 |

**示例（不同DNS服务商）：**

- **Cloudflare:**
  ```
  类型: CNAME
  名称: www
  目标: ashley-worklab.github.io
  代理状态: DNS only（关闭代理）
  ```

- **阿里云:**
  ```
  记录类型: CNAME
  主机记录: www
  记录值: ashley-worklab.github.io
  ```

- **腾讯云/DNSPod:**
  ```
  记录类型: CNAME
  主机记录: www
  记录值: ashley-worklab.github.io
  ```

#### 选项 B：使用根域名（`yourdomain.com`）

在您的 DNS 管理面板添加 **A 记录**（GitHub Pages IP地址）：

| 类型 | 名称/主机 | 值/目标         | TTL  |
|------|-----------|----------------|------|
| A    | @         | 185.199.108.153 | 3600 |
| A    | @         | 185.199.109.153 | 3600 |
| A    | @         | 185.199.110.153 | 3600 |
| A    | @         | 185.199.111.153 | 3600 |

**同时添加 CNAME 记录（可选，用于 www 重定向）：**

| 类型  | 名称/主机 | 值/目标                                    | TTL  |
|-------|-----------|-------------------------------------------|------|
| CNAME | www       | ashley-worklab.github.io                  | 3600 |

---

### 步骤 3：验证 DNS 配置

**使用命令行验证（可选）：**

```bash
# 验证 CNAME 记录（子域名）
dig www.yourdomain.com +short

# 验证 A 记录（根域名）
dig yourdomain.com +short

# 或者使用 nslookup
nslookup www.yourdomain.com
```

**在线工具验证：**
- https://dnschecker.org/
- https://www.whatsmydns.net/

---

### 步骤 4：创建 CNAME 文件（可选但推荐）

为了确保每次部署都保留自定义域名配置，在项目根目录创建 `CNAME` 文件：

**内容示例：**
```
www.yourdomain.com
```

**注意：**
- 文件名必须是 `CNAME`（全大写，无扩展名）
- 只包含一行：您的域名
- 不要有空行或多余的空格

---

## 🎯 推荐配置方案

### 方案 1：使用 www 子域名（推荐）

**域名：** `www.yourdomain.com`

**优点：**
- ✅ 配置简单（只需1条CNAME记录）
- ✅ 性能更好（CDN友好）
- ✅ 更灵活（可以轻松更改服务商）

**DNS配置：**
```
类型: CNAME
名称: www
目标: ashley-worklab.github.io
```

### 方案 2：根域名 + www 重定向

**主域名：** `yourdomain.com`
**www重定向到：** `yourdomain.com`

**DNS配置：**
```
# 根域名 A 记录
类型: A, 名称: @, 目标: 185.199.108.153
类型: A, 名称: @, 目标: 185.199.109.153
类型: A, 名称: @, 目标: 185.199.110.153
类型: A, 名称: @, 目标: 185.199.111.153

# www 子域名 CNAME 记录
类型: CNAME, 名称: www, 目标: ashley-worklab.github.io
```

---

## ⏱️ 生效时间

- **DNS传播时间：** 几分钟到 48 小时（通常 1 小时内生效）
- **HTTPS证书颁发：** 首次配置可能需要 24 小时
- **建议：** 先配置 DNS，24 小时后再在 GitHub 勾选 "Enforce HTTPS"

---

## 🔍 常见问题排查

### 问题 1：DNS 配置正确但无法访问

**可能原因：**
- DNS 传播未完成
- HTTPS 证书尚未颁发

**解决方案：**
1. 等待 24-48 小时
2. 清除浏览器缓存或使用隐私模式
3. 暂时取消勾选 "Enforce HTTPS"

### 问题 2：显示 "Domain's DNS record could not be retrieved"

**解决方案：**
1. 检查 DNS 记录是否正确配置
2. 使用 `dig` 或在线工具验证 DNS
3. 如果使用 Cloudflare，暂时关闭 CDN 代理（设为 DNS only）
4. 等待 DNS 完全传播（48小时）

### 问题 3：www 和根域名都想使用

**解决方案：**
在 GitHub Pages 只能配置一个主域名，但可以通过 DNS 重定向：

1. 在 GitHub Pages 配置：`www.yourdomain.com`
2. 在 DNS 管理面板配置根域名重定向到 www：
   - Cloudflare: 使用 Page Rules 重定向
   - 阿里云/腾讯云: 使用域名转发功能

### 问题 4：HTTPS 证书错误

**解决方案：**
1. 取消勾选 "Enforce HTTPS"
2. 在 GitHub Settings > Pages 中，点击 Remove 移除自定义域名
3. 等待 5 分钟
4. 重新添加自定义域名
5. 等待 24 小时后再勾选 "Enforce HTTPS"

---

## 📋 配置检查清单

在配置完成后，使用此清单验证：

- [ ] GitHub Pages 已启用并正常运行
- [ ] 在 GitHub Settings > Pages 配置了自定义域名
- [ ] DNS 记录已正确添加（CNAME 或 A 记录）
- [ ] 使用 `dig` 或在线工具验证 DNS 已生效
- [ ] 在浏览器访问自定义域名，能看到网站内容
- [ ] HTTPS 证书已颁发（地址栏显示锁图标）
- [ ] 已创建 `CNAME` 文件到项目根目录（可选）
- [ ] 强制刷新浏览器（Ctrl+Shift+R）测试

---

## 🔗 相关链接

- **GitHub Pages 官方文档：**
  https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

- **DNS 检查工具：**
  - https://dnschecker.org/
  - https://www.whatsmydns.net/

- **HTTPS 证书状态检查：**
  https://www.ssllabs.com/ssltest/

---

## 💡 需要帮助？

如果您需要我帮您：
1. ✅ 创建 CNAME 文件
2. ✅ 提供具体 DNS 服务商的配置步骤
3. ✅ 排查配置问题

请告诉我：
- 您的域名是什么？
- 您的 DNS 服务商是谁（阿里云、腾讯云、Cloudflare、GoDaddy 等）
- 您想使用哪种配置方案（www 子域名 或 根域名）

我会为您提供更详细的指导！
