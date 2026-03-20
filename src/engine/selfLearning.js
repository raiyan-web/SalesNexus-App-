// ===== Self-Learning & Adaptation Engine =====

const STORAGE_KEY = 'salesnexus_learning';

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

function saveHistory(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function recordFeedback(entityId, type, outcome) {
  // type: 'email', 'lead_score', 'deal_action', 'retention'
  // outcome: 'positive', 'neutral', 'negative'
  const history = getHistory();
  if (!history[type]) history[type] = [];
  history[type].push({
    entityId,
    outcome,
    timestamp: Date.now()
  });
  saveHistory(history);
}

export function getAdaptedScoreBoost(leadId) {
  const history = getHistory();
  const feedbacks = (history.lead_score || []).filter(f => f.entityId === leadId);
  if (feedbacks.length === 0) return 0;
  const positive = feedbacks.filter(f => f.outcome === 'positive').length;
  const negative = feedbacks.filter(f => f.outcome === 'negative').length;
  return (positive - negative) * 3;
}

export function getEmailTemplatePerformance() {
  const history = getHistory();
  const emailFeedback = history.email || [];
  const types = ['initial', 'followUp', 'positiveReply', 'negativeReply'];
  return types.map(type => {
    const items = emailFeedback.filter(f => f.entityId.startsWith(type));
    const positive = items.filter(f => f.outcome === 'positive').length;
    const total = items.length || 1;
    return { type, successRate: Math.round((positive / total) * 100), totalSent: items.length };
  });
}

export function getEngagementTrend() {
  const history = getHistory();
  const all = Object.values(history).flat();
  const last7d = all.filter(f => Date.now() - f.timestamp < 7 * 24 * 60 * 60 * 1000);
  const positive = last7d.filter(f => f.outcome === 'positive').length;
  const total = last7d.length || 1;
  return {
    totalInteractions: all.length,
    last7Days: last7d.length,
    positiveRate: Math.round((positive / total) * 100),
    improving: positive > last7d.length * 0.5
  };
}

export function getLearningStats() {
  const history = getHistory();
  const all = Object.values(history).flat();
  return {
    totalFeedback: all.length,
    categories: Object.keys(history).length,
    lastUpdated: all.length > 0 ? new Date(Math.max(...all.map(f => f.timestamp))).toLocaleDateString() : 'N/A',
    insights: generateLearningInsights(history)
  };
}

function generateLearningInsights(history) {
  const insights = [];
  const emailData = history.email || [];
  if (emailData.length >= 3) {
    const recentPositive = emailData.slice(-5).filter(f => f.outcome === 'positive').length;
    if (recentPositive >= 3) insights.push('📈 Email engagement improving — current templates performing well');
    else insights.push('📉 Consider A/B testing new email subject lines');
  }
  const leadData = history.lead_score || [];
  if (leadData.length >= 2) {
    insights.push(`🎯 ${leadData.length} lead scores calibrated from feedback`);
  }
  if (insights.length === 0) {
    insights.push('🔄 Provide feedback on recommendations to improve AI accuracy');
    insights.push('💡 Click thumbs up/down on emails, scores, and actions to train the system');
  }
  return insights;
}
