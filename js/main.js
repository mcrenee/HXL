// ==========================================
// 平滑滚动
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = 80;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// 导航栏滚动效果
// ==========================================
let lastScroll = 0;
const navbar = document.querySelector('.nav-bar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// 数字递增动画
// ==========================================
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target;
            const target = parseInt(statValue.getAttribute('data-target'));
            animateValue(statValue, 0, target, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-value[data-target]').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// Chart.js - 历史履约数据图表
// ==========================================
window.addEventListener('load', () => {
    const ctx = document.getElementById('performanceChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['浦东机场', '南京机场', '西安机场'],
                datasets: [{
                    label: '投资金额（万元）',
                    data: [290, 265, 170],
                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 2
                }, {
                    label: '累计回款（万元）',
                    data: [314, 190, 42],
                    backgroundColor: 'rgba(34, 197, 94, 0.8)',
                    borderColor: 'rgba(34, 197, 94, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: "'Noto Sans SC', sans-serif",
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 14,
                            family: "'Noto Sans SC', sans-serif"
                        },
                        bodyFont: {
                            size: 13,
                            family: "'Noto Sans SC', sans-serif"
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                family: "'Noto Sans SC', sans-serif"
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: "'Noto Sans SC', sans-serif"
                            }
                        }
                    }
                }
            }
        });
    }
});

// ==========================================
// 企业筛选评分计算
// ==========================================
function calculateScore() {
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
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('industryScore').textContent = `${industryScore}/60`;
    document.getElementById('specificScore').textContent = `${specificScore}/140`;
    
    // 评级和建议
    let rating, recommendation, riskAnalysis;
    
    if (totalScore >= 170) {
        rating = '⭐⭐⭐⭐⭐ 优秀';
        recommendation = '强烈推荐投资。该企业具备优质点位资源、成熟运营能力和良好履约记录，预期回报稳定，风险可控。建议优先安排尽调，快速推进投资流程。';
        riskAnalysis = '风险较低。重点关注：①招商进度是否符合预期 ②品牌方合作协议的完整性 ③现金流数据的真实性验证。建议投资金额：400-600万元。';
    } else if (totalScore >= 140) {
        rating = '⭐⭐⭐⭐ 良好';
        recommendation = '推荐投资。该企业整体表现良好，具备一定竞争优势，但部分指标仍有提升空间。建议进行详细尽调，重点评估弱项指标的改善计划。';
        riskAnalysis = '风险中等。重点关注：①点位资源的独占性和稳定性 ②团队执行能力的验证 ③历史项目的详细履约数据。建议投资金额：300-400万元，首笔可采用较短周期测试。';
    } else if (totalScore >= 110) {
        rating = '⭐⭐⭐ 一般';
        recommendation = '谨慎考虑。该企业基础条件尚可，但存在明显短板。建议要求企业提供详细改善方案，可考虑小额试点投资，验证运营能力后再扩大规模。';
        riskAnalysis = '风险较高。重点关注：①是否有成功案例支撑 ②资金使用计划的合理性 ③保底收入机制是否完善。建议首笔投资≤200万元，回本后再追加。';
    } else {
        rating = '⭐⭐ 不推荐';
        recommendation = '不建议投资。该企业在多项核心指标上表现不佳，存在较大不确定性。建议暂缓投资，待企业补足短板后重新评估。';
        riskAnalysis = '风险高。主要问题：①缺乏优质点位资源 ②履约能力存疑 ③团队经验不足。若确有合作意向，建议要求实控人提供个人担保，并设置严格的对赌条款。';
    }
    
    document.getElementById('scoreRating').innerHTML = rating;
    document.getElementById('recommendation').textContent = recommendation;
    document.getElementById('riskAnalysis').textContent = riskAnalysis;
    
    // 显示结果区域
    document.getElementById('scoreResult').style.display = 'block';
    
    // 滚动到结果区域
    document.getElementById('scoreResult').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

function resetForm() {
    // 重置所有选择框
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`criteria${i}`).value = '0';
    }
    
    // 隐藏结果
    document.getElementById('scoreResult').style.display = 'none';
    
    // 滚动到表单顶部
    document.getElementById('screening').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// ==========================================
// 导航高亮
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ==========================================
// 页面加载完成后的初始化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('超级加盟商投资决策平台已加载');
    
    // 添加渐入动画
    const fadeElements = document.querySelectorAll('.stat-card, .model-card, .case-study, .contract-section');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => fadeObserver.observe(el));
});
