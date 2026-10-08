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
          'Define event goals, vision, and theme',
          'Set overall budget & cost allocation',
          'Determine date, time, and target attendance',
          'Form event planning committee & assign roles'
        ],
        'Logistics': [
          'Secure venue contract & permits',
          'Hire caterer, AV crew, and equipment rentals',
          'Create event floor plan & seating chart',
          'Arrange transportation and parking logistics'
        ],
        'Marketing': [
          'Launch event website & ticketing portal',
          'Design promotional posters & social media banners',
          'Send email campaign & press release',
          'Track RSVPs and ticket sales'
        ],
        'Execution': [
          'Oversee day-of setup and vendor deliveries',
          'Conduct run-through & sound checks',
          'Manage registration desk & attendee flow',
          'Coordinate timeline & live event program'
        ],
        'Post-Event': [
          'Supervise teardown, cleanup & return rentals',
          'Settle final invoices with vendors',
          'Send thank-you emails & attendee survey',
          'Share event photos & highlight video'
        ],
        'Completed': [
          'Review survey feedback and attendance metrics',
          'Reconcile final budget against expenses',
          'Document learnings for future events',
          'Archive all event collateral and assets'
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
          'Align on business objectives & key messaging',
          'Establish corporate event budget & approvals',
          'Set date, format (in-person/hybrid), and location',
          'Draft master event agenda & speaker outline'
        ],
        'Logistics': [
          'Contract conference venue & hotel room blocks',
          'Secure AV production, staging & live streaming',
          'Book catering (breakfast, lunch, breaks)',
          'Arrange VIP transportation & speaker green rooms'
        ],
        'Marketing': [
          'Launch branded corporate registration page',
          'Send invitation campaigns to target executives',
          'Publish speaker lineup on LinkedIn & channels',
          'Order branded badges, banners, and swag bags'
        ],
        'Execution': [
          'Manage executive registration & badge pickup',
          'Coordinate speaker presentations & rehearsals',
          'Run live stage timing, AV, and Q&A sessions',
          'Oversee networking breakouts & sponsor booths'
        ],
        'Post-Event': [
          'Send post-conference feedback survey',
          'Share presentation decks & recording links',
          'Process vendor payments & expense reconciliations',
          'Consolidate attendee lead list for sales team'
        ],
        'Completed': [
          'Present ROI & executive summary report',
          'Conduct team debrief & identify improvements',
          'Archive session recordings & attendee data',
          'Close out corporate project ledger'
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
          'Set wedding budget & draft initial guest list',
          'Choose wedding theme, color palette & style',
          'Select wedding party members',
          'Research and tour ceremony & reception venues'
        ],
        'Logistics': [
          'Book ceremony and reception venues',
          'Hire photographer, videographer, and DJ/band',
          'Book florist, caterer, and cake designer',
          'Arrange guest transportation & hotel room blocks'
        ],
        'Marketing': [
          'Create wedding website & registry',
          'Design & send save-the-date cards',
          'Mail formal invitations & track RSVPs',
          'Order wedding favors, signage, and paper goods'
        ],
        'Execution': [
          'Conduct wedding rehearsal & rehearsal dinner',
          'Coordinate morning hair, makeup & bridal suite',
          'Manage ceremony timing & processional order',
          'Oversee reception schedule (toasts, dances, dinner)'
        ],
        'Post-Event': [
          'Ensure gift collection & personal decor return',
          'Settle final vendor tips and remaining balances',
          'Send thank-you notes for gifts and attendance',
          'Review photographer sneak peek gallery'
        ],
        'Completed': [
          'Receive final wedding photo gallery & video',
          'Preserve wedding dress & keepsake items',
          'Change legal name & update documentation',
          'Archive wedding planning binder and memories'
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
          'Choose celebration theme, date, and time',
          'Determine party budget & guest count',
          'Pick venue (home, restaurant, or event hall)',
          'Brainstorm activities, music, and entertainment'
        ],
        'Logistics': [
          'Reserve venue or prep party space',
          'Order custom celebration cake & desserts',
          'Plan food menu, beverages, and ice supply',
          'Rent tables, chairs, or sound equipment if needed'
        ],
        'Marketing': [
          'Design & send digital or printed invitations',
          'Track guest RSVPs and headcount',
          'Purchase themed decorations, balloons & banners',
          'Buy matching plates, napkins, cups & tableware'
        ],
        'Execution': [
          'Decorate venue, set up tables and photo backdrop',
          'Arrange food and beverage buffet stations',
          'Curate party music playlist and cue party games',
          'Greet guests, take group photos, and cut cake'
        ],
        'Post-Event': [
          'Pack up leftover food and party decor',
          'Clean up venue and dispose of trash',
          'Return any rented equipment',
          'Share party photos in shared album'
        ],
        'Completed': [
          'Send thank-you messages to all attendees',
          'Reconcile party expenses',
          'Save memorable photos to keepsake album',
          'Document favorite party ideas for next year'
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
          'Initial contact & intake questionnaire',
          'Determine buyer timeline & readiness',
          'Explain agency representation & commission',
          'Send welcome packet & buyer guide'
        ],
        'Qualified': [
          'Obtain mortgage pre-approval letter',
          'Verify down payment & closing funds',
          'Establish price range & target neighborhoods',
          'Execute Exclusive Buyer Brokerage Agreement'
        ],
        'Property Search': [
          'Set up automated MLS search portal',
          'Review matching listings with buyer',
          'Schedule & conduct property tours',
          'Evaluate pros/cons of shortlisted properties'
        ],
        'Offer': [
          'Pull Comparative Market Analysis (CMA)',
          'Determine offer price & terms',
          'Prepare purchase contract & disclosures',
          'Submit offer and negotiate counteroffers'
        ],
        'Under Contract': [
          'Deliver earnest money deposit',
          'Schedule home & pest inspections',
          'Review inspection report & negotiate repairs',
          'Monitor appraisal & mortgage underwriting'
        ],
        'Closing': [
          'Review Closing Disclosure (CD) & settlement statement',
          'Conduct final property walkthrough',
          'Wire closing funds',
          'Attend closing signing & receive keys'
        ],
        'Completed': [
          'Update MLS status to Closed',
          'Provide utility & change of address guide',
          'Deliver client closing gift & request review',
          'Set up 30-day post-closing check-in'
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
          'Initial seller consultation & property details',
          'Understand seller motivation & timeframe',
          'Gather deed, tax info, and existing mortgage details',
          'Send pre-listing kit & marketing overview'
        ],
        'Qualified': [
          'Conduct on-site walkthrough & assessment',
          'Prepare Comparative Market Analysis (CMA)',
          'Agree on listing price & marketing strategy',
          'Execute Exclusive Right to Sell Agreement'
        ],
        'Property Search': [
          'Provide staging & decluttering recommendations',
          'Complete seller disclosures & HOA package',
          'Schedule professional HDR photography & 3D tour',
          'Create property feature sheet & brochure'
        ],
        'Offer': [
          'Review incoming offers & buyer qualifications',
          'Analyze net proceeds for each offer',
          'Negotiate counteroffers or multiple offers',
          'Formally accept winning purchase agreement'
        ],
        'Under Contract': [
          'Confirm earnest money deposit received',
          'Facilitate buyer home inspection & appraisal',
          'Negotiate repair requests (if applicable)',
          'Monitor buyer loan commitment deadline'
        ],
        'Closing': [
          'Review settlement statement & net proceeds',
          'Schedule seller move-out & cleaning',
          'Attend closing or sign remote deed package',
          'Confirm wire transfer of sales proceeds'
        ],
        'Completed': [
          'Remove yard sign and lockbox',
          'Mark MLS status as Sold',
          'Send thank you gift & request testimonial',
          'File transaction documents in brokerage archive'
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
          'Select open house date & time window',
          'Obtain seller permission & confirm staging',
          'Announce event on MLS & major portals',
          'Schedule social media promotional posts'
        ],
        'Qualified': [
          'Design & print high-quality property flyers',
          'Send email blast to local buyer agents',
          'Place directional signs at key intersections',
          'Post neighborhood invitations on community boards'
        ],
        'Property Search': [
          'Deep clean property & open window blinds',
          'Set comfortable temperature & ambient music',
          'Prepare refreshments & branded water bottles',
          'Set up sign-in station / digital guest tablet'
        ],
        'Offer': [
          'Greet visitors & collect contact info',
          'Highlight key property features & upgrades',
          'Provide property disclosure & CMA packets',
          'Answer questions about neighborhood & schools'
        ],
        'Under Contract': [
          'Send thank-you message to all attendees',
          'Follow up with interested buyers & their agents',
          'Deliver detailed feedback report to seller',
          'Identify active buyers for other matching listings'
        ],
        'Closing': [
          'Track any offers originating from open house',
          'Update open house attendee records',
          'Settle any event supply or vendor costs'
        ],
        'Completed': [
          'Archive attendee registration log in CRM',
          'Record open house metrics & visitor count',
          'Review feedback for future event optimization'
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
          'Verify landlord ownership & property compliance',
          'Determine optimal market rent rate',
          'Execute property management / leasing agreement',
          'Photograph unit and prepare feature description'
        ],
        'Qualified': [
          'Publish rental listing across rental portals',
          'Respond to prospective tenant inquiries',
          'Pre-screen applicants for income & pets',
          'Schedule individual and group showings'
        ],
        'Property Search': [
          'Host rental open house & property viewings',
          'Distribute rental applications & fee links',
          'Collect identification & proof of income',
          'Answer questions regarding lease terms & rules'
        ],
        'Offer': [
          'Run credit check & background verification',
          'Contact current/previous landlord references',
          'Verify employment & income (3x rent standard)',
          'Present top applicant to landlord for approval'
        ],
        'Under Contract': [
          'Draft residential lease agreement & disclosures',
          'Send lease for electronic signatures',
          'Collect security deposit & first month\'s rent',
          'Confirm tenant renter\'s insurance policy'
        ],
        'Closing': [
          'Perform move-in walkthrough inspection',
          'Complete & sign move-in condition checklist',
          'Hand over keys, fobs, and mailbox keys',
          'Provide utility transfer instructions & tenant portal login'
        ],
        'Completed': [
          'Archive executed lease & tenant application',
          'Update accounting ledger with rent & deposit',
          'Schedule 6-month property condition check',
          'Add tenant to automated rent collection system'
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
    const keywords = ['planning', 'research', 'creation', 'review', 'launch', 'monitor', 'lead', 'qualified', 'search', 'offer', 'contract', 'closing', 'logistics', 'marketing', 'execution', 'post', 'completed'];
    for (const kw of keywords) {
      if (cleanName.includes(kw)) {
        const matchedKey = listKeys.find((k) => k.toLowerCase().includes(kw));
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
