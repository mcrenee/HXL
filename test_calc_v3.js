// 测试投资计算器逻辑 V3 - 预计联营期限单位为天
const I = 100; // 投资金额（万元）
const M = 30;  // 月营业额（万元）
const R = 10;  // 分成比例（%）
const A = 15;  // 预期收益率（%）

console.log('=== 测试投资计算器逻辑 V3 ===');
console.log('输入参数：');
console.log(`投资金额：${I} 万元`);
console.log(`月营业额：${M} 万元`);
console.log(`分成比例：${R}%`);
console.log(`预期收益率：${A}%`);
console.log('');

console.log('核心公式：');
console.log('投资金额 × (1 + 预期收益率/100/360 × 预计联营期限) = 月营业额/30 × 预计联营期限 × 分成比例/100');
console.log('');

// 1. 计算预计联营期限（天）
// D = I / (M×R/3000 - I×A/36000)
const denominator = (M * R / 3000) - (I * A / 36000);
console.log(`分母计算：(${M} × ${R} / 3000) - (${I} × ${A} / 36000)`);
console.log(`= ${M * R / 3000} - ${I * A / 36000}`);
console.log(`= ${denominator}`);
console.log('');

if (denominator <= 0) {
    console.log('❌ 无法计算：月分成收入不足以覆盖投资收益要求');
    process.exit(1);
}

const D = I / denominator;
console.log(`预计联营期限 D = ${I} / ${denominator} = ${D} 天`);
console.log(`向上取整：${Math.ceil(D)} 天`);
console.log(`约等于：${(D / 30).toFixed(1)} 月 或 ${(D / 365).toFixed(1)} 年`);
console.log('');

// 2. 预计封顶金额
const cappedAmount = I * (1 + (A / 100 / 360) * D);
console.log(`预计封顶金额 = ${I} × (1 + (${A} / 100 / 360) × ${D})`);
console.log(`= ${I} × (1 + ${(A / 100 / 360) * D})`);
console.log(`= ${I} × ${1 + (A / 100 / 360) * D}`);
console.log(`= ${cappedAmount.toFixed(2)} 万元`);
console.log('');

console.log('=== 验证公式 ===');
const leftSide = I * (1 + (A / 100 / 360) * D);
const rightSide = (M / 30) * D * (R / 100);
console.log(`左边：投资金额 × (1 + 预期收益率/100/360 × 预计联营期限)`);
console.log(`= ${I} × (1 + ${(A / 100 / 360) * D})`);
console.log(`= ${leftSide.toFixed(4)}`);
console.log('');
console.log(`右边：月营业额/30 × 预计联营期限 × 分成比例/100`);
console.log(`= ${M}/30 × ${D} × ${R / 100}`);
console.log(`= ${M / 30} × ${D} × ${R / 100}`);
console.log(`= ${rightSide.toFixed(4)}`);
console.log('');
console.log(`差值：${Math.abs(leftSide - rightSide).toFixed(6)}`);
console.log(Math.abs(leftSide - rightSide) < 0.01 ? '✅ 公式验证通过' : '❌ 公式验证失败');
console.log('');

console.log('=== 最终输出 ===');
console.log(`✅ 预计联营期限：${Math.ceil(D)} 天`);
console.log(`✅ 预计封顶金额：${cappedAmount.toFixed(2)} 万元`);
