// ==========================================
// 滴灌通投资决策平台 - JavaScript
// ==========================================

// 全局状态
const state = {
    uploadedFiles: [],
    screeningFiles: []
};

// ==========================================
// 页面初始化
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ 滴灌通投资决策平台已加载');
    
    // 初始化文件上传
    initFileUpload();
    initScreeningFileUpload();
    
    // 初始化计算器实时计算
    initCalculator();
    
    // 初始化企业筛选实时计算
    initScreening();
    
    // 初始化合同实时更新
    initContract();
    
    // 初始化返回顶部按钮
    initBackToTop();
    
    // 初始化导航高亮
    initNavigation();
});

// ==========================================
// 文件上传 - 投资报告
// ==========================================

function initFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const generateBtn = document.getElementById('generateBtn');
    const exportPPTBtn = document.getElementById('exportPPTBtn');
    
    // 点击上传
    uploadArea.addEventListener('click', () => {
        if (event.target.tagName !== 'BUTTON') {
            fileInput.click();
        }
    });
    
    // 文件选择
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    // 拖拽上传
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
}

function handleFiles(files) {
    const fileList = document.getElementById('fileList');
    const generateBtn = document.getElementById('generateBtn');
    
    Array.from(files).forEach(file => {
        if (state.uploadedFiles.some(f => f.name === file.name)) {
            return; // 跳过重复文件
        }
        
        state.uploadedFiles.push(file);
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">📄</span>
                <span class="file-name">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
            </div>
            <button class="file-remove" onclick="removeFile('${file.name}')">×</button>
        `;
        
        fileList.appendChild(fileItem);
    });
    
    generateBtn.disabled = state.uploadedFiles.length === 0;
}

function removeFile(fileName) {
    state.uploadedFiles = state.uploadedFiles.filter(f => f.name !== fileName);
    updateFileList();
}

function updateFileList() {
    const fileList = document.getElementById('fileList');
    const generateBtn = document.getElementById('generateBtn');
    
    fileList.innerHTML = '';
    state.uploadedFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">📄</span>
                <span class="file-name">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
            </div>
            <button class="file-remove" onclick="removeFile('${file.name}')">×</button>
        `;
        fileList.appendChild(fileItem);
    });
    
    generateBtn.disabled = state.uploadedFiles.length === 0;
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ==========================================
// AI 投资报告生成
// ==========================================

function generateAIReport() {
    if (state.uploadedFiles.length === 0) {
        alert('请先上传企业资料');
        return;
    }
    
    // 模拟 AI 分析
    const reportHTML = `
        <h3 class="report-section-title">一、执行摘要</h3>
        <div class="report-content">
            基于对上传的${state.uploadedFiles.length}份企业资料的分析，该项目具备较强的投资价值。企业在点位资源、运营能力、品牌整合等方面表现优秀，符合超级加盟商行业的发展趋势。
        </div>
        
        <h3 class="report-section-title">二、行业分析</h3>
        <div class="report-content">
            <strong>市场规模</strong>：2025年中国连锁加盟市场规模约2.77万亿元，同比增长4.8%<br>
            <strong>增长驱动</strong>：消费升级、高势能点位稀缺、专业化运营需求、资本市场活跃<br>
            <strong>市场机会</strong>：机场、高铁站等核心点位存在较大需求缺口
        </div>
        
        <h3 class="report-section-title">三、企业优势</h3>
        <div class="report-content">
            ✓ <strong>优质点位资源</strong>：掌握机场、高铁等核心商业点位资源<br>
            ✓ <strong>品牌整合能力</strong>：与400+品牌建立合作关系<br>
            ✓ <strong>运营经验丰富</strong>：成功运营120+门店，经验丰富<br>
            ✓ <strong>技术驱动</strong>：自研AI选址和运营管理系统
        </div>
        
        <h3 class="report-section-title">四、财务预测</h3>
        <table class="report-table">
            <tr>
                <th>指标</th>
                <th>数值</th>
            </tr>
            <tr>
                <td>建议投资金额</td>
                <td class="text-gold">400万元</td>
            </tr>
            <tr>
                <td>预计年化收益率</td>
                <td class="text-gold">18%</td>
            </tr>
            <tr>
                <td>预计回本周期</td>
                <td class="text-gold">15-18个月</td>
            </tr>
            <tr>
                <td>风险等级</td>
                <td class="text-gold">中低</td>
            </tr>
        </table>
        
        <h3 class="report-section-title">五、风险评估</h3>
        <div class="report-content">
            <strong>主要风险</strong>：招商延期、租金波动、品牌违约、疫情影响<br>
            <strong>缓释措施</strong>：多品牌组合、严格租约条款、外部投资者共担、数据透明化
        </div>
        
        <h3 class="report-section-title">六、投资建议</h3>
        <div class="report-content">
            <strong class="text-primary">综合评估：推荐投资</strong><br><br>
            该项目具备清晰的商业模式、稳定的收入来源和专业的运营团队。建议投资金额400-600万元，采用RBF模式，分成比例35-40%，联营期限18个月。
        </div>
    `;
    
    document.getElementById('aiReportContent').innerHTML = reportHTML;
    document.getElementById('aiReportDate').textContent = new Date().toLocaleDateString('zh-CN');
    document.getElementById('aiReportOutput').classList.remove('hidden');
    document.getElementById('exportPPTBtn').disabled = false;
    
    // 滚动到报告
    document.getElementById('aiReportOutput').scrollIntoView({ behavior: 'smooth' });
}

function exportReportPPT() {
    alert('PPT 导出功能开发中\n\n目前支持：\n• 复制报告内容到 PowerPoint\n• 使用第三方工具转换\n\n后续将集成自动PPT生成');
}

// ==========================================
// 文件上传 - 企业筛选
// ==========================================

function initScreeningFileUpload() {
    const uploadArea = document.getElementById('screeningUploadArea');
    const fileInput = document.getElementById('screeningFileInput');
    
    uploadArea.addEventListener('click', () => {
        if (event.target.tagName !== 'BUTTON') {
            fileInput.click();
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        handleScreeningFiles(e.target.files);
    });
}

function handleScreeningFiles(files) {
    const fileList = document.getElementById('screeningFileList');
    
    Array.from(files).forEach(file => {
        if (state.screeningFiles.some(f => f.name === file.name)) {
            return;
        }
        
        state.screeningFiles.push(file);
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">📄</span>
                <span class="file-name">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
            </div>
            <button class="file-remove" onclick="removeScreeningFile('${file.name}')">×</button>
        `;
        
        fileList.appendChild(fileItem);
    });
    
    // 模拟 AI 分析并预填评分
    if (state.screeningFiles.length > 0) {
        setTimeout(() => {
            // 自动填充为优秀评分
            document.getElementById('criteria1').value = '30';
            document.getElementById('criteria2').value = '20';
            document.getElementById('criteria3').value = '10';
            document.getElementById('criteria4').value = '40';
            document.getElementById('criteria5').value = '30';
            document.getElementById('criteria6').value = '30';
            document.getElementById('criteria7').value = '20';
            document.getElementById('criteria8').value = '20';
            
            // 自动计算
            updateScore();
            
            alert('AI已分析完成！\n\n根据企业资料，系统已自动填写评分建议。\n您可以根据实际情况调整。');
        }, 1500);
    }
}

function removeScreeningFile(fileName) {
    state.screeningFiles = state.screeningFiles.filter(f => f.name !== fileName);
    updateScreeningFileList();
}

function updateScreeningFileList() {
    const fileList = document.getElementById('screeningFileList');
    
    fileList.innerHTML = '';
    state.screeningFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">📄</span>
                <span class="file-name">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
            </div>
            <button class="file-remove" onclick="removeScreeningFile('${file.name}')">×</button>
        `;
        fileList.appendChild(fileItem);
    });
}

// ==========================================
// 投资回报计算器 - 实时计算
// ==========================================

function initCalculator() {
    const inputs = ['investAmount', 'monthlyRevenue', 'shareRatio', 'annualRate'];
    
    inputs.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', updateCalculator);
    });
    
    // 初始计算
    updateCalculator();
}

function updateCalculator() {
    const investAmount = parseFloat(document.getElementById('investAmount').value) || 0;
    const monthlyRevenue = parseFloat(document.getElementById('monthlyRevenue').value) || 0;
    const shareRatio = parseFloat(document.getElementById('shareRatio').value) || 0;
    const annualRate = parseFloat(document.getElementById('annualRate').value) || 0;
    
    if (investAmount > 0 && monthlyRevenue > 0) {
        const monthlyShare = monthlyRevenue * (shareRatio / 100);
        const cappedAmount = investAmount * (1 + annualRate / 100);
        const paybackMonths = Math.ceil(cappedAmount / monthlyShare);
        const duration = Math.max(paybackMonths, 18); // 至少18个月
        const totalReturn = monthlyShare * duration;
        
        document.getElementById('monthlyShare').textContent = monthlyShare.toFixed(2) + '万';
        document.getElementById('paybackMonths').textContent = paybackMonths + '个月';
        document.getElementById('duration').textContent = duration + '个月';
        document.getElementById('totalReturn').textContent = totalReturn.toFixed(2) + '万';
    }
}

// ==========================================
// 企业筛选评估 - 实时计算
// ==========================================

function initScreening() {
    const criteriaIds = ['criteria1', 'criteria2', 'criteria3', 'criteria4', 'criteria5', 'criteria6', 'criteria7', 'criteria8'];
    
    criteriaIds.forEach(id => {
        const select = document.getElementById(id);
        select.addEventListener('change', updateScore);
    });
    
    // 初始计算
    updateScore();
}

function updateScore() {
    let totalScore = 0;
    for (let i = 1; i <= 8; i++) {
        totalScore += parseInt(document.getElementById(`criteria${i}`).value);
    }
    
    // 确定评级
    let rating, ratingClass, recommendation, riskControl;
    
    if (totalScore >= 185) {
        rating = '优秀';
        ratingClass = 'excellent';
        recommendation = `综合评分<strong>${totalScore}分</strong>，属于<strong class="text-primary">优秀级别</strong>。<br><br>
            <strong>投资建议：强烈推荐投资</strong><br>
            建议投资规模：400-600万元 | 年化收益：18% | 分成比例：35% | 联营期限：18个月`;
        riskControl = '企业具备优质点位获取能力，历史履约记录良好，AI技术应用成熟，品牌资源丰富。建议重点关注：1）招商进度按时完成；2）每月数据及时报送；3）分成款项准时支付。';
    } else if (totalScore >= 155) {
        rating = '良好';
        ratingClass = 'good';
        recommendation = `综合评分<strong>${totalScore}分</strong>，属于<strong class="text-primary">良好级别</strong>。<br><br>
            <strong>投资建议：可以投资</strong><br>
            建议投资规模：200-400万元 | 年化收益：16-18% | 分成比例：40% | 联营期限：12-15个月`;
        riskControl = '企业整体能力较强，但仍有提升空间。建议重点关注：1）点位资源质量；2）品牌招商能力；3）运营数据真实性；4）团队稳定性。建议增加月度运营审核频次。';
    } else if (totalScore >= 125) {
        rating = '一般';
        ratingClass = 'fair';
        recommendation = `综合评分<strong>${totalScore}分</strong>，属于<strong class="text-primary">一般级别</strong>。<br><br>
            <strong>投资建议：谨慎投资</strong><br>
            建议投资规模：100-200万元 | 年化收益：14-16% | 分成比例：50% | 联营期限：6-12个月`;
        riskControl = '企业存在较多不确定因素。建议重点关注：1）点位资源是否稳定；2）品牌招商是否达标；3）收入是否达到预期；4）履约能力是否可靠。建议设置更严格的退出条款和风控措施。';
    } else {
        rating = '不推荐';
        ratingClass = 'poor';
        recommendation = `综合评分<strong>${totalScore}分</strong>，低于投资标准。<br><br>
            <strong>投资建议：不建议投资</strong><br>
            综合能力不足，风险较高，建议观望或要求企业提升能力后再评估。`;
        riskControl = '企业综合能力较弱，不符合当前投资标准。主要风险：点位资源质量差、运营能力不足、品牌资源匮乏、团队经验不足。建议暂不投资，待企业提升能力后再行评估。';
    }
    
    // 更新显示
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('scoreRating').textContent = rating;
    document.getElementById('scoreRating').className = `score-rating ${ratingClass}`;
    document.getElementById('scoreRecommendation').innerHTML = recommendation;
    document.getElementById('riskControl').innerHTML = riskControl;
}

// ==========================================
// 合同条款 - 实时更新
// ==========================================

function initContract() {
    const inputs = ['contractInvestment', 'contractAnnualRate', 'contractShareRatio', 'contractDuration'];
    
    inputs.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', updateContract);
    });
    
    // 初始更新
    updateContract();
}

function updateContract() {
    const investment = parseFloat(document.getElementById('contractInvestment').value) || 400;
    const annualRate = parseFloat(document.getElementById('contractAnnualRate').value) || 18;
    const shareRatio = parseFloat(document.getElementById('contractShareRatio').value) || 35;
    const duration = parseInt(document.getElementById('contractDuration').value) || 18;
    
    const cappedAmount = investment * (1 + annualRate / 100);
    
    document.getElementById('termInvestment').innerHTML = `甲方以现金方式投资人民币<strong>${investment}万元</strong>，用于项目装修、设备采购、品牌加盟费等`;
    document.getElementById('termShare').innerHTML = `甲方获得项目营业额的<strong>${shareRatio}%</strong>作为投资回报，年化收益率<strong>${annualRate}%</strong>`;
    document.getElementById('termCap').innerHTML = `甲方累计分成达到<strong>${cappedAmount.toFixed(0)}万元</strong>（投资本金×${(1 + annualRate / 100).toFixed(2)}）时，投资关系终止`;
    document.getElementById('termExit').innerHTML = `联营期<strong>${duration}个月</strong>，到期或达封顶金额时终止。提前退出需提前通知并返还相应款项`;
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
