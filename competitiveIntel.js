// ===== Competitive Intelligence Engine =====

import { competitors } from '../data/mockData.js';

export function detectCompetitors(text) {
  const found = [];
  const lower = (text || '').toLowerCase();
  competitors.forEach(comp => {
    if (lower.includes(comp.name.toLowerCase())) {
      found.push(comp);
    }
  });
  return found;
}

export function getBattlecard(competitorId) {
  return competitors.find(c => c.id === competitorId) || null;
}

export function getAllBattlecards() {
  return competitors;
}

export function getCompetitorMentionsInDeals(deals) {
  const mentions = [];
  deals.forEach(deal => {
    if (deal.competitorMentions && deal.competitorMentions.length > 0) {
      deal.competitorMentions.forEach(mention => {
        const detected = detectCompetitors(mention);
        detected.forEach(comp => {
          mentions.push({ deal, competitor: comp, context: mention });
        });
      });
    }
  });
  return mentions;
}

export function generateCounterMessage(competitor, objectionIndex = 0) {
  if (!competitor || !competitor.objections || !competitor.objections[objectionIndex]) return null;
  const obj = competitor.objections[objectionIndex];
  return {
    competitorName: competitor.name,
    objection: obj.objection,
    response: obj.response,
    supportingPoints: competitor.counterPositioning
  };
}

export function getWinLossAnalysis() {
  return competitors.map(c => ({
    name: c.name,
    winRate: c.winRate,
    lossRate: c.lossRate,
    avgDealSize: c.avgDealSize,
    category: c.category
  }));
}
