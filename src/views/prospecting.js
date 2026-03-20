// ===== Prospecting View =====
import { leads } from '../data/mockData.js';
import { scoreAllLeads } from '../engine/leadScoring.js';
import { generateEmail, getRecommendedEmailType } from '../engine/emailGenerator.js';
import { recordFeedback } from '../engine/selfLearning.js';

export function renderProspecting(container) {
  const scoredLeads = scoreAllLeads(leads);

  container.innerHTML = `
    <div class="view-header animate-in">
      <h1>🧲 Prospecting Intelligence</h1>
      <p class="subtitle">AI-scored leads with personalized outreach generation</p>
    </div>

    <div class="card animate-in stagger-1" style="padding:0; overflow:hidden;">
      <table class="data-table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Company</th>
            <th>Recent Activity</th>
            <th>AI Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="leads-table-body">
          ${scoredLeads.map((lead, i) => renderLeadRow(lead, i)).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Attach event listeners for expand/collapse and email gen
  setTimeout(() => {
    scoredLeads.forEach(lead => {
      const row = document.getElementById(`lead-row-${lead.id}`);
      const expandBtn = document.getElementById(`expand-${lead.id}`);

      if (row && expandBtn) {
        row.addEventListener('click', (e) => {
          if (e.target.closest('button')) return; // Ignore button clicks
          toggleLeadDetails(lead.id, lead);
        });
        expandBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleLeadDetails(lead.id, lead);
        });
      }

      const genBtn = document.getElementById(`gen-email-${lead.id}`);
      if (genBtn) {
        genBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          generateAndShowEmail(lead);
        });
      }
    });
  }, 100);
}

function renderLeadRow(lead, index) {
  const scoreColor = lead.scoring.tier === 'High' ? 'var(--color-success)' :
                     lead.scoring.tier === 'Medium' ? 'var(--color-warning)' : 'var(--color-danger)';
  const scorePercent = lead.scoring.score + '%';

  return `
    <tr id="lead-row-${lead.id}" class="stagger-${(index % 6) + 1}">
      <td>
        <div style="font-weight:600; font-size:0.95rem;">${lead.name}</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${lead.title}</div>
      </td>
      <td>
        <div>${lead.company}</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${lead.industry}</div>
      </td>
      <td>
        <div style="max-width:250px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
          ${lead.recentActivity}
        </div>
        <div style="font-size:0.72rem; color:var(--text-muted);">
          ${lead.lastActive} • signal: <span style="color:${lead.engagementSignal === 'high' ? 'var(--color-success)' : lead.engagementSignal === 'negative' ? 'var(--color-danger)' : 'var(--text-secondary)'}">${lead.engagementSignal}</span>
        </div>
      </td>
      <td>
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="badge badge-${lead.scoring.tier.toLowerCase()}">${lead.scoring.score}</span>
          <div class="score-bar">
            <div class="score-bar-fill" style="width:${scorePercent}; background:${scoreColor}"></div>
          </div>
        </div>
      </td>
      <td>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-outline btn-sm" id="expand-${lead.id}">Details</button>
          <button class="btn btn-primary btn-sm" id="gen-email-${lead.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Draft
          </button>
        </div>
      </td>
    </tr>
    <tr style="background:transparent; cursor:default;">
      <td colspan="5" style="padding:0; border:none;">
        <div class="detail-panel" id="detail-${lead.id}">
          <div style="padding:20px; border-bottom:1px solid var(--border-color); background:rgba(0,0,0,0.2);">
            <div class="grid-2">
              <div>
                <h4 style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:12px;">AI Scoring Breakdown</h4>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.85rem;">
                  ${lead.scoring.reasons.map(r => `
                    <li style="display:flex; gap:8px;">
                      <span style="color:var(--accent-teal)">✓</span> ${r}
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div id="email-container-${lead.id}" style="display:none;">
                <!-- Generated email injected here -->
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  `;
}

function toggleLeadDetails(leadId, lead) {
  const panel = document.getElementById(`detail-${leadId}`);
  if (panel.classList.contains('open')) {
    panel.classList.remove('open');
  } else {
    // Close others
    document.querySelectorAll('.detail-panel.open').forEach(p => {
      if (p.id !== `detail-${leadId}`) p.classList.remove('open');
    });
    panel.classList.add('open');
  }
}

function generateAndShowEmail(lead) {
  const panel = document.getElementById(`detail-${lead.id}`);
  const container = document.getElementById(`email-container-${lead.id}`);

  // Open panel if closed
  if (!panel.classList.contains('open')) {
    panel.classList.add('open');
  }

  // Show loading skeleton
  container.style.display = 'block';
  container.innerHTML = `
    <h4 style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
      <div class="ai-pulse" style="background:var(--accent-violet);"></div>
      AI Generating Personalized Outreach...
    </h4>
    <div class="email-preview skeleton" style="height:200px; border:none;"></div>
  `;

  // Simulate API delay
  setTimeout(() => {
    const recommendedType = getRecommendedEmailType(lead);
    const email = generateEmail(lead, recommendedType);

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h4 style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Generated Draft</h4>
        <div class="tabs" style="margin:0; padding:2px;">
          ${['initial', 'followUp', 'positiveReply'].map(t => `
            <button class="tab-btn ${t === email.type ? 'active' : ''}" style="padding:4px 8px; font-size:0.7rem;"
              onclick="window.regenerateEmail('${lead.id}', '${t}')">${t}</button>
          `).join('')}
        </div>
      </div>
      <div class="email-preview animate-in">
        <button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('email-body-${lead.id}').innerText)">Copy</button>
        <div class="email-header">
          <div class="email-field"><span class="label">To:</span> ${email.to}</div>
          <div class="email-field"><span class="label">From:</span> ${email.from}</div>
          <div class="email-field"><span class="label">Subject:</span> <span style="font-weight:600; color:var(--text-primary);">${email.subject}</span></div>
        </div>
        <div id="email-body-${lead.id}">${email.body}</div>

        <div class="feedback-bar" style="margin-top:16px; border-top:1px solid var(--border-color); padding-top:12px;">
          <span style="font-size:0.75rem; color:var(--text-muted); margin-right:auto;">Was this draft helpful?</span>
          <button class="feedback-btn" onclick="this.classList.toggle('selected'); window.recordFeedback('email_${email.type}', 'email', 'positive')">👍 Yes</button>
          <button class="feedback-btn" onclick="this.classList.toggle('selected'); window.recordFeedback('email_${email.type}', 'email', 'negative')">👎 No</button>
        </div>
      </div>
    `;
  }, 800);
}

// Global hook for tab regeneration
window.regenerateEmail = (leadId, type) => {
  const lead = leads.find(l => l.id === leadId);
  if (lead) {
    const email = generateEmail(lead, type);
    const container = document.getElementById(`email-container-${leadId}`);

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h4 style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Generated Draft</h4>
        <div class="tabs" style="margin:0; padding:2px;">
          ${['initial', 'followUp', 'positiveReply'].map(t => `
            <button class="tab-btn ${t === type ? 'active' : ''}" style="padding:4px 8px; font-size:0.7rem;"
              onclick="window.regenerateEmail('${lead.id}', '${t}')">${t}</button>
          `).join('')}
        </div>
      </div>
      <div class="email-preview animate-in">
        <button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('email-body-${lead.id}').innerText)">Copy</button>
        <div class="email-header">
          <div class="email-field"><span class="label">To:</span> ${email.to}</div>
          <div class="email-field"><span class="label">From:</span> ${email.from}</div>
          <div class="email-field"><span class="label">Subject:</span> <span style="font-weight:600; color:var(--text-primary);">${email.subject}</span></div>
        </div>
        <div id="email-body-${lead.id}">${email.body}</div>

        <div class="feedback-bar" style="margin-top:16px; border-top:1px solid var(--border-color); padding-top:12px;">
          <span style="font-size:0.75rem; color:var(--text-muted); margin-right:auto;">Was this draft helpful?</span>
          <button class="feedback-btn" onclick="this.classList.toggle('selected'); window.recordFeedback('email_${type}', 'email', 'positive')">👍 Yes</button>
          <button class="feedback-btn" onclick="this.classList.toggle('selected'); window.recordFeedback('email_${type}', 'email', 'negative')">👎 No</button>
        </div>
      </div>
    `;
  }
};
window.recordFeedback = recordFeedback;
