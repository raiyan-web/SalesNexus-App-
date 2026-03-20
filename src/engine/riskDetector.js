// ===== Deal Risk Detector =====

export function assessDealRisk(deal) {
  let riskScore = 0;
  const signals = [];
  const recoveryActions = [];

  // Factor 1: Days since last contact
  const daysSince = parseDaysSince(deal.lastContact);
  if (daysSince >= 14) { riskScore += 30; signals.push('No contact in 14+ days — deal may be going cold'); }
  else if (daysSince >= 7) { riskScore += 15; signals.push(`Last contact was ${deal.lastContact} — follow up needed`); }
  else if (daysSince >= 5) { riskScore += 8; signals.push('Contact gap widening — maintain momentum'); }

  // Factor 2: Sentiment
  if (deal.sentiment === 'negative') { riskScore += 25; signals.push('Negative sentiment detected in recent communications'); }
  else if (deal.sentiment === 'neutral') { riskScore += 10; signals.push('Neutral sentiment — no strong buying signals'); }

  // Factor 3: Competitor mentions
  if (deal.competitorMentions.length > 0) {
    riskScore += 15 * Math.min(deal.competitorMentions.length, 2);
    deal.competitorMentions.forEach(m => signals.push(`Competitor: ${m}`));
  }

  // Factor 4: Stage velocity
  if (deal.daysInStage > 20) { riskScore += 20; signals.push(`Stalled — ${deal.daysInStage} days in ${deal.stage} stage`); }
  else if (deal.daysInStage > 14) { riskScore += 10; signals.push(`${deal.daysInStage} days in ${deal.stage} — nearing stall threshold`); }

  // Factor 5: Stakeholder changes
  const stakeholderIssue = deal.activityTimeline?.find(a => a.action.toLowerCase().includes('stakeholder change'));
  if (stakeholderIssue) { riskScore += 15; signals.push('Stakeholder change detected — relationship at risk'); }

  // Factor 6: Single stakeholder
  if (deal.stakeholders.length <= 1) { riskScore += 10; signals.push('Single stakeholder — no multi-threading'); }

  // Classify risk level
  let level;
  if (riskScore >= 50) level = 'critical';
  else if (riskScore >= 25) level = 'at-risk';
  else level = 'healthy';

  // Generate recovery actions
  if (level === 'critical') {
    recoveryActions.push({
      action: 'Executive Escalation',
      detail: `Schedule an executive-to-executive call within 48 hours. Frame it as: "Our leadership team wants to ensure we're aligned with ${deal.company}'s strategic priorities."`,
      priority: 'urgent'
    });
    if (deal.competitorMentions.length > 0) {
      recoveryActions.push({
        action: 'Competitive Counter-Offensive',
        detail: `Prepare a custom ROI analysis showing total cost of ownership vs. competitors. Include 2-3 customer references in ${deal.company}'s industry.`,
        priority: 'urgent'
      });
    }
    recoveryActions.push({
      action: 'Value Reinforcement',
      detail: `Send a personalized business case document highlighting specific KPIs: "${deal.company} can expect X% improvement in pipeline visibility and Y% increase in forecast accuracy."`,
      priority: 'high'
    });
  } else if (level === 'at-risk') {
    recoveryActions.push({
      action: 'Re-engagement Touchpoint',
      detail: `Send a relevant case study from the ${deal.company} industry. Follow up with: "I thought this might resonate with the challenges we discussed around [specific pain point]."`,
      priority: 'high'
    });
    if (deal.stakeholders.length <= 1) {
      recoveryActions.push({
        action: 'Multi-Thread the Deal',
        detail: `Ask ${deal.contactName} to introduce other stakeholders: "To build the strongest possible business case, it would be great to include [finance/technical] perspectives."`,
        priority: 'medium'
      });
    }
    recoveryActions.push({
      action: 'Accelerate Timeline',
      detail: `Create urgency with a time-limited offer or early adopter benefit: "We have implementation slots opening in Q2 that could align with your timeline."`,
      priority: 'medium'
    });
  }

  return { riskScore, level, signals, recoveryActions };
}

function parseDaysSince(str) {
  if (str.includes('hour') || str.includes('min')) return 0;
  const match = str.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export function classifyAllDeals(deals) {
  return deals.map(deal => ({ ...deal, riskAssessment: assessDealRisk(deal) }));
}
