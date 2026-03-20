// ===== Competitive Intelligence View =====
import { getAllBattlecards, getWinLossAnalysis } from '../engine/competitiveIntel.js';

export function renderCompetitive(container) {
  const battlecards = getAllBattlecards();
  const winLoss = getWinLossAnalysis();

  container.innerHTML = `
    <div class="view-header animate-in">
      <h1>🏆 Competitive Intelligence</h1>
      <p class="subtitle">AI-generated battlecards and real-time objection handling scripts</p>
    </div>

    <div class="grid-3 animate-in stagger-2" style="margin-bottom:30px;">
      ${winLoss.map((data, i) => `
        <div class="card stagger-${i + 1}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
            <div>
              <h3 style="font-size:1.1rem; font-weight:800;">${data.name}</h3>
              <div style="font-size:0.75rem; color:var(--text-muted);">${data.category}</div>
            </div>
            <div style="background:var(--bg-glass); padding:4px 10px; border-radius:var(--radius-sm); font-size:0.8rem; font-weight:700; border:1px solid var(--border-color);">
              ${data.winRate}% Win Rate
            </div>
          </div>
          <div style="height:8px; background:rgba(255,255,255,0.06); border-radius:4px; overflow:hidden; display:flex; margin-bottom:12px;">
            <div style="width:${data.winRate}%; background:var(--color-success); height:100%;"></div>
            <div style="width:${data.lossRate}%; background:var(--color-danger); height:100%;"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
            <span style="color:var(--text-secondary);">Avg Deal: <span style="font-weight:700; color:var(--text-primary);">${data.avgDealSize}</span></span>
            <span style="color:var(--text-secondary);">Loss Rate: <span style="font-weight:700; color:var(--text-primary);">${data.lossRate}%</span></span>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="card-glass animate-in stagger-4">
      <h3 style="padding:0 0 20px 0; border-bottom:1px solid var(--border-color); margin:0 0 24px 0; font-size:1.1rem; display:flex; align-items:center; gap:8px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        <span>Active Battlecards</span>
      </h3>

      <div class="grid-2">
        ${battlecards.map((comp, i) => `
          <div class="battlecard stagger-${i + 2}">
            <div class="battlecard-header">
              <div>
                <h3>${comp.name}</h3>
                <span class="badge badge-medium" style="margin-top:4px;">${comp.marketShare} Market Share</span>
              </div>
              <div style="text-align:right;">
                <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:2px;">Target</div>
                <div style="font-size:0.85rem; font-weight:600;">${comp.targetSegment}</div>
              </div>
            </div>

            <div class="battlecard-body">
              <div class="grid-2" style="margin-bottom:24px;">
                <div class="battlecard-section strengths">
                  <h4>Key Strengths</h4>
                  <ul>${comp.strengths.slice(0, 3).map(s => `<li>${s}</li>`).join('')}</ul>
                </div>
                <div class="battlecard-section weaknesses">
                  <h4>Vulnerabilities</h4>
                  <ul>${comp.weaknesses.slice(0, 3).map(w => `<li>${w}</li>`).join('')}</ul>
                </div>
              </div>

              <div class="battlecard-section counters">
                <h4>Core Counter-Positioning</h4>
                <ul>${comp.counterPositioning.slice(0, 2).map(c => `<li>${c}</li>`).join('')}</ul>
              </div>

              ${comp.objections.length > 0 ? `
                <div style="margin-top:24px; padding-top:24px; border-top:1px solid var(--border-color);">
                  <h4 style="font-size:0.78rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); margin-bottom:12px; display:flex; align-items:center; gap:8px;">
                    <div class="ai-pulse" style="background:var(--accent-teal);"></div>
                    AI Script: Overcoming Objections
                  </h4>
                  <div class="objection-card">
                    <div class="objection-label">Prospect Says:</div>
                    <div class="objection-text">"${comp.objections[0].objection}"</div>
                    <div class="response-label">SalesNexus AI Script:</div>
                    <div class="response-text">${comp.objections[0].response}</div>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
