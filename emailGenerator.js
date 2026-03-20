// ===== Personalized Email Generator =====

const TEMPLATES = {
  initial: {
    subject: (lead) => `${lead.company} + SalesNexus: Solving ${lead.painPoints[0]}`,
    body: (lead) => `Hi ${lead.name.split(' ')[0]},

I noticed ${lead.company} is growing fast in the ${lead.industry} space — congrats on the momentum!

I came across your profile and saw that ${getActivityContext(lead)}. Many ${lead.industry} leaders we work with face similar challenges around ${lead.painPoints.slice(0, 2).join(' and ')}.

We've helped companies like yours:
• Reduce ${lead.painPoints[0]} by 60% with AI-powered automation
• Gain real-time visibility into pipeline health
• Increase conversion rates by 35% through intelligent lead scoring

Would you be open to a 15-minute call this week to explore if there's a fit?

Best regards,
Alex Rivera
Senior Account Executive, SalesNexus`
  },

  followUp: {
    subject: (lead) => `Quick follow-up: ${lead.painPoints[0]} at ${lead.company}`,
    body: (lead) => `Hi ${lead.name.split(' ')[0]},

I wanted to follow up on my previous email — I know things get busy, especially in ${lead.industry}.

I thought you might find this relevant: one of our ${lead.industry} customers recently shared how they solved their ${lead.painPoints[0]} challenge in just 3 weeks using our platform. They saw a 40% improvement in their first quarter.

Here's what made the difference:
• AI-driven insights that surface the most impactful actions
• Automated workflows that eliminate manual bottlenecks
• Real-time dashboards that keep the entire team aligned

No pressure at all — but if you're curious, I'd love to share their story in a quick 10-minute call.

Best,
Alex Rivera
SalesNexus`
  },

  positiveReply: {
    subject: (lead) => `Great to connect, ${lead.name.split(' ')[0]}! Next steps for ${lead.company}`,
    body: (lead) => `Hi ${lead.name.split(' ')[0]},

Thanks so much for your response — I'm glad the timing works!

Based on what you've shared about ${lead.company}'s goals around ${lead.painPoints[0]}, I'd love to set up a personalized demo focused on:

1. How our AI engine can address ${lead.painPoints[0]} specifically for ${lead.industry} companies
2. Integration with your existing stack (${(lead.techStack || []).slice(0, 2).join(', ')})
3. ROI projections based on your team size and use case

Would any of these times work for a 30-minute session?
• Tomorrow at 2:00 PM EST
• Thursday at 10:00 AM EST
• Friday at 3:00 PM EST

Looking forward to it!

Warm regards,
Alex Rivera
SalesNexus`
  },

  negativeReply: {
    subject: (lead) => `Totally understand, ${lead.name.split(' ')[0]} — one last thought`,
    body: (lead) => `Hi ${lead.name.split(' ')[0]},

I completely respect your decision, and I appreciate you taking the time to let me know.

Before I go, I wanted to share one resource that several ${lead.industry} leaders have found valuable regardless of what tools they use — our free guide on "${getGuideTitle(lead)}."

No strings attached — it's genuinely useful content from industry benchmarks we've gathered.

If anything changes in the future, or if you'd like to revisit the conversation down the road, I'm always here.

Wishing ${lead.company} continued success!

Best,
Alex Rivera
SalesNexus`
  }
};

function getActivityContext(lead) {
  if (lead.recentActivity.toLowerCase().includes('download')) return `you recently downloaded our whitepaper`;
  if (lead.recentActivity.toLowerCase().includes('pricing')) return `you've been exploring our pricing options`;
  if (lead.recentActivity.toLowerCase().includes('demo')) return `you attended a product demo recently`;
  if (lead.recentActivity.toLowerCase().includes('trial')) return `you've started exploring our platform`;
  if (lead.recentActivity.toLowerCase().includes('webinar')) return `you joined one of our recent webinars`;
  if (lead.recentActivity.toLowerCase().includes('video')) return `you've been exploring our product videos`;
  if (lead.recentActivity.toLowerCase().includes('email')) return `you've engaged with our recent communications`;
  return `your team is tackling some exciting challenges`;
}

function getGuideTitle(lead) {
  const guides = {
    'SaaS': '2026 SaaS Sales Benchmark Report',
    'Analytics': 'Data-Driven Sales: The Complete Playbook',
    'Cloud Infrastructure': 'Cloud Revenue Operations Guide',
    'Digital Marketing': 'Marketing-to-Sales Alignment Framework',
    'IT Services': 'IT Services Growth Strategies for 2026',
    'Enterprise Software': 'Enterprise Sales Acceleration Guide',
    'FinTech': 'FinTech Revenue Operations Playbook',
    'Retail Tech': 'Retail Analytics Best Practices',
    'Business Intelligence': 'BI-Driven Revenue Growth Guide',
    'AgriTech': 'AgriTech Digital Transformation Report'
  };
  return guides[lead.industry] || 'Revenue Operations Best Practices 2026';
}

export function generateEmail(lead, type = 'initial') {
  const template = TEMPLATES[type] || TEMPLATES.initial;
  return {
    type,
    subject: template.subject(lead),
    body: template.body(lead),
    to: lead.email,
    from: 'alex.rivera@salesnexus.ai'
  };
}

export function getRecommendedEmailType(lead) {
  if (lead.engagementSignal === 'negative') return 'negativeReply';
  if (lead.engagementSignal === 'high' && lead.recentActivity.toLowerCase().includes('repl')) return 'positiveReply';
  if (lead.engagementSignal === 'low' || lead.lastActive.includes('day')) return 'followUp';
  return 'initial';
}
