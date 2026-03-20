// ===== Retention & Churn Prediction View =====
import { customers } from '../data/mockData.js';
import { predictAllChurn } from '../engine/churnPredictor.js';

export function renderRetention(container) {
  const analyzedCustomers = predictAllChurn(customers).sort((a, b) => b.churnAnalysis.churnProbability - a.churnAnalysis.churnProbability);

  container.innerHTML = `
    <div class="view-header animate-in">
      <h1>🔄 Revenue Retention</h1>
      <p class="subtitle">Predictive churn modeling and proactive retention strategies</p>
    </div>

    <div class="grid-3 animate-in stagger-2" style="margin-bottom:30px;">
      ${analyzedCustomers.slice(0, 3).map((c, i) => renderCustomerHealthCard(c, i)).join('')}
    </div>

    <div class="card animate-in stagger-4" style="padding:0; overflow:hidden;">
      <h3 style="padding:20px; border-bottom:1px solid var(--border-color); margin:0; font-size:1rem;">All Accounts</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Contract Value</th>
            <th>Renewal In</th>
            <th>Usage Trend</th>
            <th>Churn Risk</th>
          </tr>
        </thead>
        <tbody>
          ${analyzedCustomers.map(c => `
            <tr>
              <td>
                <div style="font-weight:600;">${c.name}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${c.contactName}</div>
              </td>
              <td style="font-weight:600;">$${c.contractValue.toLocaleString()}</td>
              <td>${c.monthsRemaining} mo</td>
              <td>
                <span style="color:${c.usage.trend === 'growing' ? 'var(--color-success)' : c.usage.trend === 'declining' ? 'var(--color-danger)' : 'var(--text-secondary)'}">
                  ${c.usage.trend === 'growing' ? '↗' : c.usage.trend === 'declining' ? '↘' : '→'} ${c.usage.trend}
                </span>
                <div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">${c.features.adopted}/${c.features.total} features</div>
              </td>
              <td>
                <span class="badge badge-${c.churnAnalysis.risk.toLowerCase()}">${c.churnAnalysis.churnProbability}% Risk</span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderCustomerHealthCard(customer, index) {
  const analysis = customer.churnAnalysis;
  const strokeColor = analysis.risk === 'High' ? 'var(--color-danger)' : analysis.risk === 'Medium' ? 'var(--color-warning)' : 'var(--color-success)';

  // Calculate gauge rotation (0 to 180deg)
  // Base transform is -45deg. 0% = -45deg, 100% = 135deg (total 180deg rotation)
  const rotation = -45 + (180 * (analysis.churnProbability / 100));

  return `
    <div class="customer-health-card stagger-${index+1}">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
        <div>
          <div class="customer-name">${customer.name}</div>
          <div class="customer-industry">${customer.industry}</div>
        </div>
        <div class="gauge-container">
          <div class="gauge">
            <div class="gauge-bg"></div>
            <div class="gauge-fill" style="transform: rotate(${rotation}deg); border-top-color: ${strokeColor}; border-right-color: ${strokeColor};"></div>
          </div>
          <div class="gauge-value" style="color: ${strokeColor}; margin-top:-15px;">${analysis.churnProbability}%</div>
          <div style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em; font-weight:700;">Churn Risk</div>
        </div>
      </div>

      <div style="margin-bottom:20px;">
        <div class="metric-row">
          <span class="metric-label">ARR</span>
          <span class="metric-value" style="color:var(--accent-teal-light);">$${customer.contractValue.toLocaleString()}</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Renewal</span>
          <span class="metric-value">${customer.monthsRemaining} months</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Support Status</span>
          <span class="metric-value" style="color:${customer.supportTickets.severity === 'critical' ? 'var(--color-danger)' : 'var(--text-primary)'}">
            ${customer.supportTickets.open} open (${customer.supportTickets.severity})
          </span>
        </div>
      </div>

      <div>
        <h4 style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          <div class="ai-pulse" style="background:var(--accent-violet);"></div>
          AI Strategy
        </h4>
        ${analysis.strategies[0] ? `
          <div class="strategy-card" style="padding:12px; background:rgba(0,0,0,0.2);">
            <div class="strategy-icon" style="font-size:1.2rem;">${analysis.strategies[0].icon}</div>
            <div class="strategy-content">
              <h4 style="font-size:0.8rem;">${analysis.strategies[0].title}</h4>
              <p style="font-size:0.75rem; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${analysis.strategies[0].desc}</p>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}
