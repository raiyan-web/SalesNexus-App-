// ===== Deal Pipeline View =====
import { deals } from '../data/mockData.js';
import { classifyAllDeals } from '../engine/riskDetector.js';
import { recordFeedback } from '../engine/selfLearning.js';

export function renderDeals(container) {
  const classifiedDeals = classifyAllDeals(deals);
  const stages = ['Discovery', 'Proposal', 'Negotiation', 'Closed'];

  container.innerHTML = `
    <div class="view-header animate-in">
      <h1>💼 Deal Pipeline</h1>
      <p class="subtitle">AI risk detection and recommended recovery actions</p>
    </div>

    <div class="pipeline-board animate-in stagger-2">
      ${stages.map((stage, i) => renderStageColumn(stage, classifiedDeals.filter(d => d.stage === stage), i)).join('')}
    </div>

    <!-- Deal Modal Container -->
    <div id="deal-modal-root"></div>
  `;

  // Attach card click handlers
  setTimeout(() => {
    classifiedDeals.forEach(deal => {
      const card = document.getElementById(`deal-card-${deal.id}`);
      if (card) {
        card.addEventListener('click', () => openDealModal(deal));
      }
    });
  }, 100);
}

function renderStageColumn(stage, stageDeals, index) {
  const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
  const formattedValue = '$' + (totalValue / 1000).toFixed(1) + 'K';

  return `
    <div class="pipeline-column stagger-${index + 1}">
      <div class="pipeline-column-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <h3>${stage}</h3>
          <span class="count">${stageDeals.length}</span>
        </div>
        <span style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">${formattedValue}</span>
      </div>
      <div class="pipeline-cards">
        ${stageDeals.map(d => renderDealCard(d)).join('')}
      </div>
    </div>
  `;
}

function renderDealCard(deal) {
  const formattedValue = '$' + (deal.value / 1000).toFixed(1) + 'K';
  return `
    <div class="deal-card" id="deal-card-${deal.id}">
      <div class="risk-indicator ${deal.riskAssessment.level}" title="Risk Level: ${deal.riskAssessment.level}"></div>
      <div class="deal-name">${deal.name}</div>
      <div class="deal-company">${deal.company}</div>
      <div class="deal-value">${formattedValue}</div>
      <div class="deal-meta">
        <span>${deal.daysInStage}d in stage</span>
        <span style="display:flex; align-items:center; gap:4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          ${deal.lastContact}
        </span>
      </div>
    </div>
  `;
}

function openDealModal(deal) {
  const root = document.getElementById('deal-modal-root');
  const formattedValue = '$' + deal.value.toLocaleString();

  const riskBadgeClass = `badge-${deal.riskAssessment.level === 'healthy' ? 'success' : deal.riskAssessment.level === 'at-risk' ? 'warning' : 'danger'}`;

  root.innerHTML = `
    <div style="position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); z-index:1000; display:flex; align-items:center; justify-content:center; animation:fadeIn 0.2s ease;">
      <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-xl); width:90%; max-width:800px; max-height:90vh; overflow-y:auto; position:relative; animation:fadeInUp 0.3s ease; box-shadow:var(--shadow-lg);">

        <button id="close-modal" style="position:absolute; top:20px; right:20px; background:none; border:none; color:var(--text-secondary); cursor:pointer; padding:4px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div style="padding:30px; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
              <h2 style="font-size:1.5rem; font-weight:800; letter-spacing:-0.02em;">${deal.company}</h2>
              <span class="badge ${riskBadgeClass}">${deal.riskAssessment.level.toUpperCase()}</span>
            </div>
            <p style="color:var(--text-secondary); font-size:0.95rem;">${deal.name} • ${deal.stage}</p>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-teal-light); line-height:1;">${formattedValue}</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">${deal.probability}% Probability</div>
          </div>
        </div>

        <div style="padding:30px;">
          <div class="grid-2">
            <div>
              <h3 style="font-size:0.9rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:16px;">AI Risk Analysis</h3>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:12px;">
                ${deal.riskAssessment.signals.length > 0 ?
                  deal.riskAssessment.signals.map(s => `
                    <li style="display:flex; gap:10px; font-size:0.88rem; align-items:flex-start;">
                      <span style="color:var(--color-warning); margin-top:2px;">⚠️</span>
                      <span style="line-height:1.4;">${s}</span>
                    </li>
                  `).join('')
                  : '<li style="color:var(--text-muted); font-size:0.88rem;">No risk signals detected. Deal is progressing well.</li>'
                }
              </ul>

              <h3 style="font-size:0.9rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:16px; margin-top:30px;">Stakeholders</h3>
              <div style="display:flex; flex-direction:column; gap:8px;">
                ${deal.stakeholders.map(s => `
                  <div style="padding:10px 14px; background:var(--bg-glass); border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.85rem; display:flex; align-items:center; gap:10px;">
                    <div style="width:24px; height:24px; border-radius:50%; background:var(--gradient-primary); display:flex; align-items:center; justify-content:center; font-size:0.6rem; font-weight:bold;">${s.charAt(0)}</div>
                    ${s}
                  </div>
                `).join('')}
              </div>
            </div>

            <div>
              <h3 style="font-size:0.9rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
                <div class="ai-pulse" style="background:var(--accent-violet);"></div>
                Recommended Actions
              </h3>
              <div style="display:flex; flex-direction:column; gap:12px;">
                ${deal.riskAssessment.recoveryActions.length > 0 ?
                  deal.riskAssessment.recoveryActions.map((a, i) => `
                    <div class="strategy-card stagger-${i+1}" style="animation:fadeInUp 0.4s ease forwards; opacity:0; transform:translateY(10px);">
                      <div class="strategy-icon" style="background:rgba(124,58,237,0.1); color:var(--accent-violet-light);">💡</div>
                      <div class="strategy-content">
                        <h4>${a.action}</h4>
                        <p>${a.detail}</p>
                        <div class="feedback-bar">
                          <button class="feedback-btn" onclick="this.classList.toggle('selected')">👍 Useful</button>
                        </div>
                      </div>
                    </div>
                  `).join('')
                  : `
                    <div class="strategy-card" style="border-color:var(--color-success); background:var(--color-success-bg);">
                      <div class="strategy-icon" style="background:transparent; color:var(--color-success);">✅</div>
                      <div class="strategy-content">
                        <h4 style="color:var(--color-success);">Maintain Momentum</h4>
                        <p>Deal is extremely healthy. Proceed with planned next step: <strong>${deal.nextStep}</strong></p>
                      </div>
                    </div>
                  `
                }
              </div>

              <div style="margin-top:24px; padding-top:24px; border-top:1px solid var(--border-color);">
                <button class="btn btn-primary" style="width:100%; justify-content:center; padding:12px;">Generate Follow-up Email based on AI Intel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('close-modal').addEventListener('click', () => {
    root.innerHTML = '';
  });
}
