// ==========================================
// 投资回报计算器
// ==========================================
function calculateROI() {
    const investAmount = parseFloat(document.getElementById('investAmount').value) || 0;
    const annualRate = parseFloat(document.getElementById('annualRate').value) || 0;
    const shareRatio = parseFloat(document.getElementById('shareRatio').value) || 0;
    const monthlyRevenue = parseFloat(document.getElementById('monthlyRevenue').value) || 0;
    const duration = parseInt(document.getElementById('duration').value) || 0;

    // 计算月均分成
    const monthlyShare = (monthlyRevenue * shareRatio / 100).toFixed(2);

    // 计算封顶金额（本金 + 收益）
    const cappedAmount = (investAmount * (1 + annualRate / 100)).toFixed(2);

    // 计算总回报（基于月均分成和期限）
    const totalReturn = (monthlyShare * duration).toFixed(2);

    // 计算回本周期（月）
    const paybackPeriod = (investAmount / monthlyShare).toFixed(1);

    // 计算利润
    const profit = (totalReturn - investAmount).toFixed(2);

    // 更新显示
    document.getElementById('monthlyShare').textContent = monthlyShare;
    document.getElementById('totalReturn').textContent = totalReturn;
    document.getElementById('cappedAmount').textContent = cappedAmount;
    document.getElementById('paybackPeriod').textContent = paybackPeriod;
    document.getElementById('profit').textContent = profit;
}

// 页面加载时自动计算一次
window.addEventListener('load', calculateROI);

// 导出计算结果
function exportCalculation() {
    const projectName = document.getElementById('projectName').value || '未命名项目';
    const investAmount = document.getElementById('investAmount').value;
    const annualRate = document.getElementById('annualRate').value;
    const shareRatio = document.getElementById('shareRatio').value;
    const monthlyRevenue = document.getElementById('monthlyRevenue').value;
    const duration = document.getElementById('duration').value;
    const paybackPeriod = document.getElementById('paybackPeriod').textContent;
    const monthlyShare = document.getElementById('monthlyShare').textContent;
    const totalReturn = document.getElementById('totalReturn').textContent;
    const cappedAmount = document.getElementById('cappedAmount').textContent;
    const profit = document.getElementById('profit').textContent;

    const report = `
投资回报计算报告
==========================================
项目名称：${projectName}
生成日期：${new Date().toLocaleDateString('zh-CN')}

基本信息
------------------------------------------
投资金额：${investAmount} 万元
年化收益率：${annualRate}%
分成比例：${shareRatio}%
预计月收入：${monthlyRevenue} 万元
联营期限：${duration} 个月

计算结果
------------------------------------------
预计回本周期：${paybackPeriod} 个月
月均分成：${monthlyShare} 万元
总回报（期限内）：${totalReturn} 万元
封顶金额（本+息）：${cappedAmount} 万元
预计利润：${profit} 万元

==========================================
© 2026 滴灌通投资平台
`;

    // 创建下载链接
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `投资回报计算_${projectName}_${new Date().toLocaleDateString('zh-CN')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// ==========================================
// 企业筛选评分
// ==========================================
function calculateScore() {
    const companyName = document.getElementById('companyName').value;
    
    if (!companyName) {
        alert('请先输入企业名称！');
        return;
    }

    // 获取所有选择的值
    const scores = [];
    for (let i = 1; i <= 8; i++) {
        const value = parseInt(document.getElementById(`criteria${i}`).value);
        if (value === 0) {
            alert('请完成所有标准的选择！');
            return;
        }
        scores.push(value);
    }
    
    // 计算行业通识标准得分（前3项）
    const industryScore = scores[0] + scores[1] + scores[2];
    
    // 计算专属分析标准得分（后5项）
    const specificScore = scores[3] + scores[4] + scores[5] + scores[6] + scores[7];
    
    // 总分
    const totalScore = industryScore + specificScore;
    
    // 显示结果
    document.getElementById('companyNameResult').textContent = companyName;
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('industryScore').textContent = industryScore;
    document.getElementById('specificScore').textContent = specificScore;
    
    // 评级和建议
    let rating, recommendation, riskAnalysis;
    
    if (totalScore >= 170) {
        rating = '⭐⭐⭐⭐⭐ 优秀';
        recommendation = '强烈推荐投资。该企业具备优质点位资源、成熟运营能力和良好履约记录，预期回报稳定，风险可控。建议优先安排尽调，快速推进投资流程。投资金额建议：400-600万元。';
        riskAnalysis = '风险等级：低。重点关注：①招商进度是否符合预期 ②品牌方合作协议的完整性 ③现金流数据的真实性验证 ④月度数据按时上报情况。';
    } else if (totalScore >= 140) {
        rating = '⭐⭐⭐⭐ 良好';
        recommendation = '推荐投资。该企业整体表现良好，具备一定竞争优势，但部分指标仍有提升空间。建议进行详细尽调，重点评估弱项指标的改善计划。投资金额建议：300-400万元。';
        riskAnalysis = '风险等级：中。重点关注：①点位资源的独占性和稳定性 ②团队执行能力的验证 ③历史项目的详细履约数据 ④首笔可采用较短周期（12月）测试。';
    } else if (totalScore >= 110) {
        rating = '⭐⭐⭐ 一般';
        recommendation = '谨慎考虑。该企业基础条件尚可，但存在明显短板。建议要求企业提供详细改善方案，可考虑小额试点投资，验证运营能力后再扩大规模。投资金额建议：≤200万元。';
        riskAnalysis = '风险等级：较高。重点关注：①是否有成功案例支撑 ②资金使用计划的合理性 ③保底收入机制是否完善 ④建议回本后再追加投资。';
    } else {
        rating = '⭐⭐ 不推荐';
        recommendation = '不建议投资。该企业在多项核心指标上表现不佳，存在较大不确定性。建议暂缓投资，待企业补足短板后重新评估。';
        riskAnalysis = '风险等级：高。主要问题：①缺乏优质点位资源 ②履约能力存疑 ③团队经验不足。若确有合作意向，必须要求实控人提供个人担保，并设置严格的对赌条款。';
    }
    
    document.getElementById('scoreRating').innerHTML = rating;
    document.getElementById('recommendation').textContent = recommendation;
    document.getElementById('riskAnalysis').textContent = riskAnalysis;
    
    // 显示结果区域
    document.getElementById('scoreResult').classList.remove('hidden');
    
    // 滚动到结果区域
    document.getElementById('scoreResult').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

function resetScreening() {
    document.getElementById('companyName').value = '';
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`criteria${i}`).value = '0';
    }
    document.getElementById('scoreResult').classList.add('hidden');
    window.scrollTo({ top: document.getElementById('screening').offsetTop - 100, behavior: 'smooth' });
}

// 导出筛选报告
function exportScreening() {
    const companyName = document.getElementById('companyNameResult').textContent;
    const totalScore = document.getElementById('totalScore').textContent;
    const industryScore = document.getElementById('industryScore').textContent;
    const specificScore = document.getElementById('specificScore').textContent;
    const rating = document.getElementById('scoreRating').textContent;
    const recommendation = document.getElementById('recommendation').textContent;
    const riskAnalysis = document.getElementById('riskAnalysis').textContent;

    const report = `
企业筛选评估报告
==========================================
企业名称：${companyName}
评估日期：${new Date().toLocaleDateString('zh-CN')}
评估机构：滴灌通投资（海南）有限公司

综合评分
------------------------------------------
总分：${totalScore} / 200 分
评级：${rating}

分项得分
------------------------------------------
行业通识标准：${industryScore} / 60 分
专属分析标准：${specificScore} / 140 分

投资建议
------------------------------------------
${recommendation}

风控要点
------------------------------------------
${riskAnalysis}

==========================================
本报告基于8项标准评估体系生成
评估标准权重：行业通识30% + 专属分析70%
© 2026 滴灌通投资平台
`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `企业评估报告_${companyName}_${new Date().toLocaleDateString('zh-CN')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// ==========================================
// 合同生成器
// ==========================================
function generateContract() {
    const partyA = document.getElementById('partyA').value;
    const partyB = document.getElementById('partyB').value;
    const location = document.getElementById('location').value;
    const amount = document.getElementById('contractAmount').value;
    const rate = document.getElementById('contractRate').value;
    const share = document.getElementById('contractShare').value;
    const period = document.getElementById('contractPeriod').value;
    const signDate = document.getElementById('signDate').value || new Date().toLocaleDateString('zh-CN');

    if (!partyB || !location) {
        alert('请填写必要信息：乙方名称和项目点位');
        return;
    }

    const contract = `
        <div class="space-y-6 text-sm leading-relaxed">
            <div class="text-center">
                <h3 class="text-2xl font-bold text-purple-600 mb-2">联合经营协议</h3>
                <p class="text-gray-600">合同编号：DGT_${new Date().getFullYear()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <h4 class="font-bold text-gray-800 mb-2">合同主体</h4>
                <p><strong>甲方（投资方）：</strong>${partyA}</p>
                <p><strong>乙方（运营主体）：</strong>${partyB}</p>
                <p><strong>项目点位：</strong>${location}</p>
                <p><strong>签约日期：</strong>${signDate}</p>
            </div>

            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-bold text-gray-800 mb-3">第一条 投资金额与期限</h4>
                <p class="mb-2">1.1 甲方向乙方提供联营资金人民币 <strong class="text-blue-600 text-lg">${amount}万元</strong>，用于${location}项目的日常业务经营。</p>
                <p class="mb-2">1.2 联营期限为 <strong class="text-blue-600 text-lg">${period}个月</strong>，自资金到账之日起计算。</p>
                <p>1.3 资金到账后，乙方应于5个工作日内提供资金到账凭证。</p>
            </div>

            <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-bold text-gray-800 mb-3">第二条 收入分成安排</h4>
                <p class="mb-2">2.1 乙方应按月向甲方分成，分成比例为乙方收入的 <strong class="text-green-600 text-lg">${share}%</strong>。</p>
                <p class="mb-2">2.2 乙方收入包括但不限于：租金、联销经营费用、服务费、可确认的剩余押金或保证金。</p>
                <p class="mb-2">2.3 封顶机制：累计分成金额达到投资本金×（1+${rate}%）= <strong class="text-green-600 text-lg">${(amount * (1 + rate/100)).toFixed(2)}万元</strong> 时，合作终止。</p>
                <p class="mb-2">2.4 数据传输：每月1号前，乙方应向甲方提供上月完整经营数据。</p>
                <p>2.5 分成付款：每月1号通过系统自动分账或银行转账方式支付。</p>
            </div>

            <div class="bg-yellow-50 p-4 rounded-lg">
                <h4 class="font-bold text-gray-800 mb-3">第三条 前置条件</h4>
                <p class="mb-2">甲方提供联营资金的前置条件包括：</p>
                <ol class="list-decimal list-inside space-y-1 ml-4">
                    <li>乙方已取得经营业务所需的营业执照及相关资质证照；</li>
                    <li>乙方已签署${location}的租赁合同，并提供令甲方满意的相关证明；</li>
                    <li>甲方完成对项目的尽职调查，并取得关于提供联营资金的内部审批；</li>
                    <li>甲方与乙方的数据传输方案与分账方案均已完成且符合甲方要求；</li>
                    <li>乙方不存在任何违反本协议的陈述、保证及承诺或其它约定的情形。</li>
                </ol>
                <p class="mt-2 text-red-600 font-semibold">若前置条件在协议签署后20日内未满足，甲方有权单方面解除本协议。</p>
            </div>

            <div class="bg-red-50 p-4 rounded-lg">
                <h4 class="font-bold text-gray-800 mb-3">第四条 风险控制措施</h4>
                <p class="mb-2">4.1 <strong>招商保障：</strong>乙方应在联营开始前完成招商，储备3-5个不同业态的备选品牌。</p>
                <p class="mb-2">4.2 <strong>收入保障：</strong>租金采用保底租金+营业额分成机制，双重保障取其高。</p>
                <p class="mb-2">4.3 <strong>数据核验：</strong>通过营业截图+POS机小票双重验证，便于监控异常情况。</p>
                <p class="mb-2">4.4 <strong>违约处理：</strong>品牌违约或临时撤租，乙方可抵扣品牌押金；联合投资方共担风险。</p>
                <p>4.5 <strong>资金监管：</strong>资金仅限用于项目日常业务经营，接受政府主管部门合规性检查。</p>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-bold text-gray-800 mb-3">第五条 各方权利义务</h4>
                <p class="mb-2"><strong>甲方：</strong>提供联营资金，获得收入分成，有权监督资金使用和经营数据。</p>
                <p class="mb-2"><strong>乙方：</strong>经营项目，按约定分成，提供真实完整的数据，不得挪用资金。</p>
                <p><strong>丙方：</strong>作为乙方母公司，承担连带责任，协助项目运营管理。</p>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg">
                <h4 class="font-bold text-gray-800 mb-3">第六条 特殊约定</h4>
                <p class="mb-2">6.1 <strong>分成前债务：</strong>甲方不承担收入分成期开始前乙方存在的任何债务、负债和责任。</p>
                <p class="mb-2">6.2 <strong>税费承担：</strong>甲方不承担乙方经营应缴付的任何税项，乙方应按相关法律法规自行承担。</p>
                <p class="mb-2">6.3 <strong>押金处理：</strong>商户提前退租或触发不退还条件时，剩余押金确认为乙方收入参与分成。</p>
                <p>6.4 <strong>保密义务：</strong>各方应对本协议内容及项目信息保密，未经对方同意不得向第三方披露。</p>
            </div>

            <div class="bg-gray-100 p-4 rounded-lg">
                <h4 class="font-bold text-gray-800 mb-3">第七条 违约责任</h4>
                <p class="mb-2">7.1 乙方未按时支付分成款项的，应按日支付应付金额0.05%的违约金。</p>
                <p class="mb-2">7.2 乙方提供虚假数据的，甲方有权要求乙方立即返还全部投资款项并支付20%的违约金。</p>
                <p>7.3 任何一方违反本协议导致协议无法履行的，违约方应承担守约方的全部损失。</p>
            </div>

            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-bold text-gray-800 mb-3">第八条 争议解决</h4>
                <p class="mb-2">8.1 本协议适用中华人民共和国法律。</p>
                <p class="mb-2">8.2 因本协议引起的或与本协议有关的任何争议，各方应友好协商解决。</p>
                <p>8.3 协商不成的，任何一方均可向甲方所在地人民法院提起诉讼。</p>
            </div>

            <div class="mt-8 pt-6 border-t-2 border-gray-300">
                <p class="text-center text-gray-600 mb-6">本协议一式两份，甲乙双方各执一份，具有同等法律效力。</p>
                <div class="grid grid-cols-2 gap-8 mt-8">
                    <div>
                        <p class="font-bold">甲方（盖章）：</p>
                        <p class="mt-2">${partyA}</p>
                        <p class="mt-4">法定代表人/授权代表：___________</p>
                        <p class="mt-4">签署日期：${signDate}</p>
                    </div>
                    <div>
                        <p class="font-bold">乙方（盖章）：</p>
                        <p class="mt-2">${partyB}</p>
                        <p class="mt-4">法定代表人/授权代表：___________</p>
                        <p class="mt-4">签署日期：${signDate}</p>
                    </div>
                </div>
            </div>

            <div class="text-center text-xs text-gray-500 mt-8 pt-4 border-t">
                本合同由滴灌通投资决策平台自动生成 | © 2026 滴灌通投资（海南）有限公司
            </div>
        </div>
    `;

    document.getElementById('contractPreview').innerHTML = contract;
}

// 下载合同
function downloadContract() {
    const preview = document.getElementById('contractPreview');
    if (preview.textContent.includes('请填写左侧信息后生成合同')) {
        alert('请先生成合同！');
        return;
    }

    const partyB = document.getElementById('partyB').value || '企业';
    const content = preview.innerText;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `联合经营协议_${partyB}_${new Date().toLocaleDateString('zh-CN')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// ==========================================
// 平滑滚动
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// 初始化和调试
// ==========================================
console.log('main.js 文件开始加载');

// 测试函数是否可用
window.testJS = function() {
    alert('JavaScript 功能正常！');
    console.log('测试函数被调用');
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 内容已加载');
    
    // 设置默认签约日期为今天
    const signDateInput = document.getElementById('signDate');
    if (signDateInput) {
        const today = new Date().toISOString().split('T')[0];
        signDateInput.value = today;
        console.log('签约日期已设置:', today);
    }
    
    // 自动计算一次投资回报
    calculateROI();
    
    console.log('✅ 超级加盟商投资决策平台已完全加载');
    console.log('✅ calculateROI:', typeof calculateROI);
    console.log('✅ calculateScore:', typeof calculateScore);
    console.log('✅ generateContract:', typeof generateContract);
});

console.log('main.js 文件加载完成');
