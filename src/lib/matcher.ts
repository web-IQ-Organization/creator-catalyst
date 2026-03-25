
export interface FounderIntake {
  productName: string;
  productDescription: string;
  targetAudience: string;
  goal: 'awareness' | 'signups' | 'revenue' | 'community';
  budget: 'under_5k' | '5k_to_15k' | '15k_plus';
  timeline: '2_weeks' | '1_month' | '3_months';
  platforms: ('twitter' | 'linkedin' | 'tiktok' | 'youtube' | 'newsletter')[];
}

export interface CreatorArchetype {
  name: string;
  description: string;
  bestFor: string;
  platforms: string[];
  estimatedReach: string;
}

export interface SprintTask {
  week: number;
  task: string;
  owner: 'founder' | 'creator' | 'both';
  deliverable: string;
}

export interface SprintPlan {
  sprintId: string;
  productName: string;
  recommendedArchetypes: CreatorArchetype[];
  sprintDuration: string;
  estimatedInvestment: string;
  tasks: SprintTask[];
  successMetrics: string[];
  nextStep: string;
}

// Define creator archetypes
const creatorArchetypes: CreatorArchetype[] = [
  {
    name: "The Educator",
    description: "Breaks down complex topics into easy-to-understand content, often through tutorials, guides, and deep dives.",
    bestFor: "awareness, signups",
    platforms: ["youtube", "newsletter", "linkedin"],
    estimatedReach: "50k-200k"
  },
  {
    name: "The Builder",
    description: "Showcases the process of building products, sharing behind-the-scenes, technical insights, and development journeys.",
    bestFor: "community, awareness",
    platforms: ["twitter", "youtube", "linkedin"],
    estimatedReach: "30k-150k"
  },
  {
    name: "The Storyteller",
    description: "Crafts engaging narratives around product use cases, user testimonials, and the impact of the solution on real problems.",
    bestFor: "revenue, awareness",
    platforms: ["tiktok", "twitter", "youtube"],
    estimatedReach: "100k-500k"
  },
  {
    name: "The Strategist",
    description: "Offers high-level analysis, market insights, and strategic perspectives relevant to the product's niche.",
    bestFor: "signups, revenue",
    platforms: ["linkedin", "newsletter", "twitter"],
    estimatedReach: "40k-180k"
  },
  {
    name: "The Community Cultivator",
    description: "Focuses on engaging with and growing a loyal audience, fostering discussions, and amplifying product-related content within their niche.",
    bestFor: "community, awareness",
    platforms: ["twitter", "linkedin", "newsletter"],
    estimatedReach: "20k-100k"
  },
];

export function generateSprintPlan(intake: FounderIntake): SprintPlan {
  // 1. Match archetypes
  const scoredArchetypes = creatorArchetypes.map(archetype => {
    let score = 0;
    // Score based on goal
    if (archetype.bestFor.includes(intake.goal)) {
      score += 3;
    }
    // Score based on platforms
    intake.platforms.forEach(platform => {
      if (archetype.platforms.includes(platform)) {
        score += 1;
      }
    });

    // Bonus for exact platform matches for certain archetypes
    if (intake.goal === 'revenue' && archetype.name === 'The Storyteller' && intake.platforms.includes('tiktok')) score += 2;
    if (intake.goal === 'signups' && archetype.name === 'The Educator' && intake.platforms.includes('youtube')) score += 2;

    return { archetype, score };
  });

  scoredArchetypes.sort((a, b) => b.score - a.score);
  const recommendedArchetypes = scoredArchetypes.slice(0, 2).map(sa => sa.archetype);

  // 2. Generate sprintId
  const sprintId = Date.now().toString(36);

  // 3. Determine estimatedInvestment
  let estimatedInvestment: string;
  switch (intake.budget) {
    case 'under_5k':
      estimatedInvestment = "$2,500–$4,500";
      break;
    case '5k_to_15k':
      estimatedInvestment = "$6,000–$12,000";
      break;
    case '15k_plus':
      estimatedInvestment = "$15,000–$30,000";
      break;
    default:
      estimatedInvestment = "Negotiable";
  }

  // 4. Generate tasks
  let tasks: SprintTask[] = [];
  let numTasks: number;
  let sprintDuration: string;

  switch (intake.timeline) {
    case '2_weeks':
      numTasks = 6;
      sprintDuration = "2 Weeks";
      break;
    case '1_month':
      numTasks = 10;
      sprintDuration = "1 Month";
      break;
    case '3_months':
      numTasks = 16;
      sprintDuration = "3 Months";
      break;
    default:
      numTasks = 0;
      sprintDuration = "Flexible";
  }

  const taskTemplatesByGoal: Record<FounderIntake['goal'], string[]> = {
    awareness: [
      "Brainstorm content ideas relevant to {productName} on {platforms}",
      "Draft 3 short-form video scripts demonstrating {productName} value",
      "Create 2 long-form blog posts/videos introducing {productName} features",
      "Develop engaging social media posts for {productName} launch/updates",
      "Collaborate on a 'day in the life' content piece featuring {productName}",
      "Execute a live Q&A session about {productName}",
      "Analyze content performance and engagement metrics for {productName}",
      "Repurpose top-performing content into different formats for {productName}",
      "Engage with audience comments and build community around {productName} content",
      "Identify and connect with other creators for potential cross-promotion of {productName}",
    ],
    signups: [
      "Develop a 'how-to' guide or tutorial series for {productName}",
      "Create a demo video highlighting key features of {productName}",
      "Design lead magnet content (e.g., checklist, template) related to {productName}",
      "Promote {productName} with targeted call-to-actions in content",
      "Run A/B tests on CTA placements and messaging for {productName}",
      "Create a personalized onboarding email series for new {productName} signups",
      "Host a webinar or workshop demonstrating {productName} use cases",
      "Gather and integrate user feedback for {productName} improvements",
      "Optimize landing pages linked from content for {productName} signups",
      "Set up retargeting campaigns for content viewers who haven't signed up for {productName}",
    ],
    revenue: [
      "Develop a case study showcasing {productName}'s impact for a client",
      "Collect and feature user testimonials for {productName}",
      "Create comparison content: {productName} vs. competitors",
      "Design special offer/discount promotions for {productName}",
      "Host a masterclass demonstrating advanced {productName} strategies",
      "Create content addressing common sales objections for {productName}",
      "Implement affiliate tracking and creator commission structures for {productName}",
      "Develop content that highlights ROI and business value of {productName}",
      "Run limited-time promotions with creators for {productName}",
      "Analyze conversion funnels from creator content to {productName} sales",
    ],
    community: [
      "Initiate discussions and polls around {productName} related topics",
      "Create 'behind-the-scenes' content about {productName} development/team",
      "Highlight and engage with prominent users/advocates of {productName}",
      "Organize a community challenge or event centered around {productName}",
      "Facilitate Q&A sessions with the {productName} founders or team",
      "Develop exclusive content for a loyal {productName} community segment",
      "Amplify user-generated content featuring {productName}",
      "Create a feedback loop within the community for {productName} features",
      "Develop user stories and success features showcasing {productName}",
      "Host virtual meetups or networking events for {productName} users",
    ],
  };

  const selectedTaskTemplates = taskTemplatesByGoal[intake.goal] || [];

  for (let i = 0; i < numTasks; i++) {
    const template = selectedTaskTemplates[i % selectedTaskTemplates.length]; // cycle through templates if not enough
    const taskDescription = template
      .replace('{productName}', intake.productName)
      .replace('{platforms}', intake.platforms.join(', '));

    tasks.push({
      week: Math.floor(i / (numTasks / (intake.timeline === '2_weeks' ? 2 : intake.timeline === '1_month' ? 4 : 12))) + 1, // Distribute tasks across weeks
      task: taskDescription,
      owner: i % 2 === 0 ? 'creator' : 'both', // Alternate owner
      deliverable: (i % 3 === 0 ? 'Draft Content' : i % 3 === 1 ? 'Published Post' : 'Engagement Report')
    });
  }

  // 5. Success Metrics
  let successMetrics: string[] = [];
  switch (intake.goal) {
    case 'awareness':
      successMetrics = ["Reach & Impressions", "Audience Growth", "Brand Mentions", "Content Shares"];
      break;
    case 'signups':
      successMetrics = ["Website Traffic from Creator Content", "Free Trial Signups", "Demo Requests", "Lead Magnet Downloads"];
      break;
    case 'revenue':
      successMetrics = ["Conversion Rate from Creator Content", "Sales Revenue Attributed to Creators", "Customer Lifetime Value", "Referral Program Signups"];
      break;
    case 'community':
      successMetrics = ["Engagement Rate", "Follower Growth", "Comments & Discussions", "User-Generated Content"];
      break;
  }

  return {
    sprintId,
    productName: intake.productName,
    recommendedArchetypes,
    sprintDuration,
    estimatedInvestment,
    tasks,
    successMetrics,
    nextStep: "Book your Sprint kickoff call →"
  };
}
