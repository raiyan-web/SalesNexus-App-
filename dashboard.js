// ===== Dashboard View =====
import { leads, deals, customers, insights } from '../data/mockData.js';
import { scoreAllLeads } from '../engine/leadScoring.js';
import { classifyAllDeals } from '../engine/riskDetector.js';
import { predictAllChurn } from '../engine/churnPredictor.js';

export function renderDashboard(container) {
  const scoredLeads = scoreAllLeads(leads);
  const classifiedDeals = classifyAllDeals(deals);
  const churnData = predictAllChurn(customers);

  const totalPipeline = deals.reduce((s, d) => s + d.value, 0);
  const avgDealSize = Math.round(totalPipeline / deals.length);
  const highLeads = scoredLeads.filter(l => l.scoring.tier === 'High').length;
  const atRisk = classifiedDeals.filter(d => d.riskAssessment.level !== 'healthy').length;
  const avgChurn = Math.round(churnData.reduce((s, c) => s + c.churnAnalysis.churnProbability, 0) / churnData.length);

  container.innerHTML = `
    <div class="view-header animate-in">
      <h1>📊 Command Center</h1>
      <p class="subtitle">Real-time AI-powered sales intelligence overview</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card animate-in stagger-1">
        <div class="kpi-icon" style="background:var(--color-success-bg)">💰</div>
        <div class="kpi-label">Pipeline Value</div>
        <div class="kpi-value" id="kpi-pipeline">$0</div>
        <div class="kpi-change positive">▲ 12.5% vs last month</div>
      </div>
      <div class="kpi-card animate-in stagger-2">
        <div class="kpi-icon" style="background:var(--color-info-bg)">🎯</div>
        <div class="kpi-label">Hot Leads</div>
        <div class="kpi-value" id="kpi-leads">0</div>
        <div class="kpi-change positive">▲ 3 new this week</div>
      </div>
      <div class="kpi-card animate-in stagger-3">
        <div class="kpi-icon" style="background:var(--color-warning-bg)">⚠️</div>
        <div class="kpi-label">At-Risk Deals</div>
        <div class="kpi-value" id="kpi-risk">0</div>
        <div class="kpi-change negative">▲ 2 from last week</div>
      </div>
      <div class="kpi-card animate-in stagger-4">
        <div class="kpi-icon" style="background:var(--color-danger-bg)">📉</div>
        <div class="kpi-label">Avg Churn Risk</div>
        <div class="kpi-value" id="kpi-churn">0%</div>
        <div class="kpi-change negative">Needs attention</div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card animate-in stagger-3">
        <h3><span class="dot"></span> Pipeline by Stage</h3>
        <canvas id="pipeline-chart" height="200"></canvas>
      </div>
      <div class="chart-card animate-in stagger-4">
        <h3><span class="dot" style="background:var(--accent-teal)"></span> Risk Distribution</h3>
        <canvas id="risk-chart" height="200"></canvas>
      </div>
    </div>

    <div class="grid-2 animate-in stagger-5">
      <div class="chart-card">
        <h3><span class="dot" style="background:var(--color-success)"></span> AI Insights Feed</h3>
        <div class="insights-feed" id="insights-feed"></div>
      </div>
      <div class="chart-card">
        <h3><span class="dot" style="background:var(--color-warning)"></span> Top Leads</h3>
        <div id="top-leads"></div>
      </div>
    </div>
  `;

  // Animate KPI counters
  animateCounter('kpi-pipeline', totalPipeline, '$', true);
  animateCounter('kpi-leads', highLeads);
  animateCounter('kpi-risk', atRisk);
  animateCounter('kpi-churn', avgChurn, '', false, '%');

  // Pipeline chart
  const stages = ['Discovery', 'Proposal', 'Negotiation', 'Closed'];
  const stageValues = stages.map(s => deals.filter(d => d.stage === s).reduce((sum, d) => sum + d.value, 0));
  new Chart(document.getElementById('pipeline-chart'), {
    type: 'bar',
    data: {
      labels: stages,
      datasets: [{
        label: 'Pipeline Value ($)',
        data: stageValues,
        backgroundColor: ['rgba(124,58,237,0.6)', 'rgba(6,182,212,0.6)', 'rgba(245,158,11,0.6)', 'rgba(16,185,129,0.6)'],
        borderColor: ['#7c3aed', '#06b6d4', '#f59e0b', '#10b981'],
        borderWidth: 1,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(148,163,184,0.06)' }, ticks: { color: '#64748b', callback: v => '$' + (v/1000) + 'K' } },
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
      }
    }
  });

  // Risk donut
  const riskCounts = { healthy: 0, 'at-risk': 0, critical: 0 };
  classifiedDeals.forEach(d => riskCounts[d.riskAssessment.level]++);
  new Chart(document.getElementById('risk-chart'), {
    type: 'doughnut',
    data: {
      labels: ['Healthy', 'At Risk', 'Critical'],
      datasets: [{
        data: [riskCounts.healthy, riskCounts['at-risk'], riskCounts.critical],
        backgroundColor: ['rgba(16,185,129,0.7)', 'rgba(245,158,11,0.7)', 'rgba(239,68,68,0.7)'],
        borderColor: ['#10b981', '#f59e0b', '#ef4444'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 16, usePointStyle: true } } }
    }
  });

  // Insights feed
  const feedEl = document.getElementById('insights-feed');
  feedEl.innerHTML = insights.slice(0, 5).map(i => `
    <div class="insight-item">
      <div class="insight-icon" style="background:${i.bgColor}">${i.icon}</div>
      <div class="insight-text">
        <div class="insight-title">${i.title}</div>
        <div class="insight-desc">${i.desc}</div>
      </div>
      <span class="insight-time">${i.time}</span>
    </div>
  `).join('');

  // Top leads
  const topLeadsEl = document.getElementById('top-leads');
  topLeadsEl.innerHTML = scoredLeads.slice(0, 4).map(l => {
    const color = l.scoring.tier === 'High' ? 'var(--color-success)' : l.scoring.tier === 'Medium' ? 'var(--color-warning)' : 'var(--color-danger)';
    return `
    <div class="insight-item" style="cursor:pointer">
      <div class="insight-icon" style="background:rgba(124,58,237,0.12);font-size:.85rem;font-weight:800;color:${color}">${l.scoring.score}</div>
      <div class="insight-text">
        <div class="insight-title">${l.name} — ${l.company}</div>
        <div class="insight-desc">${l.scoring.reasons[0]}</div>
      </div>
      <span class="badge badge-${l.scoring.tier.toLowerCase()}">${l.scoring.tier}</span>
    </div>`;
  }).join('');
}

function animateCounter(id, target, prefix = '', isLarge = false, suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = target / 40;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    const val = isLarge ? (Math.round(current / 1000)) + 'K' : Math.round(current);
    el.textContent = prefix + val + suffix;
  }, 30);
}
