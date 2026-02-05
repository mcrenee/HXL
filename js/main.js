// ==========================================
// 滴灌投资决策平台 - JavaScript
// ==========================================

// ==========================================
// 页面初始化
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ 滴灌投资决策平台已加载');
    
    // 初始化返回顶部按钮
    initBackToTop();
    
    // 初始化导航高亮
    initNavigation();
    
    // 初始化年份选择器
    initYearSelector();
    
    // 初始化企业名称自动填充
    initAutoFillPartyB();
    
    // 初始化投资计算器数据自动填充到协议设计
    initAutoFillContract();
});

// 初始化企业名称自动填充
function initAutoFillPartyB() {
    const enterpriseNameInput = document.getElementById('enterpriseName');
    const partyBInput = document.getElementById('partyB');
    
    // 监听企业名称输入框的变化
    enterpriseNameInput.addEventListener('input', function() {
        const enterpriseName = this.value.trim();
        if (enterpriseName) {
            // 自动填充到乙方字段
            partyBInput.value = enterpriseName;
            console.log(`✅ 自动填充乙方（运营方）: ${enterpriseName}`);
        }
    });
    
    // 监听企业名称失去焦点
    enterpriseNameInput.addEventListener('blur', function() {
        const enterpriseName = this.value.trim();
        if (enterpriseName) {
            partyBInput.value = enterpriseName;
        }
    });
}

// 初始化投资计算器数据自动填充到协议设计
function initAutoFillContract() {
    // 监听投资金额
    const investAmountInput = document.getElementById('investAmount');
    const contractInvestmentInput = document.getElementById('contractInvestment');
    
    investAmountInput.addEventListener('input', function() {
        const value = this.value;
        if (value) {
            contractInvestmentInput.value = value;
            console.log(`✅ 自动填充投资金额: ${value}`);
        }
    });
    
    // 监听年化收益率
    const annualRateInput = document.getElementById('annualRate');
    const contractAnnualRateInput = document.getElementById('contractAnnualRate');
    const contractAnnualRateCapInput = document.getElementById('contractAnnualRateCap');
    
    annualRateInput.addEventListener('input', function() {
        const value = this.value;
        if (value) {
            contractAnnualRateInput.value = value;
            contractAnnualRateCapInput.value = value; // 同时填充封顶机制的预期收益率
            console.log(`✅ 自动填充年化收益率: ${value}`);
        }
    });
    
    // 监听分成比例
    const shareRatioInput = document.getElementById('shareRatio');
    const contractShareRatioInput = document.getElementById('contractShareRatio');
    
    shareRatioInput.addEventListener('input', function() {
        const value = this.value;
        if (value) {
            contractShareRatioInput.value = value;
            console.log(`✅ 自动填充分成比例: ${value}`);
        }
    });
}

// 初始化年份选择器
function initYearSelector() {
    const yearSelect = document.getElementById('startYear');
    const currentYear = new Date().getFullYear();
    
    // 生成从当前年份到未来10年的选项
    for (let year = currentYear; year <= currentYear + 10; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year + '年';
        yearSelect.appendChild(option);
    }
}

// ==========================================
// 投资回报计算器
// ==========================================

function calculateROI() {
    const investAmount = parseFloat(document.getElementById('investAmount').value);
    const monthlyRevenue = parseFloat(document.getElementById('monthlyRevenue').value);
    const shareRatio = parseFloat(document.getElementById('shareRatio').value);
    const annualRate = parseFloat(document.getElementById('annualRate').value);
    const startYear = document.getElementById('startYear').value;
    const startMonth = document.getElementById('startMonth').value;
    
    if (!investAmount || !monthlyRevenue || !shareRatio || !annualRate) {
        alert('请填写所有必填信息');
        return;
    }
    
    if (investAmount <= 0 || monthlyRevenue <= 0 || shareRatio <= 0 || annualRate <= 0) {
        alert('请输入正确的数值');
        return;
    }
    
    if (!startYear || !startMonth) {
        alert('请选择起投时间（年份和月份）');
        return;
    }
    
    // 新计算逻辑（基于日息）
    // 公式：投资金额 × (1 + 预期收益率/100/360×预计联营期限) = 月营业额/30 × 预计联营期限 × 分成比例/100
    // 注：预计联营期限单位为天
    
    const I = investAmount;
    const M = monthlyRevenue;
    const R = shareRatio;
    const A = annualRate;
    
    // 1. 计算预计封顶期限（天）
    // 公式推导：D = I / (M×R/3000 - I×A/36000)
    const denominator = (M * R / 3000) - (I * A / 36000);
    
    if (denominator <= 0) {
        alert('无法计算：月分成收入不足以覆盖投资收益要求，请调整参数');
        return;
    }
    
    const durationDays = I / denominator;
    
    // 2. 预计封顶金额 = 投资金额 × (1 + 预期收益率/100/360×预计封顶期限)
    const cappedAmount = I * (1 + (A / 100 / 360) * durationDays);
    
    // 3. 计算预计封顶时间
    const startDate = `${startYear}-${startMonth}`;
    const start = new Date(startDate + '-01'); // 添加日期部分
    const end = new Date(start);
    end.setDate(end.getDate() + Math.ceil(durationDays));
    
    const endYear = end.getFullYear();
    const endMonth = (end.getMonth() + 1).toString().padStart(2, '0');
    const endDateString = `${endYear}年${endMonth}月`;
    
    // 显示结果
    document.getElementById('durationDays').textContent = Math.ceil(durationDays) + '天';
    document.getElementById('endDate').textContent = endDateString;
    document.getElementById('cappedAmount').textContent = cappedAmount.toFixed(2) + '万';
    
    console.log(`✅ 计算完成 - 预计封顶期限: ${Math.ceil(durationDays)} 天, 封顶金额: ${cappedAmount.toFixed(2)} 万元, 封顶时间: ${endDateString}`);
    
    document.getElementById('calculatorResults').classList.remove('hidden');
    document.getElementById('calculatorResults').scrollIntoView({ behavior: 'smooth' });
}

function resetCalculator() {
    document.getElementById('calculatorForm').reset();
    document.getElementById('calculatorResults').classList.add('hidden');
    document.getElementById('calculationLogic').classList.add('hidden');
}

// ==========================================
// 切换计算逻辑显示
// ==========================================

function toggleCalculationLogic() {
    const logicDiv = document.getElementById('calculationLogic');
    logicDiv.classList.toggle('hidden');
}

// ==========================================
// 企业筛选评估
// ==========================================

function calculateScore() {
    const enterpriseName = document.getElementById('enterpriseName').value;
    if (!enterpriseName) {
        alert('请输入企业名称');
        return;
    }
    
    // 自动填充到协议设计的乙方字段
    document.getElementById('partyB').value = enterpriseName;
    
    // 收集评分
    let totalScore = 0;
    let hasEmpty = false;
    
    for (let i = 1; i <= 8; i++) {
        const value = document.getElementById(`criteria${i}`).value;
        if (value === '') {
            hasEmpty = true;
            break;
        }
        totalScore += parseInt(value);
    }
    
    if (hasEmpty) {
        alert('请完成所有评分项');
        return;
    }
    
    // 确定评级和建议
    let rating, ratingClass, recommendation, riskControl;
    
    if (totalScore >= 92) {  // 92-100分
        rating = '优秀';
        ratingClass = 'excellent';
        recommendation = `<strong>${enterpriseName}</strong>综合评分<strong class="text-primary">${totalScore}分</strong>，属于<strong class="text-primary">优秀级别</strong>。<br><br>
            <strong>投资建议：强烈推荐投资</strong><br>
            建议投资规模：400-600万元<br>
            建议年化收益：18%<br>
            建议分成比例：35%<br>
            联营期限：18个月`;
        riskControl = `${enterpriseName}具备优质点位获取能力，历史履约记录良好，AI技术应用成熟，品牌资源丰富。建议重点关注：1）招商进度按时完成；2）每月数据及时报送；3）分成款项准时支付。`;
    } else if (totalScore >= 77) {  // 77-91分
        rating = '良好';
        ratingClass = 'good';
        recommendation = `<strong>${enterpriseName}</strong>综合评分<strong class="text-primary">${totalScore}分</strong>，属于<strong class="text-primary">良好级别</strong>。<br><br>
            <strong>投资建议：可以投资</strong><br>
            建议投资规模：200-400万元<br>
            建议年化收益：16-18%<br>
            建议分成比例：40%<br>
            联营期限：12-15个月`;
        riskControl = `${enterpriseName}整体能力较强，但仍有提升空间。建议重点关注：1）点位资源质量；2）品牌招商能力；3）运营数据真实性；4）团队稳定性。建议增加月度运营审核频次。`;
    } else if (totalScore >= 62) {  // 62-76分
        rating = '一般';
        ratingClass = 'fair';
        recommendation = `<strong>${enterpriseName}</strong>综合评分<strong class="text-primary">${totalScore}分</strong>，属于<strong class="text-primary">一般级别</strong>。<br><br>
            <strong>投资建议：谨慎投资</strong><br>
            建议投资规模：100-200万元<br>
            建议年化收益：14-16%<br>
            建议分成比例：50%<br>
            联营期限：6-12个月`;
        riskControl = `${enterpriseName}存在较多不确定因素。建议重点关注：1）点位资源是否稳定；2）品牌招商是否达标；3）收入是否达到预期；4）履约能力是否可靠。建议设置更严格的退出条款和风控措施。`;
    } else {  // 0-61分
        rating = '不推荐';
        ratingClass = 'poor';
        recommendation = `<strong>${enterpriseName}</strong>综合评分<strong class="text-primary">${totalScore}分</strong>，低于投资标准。<br><br>
            <strong>投资建议：不建议投资</strong><br>
            综合能力不足，风险较高，建议观望或要求企业提升能力后再评估。`;
        riskControl = `${enterpriseName}综合能力较弱，不符合当前投资标准。主要风险：点位资源质量差、运营能力不足、品牌资源匮乏、团队经验不足。建议暂不投资，待企业提升能力后再行评估。`;
    }
    
    // 更新显示
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('scoreRating').textContent = rating;
    document.getElementById('scoreRating').className = `score-rating ${ratingClass}`;
    document.getElementById('scoreRecommendation').innerHTML = recommendation;
    document.getElementById('riskControl').innerHTML = riskControl;
    
    document.getElementById('screeningResults').classList.remove('hidden');
    document.getElementById('screeningResults').scrollIntoView({ behavior: 'smooth' });
}

function resetScreening() {
    document.getElementById('screeningForm').reset();
    document.getElementById('screeningResults').classList.add('hidden');
}

// ==========================================
// 返回顶部
// ==========================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==========================================
// 导航高亮
// ==========================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 更新活动状态
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // 滚动时更新高亮
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ==========================================
// 协议文本生成和复制
// ==========================================

// 全局变量存储生成的协议文本
let generatedContractText = '';

// 生成协议预览
function generatePreview() {
    // 获取所有输入值
    const partyA = document.getElementById('partyA').value || '【甲方名称】';
    const partyB = document.getElementById('partyB').value || '【乙方名称】';
    const assetScope = document.getElementById('assetScope').value || '【资产范围】';
    const investment = document.getElementById('contractInvestment').value || '100';
    const annualRate = document.getElementById('contractAnnualRate').value || '15';
    const shareRatio = document.getElementById('contractShareRatio').value || '10';
    const annualRateCap = document.getElementById('contractAnnualRateCap').value || '15';
    const dataFrequency = document.getElementById('dataFrequency').value || '【选择频率】';
    const dataMode = document.getElementById('dataMode').value || '【选择方式】';
    const paymentFrequency = document.getElementById('paymentFrequency').value || '【选择频率】';
    const paymentMode = document.getElementById('paymentMode').value || '【选择方式】';
    
    // 生成格式化的HTML文本
    const htmlContent = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 3px solid #667eea;">
        <h2 style="color: #003B5C; font-size: 1.5rem; font-weight: 700; margin: 0;">投资协议关键条款</h2>
    </div>

    <div style="margin-bottom: 2rem; background: #F8F9FA; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #667eea;">
        <h3 style="color: #667eea; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">📋 基本信息</h3>
        <div style="line-height: 2;">
            <div style="margin-bottom: 0.5rem;">• <strong>甲方（投资方）：</strong>${partyA}</div>
            <div style="margin-bottom: 0.5rem;">• <strong>乙方（运营方）：</strong>${partyB}</div>
            <div style="margin-bottom: 0.5rem;">• <strong>收入分成资产范围：</strong>${assetScope}</div>
            <div style="margin-bottom: 0.5rem;">• <strong>投资金额：</strong>${investment}万元</div>
            <div style="margin-bottom: 0.5rem;">• <strong>年化收益率（静态年化）：</strong>${annualRate}%</div>
            <div style="margin-bottom: 0.5rem;">• <strong>分成比例：</strong>${shareRatio}%</div>
        </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
        <h3 style="color: #667eea; font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem 0;">📑 关键条款</h3>
    </div>

    <div style="margin-bottom: 1.5rem; padding: 1.25rem; background: #FEFCE8; border-radius: 8px; border-left: 4px solid #F59E0B;">
        <div style="display: flex; align-items: center; margin-bottom: 0.75rem;">
            <span style="background: #F59E0B; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; margin-right: 0.75rem;">01</span>
            <strong style="color: #78350F; font-size: 1.05rem;">投资方式</strong>
        </div>
        <div style="color: #78350F; line-height: 1.8; padding-left: 2.25rem;">
            甲方<strong>${partyA}</strong>投资人民币<strong style="color: #F59E0B;">${investment}万元</strong>，用于<strong>${assetScope}</strong>等
        </div>
    </div>

    <div style="margin-bottom: 1.5rem; padding: 1.25rem; background: #EFF6FF; border-radius: 8px; border-left: 4px solid #3B82F6;">
        <div style="display: flex; align-items: center; margin-bottom: 0.75rem;">
            <span style="background: #3B82F6; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; margin-right: 0.75rem;">02</span>
            <strong style="color: #1E3A8A; font-size: 1.05rem;">收益分配</strong>
        </div>
        <div style="color: #1E3A8A; line-height: 1.8; padding-left: 2.25rem;">
            甲方获得<strong>${partyB}</strong>（乙方）项目营业额的<strong style="color: #3B82F6;">${shareRatio}%</strong>作为投资回报，年化收益率<strong style="color: #3B82F6;">${annualRate}%</strong>
        </div>
    </div>

    <div style="margin-bottom: 1.5rem; padding: 1.25rem; background: #F0FDF4; border-radius: 8px; border-left: 4px solid #10B981;">
        <div style="display: flex; align-items: center; margin-bottom: 0.75rem;">
            <span style="background: #10B981; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; margin-right: 0.75rem;">03</span>
            <strong style="color: #064E3B; font-size: 1.05rem;">封顶机制</strong>
        </div>
        <div style="color: #064E3B; line-height: 1.8; padding-left: 2.25rem;">
            滴灌通累计实际取得的收入分成金额合计达到"联营资金金额×(1+<strong style="color: #10B981;">${annualRateCap}%</strong>÷360×已联营天数)"金额（合称"分成终止触发事项"），达到封顶，收入分成终止
        </div>
    </div>

    <div style="margin-bottom: 1.5rem; padding: 1.25rem; background: #FEF2F2; border-radius: 8px; border-left: 4px solid #EF4444;">
        <div style="display: flex; align-items: center; margin-bottom: 0.75rem;">
            <span style="background: #EF4444; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; margin-right: 0.75rem;">04</span>
            <strong style="color: #7F1D1D; font-size: 1.05rem;">数据传输方式</strong>
        </div>
        <div style="color: #7F1D1D; line-height: 1.8; padding-left: 2.25rem;">
            按照<strong style="color: #EF4444;">${dataFrequency}</strong>，<strong style="color: #EF4444;">${dataMode}</strong>进行数据报送
        </div>
    </div>

    <div style="margin-bottom: 0; padding: 1.25rem; background: #F5F3FF; border-radius: 8px; border-left: 4px solid #8B5CF6;">
        <div style="display: flex; align-items: center; margin-bottom: 0.75rem;">
            <span style="background: #8B5CF6; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; margin-right: 0.75rem;">05</span>
            <strong style="color: #4C1D95; font-size: 1.05rem;">分成付款方式</strong>
        </div>
        <div style="color: #4C1D95; line-height: 1.8; padding-left: 2.25rem;">
            按照<strong style="color: #8B5CF6;">${paymentFrequency}</strong>，<strong style="color: #8B5CF6;">${paymentMode}</strong>进行分成打款
        </div>
    </div>
</div>
    `.trim();
    
    // 生成纯文本版本（用于复制）
    generatedContractText = `投资协议关键条款

基本信息：
• 甲方（投资方）：${partyA}
• 乙方（运营方）：${partyB}
• 收入分成资产范围：${assetScope}
• 投资金额：${investment}万元
• 年化收益率（静态年化）：${annualRate}%
• 分成比例：${shareRatio}%

关键条款：

01 投资方式
甲方${partyA}投资人民币${investment}万元，用于${assetScope}等

02 收益分配
甲方获得${partyB}（乙方）项目营业额的${shareRatio}%作为投资回报，年化收益率${annualRate}%

03 封顶机制
滴灌通累计实际取得的收入分成金额合计达到"联营资金金额×(1+${annualRateCap}%÷360×已联营天数)"金额（合称"分成终止触发事项"），达到封顶，收入分成终止

04 数据传输方式
按照${dataFrequency}，${dataMode}进行数据报送

05 分成付款方式
按照${paymentFrequency}，${paymentMode}进行分成打款`;
    
    // 显示预览（使用HTML格式）
    document.getElementById('previewContent').innerHTML = htmlContent;
    document.getElementById('contractPreview').classList.remove('hidden');
    
    // 启用复制按钮
    const copyButton = document.getElementById('copyButton');
    copyButton.disabled = false;
    copyButton.style.opacity = '1';
    
    // 滚动到预览区域
    document.getElementById('contractPreview').scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 显示提示
    const statusEl = document.getElementById('copyStatus');
    statusEl.textContent = '✅ 预览已生成，可以复制文本';
    statusEl.style.color = '#00A3E0';
    
    setTimeout(() => {
        statusEl.textContent = '';
    }, 3000);
    
    console.log('✅ 协议预览已生成');
}

// 复制到剪贴板
function copyToClipboard() {
    if (!generatedContractText) {
        alert('请先生成预览！');
        return;
    }
    
    navigator.clipboard.writeText(generatedContractText).then(() => {
        const statusEl = document.getElementById('copyStatus');
        statusEl.textContent = '✅ 已复制到剪贴板！';
        statusEl.style.color = '#10B981';
        
        // 3秒后清除提示
        setTimeout(() => {
            statusEl.textContent = '';
        }, 3000);
        
        console.log('✅ 文本已复制到剪贴板');
    }).catch(err => {
        const statusEl = document.getElementById('copyStatus');
        statusEl.textContent = '❌ 复制失败，请手动复制';
        statusEl.style.color = '#DC2626';
        console.error('复制失败:', err);
    });
}

// 保留旧函数以保持兼容性（如果有其他地方调用）
function finalizeAndCopy() {
    generatePreview();
    setTimeout(() => {
        copyToClipboard();
    }, 500);
}
