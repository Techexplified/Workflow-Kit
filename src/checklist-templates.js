export const checklistTemplatesByWorkflow = {
  marketing: [
    {
      id: 'product-launch',
      icon: '🚀',
      iconBg: '#FCE7E7',
      title: 'Product Launch',
      description: 'End-to-end product launch execution across all workflow stages.',
      checklistsByList: {
        'Planning': [
          'Define launch goals and success metrics',
          'Identify target audience',
          'Create positioning and messaging',
          'Set budget and resources',
          'Build project timeline',
          'Identify key stakeholders'
        ],
        'Research': [
          'Conduct market research',
          'Analyze competitors',
          'Validate customer needs',
          'Gather customer insights',
          'Identify go-to-market channels'
        ],
        'Content Creation': [
          'Create product messaging',
          'Design creative assets (images, videos)',
          'Write website and ad copy',
          'Prepare email campaigns',
          'Create social media content',
          'Develop product landing page'
        ],
        'Review & Approval': [
          'Share assets for internal review',
          'Collect stakeholder feedback',
          'Make necessary revisions',
          'Get final approval',
          'Confirm launch readiness'
        ],
        'Launch / Execution': [
          'Publish website and landing page',
          'Launch email campaign',
          'Go live on social media',
          'Activate paid campaigns',
          'Coordinate with sales team',
          'Monitor early performance'
        ],
        'Monitor & Optimize': [
          'Track key metrics (traffic, signups, sales)',
          'Analyze campaign performance',
          'Optimize ad spend and targeting',
          'Gather customer feedback',
          'Document learnings'
        ],
        'Completed': [
          'Compare results with goals',
          'Share final report with team',
          'Archive project and assets'
        ]
      }
    },
    {
      id: 'brand-campaign',
      icon: '🎯',
      iconBg: '#DBEAFE',
      title: 'Brand Campaign',
      description: 'High-impact multi-channel brand campaign management across stages.',
      checklistsByList: {
        'Planning': [
          'Define campaign objectives',
          'Identify target audience segments',
          'Set key messages and brand story',
          'Determine campaign channels',
          'Set budget and timeline',
          'Identify stakeholders'
        ],
        'Research': [
          'Analyze audience insights',
          'Review brand perception',
          'Research competitive campaigns',
          'Identify trends and opportunities',
          'Finalize creative direction'
        ],
        'Content Creation': [
          'Design creative concepts',
          'Create social media content',
          'Develop video/visual assets',
          'Write ad copy and key messages',
          'Prepare influencer/PR assets',
          'Build campaign landing page'
        ],
        'Review & Approval': [
          'Share creative assets for review',
          'Collect feedback from stakeholders',
          'Make revisions',
          'Get final approval',
          'Confirm media plan and budget'
        ],
        'Launch / Execution': [
          'Publish campaign across channels',
          'Activate paid media',
          'Engage influencers/partners',
          'Send press release (if applicable)',
          'Coordinate with internal teams',
          'Ensure campaign tracking is live'
        ],
        'Monitor & Optimize': [
          'Track reach, engagement and brand lift',
          'Analyze channel performance',
          'Optimize content and ad spend',
          'Monitor audience sentiment',
          'Document insights'
        ],
        'Completed': [
          'Measure against objectives',
          'Share final report and learnings',
          'Archive campaign assets'
        ]
      }
    },
    {
      id: 'event-marketing',
      icon: '📅',
      iconBg: '#EDE9FE',
      title: 'Event Marketing',
      description: 'Webinar, conference, and event marketing checklist across stages.',
      checklistsByList: {
        'Planning': [
          'Define event goals and format',
          'Set date, venue/platform and budget',
          'Identify target audience',
          'Create event theme and agenda',
          'Confirm speakers and partners',
          'Build project timeline'
        ],
        'Research': [
          'Research audience interests',
          'Analyze past event feedback',
          'Identify potential sponsors',
          'Benchmark similar events',
          'Finalize registration strategy'
        ],
        'Content Creation': [
          'Create event landing page',
          'Design promotional assets',
          'Write email and social media content',
          'Prepare presentations and materials',
          'Set up registration forms',
          'Create signage/virtual assets'
        ],
        'Review & Approval': [
          'Share event plan for review',
          'Collect feedback from stakeholders',
          'Make necessary changes',
          'Get final approval',
          'Confirm logistics and vendors'
        ],
        'Launch / Execution': [
          'Open registrations',
          'Run promotional campaigns',
          'Coordinate with vendors and partners',
          'Manage attendee communications',
          'Execute event (on-site or virtual)',
          'Handle live support and engagement'
        ],
        'Monitor & Optimize': [
          'Track registrations and attendance',
          'Gather attendee feedback',
          'Measure engagement and ROI',
          'Optimize for future events',
          'Document learnings'
        ],
        'Completed': [
          'Share final event report',
          'Send thank you communications',
          'Archive event assets and data'
        ]
      }
    },
    {
      id: 'content-marketing',
      icon: '📄',
      iconBg: '#D1FAE5',
      title: 'Content Marketing',
      description: 'Editorial planning, creation, and distribution checklist across stages.',
      checklistsByList: {
        'Planning': [
          'Define content goals and themes',
          'Identify target audience',
          'Choose content formats (blog, video, etc.)',
          'Set publishing schedule',
          'Assign team members',
          'Build editorial calendar'
        ],
        'Research': [
          'Identify trending topics and keywords',
          'Analyze past content performance',
          'Research audience questions',
          'Find content gaps',
          'Finalize topic list'
        ],
        'Content Creation': [
          'Write blog posts/scripts',
          'Create visuals and multimedia',
          'Design social media content',
          'Optimize for SEO',
          'Prepare newsletter content',
          'Store assets in shared library'
        ],
        'Review & Approval': [
          'Share content for review',
          'Collect feedback from editors/stakeholders',
          'Make revisions',
          'Get final approval',
          'Schedule for publishing'
        ],
        'Launch / Execution': [
          'Publish content across channels',
          'Distribute via email and social media',
          'Coordinate with paid promotion (if needed)',
          'Engage with audience',
          'Ensure tracking is active'
        ],
        'Monitor & Optimize': [
          'Track views, engagement and conversions',
          'Analyze top-performing content',
          'Optimize based on data',
          'Gather audience feedback',
          'Update strategy and calendar'
        ],
        'Completed': [
          'Review performance against goals',
          'Share final report with team',
          'Archive content and insights'
        ]
      }
    }
  ],
  events: [
    {
      id: 'general-event',
      icon: '🎪',
      iconBg: '#EDE9FE',
      title: 'General Event',
      description: 'End-to-end event planning, coordination, and wrap-up checklist.',
      checklistsByList: {
        'Planning': [
          'Define event purpose and goals',
          'Set target audience',
          'Establish budget',
          'Choose event date',
          'Identify key stakeholders',
          'Get initial approvals'
        ],
        'Logistics': [
          'Book venue',
          'Arrange catering',
          'Plan transport and parking',
          'Confirm AV and technical equipment',
          'Arrange seating and decor',
          'Prepare on-site logistics plan'
        ],
        'Marketing': [
          'Create event landing page',
          'Send email invitations',
          'Promote on social media',
          'Manage registrations',
          'Coordinate with partners/sponsors'
        ],
        'Execution': [
          'Conduct team briefing',
          'Set up venue and equipment',
          'Manage guest check-in',
          'Run event as per schedule',
          'Handle on-site issues',
          'Capture photos and videos'
        ],
        'Post-Event': [
          'Collect attendee feedback',
          'Share event photos and recordings',
          'Send thank you emails',
          'Analyze event performance',
          'Prepare final report'
        ],
        'Completed': [
          'Archive event documents',
          'Share final album link',
          'Close vendor contract',
          'Move cards to archive list',
          'Celebrate with the team'
        ]
      }
    },
    {
      id: 'corporate-event',
      icon: '💼',
      iconBg: '#DBEAFE',
      title: 'Corporate Event',
      description: 'Corporate conference, seminar, and meeting execution checklist.',
      checklistsByList: {
        'Planning': [
          'Define event objectives and KPIs',
          'Identify target audience (employees/clients)',
          'Set budget and get approvals',
          'Choose date and venue',
          'Plan agenda and session structure',
          'Identify speakers and moderators'
        ],
        'Logistics': [
          'Book venue and meeting rooms',
          'Arrange catering (breakfast/lunch/refreshments)',
          'Set up AV, projection and live-streaming',
          'Arrange travel and accommodation (if needed)',
          'Confirm seating and stage setup',
          'Prepare on-site logistics plan'
        ],
        'Marketing': [
          'Create event invitation and landing page',
          'Send email invites to employees/clients',
          'Promote via internal channels',
          'Manage registrations and RSVP',
          'Share pre-event information (agenda, speakers)'
        ],
        'Execution': [
          'Conduct team briefing',
          'Speaker check-in and rehearsal',
          'Manage attendee check-in',
          'Run sessions as per agenda',
          'Handle technical support',
          'Capture photos/videos and live updates'
        ],
        'Post-Event': [
          'Collect attendee feedback',
          'Share presentations and recordings',
          'Send thank you notes',
          'Measure event success (KPIs)',
          'Prepare final report and insights'
        ],
        'Completed': [
          'Archive event documents',
          'Share final album link',
          'Close vendor contract',
          'Move cards to archive list',
          'Celebrate with the team'
        ]
      }
    },
    {
      id: 'wedding-event',
      icon: '💍',
      iconBg: '#FCE7F3',
      title: 'Wedding Event',
      description: 'Wedding timeline, vendors, invitations & ceremony checklist.',
      checklistsByList: {
        'Planning': [
          'Define wedding vision and theme',
          'Set budget',
          'Finalize date and venue',
          'Create guest list',
          'Hire wedding planner (if needed)',
          'Confirm key vendors'
        ],
        'Logistics': [
          'Book venue (ceremony + reception)',
          'Plan catering and menu tastings',
          'Arrange décor and floral designs',
          'Confirm photography and videography',
          'Arrange guest accommodation (if needed)',
          'Plan transportation'
        ],
        'Marketing': [
          'Send invitations (physical/digital)',
          'Manage RSVP tracking',
          'Share wedding website (if any)',
          'Communicate event details to guests'
        ],
        'Execution': [
          'Coordinate with vendors',
          'Manage guest arrivals and seating',
          'Oversee ceremony and reception schedule',
          'Handle last-minute changes',
          'Ensure smooth event flow',
          'Capture photos and videos'
        ],
        'Post-Event': [
          'Send thank you notes to guests',
          'Share wedding photos and videos',
          'Settle final vendor payments',
          'Collect and store important documents',
          'Plan honeymoon (optional)'
        ],
        'Completed': [
          'Archive event documents',
          'Share final album link',
          'Close vendor contract',
          'Move cards to archive list',
          'Celebrate with the team'
        ]
      }
    },
    {
      id: 'party-celebration',
      icon: '🎉',
      iconBg: '#FEF3C7',
      title: 'Party / Celebration',
      description: 'Birthday, anniversary, and private party planning checklist.',
      checklistsByList: {
        'Planning': [
          'Define occasion and theme',
          'Set budget',
          'Choose date and venue (home/venue)',
          'Create guest list',
          'Plan activities and entertainment'
        ],
        'Logistics': [
          'Arrange food and drinks',
          'Plan décor and lighting',
          'Arrange music/DJ/entertainment',
          'Confirm seating and layout',
          'Arrange any special requirements (e.g., cake, games)'
        ],
        'Marketing': [
          'Send invitations (digital/print)',
          'Track guest RSVPs',
          'Share event details (time, venue, dress code)',
          'Plan social media sharing (optional)'
        ],
        'Execution': [
          'Set up venue and décor',
          'Manage guest arrivals',
          'Coordinate food and entertainment',
          'Ensure safety and comfort',
          'Capture photos and videos'
        ],
        'Post-Event': [
          'Share event photos with guests',
          'Send thank you messages',
          'Settle any pending payments',
          'Collect feedback for future events'
        ],
        'Completed': [
          'Archive event documents',
          'Share final album link',
          'Close vendor contract',
          'Move cards to archive list',
          'Celebrate with the team'
        ]
      }
    }
  ],
  'real-estate': [
    {
      id: 'buyer-journey',
      icon: '🔑',
      iconBg: '#DBEAFE',
      title: 'Buyer Journey',
      description: 'Buyer consultation, showings, offers, escrow, and closing checklist.',
      checklistsByList: {
        'New Lead': [
          'Capture inquiry details',
          'Understand buying needs',
          'Collect budget range',
          'Set communication preferences',
          'Add to follow-up list'
        ],
        'Qualified': [
          'Confirm readiness to buy',
          'Get pre-approval (or connect with lender)',
          'Discuss preferred locations',
          'Define must-haves and nice-to-haves',
          'Schedule initial consultation'
        ],
        'Property Search': [
          'Create property shortlist',
          'Schedule showings',
          'Track properties viewed',
          'Collect client feedback',
          'Refine search criteria',
          'Share new listings'
        ],
        'Offer': [
          'Review comparable sales',
          'Prepare offer documents',
          'Negotiate terms',
          'Submit offer',
          'Track offer status'
        ],
        'Under Contract': [
          'Complete home inspection',
          'Review inspection report',
          'Arrange financing',
          'Review and sign disclosures',
          'Meet key deadlines'
        ],
        'Closing': [
          'Conduct final walkthrough',
          'Confirm closing date',
          'Review closing documents',
          'Coordinate with lender/title company',
          'Complete closing'
        ],
        'Closed': [
          'Handover keys',
          'Share important documents',
          'Request client feedback/testimonial'
        ]
      }
    },
    {
      id: 'seller-journey',
      icon: '🏡',
      iconBg: '#D1FAE5',
      title: 'Seller Journey',
      description: 'CMA valuation, staging, MLS listing, offers, and sale closing checklist.',
      checklistsByList: {
        'New Lead': [
          'Capture seller inquiry',
          'Collect property details',
          'Understand selling goals',
          'Set timeline expectations',
          'Schedule initial consultation'
        ],
        'Qualified': [
          'Assess property value (CMA)',
          'Discuss market conditions',
          'Confirm seller readiness',
          'Explain listing process and fees',
          'Sign representation agreement'
        ],
        'Property Search': [
          'Prepare property for listing',
          'Arrange staging (if needed)',
          'Schedule professional photos',
          'Create listing description',
          'Finalize listing price'
        ],
        'Offer': [
          'Review incoming offers',
          'Compare terms with seller',
          'Negotiate with buyers',
          'Accept offer',
          'Notify all parties'
        ],
        'Under Contract': [
          'Manage inspections and appraisals',
          'Handle buyer contingencies',
          'Coordinate repairs (if needed)',
          'Track contract deadlines',
          'Keep seller updated'
        ],
        'Closing': [
          'Confirm buyer financing',
          'Review closing documents',
          'Coordinate with title company',
          'Resolve any final issues',
          'Complete closing'
        ],
        'Closed': [
          'Transfer ownership',
          'Share closing statement',
          'Request referral and feedback'
        ]
      }
    },
    {
      id: 'open-house-event',
      icon: '🚪',
      iconBg: '#FEF3C7',
      title: 'Open House Event',
      description: 'Open house prep, marketing, visitor sign-in, and agent follow-up.',
      checklistsByList: {
        'New Lead': [
          'Plan open house date and time',
          'Confirm property details',
          'Set target audience',
          'Create event listing',
          'Start marketing campaign'
        ],
        'Qualified': [
          'Confirm RSVPs',
          'Follow up with interested attendees',
          'Share property details',
          'Pre-qualify serious buyers',
          'Prepare attendee list'
        ],
        'Property Search': [
          'Prepare property (cleaning, staging)',
          'Set up signage and directions',
          'Arrange brochures and materials',
          'Test lighting and presentation',
          'Coordinate staff/agents'
        ],
        'Offer': [
          'Collect feedback from attendees',
          'Follow up with interested buyers',
          'Share additional property information',
          'Assist with offer preparation',
          'Track offer status'
        ],
        'Under Contract': [
          'Support buyer through contract process',
          'Share inspection and financing details',
          'Coordinate with seller and agents',
          'Track key dates',
          'Keep attendees updated'
        ],
        'Closing': [
          'Confirm deal completion',
          'Update event records',
          'Thank attendees and follow up'
        ],
        'Closed': [
          'Mark event as completed',
          'Analyze event performance',
          'Add leads to long-term nurture list'
        ]
      }
    },
    {
      id: 'rental-property',
      icon: '📋',
      iconBg: '#EDE9FE',
      title: 'Rental Property',
      description: 'Tenant screening, lease execution, move-in inspections, and turnover.',
      checklistsByList: {
        'New Lead': [
          'Capture rental inquiry',
          'Collect tenant details',
          'Understand rental requirements',
          'Share property information',
          'Schedule property viewing'
        ],
        'Qualified': [
          'Verify tenant identity',
          'Run background and credit check',
          'Confirm income and employment',
          'Check rental history',
          'Assess tenant fit'
        ],
        'Property Search': [
          'Show property to tenant',
          'Collect feedback',
          'Answer questions',
          'Compare with other properties (if multiple)',
          'Finalize tenant interest'
        ],
        'Offer': [
          'Send lease agreement',
          'Negotiate lease terms',
          'Collect security deposit',
          'Confirm move-in date'
        ],
        'Under Contract': [
          'Sign lease agreement',
          'Collect initial payments',
          'Set up tenant in system',
          'Share property rules and documents',
          'Confirm utilities and access'
        ],
        'Closing': [
          'Complete move-in checklist',
          'Handover keys',
          'Document property condition',
          'Confirm tenant move-in'
        ],
        'Closed': [
          'Mark tenant as active',
          'Set renewal reminders',
          'Schedule regular property reviews'
        ]
      }
    }
  ]
};

// Fuzzy/resilient matcher that resolves a checklist for a given workflow, category, and list name/index
export function getChecklistForCategoryAndList(workflowId, categoryId, listName, listIndex = 0) {
  const templates = checklistTemplatesByWorkflow[workflowId] || checklistTemplatesByWorkflow.marketing || [];
  const category = templates.find((t) => t.id === categoryId) || templates[0];

  if (!category || !category.checklistsByList) {
    return {
      checklist: (category && category.checklist) || [],
      listKey: listName || 'Planning',
      category: category || null
    };
  }

  const listKeys = Object.keys(category.checklistsByList);

  if (listName) {
    const cleanName = listName.trim().toLowerCase();

    // 1. Exact case-insensitive match
    for (const key of listKeys) {
      if (key.toLowerCase() === cleanName) {
        return {
          checklist: category.checklistsByList[key],
          listKey: key,
          category
        };
      }
    }

    // 2. Substring match (e.g. 'planning' in '1. Planning', 'creation' in 'Content Creation', 'review' in 'Review & Approval')
    for (const key of listKeys) {
      const cleanKey = key.toLowerCase();
      if (cleanKey.includes(cleanName) || cleanName.includes(cleanKey)) {
        return {
          checklist: category.checklistsByList[key],
          listKey: key,
          category
        };
      }
    }

    // 3. Keyword matching
    const keywords = ['planning', 'research', 'creation', 'review', 'launch', 'monitor', 'lead', 'qualified', 'search', 'offer', 'contract', 'closing', 'closed', 'completed', 'logistics', 'marketing', 'execution', 'post'];
    for (const kw of keywords) {
      if (cleanName.includes(kw)) {
        let matchedKey = listKeys.find((k) => k.toLowerCase().includes(kw));
        // Handle alias between completed and closed
        if (!matchedKey && (kw === 'completed' || kw === 'closed')) {
          matchedKey = listKeys.find((k) => k.toLowerCase() === 'closed' || k.toLowerCase() === 'completed');
        }
        if (matchedKey) {
          return {
            checklist: category.checklistsByList[matchedKey],
            listKey: matchedKey,
            category
          };
        }
      }
    }
  }

  // 4. Index-based match
  if (typeof listIndex === 'number' && listIndex >= 0 && listIndex < listKeys.length) {
    const key = listKeys[listIndex];
    return {
      checklist: category.checklistsByList[key],
      listKey: key,
      category
    };
  }

  // Fallback to first list key
  const fallbackKey = listKeys[0] || 'Planning';
  return {
    checklist: category.checklistsByList[fallbackKey] || [],
    listKey: fallbackKey,
    category
  };
}
