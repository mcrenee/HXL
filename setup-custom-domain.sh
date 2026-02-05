#!/bin/bash

# 自定义域名配置脚本
# 使用方法: ./setup-custom-domain.sh yourdomain.com

echo "🌐 GitHub Pages 自定义域名配置工具"
echo "======================================"
echo ""

# 检查参数
if [ -z "$1" ]; then
    echo "❌ 错误：请提供您的域名"
    echo ""
    echo "使用方法："
    echo "  ./setup-custom-domain.sh yourdomain.com"
    echo "  ./setup-custom-domain.sh www.yourdomain.com"
    echo ""
    exit 1
fi

DOMAIN=$1

# 验证域名格式
if [[ ! $DOMAIN =~ ^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$ ]]; then
    echo "❌ 错误：域名格式不正确"
    echo "   示例: yourdomain.com 或 www.yourdomain.com"
    exit 1
fi

echo "📝 配置域名: $DOMAIN"
echo ""

# 创建 CNAME 文件
echo "1️⃣ 创建 CNAME 文件..."
echo "$DOMAIN" > CNAME
echo "   ✅ CNAME 文件已创建"
echo ""

# 提交到 Git
echo "2️⃣ 提交到 Git..."
git add CNAME
git commit -m "chore: 配置自定义域名 $DOMAIN"
echo "   ✅ Git 提交完成"
echo ""

# 推送到 GitHub
echo "3️⃣ 推送到 GitHub..."
git push origin main
echo "   ✅ 推送完成"
echo ""

echo "======================================"
echo "✅ 自定义域名配置已完成！"
echo ""
echo "📋 接下来您需要："
echo ""

# 判断是否是子域名
if [[ $DOMAIN == www.* ]] || [[ $DOMAIN == *.*.* ]]; then
    echo "   1. 在您的 DNS 管理面板添加 CNAME 记录："
    echo "      类型: CNAME"
    echo "      名称: ${DOMAIN%%.*}"
    echo "      目标: ashley-worklab.github.io"
    echo ""
else
    echo "   1. 在您的 DNS 管理面板添加 A 记录："
    echo "      类型: A"
    echo "      名称: @"
    echo "      目标: 185.199.108.153"
    echo "      目标: 185.199.109.153"
    echo "      目标: 185.199.110.153"
    echo "      目标: 185.199.111.153"
    echo ""
    echo "   （可选）添加 www 子域名 CNAME："
    echo "      类型: CNAME"
    echo "      名称: www"
    echo "      目标: ashley-worklab.github.io"
    echo ""
fi

echo "   2. 访问 GitHub 仓库设置页面："
echo "      https://github.com/ashley-worklab/SuperFranchise_SW/settings/pages"
echo ""
echo "   3. 在 Custom domain 输入框中输入: $DOMAIN"
echo ""
echo "   4. 点击 Save 保存"
echo ""
echo "   5. 等待 DNS 传播（可能需要 24-48 小时）"
echo ""
echo "   6. DNS 生效后，勾选 'Enforce HTTPS'"
echo ""
echo "======================================"
echo ""
echo "📖 详细配置说明请查看: CUSTOM_DOMAIN_SETUP.md"
echo ""
echo "🔍 DNS 检查工具:"
echo "   - https://dnschecker.org/"
echo "   - https://www.whatsmydns.net/"
echo ""
