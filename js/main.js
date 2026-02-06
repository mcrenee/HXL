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
    
    // 监听年化收益率（只填充封顶机制）
    const annualRateInput = document.getElementById('annualRate');
    const contractAnnualRateCapInput = document.getElementById('contractAnnualRateCap');
    
    annualRateInput.addEventListener('input', function() {
        const value = this.value;
        if (value) {
            contractAnnualRateCapInput.value = value; // 填充封顶机制的预期收益率
            console.log(`✅ 自动填充封顶机制预期收益率: ${value}`);
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
        alert('请输入项目/企业名称');
        return;
    }
    
    // 自动填充到协议设计的乙方字段
    document.getElementById('partyB').value = enterpriseName;
    
    // 收集15个维度的评分
    let dimensions = [];
    let hasEmpty = false;
    
    for (let i = 1; i <= 15; i++) {
        const value = document.getElementById(`dimension${i}`).value;
        if (value === '') {
            hasEmpty = true;
            break;
        }
        dimensions.push(parseInt(value));
    }
    
    if (hasEmpty) {
        alert('请完成所有15个维度的评分');
        return;
    }
    
    // 计算各模块平均分
    // 模块一：资产质量（维度1-3）
    const module1Score = (dimensions[0] + dimensions[1] + dimensions[2]) / 3;
    
    // 模块二：单位经济模型（维度4-6）
    const module2Score = (dimensions[3] + dimensions[4] + dimensions[5]) / 3;
    
    // 模块三：运营能力（维度7-9）
    const module3Score = (dimensions[6] + dimensions[7] + dimensions[8]) / 3;
    
    // 模块四：结构安全性（维度10-12）
    const module4Score = (dimensions[9] + dimensions[10] + dimensions[11]) / 3;
    
    // 模块五：扩张能力（维度13-15）
    const module5Score = (dimensions[12] + dimensions[13] + dimensions[14]) / 3;
    
    // 计算加权总分
    const totalScore = (
        module1Score * 0.30 +  // 30%
        module2Score * 0.25 +  // 25%
        module3Score * 0.20 +  // 20%
        module4Score * 0.15 +  // 15%
        module5Score * 0.10    // 10%
    );
    
    // 确定投资建议
    let rating, ratingClass, recommendation;
    
    if (totalScore >= 4.0) {
        rating = 'Strong Invest';
        ratingClass = 'excellent';
        recommendation = '强烈推荐投资';
    } else if (totalScore >= 3.5) {
        rating = 'Invest';
        ratingClass = 'good';
        recommendation = '推荐投资';
    } else if (totalScore >= 3.0) {
        rating = 'Cautious';
        ratingClass = 'fair';
        recommendation = '谨慎投资';
    } else {
        rating = 'Do Not Invest';
        ratingClass = 'poor';
        recommendation = '不建议投资';
    }
    
    // 分析主要优势（取最高的3个维度）
    const dimensionNames = [
        '地段与需求强度', '租约条件', '房东质量',
        '租金占收入比例', '回本周期', '净现金流能力',
        '历史项目表现', '扩张节奏健康度', '成本控制能力',
        '租约控制权', '现金流控制', '投资保护条款',
        '可复制性', '点位获取能力', '抗风险能力'
    ];
    
    const dimensionsWithNames = dimensions.map((score, index) => ({
        name: dimensionNames[index],
        score: score
    }));
    
    const sortedDimensions = [...dimensionsWithNames].sort((a, b) => b.score - a.score);
    const strengths = sortedDimensions.slice(0, 3).filter(d => d.score >= 4);
    const risks = sortedDimensions.slice(-3).reverse().filter(d => d.score <= 2);
    
    // 生成优势描述
    let strengthsHTML = '';
    if (strengths.length > 0) {
        strengthsHTML = '<ul style="margin: 0; padding-left: 1.5rem;">';
        strengths.forEach(s => {
            strengthsHTML += `<li><strong>${s.name}</strong>：${s.score}分 - 表现优异</li>`;
        });
        strengthsHTML += '</ul>';
    } else {
        strengthsHTML = '<p>暂无明显优势项（无4分以上维度）</p>';
    }
    
    // 生成风险描述
    let risksHTML = '';
    if (risks.length > 0) {
        risksHTML = '<ul style="margin: 0; padding-left: 1.5rem;">';
        risks.forEach(r => {
            risksHTML += `<li><strong>${r.name}</strong>：${r.score}分 - 存在较高风险</li>`;
        });
        risksHTML += '</ul>';
    } else {
        risksHTML = '<p>暂无明显风险项（无2分以下维度）</p>';
    }
    
    // 生成投资判断总结
    let summary = `<p><strong>${enterpriseName}</strong>的综合评分为<strong style="color: #667eea; font-size: 1.2em;">${totalScore.toFixed(1)}</strong>分（满分5.0分），投资建议为<strong style="color: ${totalScore >= 4.0 ? '#10B981' : totalScore >= 3.5 ? '#3B82F6' : totalScore >= 3.0 ? '#F59E0B' : '#EF4444'};">${rating}</strong>。</p>`;
    
    summary += '<p>';
    if (totalScore >= 4.0) {
        summary += `该项目具备极强的资产安全性和现金流能力，优先考虑投资。资产质量${module1Score >= 4 ? '优秀' : '良好'}，经济模型${module2Score >= 4 ? '健康' : '稳定'}，结构安全性${module4Score >= 4 ? '极佳' : '较好'}。`;
    } else if (totalScore >= 3.5) {
        summary += `该项目整体表现良好，建议投资。资产质量和现金流能力${module1Score >= 3.5 && module2Score >= 3.5 ? '稳定' : '需关注'}，但需要重点关注${module4Score < 3.5 ? '结构安全性' : module3Score < 3.5 ? '运营能力' : '扩张能力'}。`;
    } else if (totalScore >= 3.0) {
        summary += `该项目存在一定风险，需谨慎评估。主要关注点：${module4Score < 3.0 ? '结构安全性较弱' : ''}${module2Score < 3.0 ? '现金流能力不足' : ''}${module1Score < 3.0 ? '资产质量一般' : ''}。建议加强风控措施后再考虑投资。`;
    } else {
        summary += `该项目不符合投资标准，不建议投资。核心问题：${module4Score < 2.5 ? '结构安全性严重不足' : ''}${module2Score < 2.5 ? '经济模型不健康' : ''}${module1Score < 2.5 ? '资产质量较差' : ''}。建议等待项目改善后重新评估。`;
    }
    summary += '</p>';
    
    summary += '<p>';
    summary += `从投资保护角度，${module4Score >= 4 ? '项目具备完善的投资保护机制' : module4Score >= 3 ? '项目有一定的投资保护' : '投资保护机制较弱'}。从现金流角度，${module2Score >= 4 ? '项目能稳定产生正现金流' : module2Score >= 3 ? '项目现金流基本平衡' : '项目现金流存在较大压力'}。`;
    summary += '</p>';
    
    // 更新显示
    document.getElementById('totalScore').textContent = totalScore.toFixed(1);
    document.getElementById('scoreRating').textContent = rating;
    document.getElementById('scoreRating').className = `score-rating ${ratingClass}`;
    
    // 更新模块评分
    const moduleScoresHTML = `
        <div style="display: grid; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #F8F9FA; border-radius: 8px; border-left: 4px solid #667eea;">
                <span><strong>模块一：资产质量</strong>（权重30%）</span>
                <span style="color: #667eea; font-weight: 600; font-size: 1.1em;">${module1Score.toFixed(2)}分</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #F8F9FA; border-radius: 8px; border-left: 4px solid #10B981;">
                <span><strong>模块二：单位经济模型</strong>（权重25%）</span>
                <span style="color: #10B981; font-weight: 600; font-size: 1.1em;">${module2Score.toFixed(2)}分</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #F8F9FA; border-radius: 8px; border-left: 4px solid #F59E0B;">
                <span><strong>模块三：运营能力</strong>（权重20%）</span>
                <span style="color: #F59E0B; font-weight: 600; font-size: 1.1em;">${module3Score.toFixed(2)}分</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #F8F9FA; border-radius: 8px; border-left: 4px solid #EF4444;">
                <span><strong>模块四：结构安全性</strong>（权重15%）</span>
                <span style="color: #EF4444; font-weight: 600; font-size: 1.1em;">${module4Score.toFixed(2)}分</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #F8F9FA; border-radius: 8px; border-left: 4px solid #8B5CF6;">
                <span><strong>模块五：扩张能力</strong>（权重10%）</span>
                <span style="color: #8B5CF6; font-weight: 600; font-size: 1.1em;">${module5Score.toFixed(2)}分</span>
            </div>
        </div>
    `;
    
    document.getElementById('scoreRecommendation').innerHTML = `<p style="font-size: 1.1em;"><strong>投资建议：${recommendation}</strong></p>`;
    document.getElementById('moduleScores').innerHTML = moduleScoresHTML;
    document.getElementById('projectStrengths').innerHTML = strengthsHTML;
    document.getElementById('projectRisks').innerHTML = risksHTML;
    document.getElementById('investmentSummary').innerHTML = summary;
    
    document.getElementById('screeningResults').classList.remove('hidden');
    document.getElementById('screeningResults').scrollIntoView({ behavior: 'smooth' });
    
    console.log('✅ 评分计算完成');
    console.log('模块一（资产质量30%）:', module1Score.toFixed(2));
    console.log('模块二（单位经济模型25%）:', module2Score.toFixed(2));
    console.log('模块三（运营能力20%）:', module3Score.toFixed(2));
    console.log('模块四（结构安全性15%）:', module4Score.toFixed(2));
    console.log('模块五（扩张能力10%）:', module5Score.toFixed(2));
    console.log('加权总分:', totalScore.toFixed(1));
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
// 协议文本生成和复制
// ==========================================

function generateAndCopy() {
    // 获取所有输入值
    const partyA = document.getElementById('partyA').value || '【甲方名称】';
    const partyB = document.getElementById('partyB').value || '【乙方名称】';
    const assetScope = document.getElementById('assetScope').value || '【资产范围】';
    const investment = document.getElementById('contractInvestment').value || '100';
    const shareRatio = document.getElementById('contractShareRatio').value || '10';
    const annualRateCap = document.getElementById('contractAnnualRateCap').value || '15';
    const dataFrequency = document.getElementById('dataFrequency').value || '【选择频率】';
    const dataMode = document.getElementById('dataMode').value || '【选择方式】';
    const paymentFrequency = document.getElementById('paymentFrequency').value || '【选择频率】';
    const paymentMode = document.getElementById('paymentMode').value || '【选择方式】';
    
    // 生成文本版本
    const textVersion = `投资协议关键条款

基本信息：
• 甲方（投资方）：${partyA}
• 乙方（运营方）：${partyB}
• 收入分成资产范围：${assetScope}
• 投资金额：${investment}万元
• 分成比例：${shareRatio}%

关键条款：

01 投资方式
甲方${partyA}投资人民币${investment}万元，用于${assetScope}等

02 收益分配
在分成期内，甲方获得${partyB}（乙方）项目营业额的${shareRatio}%

03 封顶机制
滴灌通累计实际取得的收入分成金额合计达到"联营资金金额×(1+${annualRateCap}%÷360×已联营天数)"金额（合称"分成终止触发事项"），达到封顶，收入分成终止

04 数据传输方式
按照${dataFrequency}，${dataMode}进行数据报送

05 分成付款方式
按照${paymentFrequency}，${paymentMode}进行分成打款`;
    
    // 复制到剪贴板
    navigator.clipboard.writeText(textVersion).then(() => {
        const statusEl = document.getElementById('copyStatus');
        statusEl.textContent = '✅ 已复制到剪贴板！';
        statusEl.style.color = '#10B981';
        
        // 3秒后清除提示
        setTimeout(() => {
            statusEl.textContent = '';
        }, 3000);
        
        console.log('✅ 协议文本已复制到剪贴板');
    }).catch(err => {
        const statusEl = document.getElementById('copyStatus');
        statusEl.textContent = '❌ 复制失败，请手动复制';
        statusEl.style.color = '#DC2626';
        console.error('复制失败:', err);
    });
}
