// ===== SalesNexus Mock CRM Data =====

export const leads = [
  {
    id: 'L001', name: 'Sarah Chen', title: 'VP of Engineering', company: 'TechFlow Inc.',
    industry: 'SaaS', size: '200-500', revenue: '$45M', website: 'techflow.io',
    email: 'sarah.chen@techflow.io', phone: '+1 (415) 555-0142',
    recentActivity: 'Downloaded whitepaper on AI automation', lastActive: '2 hours ago',
    engagementSignal: 'high', painPoints: ['manual data entry', 'slow reporting', 'team scaling'],
    source: 'Webinar Attendee', linkedinConnections: 342, techStack: ['Salesforce', 'Slack', 'AWS'],
    budgetRange: '$50K-$100K', notes: 'Mentioned competitor product XyloSoft in webinar Q&A'
  },
  {
    id: 'L002', name: 'Marcus Johnson', title: 'Director of Sales', company: 'GrowthMetrics',
    industry: 'Analytics', size: '50-200', revenue: '$12M', website: 'growthmetrics.com',
    email: 'marcus.j@growthmetrics.com', phone: '+1 (212) 555-0198',
    recentActivity: 'Visited pricing page 3x this week', lastActive: '45 min ago',
    engagementSignal: 'high', painPoints: ['pipeline visibility', 'forecast accuracy', 'CRM adoption'],
    source: 'Inbound - Pricing Page', linkedinConnections: 567, techStack: ['HubSpot', 'Zoom', 'GCP'],
    budgetRange: '$25K-$50K', notes: 'Team of 15 sales reps, currently using spreadsheets for forecasting'
  },
  {
    id: 'L003', name: 'Amanda Rivera', title: 'COO', company: 'CloudBridge Solutions',
    industry: 'Cloud Infrastructure', size: '500-1000', revenue: '$120M', website: 'cloudbridge.io',
    email: 'arivera@cloudbridge.io', phone: '+1 (650) 555-0234',
    recentActivity: 'Opened 3 emails, clicked on case study', lastActive: '1 day ago',
    engagementSignal: 'medium', painPoints: ['customer churn', 'onboarding complexity', 'support costs'],
    source: 'Referral - Partner', linkedinConnections: 891, techStack: ['Zendesk', 'Jira', 'Azure'],
    budgetRange: '$100K-$250K', notes: 'Expanding APAC operations, needs multi-region support'
  },
  {
    id: 'L004', name: 'David Kim', title: 'Head of RevOps', company: 'Nextera Digital',
    industry: 'Digital Marketing', size: '100-200', revenue: '$28M', website: 'nexteradigital.com',
    email: 'dkim@nexteradigital.com', phone: '+1 (310) 555-0167',
    recentActivity: 'Attended product demo last week', lastActive: '3 days ago',
    engagementSignal: 'medium', painPoints: ['data silos', 'attribution modeling', 'ROI tracking'],
    source: 'Product Demo', linkedinConnections: 445, techStack: ['Marketo', 'Snowflake', 'Tableau'],
    budgetRange: '$50K-$100K', notes: 'Currently evaluating 3 vendors including us'
  },
  {
    id: 'L005', name: 'Lisa Thompson', title: 'CEO', company: 'MicroServ Technologies',
    industry: 'IT Services', size: '10-50', revenue: '$3M', website: 'microserv.tech',
    email: 'lisa@microserv.tech', phone: '+1 (503) 555-0289',
    recentActivity: 'Signed up for free trial', lastActive: '6 hours ago',
    engagementSignal: 'high', painPoints: ['lead generation', 'client retention', 'manual processes'],
    source: 'Free Trial', linkedinConnections: 156, techStack: ['Google Workspace', 'Trello'],
    budgetRange: '$10K-$25K', notes: 'Small but growing fast, 40% YoY revenue growth'
  },
  {
    id: 'L006', name: 'Robert Patel', title: 'CRO', company: 'ScaleForce Corp',
    industry: 'Enterprise Software', size: '1000-5000', revenue: '$340M', website: 'scaleforce.com',
    email: 'rpatel@scaleforce.com', phone: '+1 (408) 555-0345',
    recentActivity: 'No activity in 2 weeks', lastActive: '14 days ago',
    engagementSignal: 'low', painPoints: ['legacy system migration', 'global team coordination'],
    source: 'Conference - SaaStr', linkedinConnections: 1200, techStack: ['SAP', 'Oracle', 'ServiceNow'],
    budgetRange: '$250K+', notes: 'Large potential deal but slow decision-making process'
  },
  {
    id: 'L007', name: 'Jennifer Walsh', title: 'VP Sales', company: 'DataPulse Analytics',
    industry: 'Business Intelligence', size: '200-500', revenue: '$55M', website: 'datapulse.ai',
    email: 'jwalsh@datapulse.ai', phone: '+1 (617) 555-0412',
    recentActivity: 'Replied positively to outreach email', lastActive: '5 hours ago',
    engagementSignal: 'high', painPoints: ['competitive pricing pressure', 'sales cycle length', 'win rates'],
    source: 'Cold Outreach', linkedinConnections: 678, techStack: ['Salesforce', 'Looker', 'dbt'],
    budgetRange: '$75K-$150K', notes: 'Interested in Q2 implementation, budget approved'
  },
  {
    id: 'L008', name: 'Carlos Mendez', title: 'Director of IT', company: 'Retail Dynamics',
    industry: 'Retail Tech', size: '500-1000', revenue: '$85M', website: 'retaildyn.com',
    email: 'cmendez@retaildyn.com', phone: '+1 (305) 555-0178',
    recentActivity: 'Unsubscribed from newsletter', lastActive: '7 days ago',
    engagementSignal: 'negative', painPoints: ['omnichannel integration', 'inventory management'],
    source: 'Website Form', linkedinConnections: 334, techStack: ['Shopify Plus', 'NetSuite'],
    budgetRange: '$50K-$100K', notes: 'Previously expressed budget concerns, mentioned RivalCRM as cheaper option'
  },
  {
    id: 'L009', name: 'Emily Nakamura', title: 'Head of Growth', company: 'FinEdge Partners',
    industry: 'FinTech', size: '100-200', revenue: '$35M', website: 'finedge.io',
    email: 'enakamura@finedge.io', phone: '+1 (212) 555-0567',
    recentActivity: 'Watched 2 product videos, bookmarked features page', lastActive: '1 day ago',
    engagementSignal: 'medium', painPoints: ['compliance tracking', 'customer acquisition cost', 'churn'],
    source: 'LinkedIn Ad', linkedinConnections: 523, techStack: ['Stripe', 'Plaid', 'Intercom'],
    budgetRange: '$25K-$75K', notes: 'Regulated industry, needs SOC2 compliance proof'
  },
  {
    id: 'L010', name: 'Thomas Wright', title: 'Sales Manager', company: 'AgriSmart Solutions',
    industry: 'AgriTech', size: '50-100', revenue: '$8M', website: 'agrismart.co',
    email: 'twright@agrismart.co', phone: '+1 (402) 555-0634',
    recentActivity: 'Opened cold email but did not reply', lastActive: '4 days ago',
    engagementSignal: 'low', painPoints: ['seasonal sales cycles', 'dealer network management'],
    source: 'Cold Outreach', linkedinConnections: 189, techStack: ['Google Sheets', 'Mailchimp'],
    budgetRange: '$5K-$15K', notes: 'Very small budget, may not be ideal customer profile'
  }
];

export const deals = [
  {
    id: 'D001', name: 'Enterprise AI Platform', company: 'TechFlow Inc.', contactName: 'Sarah Chen',
    value: 85000, stage: 'Negotiation', probability: 75,
    daysInStage: 8, lastContact: '2 days ago', nextStep: 'Contract review call',
    sentiment: 'positive', stakeholders: ['Sarah Chen (VP Eng)', 'Mike Ross (CFO)', 'Amy Liu (CTO)'],
    competitorMentions: ['XyloSoft mentioned in initial call'],
    activityTimeline: [
      { date: 'Mar 18', action: 'Contract draft sent', type: 'email' },
      { date: 'Mar 15', action: 'Technical demo completed', type: 'meeting' },
      { date: 'Mar 10', action: 'Discovery call', type: 'call' }
    ],
    riskLevel: 'healthy'
  },
  {
    id: 'D002', name: 'Sales Analytics Suite', company: 'GrowthMetrics', contactName: 'Marcus Johnson',
    value: 42000, stage: 'Proposal', probability: 60,
    daysInStage: 12, lastContact: '1 day ago', nextStep: 'Proposal presentation',
    sentiment: 'positive', stakeholders: ['Marcus Johnson (Dir Sales)', 'Rachel Kim (VP Ops)'],
    competitorMentions: [],
    activityTimeline: [
      { date: 'Mar 19', action: 'Proposal customized', type: 'document' },
      { date: 'Mar 14', action: 'Requirements gathered', type: 'meeting' },
      { date: 'Mar 8', action: 'Initial outreach', type: 'email' }
    ],
    riskLevel: 'healthy'
  },
  {
    id: 'D003', name: 'Cloud Migration Package', company: 'CloudBridge Solutions', contactName: 'Amanda Rivera',
    value: 195000, stage: 'Discovery', probability: 35,
    daysInStage: 5, lastContact: '1 day ago', nextStep: 'Technical assessment',
    sentiment: 'neutral', stakeholders: ['Amanda Rivera (COO)', 'James Park (CTO)', 'VP Finance TBD'],
    competitorMentions: ['Evaluating RivalCRM and PipelineMax'],
    activityTimeline: [
      { date: 'Mar 19', action: 'Follow-up email sent', type: 'email' },
      { date: 'Mar 17', action: 'Initial discovery call', type: 'call' },
      { date: 'Mar 15', action: 'Inbound referral received', type: 'referral' }
    ],
    riskLevel: 'at-risk'
  },
  {
    id: 'D004', name: 'RevOps Automation', company: 'Nextera Digital', contactName: 'David Kim',
    value: 67000, stage: 'Proposal', probability: 45,
    daysInStage: 18, lastContact: '5 days ago', nextStep: 'Follow-up on proposal',
    sentiment: 'neutral', stakeholders: ['David Kim (Head RevOps)'],
    competitorMentions: ['Asked about PipelineMax pricing'],
    activityTimeline: [
      { date: 'Mar 15', action: 'Proposal sent', type: 'email' },
      { date: 'Mar 10', action: 'Demo completed', type: 'meeting' },
      { date: 'Mar 2', action: 'Qualification call', type: 'call' }
    ],
    riskLevel: 'at-risk'
  },
  {
    id: 'D005', name: 'Growth Stack License', company: 'MicroServ Technologies', contactName: 'Lisa Thompson',
    value: 18000, stage: 'Discovery', probability: 50,
    daysInStage: 3, lastContact: '6 hours ago', nextStep: 'Product walkthrough',
    sentiment: 'positive', stakeholders: ['Lisa Thompson (CEO)'],
    competitorMentions: [],
    activityTimeline: [
      { date: 'Mar 20', action: 'Free trial started', type: 'product' },
      { date: 'Mar 19', action: 'Intro call completed', type: 'call' }
    ],
    riskLevel: 'healthy'
  },
  {
    id: 'D006', name: 'Enterprise Transformation', company: 'ScaleForce Corp', contactName: 'Robert Patel',
    value: 350000, stage: 'Negotiation', probability: 25,
    daysInStage: 30, lastContact: '14 days ago', nextStep: 'Re-engage stakeholders',
    sentiment: 'negative', stakeholders: ['Robert Patel (CRO)', 'Legal Team', 'Procurement'],
    competitorMentions: ['Board considering RivalCRM enterprise tier', 'XyloSoft demo scheduled'],
    activityTimeline: [
      { date: 'Mar 6', action: 'Last email - no response', type: 'email' },
      { date: 'Feb 25', action: 'Stakeholder change - new CFO', type: 'alert' },
      { date: 'Feb 18', action: 'Contract negotiation stalled', type: 'meeting' }
    ],
    riskLevel: 'critical'
  },
  {
    id: 'D007', name: 'BI Integration Suite', company: 'DataPulse Analytics', contactName: 'Jennifer Walsh',
    value: 112000, stage: 'Proposal', probability: 70,
    daysInStage: 6, lastContact: '5 hours ago', nextStep: 'Finalize pricing',
    sentiment: 'positive', stakeholders: ['Jennifer Walsh (VP Sales)', 'Tom Hardy (Dir Ops)'],
    competitorMentions: [],
    activityTimeline: [
      { date: 'Mar 20', action: 'Positive reply to proposal', type: 'email' },
      { date: 'Mar 17', action: 'Custom demo delivered', type: 'meeting' },
      { date: 'Mar 14', action: 'Initial outreach', type: 'email' }
    ],
    riskLevel: 'healthy'
  },
  {
    id: 'D008', name: 'Retail Analytics Platform', company: 'Retail Dynamics', contactName: 'Carlos Mendez',
    value: 73000, stage: 'Discovery', probability: 15,
    daysInStage: 21, lastContact: '7 days ago', nextStep: 'Re-qualification needed',
    sentiment: 'negative', stakeholders: ['Carlos Mendez (Dir IT)'],
    competitorMentions: ['RivalCRM chosen for pilot program'],
    activityTimeline: [
      { date: 'Mar 13', action: 'Newsletter unsubscribe', type: 'alert' },
      { date: 'Mar 8', action: 'Budget concerns raised', type: 'call' },
      { date: 'Feb 27', action: 'Initial demo', type: 'meeting' }
    ],
    riskLevel: 'critical'
  }
];

export const customers = [
  {
    id: 'C001', name: 'Vertex Systems', industry: 'Enterprise Software', contactName: 'Alan Brooks',
    contractValue: 95000, renewalDate: '2026-06-15', monthsRemaining: 3,
    nps: 8, npsHistory: [7, 7, 8, 8, 9, 8], usage: { current: 82, trend: 'stable', history: [78, 80, 81, 83, 82, 82] },
    supportTickets: { open: 1, total30d: 3, severity: 'low' },
    sentimentSignals: 'positive', lastInteraction: '3 days ago',
    features: { adopted: 12, total: 15 }, engagementScore: 78
  },
  {
    id: 'C002', name: 'BlueStar Media', industry: 'Digital Media', contactName: 'Nina Patel',
    contractValue: 48000, renewalDate: '2026-05-01', monthsRemaining: 1.5,
    nps: 5, npsHistory: [8, 7, 7, 6, 5, 5], usage: { current: 45, trend: 'declining', history: [72, 68, 62, 55, 48, 45] },
    supportTickets: { open: 4, total30d: 11, severity: 'high' },
    sentimentSignals: 'negative', lastInteraction: '1 day ago',
    features: { adopted: 6, total: 15 }, engagementScore: 35
  },
  {
    id: 'C003', name: 'Pinnacle Health', industry: 'HealthTech', contactName: 'Dr. Maya Singh',
    contractValue: 125000, renewalDate: '2026-09-30', monthsRemaining: 6,
    nps: 9, npsHistory: [8, 8, 9, 9, 9, 9], usage: { current: 91, trend: 'growing', history: [85, 86, 88, 89, 90, 91] },
    supportTickets: { open: 0, total30d: 1, severity: 'low' },
    sentimentSignals: 'positive', lastInteraction: '1 week ago',
    features: { adopted: 14, total: 15 }, engagementScore: 92
  },
  {
    id: 'C004', name: 'OceanView Logistics', industry: 'Supply Chain', contactName: 'Frank Morrison',
    contractValue: 67000, renewalDate: '2026-04-15', monthsRemaining: 1,
    nps: 4, npsHistory: [7, 6, 6, 5, 4, 4], usage: { current: 38, trend: 'declining', history: [65, 58, 52, 45, 40, 38] },
    supportTickets: { open: 6, total30d: 15, severity: 'critical' },
    sentimentSignals: 'negative', lastInteraction: '2 days ago',
    features: { adopted: 5, total: 15 }, engagementScore: 25
  },
  {
    id: 'C005', name: 'EduWave Learning', industry: 'EdTech', contactName: 'Maria Santos',
    contractValue: 35000, renewalDate: '2026-08-20', monthsRemaining: 5,
    nps: 7, npsHistory: [7, 7, 7, 7, 7, 7], usage: { current: 68, trend: 'stable', history: [66, 67, 68, 69, 68, 68] },
    supportTickets: { open: 2, total30d: 4, severity: 'medium' },
    sentimentSignals: 'neutral', lastInteraction: '5 days ago',
    features: { adopted: 9, total: 15 }, engagementScore: 62
  },
  {
    id: 'C006', name: 'GreenField Energy', industry: 'CleanTech', contactName: 'James Cooper',
    contractValue: 82000, renewalDate: '2026-07-10', monthsRemaining: 4,
    nps: 6, npsHistory: [8, 8, 7, 7, 6, 6], usage: { current: 55, trend: 'declining', history: [78, 74, 70, 64, 58, 55] },
    supportTickets: { open: 3, total30d: 8, severity: 'medium' },
    sentimentSignals: 'neutral', lastInteraction: '4 days ago',
    features: { adopted: 8, total: 15 }, engagementScore: 48
  }
];

export const competitors = [
  {
    id: 'COMP1', name: 'RivalCRM', category: 'Direct Competitor', marketShare: '22%',
    pricing: 'Lower price point, limited features', targetSegment: 'SMB & Mid-Market',
    strengths: ['Aggressive pricing (30% cheaper)', 'Simple UI / quick onboarding', 'Strong SMB presence', 'Good mobile app'],
    weaknesses: ['Limited enterprise features', 'No AI/ML capabilities', 'Weak reporting & analytics', 'Poor API ecosystem', 'No multi-region support'],
    counterPositioning: ['Our AI engine delivers 3x more accurate forecasts', 'Total cost of ownership is lower due to automation', 'Enterprise-grade security and compliance built-in', 'Richer integration ecosystem saves 10+ hrs/week'],
    objections: [
      { objection: 'RivalCRM is 30% cheaper than your solution', response: 'While the sticker price is lower, our customers see 40% higher sales productivity due to AI automation. When you factor in the manual work eliminated, the ROI is 2.5x within the first year. Let me share a case study from a similar company that saved $200K annually.' },
      { objection: 'RivalCRM has faster implementation', response: 'Our guided implementation takes 2-3 weeks vs their 1 week, but we include data migration, custom workflows, and training. Customers who rush implementation see 60% lower adoption rates. Our approach ensures your team is productive from day one.' }
    ],
    winRate: 62, lossRate: 38, avgDealSize: '$45K'
  },
  {
    id: 'COMP2', name: 'PipelineMax', category: 'Direct Competitor', marketShare: '15%',
    pricing: 'Similar pricing, feature-heavy', targetSegment: 'Mid-Market & Enterprise',
    strengths: ['Feature-rich platform', 'Good enterprise integrations', 'Established brand (10+ years)', 'Large partner network'],
    weaknesses: ['Complex UI, steep learning curve', 'Slow innovation cycle', 'Legacy architecture', 'Poor customer support (avg 48hr response)', 'No real-time AI insights'],
    counterPositioning: ['Modern AI-first architecture vs. legacy platform', 'Our NPS is 72 vs. their 41 — customers love our UX', 'Real-time pipeline insights vs. batch reporting', '4hr average support response time vs. 48hrs'],
    objections: [
      { objection: 'PipelineMax has been around longer and is more proven', response: 'Longevity doesn\'t equal innovation. Our platform was built on modern AI architecture from day one. PipelineMax\'s legacy codebase means slower updates and higher technical debt. We ship new features 4x faster and our uptime is 99.99% vs their 99.9%.' },
      { objection: 'PipelineMax has more integrations', response: 'We have 150+ native integrations covering all major tools, plus an open API that lets you build custom integrations in hours, not weeks. Our webhook system means any tool can connect instantly. Quality over quantity — our integrations are deeper and more reliable.' }
    ],
    winRate: 58, lossRate: 42, avgDealSize: '$72K'
  },
  {
    id: 'COMP3', name: 'XyloSoft', category: 'Indirect Competitor', marketShare: '8%',
    pricing: 'Premium pricing, AI-focused', targetSegment: 'Enterprise',
    strengths: ['Strong AI/ML capabilities', 'Good enterprise security', 'Premium brand positioning'],
    weaknesses: ['Very expensive (2x our pricing)', 'Long sales cycle', 'Requires dedicated admin', 'Limited SMB features', 'Complex pricing model'],
    counterPositioning: ['Same AI capability at 50% lower cost', 'Self-service admin vs dedicated hire needed', 'Faster time-to-value (weeks vs months)', 'Transparent, simple pricing model'],
    objections: [
      { objection: 'XyloSoft has more advanced AI features', response: 'Our AI capabilities match XyloSoft on all key metrics — lead scoring accuracy, forecast precision, and deal insights. The difference is accessibility: our AI works out-of-the-box while XyloSoft requires a data science team to configure. We democratize AI for every sales rep.' },
      { objection: 'XyloSoft is the enterprise standard', response: 'That was true 3 years ago. The market has shifted — 67% of enterprise buyers now prioritize ease-of-use and time-to-value over brand legacy. We\'ve won 12 enterprise deals over XyloSoft in the last quarter alone. Let me connect you with references at similar companies.' }
    ],
    winRate: 71, lossRate: 29, avgDealSize: '$125K'
  }
];

export const insights = [
  { id: 1, type: 'risk', icon: '⚠️', title: 'ScaleForce deal going cold', desc: 'No contact in 14 days, competitor demo scheduled. Immediate re-engagement needed.', time: '10 min ago', bgColor: 'var(--color-danger-bg)' },
  { id: 2, type: 'opportunity', icon: '🚀', title: 'DataPulse ready to close', desc: 'Positive proposal response + budget approved. Schedule contract review this week.', time: '2 hrs ago', bgColor: 'var(--color-success-bg)' },
  { id: 3, type: 'churn', icon: '🔴', title: 'OceanView Logistics at high churn risk', desc: 'Usage down 42%, 6 open support tickets, renewal in 1 month. Escalate to CS lead.', time: '3 hrs ago', bgColor: 'var(--color-danger-bg)' },
  { id: 4, type: 'intel', icon: '🏆', title: 'RivalCRM mentioned in Retail Dynamics deal', desc: 'Competitor chosen for pilot. Consider strategic pricing or executive engagement.', time: '5 hrs ago', bgColor: 'var(--color-warning-bg)' },
  { id: 5, type: 'score', icon: '📊', title: 'Lead score updated: Jennifer Walsh → 92', desc: 'Positive email reply + budget confirmed. Moved to High priority tier.', time: '6 hrs ago', bgColor: 'var(--color-info-bg)' },
  { id: 6, type: 'learning', icon: '🧠', title: 'Follow-up template A outperforming B by 34%', desc: 'Pain-point focused messaging drives 2.1x more replies than feature-focused.', time: '1 day ago', bgColor: 'var(--color-info-bg)' }
];
