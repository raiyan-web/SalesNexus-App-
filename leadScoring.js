// ===== Lead Scoring Engine =====

const WEIGHTS = {
  companySize: 15,
  industryFit: 15,
  engagementRecency: 20,
  engagementSignal: 20,
  budgetFit: 15,
  sourceQuality: 10,
  techStackFit: 5
};

const IDEAL_INDUSTRIES = ['SaaS', 'Analytics', 'Business Intelligence', 'FinTech', 'Enterprise Software', 'Cloud Infrastructure'];
const IDEAL_TECH = ['Salesforce', 'HubSpot', 'Snowflake', 'AWS', 'GCP', 'Azure'];

function sizeScore(size) {
  const map = { '1000-5000': 10, '500-1000': 14, '200-500': 15, '100-200': 13, '50-200': 11, '50-100': 9, '10-50': 6 };
  return map[size] || 7;
}

function industryScore(industry) {
  return IDEAL_INDUSTRIES.includes(industry) ? 15 : 8;
}

function recencyScore(lastActive) {
  if (lastActive.includes('min') || lastActive.includes('hour')) return 20;
  if (lastActive.includes('1 day')) return 16;
  if (lastActive.includes('2 day') || lastActive.includes('3 day')) return 12;
  if (lastActive.includes('4 day') || lastActive.includes('5 day')) return 8;
  return 4;
}

function signalScore(signal) {
  const map = { high: 20, medium: 12, low: 5, negative: 2 };
  return map[signal] || 5;
}

function budgetScore(range) {
  if (range.includes('250K') || range.includes('100K-$250K')) return 15;
  if (range.includes('75K') || range.includes('50K-$100K')) return 13;
  if (range.includes('25K-$50K') || range.includes('25K-$75K')) return 10;
  if (range.includes('10K-$25K')) return 7;
  return 4;
}

function sourceScore(source) {
  const scores = { 'Referral': 10, 'Product Demo': 9, 'Free Trial': 9, 'Webinar': 8, 'Inbound': 8, 'LinkedIn': 7, 'Cold Outreach': 5, 'Conference': 7, 'Website': 6 };
  for (const [key, val] of Object.entries(scores)) {
    if (source.includes(key)) return val;
  }
  return 5;
}

function techScore(stack) {
  const matches = stack.filter(t => IDEAL_TECH.includes(t)).length;
  return Math.min(5, Math.round((matches / Math.max(stack.length, 1)) * 5 * 2));
}

export function scoreLead(lead) {
  const scores = {
    companySize: sizeScore(lead.size),
    industryFit: industryScore(lead.industry),
    engagementRecency: recencyScore(lead.lastActive),
    engagementSignal: signalScore(lead.engagementSignal),
    budgetFit: budgetScore(lead.budgetRange),
    sourceQuality: sourceScore(lead.source),
    techStackFit: techScore(lead.techStack || [])
  };

  const total = Object.values(scores).reduce((sum, v) => sum + v, 0);
  const reasons = [];

  if (scores.engagementSignal >= 16) reasons.push('Strong engagement signals detected');
  else if (scores.engagementSignal <= 5) reasons.push('Low engagement — needs nurturing');

  if (scores.engagementRecency >= 16) reasons.push('Recent activity indicates active interest');
  else if (scores.engagementRecency <= 8) reasons.push('No recent activity — may be losing interest');

  if (scores.industryFit >= 13) reasons.push('Industry fits ideal customer profile');
  if (scores.budgetFit >= 12) reasons.push('Budget aligns with product pricing');
  else if (scores.budgetFit <= 6) reasons.push('Budget may be too low for standard offering');

  if (scores.companySize >= 13) reasons.push('Company size in sweet spot for adoption');
  if (scores.sourceQuality >= 8) reasons.push('High-quality lead source');

  if (lead.engagementSignal === 'negative') reasons.push('⚠️ Negative signal detected — proceed with caution');
  if (lead.notes && lead.notes.toLowerCase().includes('competitor')) reasons.push('⚠️ Competitor mentioned — prepare battlecard');

  let tier;
  if (total >= 75) tier = 'High';
  else if (total >= 55) tier = 'Medium';
  else tier = 'Low';

  return { score: total, tier, reasons, breakdown: scores };
}

export function scoreAllLeads(leads) {
  return leads.map(lead => ({ ...lead, scoring: scoreLead(lead) })).sort((a, b) => b.scoring.score - a.scoring.score);
}
