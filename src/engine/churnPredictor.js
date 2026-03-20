// ===== Churn Prediction Engine =====

export function predictChurn(customer) {
  let churnScore = 0;
  const factors = [];
  const strategies = [];

  // Factor 1: Usage trend
  const usageDelta = customer.usage.history[customer.usage.history.length - 1] - customer.usage.history[0];
  if (customer.usage.trend === 'declining') {
    const declineRate = Math.abs(usageDelta);
    churnScore += Math.min(30, declineRate * 0.8);
    factors.push(`Usage declined ${Math.abs(usageDelta)}% over 6 months`);
  } else if (customer.usage.trend === 'stable') {
    churnScore += 5;
    factors.push('Usage is stable — no growth signals');
  }

  // Factor 2: Support tickets
  if (customer.supportTickets.severity === 'critical') { churnScore += 20; factors.push(`${customer.supportTickets.open} open tickets with critical severity`); }
  else if (customer.supportTickets.severity === 'high') { churnScore += 15; factors.push(`${customer.supportTickets.open} open tickets with high severity`); }
  else if (customer.supportTickets.total30d > 5) { churnScore += 10; factors.push(`${customer.supportTickets.total30d} support tickets in last 30 days`); }
  else if (customer.supportTickets.severity === 'medium') { churnScore += 5; factors.push('Moderate support activity'); }

  // Factor 3: NPS trend
  const npsStart = customer.npsHistory[0];
  const npsEnd = customer.npsHistory[customer.npsHistory.length - 1];
  const npsDelta = npsEnd - npsStart;
  if (npsDelta <= -3) { churnScore += 20; factors.push(`NPS dropped from ${npsStart} to ${npsEnd} — satisfaction declining`); }
  else if (npsDelta <= -1) { churnScore += 10; factors.push(`NPS slightly down (${npsStart} → ${npsEnd})`); }
  else if (npsEnd <= 5) { churnScore += 15; factors.push(`Low NPS score of ${npsEnd}/10`); }

  // Factor 4: Contract proximity
  if (customer.monthsRemaining <= 1) { churnScore += 15; factors.push(`Renewal in ${customer.monthsRemaining} month — critical window`); }
  else if (customer.monthsRemaining <= 3) { churnScore += 8; factors.push(`Renewal in ${customer.monthsRemaining} months`); }

  // Factor 5: Feature adoption
  const adoptionRate = (customer.features.adopted / customer.features.total) * 100;
  if (adoptionRate < 40) { churnScore += 15; factors.push(`Only ${Math.round(adoptionRate)}% feature adoption — low product stickiness`); }
  else if (adoptionRate < 60) { churnScore += 8; factors.push(`${Math.round(adoptionRate)}% feature adoption — room for improvement`); }

  // Factor 6: Sentiment
  if (customer.sentimentSignals === 'negative') { churnScore += 15; factors.push('Negative sentiment detected in recent interactions'); }
  else if (customer.sentimentSignals === 'neutral') { churnScore += 5; factors.push('Neutral sentiment — no strong advocacy'); }

  // Cap at 95%
  churnScore = Math.min(95, churnScore);

  // Generate retention strategies
  if (churnScore >= 60) {
    strategies.push({ icon: '🚨', title: 'Executive Intervention', desc: `Schedule urgent meeting with ${customer.contactName}. Acknowledge challenges and present a 30-day improvement plan with dedicated support.`, urgency: 'critical' });
    strategies.push({ icon: '🎁', title: 'Retention Offer', desc: `Offer 20% discount on renewal + 3 months of premium support. Estimated retention value: $${Math.round(customer.contractValue * 0.8).toLocaleString()}/year.`, urgency: 'high' });
    if (customer.features.adopted < customer.features.total * 0.6) {
      strategies.push({ icon: '📚', title: 'Guided Onboarding Sprint', desc: `Launch a 2-week adoption sprint covering ${customer.features.total - customer.features.adopted} unused features. Assign a dedicated CSM.`, urgency: 'high' });
    }
  } else if (churnScore >= 35) {
    strategies.push({ icon: '📞', title: 'Proactive Check-in', desc: `Schedule a health check call with ${customer.contactName}. Review goals, gather feedback, and realign on success metrics.`, urgency: 'medium' });
    strategies.push({ icon: '🎯', title: 'Value Workshop', desc: `Organize a personalized workshop showing ROI achieved so far and unlocking advanced features like ${getUnusedFeatures(customer)}.`, urgency: 'medium' });
    if (customer.supportTickets.open > 2) {
      strategies.push({ icon: '🛠️', title: 'Support Escalation', desc: `Fast-track ${customer.supportTickets.open} open tickets to resolution. Assign senior engineer for priority handling.`, urgency: 'high' });
    }
  } else {
    strategies.push({ icon: '🌟', title: 'Advocacy Program', desc: `Invite ${customer.contactName} to join customer advisory board or case study program. Strengthen relationship and gather testimonials.`, urgency: 'low' });
    strategies.push({ icon: '📈', title: 'Expansion Opportunity', desc: `Customer is healthy — explore upsell for additional seats or premium features. Estimated expansion: $${Math.round(customer.contractValue * 0.3).toLocaleString()}.`, urgency: 'low' });
  }

  let risk;
  if (churnScore >= 60) risk = 'High';
  else if (churnScore >= 35) risk = 'Medium';
  else risk = 'Low';

  return { churnProbability: churnScore, risk, factors, strategies };
}

function getUnusedFeatures(customer) {
  const allFeatures = ['AI Forecasting', 'Custom Dashboards', 'API Integrations', 'Team Analytics', 'Automated Workflows'];
  return allFeatures.slice(0, customer.features.total - customer.features.adopted).slice(0, 2).join(' and ');
}

export function predictAllChurn(customers) {
  return customers.map(c => ({ ...c, churnAnalysis: predictChurn(c) }));
}
