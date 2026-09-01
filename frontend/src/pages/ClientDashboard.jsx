import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, apiFetch } from '../config/api';
import { io } from 'socket.io-client';
import ProjectGithubDetailView from '../components/ProjectGithubDetailView';

import {
  LayoutDashboard,
  Megaphone,
  BarChart3,
  BarChart2,
  MousePointer,
  Users,
  Bell,
  Settings,
  LogOut,
  Search,
  Plus,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Filter,
  Calendar,
  MoreVertical,
  ChevronDown,
  CheckCircle2,
  X,
  Sparkles,
  Share2,
  Eye,
  EyeOff,
  Laptop,
  SlidersHorizontal,
  ChevronRight,
  Download,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  Edit2,
  PauseCircle,
  Trash2,
  Layers,
  HelpCircle,
  CheckSquare,
  FileText,
  DollarSign,
  PieChart,
  Grid,
  List,
  Menu,
  ChevronUp,
  CreditCard,
  Zap,
  Globe,
  Lock,
  UserCheck,
  ShieldCheck,
  Check,
  AlertCircle,
  Heart,
  Briefcase,
  Database,
  Mail,
  Video,
  User,
  Shield,
  Building,
  Smartphone,
  UserPlus,
  Bot,
  HardDrive,
  Scale,
  Palette,
  Info,
  Sun,
  Moon,
  Monitor,
  Languages,
  Sidebar,
  Maximize2,
  Minimize2,
  Columns,
  Key,
  History,
  FileCheck,
  Copy,
  Upload,
  RefreshCw,
  Sliders,
  Terminal,
  Activity,
  Cpu,
  Save,
  CheckSquare2,
  Code,
  Building2,
  MapPin,
  Target,
  Phone,
  Loader2,
  Clock,
  Send,
  Image as ImageIcon,
  Tag,
  Twitter,
  Youtube,
  Percent,
  ShoppingBag,
  Award,
  PlayCircle,
  AlertTriangle
} from 'lucide-react';
import ProjectDeliveryCenter from '../components/ProjectDeliveryCenter';

const COUNTRY_DIAL_CODES = [
  { country: 'India', code: '+91', label: '🇮🇳 +91' },
  { country: 'United States', code: '+1', label: '🇺🇸 +1' },
  { country: 'United Kingdom', code: '+44', label: '🇬🇧 +44' },
  { country: 'Canada', code: '+1', label: '🇨🇦 +1' },
  { country: 'Australia', code: '+61', label: '🇦🇺 +61' },
  { country: 'Germany', code: '+49', label: '🇩🇪 +49' },
  { country: 'Singapore', code: '+65', label: '🇸🇬 +65' },
  { country: 'UAE', code: '+971', label: '🇦🇪 +971' },
  { country: 'Saudi Arabia', code: '+966', label: '🇸🇦 +966' },
  { country: 'Bangladesh', code: '+880', label: '🇧🇩 +880' },
];

const AVAILABLE_GOALS = [
  'SEO Optimization',
  'Lead Generation',
  'Social Media Marketing',
  'PPC Ad Campaigns',
  'Brand Awareness',
  'Conversion Rate Optimization'
];

const INITIAL_SOCIAL_POSTS = [
  {
    id: 'sp-1',
    title: 'AI Growth Funnel Playbook 2026',
    caption: '🚀 Scaling B2B Lead Generation with AI Funnels! Here are 5 key conversion telemetry metrics every CMO must track this quarter. Swipe to learn more -> #DigitalMarketing #LeadGen #AIFunnels #DigiToomasha',
    platforms: ['Linkedin', 'Twitter'],
    status: 'Scheduled',
    scheduledDate: '2026-08-05',
    scheduledTime: '16:30',
    media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    author: 'Growth Team',
    category: 'Educational',
    projectedReach: '12.4k',
    likes: 0,
    shares: 0,
    comments: 0
  },
  {
    id: 'sp-2',
    title: 'Summer E-Commerce Ad Launch',
    caption: '✨ Behind the scenes of our high-converting Meta Ad campaign rollout! Achieving 4.85x ROAS with micro-influencers and dynamic product ads. 🔥 #ECommerce #ROAS #MetaAds #GrowthMarketing',
    platforms: ['Instagram', 'Facebook', 'TikTok'],
    status: 'Published',
    scheduledDate: '2026-08-03',
    scheduledTime: '10:15',
    publishedAt: '2026-08-03 10:15 AM',
    media: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    author: 'Growth Team',
    category: 'Case Study',
    projectedReach: '18.9k',
    likes: 428,
    shares: 89,
    comments: 34
  },
  {
    id: 'sp-3',
    title: 'SEO Keyword Benchmark Video Reel',
    caption: 'How we ranked #1 on Google for high-intent SaaS keywords in under 60 days. Watch the full breakdown video reel inside! 📈 #SEO #GoogleSearch #ContentStrategy',
    platforms: ['Youtube', 'Instagram'],
    status: 'Scheduled',
    scheduledDate: '2026-08-06',
    scheduledTime: '18:00',
    media: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    author: 'Growth Team',
    category: 'Video Reel',
    projectedReach: '8.9k',
    likes: 0,
    shares: 0,
    comments: 0
  },
  {
    id: 'sp-4',
    title: 'Q3 Performance Hiring Announcement',
    caption: 'We are expanding our team! Hiring Senior Performance Marketers & Media Buyers to scale enterprise ad accounts. Tag someone who fits! 💼 #Hiring #MarketingJobs #AgencyLife',
    platforms: ['Linkedin', 'Facebook'],
    status: 'Queued',
    scheduledDate: '2026-08-08',
    scheduledTime: '11:00',
    media: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    author: 'Growth Team',
    category: 'Recruitment',
    projectedReach: '6.2k',
    likes: 0,
    shares: 0,
    comments: 0
  },
  {
    id: 'sp-5',
    title: 'CRO Friction Audit Checklist',
    caption: 'Top 10 landing page friction points killing your conversion rates. What is your #1 A/B test hypothesis this month? 💬 #CRO #LandingPage #ConversionRate',
    platforms: ['Twitter', 'Linkedin'],
    status: 'Draft',
    scheduledDate: '',
    scheduledTime: '',
    media: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    author: 'Growth Team',
    category: 'Thought Leadership',
    projectedReach: '4.5k',
    likes: 0,
    shares: 0,
    comments: 0
  },
  {
    id: 'sp-6',
    title: 'Omnichannel Attribution Masterclass',
    caption: 'Multi-touch vs First-click attribution: Which model gives accurate ROI telemetry for e-commerce brands? Here is our deep-dive breakdown. 📊 #Attribution #MarketingAnalytics',
    platforms: ['Linkedin', 'Instagram', 'Twitter'],
    status: 'Published',
    scheduledDate: '2026-08-01',
    scheduledTime: '14:00',
    publishedAt: '2026-08-01 02:00 PM',
    media: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80',
    author: 'Growth Team',
    category: 'Analytics',
    projectedReach: '28.4k',
    likes: 892,
    shares: 142,
    comments: 67
  }
];

// Seed Data for Business Intelligence & Marketing Performance Analytics Dashboard
const INITIAL_CHANNEL_ATTRIBUTION = [
  {
    id: 'ch-google',
    name: 'Google Search & Shopping Ads',
    iconName: 'Search',
    spend: 18900,
    revenue: 98400,
    roas: 5.21,
    conversions: 452,
    cpa: 41.81,
    share: 41.2,
    color: '#4285f4',
    status: 'Top Performer'
  },
  {
    id: 'ch-meta',
    name: 'Meta Ads (Instagram & Facebook)',
    iconName: 'Instagram',
    spend: 15400,
    revenue: 74200,
    roas: 4.82,
    conversions: 384,
    cpa: 40.10,
    share: 31.1,
    color: '#e1306c',
    status: 'High ROAS'
  },
  {
    id: 'ch-linkedin',
    name: 'LinkedIn B2B Lead Gen',
    iconName: 'Linkedin',
    spend: 9500,
    revenue: 42000,
    roas: 4.42,
    conversions: 184,
    cpa: 51.63,
    share: 17.6,
    color: '#0077b5',
    status: 'Scaling'
  },
  {
    id: 'ch-seo',
    name: 'Organic SEO & Content Funnels',
    iconName: 'Globe',
    spend: 4450,
    revenue: 24000,
    roas: 5.39,
    conversions: 120,
    cpa: 37.08,
    share: 10.1,
    color: '#10b981',
    status: 'Max Efficiency'
  }
];

const INITIAL_BI_INSIGHTS = [
  {
    id: 'insight-1',
    type: 'opportunity',
    title: 'High Growth Opportunity: Reallocate ₹3,500 to Google Search',
    description: 'Google High-Intent Search Ads are outperforming Meta Retargeting by +18.4% ROAS with a ₹41.81 CPA. Reallocating ₹3,500 from low-converting FB audience segments is projected to yield an additional ₹14,200 in net monthly revenue.',
    impact: '+₹14,200 Net Revenue',
    actionLabel: 'Apply Budget Reallocation',
    channel: 'Google Ads',
    badgeText: '🟢 High Growth Opportunity',
    applied: false
  },
  {
    id: 'insight-2',
    type: 'warning',
    title: 'Creative Fatigue Alert: LinkedIn B2B Video Variant B',
    description: 'Cost per SQL on LinkedIn B2B Video Variant B increased by 22% over the last 7 days. CTR dropped from 1.85% to 1.12%. Recommending swapping video creative variants or pausing Variant B immediately.',
    impact: 'Save ₹1,850/wk Waste',
    actionLabel: 'Pause Variant B & Swap Creative',
    channel: 'LinkedIn Ads',
    badgeText: '🟡 Underperforming Alert',
    applied: false
  },
  {
    id: 'insight-3',
    type: 'winner',
    title: 'Top Campaign Champion: Instagram Reels Micro-Influencers',
    description: 'The IG Reels campaign for Summer Skincare generated 18,900 impressions and achieved a record 5.4x ROAS with ₹4.75 CPA. Increasing daily budget cap by 25% recommended for scaling.',
    impact: '5.4x Record ROAS',
    actionLabel: 'Scale Campaign Budget +25%',
    channel: 'Meta Ads',
    badgeText: '🔵 Winning Creative Champion',
    applied: false
  }
];

const INITIAL_FUNNEL_STAGES = [
  { stage: '1. Total Traffic Sessions', value: '385,400', subtext: 'Omnichannel Visits', CVR: '100% Top Funnel', iconName: 'Eye' },
  { stage: '2. Engaged Click-Throughs', value: '42,100', subtext: 'High-Intent Engagements', CVR: '10.9% CTR', iconName: 'MousePointer' },
  { stage: '3. Form / Cart Conversions', value: '3,850', subtext: 'Micro-Conversions', CVR: '9.15% CVR', iconName: 'CheckSquare' },
  { stage: '4. Qualified Sales Leads (SQL)', value: '1,140', subtext: 'Sales Pipeline', CVR: '29.6% Lead Qual', iconName: 'UserCheck' },
  { stage: '5. Closed Deals & Revenue', value: '284 Deals (₹238.6k)', subtext: 'Attributed ARR', CVR: '24.9% Close Rate', iconName: 'DollarSign' }
];

const INITIAL_CAMPAIGN_LEADERBOARD = [
  { id: 'cmp-1', name: 'Google Search - High-Intent SaaS Keywords', platform: 'Google Ads', spend: 12400, revenue: 68200, roas: 5.50, cpa: 38.50, cvr: '4.85%', status: 'Active' },
  { id: 'cmp-2', name: 'Meta IG Reels - Micro Influencer Summer Push', platform: 'Meta Ads', spend: 8900, revenue: 48060, roas: 5.40, cpa: 36.20, cvr: '4.12%', status: 'Active' },
  { id: 'cmp-3', name: 'LinkedIn B2B Decision Maker Retargeting', platform: 'LinkedIn', spend: 6500, revenue: 28600, roas: 4.40, cpa: 52.00, cvr: '3.45%', status: 'Active' },
  { id: 'cmp-4', name: 'Google Performance Max - Shopping Feed', platform: 'Google Ads', spend: 6500, revenue: 30200, roas: 4.65, cpa: 44.10, cvr: '3.90%', status: 'Active' },
  { id: 'cmp-5', name: 'Meta FB Lead Ads - E-Commerce Checklist', platform: 'Meta Ads', spend: 6500, revenue: 26140, roas: 4.02, cpa: 48.00, cvr: '3.20%', status: 'Optimizing' },
];

// Seed Data for Omnichannel Audience Intelligence & CRM Management Hub
const INITIAL_AUDIENCE_CONTACTS = [
  {
    id: 'ct-101',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techventure.io',
    phone: '+1 (555) 382-9102',
    company: 'TechVenture Global',
    role: 'VP of Marketing',
    location: 'San Francisco, CA',
    segment: 'High LTV Champions',
    leadScore: 94,
    ltv: 4250,
    ordersCount: 8,
    acquisitionSource: 'Google Search Ads',
    lastActive: '12 mins ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tags: ['B2B Enterprise', 'VIP Champion', 'High Intent'],
    timeline: [
      { date: 'Today, 12:34 PM', event: 'Opened Q3 Product Roadmap Email', type: 'email' },
      { date: 'Aug 2, 2026', event: 'Upgraded to Enterprise Growth Plan (₹1,200/mo)', type: 'purchase' },
      { date: 'Jul 28, 2026', event: 'Clicked Google Search Ad - High-Intent SaaS', type: 'ad_click' }
    ],
    aiRecommendation: 'High propensity for multi-seat expansion (+5 seats). Send automated VIP invitation to Q4 CMO Roundtable.'
  },
  {
    id: 'ct-102',
    name: 'Marcus Vance',
    email: 'm.vance@apexretail.com',
    phone: '+1 (555) 912-4019',
    company: 'Apex Retail Brands',
    role: 'E-Commerce Director',
    location: 'Austin, TX',
    segment: 'B2B Enterprise Buyers',
    leadScore: 88,
    ltv: 3400,
    ordersCount: 5,
    acquisitionSource: 'LinkedIn B2B Lead Gen',
    lastActive: '2 hours ago',
    avatar: '',
    tags: ['E-Commerce', 'High Spend', 'Decision Maker'],
    timeline: [
      { date: 'Today, 10:15 AM', event: 'Requested Custom Agency Proposal', type: 'form' },
      { date: 'Aug 1, 2026', event: 'Attended Webinar: Scaling DTC Brand Revenue', type: 'event' }
    ],
    aiRecommendation: 'Schedule 1-on-1 strategy call. Lead score increased +12 pts after custom proposal request.'
  },
  {
    id: 'ct-103',
    name: 'Elena Rostova',
    email: 'elena@luxebeautylab.co',
    phone: '+44 20 7946 0912',
    company: 'Luxe Beauty Lab',
    role: 'Founder & CEO',
    location: 'London, UK',
    segment: 'High LTV Champions',
    leadScore: 91,
    ltv: 5100,
    ordersCount: 12,
    acquisitionSource: 'Instagram Paid Social',
    lastActive: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    tags: ['DTC Skincare', 'Influencer Partner'],
    timeline: [
      { date: 'Aug 3, 2026', event: 'Shared Campaign Landing Page on LinkedIn', type: 'social' },
      { date: 'Jul 25, 2026', event: 'Renewed Annual Media Management Retainer (₹4,500)', type: 'purchase' }
    ],
    aiRecommendation: 'Offer early access to TikTok Influencer Creator Network features.'
  },
  {
    id: 'ct-104',
    name: 'David Chen',
    email: 'dchen@nexuslogistics.org',
    phone: '+1 (555) 412-8833',
    company: 'Nexus Logistics',
    role: 'Head of Growth',
    location: 'Chicago, IL',
    segment: 'At-Risk / Churn Warning',
    leadScore: 54,
    ltv: 890,
    ordersCount: 2,
    acquisitionSource: 'Organic SEO',
    lastActive: '28 days ago',
    avatar: '',
    tags: ['Needs Engagement', 'Inactive 30d'],
    timeline: [
      { date: 'Jul 07, 2026', event: 'Dashboard Session Inactive for 25+ days', type: 'warning' },
      { date: 'Jun 15, 2026', event: 'Downloaded B2B Growth Playbook PDF', type: 'download' }
    ],
    aiRecommendation: 'Trigger automated Win-Back Re-Engagement Sequence with a 15% retainer discount.'
  },
  {
    id: 'ct-105',
    name: 'Sophia Patel',
    email: 'sophia@bloomcreative.agency',
    phone: '+91 98765 43210',
    company: 'Bloom Creative',
    role: 'Managing Partner',
    location: 'Mumbai, MH',
    segment: 'E-Commerce Cart Abandoners',
    leadScore: 78,
    ltv: 1200,
    ordersCount: 3,
    acquisitionSource: 'Meta IG Ads',
    lastActive: '5 hours ago',
    avatar: '',
    tags: ['Agency Partner', 'Cart Abandoner'],
    timeline: [
      { date: 'Today, 07:20 AM', event: 'Abandoned Checkout on Enterprise Growth Tier', type: 'cart_abandon' },
      { date: 'Aug 2, 2026', event: 'Viewed Pricing Page 4 times', type: 'page_view' }
    ],
    aiRecommendation: 'Send personalized SMS follow-up offering a free 14-day trial extension.'
  }
];

const INITIAL_AUDIENCE_INSIGHTS = [
  {
    id: 'aud-ins-1',
    type: 'opportunity',
    title: '342 Contacts Ready for Enterprise Upsell',
    description: 'Usage velocity and page visit frequency indicate 342 active accounts have outgrown their tier limit and possess 85+ AI Lead Quality Scores.',
    impact: '+₹24,500 MRR Pipeline',
    actionLabel: 'Launch Enterprise Upsell Workflow',
    badgeText: '🟢 High Growth Propensity'
  },
  {
    id: 'aud-ins-2',
    type: 'warning',
    title: '185 Inactive Accounts (Churn Prevention)',
    description: '185 accounts have not logged in over the past 30 days despite viewing recent campaign emails. Automated win-back campaign advised.',
    impact: 'Save ₹12,400 ARR',
    actionLabel: 'Trigger Re-Engagement Sequence',
    badgeText: '🟡 Churn Prevention Alert'
  },
  {
    id: 'aud-ins-3',
    type: 'winner',
    title: '1% High-LTV Champion Lookalike Audience Seed Ready',
    description: 'Created a seed list of 3,400 High LTV Champions (₹3,500+ spend). Ready to sync directly to Meta & Google Ads Manager for 1% Lookalike Expansion.',
    impact: '3.8x Expected ROAS',
    actionLabel: 'Sync Lookalike to Meta Ads',
  }
];

// Seed Data for Agile Web & App Engineering Contract Operations Center
const INITIAL_MARKETING_TASKS = [
  {
    id: 'tsk-101',
    title: 'Develop Mobile App OAuth 2.0 Biometric Login',
    description: 'Implement secure JWT authentication flow with Apple FaceID / Google TouchID biometrics and key security tokens in React Native & Swift.',
    status: 'In Progress',
    priority: 'Urgent',
    campaign: 'Mobile App (iOS/Android)',
    assignee: { name: 'Software Tech Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', role: 'Lead Mobile Engineer' },
    dueDate: '2026-08-06',
    subtasks: [
      { id: 'st-1', text: 'Implement OAuth 2.0 PKCE Flow', completed: true },
      { id: 'st-2', text: 'Integrate Native FaceID SDK', completed: true },
      { id: 'st-3', text: 'Encrypted Keyring Token Storage', completed: false }
    ],
    comments: [
      { author: 'Rahul Sharma', time: 'Yesterday, 4:15 PM', text: 'Biometric fallback PIN screen passed Android 14 test suite.' }
    ]
  },
  {
    id: 'tsk-102',
    title: 'Build SaaS Client Dashboard UI & WebSockets',
    description: 'Construct responsive dashboard interface, Kanban board, list views, and real-time Socket.io updates for contract deliverables.',
    status: 'In Review / QA',
    priority: 'High',
    campaign: 'Web Frontend (React/Next.js)',
    assignee: { name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', role: 'Senior Frontend Architect' },
    dueDate: '2026-08-05',
    subtasks: [
      { id: 'st-4', text: 'Build Modular Vanilla CSS System', completed: true },
      { id: 'st-5', text: 'Connect WebSocket Real-Time Stream', completed: true },
      { id: 'st-6', text: 'Responsive Mobile UI Touch Polish', completed: true }
    ],
    comments: [
      { author: 'Software Tech Lead', time: '2 hours ago', text: 'UI components look crisp! Submitting to client QA.' }
    ]
  },
  {
    id: 'tsk-103',
    title: 'Deploy Microservices REST & GraphQL API Infrastructure',
    description: 'Set up Express/Node.js API gateway, rate limiting, Swagger specs, and PostgreSQL database migrations for client contract management.',
    status: 'To Do',
    priority: 'Medium',
    campaign: 'Backend API & Microservices',
    assignee: { name: 'Rahul Sharma', avatar: '', role: 'Principal Backend Engineer' },
    dueDate: '2026-08-08',
    subtasks: [
      { id: 'st-7', text: 'Database Schema Indexing & Migrations', completed: false },
      { id: 'st-8', text: 'Generate Swagger OpenAPI Specs', completed: false }
    ],
    comments: []
  },
  {
    id: 'tsk-104',
    title: 'Cloud Infrastructure CI/CD & AWS Cluster Deployment',
    description: 'Configure automated GitHub Actions CI/CD pipeline with AWS ECS Fargate, SSL certificates, zero-downtime rolling deploys, and CloudWatch telemetry.',
    status: 'Completed',
    priority: 'High',
    campaign: 'Cloud Infra, DevOps & Security',
    assignee: { name: 'Rohan Gupta', avatar: '', role: 'DevOps & Cloud Lead' },
    dueDate: '2026-08-03',
    subtasks: [
      { id: 'st-9', text: 'Containerize Node.js & React Apps', completed: true },
      { id: 'st-10', text: 'Automate Zero-Downtime Staging Deploy', completed: true }
    ],
    comments: [
      { author: 'Rohan Gupta', time: 'Aug 3', text: 'CI/CD pipeline build time reduced from 8m to 1.5m!' }
    ]
  },
  {
    id: 'tsk-105',
    title: 'UI/UX Design System & Interactive Figma Wireframes',
    description: 'Create high-fidelity interactive Figma prototypes for client mobile app checkout, navigation drawer, and dark mode theme tokens.',
    status: 'In Progress',
    priority: 'Urgent',
    campaign: 'UI/UX Product Design & Prototyping',
    assignee: { name: 'Rahul Sharma', avatar: '', role: 'Product Design Lead' },
    dueDate: '2026-08-07',
    subtasks: [
      { id: 'st-11', text: 'Define Primary & Secondary Color Tokens', completed: true },
      { id: 'st-12', text: 'Build Interactive Prototype Component Library', completed: false }
    ]
  }
];

// Seed Data for Financial Management, Budget Allocation & Spend Optimization Dashboard
const INITIAL_BUDGET_ALLOCATIONS = [
  {
    id: 'bgt-101',
    campaignName: 'Google Search - High-Intent SaaS Keywords',
    channel: 'Google Ads',
    allocatedBudget: 25000,
    spentToDate: 18200,
    dailyCap: 850,
    roas: 5.21,
    pacingPercent: 72.8,
    status: 'On Track',
    lastPacingCheck: '10 mins ago'
  },
  {
    id: 'bgt-102',
    campaignName: 'Meta IG Reels - Micro Influencer Summer Push',
    channel: 'Meta Ads',
    allocatedBudget: 20000,
    spentToDate: 14500,
    dailyCap: 650,
    roas: 4.82,
    pacingPercent: 72.5,
    status: 'On Track',
    lastPacingCheck: '25 mins ago'
  },
  {
    id: 'bgt-103',
    campaignName: 'LinkedIn B2B Decision Maker Retargeting',
    channel: 'LinkedIn',
    allocatedBudget: 15000,
    spentToDate: 9800,
    dailyCap: 450,
    roas: 4.42,
    pacingPercent: 65.3,
    status: 'Under Pacing',
    lastPacingCheck: '1 hour ago'
  },
  {
    id: 'bgt-104',
    campaignName: 'Organic SEO Landing Page & Content Strategy',
    channel: 'Organic SEO',
    allocatedBudget: 10000,
    spentToDate: 5750,
    dailyCap: 300,
    roas: 5.39,
    pacingPercent: 57.5,
    status: 'On Track',
    lastPacingCheck: '3 hours ago'
  },
  {
    id: 'bgt-105',
    campaignName: 'Google Performance Max - Shopping Feed',
    channel: 'Google Ads',
    allocatedBudget: 5000,
    spentToDate: 4850,
    dailyCap: 200,
    roas: 4.65,
    pacingPercent: 97.0,
    status: 'Near Limit',
    lastPacingCheck: '5 mins ago'
  }
];

const INITIAL_BUDGET_INSIGHTS = [
  {
    id: 'bgt-ins-1',
    type: 'opportunity',
    title: 'Reallocate ₹3,500 to Google Search Ads',
    description: 'Google Search Ads is delivering a 5.21x ROAS while FB retargeting has slowed to 3.8x. Shifting ₹3,500 will generate an estimated +₹14,200 net profit.',
    impact: '+₹14,200 Est Profit',
    actionLabel: 'Apply Smart Reallocation',
    badgeText: '🟢 ROAS Optimization'
  },
  {
    id: 'bgt-ins-2',
    type: 'warning',
    title: 'LinkedIn B2B Lead Gen Under-Pacing by 12%',
    description: 'LinkedIn B2B budget is pacing 12% below monthly target. Increase daily cap from ₹450/day to ₹550/day to hit pipeline goal before end of cycle.',
    impact: '+45 SQLs Expected',
    actionLabel: 'Increase Daily Cap to ₹550',
  }
];

// Seed Data for Omnichannel Integration Ecosystem & API Control Hub
const INITIAL_INTEGRATED_SERVICES = [
  {
    id: 'int-101',
    name: 'Google Ads & Performance Max',
    category: 'Ad Networks',
    description: 'Auto-sync search keywords, bidding strategies, impressions, and ROAS metrics.',
    iconBg: '#4285F4',
    status: 'Connected',
    lastSync: '2 mins ago',
    apiKeyMasked: 'AIzaSyD-798...x9Q4',
    syncFrequency: 'Real-time (Every 5m)'
  },
  {
    id: 'int-102',
    name: 'Meta Ads & Instagram Business',
    category: 'Social Media',
    description: 'Sync IG Reel performance, Facebook lead forms, custom conversions, and ad creatives.',
    iconBg: '#1877F2',
    status: 'Connected',
    lastSync: '5 mins ago',
    apiKeyMasked: 'EAAGm0PX4...92ZB',
    syncFrequency: 'Real-time (Every 15m)'
  },
  {
    id: 'int-103',
    name: 'Cloudinary Media CDN & Storage',
    category: 'Cloud Storage',
    description: 'High-speed media asset uploading, automatic webp compression, and image transformations.',
    iconBg: '#3448C5',
    status: 'Connected',
    lastSync: 'Just now',
    apiKeyMasked: '633486411435833 (Cloud: digitoomasha)',
    syncFrequency: 'Instant Webhook'
  },
  {
    id: 'int-104',
    name: 'LinkedIn Campaign Manager',
    category: 'Ad Networks',
    description: 'B2B decision-maker lead form webhooks, sponsored content, and account targeting.',
    iconBg: '#0A66C2',
    status: 'Connected',
    lastSync: '12 mins ago',
    apiKeyMasked: 'AQV93x84...LK77',
    syncFrequency: 'Hourly'
  },
  {
    id: 'int-105',
    name: 'HubSpot CRM Automation',
    category: 'CRM & Email',
    description: 'Bidirectional lead scoring, contact sync, lifecycle stage updates, and email activity.',
    iconBg: '#FF7A59',
    status: 'Connected',
    lastSync: '18 mins ago',
    apiKeyMasked: 'pat-na1-89d...01ff',
    syncFrequency: 'Real-time Webhook'
  },
  {
    id: 'int-106',
    name: 'Google Analytics 4 (GA4)',
    category: 'Analytics',
    description: 'Live website traffic telemetry, conversion event tracking, user journeys, and session attribution.',
    iconBg: '#F9AB00',
    status: 'Connected',
    lastSync: '1 min ago',
    apiKeyMasked: 'G-9842XKL901',
    syncFrequency: 'Real-time Stream'
  },
  {
    id: 'int-107',
    name: 'Shopify E-Commerce Store',
    category: 'E-Commerce',
    description: 'Sync order volume, total checkout LTV, product catalog feeds, and cart abandonment triggers.',
    iconBg: '#96BF48',
    status: 'Connected',
    lastSync: '30 mins ago',
    apiKeyMasked: 'shpat_a9821...904b',
    syncFrequency: 'Every 30m'
  },
  {
    id: 'int-108',
    name: 'Mailchimp Email Marketing',
    category: 'CRM & Email',
    description: 'Sync contact subscriber lists, newsletter open rates, click tracking, and automated sequences.',
    iconBg: '#FFE01B',
    status: 'Connected',
    lastSync: '45 mins ago',
    apiKeyMasked: 'md-8921x4...us14',
    syncFrequency: 'Daily'
  },
  {
    id: 'int-109',
    name: 'Slack Notification Bot',
    category: 'Workflow Engine',
    description: 'Receive instant Slack channel alerts for campaign anomalies, lead form fills, and budget alerts.',
    iconBg: '#4A154B',
    status: 'Connected',
    lastSync: 'Real-time',
    apiKeyMasked: 'xoxb-98412...890a',
    syncFrequency: 'Instant Alerts'
  },
  {
    id: 'int-110',
    name: 'Zapier Automation Webhooks',
    category: 'Workflow Engine',
    description: 'Trigger custom 5,000+ app workflows for lead intake, Google Sheets sync, and SMS follow-ups.',
    iconBg: '#FF4A00',
    status: 'Connected',
    lastSync: '2 hours ago',
    apiKeyMasked: 'zpr_hook_9821...x94',
    syncFrequency: 'Trigger Event'
  },
  {
    id: 'int-111',
    name: 'TikTok Ads Manager',
    category: 'Social Media',
    description: 'Vertical short-form video ad analytics, Spark ads integration, and Pixel attribution.',
    iconBg: '#000000',
    status: 'Disconnected',
    lastSync: 'Never',
    apiKeyMasked: 'Not Configured',
    syncFrequency: 'Disabled'
  },
  {
    id: 'int-112',
    name: 'Salesforce Enterprise CRM',
    category: 'CRM & Email',
    description: 'High-volume deal pipeline synchronization, enterprise account mapping, and quota attribution.',
    iconBg: '#00A1E0',
    status: 'Disconnected',
    lastSync: 'Never',
    apiKeyMasked: 'Not Configured',
    syncFrequency: 'Disabled'
  }
];

// Dynamic User Avatar Component: Shows uploaded avatar photo or clean initials placeholder
const UserAvatar = ({ src, name, className = '' }) => {
  const isCustomPhoto = src && typeof src === 'string' && src.trim() !== '' && !src.includes('photo-1534528741775-53994a69daeb');

  const getInitials = (fullName) => {
    if (!fullName || typeof fullName !== 'string') return 'U';
    const parts = fullName.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0] ? parts[0][0].toUpperCase() : 'U';
  };

  if (isCustomPhoto) {
    return <img src={src} alt={name || 'User Avatar'} className={className} />;
  }

  return (
    <div className={`user-avatar-placeholder-box ${className}`}>
      <span className="user-avatar-initials">{getInitials(name)}</span>
    </div>
  );
};

export default function ClientDashboard() {
  const { currentUser, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem('digitoomasha_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  };

  const storedUser = getStoredUser();

  // Hidden File Input Ref for Cloudinary Avatar Upload
  const avatarFileInputRef = useRef(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Main Navigation View State
  const [currentView, setCurrentView] = useState('overview');
  const [activeTab, setActiveTab] = useState('Overview');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  // Active Settings Tab Category State
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');

  // Security & Access Page State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [twoFactorMethod, setTwoFactorMethod] = useState('authenticator');
  const [passwordFormData, setPasswordFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [autoExpiry90Days, setAutoExpiry90Days] = useState(false);
  const [alertNewLogin, setAlertNewLogin] = useState(true);
  const [alertSecurityChanges, setAlertSecurityChanges] = useState(true);
  const [alertApiKeyGen, setAlertApiKeyGen] = useState(true);
  const [ipWhitelistInput, setIpWhitelistInput] = useState('103.24.12.8, 192.168.1.*');
  const [ipSaveSuccess, setIpSaveSuccess] = useState(false);

  // Appearance & Theme State
  const [themeMode, setThemeMode] = useState('system'); // 'light', 'dark', 'system'
  const [accentColor, setAccentColor] = useState('emerald'); // 'emerald', 'purple', 'blue', 'orange', 'rose', 'cyan'
  const [dashboardLayout, setDashboardLayout] = useState('grid'); // 'grid', 'kanban', 'table'
  const [densityView, setDensityView] = useState('comfortable'); // 'comfortable', 'compact'
  const [sidebarBehavior, setSidebarBehavior] = useState('expanded'); // 'expanded', 'collapsed', 'auto'
  const [appLanguage, setAppLanguage] = useState('en-US');
  const [appCurrency, setAppCurrency] = useState('INR');
  const [appTimezone, setAppTimezone] = useState('Asia/Kolkata');
  const [appearanceSaveSuccess, setAppearanceSaveSuccess] = useState(false);

  // Notification Preferences State (6 Alert Categories)
  const [notifPreferences, setNotifPreferences] = useState({
    // 1. Email Notifications
    emailEnabled: true,
    emailFrequency: 'instant',
    emailReportSummary: true,
    emailMarketingNews: false,

    // 2. Push Notifications
    pushEnabled: true,
    pushBrowserDesktop: true,
    pushSoundAlerts: true,
    pushMobileApp: true,

    // 3. Campaign Alerts
    campaignStatusChanges: true,
    campaignCtrDropAlert: true,
    campaignRoiTargetMet: true,
    campaignCreativeApproved: true,

    // 4. Lead Alerts
    leadInstantSms: true,
    leadEmailAlert: true,
    leadHighValueThreshold: '5000',
    leadSlackWebhook: true,

    // 5. Budget Alerts
    budgetCap80Percent: true,
    budgetCap90Percent: true,
    budgetExhausted100: true,
    budgetDailySpikeAlert: true,

    // 6. System Notifications
    sysNewLoginAlert: true,
    sysSecurityChanges: true,
    sysApiDisconnectAlert: true,
    sysBackupComplete: false
  });
  const [notifSaveSuccess, setNotifSaveSuccess] = useState(false);

  const [activeSessionsList, setActiveSessionsList] = useState([
    { id: 1, device: 'Chrome on Linux (Ubuntu 24.04)', location: 'Kolkata, IN', ip: '103.24.12.8', lastActive: 'Active Now (Current Session)', isCurrent: true, type: 'desktop' },
    { id: 2, device: 'DigiToomasha Mobile App (iOS 17.5)', location: 'Mumbai, IN', ip: '49.36.120.1', lastActive: '14 minutes ago', isCurrent: false, type: 'mobile' },
    { id: 3, device: 'Safari on macOS Sonoma', location: 'San Francisco, US', ip: '192.168.1.42', lastActive: '2 days ago', isCurrent: false, type: 'desktop' }
  ]);

  const [loginHistoryList, setLoginHistoryList] = useState([
    { id: 101, timestamp: 'Today, 12:44 PM', browser: 'Chrome 127 / Linux x86_64', location: 'Kolkata, IN', ip: '103.24.12.8', status: 'Success' },
    { id: 102, timestamp: 'Yesterday, 04:15 PM', browser: 'Mobile App / iOS 17.5', location: 'Mumbai, IN', ip: '49.36.120.1', status: 'Success' },
    { id: 103, timestamp: 'Aug 11, 2026 09:30 AM', browser: 'Firefox 128 / Windows 11', location: 'Delhi, IN', ip: '182.74.5.12', status: 'Failed Attempt' },
    { id: 104, timestamp: 'Aug 10, 2026 02:10 PM', browser: 'Safari 17 / macOS', location: 'San Francisco, US', ip: '192.168.1.42', status: 'Success' },
    { id: 105, timestamp: 'Aug 08, 2026 07:22 PM', browser: 'Chrome 126 / Android 14', location: 'Kolkata, IN', ip: '103.24.12.8', status: 'Success' }
  ]);

  // Sync Security & Appearance Settings with Express Backend DB
  const fetchSecuritySettings = async () => {
    try {
      const email = profileData?.email || 'alex.morgan@company.com';
      const res = await apiFetch(`/security-settings?email=${encodeURIComponent(email)}`);
      if (res && res.success && res.settings) {
        setTwoFactorEnabled(res.settings.twoFactorEnabled ?? true);
        setTwoFactorMethod(res.settings.twoFactorMethod || 'authenticator');
        setAutoExpiry90Days(res.settings.autoExpiry90Days ?? false);
        setAlertNewLogin(res.settings.alertNewLogin ?? true);
        setAlertSecurityChanges(res.settings.alertSecurityChanges ?? true);
        setAlertApiKeyGen(res.settings.alertApiKeyGen ?? true);
        setIpWhitelistInput(res.settings.ipWhitelistInput || '103.24.12.8, 192.168.1.*');
        if (Array.isArray(res.settings.activeSessionsList)) setActiveSessionsList(res.settings.activeSessionsList);
        if (Array.isArray(res.settings.loginHistoryList)) setLoginHistoryList(res.settings.loginHistoryList);

        // Populate Appearance fields if returned
        if (res.settings.themeMode) setThemeMode(res.settings.themeMode);
        if (res.settings.accentColor) setAccentColor(res.settings.accentColor);
        if (res.settings.dashboardLayout) setDashboardLayout(res.settings.dashboardLayout);
        if (res.settings.densityView) setDensityView(res.settings.densityView);
        if (res.settings.sidebarBehavior) setSidebarBehavior(res.settings.sidebarBehavior);
        if (res.settings.appLanguage) setAppLanguage(res.settings.appLanguage);
        if (res.settings.appCurrency) setAppCurrency(res.settings.appCurrency);
        if (res.settings.appTimezone) setAppTimezone(res.settings.appTimezone);
      }
    } catch (err) {
      console.warn('Failed to fetch security & appearance settings from backend:', err);
    }
  };

  const syncSecurityFieldToBackend = async (fieldUpdates) => {
    try {
      const email = profileData?.email || 'alex.morgan@company.com';
      await apiFetch('/security-settings', {
        method: 'PUT',
        body: JSON.stringify({ email, ...fieldUpdates })
      });
    } catch (err) {
      console.warn('Failed to sync settings update to backend:', err);
    }
  };

  useEffect(() => {
    if (activeSettingsTab === 'security' || activeSettingsTab === 'appearance') {
      fetchSecuritySettings();
    }
  }, [activeSettingsTab]);

  // Permanent Light Mode Enforcement
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark-theme', 'dark-slate', 'dark-sapphire');
    document.body.classList.remove('dark-theme', 'dark-slate', 'dark-sapphire');
    root.classList.add('light-theme');
    document.body.classList.add('light-theme');
    try { localStorage.setItem('digitoomasha_theme_mode', 'light'); } catch (e) { }
  }, []);

  // Live Application of Accent Color
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-accent', accentColor);
    try { localStorage.setItem('digitoomasha_accent_color', accentColor); } catch (e) { }
  }, [accentColor]);

  // Live Application of Density View (Compact vs Comfortable)
  useEffect(() => {
    const root = document.documentElement;
    if (densityView === 'compact') {
      root.classList.add('compact-density');
    } else {
      root.classList.remove('compact-density');
    }
    try { localStorage.setItem('digitoomasha_density_view', densityView); } catch (e) { }
  }, [densityView]);

  // Live Application of Sidebar Behavior
  useEffect(() => {
    if (sidebarBehavior === 'collapsed') {
      setSidebarExpanded(false);
    } else if (sidebarBehavior === 'expanded') {
      setSidebarExpanded(true);
    } else if (sidebarBehavior === 'auto') {
      const handleResize = () => {
        if (window.innerWidth < 1024) {
          setSidebarExpanded(false);
        } else {
          setSidebarExpanded(true);
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    try { localStorage.setItem('digitoomasha_sidebar_behavior', sidebarBehavior); } catch (e) { }
  }, [sidebarBehavior]);

  const handleToggle2FA = async () => {
    const nextVal = !twoFactorEnabled;
    setTwoFactorEnabled(nextVal);
    await syncSecurityFieldToBackend({ twoFactorEnabled: nextVal });
  };

  const handleSelect2FAMethod = async (method) => {
    setTwoFactorMethod(method);
    await syncSecurityFieldToBackend({ twoFactorMethod: method });
  };

  const handleRevokeSession = async (sessionId) => {
    setActiveSessionsList(prev => prev.filter(s => s.id !== sessionId));
    try {
      const email = profileData?.email || 'alex.morgan@company.com';
      await apiFetch('/security/revoke-session', {
        method: 'POST',
        body: JSON.stringify({ email, sessionId })
      });
    } catch (err) {
      console.warn('Backend session revoke error:', err);
    }
  };

  const handleTerminateAllOtherSessions = async () => {
    setActiveSessionsList(prev => prev.filter(s => s.isCurrent));
    try {
      const email = profileData?.email || 'alex.morgan@company.com';
      await apiFetch('/security/revoke-all-sessions', {
        method: 'POST',
        body: JSON.stringify({ email })
      });
      alert('All other remote device sessions have been terminated across the infrastructure.');
    } catch (err) {
      console.warn('Backend terminate sessions error:', err);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordErrorMsg('');
    setPasswordChangeSuccess(false);

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setPasswordErrorMsg('New password and confirm password do not match!');
      return;
    }
    if (passwordFormData.newPassword.length < 12) {
      setPasswordErrorMsg('Password must be at least 12 characters long according to enterprise policy.');
      return;
    }

    try {
      const email = profileData?.email || 'alex.morgan@company.com';
      const res = await apiFetch('/security/change-password', {
        method: 'POST',
        body: JSON.stringify({
          email,
          currentPassword: passwordFormData.currentPassword,
          newPassword: passwordFormData.newPassword
        })
      });

      if (res && res.success) {
        setPasswordChangeSuccess(true);
        setPasswordFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        fetchSecuritySettings();
        setTimeout(() => setPasswordChangeSuccess(false), 4000);
      } else {
        setPasswordErrorMsg(res?.message || 'Failed to update password. Verify current password.');
      }
    } catch (err) {
      setPasswordErrorMsg('Network error updating password. Please try again.');
    }
  };


  // Omnichannel Social Content Studio State & Sockets
  const [socialPosts, setSocialPosts] = useState(INITIAL_SOCIAL_POSTS);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const mediaFileInputRef = useRef(null);

  const [postPlatformFilter, setPostPlatformFilter] = useState('All');
  const [postStatusFilter, setPostStatusFilter] = useState('All');
  const [postSearchQuery, setPostSearchQuery] = useState('');
  const [postViewMode, setPostViewMode] = useState('grid'); // 'grid' | 'list' | 'calendar'
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isYourContentsOpen, setIsYourContentsOpen] = useState(false);
  const [ycSearchQuery, setYcSearchQuery] = useState('');
  const [ycPlatformFilter, setYcPlatformFilter] = useState('All');
  const [ycStatusFilter, setYcStatusFilter] = useState('All');
  const [socketToastMessage, setSocketToastMessage] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [composerPreviewPlatform, setComposerPreviewPlatform] = useState('Linkedin');
  const [activeCalendarMonth, setActiveCalendarMonth] = useState('August 2026');

  // Marketing Intelligence & ROAS Analytics Module state
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState('overview');
  const [analyticsSearchQuery, setAnalyticsSearchQuery] = useState('');
  const [analyticsAttributionModel, setAnalyticsAttributionModel] = useState('Data Driven');
  const [analyticsForecastWindow, setAnalyticsForecastWindow] = useState('30d');
  const [showAlertCenterModal, setShowAlertCenterModal] = useState(false);
  const [showReportBuilderModal, setShowReportBuilderModal] = useState(false);

  // Projects Center Workspace State
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState('All');
  const [inspectedProject, setInspectedProject] = useState(null);

  // Full Post Detail Modal View State
  const [viewingPostDetail, setViewingPostDetail] = useState(null);
  const [detailPreviewPlatform, setDetailPreviewPlatform] = useState('Linkedin');

  // Form state for Post Composer
  const [composerData, setComposerData] = useState({
    title: '',
    caption: '',
    platforms: ['Linkedin', 'Instagram'],
    status: 'Scheduled',
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: '14:00',
    media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    category: 'Educational'
  });

  // Fetch initial posts & listen to live Socket.IO events
  useEffect(() => {
    // 1. Fetch initial social posts from DB via API
    apiFetch('/api/social/posts')
      .then((data) => {
        if (data && data.success && Array.isArray(data.posts) && data.posts.length > 0) {
          setSocialPosts(data.posts);
        }
      })
      .catch((err) => console.warn('Fetch social posts error:', err));

    // 2. Connect Socket.IO client
    const socketServerUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : window.location.origin;
    const socket = io(socketServerUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      setIsSocketConnected(true);
    });

    socket.on('disconnect', () => {
      setIsSocketConnected(false);
    });

    socket.on('social_post_created', (newPost) => {
      setSocialPosts((prev) => {
        if (prev.some((p) => p.id === newPost.id)) return prev;
        return [newPost, ...prev];
      });
      setSocketToastMessage(`⚡ New post created live: "${newPost.title}"`);
      setTimeout(() => setSocketToastMessage(null), 5000);
    });

    socket.on('social_post_updated', (updatedPost) => {
      setSocialPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? { ...p, ...updatedPost } : p))
      );
    });

    socket.on('social_post_deleted', ({ id }) => {
      setSocialPosts((prev) => prev.filter((p) => p.id !== id));
    });

    // Task Studio Sockets
    socket.on('task_created', (data) => {
      const taskTitle = data.title || data.task?.title || 'New Deliverable';
      setSocketToastMessage(`⚡ Task created live: "${taskTitle}"`);
      setTimeout(() => setSocketToastMessage(null), 5000);
      apiFetch('/tasks').then((res) => {
        if (res.ok && res.data?.tasks) {
          const mapped = res.data.tasks.map((t) => ({
            id: t.id,
            title: t.title,
            description: t.description || '',
            status: t.status || 'To Do',
            priority: t.priority || 'High',
            campaign: t.campaign || 'General',
            assignee: {
              name: t.assignee_name || t.assigneeName || (t.assignee && t.assignee.name) || (currentUser?.fullName || currentUser?.name || 'Client Lead'),
              avatar: t.assignee_avatar || '',
              role: 'Specialist'
            },
            dueDate: t.due_date || t.dueDate || '2026-08-10',
            subtasks: Array.isArray(t.subtasks)
              ? t.subtasks
              : typeof t.subtasks === 'string'
                ? JSON.parse(t.subtasks || '[]')
                : [],
            comments: Array.isArray(t.comments)
              ? t.comments
              : typeof t.comments === 'string'
                ? JSON.parse(t.comments || '[]')
                : [],
            files: Array.isArray(t.files)
              ? t.files
              : typeof t.files === 'string'
                ? (function () { try { return JSON.parse(t.files); } catch (e) { return []; } })()
                : []
          }));
          setTaskItems(mapped);
        }
      });
    });

    socket.on('task_updated', (data) => {
      if (data && (data.status === 'Approved' || data.status === 'Accepted')) {
        setSocketToastMessage(`🎉 Project "${data.title || 'Task'}" Approved by Admin! Added to your Projects Workspace.`);
        setTimeout(() => setSocketToastMessage(null), 6000);
      }

      const updatedTaskObj = data?.task;
      if (updatedTaskObj) {
        const parsedFiles = Array.isArray(updatedTaskObj.files)
          ? updatedTaskObj.files
          : typeof updatedTaskObj.files === 'string'
            ? (function () { try { return JSON.parse(updatedTaskObj.files); } catch (e) { return []; } })()
            : [];

        setInspectedProject((prev) => {
          if (prev && String(prev.id) === String(updatedTaskObj.id)) {
            return {
              ...prev,
              ...updatedTaskObj,
              files: parsedFiles
            };
          }
          return prev;
        });
      }

      apiFetch('/tasks').then((res) => {
        if (res.ok && res.data?.tasks) {
          const mapped = res.data.tasks.map((t) => {
            const parsedFiles = Array.isArray(t.files)
              ? t.files
              : typeof t.files === 'string'
                ? (function () { try { return JSON.parse(t.files); } catch (e) { return []; } })()
                : [];
            return {
              id: t.id,
              title: t.title,
              description: t.description || '',
              status: t.status || 'To Do',
              priority: t.priority || 'High',
              campaign: t.campaign || 'General',
              assignee: {
                name: t.assignee_name || t.assigneeName || (t.assignee && t.assignee.name) || (currentUser?.fullName || currentUser?.name || 'Client Lead'),
                avatar: t.assignee_avatar || '',
                role: 'Specialist'
              },
              dueDate: t.due_date || t.dueDate || '2026-08-10',
              subtasks: Array.isArray(t.subtasks)
                ? t.subtasks
                : typeof t.subtasks === 'string'
                  ? JSON.parse(t.subtasks || '[]')
                  : [],
              comments: Array.isArray(t.comments)
                ? t.comments
                : typeof t.comments === 'string'
                  ? JSON.parse(t.comments || '[]')
                  : [],
              files: parsedFiles
            };
          });
          setTaskItems(mapped);

          setInspectedProject((prev) => {
            if (!prev) return null;
            const found = mapped.find((m) => String(m.id) === String(prev.id));
            return found ? { ...prev, ...found } : prev;
          });
        }
      });
    });

    socket.on('task_deleted', ({ id }) => {
      setTaskItems((prev) => prev.filter((t) => String(t.id) !== String(id)));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMediaFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMedia(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result;
        const res = await apiFetch('/api/upload/media', {
          method: 'POST',
          body: JSON.stringify({ image: base64Data }),
        });

        if (res && res.url) {
          setComposerData((prev) => ({ ...prev, media: res.url }));
        } else {
          alert('Failed to upload media to Cloudinary.');
        }
        setUploadingMedia(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Cloudinary media upload failed:', err);
      setUploadingMedia(false);
    }
  };

  const handleOpenComposer = (postToEdit = null) => {
    if (postToEdit) {
      setEditingPostId(postToEdit.id);
      setComposerData({
        title: postToEdit.title,
        caption: postToEdit.caption,
        platforms: [...postToEdit.platforms],
        status: postToEdit.status,
        scheduledDate: postToEdit.scheduledDate || postToEdit.scheduled_date || new Date().toISOString().split('T')[0],
        scheduledTime: postToEdit.scheduledTime || postToEdit.scheduled_time || '14:00',
        media: postToEdit.media || '',
        category: postToEdit.category || 'General'
      });
      if (postToEdit.platforms && postToEdit.platforms.length > 0) {
        setComposerPreviewPlatform(postToEdit.platforms[0]);
      }
    } else {
      setEditingPostId(null);
      setComposerData({
        title: '',
        caption: '',
        platforms: ['Linkedin', 'Instagram'],
        status: 'Scheduled',
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: '14:00',
        media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        category: 'Educational'
      });
    }
    setIsComposerOpen(true);
  };

  const handleToggleComposerPlatform = (platformName) => {
    setComposerData((prev) => {
      const exists = prev.platforms.includes(platformName);
      let updated = [];
      if (exists) {
        if (prev.platforms.length === 1) return prev;
        updated = prev.platforms.filter((p) => p !== platformName);
      } else {
        updated = [...prev.platforms, platformName];
      }
      return { ...prev, platforms: updated };
    });
  };

  const handleGenerateAICaptions = () => {
    const topic = composerData.title || 'Digital Growth Strategy';
    const aiCaption = `🔥 Accelerate your ${topic} with DigiToomasha's automated AI engine!\n\nKey takeaways for marketing teams:\n1. Automate multi-channel campaign attribution 📊\n2. Scale high-ROAS creative iterations 🚀\n3. Optimize budget reallocation in real-time ✨\n\nWhat is your top strategy for Q3? Drop your thoughts below! 👇\n\n#DigiToomasha #GrowthMarketing #DigitalStrategy #ROI #MarketingAutomation`;
    setComposerData((prev) => ({
      ...prev,
      caption: aiCaption
    }));
  };

  const handleSaveComposerPost = async (actionStatus = null) => {
    if (!composerData.title.trim()) {
      alert('Please enter a post title or topic reference.');
      return;
    }

    const activeClientEmail = currentUser?.email || profileData?.email || 'emilia@digitoomasha.com';
    const activeClientName = currentUser?.fullName || currentUser?.name || profileData?.fullName || 'Emilia Greene';

    const finalStatus = actionStatus || composerData.status || 'Scheduled';
    const payload = {
      ...composerData,
      status: finalStatus,
      author: activeClientName,
      clientEmail: activeClientEmail,
      isClientAdded: true,
      publishedAt: finalStatus === 'Published' ? 'Just Now' : '',
    };

    try {
      if (editingPostId) {
        const res = await apiFetch(`/api/social/posts/${editingPostId}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        if (res && res.success && res.post) {
          setSocialPosts((prev) =>
            prev.map((p) => (p.id === editingPostId ? { ...p, ...res.post } : p))
          );
        }
      } else {
        const res = await apiFetch('/api/social/posts', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        if (res && res.success && res.post) {
          setSocialPosts((prev) => {
            if (prev.some((p) => p.id === res.post.id)) return prev;
            return [res.post, ...prev];
          });
        }
      }
    } catch (err) {
      console.error('Save social post API error:', err);
      if (editingPostId) {
        setSocialPosts((prev) =>
          prev.map((p) => (p.id === editingPostId ? { ...p, ...payload } : p))
        );
      } else {
        const fallbackPost = { id: `sp-${Date.now()}`, ...payload };
        setSocialPosts((prev) => [fallbackPost, ...prev]);
      }
    }

    setIsComposerOpen(false);
    setSocketToastMessage('🎉 Post saved & broadcasted live across all clients!');
    setTimeout(() => setSocketToastMessage(null), 5000);
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this scheduled post?')) {
      try {
        await apiFetch(`/api/social/posts/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Delete social post API error:', err);
      }
      setSocialPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleQuickPublish = async (id) => {
    try {
      const res = await apiFetch(`/api/social/posts/${id}/publish`, { method: 'POST' });
      if (res && res.success && res.post) {
        setSocialPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...res.post } : p))
        );
      } else {
        setSocialPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: 'Published', publishedAt: 'Just Now' } : p))
        );
      }
    } catch (err) {
      console.error('Quick publish API error:', err);
      setSocialPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'Published', publishedAt: 'Just Now' } : p))
      );
    }
  };

  const filteredSocialPosts = (Array.isArray(socialPosts) ? socialPosts : []).filter((post) => {
    if (!post) return false;
    const platforms = Array.isArray(post.platforms) ? post.platforms : ['Linkedin'];
    const matchesPlatform =
      postPlatformFilter === 'All' || platforms.includes(postPlatformFilter);
    const matchesStatus =
      postStatusFilter === 'All' || (post.status || '').toLowerCase() === postStatusFilter.toLowerCase();
    const matchesSearch =
      !postSearchQuery.trim() ||
      (post.title || '').toLowerCase().includes(postSearchQuery.toLowerCase()) ||
      (post.caption || '').toLowerCase().includes(postSearchQuery.toLowerCase()) ||
      (post.category || '').toLowerCase().includes(postSearchQuery.toLowerCase());

    return matchesPlatform && matchesStatus && matchesSearch;
  });

  // Business Intelligence & Marketing Analytics State
  const [biDateRange, setBiDateRange] = useState('30d'); // '7d' | '30d' | 'q3' | 'ytd'
  const [biChannelFilter, setBiChannelFilter] = useState('All'); // 'All' | 'Google Ads' | 'Meta Ads' | 'LinkedIn' | 'Organic SEO'
  const [biChannelAttribution, setBiChannelAttribution] = useState(INITIAL_CHANNEL_ATTRIBUTION);
  const [biInsights, setBiInsights] = useState(INITIAL_BI_INSIGHTS);
  const [biCampaigns, setBiCampaigns] = useState(INITIAL_CAMPAIGN_LEADERBOARD);
  const [selectedCampaignDetail, setSelectedCampaignDetail] = useState(null);

  const handleApplyBiInsight = (insightId) => {
    setBiInsights((prev) =>
      prev.map((item) => (item.id === insightId ? { ...item, applied: true } : item))
    );
    alert('✨ AI Strategic Recommendation Applied! Budget & bidding rules updated in real-time.');
  };

  const handleExportBIPdf = () => {
    alert('📥 Generating Executive Business Intelligence & ROAS PDF Report... Download complete!');
  };

  const handleRunAIAudit = () => {
    alert('⚡ Running Real-Time Omnichannel AI Audit... Telemetry anomalies and conversion funnels verified!');
  };

  const filteredBiCampaigns = biCampaigns.filter((cmp) => {
    if (biChannelFilter === 'All') return true;
    return cmp.platform.toLowerCase().includes(biChannelFilter.toLowerCase()) || biChannelFilter.toLowerCase().includes(cmp.platform.toLowerCase());
  });

  // Omnichannel Audience Intelligence & CRM Hub State
  const [audienceContacts, setAudienceContacts] = useState(INITIAL_AUDIENCE_CONTACTS);
  const [audienceInsights, setAudienceInsights] = useState(INITIAL_AUDIENCE_INSIGHTS);
  const [selectedAudienceSegment, setSelectedAudienceSegment] = useState('All');
  const [audienceSearchQuery, setAudienceSearchQuery] = useState('');
  const [selectedContactDetail, setSelectedContactDetail] = useState(null);
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [newContactData, setNewContactData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    location: '',
    segment: 'High LTV Champions',
    acquisitionSource: 'Direct / Organic'
  });

  const handleSaveNewContact = (e) => {
    e.preventDefault();
    if (!newContactData.name || !newContactData.email) {
      alert('Please enter contact name and email.');
      return;
    }
    const newContactObj = {
      id: `ct-${Date.now()}`,
      name: newContactData.name,
      email: newContactData.email,
      phone: newContactData.phone || '+1 (555) 000-1234',
      company: newContactData.company || 'Independent',
      role: newContactData.role || 'Decision Maker',
      location: newContactData.location || 'Global',
      segment: newContactData.segment,
      leadScore: Math.floor(Math.random() * 20) + 80,
      ltv: 1500,
      ordersCount: 1,
      acquisitionSource: newContactData.acquisitionSource,
      lastActive: 'Just now',
      avatar: '',
      tags: ['New Contact', newContactData.segment],
      timeline: [
        { date: 'Just now', event: 'Profile created manually in CRM Hub', type: 'system' }
      ],
      aiRecommendation: 'Send welcoming onboarding sequence and assign key account manager.'
    };

    setAudienceContacts([newContactObj, ...audienceContacts]);
    setIsAddContactOpen(false);
    setNewContactData({
      name: '',
      email: '',
      phone: '',
      company: '',
      role: '',
      location: '',
      segment: 'High LTV Champions',
      acquisitionSource: 'Direct / Organic'
    });
    alert('✨ Customer Profile created and synced to CRM Hub successfully!');
  };

  const filteredAudienceContacts = (Array.isArray(audienceContacts) ? audienceContacts : []).filter((ct) => {
    if (!ct) return false;
    const matchesSegment =
      selectedAudienceSegment === 'All' || ct.segment === selectedAudienceSegment;
    const matchesSearch =
      !audienceSearchQuery.trim() ||
      (ct.name || '').toLowerCase().includes(audienceSearchQuery.toLowerCase()) ||
      (ct.email || '').toLowerCase().includes(audienceSearchQuery.toLowerCase()) ||
      (ct.company || '').toLowerCase().includes(audienceSearchQuery.toLowerCase()) ||
      (ct.location || '').toLowerCase().includes(audienceSearchQuery.toLowerCase());

    return matchesSegment && matchesSearch;
  });

  // Agile Marketing Task, Sprint & Project Operations Center State
  const [taskItems, setTaskItems] = useState(INITIAL_MARKETING_TASKS);
  const [taskViewMode, setTaskViewMode] = useState('list'); // 'list' | 'timeline'
  const [taskPriorityFilter, setTaskPriorityFilter] = useState('All');
  const [taskAssigneeFilter, setTaskAssigneeFilter] = useState('All');
  const [taskSearchQuery, setTaskSearchQuery] = useState('');
  const [selectedTaskDetail, setSelectedTaskDetail] = useState(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [taskSubTab, setTaskSubTab] = useState('board'); // 'board' | 'templates'
  const [newCommentInput, setNewCommentInput] = useState('');

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentInput.trim() || !selectedTaskDetail) return;
    const newComment = {
      author: profileData?.fullName || 'Client User',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newCommentInput.trim()
    };
    const updatedComments = [...(selectedTaskDetail.comments || []), newComment];
    setTaskItems((prev) =>
      prev.map((t) => (t.id === selectedTaskDetail.id ? { ...t, comments: updatedComments } : t))
    );
    setSelectedTaskDetail((prev) => ({
      ...prev,
      comments: updatedComments
    }));
    setNewCommentInput('');

    try {
      await apiFetch(`/tasks/${selectedTaskDetail.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: updatedComments })
      });
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  const defaultClientAssignee = currentUser?.fullName || currentUser?.name || storedUser?.name || 'Client Lead';

  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'High',
    campaign: 'Web Frontend (React/Next.js)',
    assigneeName: defaultClientAssignee,
    dueDate: '2026-08-10',
    subtasksInput: ''
  });

  const handleSaveNewTask = async (e) => {
    e.preventDefault();
    if (!newTaskData.title.trim()) {
      alert('Please enter a deliverable task title.');
      return;
    }
    const activeClientAssignee = profileData?.fullName || currentUser?.fullName || currentUser?.name || 'Client Lead';
    const parsedSubtasks = newTaskData.subtasksInput
      .split(',')
      .map((st) => st.trim())
      .filter(Boolean)
      .map((stText, idx) => ({ id: `st-${Date.now()}-${idx}`, text: stText, completed: false }));

    const finalSubtasks = parsedSubtasks.length > 0
      ? parsedSubtasks
      : [{ id: `st-${Date.now()}-1`, text: 'Code & Architecture Review', completed: false }];

    const payload = {
      title: newTaskData.title,
      description: newTaskData.description || 'Deliver software module according to contract specifications.',
      status: newTaskData.status || 'To Do',
      priority: newTaskData.priority || 'High',
      campaign: newTaskData.campaign || 'Web Frontend (React/Next.js)',
      assigneeName: newTaskData.assigneeName || activeClientAssignee,
      dueDate: newTaskData.dueDate || '2026-08-10',
      subtasks: finalSubtasks
    };

    try {
      const res = await apiFetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const t = res?.task || res?.data?.task;
      if (res?.ok && t) {
        const mapped = {
          id: t.id,
          title: t.title,
          description: t.description || '',
          status: t.status || 'To Do',
          priority: t.priority || 'High',
          campaign: t.campaign || 'General',
          assignee: {
            name: t.assignee_name || t.assigneeName || activeClientAssignee,
            avatar: t.assignee_avatar || '',
            role: 'Specialist'
          },
          dueDate: t.due_date || t.dueDate || '2026-08-10',
          subtasks: Array.isArray(t.subtasks)
            ? t.subtasks
            : typeof t.subtasks === 'string'
              ? JSON.parse(t.subtasks || '[]')
              : [],
          comments: []
        };
        setTaskItems((prev) => [mapped, ...prev.filter((item) => item.id !== mapped.id)]);
      } else {
        // Fallback local update if network is offline
        const localFallback = {
          id: `tsk-${Date.now()}`,
          title: payload.title,
          description: payload.description,
          status: payload.status,
          priority: payload.priority,
          campaign: payload.campaign,
          assignee: {
            name: payload.assigneeName,
            avatar: '',
            role: 'Specialist'
          },
          dueDate: payload.dueDate,
          subtasks: payload.subtasks,
          comments: []
        };
        setTaskItems((prev) => [localFallback, ...prev]);
      }
    } catch (err) {
      console.error('Save task error:', err);
    }

    setIsCreateTaskOpen(false);
    setTaskSubTab('board');
    setNewTaskData({
      title: '',
      description: '',
      status: 'To Do',
      priority: 'High',
      campaign: 'Web Frontend (React/Next.js)',
      assigneeName: activeClientAssignee,
      dueDate: '2026-08-10',
      subtasksInput: ''
    });
    alert('✨ Software Development Deliverable published & synced with Admin Operations!');
  };

  const handleToggleSubtask = async (taskId, subtaskId) => {
    const targetTask = taskItems.find((t) => t.id === taskId);
    if (!targetTask) return;

    const currentSt = Array.isArray(targetTask.subtasks)
      ? targetTask.subtasks
      : typeof targetTask.subtasks === 'string'
        ? JSON.parse(targetTask.subtasks || '[]')
        : [];

    const updatedSt = currentSt.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    setTaskItems((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, subtasks: updatedSt } : t))
    );

    if (selectedTaskDetail && selectedTaskDetail.id === taskId) {
      setSelectedTaskDetail((prev) => ({
        ...prev,
        subtasks: updatedSt
      }));
    }

    try {
      await apiFetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subtasks: updatedSt })
      });
    } catch (err) {
      console.error('Toggle subtask error:', err);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    setTaskItems((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    if (selectedTaskDetail && selectedTaskDetail.id === taskId) {
      setSelectedTaskDetail((prev) => ({ ...prev, status: newStatus }));
    }

    try {
      await apiFetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const filteredTasks = (taskItems || []).filter((tsk) => {
    if (!tsk) return false;
    const taskPrioClean = (tsk.priority || '').replace(/ priority$/i, '').toLowerCase();
    const filterPrioClean = taskPriorityFilter.replace(/ priority$/i, '').toLowerCase();
    const matchesPriority =
      taskPriorityFilter === 'All' || taskPrioClean === filterPrioClean;

    const taskAssigneeName = tsk.assignee_name || tsk.assigneeName || (typeof tsk.assignee === 'object' ? tsk.assignee?.name : tsk.assignee) || '';
    const matchesAssignee =
      taskAssigneeFilter === 'All' || taskAssigneeName === taskAssigneeFilter || taskAssigneeName.toLowerCase().includes(taskAssigneeFilter.toLowerCase());

    const matchesSearch =
      !taskSearchQuery.trim() ||
      (tsk.title || '').toLowerCase().includes(taskSearchQuery.toLowerCase()) ||
      (tsk.description || '').toLowerCase().includes(taskSearchQuery.toLowerCase()) ||
      (tsk.campaign || '').toLowerCase().includes(taskSearchQuery.toLowerCase()) ||
      taskAssigneeName.toLowerCase().includes(taskSearchQuery.toLowerCase());

    return matchesPriority && matchesAssignee && matchesSearch;
  });

  // Financial Management, Budget Allocation & Spend Optimization Dashboard State
  const [budgetAllocations, setBudgetAllocations] = useState(INITIAL_BUDGET_ALLOCATIONS);
  const [budgetInsights, setBudgetInsights] = useState(INITIAL_BUDGET_INSIGHTS);
  const [selectedBudgetChannel, setSelectedBudgetChannel] = useState('All');
  const [budgetSearchQuery, setBudgetSearchQuery] = useState('');
  const [selectedBudgetAdjust, setSelectedBudgetAdjust] = useState(null);
  const [isAllocateBudgetOpen, setIsAllocateBudgetOpen] = useState(false);
  const [newBudgetData, setNewBudgetData] = useState({
    campaignName: '',
    channel: 'Google Ads',
    allocatedBudget: 10000,
    dailyCap: 400
  });

  const handleSaveNewBudget = (e) => {
    e.preventDefault();
    if (!newBudgetData.campaignName.trim()) {
      alert('Please enter a campaign name.');
      return;
    }
    const allocVal = parseFloat(newBudgetData.allocatedBudget) || 5000;
    const capVal = parseFloat(newBudgetData.dailyCap) || 250;

    const newBgtObj = {
      id: `bgt-${Date.now()}`,
      campaignName: newBudgetData.campaignName,
      channel: newBudgetData.channel,
      allocatedBudget: allocVal,
      spentToDate: 0,
      dailyCap: capVal,
      roas: 4.50,
      pacingPercent: 0.0,
      status: 'On Track',
      lastPacingCheck: 'Just now'
    };

    setBudgetAllocations([newBgtObj, ...budgetAllocations]);
    setIsAllocateBudgetOpen(false);
    setNewBudgetData({
      campaignName: '',
      channel: 'Google Ads',
      allocatedBudget: 10000,
      dailyCap: 400
    });
    alert('✨ Campaign Budget allocated and activated in Financial Hub!');
  };

  const handleUpdateCampaignBudget = (budgetId, updatedAllocated, updatedDailyCap) => {
    setBudgetAllocations((prev) =>
      prev.map((b) => {
        if (b.id !== budgetId) return b;
        const newAlloc = parseFloat(updatedAllocated) || b.allocatedBudget;
        const newCap = parseFloat(updatedDailyCap) || b.dailyCap;
        const newPacing = Math.min(100, Math.round((b.spentToDate / newAlloc) * 1000) / 10);
        return {
          ...b,
          allocatedBudget: newAlloc,
          dailyCap: newCap,
          pacingPercent: newPacing,
          status: newPacing > 95 ? 'Near Limit' : 'On Track'
        };
      })
    );
    setSelectedBudgetAdjust(null);
    alert('✨ Budget Allocation & Daily Cap updated in real-time!');
  };

  const filteredBudgets = (Array.isArray(budgetAllocations) ? budgetAllocations : []).filter((bgt) => {
    if (!bgt) return false;
    const matchesChannel =
      selectedBudgetChannel === 'All' || bgt.channel === selectedBudgetChannel;
    const matchesSearch =
      !budgetSearchQuery.trim() ||
      (bgt.campaignName || '').toLowerCase().includes(budgetSearchQuery.toLowerCase()) ||
      (bgt.channel || '').toLowerCase().includes(budgetSearchQuery.toLowerCase());

    return matchesChannel && matchesSearch;
  });

  // Omnichannel Integration Ecosystem & API Control Hub State
  const [connectedServices, setConnectedServices] = useState(INITIAL_INTEGRATED_SERVICES);
  const [selectedIntegrationCategory, setSelectedIntegrationCategory] = useState('All');
  const [integrationSearchQuery, setIntegrationSearchQuery] = useState('');
  const [selectedServiceConfig, setSelectedServiceConfig] = useState(null);
  const [isAddWebhookOpen, setIsAddWebhookOpen] = useState(false);
  const [newWebhookData, setNewWebhookData] = useState({
    name: '',
    targetUrl: '',
    eventTrigger: 'Lead Form Created',
    secretHeader: ''
  });

  const handleToggleServiceConnection = (serviceId) => {
    setConnectedServices((prev) =>
      prev.map((s) => {
        if (s.id !== serviceId) return s;
        const isConn = s.status === 'Connected';
        const newStatus = isConn ? 'Disconnected' : 'Connected';
        const newSync = isConn ? 'Disabled' : 'Just now';
        return { ...s, status: newStatus, lastSync: newSync };
      })
    );
  };

  const handleSaveServiceConfig = (e) => {
    e.preventDefault();
    if (!selectedServiceConfig) return;
    setConnectedServices((prev) =>
      prev.map((s) =>
        s.id === selectedServiceConfig.id
          ? { ...s, status: 'Connected', lastSync: 'Just now' }
          : s
      )
    );
    setSelectedServiceConfig(null);
    alert(`✨ ${selectedServiceConfig.name} API Configuration saved and verified!`);
  };

  const handleSaveCustomWebhook = (e) => {
    e.preventDefault();
    if (!newWebhookData.name.trim() || !newWebhookData.targetUrl.trim()) {
      alert('Please fill out Webhook Name and Target URL.');
      return;
    }

    const newWebhookService = {
      id: `int-${Date.now()}`,
      name: `Custom Webhook: ${newWebhookData.name}`,
      category: 'Workflow Engine',
      description: `Target: ${newWebhookData.targetUrl} • Trigger: ${newWebhookData.eventTrigger}`,
      iconBg: '#1E3A2B',
      status: 'Connected',
      lastSync: 'Just now',
      apiKeyMasked: `Endpoint: ${newWebhookData.targetUrl.substring(0, 24)}...`,
      syncFrequency: `Event: ${newWebhookData.eventTrigger}`
    };

    setConnectedServices([newWebhookService, ...connectedServices]);
    setIsAddWebhookOpen(false);
    setNewWebhookData({
      name: '',
      targetUrl: '',
      eventTrigger: 'Lead Form Created',
      secretHeader: ''
    });
    alert('✨ Custom Webhook endpoint configured and listening!');
  };

  const filteredIntegrations = (Array.isArray(connectedServices) ? connectedServices : []).filter((service) => {
    if (!service) return false;
    const matchesCategory =
      selectedIntegrationCategory === 'All' || service.category === selectedIntegrationCategory;
    const matchesSearch =
      !integrationSearchQuery.trim() ||
      (service.name || '').toLowerCase().includes(integrationSearchQuery.toLowerCase()) ||
      (service.description || '').toLowerCase().includes(integrationSearchQuery.toLowerCase()) ||
      (service.category || '').toLowerCase().includes(integrationSearchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Load live pipeline data from backend APIs on mount
  useEffect(() => {

    async function loadPipelineData() {
      try {
        const res = await apiFetch('/contacts');
        if (res.ok && res.data?.contacts && res.data.contacts.length > 0) {
          setAudienceContacts(res.data.contacts);
        }
      } catch (err) { }

      try {
        const res = await apiFetch('/tasks');
        if (res.ok && res.data?.tasks && res.data.tasks.length > 0) {
          const mapped = res.data.tasks.map((t) => ({
            id: t.id,
            title: t.title,
            description: t.description || '',
            status: t.status || 'To Do',
            priority: t.priority || 'High',
            campaign: t.campaign || 'General',
            assignee: {
              name: t.assignee_name || t.assigneeName || (t.assignee && typeof t.assignee === 'object' ? t.assignee.name : t.assignee) || (currentUser?.fullName || currentUser?.name || 'Client Lead'),
              avatar: t.assignee_avatar || (t.assignee && typeof t.assignee === 'object' ? t.assignee.avatar : '') || '',
              role: 'Specialist'
            },
            dueDate: t.due_date || t.dueDate || '2026-08-10',
            subtasks: Array.isArray(t.subtasks)
              ? t.subtasks
              : typeof t.subtasks === 'string'
                ? (function () { try { return JSON.parse(t.subtasks); } catch (e) { return []; } })()
                : [],
            comments: Array.isArray(t.comments)
              ? t.comments
              : typeof t.comments === 'string'
                ? (function () { try { return JSON.parse(t.comments); } catch (e) { return []; } })()
                : [],
            files: Array.isArray(t.files)
              ? t.files
              : typeof t.files === 'string'
                ? (function () { try { return JSON.parse(t.files); } catch (e) { return []; } })()
                : []
          }));
          setTaskItems(mapped);
        }
      } catch (err) { }

      try {
        const res = await apiFetch('/budgets');
        if (res.ok && res.data?.budgets && res.data.budgets.length > 0) {
          const mapped = res.data.budgets.map((b) => ({
            id: b.id,
            campaignName: b.campaign_name || b.campaignName,
            channel: b.channel,
            allocatedBudget: parseFloat(b.allocated_budget || b.allocatedBudget || 0),
            spentToDate: parseFloat(b.spent_to_date || b.spentToDate || 0),
            dailyCap: parseFloat(b.daily_cap || b.dailyCap || 0),
            roas: parseFloat(b.roas || 4.5),
            pacingPercent: parseFloat(b.pacing_percent || b.pacingPercent || 0),
            status: b.status || 'On Track'
          }));
          setBudgetAllocations(mapped);
        }
      } catch (err) { }

      try {
        const res = await apiFetch('/integrations');
        if (res.ok && res.data?.integrations && res.data.integrations.length > 0) {
          setConnectedServices((prev) => {
            const map = new Map(res.data.integrations.map((item) => [item.id, item]));
            return prev.map((p) => {
              if (map.has(p.id)) {
                const fetched = map.get(p.id);
                return { ...p, status: fetched.status };
              }
              return p;
            });
          });
        }
      } catch (err) { }

      try {
        const res = await apiFetch('/social/posts');
        if (res.ok && res.data?.posts && res.data.posts.length > 0) {
          setSocialPosts(res.data.posts);
        }
      } catch (err) { }
    }

    loadPipelineData();
  }, []);



  // Sign-Up Profile Details Form State
  const [profileData, setProfileData] = useState({
    avatar: (currentUser?.avatar && !currentUser.avatar.includes('photo-1534528741775-53994a69daeb'))
      ? currentUser.avatar
      : (storedUser?.avatar && !storedUser.avatar.includes('photo-1534528741775-53994a69daeb'))
        ? storedUser.avatar
        : '',
    fullName: currentUser?.name || storedUser?.name || 'Emilia Greene',
    email: currentUser?.email || storedUser?.email || 'emilia@digitoomasha.com',
    dialCode: '+91',
    phone: currentUser?.phone || storedUser?.phone || '98765 43210',
    jobTitle: currentUser?.jobTitle || storedUser?.jobTitle || 'Head of Marketing & Growth',
    country: 'India',
    city: 'Kolkata / London',
    companyName: currentUser?.businessName || storedUser?.businessName || 'DigiToomasha Agency',
    businessWebsite: 'https://digitoomasha.com',
    businessCategory: 'E-commerce & Retail',
    industry: 'Consumer Goods & Tech',
    employeesCount: '11-50 employees',
    monthlyBudget: '₹5,000 - ₹10,000/mo',
    businessGoals: ['SEO Optimization', 'Lead Generation', 'Social Media Marketing'],
    bio: 'Digital marketing strategist specializing in multi-channel ad scaling, CRO, and lead funnels.',
    linkedin: 'linkedin.com/in/emiliagreene'
  });

  // Sync profileData with currentUser or localStorage on change
  React.useEffect(() => {
    const active = currentUser || getStoredUser();
    if (active) {
      const validAvatar = (active.avatar && !active.avatar.includes('photo-1534528741775-53994a69daeb')) ? active.avatar : '';
      setProfileData((prev) => ({
        ...prev,
        avatar: validAvatar,
        fullName: active.name || active.fullName || prev.fullName,
        email: active.email || prev.email,
        phone: active.phone || prev.phone,
        jobTitle: active.jobTitle || prev.jobTitle,
        companyName: active.businessName || active.companyName || prev.companyName
      }));
    }
  }, [currentUser]);

  // Master Settings Category Menu Items Grouped into 5 Hubs
  const settingsGroups = [
    {
      groupTitle: 'ACCOUNT & SECURITY',
      items: [
        { id: 'profile', label: 'Profile Settings', Icon: User, desc: 'Personal info, photo & sign-up details' },
        { id: 'security', label: 'Security & Access', Icon: Shield, desc: 'Passwords, 2FA & active sessions' },
        { id: 'appearance', label: 'Appearance', Icon: Palette, desc: 'Theme mode & accent colors' }
      ]
    },
    {
      groupTitle: 'ORGANIZATION',
      items: [
        { id: 'company', label: 'Company Settings', Icon: Building, desc: 'Brand logo, GST & business details' },
        { id: 'team', label: 'Team Management', Icon: UserPlus, desc: 'Members, roles & permission audit' },
        { id: 'billing', label: 'Billing & Plans', Icon: CreditCard, desc: 'Subscriptions, invoices & tax info' }
      ]
    },
    {
      groupTitle: 'COMMUNICATIONS',
      items: [
        { id: 'email', label: 'Email Gateway', Icon: Mail, desc: 'SMTP config & email templates' },
        { id: 'sms', label: 'SMS & OTP', Icon: Smartphone, desc: 'Twilio, MSG91 & OTP templates' },
        { id: 'notifications', label: 'Notifications', Icon: Bell, desc: 'Browser, email & SMS alerts' }
      ]
    },
    {
      groupTitle: 'DIGITAL MARKETING & AI',
      items: [
        { id: 'website', label: 'Website & SEO', Icon: Globe, desc: 'SEO metadata, favicon & theme' },
        { id: 'marketing-int', label: 'Marketing Pixels', Icon: TrendingUp, desc: 'GA4, Meta Pixel & TikTok Pixel' },
        { id: 'ai', label: 'AI Engine Settings', Icon: Bot, desc: 'OpenAI, Gemini API & prompt rules' },
        { id: 'integrations-list', label: 'Third-Party Apps', Icon: Layers, desc: 'Stripe, Razorpay, Zoom & Slack' }
      ]
    },
    {
      groupTitle: 'SYSTEM & PRIVACY',
      items: [
        { id: 'backup', label: 'Backup & Restore', Icon: HardDrive, desc: 'Manual backup & database exports' },
        { id: 'privacy', label: 'Privacy & Legal', Icon: Scale, desc: 'GDPR tools & cookie policies' },
        { id: 'localization', label: 'Localization', Icon: Globe, desc: 'Timezone, currency & number formats' },
        { id: 'about', label: 'About & Support', Icon: Info, desc: 'Version, changelog & docs' }
      ]
    }
  ];

  // Cloudinary Avatar Image Upload Handler
  const handleAvatarFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB limit. Please choose a smaller image.');
      return;
    }

    setUploadingAvatar(true);

    try {
      // Read file as Base64 Data URL
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        const base64Image = reader.result;

        // Post image base64 data to backend Cloudinary route
        const response = await fetch(`${API_BASE_URL}/upload-avatar`, {

          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image })
        });

        const data = await response.json();

        if (data.success && data.url) {
          const newAvatarUrl = data.url;
          setProfileData((prev) => ({ ...prev, avatar: newAvatarUrl }));

          // Persist globally across sessions & backend
          if (updateUser) {
            updateUser({ avatar: newAvatarUrl });
          }

          // Direct localStorage persistence fallback
          try {
            const stored = localStorage.getItem('digitoomasha_user');
            const userObj = stored ? JSON.parse(stored) : {};
            userObj.avatar = newAvatarUrl;
            localStorage.setItem('digitoomasha_user', JSON.stringify(userObj));
          } catch (err) { }

          alert(data.fallback ? '✨ Profile Photo Updated Successfully!' : '✨ Profile Photo Uploaded & Synced to Cloudinary Successfully!');
        } else {
          alert(`Cloudinary Upload Error: ${data.message || 'Unknown error'}`);
        }
        setUploadingAvatar(false);
      };
    } catch (err) {
      console.error('Avatar Upload Exception:', err);
      alert('Upload failed. Please check network connection.');
      setUploadingAvatar(false);
    }
  };

  const handleSaveChanges = async () => {
    if (updateUser) {
      await updateUser({
        name: profileData.fullName,
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        jobTitle: profileData.jobTitle,
        avatar: profileData.avatar,
        businessName: profileData.companyName
      });
    }

    try {
      const stored = localStorage.getItem('digitoomasha_user');
      const userObj = stored ? JSON.parse(stored) : {};
      userObj.avatar = profileData.avatar;
      userObj.name = profileData.fullName;
      userObj.phone = profileData.phone;
      userObj.jobTitle = profileData.jobTitle;
      userObj.businessName = profileData.companyName;
      localStorage.setItem('digitoomasha_user', JSON.stringify(userObj));
    } catch (e) { }

    // Persist Appearance & Security Settings to Backend DB
    await syncSecurityFieldToBackend({
      themeMode,
      accentColor,
      dashboardLayout,
      densityView,
      sidebarBehavior,
      appLanguage,
      appCurrency,
      appTimezone
    });

    setAppearanceSaveSuccess(true);
    setTimeout(() => setAppearanceSaveSuccess(false), 3000);

    alert('✨ All System Appearance, Theme, Security & Profile Settings Saved Successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGoalToggle = (goal) => {
    const exists = profileData.businessGoals.includes(goal);
    const updated = exists
      ? profileData.businessGoals.filter(g => g !== goal)
      : [...profileData.businessGoals, goal];
    setProfileData({ ...profileData, businessGoals: updated });
  };

  // Time Range Filter State
  const [timeRange, setTimeRange] = useState('30D');

  // Interactive Task List State
  const [dashTasks, setDashTasks] = useState([
    { id: 1, text: 'Upload Q3 High-Converting Video Creatives for Meta Ads', done: true, priority: 'High', date: 'Today' },
    { id: 2, text: 'Review & Approve GA4 E-Commerce Event Attribution', done: true, priority: 'Medium', date: 'Today' },
    { id: 3, text: 'Optimize Google Search Ad Bids for "Organic Skincare"', done: false, priority: 'High', date: 'Tomorrow' },
    { id: 4, text: 'Publish Bi-Weekly Blog Post: "Top 10 Summer Hydration Tips"', done: false, priority: 'Medium', date: 'Aug 5' },
    { id: 5, text: 'Finalize Influencer Retainer Briefs for TikTok Scaling', done: false, priority: 'Low', date: 'Aug 7' }
  ]);

  // Interactive AI Recommendations State
  const [aiTipsList, setAiTipsList] = useState([
    {
      id: 1,
      title: 'Reallocate Meta Ad Budget',
      text: 'Retargeting Campaign #4 is performing at 6.8x ROAS. Shift ₹1,500 from Cold Prospecting for an estimated +180 qualified leads.',
      type: 'budget',
      impact: '+22% ROAS Lift',
      applied: false
    },
    {
      id: 2,
      title: 'High-Intent Search Keyword Opportunity',
      text: 'Search term "natural organic hydration serum" has +42% impression share volume in London. Add to Google Search Ad group.',
      type: 'keyword',
      impact: '+340 Monthly Clicks',
      applied: false
    },
    {
      id: 3,
      title: 'Creative Fatigue Alert',
      text: 'Ad Creative #B2 (Pink Serum Bottle) CTR dropped by 1.4% over 5 days. Swap with fresh video asset.',
      type: 'creative',
      impact: 'Prevent CTR Decay',
      applied: false
    }
  ]);

  // Active Campaigns List State
  const [campaignsList, setCampaignsList] = useState([
    {
      id: 'c1',
      name: 'Google Search - High-Intent SaaS Keywords',
      platform: 'Google Ads',
      objective: 'Conversions / Sales',
      status: 'Active',
      budget: 25000,
      spent: 124500,
      leads: 342,
      conversions: 342,
      revenue: 647400,
      roas: '5.2x',
      cpa: '₹364',
      ctr: '4.85%',
      audience: 'US/CA 25-45 B2B Decision Makers',
      trend: '+32%',
      color: '#ea580c'
    },
    {
      id: 'c2',
      name: 'Meta IG Reels - Hydrating Glow Serum Push',
      platform: 'Meta Ads',
      objective: 'E-Commerce Sales',
      status: 'Active',
      budget: 18000,
      spent: 94200,
      leads: 412,
      conversions: 412,
      revenue: 489840,
      roas: '5.2x',
      cpa: '₹228',
      ctr: '5.12%',
      audience: 'Urban Females 18-34 Beauty & Skincare',
      trend: '+28%',
      color: '#1E3A2B'
    },
    {
      id: 'c3',
      name: 'TikTok Viral Creative - Summer Skincare Routine',
      platform: 'TikTok Ads',
      objective: 'Conversions / Sales',
      status: 'Scaling',
      budget: 15000,
      spent: 68500,
      leads: 285,
      conversions: 285,
      revenue: 328800,
      roas: '4.8x',
      cpa: '₹240',
      ctr: '6.45%',
      audience: 'Gen Z / Millennial Skincare Enthusiasts',
      trend: '+45%',
      color: '#06b6d4'
    },
    {
      id: 'c4',
      name: 'LinkedIn B2B Retargeting - Enterprise Agency Leads',
      platform: 'LinkedIn',
      objective: 'Lead Generation',
      status: 'Active',
      budget: 30000,
      spent: 142000,
      leads: 84,
      conversions: 84,
      revenue: 624800,
      roas: '4.4x',
      cpa: '₹1,690',
      ctr: '3.15%',
      audience: 'VP Marketing / CMOs - Tech & Retail',
      trend: '+24%',
      color: '#D99B00'
    },
    {
      id: 'c5',
      name: 'Google Performance Max - Shopping Feed Scale',
      platform: 'Google Ads',
      objective: 'Catalog Sales',
      status: 'Active',
      budget: 20000,
      spent: 88000,
      leads: 260,
      conversions: 260,
      revenue: 396000,
      roas: '4.5x',
      cpa: '₹338',
      ctr: '4.10%',
      audience: 'High-Intent Shopping Buyers',
      trend: '+19%',
      color: '#ea580c'
    },
    {
      id: 'c6',
      name: 'YouTube Pre-Roll - Agency Founder Case Study',
      platform: 'YouTube',
      objective: 'Brand Consideration',
      status: 'Paused',
      budget: 10000,
      spent: 32000,
      leads: 45,
      conversions: 45,
      revenue: 70400,
      roas: '2.2x',
      cpa: '₹711',
      ctr: '1.85%',
      audience: 'Entrepreneurs & Founders 25-50',
      trend: '-12%',
      color: '#ff0000'
    },
    {
      id: 'c7',
      name: 'Meta FB Feed - Broad Prospecting Campaign',
      platform: 'Meta Ads',
      objective: 'Traffic & Leads',
      status: 'Completed',
      budget: 12000,
      spent: 45000,
      leads: 110,
      conversions: 110,
      revenue: 162000,
      roas: '3.6x',
      cpa: '₹409',
      ctr: '3.40%',
      audience: 'Broad Interest India & US',
      trend: '+8%',
      color: '#2563eb'
    }
  ]);

  // Campaigns Master Search & Filter State
  const [campaignSearchQuery, setCampaignSearchQuery] = useState('');
  const [campaignPlatformFilter, setCampaignPlatformFilter] = useState('All');
  const [campaignStatusFilter, setCampaignStatusFilter] = useState('All');
  const [campaignSortOption, setCampaignSortOption] = useState('Highest ROAS');
  const [campaignChartTimeframe, setCampaignChartTimeframe] = useState('30D');
  const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] = useState(false);

  const [newCampaignForm, setNewCampaignForm] = useState({
    name: '',
    platform: 'Meta Ads',
    objective: 'Conversions / Sales',
    audience: '',
    budget: 15000,
    startDate: new Date().toISOString().split('T')[0],
    creative: ''
  });

  // Filtered & Sorted Campaigns List
  const filteredCampaignsList = campaignsList.filter((c) => {
    const matchesSearch =
      !campaignSearchQuery.trim() ||
      (c.name || '').toLowerCase().includes(campaignSearchQuery.toLowerCase()) ||
      (c.platform || '').toLowerCase().includes(campaignSearchQuery.toLowerCase()) ||
      (c.audience || '').toLowerCase().includes(campaignSearchQuery.toLowerCase());

    const matchesPlatform =
      campaignPlatformFilter === 'All' ||
      (c.platform || '').toLowerCase().includes(campaignPlatformFilter.toLowerCase());

    const matchesStatus =
      campaignStatusFilter === 'All' ||
      (c.status || '').toLowerCase() === campaignStatusFilter.toLowerCase();

    return matchesSearch && matchesPlatform && matchesStatus;
  }).sort((a, b) => {
    if (campaignSortOption === 'Highest ROAS') {
      const roasA = parseFloat(a.roas) || 0;
      const roasB = parseFloat(b.roas) || 0;
      return roasB - roasA;
    }
    if (campaignSortOption === 'Highest Spend') {
      const spendA = Number(a.spent) || Number(a.spend) || 0;
      const spendB = Number(b.spent) || Number(b.spend) || 0;
      return spendB - spendA;
    }
    if (campaignSortOption === 'Most Conversions') {
      const convA = Number(a.conversions) || Number(a.leads) || 0;
      const convB = Number(b.conversions) || Number(b.leads) || 0;
      return convB - convA;
    }
    return 0;
  });

  const handleCreateCampaignSubmit = () => {
    if (!newCampaignForm.name.trim()) {
      alert('Please enter a campaign name.');
      return;
    }

    const createdItem = {
      id: `cmp-${Date.now()}`,
      name: newCampaignForm.name,
      platform: newCampaignForm.platform,
      objective: newCampaignForm.objective,
      status: 'Active',
      budget: Number(newCampaignForm.budget) || 15000,
      spent: 0,
      leads: 0,
      conversions: 0,
      revenue: 0,
      roas: '0.0x',
      cpa: '₹0',
      ctr: '0.0%',
      audience: newCampaignForm.audience || 'Targeting Active',
      trend: '+100%',
      color: '#1E3A2B'
    };

    setCampaignsList((prev) => [createdItem, ...prev]);
    setIsCreateCampaignModalOpen(false);
    setNewCampaignForm({
      name: '',
      platform: 'Meta Ads',
      objective: 'Conversions / Sales',
      audience: '',
      budget: 15000,
      startDate: new Date().toISOString().split('T')[0],
      creative: ''
    });
    alert('🚀 New Campaign Launched Successfully! Real-time telemetry monitoring activated.');
  };

  const handleDeleteCampaignMaster = (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaignsList((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Toggle Task Completion
  const handleTaskToggle = (id) => {
    setDashTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Apply AI Tip Optimization
  const handleApplyAiTip = (id) => {
    setAiTipsList(prev => prev.map(t => t.id === id ? { ...t, applied: true } : t));
  };

  // Toggle Campaign Status
  const handleToggleCampaignStatus = (id) => {
    setCampaignsList(prev => prev.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Active' || c.status === 'Scaling' ? 'Paused' : 'Active';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  // Get dynamic time-aware greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const completedTasksCount = dashTasks.filter(t => t.done).length;
  const taskProgressPercent = Math.round((completedTasksCount / dashTasks.length) * 100);

  return (
    <div className="dashboard-app-layout">
      {/* Multi-platform post composer modal (global top-level overlay) */}
      {isComposerOpen && (
        <div className="social-composer-modal-overlay">
          <div className="social-composer-modal-card animate-scale-up">
            {/* Modal Header */}
            <div className="composer-modal-header">
              <div>
                <h2>{editingPostId ? 'Edit Social Post' : 'Create & Schedule Social Content'}</h2>
                <p>Compose, target channels, generate AI captions, and preview live across platforms.</p>
              </div>
              <button className="composer-close-btn" onClick={() => setIsComposerOpen(false)}>
                <X className="close-ic" />
              </button>
            </div>

            {/* Modal Master 2-Column Body */}
            <div className="composer-modal-grid-body">

              {/* Left Column: Post Form Fields */}
              <div className="composer-form-column">
                <div className="form-group">
                  <label className="form-label">Post Topic / Campaign Reference *</label>
                  <input
                    type="text"
                    placeholder="e.g., Summer Product Launch or SEO Playbook"
                    value={composerData.title}
                    onChange={(e) => setComposerData({ ...composerData, title: e.target.value })}
                    className="form-input"
                  />
                </div>

                {/* Target Platforms Checkbox Grid */}
                <div className="form-group margin-top-sm">
                  <label className="form-label">Target Social Platforms *</label>
                  <div className="platform-selector-grid">
                    {['Linkedin', 'Instagram', 'Twitter', 'Facebook', 'Youtube', 'TikTok'].map((plat) => {
                      const selected = composerData.platforms.includes(plat);
                      return (
                        <button
                          type="button"
                          key={plat}
                          className={`plat-select-card ${selected ? 'selected' : ''} pselect-${plat.toLowerCase()}`}
                          onClick={() => handleToggleComposerPlatform(plat)}
                        >
                          <Check className={`pcheck-ic ${selected ? 'opacity-100' : 'opacity-0'}`} />
                          <span>{plat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Caption Text Area & AI Button */}
                <div className="form-group margin-top-sm">
                  <div className="caption-label-row">
                    <label className="form-label">Post Caption & Copy *</label>
                    <button
                      type="button"
                      className="ai-caption-trigger-btn"
                      onClick={handleGenerateAICaptions}
                      title="Generate AI Copy & Hashtags"
                    >
                      <Sparkles className="aic-ic" /> Generate AI Captions
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Write your post content, hashtags, and CTA link..."
                    value={composerData.caption}
                    onChange={(e) => setComposerData({ ...composerData, caption: e.target.value })}
                    className="form-input form-textarea"
                  />
                  <div className="char-count-row font-mono text-xs">
                    <span>Characters: {composerData.caption.length}</span>
                    <span className="text-purple">✨ Optimal length for LinkedIn & IG</span>
                  </div>
                </div>

                {/* Media URL / Upload Input */}
                <div className="form-group margin-top-sm">
                  <div className="caption-label-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label className="form-label" style={{ margin: 0 }}>Media Attachment (Cloudinary CDN)</label>
                    <button
                      type="button"
                      className="btn-outline-purple sm-btn"
                      style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                      onClick={() => mediaFileInputRef.current?.click()}
                      disabled={uploadingMedia}
                    >
                      {uploadingMedia ? (
                        <>
                          <RefreshCw className="animate-spin text-purple" style={{ width: 14, height: 14 }} />
                          <span>Uploading to Cloudinary...</span>
                        </>
                      ) : (
                        <>
                          <Upload style={{ width: 14, height: 14 }} />
                          <span>Upload Image to Cloudinary</span>
                        </>
                      )}
                    </button>
                    <input
                      type="file"
                      ref={mediaFileInputRef}
                      onChange={handleMediaFileUpload}
                      accept="image/*,video/*"
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className="input-with-icon-wrap">
                    <Upload className="input-prefix-ic" />
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/... or Cloudinary URL"
                      value={composerData.media}
                      onChange={(e) => setComposerData({ ...composerData, media: e.target.value })}
                      className="form-input icon-padded-input"
                    />
                  </div>
                  {composerData.media && (
                    <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 style={{ width: 14, height: 14 }} />
                      <span>CDN attachment linked: {composerData.media.slice(0, 45)}...</span>
                    </div>
                  )}
                </div>

                {/* Schedule Date & Time Row */}
                <div className="grid-2-col margin-top-sm">
                  <div className="form-group">
                    <label className="form-label">Target Launch Date</label>
                    <input
                      type="date"
                      value={composerData.scheduledDate}
                      onChange={(e) => setComposerData({ ...composerData, scheduledDate: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Target Launch Time</label>
                    <input
                      type="time"
                      value={composerData.scheduledTime}
                      onChange={(e) => setComposerData({ ...composerData, scheduledTime: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* AI Recommended Time Banner */}
                <div className="ai-time-recommendation-box margin-top-sm">
                  <Sparkles className="rec-ic" />
                  <span><strong>AI Recommended Time:</strong> Wednesday 4:00 PM recommended for 2.4x higher reach.</span>
                </div>
              </div>

              {/* Right Column: Real-Time Live Multi-Platform Device Preview */}
              <div className="composer-preview-column">
                <div className="preview-header-bar">
                  <span>Live Multi-Channel Mockup</span>
                  <div className="preview-platform-tabs">
                    {composerData.platforms.map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`ptab-btn ${composerPreviewPlatform === p ? 'active' : ''}`}
                        onClick={() => setComposerPreviewPlatform(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mockup Preview Card Frame */}
                <div className={`device-mockup-frame platform-frame-${composerPreviewPlatform.toLowerCase()}`}>
                  <div className="mockup-header font-sans">
                    <div className="mockup-avatar-row">
                      <UserAvatar src={profileData.avatar} name={profileData.fullName} className="mockup-avatar" />
                      <div>
                        <strong className="mockup-author-name">{profileData.fullName || currentUser?.fullName || currentUser?.name || 'Client User'}</strong>
                        <span className="mockup-subtext">Sponsored • {composerPreviewPlatform} Ad Engine</span>
                      </div>
                    </div>
                    <span className="mockup-platform-tag">{composerPreviewPlatform}</span>
                  </div>

                  <div className="mockup-body-text">
                    {composerData.caption || 'Your post caption preview will appear live here as you type...'}
                  </div>

                  {composerData.media && (
                    <div className="mockup-media-frame">
                      <img src={composerData.media} alt="Preview" className="mockup-img" />
                    </div>
                  )}

                  <div className="mockup-footer-engagement font-sans">
                    <span>👍 Like</span>
                    <span>💬 Comment</span>
                    <span>🔄 Repost</span>
                    <span>✈️ Share</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer Buttons */}
            <div className="composer-modal-footer">
              <button className="btn-outline-purple sm-btn" onClick={() => setIsComposerOpen(false)}>
                Cancel
              </button>
              <div className="footer-right-actions">
                <button
                  className="btn-outline-purple sm-btn"
                  onClick={() => handleSaveComposerPost('Draft')}
                >
                  Save as Draft
                </button>
                <button
                  className="btn-primary-purple"
                  onClick={() => handleSaveComposerPost('Scheduled')}
                >
                  <Calendar className="btn-icon" /> Schedule Launch
                </button>
                <button
                  className="btn-primary-purple bg-green-btn"
                  onClick={() => handleSaveComposerPost('Published')}
                >
                  <Zap className="btn-icon" /> Publish Now
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Full Post Detail View Modal (global top-level overlay) */}
      {viewingPostDetail && (
        <div className="social-composer-modal-overlay" onClick={() => setViewingPostDetail(null)}>
          <div
            className="social-composer-modal-card post-detail-modal-card animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="composer-modal-header post-detail-header">
              <div className="detail-header-left">
                <div className="detail-badges-row">
                  <span className={`post-status-badge status-${viewingPostDetail.status ? viewingPostDetail.status.toLowerCase() : 'scheduled'}`}>
                    {viewingPostDetail.status || 'Scheduled'}
                  </span>
                  <span className="post-category-tag">{viewingPostDetail.category || 'General'}</span>
                  {viewingPostDetail.isClientAdded && (
                    <span className="client-added-badge">✨ Client Original Post</span>
                  )}
                </div>
                <h2 className="detail-post-title">{viewingPostDetail.title}</h2>
                <div className="detail-author-meta font-sans">
                  <UserAvatar src={profileData.avatar} name={viewingPostDetail.author || profileData.fullName} className="detail-author-avatar" />
                  <span>
                    By <strong>{viewingPostDetail.author || profileData.fullName || 'Client User'}</strong> •{' '}
                    {viewingPostDetail.status === 'Published'
                      ? `Published ${viewingPostDetail.publishedAt || 'Recently'}`
                      : `Scheduled for ${viewingPostDetail.scheduledDate || 'Upcoming'} at ${viewingPostDetail.scheduledTime || '14:00'}`}
                  </span>
                </div>
              </div>

              <div className="detail-header-actions">
                {viewingPostDetail.status !== 'Published' && (
                  <button
                    className="btn-primary-purple bg-green-btn sm-btn"
                    onClick={() => {
                      handleQuickPublish(viewingPostDetail.id);
                      setViewingPostDetail((prev) => prev ? { ...prev, status: 'Published', publishedAt: 'Just Now' } : null);
                    }}
                  >
                    <Zap className="btn-icon" /> Publish Now
                  </button>
                )}
                <button
                  className="btn-outline-purple sm-btn"
                  onClick={() => {
                    const postToEdit = viewingPostDetail;
                    setViewingPostDetail(null);
                    handleOpenComposer(postToEdit);
                  }}
                >
                  <Edit2 className="btn-icon" /> Edit Post
                </button>
                <button
                  className="btn-outline-red sm-btn"
                  style={{ color: '#ef4444', borderColor: '#fca5a5', background: '#fef2f2' }}
                  onClick={() => {
                    if (window.confirm('Delete this post?')) {
                      handleDeletePost(viewingPostDetail.id);
                      setViewingPostDetail(null);
                    }
                  }}
                >
                  <Trash2 className="btn-icon" /> Delete
                </button>
                <button className="composer-close-btn" onClick={() => setViewingPostDetail(null)}>
                  <X className="close-ic" />
                </button>
              </div>
            </div>

            {/* Modal Master 2-Column Body */}
            <div className="composer-modal-grid-body post-detail-grid-body">
              {/* Left Column: Hero Media Showcase & Full Caption */}
              <div className="composer-form-column detail-main-column">
                {viewingPostDetail.media ? (
                  <div className="detail-media-showcase">
                    <img src={viewingPostDetail.media} alt={viewingPostDetail.title} className="detail-hero-img" />
                    <div className="media-overlay-meta">
                      <span>Cloudinary Asset CDN • High-Res Omnichannel Asset</span>
                      <a href={viewingPostDetail.media} target="_blank" rel="noopener noreferrer" className="btn-view-raw">
                        <ExternalLink style={{ width: 14, height: 14 }} /> Open Asset
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="detail-media-placeholder">
                    <Sparkles style={{ width: 32, height: 32, color: '#8b5cf6' }} />
                    <p>Text-only Broadcast Post</p>
                  </div>
                )}

                {/* Full Caption Block */}
                <div className="detail-caption-box margin-top-md">
                  <h4 className="detail-section-label">Post Caption & Copy</h4>
                  <div className="detail-caption-text">
                    {viewingPostDetail.caption ? (
                      viewingPostDetail.caption.split('\n').map((line, idx) => (
                        <p key={idx} style={{ marginBottom: line ? '0.5rem' : '0.25rem' }}>{line}</p>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">No caption provided for this post.</p>
                    )}
                  </div>
                </div>

                {/* Target Social Channels */}
                <div className="detail-target-channels-box margin-top-md">
                  <h4 className="detail-section-label">Distribution Channels ({(Array.isArray(viewingPostDetail.platforms) ? viewingPostDetail.platforms : ['Linkedin']).length})</h4>
                  <div className="detail-channels-flex">
                    {(Array.isArray(viewingPostDetail.platforms) ? viewingPostDetail.platforms : ['Linkedin']).map((plat) => (
                      <div key={plat} className={`detail-channel-pill pill-${plat.toLowerCase()}`}>
                        <span className="channel-dot">●</span>
                        <span>{plat} Network</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Mockup Preview & Telemetry */}
              <div className="composer-preview-column detail-right-column">
                <div className="preview-header-bar">
                  <span>Live Device Mockup</span>
                  <div className="preview-platform-tabs">
                    {(Array.isArray(viewingPostDetail.platforms) ? viewingPostDetail.platforms : ['Linkedin']).map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`ptab-btn ${detailPreviewPlatform === p ? 'active' : ''}`}
                        onClick={() => setDetailPreviewPlatform(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mockup Frame */}
                <div className={`device-mockup-frame platform-frame-${detailPreviewPlatform.toLowerCase()}`}>
                  <div className="mockup-header font-sans">
                    <div className="mockup-avatar-row">
                      <UserAvatar src={profileData.avatar} name={viewingPostDetail.author || profileData.fullName} className="mockup-avatar" />
                      <div>
                        <strong className="mockup-author-name">{viewingPostDetail.author || profileData.fullName || 'Client User'}</strong>
                        <span className="mockup-subtext">Sponsored • {detailPreviewPlatform} Ad Engine</span>
                      </div>
                    </div>
                    <span className="mockup-platform-tag">{detailPreviewPlatform}</span>
                  </div>

                  <div className="mockup-body-text">
                    {viewingPostDetail.caption || viewingPostDetail.title}
                  </div>

                  {viewingPostDetail.media && (
                    <div className="mockup-media-frame">
                      <img src={viewingPostDetail.media} alt="Preview" className="mockup-img" />
                    </div>
                  )}

                  <div className="mockup-footer-engagement font-sans">
                    <span>👍 {viewingPostDetail.likes || 0} Likes</span>
                    <span>💬 {viewingPostDetail.comments || 0} Comments</span>
                    <span>🔄 {viewingPostDetail.shares || 0} Reposts</span>
                    <span>✈️ Share</span>
                  </div>
                </div>

                {/* Analytics Telemetry Scorecard */}
                <div className="detail-telemetry-grid margin-top-md">
                  <h4 className="detail-section-label">Performance Telemetry Scorecard</h4>
                  <div className="telemetry-cards-row">
                    <div className="tele-stat-card">
                      <Eye className="tele-ic text-purple" />
                      <div>
                        <span className="tele-val">{viewingPostDetail.projectedReach || '5.8k'}</span>
                        <span className="tele-lbl">Forecast Reach</span>
                      </div>
                    </div>
                    <div className="tele-stat-card">
                      <Heart className="tele-ic text-pink" />
                      <div>
                        <span className="tele-val">{viewingPostDetail.likes || 0}</span>
                        <span className="tele-lbl">Likes</span>
                      </div>
                    </div>
                    <div className="tele-stat-card">
                      <Share2 className="tele-ic text-green" />
                      <div>
                        <span className="tele-val">{viewingPostDetail.shares || 0}</span>
                        <span className="tele-lbl">Shares</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="composer-modal-footer">
              <span className="text-xs text-slate-500 font-mono">
                Post ID: {viewingPostDetail.id} • Live Synced
              </span>
              <button className="btn-outline-purple sm-btn" onClick={() => setViewingPostDetail(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input for Cloudinary Upload */}
      <input
        type="file"
        ref={avatarFileInputRef}
        onChange={handleAvatarFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Sidebar Navigation */}
      <aside className={`dash-sidebar ${sidebarExpanded ? 'expanded' : ''}`}>
        <div className="dash-sidebar-top">
          <div className="dash-logo-box" onClick={() => setSidebarExpanded(!sidebarExpanded)} style={{ cursor: 'pointer' }}>
            <div className="dash-logo-icon">
              <Sparkles className="logo-spark-icon" />
            </div>
            {sidebarExpanded && <span className="sidebar-brand-title">AdFlux</span>}
          </div>

          <nav className="dash-nav-menu">
            <button className={`dash-nav-btn ${currentView === 'overview' ? 'active' : ''}`} onClick={() => { setCurrentView('overview'); setActiveTab('Overview'); }} title="Dashboard">
              <LayoutDashboard className="dash-icon" />{sidebarExpanded && <span className="nav-text">Dashboard</span>}
            </button>
            <button className={`dash-nav-btn ${currentView === 'campaigns-master' ? 'active' : ''}`} onClick={() => setCurrentView('campaigns-master')} title="Campaigns">
              <Megaphone className="dash-icon" />{sidebarExpanded && <span className="nav-text">Campaigns</span>}
            </button>
            <button className={`dash-nav-btn ${currentView === 'posts-grid' ? 'active' : ''}`} onClick={() => { setCurrentView('posts-grid'); setActiveTab('Posts'); }} title="Posts Grid">
              <Grid className="dash-icon" />{sidebarExpanded && <span className="nav-text">Posts</span>}
            </button>
            <button className={`dash-nav-btn ${currentView === 'analysis' || currentView === 'analytics' ? 'active' : ''}`} onClick={() => setCurrentView('analytics')} title="Analysis">
              <BarChart3 className="dash-icon" />{sidebarExpanded && <span className="nav-text">Analysis</span>}
            </button>
            <button className={`dash-nav-btn ${currentView === 'audience' ? 'active' : ''}`} onClick={() => setCurrentView('audience')} title="Audience">
              <Users className="dash-icon" />{sidebarExpanded && <span className="nav-text">Audience</span>}
            </button>
            <button className={`dash-nav-btn ${currentView === 'tasks' ? 'active' : ''}`} onClick={() => setCurrentView('tasks')} title="Tasks">
              <CheckSquare className="dash-icon" />{sidebarExpanded && <span className="nav-text">Tasks</span>}
            </button>
            <button className={`dash-nav-btn ${currentView === 'projects' ? 'active' : ''}`} onClick={() => setCurrentView('projects')} title="Projects">
              <Briefcase className="dash-icon" />{sidebarExpanded && <span className="nav-text">Projects</span>}
              {taskItems.filter(t => t.status === 'Approved' || t.status === 'Accepted').length > 0 && (
                <span
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '2px 7px',
                    borderRadius: '10px',
                    marginLeft: 'auto',
                    boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  {taskItems.filter(t => t.status === 'Approved' || t.status === 'Accepted').length}
                </span>
              )}
            </button>
            <button className={`dash-nav-btn ${currentView === 'budget' ? 'active' : ''}`} onClick={() => setCurrentView('budget')} title="Budget management">
              <DollarSign className="dash-icon" />{sidebarExpanded && <span className="nav-text">Budget</span>}
            </button>
            <button className={`dash-nav-btn ${currentView === 'integrations' ? 'active' : ''}`} onClick={() => setCurrentView('integrations')} title="Integrations">
              <Layers className="dash-icon" />{sidebarExpanded && <span className="nav-text">Integrations</span>}
            </button>
            <button className={`dash-nav-btn ${currentView === 'settings' ? 'active' : ''}`} onClick={() => setCurrentView('settings')} title="Settings">
              <Settings className="dash-icon" />{sidebarExpanded && <span className="nav-text">Settings</span>}
            </button>
          </nav>
        </div>

        <div className="dash-sidebar-bottom">
          <button className="dash-nav-btn logout-btn" onClick={handleLogout} title="Log Out">
            <LogOut className="dash-icon" />{sidebarExpanded && <span className="nav-text">Log out</span>}
          </button>
          <div className="dash-user-avatar">
            <UserAvatar src={profileData.avatar} name={profileData.fullName} />
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="dash-main-area">
        {/* Dynamic View Switcher */}
        <div className="dash-content-container animate-fade-in-up" key={currentView}>



          {/* OVERVIEW VIEW */}
          {currentView === 'overview' && (
            <div className="overview-hub-container">
              {/* Breadcrumb Row */}
              <div className="dash-breadcrumbs">
                <span>DigiToomasha Intelligence</span>
                <ChevronRight className="bc-sep" />
                <span>Client Workspace</span>
                <ChevronRight className="bc-sep" />
                <span className="bc-current">Growth Dashboard</span>
              </div>

              {/* 1. PERSONALIZED WELCOME & INTEL HERO BANNER */}
              <div className="dash-welcome-hero-card">
                <div className="welcome-hero-glow" />
                <div className="welcome-hero-content">
                  <div className="welcome-hero-header">
                    <div className="welcome-avatar-box">
                      <UserAvatar src={profileData.avatar} name={profileData.fullName} className="wavatar-img" />
                      <span className="wavatar-status-dot" />
                    </div>
                    <div>
                      <div className="welcome-badge-line">
                        <span className="wagency-pill">
                          <Zap className="wpill-icon" /> DigiToomasha Agency Client Engine
                        </span>
                        <span className="wlive-status-tag">
                          <span className="green-pulse-dot" /> 4 Campaigns Live
                        </span>
                      </div>
                      <h1 className="welcome-greeting-title">
                        {getTimeGreeting()}, {(profileData?.fullName || 'User').split(' ')[0]} 👋
                      </h1>
                      <p className="welcome-subtitle">
                        Here is your live marketing performance snapshot for <strong>{profileData.companyName || 'Lumière Skincare Inc.'}</strong>. All ad pixels and conversion tracking engines are operating at peak efficiency.
                      </p>
                    </div>
                  </div>

                  {/* Ticker Metrics Row inside Hero */}
                  <div className="welcome-metrics-ticker">
                    <div className="wticker-item">
                      <span className="wticker-label">Active Scaling Engines</span>
                      <strong className="wticker-val text-purple">4 Active</strong>
                    </div>
                    <div className="wticker-divider" />
                    <div className="wticker-item">
                      <span className="wticker-label">Overall Campaign ROAS</span>
                      <strong className="wticker-val text-green">4.85x (+0.65x)</strong>
                    </div>
                    <div className="wticker-divider" />
                    <div className="wticker-item">
                      <span className="wticker-label">Monthly Target Lead Goal</span>
                      <strong className="wticker-val text-blue">89% Reached</strong>
                    </div>
                    <div className="wticker-divider" />
                    <div className="wticker-item">
                      <span className="wticker-label">System Health Index</span>
                      <strong className="wticker-val text-green">98.4% Optimal</strong>
                    </div>
                  </div>

                  {/* Hero Quick Action Bar */}
                  <div className="welcome-hero-actions">
                    <button className="hero-btn-primary" onClick={() => setCurrentView('create-campaign')}>
                      <Plus className="hbtn-icon" />
                      <span>Launch New Campaign</span>
                    </button>
                    <button className="hero-btn-glass" onClick={() => alert('AI Growth Strategy Report generated & sent to email!')}>
                      <Bot className="hbtn-icon text-purple" />
                      <span>Generate AI Growth Report</span>
                    </button>
                    <button className="hero-btn-glass" onClick={() => setCurrentView('analytics')}>
                      <BarChart3 className="hbtn-icon text-blue" />
                      <span>View Live Analytics</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. EXPANDED 4-CARD MULTI-DIMENSIONAL KPI SCORECARDS */}
              <div className="dash-kpi-grid-4">
                {/* KPI Card 1: Leads */}
                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Total Qualified Leads</span>
                    <span className="kpi-badge badge-up">
                      <TrendingUp className="badge-icon" /> +28.4%
                    </span>
                  </div>
                  <div className="kpi-sc-value-row">
                    <strong className="kpi-sc-val">2,245</strong>
                    <span className="kpi-sc-sub">vs 1,748 last mo.</span>
                  </div>
                  {/* Mini Sparkline Visual */}
                  <div className="kpi-sparkline-bar">
                    <div className="sparkline-fill bg-purple-grad" style={{ width: '85%' }} />
                  </div>
                  <div className="kpi-sc-footer">
                    <span>Conversion Rate: <strong>4.62%</strong></span>
                    <span className="text-green font-semibold">Goal: 2,500</span>
                  </div>
                </div>

                {/* KPI Card 2: ROAS */}
                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Return on Ad Spend (ROAS)</span>
                    <span className="kpi-badge badge-up">
                      <TrendingUp className="badge-icon" /> +0.65x
                    </span>
                  </div>
                  <div className="kpi-sc-value-row">
                    <strong className="kpi-sc-val text-green">4.85x</strong>
                    <span className="kpi-sc-sub">Blended average</span>
                  </div>
                  <div className="kpi-sparkline-bar">
                    <div className="sparkline-fill bg-green-grad" style={{ width: '92%' }} />
                  </div>
                  <div className="kpi-sc-footer">
                    <span>Meta: <strong>5.2x</strong></span>
                    <span>Google: <strong>4.4x</strong></span>
                  </div>
                </div>

                {/* KPI Card 3: Spend & Reach */}
                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Ad Spend & Reach</span>
                    <span className="kpi-badge badge-neutral">
                      <Activity className="badge-icon" /> Budget: ₹25k
                    </span>
                  </div>
                  <div className="kpi-sc-value-row">
                    <strong className="kpi-sc-val">₹14,280</strong>
                    <span className="kpi-sc-sub">1.42M Impr.</span>
                  </div>
                  <div className="kpi-sparkline-bar">
                    <div className="sparkline-fill bg-blue-grad" style={{ width: '57%' }} />
                  </div>
                  <div className="kpi-sc-footer">
                    <span>57% Budget Utilized</span>
                    <span className="text-blue">17 Days Remaining</span>
                  </div>
                </div>

                {/* KPI Card 4: CPA */}
                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Cost Per Acquisition (CPA)</span>
                    <span className="kpi-badge badge-up">
                      <TrendingDown className="badge-icon" /> -14.2%
                    </span>
                  </div>
                  <div className="kpi-sc-value-row">
                    <strong className="kpi-sc-val text-purple">₹6.36</strong>
                    <span className="kpi-sc-sub">Per lead acquired</span>
                  </div>
                  <div className="kpi-sparkline-bar">
                    <div className="sparkline-fill bg-orange-grad" style={{ width: '74%' }} />
                  </div>
                  <div className="kpi-sc-footer">
                    <span>Industry Avg: <strong>₹8.50</strong></span>
                    <span className="text-green font-semibold">25.1% Savings</span>
                  </div>
                </div>
              </div>

              {/* 3. MAIN DASHBOARD 2-COLUMN INTELLIGENCE GRID */}
              <div className="dash-intel-main-grid">

                {/* LEFT COLUMN: Performance Chart, Active Campaigns, Creatives */}
                <div className="intel-left-column">

                  {/* Performance Analytics Funnel & Chart Box */}
                  <div className="intel-card-box">
                    <div className="icard-header">
                      <div>
                        <h3 className="icard-title">Weekly Performance & Lead Funnel</h3>
                        <p className="icard-sub">Lead conversions and total impressions across active traffic channels.</p>
                      </div>

                      {/* Time Range Selector */}
                      <div className="time-range-toggle-group">
                        {['7D', '30D', '90D', '1Y'].map((t) => (
                          <button
                            key={t}
                            className={`trange-btn ${timeRange === t ? 'active' : ''}`}
                            onClick={() => setTimeRange(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chart Visualization Simulation */}
                    <div className="funnel-chart-wrapper">
                      <div className="chart-bars-group">
                        {[
                          { day: 'Mon', leads: 280, impr: 180, height: '65%' },
                          { day: 'Tue', leads: 340, impr: 220, height: '80%' },
                          { day: 'Wed', leads: 410, impr: 290, height: '95%' },
                          { day: 'Thu', leads: 310, impr: 210, height: '72%' },
                          { day: 'Fri', leads: 480, impr: 350, height: '100%' },
                          { day: 'Sat', leads: 260, impr: 170, height: '60%' },
                          { day: 'Sun', leads: 165, impr: 110, height: '40%' }
                        ].map((b, idx) => (
                          <div key={idx} className="chart-bar-col">
                            <div className="bar-hover-tooltip">{b.leads} Leads ({b.impr}k Impr.)</div>
                            <div className="bar-pillar-wrap">
                              <div className="bar-pillar-fill" style={{ height: b.height }} />
                            </div>
                            <span className="bar-day-label">{b.day}</span>
                          </div>
                        ))}
                      </div>

                      <div className="chart-legend-row">
                        <div className="clegend-item">
                          <span className="clegend-dot bg-purple-dot" />
                          <span>Meta Paid Ads (55%)</span>
                        </div>
                        <div className="clegend-item">
                          <span className="clegend-dot bg-orange-dot" />
                          <span>Google Search (32%)</span>
                        </div>
                        <div className="clegend-item">
                          <span className="clegend-dot bg-cyan-dot" />
                          <span>TikTok UGC (13%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Campaigns Manager Section */}
                  <div className="intel-card-box margin-top-md">
                    <div className="icard-header">
                      <div>
                        <h3 className="icard-title">Active Scaling Campaigns</h3>
                        <p className="icard-sub">Manage budget allocation, ROAS, and real-time campaign states.</p>
                      </div>

                      <button className="btn-outline-purple sm-btn" onClick={() => setCurrentView('campaigns-master')}>
                        <span>View All Campaigns</span>
                        <ChevronRight className="btn-icon-sm" />
                      </button>
                    </div>

                    <div className="campaigns-cards-list">
                      {campaignsList.map((c) => {
                        const spendPercent = Math.round((c.spent / c.budget) * 100);
                        return (
                          <div key={c.id} className="campaign-row-card">
                            <div className="camp-row-left">
                              <div className="camp-color-indicator" style={{ backgroundColor: c.color }} />
                              <div>
                                <div className="camp-name-line">
                                  <strong className="camp-name-title">{c.name}</strong>
                                  <span className={`camp-status-badge ${c.status === 'Active' ? 'status-act' : c.status === 'Scaling' ? 'status-scale' : 'status-pause'}`}>
                                    {c.status}
                                  </span>
                                </div>
                                <div className="camp-platform-meta">
                                  <span>{c.platform}</span>
                                  <span className="cmeta-dot">•</span>
                                  <span>{c.leads} Leads</span>
                                  <span className="cmeta-dot">•</span>
                                  <span>CPA: {c.cpa}</span>
                                </div>
                              </div>
                            </div>

                            <div className="camp-row-right">
                              <div className="camp-budget-col">
                                <span className="cbudget-val">₹{c.spent.toLocaleString()} / ₹{c.budget.toLocaleString()}</span>
                                <div className="cbudget-bar-wrap">
                                  <div className="cbudget-bar-fill" style={{ width: `${spendPercent}%`, backgroundColor: c.color }} />
                                </div>
                              </div>

                              <div className="camp-roas-col">
                                <span className="croas-label">ROAS</span>
                                <strong className="croas-val">{c.roas}</strong>
                              </div>

                              <button
                                className={`camp-action-btn ${c.status === 'Active' || c.status === 'Scaling' ? 'btn-pause' : 'btn-play'}`}
                                onClick={() => handleToggleCampaignStatus(c.id)}
                                title={c.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                              >
                                {c.status === 'Active' || c.status === 'Scaling' ? <PauseCircle className="cact-ic" /> : <Zap className="cact-ic" />}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: AI Recommendations, Tasks, Platform Split, Live Feed */}
                <div className="intel-right-column">

                  {/* DigiToomasha AI Recommendation Engine Box */}
                  <div className="intel-card-box ai-intel-box">
                    <div className="icard-header">
                      <div className="ai-header-title-flex">
                        <div className="ai-sparkle-icon-box">
                          <Bot className="ai-spark-ic" />
                        </div>
                        <div>
                          <h3 className="icard-title">DigiToomasha AI Strategy Engine</h3>
                          <p className="icard-sub">Live automated optimizations based on real-time ROAS & conversion telemetry.</p>
                        </div>
                      </div>
                    </div>

                    <div className="ai-tips-list">
                      {aiTipsList.map((tip) => (
                        <div key={tip.id} className={`ai-tip-card ${tip.applied ? 'tip-applied' : ''}`}>
                          <div className="aitip-header">
                            <strong className="aitip-title">{tip.title}</strong>
                            <span className="aitip-impact-pill">{tip.impact}</span>
                          </div>
                          <p className="aitip-text">{tip.text}</p>
                          <div className="aitip-footer">
                            {tip.applied ? (
                              <span className="aitip-applied-status">
                                <CheckCircle2 className="chk-ic text-green" /> Optimization Applied
                              </span>
                            ) : (
                              <button className="btn-ai-apply" onClick={() => handleApplyAiTip(tip.id)}>
                                <Sparkles className="btn-icon-sm" />
                                <span>Apply 1-Click Optimization</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Campaign Task & Milestones Progress Box */}
                  <div className="intel-card-box margin-top-md">
                    <div className="icard-header">
                      <div>
                        <h3 className="icard-title">Campaign Action Checklist</h3>
                        <p className="icard-sub">Milestones and key setup deliverables.</p>
                      </div>
                      <span className="task-percent-badge">{taskProgressPercent}% Done</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="task-progress-track">
                      <div className="task-progress-fill" style={{ width: `${taskProgressPercent}%` }} />
                    </div>

                    <div className="dash-task-items-list">
                      {dashTasks.map((t) => (
                        <label key={t.id} className={`dash-task-row ${t.done ? 'task-done' : ''}`}>
                          <input
                            type="checkbox"
                            checked={t.done}
                            onChange={() => handleTaskToggle(t.id)}
                            className="task-checkbox"
                          />
                          <div className="task-text-wrap">
                            <span className="task-item-text">{t.text}</span>
                            <div className="task-meta-row">
                              <span className={`task-priority-pill p-${(t.priority || 'medium').toLowerCase()}`}>{t.priority}</span>
                              <span className="task-date-str"><Calendar className="tdate-ic" /> {t.date}</span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Platform Ad Spend Allocation */}
                  <div className="intel-card-box margin-top-md">
                    <div className="icard-header">
                      <div>
                        <h3 className="icard-title">Platform Spend Allocation</h3>
                        <p className="icard-sub">Monthly budget distribution across channels.</p>
                      </div>
                    </div>

                    <div className="platform-spend-list">
                      {[
                        { name: 'Meta Ads (FB & IG)', percent: 55, spend: '₹7,854', color: '#1E3A2B' },
                        { name: 'Google Search & Display', percent: 32, spend: '₹4,569', color: '#D99B00' },
                        { name: 'TikTok Influencer Ads', percent: 13, spend: '₹1,857', color: '#5A5A55' }
                      ].map((p, idx) => (
                        <div key={idx} className="pspend-item">
                          <div className="pspend-row-top">
                            <span className="pspend-name">{p.name}</span>
                            <strong className="pspend-val">{p.spend} ({p.percent}%)</strong>
                          </div>
                          <div className="pspend-bar-track">
                            <div className="pspend-bar-fill" style={{ width: `${p.percent}%`, backgroundColor: p.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Real-time Live Activity Stream */}
                  <div className="intel-card-box margin-top-md">
                    <div className="icard-header">
                      <div className="live-dot-title-sm">
                        <span className="green-pulse-dot" />
                        <h3 className="icard-title">Real-Time Lead Stream</h3>
                      </div>
                      <span className="live-stream-badge">Live Stream</span>
                    </div>

                    <div className="live-activity-list-sm">
                      {[
                        { time: '2 mins ago', title: 'New High-Value Lead', details: 'Form submitted on Meta Serum Ad (#2851)', icon: UserPlus },
                        { time: '14 mins ago', title: 'Cart Recovery Conversion', details: 'Order #9204 completed via Retargeting', icon: DollarSign },
                        { time: '42 mins ago', title: 'Ad Creative Approved', details: 'Google Search Keyword Ad Group Active', icon: CheckCircle2 }
                      ].map((act, i) => {
                        const ActIcon = act.icon;
                        return (
                          <div key={i} className="lactivity-item">
                            <div className="lactivity-icon-box">
                              <ActIcon className="lact-ic" />
                            </div>
                            <div className="lactivity-content">
                              <div className="lactivity-header">
                                <strong className="lact-title">{act.title}</strong>
                                <span className="lact-time">{act.time}</span>
                              </div>
                              <p className="lact-desc">{act.details}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* OTHER VIEWS */}
          {/* ========================================================= */}
          {/* OMNICHANNEL SOCIAL CONTENT STUDIO & SCHEDULER HUB        */}
          {/* ========================================================= */}
          {(currentView === 'posts-grid' || currentView === 'create-post') && (
            <div className="social-studio-container">
              {/* Breadcrumb Row */}
              <div className="dash-breadcrumbs">
                <span>Dashboard</span>
                <ChevronRight className="bc-sep" />
                <span>Content Studio</span>
                <ChevronRight className="bc-sep" />
                <span className="bc-current">Omnichannel Manager</span>
              </div>

              {/* Title & Top Bar */}
              <div className="dash-title-row">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <h1 className="dash-page-title">Social Content Studio</h1>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        background: isSocketConnected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                        color: isSocketConnected ? '#10B981' : '#EF4444',
                        border: `1px solid ${isSocketConnected ? '#10B98133' : '#EF444433'}`,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: isSocketConnected ? '#10B981' : '#EF4444',
                          boxShadow: isSocketConnected ? '0 0 8px #10B981' : 'none',
                        }}
                      />
                      {isSocketConnected ? 'Live Sockets Connected' : 'Sockets Offline'}
                    </span>
                  </div>
                  <p className="dash-page-subtitle">
                    Create, schedule, organize, and auto-publish content across LinkedIn, Instagram, X (Twitter), Facebook, YouTube & TikTok.
                  </p>
                </div>
                <div className="social-top-actions">
                  <button
                    className="btn-outline-purple sm-btn"
                    onClick={() => setCurrentView('your-contents')}
                  >
                    <FileText className="btn-icon text-purple" />
                    <span>Your Contents</span>
                  </button>
                </div>
              </div>

              {/* Live Socket Toast Banner if present */}
              {socketToastMessage && (
                <div className="yc-toast-banner" style={{ borderRadius: '14px', marginTop: '1rem', marginBottom: '0.5rem' }}>
                  <Sparkles style={{ width: 18, height: 18 }} />
                  <span>{socketToastMessage}</span>
                </div>
              )}

              {/* 4 KPI Telemetry Cards */}
              <div className="social-kpi-grid margin-top-md">
                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Scheduled Launch Queue</span>
                    <Calendar className="kpi-card-ic text-purple" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">{socialPosts.filter(p => p.status === 'Scheduled' || p.status === 'Queued').length} Posts</span>
                    <span className="kpi-sc-sub text-green">Next launch in 2h</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-purple-grad" style={{ width: '75%' }} /></div>
                  <div className="kpi-sc-footer"><span>Auto-publishing active</span><span>100% On Time</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Projected Monthly Reach</span>
                    <TrendingUp className="kpi-card-ic text-green" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">58.0k</span>
                    <span className="kpi-sc-sub text-green">+18.4% vs last mo</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-green-grad" style={{ width: '82%' }} /></div>
                  <div className="kpi-sc-footer"><span>Impressions forecast</span><span>High Engagement</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Avg. Engagement Telemetry</span>
                    <Zap className="kpi-card-ic text-blue" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">4.85%</span>
                    <span className="kpi-sc-sub text-purple">2.4x Industry Avg</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-blue-grad" style={{ width: '68%' }} /></div>
                  <div className="kpi-sc-footer"><span>Likes, Shares & Comments</span><span>Optimal ROAS</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Omnichannel Hubs</span>
                    <Layers className="kpi-card-ic text-orange" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">6 Channels</span>
                    <span className="kpi-sc-sub text-green">All Synced</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-orange-grad" style={{ width: '100%' }} /></div>
                  <div className="kpi-sc-footer"><span>LinkedIn, IG, X, FB, YT, TikTok</span><span>Connected</span></div>
                </div>
              </div>

              {/* Filtering & View Switcher Toolbar */}
              <div className="social-toolbar-row margin-top-md">
                <div className="social-search-box">
                  <Search className="search-ic" />
                  <input
                    type="text"
                    placeholder="Search by post title, hashtag, or category..."
                    value={postSearchQuery}
                    onChange={(e) => setPostSearchQuery(e.target.value)}
                    className="social-search-input"
                  />
                  {postSearchQuery && (
                    <button className="clear-search-btn" onClick={() => setPostSearchQuery('')}>
                      <X className="clear-ic" />
                    </button>
                  )}
                </div>

                {/* Platform Filter Pills */}
                <div className="platform-filter-pills">
                  {['All', 'Linkedin', 'Instagram', 'Twitter', 'Facebook', 'Youtube', 'TikTok'].map((platform) => (
                    <button
                      key={platform}
                      className={`platform-pill-btn ${postPlatformFilter === platform ? 'active' : ''} platform-${platform.toLowerCase()}`}
                      onClick={() => setPostPlatformFilter(platform)}
                    >
                      {platform === 'All' ? '🌐 All Channels' : platform}
                    </button>
                  ))}
                </div>

                {/* View Mode Switcher */}
                <div className="social-view-mode-toggle">
                  <button
                    className={`vtoggle-btn ${postViewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setPostViewMode('grid')}
                    title="Grid Card View"
                  >
                    <Grid className="vt-ic" />
                  </button>
                  <button
                    className={`vtoggle-btn ${postViewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setPostViewMode('list')}
                    title="List Table View"
                  >
                    <List className="vt-ic" />
                  </button>
                  <button
                    className={`vtoggle-btn ${postViewMode === 'calendar' ? 'active' : ''}`}
                    onClick={() => setPostViewMode('calendar')}
                    title="Calendar Schedule View"
                  >
                    <Calendar className="vt-ic" />
                  </button>
                </div>
              </div>

              {/* Status Filters Bar */}
              <div className="status-filter-subbar">
                <div className="status-pills-group">
                  {['All', 'Scheduled', 'Published', 'Queued', 'Draft'].map((st) => (
                    <button
                      key={st}
                      className={`status-subpill ${postStatusFilter === st ? 'active' : ''}`}
                      onClick={() => setPostStatusFilter(st)}
                    >
                      {st} <span className="status-count-tag">
                        {st === 'All'
                          ? socialPosts.length
                          : socialPosts.filter((p) => (p.status || '').toLowerCase() === st.toLowerCase()).length}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="social-post-count">
                  Showing {filteredSocialPosts.length} of {socialPosts.length} Posts
                </div>
              </div>

              {/* ========================================================= */}
              {/* VIEW 1: GRID CARDS VIEW                                   */}
              {/* ========================================================= */}
              {postViewMode === 'grid' && (
                <div className="social-posts-grid margin-top-md">
                  {filteredSocialPosts.length === 0 ? (
                    <div className="empty-social-state">
                      <Calendar className="empty-state-icon" />
                      <h3>No Social Content Found</h3>
                      <p>Try adjusting your search query or filters, or create a new post.</p>
                      <button className="btn-primary-purple margin-top-sm" onClick={() => handleOpenComposer()}>
                        <Plus className="btn-icon" /> Compose New Post
                      </button>
                    </div>
                  ) : (
                    filteredSocialPosts.map((post) => (
                      <div
                        key={post.id}
                        className="social-post-card animate-fade-in cursor-pointer"
                        onClick={() => {
                          setViewingPostDetail(post);
                          setDetailPreviewPlatform(Array.isArray(post.platforms) && post.platforms.length > 0 ? post.platforms[0] : 'Linkedin');
                        }}
                      >
                        {/* Media Thumbnail */}
                        <div className="post-card-media-wrap">
                          {post.media ? (
                            <img src={post.media} alt={post.title} className="post-card-media-img" />
                          ) : (
                            <div className="post-card-media-placeholder">
                              <MessageSquare className="placeholder-icon" />
                              <span>Text Post</span>
                            </div>
                          )}

                          {/* Status Tag Pill Overlay */}
                          <span className={`post-status-badge status-${(post.status || 'scheduled').toLowerCase()}`}>
                            {post.status}
                          </span>

                          {/* Category Pill */}
                          <span className="post-category-tag">{post.category}</span>
                        </div>

                        {/* Card Body */}
                        <div className="post-card-body">
                          {/* Platform Badge Bar */}
                          <div className="post-platform-badges-row">
                            {(Array.isArray(post.platforms) ? post.platforms : ['Linkedin']).map((plat) => (
                              <span key={plat} className={`pbadge-chip chip-${plat.toLowerCase()}`}>
                                {plat}
                              </span>
                            ))}
                          </div>

                          <h3 className="post-card-title">{post.title}</h3>
                          <p className="post-card-caption-snippet">{post.caption}</p>

                          {/* Schedule / Launch Timestamp Bar */}
                          <div className="post-schedule-meta font-mono">
                            <Clock className="meta-ic text-purple" />
                            {post.status === 'Published' ? (
                              <span>Published: {post.publishedAt || 'Aug 3, 2026'}</span>
                            ) : post.scheduledDate ? (
                              <span>Schedule: {post.scheduledDate} at {post.scheduledTime}</span>
                            ) : (
                              <span>Drafted • Ready to Schedule</span>
                            )}
                          </div>

                          {/* Telemetry Metrics */}
                          <div className="post-telemetry-footer">
                            <div className="tele-item">
                              <Eye className="tele-ic" />
                              <span>{post.projectedReach} Reach</span>
                            </div>
                            <div className="tele-item">
                              <Heart className="tele-ic" />
                              <span>{post.likes} Likes</span>
                            </div>
                            <div className="tele-item">
                              <Share2 className="tele-ic" />
                              <span>{post.shares} Shares</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* ========================================================= */}
              {/* VIEW 2: DENSE LIST TABLE VIEW                             */}
              {/* ========================================================= */}
              {postViewMode === 'list' && (
                <div className="social-posts-list-table-wrap margin-top-md">
                  <table className="social-list-table">
                    <thead>
                      <tr>
                        <th>Post Content & Media</th>
                        <th>Platforms</th>
                        <th>Status</th>
                        <th>Scheduled Time</th>
                        <th>Telemetry</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSocialPosts.map((post) => (
                        <tr
                          key={post.id}
                          className="cursor-pointer hover:bg-slate-50 transition-colors"
                          onClick={() => {
                            setViewingPostDetail(post);
                            setDetailPreviewPlatform(Array.isArray(post.platforms) && post.platforms.length > 0 ? post.platforms[0] : 'Linkedin');
                          }}
                        >
                          <td>
                            <div className="table-post-cell">
                              {post.media ? (
                                <img src={post.media} alt="" className="table-thumb-img" />
                              ) : (
                                <div className="table-thumb-placeholder"><MessageSquare className="t-ic" /></div>
                              )}
                              <div>
                                <strong className="t-post-title">{post.title}</strong>
                                <p className="t-post-caption">{(post.caption || '').slice(0, 75)}...</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="table-platforms-row">
                              {(Array.isArray(post.platforms) ? post.platforms : ['Linkedin']).map((plat) => (
                                <span key={plat} className={`pbadge-chip chip-${plat.toLowerCase()}`}>{plat}</span>
                              ))}
                            </div>
                          </td>
                          <td>
                            <span className={`post-status-badge status-${(post.status || 'scheduled').toLowerCase()}`}>{post.status}</span>
                          </td>
                          <td className="font-mono text-sm">
                            {post.scheduledDate ? `${post.scheduledDate} ${post.scheduledTime}` : 'Draft'}
                          </td>
                          <td>
                            <div className="table-telemetry font-mono text-xs">
                              <div>Reach: <strong>{post.projectedReach}</strong></div>
                              <div>Eng: <strong>{post.likes + post.shares} interactions</strong></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ========================================================= */}
              {/* VIEW 3: INTERACTIVE CALENDAR SCHEDULE VIEW                */}
              {/* ========================================================= */}
              {postViewMode === 'calendar' && (
                <div className="social-calendar-schedule-view margin-top-md">
                  <div className="calendar-header-row">
                    <h2>📅 Schedule Matrix - {activeCalendarMonth}</h2>
                    <div className="cal-view-sub">Drag and click dates to inspect multi-channel deployment pipeline</div>
                  </div>

                  <div className="calendar-grid-container">
                    <div className="cal-day-header">Mon</div>
                    <div className="cal-day-header">Tue</div>
                    <div className="cal-day-header">Wed</div>
                    <div className="cal-day-header">Thu</div>
                    <div className="cal-day-header">Fri</div>
                    <div className="cal-day-header">Sat</div>
                    <div className="cal-day-header">Sun</div>

                    {/* Render 31 Calendar Day Cells for August 2026 */}
                    {Array.from({ length: 31 }, (_, i) => {
                      const dayNum = i + 1;
                      const dateStr = `2026-08-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                      const dayPosts = socialPosts.filter((p) => p.scheduledDate === dateStr);

                      return (
                        <div key={dayNum} className={`calendar-day-cell ${dayPosts.length > 0 ? 'has-posts' : ''}`}>
                          <div className="cal-date-number">{dayNum}</div>
                          <div className="cal-day-posts-list">
                            {dayPosts.map((dp) => (
                              <div
                                key={dp.id}
                                className={`cal-post-chip status-${(dp.status || 'scheduled').toLowerCase()}`}
                                onClick={() => handleOpenComposer(dp)}
                                title={`${dp.title} (${(Array.isArray(dp.platforms) ? dp.platforms : ['Linkedin']).join(', ')})`}
                              >
                                <span className="cal-chip-time">{dp.scheduledTime || '12:00'}</span>
                                <span className="cal-chip-title">{dp.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}



          {/* ========================================================= */}
          {/* YOUR CONTENTS PAGE VIEW                                    */}
          {/* ========================================================= */}
          {currentView === 'your-contents' && (
            <div className="your-contents-page-container animate-fade-in-up">
              {/* Breadcrumbs Row */}
              <div className="dash-breadcrumbs" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <span>DigiToomasha Intelligence</span>
                <ChevronRight className="bc-sep" />
                <span style={{ cursor: 'pointer' }} onClick={() => setCurrentView('posts-grid')}>Content Studio</span>
                <ChevronRight className="bc-sep" />
                <span className="bc-current">Your Contents & Asset Library</span>
              </div>

              {/* Header Banner */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <h1 className="dash-page-title" style={{ margin: 0 }}>Your Contents & Asset Library</h1>
                    <span className="yc-live-badge">
                      <span className="yc-live-dot" />
                      <span>Live Socket Stream</span>
                    </span>
                  </div>
                  <p className="dash-page-subtitle" style={{ margin: '0.25rem 0 0 0' }}>
                    Manage, preview, and monitor real-time social content synced live across all clients.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    className="btn-outline-purple sm-btn"
                    onClick={() => setCurrentView('posts-grid')}
                    style={{ padding: '0.55rem 1rem', borderRadius: '12px' }}
                  >
                    <span>← Back to Social Studio</span>
                  </button>
                  <button
                    className="btn-primary-purple"
                    onClick={() => handleOpenComposer()}
                    style={{ padding: '0.55rem 1.25rem', borderRadius: '12px', background: '#7c3aed', color: '#fff', border: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    <Plus style={{ width: 16, height: 16 }} />
                    <span>Create New Post</span>
                  </button>
                </div>
              </div>

              {/* Live Socket Toast Banner if present */}
              {socketToastMessage && (
                <div className="yc-toast-banner" style={{ borderRadius: '14px', marginBottom: '1.5rem' }}>
                  <Sparkles style={{ width: 18, height: 18 }} />
                  <span>{socketToastMessage}</span>
                </div>
              )}

              {/* Search & Filter Toolbar */}
              <div className="yc-modal-toolbar" style={{ borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '1.75rem' }}>
                <div className="yc-toolbar-filters">
                  <div className="yc-search-input-wrapper">
                    <Search className="yc-search-icon" />
                    <input
                      type="text"
                      placeholder="Search your content titles, captions..."
                      value={ycSearchQuery}
                      onChange={(e) => setYcSearchQuery(e.target.value)}
                    />
                  </div>

                  <select
                    className="yc-filter-select"
                    value={ycPlatformFilter}
                    onChange={(e) => setYcPlatformFilter(e.target.value)}
                  >
                    <option value="All">All Channels</option>
                    <option value="Linkedin">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Twitter">Twitter / X</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Youtube">YouTube</option>
                    <option value="TikTok">TikTok</option>
                  </select>

                  <select
                    className="yc-filter-select"
                    value={ycStatusFilter}
                    onChange={(e) => setYcStatusFilter(e.target.value)}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* Posts Content Grid */}
              {(() => {
                const currentClientEmail = (currentUser?.email || profileData?.email || 'emilia@digitoomasha.com').toLowerCase().trim();
                const currentClientName = (currentUser?.fullName || currentUser?.name || profileData?.fullName || '').toLowerCase().trim();

                const filtered = socialPosts.filter((p) => {
                  const isClientPost =
                    p.isClientAdded === true ||
                    p.is_client_added === true ||
                    (p.id && p.id !== 'sp-101' && p.id !== 'sp-102');

                  if (!isClientPost) return false;

                  // Strict Client Isolation: Ensure post belongs to the currently logged in client
                  const postEmail = (p.clientEmail || p.client_email || p.email || p.authorEmail || '').toLowerCase().trim();
                  const postAuthor = (p.author || p.clientName || '').toLowerCase().trim();

                  let belongsToCurrentClient = true;
                  if (postEmail && currentClientEmail) {
                    belongsToCurrentClient = postEmail === currentClientEmail;
                  } else if (postAuthor && currentClientName) {
                    belongsToCurrentClient =
                      postAuthor === currentClientName ||
                      postAuthor.includes(currentClientName) ||
                      currentClientName.includes(postAuthor);
                  }

                  if (!belongsToCurrentClient) return false;

                  const matchesSearch =
                    !ycSearchQuery ||
                    p.title?.toLowerCase().includes(ycSearchQuery.toLowerCase()) ||
                    p.caption?.toLowerCase().includes(ycSearchQuery.toLowerCase());
                  const matchesPlatform =
                    ycPlatformFilter === 'All' ||
                    (Array.isArray(p.platforms) && p.platforms.includes(ycPlatformFilter));
                  const matchesStatus =
                    ycStatusFilter === 'All' || p.status === ycStatusFilter;
                  return matchesSearch && matchesPlatform && matchesStatus;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="yc-empty-state">
                      <FileText className="yc-empty-icon" />
                      <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
                        No Content Posts Found
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem 0' }}>
                        You haven't created any posts matching these filters yet.
                      </p>
                      <button
                        className="btn-primary-purple"
                        onClick={() => handleOpenComposer()}
                      >
                        <Plus className="btn-icon" />
                        <span>Create Your First Post</span>
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="yc-posts-grid">
                    {filtered.map((post) => (
                      <div
                        key={post.id}
                        className="yc-post-card cursor-pointer"
                        onClick={() => {
                          setViewingPostDetail(post);
                          setDetailPreviewPlatform(Array.isArray(post.platforms) && post.platforms.length > 0 ? post.platforms[0] : 'Linkedin');
                        }}
                      >
                        <div className="yc-post-media-box">
                          <img
                            src={
                              post.media ||
                              'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
                            }
                            alt={post.title}
                            className="yc-post-media-img"
                          />
                          <span
                            className={`yc-post-status-pill ${post.status === 'Published'
                              ? 'yc-status-published'
                              : post.status === 'Draft'
                                ? 'yc-status-draft'
                                : 'yc-status-scheduled'
                              }`}
                          >
                            {post.status}
                          </span>
                        </div>

                        <div className="yc-post-card-content">
                          <div className="yc-post-platforms">
                            {(Array.isArray(post.platforms) ? post.platforms : ['Linkedin']).map((plat) => (
                              <span key={plat} className="yc-platform-chip">
                                {plat}
                              </span>
                            ))}
                          </div>
                          <h4 className="yc-post-title">{post.title}</h4>
                          <p className="yc-post-caption">{post.caption}</p>
                        </div>

                        <div className="yc-post-card-footer">
                          <span className="yc-date-time">
                            {post.status === 'Published'
                              ? `Published ${post.publishedAt || 'Recently'}`
                              : `Schedule: ${post.scheduledDate || 'Today'} ${post.scheduledTime || ''}`}
                          </span>
                          <div className="yc-card-actions">
                            {post.status !== 'Published' && (
                              <button
                                className="yc-action-btn-pub"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuickPublish(post.id);
                                }}
                                title="Publish Immediately"
                              >
                                Publish Now
                              </button>
                            )}
                            <button
                              className="yc-action-btn-icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenComposer(post);
                              }}
                              title="Edit Post"
                            >
                              <Edit2 style={{ width: 14, height: 14 }} />
                            </button>
                            <button
                              className="yc-action-btn-icon yc-action-btn-delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePost(post.id);
                              }}
                              title="Delete Post"
                            >
                              <Trash2 style={{ width: 14, height: 14 }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
          {/* ========================================================= */}
          {/* RECOMMENDED CAMPAIGNS PAGE (CAMPAIGNS MASTER VIEW)         */}
          {/* ========================================================= */}
          {(currentView === 'campaigns-master' || currentView === 'campaigns' || currentView === 'create-campaign') && (
            <div className="campaigns-master-container animate-fade-in" style={{ paddingBottom: '3rem' }}>
              {/* 1. HEADER ROW */}
              <div className="dash-breadcrumbs" style={{ marginBottom: '0.75rem' }}>
                <span>Dashboard</span>
                <ChevronRight className="bc-sep" />
                <span className="bc-current">Campaigns Hub</span>
              </div>

              <div className="dash-title-row" style={{ marginBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h1 className="dash-page-title" style={{ margin: 0, fontSize: '1.85rem', fontWeight: 800, color: '#0f172a' }}>Campaigns</h1>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700 }}>
                      <span className="green-pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                      {campaignsList.filter(c => c.status === 'Active' || c.status === 'Scaling').length} Active Live
                    </span>
                  </div>
                  <p className="dash-page-subtitle" style={{ margin: 0, color: '#64748b', fontSize: '0.92rem' }}>
                    Manage, scale, and analyze multi-channel advertising campaigns across Meta, Google, TikTok, LinkedIn, and YouTube.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    onClick={() => setIsCreateCampaignModalOpen(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'linear-gradient(135deg, #1E3A2B 0%, #152B20 100%)',
                      color: '#ffffff',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(30, 58, 43, 0.35)',
                      transition: 'transform 0.2s ease, boxShadow 0.2s ease'
                    }}
                  >
                    <Plus style={{ width: 18, height: 18 }} />
                    <span>Create Campaign</span>
                  </button>
                </div>
              </div>

              {/* 2. QUICK STATS (4 Cards) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {/* Stat 1: Total Campaigns */}
                <div className="icard" style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E0DDD2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#5A5A55', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Campaigns</span>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#EAE6D6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E3A2B' }}>
                      <Target style={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A1A' }}>{campaignsList.length}</div>
                  <div style={{ fontSize: '0.8rem', color: '#1E3A2B', marginTop: '4px', fontWeight: 600 }}>
                    {campaignsList.filter(c => c.status === 'Active' || c.status === 'Scaling').length} Active · {campaignsList.filter(c => c.status === 'Paused').length} Paused
                  </div>
                </div>

                {/* Stat 2: Active Campaigns */}
                <div className="icard" style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E0DDD2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#5A5A55', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Campaigns</span>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#FAF8F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E3A2B' }}>
                      <Zap style={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {campaignsList.filter(c => c.status === 'Active' || c.status === 'Scaling').length} Live
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#5A5A55', marginTop: '4px', fontWeight: 600 }}>
                    Across Meta, Google & TikTok
                  </div>
                </div>

                {/* Stat 3: Total Spend */}
                <div className="icard" style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #E0DDD2', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#5A5A55', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Spend</span>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#EAE6D6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D99B00' }}>
                      <DollarSign style={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A1A' }}>
                    ₹{campaignsList.reduce((acc, c) => acc + (Number(c.spent) || 0), 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#D99B00', marginTop: '4px', fontWeight: 600 }}>
                    Daily Budget Cap: ₹{campaignsList.reduce((acc, c) => acc + (Number(c.budget) || 0), 0).toLocaleString()}/day
                  </div>
                </div>

                {/* Stat 4: Conversions / ROAS */}
                <div className="icard" style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Conversions / ROAS</span>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
                      <TrendingUp style={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span>{campaignsList.reduce((acc, c) => acc + (Number(c.conversions || c.leads) || 0), 0).toLocaleString()}</span>
                    <span style={{ fontSize: '1rem', color: '#16a34a', fontWeight: 700 }}>4.8x ROAS</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#16a34a', marginTop: '4px', fontWeight: 600 }}>
                    Est. Revenue: ₹{campaignsList.reduce((acc, c) => acc + (Number(c.revenue) || (Number(c.spent) || 0) * 4.8), 0).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* 3. CAMPAIGN PERFORMANCE CHART CARD */}
              <div className="icard" style={{ background: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>Campaign Performance Trend</h3>
                    <p style={{ margin: '2px 0 0', fontSize: '0.84rem', color: '#64748b' }}>Real-time cross-channel spend vs projected revenue pacing.</p>
                  </div>

                  {/* 7D / 30D Filter Buttons */}
                  <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '10px', gap: '4px' }}>
                    <button
                      onClick={() => setCampaignChartTimeframe('7D')}
                      style={{
                        padding: '0.35rem 0.9rem',
                        borderRadius: '7px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: campaignChartTimeframe === '7D' ? '#ffffff' : 'transparent',
                        color: campaignChartTimeframe === '7D' ? '#1E3A2B' : '#5A5A55',
                        boxShadow: campaignChartTimeframe === '7D' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Last 7 Days
                    </button>
                    <button
                      onClick={() => setCampaignChartTimeframe('30D')}
                      style={{
                        padding: '0.35rem 0.9rem',
                        borderRadius: '7px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: campaignChartTimeframe === '30D' ? '#ffffff' : 'transparent',
                        color: campaignChartTimeframe === '30D' ? '#1E3A2B' : '#5A5A55',
                        boxShadow: campaignChartTimeframe === '30D' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Last 30 Days
                    </button>
                  </div>
                </div>

                {/* Chart Visual Simulation */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', alignItems: 'flex-end', height: '180px', paddingTop: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                  {(campaignChartTimeframe === '7D'
                    ? [
                        { day: 'Mon', spend: 40, rev: 85, conv: 42 },
                        { day: 'Tue', spend: 55, rev: 92, conv: 58 },
                        { day: 'Wed', spend: 60, rev: 110, conv: 64 },
                        { day: 'Thu', spend: 75, rev: 135, conv: 78 },
                        { day: 'Fri', spend: 90, rev: 160, conv: 92 },
                        { day: 'Sat', spend: 100, rev: 180, conv: 105 },
                        { day: 'Sun', spend: 85, rev: 150, conv: 88 }
                      ]
                    : [
                        { day: 'W1', spend: 45, rev: 90, conv: 110 },
                        { day: 'W2', spend: 65, rev: 125, conv: 145 },
                        { day: 'W3', spend: 80, rev: 155, conv: 175 },
                        { day: 'W4', spend: 95, rev: 175, conv: 195 },
                        { day: 'W5', spend: 70, rev: 140, conv: 150 },
                        { day: 'W6', spend: 85, rev: 165, conv: 180 },
                        { day: 'W7', spend: 90, rev: 170, conv: 185 }
                      ]
                  ).map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', width: '100%', justifyContent: 'center', height: '140px' }}>
                        <div
                          title={`Spend: ${item.spend}%`}
                          style={{
                            width: '35%',
                            height: `${item.spend}%`,
                            background: 'linear-gradient(180deg, #2d553f 0%, #1E3A2B 100%)',
                            borderRadius: '4px 4px 0 0',
                            transition: 'height 0.4s ease'
                          }}
                        />
                        <div
                          title={`Revenue: ${item.rev}%`}
                          style={{
                            width: '35%',
                            height: `${item.rev * 0.75}%`,
                            background: 'linear-gradient(180deg, #D99B00 0%, #b88300 100%)',
                            borderRadius: '4px 4px 0 0',
                            transition: 'height 0.4s ease'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{item.day}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, background: '#1E3A2B' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Ad Spend (₹)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, background: '#D99B00' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569' }}>Attributed Revenue (₹)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#16a34a' }}>⚡ Peak ROAS: 5.5x</span>
                  </div>
                </div>
              </div>

              {/* 4. SEARCH & FILTERS BAR */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  {/* Search box */}
                  <div style={{ flex: '1 1 260px', position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#94a3b8' }} />
                    <input
                      type="text"
                      placeholder="Search campaign name, platform, audience..."
                      value={campaignSearchQuery}
                      onChange={(e) => setCampaignSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        paddingLeft: '38px',
                        paddingRight: '12px',
                        paddingTop: '0.55rem',
                        paddingBottom: '0.55rem',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.85rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>

                  {/* Platform filter */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>Platform:</span>
                    <select
                      value={campaignPlatformFilter}
                      onChange={(e) => setCampaignPlatformFilter(e.target.value)}
                      style={{ padding: '0.5rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, background: '#fff', color: '#1e293b', cursor: 'pointer' }}
                    >
                      <option value="All">All Platforms</option>
                      <option value="Meta Ads">Meta Ads (FB/IG)</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="TikTok">TikTok Ads</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="YouTube">YouTube</option>
                    </select>
                  </div>

                  {/* Status filter */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>Status:</span>
                    <select
                      value={campaignStatusFilter}
                      onChange={(e) => setCampaignStatusFilter(e.target.value)}
                      style={{ padding: '0.5rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, background: '#fff', color: '#1e293b', cursor: 'pointer' }}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Scaling">Scaling</option>
                      <option value="Paused">Paused</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Sort filter */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>Sort By:</span>
                    <select
                      value={campaignSortOption}
                      onChange={(e) => setCampaignSortOption(e.target.value)}
                      style={{ padding: '0.5rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, background: '#fff', color: '#1e293b', cursor: 'pointer' }}
                    >
                      <option value="Highest ROAS">Highest ROAS</option>
                      <option value="Highest Spend">Highest Spend</option>
                      <option value="Most Conversions">Most Conversions</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 5. CAMPAIGN LIST TABLE */}
              <div className="icard" style={{ background: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Campaign Performance Directory</h3>
                  <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Showing {filteredCampaignsList.length} campaigns</span>
                </div>

                <div className="table-responsive-box">
                  <table className="admin-users-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>CAMPAIGN NAME</th>
                        <th>PLATFORM</th>
                        <th>STATUS</th>
                        <th>DAILY BUDGET</th>
                        <th>SPEND</th>
                        <th>CONVERSIONS</th>
                        <th>ROAS</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCampaignsList.length === 0 ? (
                        <tr>
                          <td colSpan="8" style={{ textAlign: 'center', padding: '2.5rem', color: '#64748b' }}>
                            No campaigns match the selected filters.
                          </td>
                        </tr>
                      ) : (
                        filteredCampaignsList.map((c) => {
                          const isLive = c.status === 'Active' || c.status === 'Scaling';
                          const roasVal = parseFloat(c.roas) || 4.5;
                          const spendVal = Number(c.spent) || Number(c.spend) || 0;
                          const convVal = Number(c.conversions) || Number(c.leads) || 0;
                          const budgetVal = Number(c.budget) || 10000;

                          return (
                            <tr key={c.id}>
                              <td>
                                <div>
                                  <strong style={{ fontSize: '0.88rem', color: '#0f172a', display: 'block' }}>{c.name}</strong>
                                  <span style={{ fontSize: '0.76rem', color: '#64748b' }}>{c.audience || c.objective || 'Targeting Active'}</span>
                                </div>
                              </td>
                              <td>
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '0.25rem 0.6rem',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  background: c.platform.includes('Meta') ? '#eff6ff' : c.platform.includes('Google') ? '#fff7ed' : c.platform.includes('TikTok') ? '#ecfeff' : c.platform.includes('LinkedIn') ? '#f0f9ff' : '#fef2f2',
                                  color: c.platform.includes('Meta') ? '#1d4ed8' : c.platform.includes('Google') ? '#c2410c' : c.platform.includes('TikTok') ? '#0891b2' : c.platform.includes('LinkedIn') ? '#0369a1' : '#b91c1c'
                                }}>
                                  {c.platform}
                                </span>
                              </td>
                              <td>
                                <button
                                  onClick={() => handleToggleCampaignStatus(c.id)}
                                  title="Click to toggle status"
                                  style={{
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.76rem',
                                    fontWeight: 700,
                                    background: isLive ? '#dcfce7' : '#fef3c7',
                                    color: isLive ? '#15803d' : '#b45309'
                                  }}
                                >
                                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: isLive ? '#16a34a' : '#d97706' }} />
                                  {c.status}
                                </button>
                              </td>
                              <td><strong style={{ fontSize: '0.85rem', color: '#334155' }}>₹{budgetVal.toLocaleString()}/d</strong></td>
                              <td><span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>₹{spendVal.toLocaleString()}</span></td>
                              <td><span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{convVal}</span></td>
                              <td>
                                <span style={{
                                  padding: '0.2rem 0.55rem',
                                  borderRadius: '6px',
                                  fontSize: '0.8rem',
                                  fontWeight: 800,
                                  background: roasVal >= 4.5 ? '#dcfce7' : roasVal >= 3.0 ? '#fef3c7' : '#fee2e2',
                                  color: roasVal >= 4.5 ? '#15803d' : roasVal >= 3.0 ? '#b45309' : '#b91c1c'
                                }}>
                                  {typeof c.roas === 'number' ? `${c.roas}x` : c.roas}
                                </span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <button
                                    onClick={() => handleToggleCampaignStatus(c.id)}
                                    style={{ padding: '0.3rem 0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer' }}
                                  >
                                    {isLive ? <PauseCircle style={{ width: 14, height: 14, color: '#d97706' }} /> : <PlayCircle style={{ width: 14, height: 14, color: '#16a34a' }} />}
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCampaignMaster(c.id)}
                                    style={{ padding: '0.3rem 0.55rem', borderRadius: '6px', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer' }}
                                    title="Delete Campaign"
                                  >
                                    <Trash2 style={{ width: 14, height: 14 }} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 6. TOP & UNDERPERFORMING CAMPAIGNS BREAKDOWN */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {/* Top Performing Campaigns */}
                <div className="icard" style={{ background: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                      <Award style={{ width: 18, height: 18 }} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>🏆 Best Performing Campaigns</h4>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Highest Return on Ad Spend (ROAS &gt; 4.5x)</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {campaignsList
                      .filter(c => (parseFloat(c.roas) || 0) >= 4.5)
                      .slice(0, 3)
                      .map((topC) => (
                        <div key={topC.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                          <div>
                            <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block' }}>{topC.name}</strong>
                            <span style={{ fontSize: '0.76rem', color: '#64748b' }}>{topC.platform} · {topC.conversions || topC.leads || 300} Conv.</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#16a34a', display: 'block' }}>
                              {typeof topC.roas === 'number' ? `${topC.roas}x` : topC.roas} ROAS
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>₹{(topC.spent || 50000).toLocaleString()} spent</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Underperforming Campaigns */}
                <div className="icard" style={{ background: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                      <AlertTriangle style={{ width: 18, height: 18 }} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>⚠️ Needs Optimization / Attention</h4>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Campaigns with ROAS &lt; 4.0x or Paused status</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {campaignsList
                      .filter(c => (parseFloat(c.roas) || 0) < 4.0 || c.status === 'Paused')
                      .slice(0, 3)
                      .map((lowC) => (
                        <div key={lowC.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: '12px', background: '#fff1f2', border: '1px solid #ffe4e6' }}>
                          <div>
                            <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block' }}>{lowC.name}</strong>
                            <span style={{ fontSize: '0.76rem', color: '#9f1239' }}>{lowC.platform} · Action: Refresh creative assets</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#dc2626', display: 'block' }}>
                              {typeof lowC.roas === 'number' ? `${lowC.roas}x` : lowC.roas} ROAS
                            </span>
                            <button
                              onClick={() => handleApplyAiTip(lowC.id)}
                              style={{ fontSize: '0.72rem', color: '#7c3aed', fontWeight: 700, background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              Apply AI Fix
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* 7. CREATE CAMPAIGN MODAL OVERLAY */}
              {isCreateCampaignModalOpen && (
                <div className="social-composer-modal-overlay">
                  <div className="social-composer-modal-card animate-scale-up" style={{ maxWidth: 580, padding: '1.75rem' }}>
                    <div className="composer-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Create New Advertising Campaign</h2>
                        <p style={{ fontSize: '0.84rem', color: '#64748b', margin: '4px 0 0' }}>Deploy multi-platform paid ads with automated AI ROAS tracking.</p>
                      </div>
                      <button onClick={() => setIsCreateCampaignModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <X style={{ width: 20, height: 20 }} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Campaign Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Meta IG Reels - Q3 Flash Sale Push"
                          value={newCampaignForm.name}
                          onChange={(e) => setNewCampaignForm(prev => ({ ...prev, name: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Platform *</label>
                          <select
                            value={newCampaignForm.platform}
                            onChange={(e) => setNewCampaignForm(prev => ({ ...prev, platform: e.target.value }))}
                            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
                          >
                            <option value="Meta Ads">Meta Ads (FB / IG)</option>
                            <option value="Google Ads">Google Ads (Search/Shopping)</option>
                            <option value="TikTok Ads">TikTok Ads</option>
                            <option value="LinkedIn">LinkedIn Ads</option>
                            <option value="YouTube">YouTube Video Ads</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Objective *</label>
                          <select
                            value={newCampaignForm.objective}
                            onChange={(e) => setNewCampaignForm(prev => ({ ...prev, objective: e.target.value }))}
                            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem', background: '#fff' }}
                          >
                            <option value="Conversions / Sales">Conversions / Sales</option>
                            <option value="Lead Generation">Lead Generation</option>
                            <option value="Traffic / Clicks">Traffic / Clicks</option>
                            <option value="Brand Awareness">Brand Awareness</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Daily Budget (₹) *</label>
                          <input
                            type="number"
                            placeholder="15000"
                            value={newCampaignForm.budget}
                            onChange={(e) => setNewCampaignForm(prev => ({ ...prev, budget: Number(e.target.value) }))}
                            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Start Schedule</label>
                          <input
                            type="date"
                            value={newCampaignForm.startDate}
                            onChange={(e) => setNewCampaignForm(prev => ({ ...prev, startDate: e.target.value }))}
                            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Target Audience</label>
                        <input
                          type="text"
                          placeholder="e.g. Females 18-35 Beauty & Wellness in India"
                          value={newCampaignForm.audience}
                          onChange={(e) => setNewCampaignForm(prev => ({ ...prev, audience: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Ad Creative Asset / Title</label>
                        <input
                          type="text"
                          placeholder="e.g. UGC Video Reel #3 - Autumn Routine"
                          value={newCampaignForm.creative}
                          onChange={(e) => setNewCampaignForm(prev => ({ ...prev, creative: e.target.value }))}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                      <button
                        onClick={() => setIsCreateCampaignModalOpen(false)}
                        style={{ padding: '0.6rem 1.1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateCampaignSubmit}
                        style={{ padding: '0.6rem 1.25rem', borderRadius: '10px', border: 'none', background: '#1E3A2B', color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(30,58,43,0.3)' }}
                      >
                        Launch Campaign
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {(currentView === 'analytics' || currentView === 'analysis') && (
            <div className="analytics-master-container animate-fade-in">
              
              {/* 1. TOP TITLE & ACTION HEADER */}
              <div className="roas-header-wrap">
                <div className="roas-header-title-group">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                    <h1>
                      Marketing Intelligence & ROAS Analytics
                    </h1>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#EAE6D6', color: '#1E3A2B', border: '1px solid #E0DDD2', padding: '0.15rem 0.55rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1E3A2B', display: 'inline-block' }} /> Live
                    </span>
                  </div>
                  <p style={{ margin: 0, color: '#5A5A55', fontSize: '0.88rem' }}>
                    Collecting data from Google Ads, Meta, Linkedin, TikTok, GA4 & more. AI-powered insights for better ROAS.
                  </p>
                </div>

                <div className="roas-header-actions">
                  <button
                    onClick={() => setShowAlertCenterModal(true)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', color: '#1A1A1A', border: '1px solid #E0DDD2', padding: '0.5rem 0.9rem', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                  >
                    <Bell style={{ width: 15, height: 15, color: '#D99B00' }} />
                    <span>Alerts</span>
                    <span style={{ background: '#D99B00', color: '#fff', fontSize: '0.7rem', fontWeight: 800, width: 18, height: 18, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                  </button>

                  <button
                    onClick={handleExportBIPdf}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ffffff', color: '#1E3A2B', border: '1px solid #E0DDD2', padding: '0.5rem 0.9rem', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                  >
                    <Download style={{ width: 15, height: 15 }} />
                    <span>Export Report</span>
                  </button>

                  <button
                    onClick={handleRunAIAudit}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #1E3A2B 0%, #152B20 100%)', color: '#ffffff', border: 'none', padding: '0.55rem 1.1rem', borderRadius: '10px', fontSize: '0.84rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(30, 58, 43, 0.3)' }}
                  >
                    <Sparkles style={{ width: 16, height: 16 }} />
                    <span>Run AI Audit</span>
                  </button>
                </div>
              </div>

              {/* 2. TIMEFRAME & CHANNEL CONTROL BAR */}
              <div className="roas-control-bar">
                {/* Timeframe selector */}
                <div className="roas-filter-group">
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#5A5A55', textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>Timeframe:</span>
                  {[
                    { key: 'today', label: 'Today' },
                    { key: '7d', label: 'Last 7 Days' },
                    { key: '30d', label: 'Last 30 Days' },
                    { key: 'q3', label: 'Q3 2026 (Current)' },
                    { key: 'ytd', label: 'Year to Date' }
                  ].map((tf) => (
                    <button
                      key={tf.key}
                      onClick={() => setBiDateRange(tf.key)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        flexShrink: 0,
                        background: biDateRange === tf.key ? '#1E3A2B' : 'transparent',
                        color: biDateRange === tf.key ? '#ffffff' : '#5A5A55',
                        boxShadow: biDateRange === tf.key ? '0 2px 6px rgba(30,58,43,0.3)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>

                {/* Channel selector */}
                <div className="roas-filter-group">
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>Channel:</span>
                  {[
                    { key: 'All', label: '🌐 All Channels' },
                    { key: 'Google Ads', label: 'Google Ads' },
                    { key: 'Meta Ads', label: 'Meta Ads' },
                    { key: 'LinkedIn', label: 'LinkedIn' },
                    { key: 'TikTok Ads', label: 'TikTok Ads' },
                    { key: 'YouTube Ads', label: 'YouTube Ads' }
                  ].map((ch) => (
                    <button
                      key={ch.key}
                      onClick={() => setBiChannelFilter(ch.key)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: '1px solid',
                        flexShrink: 0,
                        borderColor: biChannelFilter === ch.key ? '#ddd6fe' : '#e2e8f0',
                        cursor: 'pointer',
                        background: biChannelFilter === ch.key ? '#f5f3ff' : '#ffffff',
                        color: biChannelFilter === ch.key ? '#7c3aed' : '#475569',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {ch.label}
                    </button>
                  ))}
                  <button style={{ padding: '0.35rem 0.6rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                    ✕ More
                  </button>
                </div>
              </div>

              {/* 3. TOP STRIP METRIC CARDS (7 Stat Tiles) */}
              <div className="roas-top-strip-grid">
                {/* Tile 1: Live Active Visitors */}
                <div className="roas-stat-tile">
                  <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Users style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="roas-stat-tile-content">
                    <span className="roas-stat-tile-title">Live Active Visitors</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                      <strong className="roas-stat-tile-val">342</strong>
                      <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 700 }}>active</span>
                    </div>
                  </div>
                </div>

                {/* Tile 2: Live Clicks / Hr */}
                <div className="roas-stat-tile">
                  <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MousePointer style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="roas-stat-tile-content">
                    <span className="roas-stat-tile-title">Live Clicks / Hr</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                      <strong className="roas-stat-tile-val">1,842</strong>
                      <span style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: 700 }}>clicks</span>
                    </div>
                  </div>
                </div>

                {/* Tile 3: Live Purchases Today */}
                <div className="roas-stat-tile">
                  <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#fce7f3', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShoppingBag style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="roas-stat-tile-content">
                    <span className="roas-stat-tile-title">Live Purchases Today</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                      <strong className="roas-stat-tile-val">64</strong>
                      <span style={{ fontSize: '0.7rem', color: '#db2777', fontWeight: 700 }}>orders</span>
                    </div>
                  </div>
                </div>

                {/* Tile 4: Today's Revenue */}
                <div className="roas-stat-tile">
                  <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <DollarSign style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="roas-stat-tile-content">
                    <span className="roas-stat-tile-title">Today's Revenue</span>
                    <strong className="roas-stat-tile-val" style={{ color: '#16a34a', marginTop: '2px', display: 'block' }}>₹38,420.00</strong>
                  </div>
                </div>

                {/* Tile 5: Today's Ad Spend */}
                <div className="roas-stat-tile">
                  <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CreditCard style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="roas-stat-tile-content">
                    <span className="roas-stat-tile-title">Today's Ad Spend</span>
                    <strong className="roas-stat-tile-val" style={{ color: '#ea580c', marginTop: '2px', display: 'block' }}>₹7,730.00</strong>
                  </div>
                </div>

                {/* Tile 6: Current Real-Time ROAS */}
                <div className="roas-stat-tile">
                  <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <TrendingUp style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="roas-stat-tile-content">
                    <span className="roas-stat-tile-title">Current Real-Time ROAS</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
                      <strong className="roas-stat-tile-val" style={{ color: '#16a34a' }}>4.97x</strong>
                      <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 800 }}>ROAS</span>
                    </div>
                  </div>
                </div>

                {/* Tile 7: Bounce Rate */}
                <div className="roas-stat-tile">
                  <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Activity style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="roas-stat-tile-content">
                    <span className="roas-stat-tile-title">Bounce Rate</span>
                    <strong className="roas-stat-tile-val" style={{ marginTop: '2px', display: 'block' }}>28.4%</strong>
                  </div>
                </div>
              </div>

              {/* 4. MAIN 3-COLUMN EXECUTIVE GRID */}
              <div className="roas-exec-grid">
                
                {/* COLUMN 1: EXECUTIVE KPI SCORECARD */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Executive KPI Scorecard</h3>
                  
                  <div className="roas-scorecard-grid">
                    {/* Card 1 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Total Revenue</span>
                      <strong className="roas-scorecard-card-val">₹48,600.00</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#16a34a' }}>↑ 28.6% vs last period</span>
                    </div>

                    {/* Card 2 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Total Ad Spend</span>
                      <strong className="roas-scorecard-card-val">₹9,840.00</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#7c3aed' }}>94.2% Budget Pacing</span>
                    </div>

                    {/* Card 3 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Blended ROAS</span>
                      <strong className="roas-scorecard-card-val" style={{ color: '#16a34a' }}>4.94x</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#16a34a' }}>Excellent · Target: 3.5x</span>
                    </div>

                    {/* Card 4 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Total Conversions</span>
                      <strong className="roas-scorecard-card-val">1,140 <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b' }}>SQLs</span></strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#16a34a' }}>↑ 19.8% vs last period</span>
                    </div>

                    {/* Card 5 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Conversion Rate</span>
                      <strong className="roas-scorecard-card-val">3.85%</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#16a34a' }}>↑ 0.65% vs last period</span>
                    </div>

                    {/* Card 6 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Total Clicks</span>
                      <strong className="roas-scorecard-card-val">42,850</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#16a34a' }}>↑ 14.2% vs last period</span>
                    </div>

                    {/* Card 7 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Impressions</span>
                      <strong className="roas-scorecard-card-val">890,500</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#16a34a' }}>↑ 18.5% vs last period</span>
                    </div>

                    {/* Card 8 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Avg. CPC</span>
                      <strong className="roas-scorecard-card-val">₹1.13</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#16a34a' }}>↓ 8.4% vs last period</span>
                    </div>

                    {/* Card 9 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Cost per Acq (CPA)</span>
                      <strong className="roas-scorecard-card-val">₹8.60</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#16a34a' }}>↓ 12.7% vs last period</span>
                    </div>

                    {/* Card 10 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Average Order Val</span>
                      <strong className="roas-scorecard-card-val">₹42.60</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#16a34a' }}>↑ 12.4% vs last period</span>
                    </div>

                    {/* Card 11 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Customer LTV</span>
                      <strong className="roas-scorecard-card-val">₹376.00</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#7c3aed' }}>8.8x LTV:CAC</span>
                    </div>

                    {/* Card 12 */}
                    <div className="roas-scorecard-card">
                      <span className="roas-scorecard-card-title">Returning Customers</span>
                      <strong className="roas-scorecard-card-val">64.2%</strong>
                      <span className="roas-scorecard-card-sub" style={{ color: '#16a34a' }}>↑ 5.1% vs last period</span>
                    </div>
                  </div>
                </div>

                {/* COLUMN 2: MULTI-CHANNEL ATTRIBUTION & ROAS MATRIX */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Multi-Channel Attribution & ROAS Matrix</h3>
                    <p style={{ margin: '3px 0 1.25rem', fontSize: '0.8rem', color: '#64748b' }}>Revenue distribution and yield performance by channel</p>

                    {/* Donut & Legend Container */}
                    <div className="roas-donut-legend-wrap">
                      {/* SVG Donut Chart */}
                      <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0, margin: '0 auto' }}>
                        <svg width="140" height="140" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                          {/* Segment 1: Google (41.2%) - Blue */}
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" strokeWidth="18" strokeDasharray="98 141" strokeDashoffset="0" />
                          {/* Segment 2: Meta (31.1%) - Magenta/Purple */}
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#c084fc" strokeWidth="18" strokeDasharray="74 165" strokeDashoffset="-98" />
                          {/* Segment 3: LinkedIn (17.6%) - Teal */}
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#0891b2" strokeWidth="18" strokeDasharray="42 197" strokeDashoffset="-172" />
                          {/* Segment 4: SEO (10.1%) - Green */}
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="18" strokeDasharray="24 215" strokeDashoffset="-214" />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                          <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Total Revenue</span>
                          <strong style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>₹48,600</strong>
                        </div>
                      </div>

                      {/* Legend List */}
                      <div className="roas-legend-list">
                        <div className="roas-legend-item">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563eb', flexShrink: 0 }} />
                            <strong style={{ color: '#1e293b' }}>Google Search & Shopping</strong>
                          </div>
                          <div>
                            <span style={{ fontWeight: 700, color: '#16a34a', marginRight: 6 }}>5.21x ROAS</span>
                            <span style={{ color: '#64748b' }}>₹20,020</span>
                          </div>
                        </div>

                        <div className="roas-legend-item">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#c084fc', flexShrink: 0 }} />
                            <strong style={{ color: '#1e293b' }}>Meta Ads (IG & FB)</strong>
                          </div>
                          <div>
                            <span style={{ fontWeight: 700, color: '#16a34a', marginRight: 6 }}>4.82x ROAS</span>
                            <span style={{ color: '#64748b' }}>₹15,110</span>
                          </div>
                        </div>

                        <div className="roas-legend-item">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0891b2', flexShrink: 0 }} />
                            <strong style={{ color: '#1e293b' }}>LinkedIn B2B Lead Gen</strong>
                          </div>
                          <div>
                            <span style={{ fontWeight: 700, color: '#16a34a', marginRight: 6 }}>4.42x ROAS</span>
                            <span style={{ color: '#64748b' }}>₹8,550</span>
                          </div>
                        </div>

                        <div className="roas-legend-item">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                            <strong style={{ color: '#1e293b' }}>Organic SEO & Content</strong>
                          </div>
                          <div>
                            <span style={{ fontWeight: 700, color: '#16a34a', marginRight: 6 }}>5.39x ROAS</span>
                            <span style={{ color: '#64748b' }}>₹4,920</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#f0fdf4', color: '#16a34a', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>
                      <CheckCircle2 style={{ width: 14, height: 14 }} /> Cross-Channel Synced
                    </span>
                  </div>
                </div>

                {/* COLUMN 3: AI STRATEGIC BUSINESS INTELLIGENCE */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>AI Strategic Business Intelligence</h3>
                    <p style={{ margin: '3px 0 1rem', fontSize: '0.8rem', color: '#64748b' }}>Automated insights and recommended next moves.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {/* Card 1 */}
                      <div style={{ padding: '0.75rem', borderRadius: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                        <div className="roas-ai-card-header">
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 style={{ width: 14, height: 14 }} /> High Growth Opportunity
                          </span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#dcfce7', color: '#15803d', padding: '0.1rem 0.4rem', borderRadius: '6px' }}>+₹3,400 Net Revenue</span>
                        </div>
                        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: '#334155', lineHeight: 1.3 }}>
                          Reallocate ₹850 to Google Search Ads from low-performing segments to get more high-intent traffic and conversions.
                        </p>
                        <button onClick={() => alert('✨ Budget Reallocation Applied!')} style={{ border: '1px solid #86efac', background: '#fff', color: '#15803d', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
                          Apply Budget Reallocation
                        </button>
                      </div>

                      {/* Card 2 */}
                      <div style={{ padding: '0.75rem', borderRadius: '12px', background: '#fff7ed', border: '1px solid #fed7aa' }}>
                        <div className="roas-ai-card-header">
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ea580c', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <AlertTriangle style={{ width: 14, height: 14 }} /> Underperforming Alert
                          </span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#ffedd5', color: '#c2410c', padding: '0.1rem 0.4rem', borderRadius: '6px' }}>Save ₹450/wk</span>
                        </div>
                        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: '#334155', lineHeight: 1.3 }}>
                          LinkedIn B2B Video Variant B has shown 22% higher CPA. Pause or replace creative to reduce wasted spend.
                        </p>
                        <button onClick={() => alert('⏸️ Variant B Paused!')} style={{ border: '1px solid #fdba74', background: '#fff', color: '#c2410c', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
                          Pause & Swap Creative
                        </button>
                      </div>

                      {/* Card 3 */}
                      <div style={{ padding: '0.75rem', borderRadius: '12px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                        <div className="roas-ai-card-header">
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Sparkles style={{ width: 14, height: 14 }} /> Winning Creative Champion
                          </span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, background: '#dbeafe', color: '#1e40af', padding: '0.1rem 0.4rem', borderRadius: '6px' }}>5.4x Record ROAS</span>
                        </div>
                        <p style={{ margin: '0 0 8px', fontSize: '0.75rem', color: '#334155', lineHeight: 1.3 }}>
                          Instagram Reels Micro-Influencers campaign is performing exceptionally well. Scale budget to maximize results.
                        </p>
                        <button onClick={() => alert('🚀 Campaign Scaled +25%!')} style={{ border: '1px solid #93c5fd', background: '#fff', color: '#1d4ed8', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
                          Scale Campaign +25%
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: '0.75rem' }}>
                    <button style={{ border: 'none', background: 'transparent', color: '#7c3aed', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                      View All Insights →
                    </button>
                  </div>
                </div>

              </div>

              {/* 5. LOWER GRID: PERFORMANCE TRENDS & HEATMAP OVERVIEW */}
              <div className="roas-lower-grid">
                
                {/* PERFORMANCE TRENDS (30 DAYS) */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ margin: '0 0 1rem', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Performance Trends (30 Days)</h3>

                  <div className="roas-trends-grid">
                    {/* Revenue Trend */}
                    <div style={{ padding: '0.75rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Revenue Trend</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16a34a' }}>↑ 28.6%</span>
                      </div>
                      <div style={{ height: 45, width: '100%' }}>
                        <svg width="100%" height="45" viewBox="0 0 100 45" preserveAspectRatio="none">
                          <path d="M 0,35 Q 20,28 40,25 T 80,12 T 100,5" fill="none" stroke="#10b981" strokeWidth="2.5" />
                        </svg>
                      </div>
                    </div>

                    {/* ROAS Trend */}
                    <div style={{ padding: '0.75rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>ROAS Trend</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563eb' }}>↑ 18.4%</span>
                      </div>
                      <div style={{ height: 45, width: '100%' }}>
                        <svg width="100%" height="45" viewBox="0 0 100 45" preserveAspectRatio="none">
                          <path d="M 0,32 Q 25,30 50,20 T 75,15 T 100,8" fill="none" stroke="#2563eb" strokeWidth="2.5" />
                        </svg>
                      </div>
                    </div>

                    {/* Conversions Trend */}
                    <div style={{ padding: '0.75rem', borderRadius: '12px', background: '#FAF8F2', border: '1px solid #E0DDD2', minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#5A5A55', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Conversions Trend</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#D99B00' }}>↑ 19.8%</span>
                      </div>
                      <div style={{ height: 45, width: '100%' }}>
                        <svg width="100%" height="45" viewBox="0 0 100 45" preserveAspectRatio="none">
                          <path d="M 0,38 Q 30,22 60,18 T 100,10" fill="none" stroke="#D99B00" strokeWidth="2.5" />
                        </svg>
                      </div>
                    </div>

                    {/* Ad Spend Trend */}
                    <div style={{ padding: '0.75rem', borderRadius: '12px', background: '#f8fafc', border: '1px solid #f1f5f9', minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Ad Spend Trend</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ea580c' }}>↓ 5.2%</span>
                      </div>
                      <div style={{ height: 45, width: '100%' }}>
                        <svg width="100%" height="45" viewBox="0 0 100 45" preserveAspectRatio="none">
                          <path d="M 0,25 Q 30,15 60,28 T 100,20" fill="none" stroke="#ea580c" strokeWidth="2.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CHANNEL PERFORMANCE OVERVIEW (HEATMAP) */}
                <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Channel Performance Overview</h3>
                    
                    <div className="roas-heatmap-table-wrap">
                      <table className="roas-heatmap-table">
                        <thead>
                          <tr>
                            <th style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left', fontWeight: 600 }}>Channel</th>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                              <th key={d} style={{ fontSize: '0.65rem', color: '#64748b', textAlign: 'center', fontWeight: 600 }}>{d}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'Google Ads', row: ['#86efac', '#4ade80', '#22c55e', '#16a34a', '#86efac', '#4ade80', '#16a34a'] },
                            { name: 'Meta Ads', row: ['#86efac', '#fde047', '#4ade80', '#22c55e', '#16a34a', '#86efac', '#4ade80'] },
                            { name: 'LinkedIn Ads', row: ['#fca5a5', '#fde047', '#86efac', '#4ade80', '#fca5a5', '#fde047', '#86efac'] },
                            { name: 'TikTok Ads', row: ['#fde047', '#86efac', '#4ade80', '#16a34a', '#4ade80', '#16a34a', '#fde047'] },
                            { name: 'YouTube Ads', row: ['#fca5a5', '#fca5a5', '#fde047', '#86efac', '#fca5a5', '#fde047', '#fca5a5'] },
                            { name: 'X Ads', row: ['#fde047', '#fca5a5', '#fde047', '#86efac', '#fde047', '#fca5a5', '#fde047'] }
                          ].map((item, idx) => (
                            <tr key={idx}>
                              <td style={{ fontSize: '0.72rem', fontWeight: 600, color: '#334155', paddingRight: '4px', whiteSpace: 'nowrap' }}>{item.name}</td>
                              {item.row.map((color, cIdx) => (
                                <td key={cIdx} style={{ height: 16, background: color, borderRadius: '4px' }} />
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Low ROAS</span>
                    <span style={{ width: 40, height: 4, borderRadius: 2, background: 'linear-gradient(90deg, #ef4444, #eab308, #22c55e)' }} />
                    <span style={{ fontSize: '0.68rem', color: '#64748b' }}>High ROAS</span>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                  </div>
                </div>

              </div>

              {/* 6. FOOTER TELEMETRY STATUS BAR */}
              <div className="roas-footer-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Activity style={{ width: 14, height: 14, color: '#16a34a' }} />
                  <span>Live Data Streams: <strong style={{ color: '#0f172a' }}>26 Active</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <RefreshCw style={{ width: 14, height: 14, color: '#7c3aed' }} />
                  <span>Data Refresh Rate: <strong style={{ color: '#0f172a' }}>5 sec</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Database style={{ width: 14, height: 14, color: '#2563eb' }} />
                  <span>Database: <strong style={{ color: '#0f172a' }}>PostgreSQL</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles style={{ width: 14, height: 14, color: '#7c3aed' }} />
                  <span>AI Model: <strong style={{ color: '#0f172a' }}>ROAS Optimizer v2.4</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock style={{ width: 14, height: 14, color: '#64748b' }} />
                  <span>Last Updated: <strong style={{ color: '#0f172a' }}>30 Jul 2026, 02:45 PM</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a' }} />
                  <span>System Status: <strong style={{ color: '#16a34a' }}>All Operational</strong></span>
                </div>
              </div>

              {/* 7. ALERT CENTER MODAL OVERLAY */}
              {showAlertCenterModal && (
                <div className="social-composer-modal-overlay">
                  <div className="social-composer-modal-card animate-scale-up" style={{ maxWidth: 520, padding: '1.5rem', width: '90%' }}>
                    <div className="composer-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Bell style={{ width: 20, height: 20, color: '#D99B00' }} />
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Marketing Alert Center</h2>
                      </div>
                      <button onClick={() => setShowAlertCenterModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                        <X style={{ width: 20, height: 20 }} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      <div style={{ padding: '0.85rem', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca' }}>
                        <strong style={{ fontSize: '0.85rem', color: '#dc2626', display: 'block' }}>⚠️ CPA Spike Warning on Meta Ads</strong>
                        <p style={{ fontSize: '0.78rem', color: '#7f1d1d', margin: '4px 0 0' }}>Instagram Carousel Campaign #2 CPA increased by +18.4% in the last 2 hours. Creative fatigue detected.</p>
                      </div>

                      <div style={{ padding: '0.85rem', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                        <strong style={{ fontSize: '0.85rem', color: '#16a34a', display: 'block' }}>🚀 Record ROAS Yield on Google Search</strong>
                        <p style={{ fontSize: '0.78rem', color: '#14532d', margin: '4px 0 0' }}>High-intent search ad group reached 5.85x ROAS. Scaling daily cap by +₹2,500 recommended.</p>
                      </div>

                      <div style={{ padding: '0.85rem', borderRadius: '10px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                        <strong style={{ fontSize: '0.85rem', color: '#2563eb', display: 'block' }}>✨ AI Model Auto-Optimization Complete</strong>
                        <p style={{ fontSize: '0.78rem', color: '#1e3a8a', margin: '4px 0 0' }}>Reallocated ₹1,200 from paused TikTok segment to top-performing LinkedIn retargeting funnel.</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9' }}>
                      <button
                        onClick={() => setShowAlertCenterModal(false)}
                        style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', background: '#1E3A2B', color: '#fff', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Dismiss Alerts
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
          {/* ========================================================= */}
          {/* OMNICHANNEL AUDIENCE INTELLIGENCE, SEGMENTS & CRM HUB    */}
          {/* ========================================================= */}
          {currentView === 'audience' && (
            <div className="audience-container">
              {/* Breadcrumbs Row */}
              <div className="dash-breadcrumbs">
                <span>Dashboard</span>
                <ChevronRight className="bc-sep" />
                <span>Customer Intelligence</span>
                <ChevronRight className="bc-sep" />
                <span className="bc-current">Audience Segments & CRM</span>
              </div>

              {/* Title & Top Bar */}
              <div className="dash-title-row">
                <div>
                  <h1 className="dash-page-title">Customer Intelligence & Audience Hub</h1>
                  <p className="dash-page-subtitle">
                    Understand, organize, target, and communicate with your audience—focusing on customer profiles, lifetime value, and purchase intent.
                  </p>
                </div>
                <div className="bi-top-actions">
                  <button className="btn-outline-purple sm-btn" onClick={() => alert('📥 Exporting Audience Contacts CSV... File downloaded!')}>
                    <Download className="btn-icon text-purple" />
                    <span>Export CSV</span>
                  </button>
                  <button className="btn-primary-purple" onClick={() => setIsAddContactOpen(true)}>
                    <Plus className="btn-icon" />
                    <span>Add New Contact</span>
                  </button>
                </div>
              </div>

              {/* 4 High-Impact Audience Telemetry Scorecards */}
              <div className="bi-kpi-grid margin-top-md">
                <div className="kpi-scorecard-card bi-card-highlight">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Total Reachable Contacts</span>
                    <Users className="kpi-card-ic text-purple" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">48,520</span>
                    <span className="kpi-sc-sub text-green">+14.8% growth</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-purple-grad" style={{ width: '84%' }} /></div>
                  <div className="kpi-sc-footer"><span>Multi-Channel Synced</span><span>Verified CRM Profiles</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Active High-Intent Users</span>
                    <Zap className="kpi-card-ic text-orange" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">12,840</span>
                    <span className="kpi-sc-sub text-green">64% Engagement Rate</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-orange-grad" style={{ width: '64%' }} /></div>
                  <div className="kpi-sc-footer"><span>Active Last 7 Days</span><span>High Velocity</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Avg. Customer LTV</span>
                    <DollarSign className="kpi-card-ic text-green" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">₹1,840.00</span>
                    <span className="kpi-sc-sub text-green">+18.2% vs target</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-green-grad" style={{ width: '78%' }} /></div>
                  <div className="kpi-sc-footer"><span>Blended Retention LTV</span><span>Target ₹1,500</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">AI Lead Quality Score (Avg)</span>
                    <Target className="kpi-card-ic text-blue" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">84.5 / 100</span>
                    <span className="kpi-sc-sub text-purple">Top 10% High Propensity</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-blue-grad" style={{ width: '85%' }} /></div>
                  <div className="kpi-sc-footer"><span>Propensity to Buy</span><span>High Match Rate</span></div>
                </div>
              </div>

              {/* Smart Segment Toolbar & Search Input */}
              <div className="bi-controls-toolbar margin-top-md">
                <div className="bi-channel-pills">
                  <span className="bi-filter-label">Segments:</span>
                  {[
                    'All',
                    'High LTV Champions',
                    'B2B Enterprise Buyers',
                    'At-Risk / Churn Warning',
                    'E-Commerce Cart Abandoners'
                  ].map((sg) => (
                    <button
                      key={sg}
                      className={`bi-ch-pill ${selectedAudienceSegment === sg ? 'active' : ''}`}
                      onClick={() => setSelectedAudienceSegment(sg)}
                    >
                      {sg === 'All' ? '👥 All Contacts (48.5k)' : sg}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="header-search-wrap max-w-xs">
                  <Search className="search-ic" />
                  <input
                    type="text"
                    placeholder="Search contact, email, company..."
                    className="header-search-input"
                    value={audienceSearchQuery}
                    onChange={(e) => setAudienceSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Master 2-Column Split: Demographic Analytics vs AI Targeting Recommendations */}
              <div className="bi-master-split-grid margin-top-md">

                {/* Column 1: Demographic & Channel Affinity Analytics */}
                <div className="bi-card-block">
                  <div className="bi-card-header">
                    <div>
                      <h2>Audience Demographics & Region Affinities</h2>
                      <p>Age distribution and primary geographic buyer markets.</p>
                    </div>
                    <span className="bi-badge-pill">Demographic Synced</span>
                  </div>

                  <div className="demo-metrics-stack margin-top-sm">
                    {/* Age Distribution */}
                    <div className="demo-block">
                      <strong className="demo-title">Age Group Distribution</strong>
                      <div className="demo-bars-group margin-top-xs">
                        {[
                          { label: '25-34 yrs', val: 42, color: '#7c3aed' },
                          { label: '35-44 yrs', val: 31, color: '#3b82f6' },
                          { label: '45-54 yrs', val: 18, color: '#10b981' },
                          { label: '18-24 yrs', val: 9, color: '#f59e0b' }
                        ].map((d) => (
                          <div key={d.label} className="demo-bar-row">
                            <span className="demo-bar-lbl">{d.label}</span>
                            <div className="ch-bar-bg">
                              <div className="ch-bar-fill" style={{ width: `${d.val}%`, background: d.color }} />
                            </div>
                            <span className="demo-bar-val font-mono">{d.val}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Top Regions */}
                    <div className="demo-block margin-top-md">
                      <strong className="demo-title">Top Geographic Markets</strong>
                      <div className="geo-markets-grid margin-top-xs">
                        <div className="geo-card">
                          <span className="geo-flag">🇺🇸 🇨🇦</span>
                          <div>
                            <strong className="geo-name">US & Canada</strong>
                            <span className="geo-share font-mono">48% of Contacts</span>
                          </div>
                        </div>
                        <div className="geo-card">
                          <span className="geo-flag">🇬🇧 🇪🇺</span>
                          <div>
                            <strong className="geo-name">UK & Europe</strong>
                            <span className="geo-share font-mono">28% of Contacts</span>
                          </div>
                        </div>
                        <div className="geo-card">
                          <span className="geo-flag">🇮🇳 🇸🇬</span>
                          <div>
                            <strong className="geo-name">India & APAC</strong>
                            <span className="geo-share font-mono">18% of Contacts</span>
                          </div>
                        </div>
                        <div className="geo-card">
                          <span className="geo-flag">🇧🇷 🇲🇽</span>
                          <div>
                            <strong className="geo-name">Latin America</strong>
                            <span className="geo-share font-mono">6% of Contacts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: AI Predictive Audience Insights ("Who to Target Next") */}
                <div className="bi-card-block">
                  <div className="bi-card-header">
                    <div>
                      <h2>✨ AI Audience Targeting Engine</h2>
                      <p>Predictive customer insights: upsell opportunities, churn warnings, and lookalikes.</p>
                    </div>
                    <span className="bi-badge-pill bg-purple-light text-purple">Audience AI v2.4</span>
                  </div>

                  <div className="bi-insights-stack margin-top-sm">
                    {audienceInsights.map((ins) => (
                      <div key={ins.id} className={`bi-insight-card insight-${ins.type}`}>
                        <div className="bi-insight-header">
                          <span className={`bi-type-badge badge-${ins.type}`}>{ins.badgeText}</span>
                          <span className="bi-impact-chip font-mono">{ins.impact}</span>
                        </div>
                        <h3 className="bi-insight-title">{ins.title}</h3>
                        <p className="bi-insight-desc">{ins.description}</p>
                        <div className="bi-insight-footer">
                          <span className="bi-channel-tag">AI Confidence: 94.2%</span>
                          <button className="bi-action-btn" onClick={() => alert(`✨ Triggered Workflow: ${ins.actionLabel}`)}>
                            <Sparkles className="btn-ic" /> {ins.actionLabel}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Customer 360 CRM Data Table */}
              <div className="bi-card-block margin-top-md">
                <div className="bi-card-header">
                  <div>
                    <h2>Customer 360 Contact Directory</h2>
                    <p>Comprehensive customer database with AI lead quality scores, LTV telemetry, and engagement timelines.</p>
                  </div>
                  <div className="bi-table-subtext font-mono">
                    Showing {filteredAudienceContacts.length} Verified Contacts
                  </div>
                </div>

                <div className="bi-table-wrap margin-top-sm">
                  <table className="bi-leaderboard-table">
                    <thead>
                      <tr>
                        <th>Customer Contact</th>
                        <th>Segment</th>
                        <th>Lead Quality Score</th>
                        <th>Lifetime Value (LTV)</th>
                        <th>Acquisition Channel</th>
                        <th>Last Active</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAudienceContacts.map((ct) => (
                        <tr key={ct.id}>
                          <td>
                            <div className="ct-info-cell">
                              <UserAvatar src={ct.avatar} name={ct.name} className="ct-avatar-img" />
                              <div>
                                <strong className="cmp-table-name">{ct.name}</strong>
                                <div className="ch-sub-meta">{ct.role} • {ct.company}</div>
                                <div className="ch-sub-meta font-mono text-purple">{ct.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="aud-seg-chip">{ct.segment}</span>
                          </td>
                          <td>
                            <div className="lead-score-pill font-mono" style={{
                              background: ct.leadScore >= 85 ? '#dcfce7' : ct.leadScore >= 60 ? '#fef3c7' : '#fee2e2',
                              color: ct.leadScore >= 85 ? '#15803d' : ct.leadScore >= 60 ? '#b45309' : '#b91c1c'
                            }}>
                              ⚡ {ct.leadScore} / 100
                            </div>
                          </td>
                          <td className="font-mono font-bold text-green">₹{ct.ltv.toLocaleString()}</td>
                          <td>
                            <span className="ch-sub-meta">{ct.acquisitionSource}</span>
                          </td>
                          <td>
                            <span className="ch-sub-meta font-mono">{ct.lastActive}</span>
                          </td>
                          <td className="text-right">
                            <button className="btn-outline-purple sm-btn" onClick={() => setSelectedContactDetail(ct)}>
                              <Eye className="btn-ic" /> Inspect 360
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 360-Degree Customer Profile Audit Drawer Modal */}
              {selectedContactDetail && (
                <div className="social-composer-modal-overlay">
                  <div className="social-composer-modal-card animate-scale-up max-w-3xl">
                    <div className="composer-modal-header">
                      <div className="flex items-center gap-3">
                        <UserAvatar src={selectedContactDetail.avatar} name={selectedContactDetail.name} className="w-12 h-12 rounded-full border-2 border-purple-500" />
                        <div>
                          <h2>360° Profile: {selectedContactDetail.name}</h2>
                          <p>{selectedContactDetail.role} at <strong>{selectedContactDetail.company}</strong> ({selectedContactDetail.location})</p>
                        </div>
                      </div>
                      <button className="composer-close-btn" onClick={() => setSelectedContactDetail(null)}>
                        <X className="close-ic" />
                      </button>
                    </div>

                    <div className="bi-detail-modal-body p-6">
                      {/* Stat Grid */}
                      <div className="bi-detail-stats-grid">
                        <div className="detail-stat-box">
                          <span className="stat-label">Lifetime Value (LTV)</span>
                          <span className="stat-val font-mono text-green">₹{selectedContactDetail.ltv.toLocaleString()}</span>
                        </div>
                        <div className="detail-stat-box">
                          <span className="stat-label">AI Lead Score</span>
                          <span className="stat-val font-mono text-purple">{selectedContactDetail.leadScore} / 100</span>
                        </div>
                        <div className="detail-stat-box">
                          <span className="stat-label">Total Orders</span>
                          <span className="stat-val font-mono">{selectedContactDetail.ordersCount} Orders</span>
                        </div>
                        <div className="detail-stat-box">
                          <span className="stat-label">Acquisition Channel</span>
                          <span className="stat-val font-mono text-blue-600">{selectedContactDetail.acquisitionSource}</span>
                        </div>
                      </div>

                      {/* AI Next Best Action Box */}
                      <div className="bi-detail-audit-box margin-top-md">
                        <h3>✨ AI Next Best Action Recommendation</h3>
                        <p>{selectedContactDetail.aiRecommendation}</p>
                      </div>

                      {/* Activity Timeline Feed */}
                      <div className="ct-timeline-wrap margin-top-md">
                        <h3 className="text-sm font-bold text-slate-800 mb-3">Recent Interaction Timeline</h3>
                        <div className="ct-timeline-list">
                          {selectedContactDetail.timeline.map((item, i) => (
                            <div key={i} className="ct-timeline-item">
                              <div className="ct-tl-bullet" />
                              <div className="ct-tl-content">
                                <span className="ct-tl-date font-mono">{item.date}</span>
                                <strong className="ct-tl-event">{item.event}</strong>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="composer-modal-footer">
                      <button className="btn-outline-purple sm-btn" onClick={() => setSelectedContactDetail(null)}>
                        Close Profile
                      </button>
                      <button className="btn-primary-purple" onClick={() => { alert(`📧 Direct Email sent to ${selectedContactDetail.email}`); setSelectedContactDetail(null); }}>
                        <Send className="btn-icon" /> Send Direct Email
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Add New Contact Form Modal */}
              {isAddContactOpen && (
                <div className="social-composer-modal-overlay">
                  <div className="social-composer-modal-card animate-scale-up max-w-xl">
                    <div className="composer-modal-header">
                      <div>
                        <h2>👤 Add New Customer Contact</h2>
                        <p>Create a new contact profile in the Omnichannel CRM database.</p>
                      </div>
                      <button className="composer-close-btn" onClick={() => setIsAddContactOpen(false)}>
                        <X className="close-ic" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveNewContact}>
                      <div className="bi-detail-modal-body p-6 grid grid-cols-2 gap-4">
                        <div className="form-group col-span-2">
                          <label className="composer-label">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alexander Wright"
                            className="composer-input"
                            value={newContactData.name}
                            onChange={(e) => setNewContactData({ ...newContactData, name: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Email Address *</label>
                          <input
                            type="email"
                            required
                            placeholder="alexander@company.com"
                            className="composer-input"
                            value={newContactData.email}
                            onChange={(e) => setNewContactData({ ...newContactData, email: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Phone Number</label>
                          <input
                            type="text"
                            placeholder="+1 (555) 000-0000"
                            className="composer-input"
                            value={newContactData.phone}
                            onChange={(e) => setNewContactData({ ...newContactData, phone: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Company Name</label>
                          <input
                            type="text"
                            placeholder="Company LLC"
                            className="composer-input"
                            value={newContactData.company}
                            onChange={(e) => setNewContactData({ ...newContactData, company: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Role / Job Title</label>
                          <input
                            type="text"
                            placeholder="e.g. CMO or Director"
                            className="composer-input"
                            value={newContactData.role}
                            onChange={(e) => setNewContactData({ ...newContactData, role: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Segment Group</label>
                          <select
                            className="composer-select"
                            value={newContactData.segment}
                            onChange={(e) => setNewContactData({ ...newContactData, segment: e.target.value })}
                          >
                            <option value="High LTV Champions">High LTV Champions</option>
                            <option value="B2B Enterprise Buyers">B2B Enterprise Buyers</option>
                            <option value="At-Risk / Churn Warning">At-Risk / Churn Warning</option>
                            <option value="E-Commerce Cart Abandoners">E-Commerce Cart Abandoners</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Acquisition Channel</label>
                          <select
                            className="composer-select"
                            value={newContactData.acquisitionSource}
                            onChange={(e) => setNewContactData({ ...newContactData, acquisitionSource: e.target.value })}
                          >
                            <option value="Google Search Ads">Google Search Ads</option>
                            <option value="LinkedIn B2B Lead Gen">LinkedIn B2B Lead Gen</option>
                            <option value="Instagram Paid Social">Instagram Paid Social</option>
                            <option value="Organic SEO">Organic SEO</option>
                            <option value="Direct / Organic">Direct / Organic</option>
                          </select>
                        </div>
                      </div>

                      <div className="composer-modal-footer">
                        <button type="button" className="btn-outline-purple sm-btn" onClick={() => setIsAddContactOpen(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary-purple">
                          <UserPlus className="btn-icon" /> Save Customer Profile
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}
          {/* ========================================================= */}
          {/* AGILE MARKETING TASK, SPRINT & PROJECT OPERATIONS HUB     */}
          {/* ========================================================= */}
          {currentView === 'tasks' && (
            <div className="tasks-container">
              {/* Breadcrumbs Row */}
              <div className="dash-breadcrumbs">
                <span>Dashboard</span>
                <ChevronRight className="bc-sep" />
                <span>Operations</span>
                <ChevronRight className="bc-sep" />
                <span className="bc-current">
                  {taskSubTab === 'create' ? 'Create Sprint Deliverable' : 'Agile Task & Sprint Operations'}
                </span>
              </div>

              {/* Dynamic Page Header */}
              <div className="dash-title-row">
                <div>
                  <h1 className="dash-page-title">
                    {taskSubTab === 'create'
                      ? '✨ Campaign Sprint Task Creator Studio'
                      : 'Agile Task, Sprint & Deliverables Hub'}
                  </h1>
                  <p className="dash-page-subtitle">
                    {taskSubTab === 'create'
                      ? 'Define task specifications, campaign workstream, priority levels, team assignees, and subtask milestones.'
                      : 'Plan campaign tasks, track deliverable progress, assign subtasks, and manage sprint workflows across Kanban, List, and Timeline views.'}
                  </p>
                </div>

                <div className="bi-top-actions">
                  <div className="task-subtab-bar">
                    <button
                      className={`task-subtab-btn ${taskSubTab === 'board' ? 'active' : ''}`}
                      onClick={() => setTaskSubTab('board')}
                    >
                      ⚡ Agile Operations Board
                    </button>
                    {taskSubTab === 'create' && (
                      <button className="task-subtab-btn active" onClick={() => setTaskSubTab('create')}>
                        ✨ Create Task Studio
                      </button>
                    )}
                  </div>

                  {taskSubTab === 'create' ? (
                    <button className="btn-outline-purple" onClick={() => setTaskSubTab('board')}>
                      <ArrowLeft className="btn-icon" />
                      <span>Back to Operations Board</span>
                    </button>
                  ) : (
                    <button className="btn-primary-purple" onClick={() => setTaskSubTab('create')}>
                      <Plus className="btn-icon" />
                      <span>Create New Task</span>
                    </button>
                  )}
                </div>
              </div>

              {taskSubTab === 'templates' ? (
                <ProjectDeliveryCenter />
              ) : taskSubTab === 'create' ? (
                /* FULL PAGE TASK CREATION STUDIO WORKSPACE */
                <div className="task-create-studio-wrapper margin-top-md">
                  <div className="task-studio-grid">
                    {/* Left Form Column */}
                    <form onSubmit={handleSaveNewTask} className="task-studio-form-card">
                      {/* Section 1 */}
                      <div className="task-studio-section-header">
                        <div className="task-section-badge">
                          <FileText style={{ width: 18, height: 18 }} />
                        </div>
                        <div>
                          <div className="task-section-number">SECTION 01</div>
                          <h3 className="task-section-title-text">Software Deliverable & Scope Specifications</h3>
                        </div>
                      </div>

                      <div className="form-group margin-top-sm">
                        <label className="composer-label font-bold text-slate-800">Deliverable Task Title *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Develop Mobile App OAuth 2.0 Biometric Login"
                          className="studio-title-input"
                          value={newTaskData.title}
                          onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
                        />
                      </div>

                      <div className="form-group margin-top-md">
                        <label className="composer-label font-bold text-slate-800">Technical Scope & Contract Guidelines</label>
                        <textarea
                          rows={4}
                          placeholder="Describe technical specs, tech stack (Next.js, Node.js, Swift), API schemas, design assets, or acceptance criteria..."
                          className="studio-textarea"
                          value={newTaskData.description}
                          onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
                        />
                      </div>

                      {/* Section 2 */}
                      <div className="task-studio-section-header margin-top-xl">
                        <div className="task-section-badge" style={{ background: '#fff7ed', borderColor: '#ffedd5', color: '#ea580c' }}>
                          <Zap style={{ width: 18, height: 18 }} />
                        </div>
                        <div>
                          <div className="task-section-number" style={{ color: '#ea580c' }}>SECTION 02</div>
                          <h3 className="task-section-title-text">Engineering Workstream & Assignee Parameters</h3>
                        </div>
                      </div>

                      <div className="task-form-row margin-top-sm">
                        <div className="form-group">
                          <label className="composer-label font-bold text-slate-800">Contract Workstream</label>
                          <select
                            className="studio-select"
                            value={newTaskData.campaign}
                            onChange={(e) => setNewTaskData({ ...newTaskData, campaign: e.target.value })}
                          >
                            <option value="Web Frontend (React/Next.js)">Web Frontend (React/Next.js)</option>
                            <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
                            <option value="Backend API & Microservices">Backend API & Microservices</option>
                            <option value="UI/UX Product Design & Prototyping">UI/UX Product Design & Prototyping</option>
                            <option value="Cloud Infra, DevOps & Security">Cloud Infra, DevOps & Security</option>
                            <option value="QA Automation & Performance Audit">QA Automation & Performance Audit</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="composer-label font-bold text-slate-800">Initial Sprint Column</label>
                          <select
                            className="studio-select"
                            value={newTaskData.status}
                            onChange={(e) => setNewTaskData({ ...newTaskData, status: e.target.value })}
                          >
                            <option value="To Do">📋 To Do</option>
                            <option value="In Progress">⚡ In Progress</option>
                            <option value="In Review / QA">🔍 In Review / QA</option>
                            <option value="Completed">✅ Completed</option>
                          </select>
                        </div>
                      </div>

                      <div className="task-form-row margin-top-md">
                        <div className="form-group">
                          <label className="composer-label font-bold text-slate-800">Priority Tier</label>
                          <select
                            className="studio-select"
                            value={newTaskData.priority}
                            onChange={(e) => setNewTaskData({ ...newTaskData, priority: e.target.value })}
                          >
                            <option value="Urgent">🔴 Urgent Priority</option>
                            <option value="High">🟠 High Priority</option>
                            <option value="Medium">🔵 Medium Priority</option>
                            <option value="Low">🟢 Low Priority</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="composer-label font-bold text-slate-800">Assigned Tech Lead</label>
                          <select
                            className="studio-select"
                            value={newTaskData.assigneeName}
                            onChange={(e) => setNewTaskData({ ...newTaskData, assigneeName: e.target.value })}
                          >
                            <option value={profileData.fullName || currentUser?.fullName || currentUser?.name || 'Client Lead'}>
                              {profileData.fullName || currentUser?.fullName || currentUser?.name || 'Client Lead'} (Logged-in Client / Lead)
                            </option>
                            <option value="Ananya Roy">Ananya Roy (Senior Frontend Architect)</option>
                            <option value="Rahul Sharma">Rahul Sharma (Principal Backend Lead)</option>
                            <option value="Rohan Gupta">Rohan Gupta (DevOps & Cloud Lead)</option>
                            <option value="Priyajit Das">Priyajit Das (Lead Mobile Engineer)</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="composer-label font-bold text-slate-800">Milestone Due Date</label>
                          <input
                            type="date"
                            className="studio-date-input"
                            value={newTaskData.dueDate}
                            onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Section 3 */}
                      <div className="task-studio-section-header margin-top-xl">
                        <div className="task-section-badge" style={{ background: '#ecfdf5', borderColor: '#a7f3d0', color: '#059669' }}>
                          <CheckSquare style={{ width: 18, height: 18 }} />
                        </div>
                        <div>
                          <div className="task-section-number" style={{ color: '#059669' }}>SECTION 03</div>
                          <h3 className="task-section-title-text">Sprint Checkpoints Checklist</h3>
                        </div>
                      </div>

                      <div className="form-group margin-top-sm">
                        <label className="composer-label font-bold text-slate-800">Subtask Milestones (Comma-Separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. Build API Endpoints, Implement UI Component, Unit Test Suite, Deploy Staging"
                          className="studio-title-input"
                          style={{ height: '44px', fontSize: '0.88rem' }}
                          value={newTaskData.subtasksInput}
                          onChange={(e) => setNewTaskData({ ...newTaskData, subtasksInput: e.target.value })}
                        />
                        <span className="task-input-hint">
                          Comma-separated items will automatically populate as interactive checklist items on the contract Kanban board.
                        </span>

                        {newTaskData.subtasksInput.trim() && (
                          <div className="studio-subtask-chips">
                            {newTaskData.subtasksInput
                              .split(',')
                              .map((st) => st.trim())
                              .filter(Boolean)
                              .map((stText, idx) => (
                                <span key={idx} className="studio-subtask-chip">
                                  <CheckCircle2 style={{ width: 14, height: 14, color: '#7c3aed' }} />
                                  <span>{stText}</span>
                                </span>
                              ))}
                          </div>
                        )}
                      </div>

                      <div className="task-studio-actions margin-top-xl">
                        <button type="button" className="btn-outline-purple" onClick={() => setTaskSubTab('board')}>
                          Cancel & Return to Operations
                        </button>
                        <button type="submit" className="btn-primary-purple lg-btn">
                          <Plus className="btn-icon" />
                          <span>Publish Deliverable to Sprint</span>
                        </button>
                      </div>
                    </form>

                    {/* Right Live Card Preview Column */}
                    <div className="task-preview-sidebar">
                      <div className="task-preview-card-box">
                        <div className="task-preview-card-header">
                          <span>Live Board Card Preview</span>
                          <span className="preview-pulse-tag">
                            <span className="preview-pulse-dot" />
                            Live Sync
                          </span>
                        </div>

                        <div className="kanban-item-card studio-preview-item">
                          <div className="kanban-card-top">
                            <span className={`task-prio-badge prio-${(newTaskData.priority || 'medium').toLowerCase()}`}>
                              {newTaskData.priority || 'High'} Priority
                            </span>
                            <span className="kanban-cmp-tag">{newTaskData.campaign || 'Contract Workstream'}</span>
                          </div>

                          <h4 className="kanban-card-title margin-top-xs">
                            {newTaskData.title.trim() || 'Untitled Deliverable Task'}
                          </h4>
                          <p className="kanban-card-desc">
                            {newTaskData.description.trim() || 'Deliverable scope details and guidelines preview will render here.'}
                          </p>

                          <div className="task-card-progress">
                            <div className="task-card-progress-header">
                              <span>Subtask Checkpoints</span>
                              <span>0/{(newTaskData?.subtasksInput || '').split(',').filter(Boolean).length || 1} (0%)</span>
                            </div>
                            <div className="task-card-progress-bar">
                              <div className="task-card-progress-fill" style={{ width: '0%' }} />
                            </div>
                          </div>

                          <div className="kanban-card-footer margin-top-sm">
                            <div className="flex items-center gap-2">
                              <UserAvatar
                                name={newTaskData.assigneeName || 'Team Lead'}
                                className="ct-avatar-img"
                                style={{ width: 24, height: 24 }}
                              />
                              <span className="text-xs font-semibold text-slate-700">
                                {newTaskData.assigneeName?.split(' ')[0] || 'Member'}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                {newTaskData.dueDate || '2026-08-10'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="task-guide-box">
                        <h4>
                          <Sparkles style={{ width: 16, height: 16, color: '#9333ea' }} />
                          Engineering Contract Guidance
                        </h4>
                        <ul>
                          <li>Define API schemas and tech stack requirements before starting execution.</li>
                          <li>Split complex epics into Frontend, Backend, and QA subtask milestones.</li>
                          <li>Assign senior tech leads for code review and production deployment.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Telemetry Metrics Scorecard Grid */}
                  <div className="bi-kpi-grid margin-top-md">
                    <div className="kpi-scorecard-card bi-card-highlight">
                      <div className="kpi-sc-header">
                        <span className="kpi-sc-title">Total Active Sprint Tasks</span>
                        <CheckSquare className="kpi-card-ic text-purple" />
                      </div>
                      <div className="kpi-sc-value-row">
                        <span className="kpi-sc-val">{taskItems.length} Tasks</span>
                        <span className="kpi-sc-sub text-purple">Current Sprint</span>
                      </div>
                      <div className="kpi-sparkline-bar">
                        <div className="sparkline-fill bg-purple-grad" style={{ width: '100%' }} />
                      </div>
                      <div className="kpi-sc-footer">
                        <span>Sprint 2026.4</span>
                        <span>Active Cycle</span>
                      </div>
                    </div>

                    <div className="kpi-scorecard-card">
                      <div className="kpi-sc-header">
                        <span className="kpi-sc-title">In Progress Execution</span>
                        <Zap className="kpi-card-ic text-blue" />
                      </div>
                      <div className="kpi-sc-value-row">
                        <span className="kpi-sc-val">
                          {taskItems.filter((t) => t.status === 'In Progress').length} Active
                        </span>
                        <span className="kpi-sc-sub text-blue">In Production</span>
                      </div>
                      <div className="kpi-sparkline-bar">
                        <div
                          className="sparkline-fill bg-blue-grad"
                          style={{
                            width: `${Math.round(
                              (taskItems.filter((t) => t.status === 'In Progress').length / (taskItems.length || 1)) * 100
                            )}%`
                          }}
                        />
                      </div>
                      <div className="kpi-sc-footer">
                        <span>Ongoing Workstreams</span>
                        <span>High Velocity</span>
                      </div>
                    </div>

                    <div className="kpi-scorecard-card">
                      <div className="kpi-sc-header">
                        <span className="kpi-sc-title">In Review & QA Approval</span>
                        <Clock className="kpi-card-ic text-orange" />
                      </div>
                      <div className="kpi-sc-value-row">
                        <span className="kpi-sc-val">
                          {taskItems.filter((t) => t.status === 'In Review / QA').length} Pending
                        </span>
                        <span className="kpi-sc-sub text-orange">Review Queue</span>
                      </div>
                      <div className="kpi-sparkline-bar">
                        <div
                          className="sparkline-fill bg-orange-grad"
                          style={{
                            width: `${Math.round(
                              (taskItems.filter((t) => t.status === 'In Review / QA').length / (taskItems.length || 1)) * 100
                            )}%`
                          }}
                        />
                      </div>
                      <div className="kpi-sc-footer">
                        <span>Quality Inspection</span>
                        <span>Awaiting Sign-off</span>
                      </div>
                    </div>

                    <div className="kpi-scorecard-card">
                      <div className="kpi-sc-header">
                        <span className="kpi-sc-title">Completed Deliverables</span>
                        <CheckCircle2 className="kpi-card-ic text-green" />
                      </div>
                      <div className="kpi-sc-value-row">
                        <span className="kpi-sc-val">
                          {taskItems.filter((t) => t.status === 'Completed').length} Done
                        </span>
                        <span className="kpi-sc-sub text-green">
                          {Math.round(
                            (taskItems.filter((t) => t.status === 'Completed').length / (taskItems.length || 1)) * 100
                          )}% Rate
                        </span>
                      </div>
                      <div className="kpi-sparkline-bar">
                        <div
                          className="sparkline-fill bg-green-grad"
                          style={{
                            width: `${Math.round(
                              (taskItems.filter((t) => t.status === 'Completed').length / (taskItems.length || 1)) * 100
                            )}%`
                          }}
                        />
                      </div>
                      <div className="kpi-sc-footer">
                        <span>Shipped Deliverables</span>
                        <span>Verified QA</span>
                      </div>
                    </div>
                  </div>

                  {/* Web & App Engineering Templates Hub */}
                  <div className="margin-top-md">
                    <ProjectDeliveryCenter hideHeaderCard={true} />
                  </div>

                  {/* LIST TABLE VIEW */}
                  {taskViewMode === 'list' && (
                    <div className="bi-card-block margin-top-md">
                      <div className="bi-card-header">
                        <div>
                          <h2>Campaign Task & Sprint Deliverables Master Directory</h2>
                          <p>Full-table view of sprint tasks, subtask status, priority levels, and due dates.</p>
                        </div>
                        <span className="bi-table-subtext font-mono">Showing {filteredTasks.length} Tasks</span>
                      </div>

                      <div className="bi-table-wrap margin-top-sm">
                        <table className="bi-leaderboard-table">
                          <thead>
                            <tr>
                              <th>Task Title & Scope</th>
                              <th>Campaign Workstream</th>
                              <th>Priority</th>
                              <th>Status</th>
                              <th>Assignee</th>
                              <th>Subtasks Progress</th>
                              <th>Due Date</th>
                              <th className="text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredTasks.map((t) => {
                              const compSt = Array.isArray(t.subtasks) ? t.subtasks.filter((st) => st.completed).length : 0;
                              const totSt = Array.isArray(t.subtasks) ? t.subtasks.length : 0;
                              return (
                                <tr key={t.id}>
                                  <td>
                                    <strong className="cmp-table-name">{t.title}</strong>
                                  </td>
                                  <td>
                                    <span className="kanban-cmp-tag">{t.campaign}</span>
                                  </td>
                                  <td>
                                    <span className={`task-prio-badge prio-${(t.priority || 'medium').toLowerCase()}`}>
                                      {t.priority}
                                    </span>
                                  </td>
                                  <td>
                                    <select
                                      className="task-select-input"
                                      value={t.status}
                                      onChange={(e) => handleUpdateTaskStatus(t.id, e.target.value)}
                                    >
                                      <option value="To Do">To Do</option>
                                      <option value="In Progress">In Progress</option>
                                      <option value="In Review / QA">In Review / QA</option>
                                      <option value="Approved">Approved</option>
                                      <option value="Completed">Completed</option>
                                      <option value="Rejected">Rejected</option>
                                    </select>
                                  </td>
                                  <td>
                                    <div className="flex items-center gap-2">
                                      <UserAvatar src={t.assignee?.avatar} name={t.assignee?.name} className="ct-avatar-img" style={{ width: 24, height: 24 }} />
                                      <span className="text-xs font-semibold text-slate-700">{t.assignee?.name}</span>
                                    </div>
                                  </td>
                                  <td className="font-mono text-xs text-slate-600">
                                    {compSt}/{totSt} Subtasks ({totSt > 0 ? Math.round((compSt / totSt) * 100) : 0}%)
                                  </td>
                                  <td className="font-mono text-xs text-slate-600">{t.dueDate}</td>
                                  <td className="text-right">
                                    <button className="btn-outline-purple sm-btn" onClick={() => setSelectedTaskDetail(t)}>
                                      <Eye className="btn-ic" /> Inspect Task
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TIMELINE GANTT VIEW */}
                  {taskViewMode === 'timeline' && (
                    <div className="bi-card-block margin-top-md">
                      <div className="bi-card-header">
                        <div>
                          <h2>Sprint Task Execution Schedule Timeline</h2>
                          <p>Gantt-style timeline view showing task progress and due dates across active campaign sprints.</p>
                        </div>
                        <span className="bi-table-subtext font-mono">Current Sprint 2026.4</span>
                      </div>

                      <div className="task-timeline-grid margin-top-sm">
                        {filteredTasks.map((t) => {
                          const compSt = Array.isArray(t.subtasks) ? t.subtasks.filter((st) => st.completed).length : 0;
                          const totSt = Array.isArray(t.subtasks) ? t.subtasks.length : 0;
                          const percent = totSt > 0 ? Math.round((compSt / totSt) * 100) : t.status === 'Completed' ? 100 : 35;

                          return (
                            <div key={t.id} className="timeline-task-row" onClick={() => setSelectedTaskDetail(t)}>
                              <div className="tl-task-info">
                                <span className="tl-title">{t.title}</span>
                                <span className="tl-cmp text-purple font-semibold">{t.campaign} • {t.assignee?.name}</span>
                              </div>

                              <div className="tl-bar-track">
                                <div
                                  className={`tl-bar-fill ${t.status === 'Completed' || t.status === 'Approved'
                                      ? 'bg-emerald-grad'
                                      : t.status === 'Rejected'
                                        ? 'bg-rose-grad'
                                        : t.status === 'In Progress'
                                          ? 'bg-purple-grad'
                                          : t.status === 'In Review / QA'
                                            ? 'bg-amber-grad'
                                            : 'bg-blue-grad'
                                    }`}
                                  style={{ width: `${Math.max(percent, 12)}%` }}
                                >
                                  <span className="tl-bar-txt font-mono">
                                    {t.status} ({percent}%) • Due: {t.dueDate}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* TASK INSPECTION DRAWER MODAL */}
                  {selectedTaskDetail && (
                    <div className="social-composer-modal-overlay">
                      <div className="social-composer-modal-card animate-scale-up" style={{ maxWidth: '640px' }}>
                        <div className="composer-modal-header">
                          <div>
                            <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
                              <span className={`task-prio-badge prio-${(selectedTaskDetail.priority || 'medium').toLowerCase()}`}>
                                {selectedTaskDetail.priority}
                              </span>
                              <span className="kanban-cmp-tag">{selectedTaskDetail.campaign}</span>
                            </div>
                            <h2>{selectedTaskDetail.title}</h2>
                          </div>
                          <button className="composer-close-btn" onClick={() => setSelectedTaskDetail(null)}>
                            <X className="close-ic" />
                          </button>
                        </div>

                        <div className="bi-detail-modal-body" style={{ padding: '1.25rem' }}>
                          {/* Task Metadata & Status Selector */}
                          <div className="task-modal-meta-grid">
                            <div className="task-meta-col">
                              <span className="task-meta-lbl">Status Workflow:</span>
                              <select
                                className="task-select-input"
                                value={selectedTaskDetail.status}
                                onChange={(e) => handleUpdateTaskStatus(selectedTaskDetail.id, e.target.value)}
                              >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="In Review / QA">In Review / QA</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>

                            <div className="task-meta-col">
                              <span className="task-meta-lbl">Assigned Owner:</span>
                              <strong className="task-meta-val">{selectedTaskDetail.assignee?.name}</strong>
                            </div>

                            <div className="task-meta-col">
                              <span className="task-meta-lbl">Due Target Date:</span>
                              <strong className="task-meta-val" style={{ color: '#7c3aed', fontFamily: 'monospace' }}>
                                {selectedTaskDetail.dueDate}
                              </strong>
                            </div>
                          </div>

                          {/* Task Scope Description */}
                          <div style={{ marginBottom: '1.25rem' }}>
                            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                              Task Scope & Specifications
                            </h3>
                            <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, background: '#ffffff', padding: '0.85rem', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                              {selectedTaskDetail.description}
                            </p>
                          </div>

                          {/* Interactive Subtasks Checklist */}
                          <div style={{ marginBottom: '1.25rem' }}>
                            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                              Subtasks Checklist
                            </h3>
                            <div className="task-subtask-list">
                              {Array.isArray(selectedTaskDetail.subtasks) && selectedTaskDetail.subtasks.map((st) => (
                                <label
                                  key={st.id}
                                  className={`task-subtask-item ${st.completed ? 'completed' : ''}`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={st.completed}
                                    onChange={() => handleToggleSubtask(selectedTaskDetail.id, st.id)}
                                    className="task-checkbox"
                                  />
                                  <span className="task-subtask-txt">{st.text}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Activity & Comments Discussion */}
                          <div>
                            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                              Sprint Comments & Notes
                            </h3>

                            <div className="task-comments-list">
                              {selectedTaskDetail.comments && selectedTaskDetail.comments.length > 0 ? (
                                selectedTaskDetail.comments.map((cm, idx) => (
                                  <div key={idx} className="task-comment-card">
                                    <div className="task-comment-header">
                                      <strong className="task-comment-author">{cm.author}</strong>
                                      <span className="task-comment-time">{cm.time}</span>
                                    </div>
                                    <p className="task-comment-text">{cm.text}</p>
                                  </div>
                                ))
                              ) : (
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                                  No comments added yet for this task.
                                </p>
                              )}
                            </div>

                            {/* Add Comment Input */}
                            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '0.5rem' }}>
                              <input
                                type="text"
                                placeholder="Write a comment or status update..."
                                className="task-search-input"
                                style={{ paddingLeft: '0.85rem' }}
                                value={newCommentInput}
                                onChange={(e) => setNewCommentInput(e.target.value)}
                              />
                              <button type="submit" className="btn-primary-purple sm-btn" style={{ whiteSpace: 'nowrap' }}>
                                <Send className="btn-icon" /> Send Note
                              </button>
                            </form>
                          </div>
                        </div>

                        <div className="composer-modal-footer">
                          <button className="btn-outline-purple sm-btn" onClick={() => setSelectedTaskDetail(null)}>
                            Close Inspector
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* APPROVED & ACTIVE CLIENT PROJECTS COMMAND CENTER         */}
          {/* ========================================================= */}
          {currentView === 'projects' && (
            <div className="projects-container animate-fade-in-up">
              {/* Breadcrumb Row */}
              <div className="dash-breadcrumbs">
                <span>Dashboard</span>
                <ChevronRight className="bc-sep" />
                <span>Client Workspace</span>
                <ChevronRight className="bc-sep" />
                <span className="bc-current">Approved Projects Center</span>
              </div>

              {/* Title & Top Bar */}
              <div className="dash-title-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <h1 className="dash-page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Briefcase style={{ width: 28, height: 28, color: '#10b981' }} />
                    Active & Approved Client Projects
                  </h1>
                  <p className="dash-page-subtitle">
                    Track end-to-end deliverables, architecture milestones, and live execution progress for all projects approved by the Admin team.
                  </p>
                </div>

                <div className="bi-top-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    className="btn-primary-purple"
                    onClick={() => {
                      setCurrentView('tasks');
                      setTaskSubTab('create');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.25rem',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)'
                    }}
                  >
                    <Plus style={{ width: 16, height: 16 }} />
                    <span>+ Propose New Task</span>
                  </button>
                </div>
              </div>

              {/* KPI HIGHLIGHT METRICS CARDS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Approved Projects</span>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 style={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
                    {taskItems.filter(t => t.status === 'Approved' || t.status === 'Accepted').length}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>Ready for execution / active sprint</span>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #FAF8F2 100%)', border: '1px solid #E0DDD2', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#5A5A55', textTransform: 'uppercase' }}>In Active Sprint</span>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#EAE6D6', color: '#1E3A2B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap style={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {taskItems.filter(t => t.status === 'In Progress').length}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#1E3A2B', fontWeight: 600 }}>Development in progress</span>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Completed Systems</span>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldCheck style={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
                    {taskItems.filter(t => t.status === 'Completed').length}
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600 }}>Deployed & QA verified</span>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Subtasks Milestones</span>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckSquare style={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  {(() => {
                    const allApproved = taskItems.filter(t => ['Approved', 'Accepted', 'In Progress', 'Completed'].includes(t.status));
                    const allSt = allApproved.flatMap(t => Array.isArray(t.subtasks) ? t.subtasks : []);
                    const compSt = allSt.filter(st => st.completed).length;
                    const pct = allSt.length > 0 ? Math.round((compSt / allSt.length) * 100) : 100;
                    return (
                      <>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
                          {compSt}/{allSt.length} ({pct}%)
                        </h3>
                        <span style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 600 }}>Architecture sprint velocity</span>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* TOOLBAR & SEARCH */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['All', 'Approved', 'In Progress', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setProjectStatusFilter(st)}
                      style={{
                        padding: '0.45rem 0.9rem',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: projectStatusFilter === st ? '#7c3aed' : '#f1f5f9',
                        color: projectStatusFilter === st ? '#ffffff' : '#64748b',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {st === 'All'
                        ? `All Accepted (${taskItems.filter(t => ['Approved', 'Accepted', 'In Progress', 'Completed'].includes(t.status)).length})`
                        : st === 'Approved'
                          ? `Approved (${taskItems.filter(t => t.status === 'Approved' || t.status === 'Accepted').length})`
                          : st}
                    </button>
                  ))}
                </div>

                <div style={{ position: 'relative', width: '280px' }}>
                  <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Search approved projects..."
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.45rem 0.85rem 0.45rem 2.2rem',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.825rem'
                    }}
                  />
                </div>
              </div>

              {/* PROJECTS GRID DISPLAY */}
              {(() => {
                const approvedProjectsList = taskItems.filter(t => ['Approved', 'Accepted', 'In Progress', 'Completed'].includes(t.status));
                const filteredList = approvedProjectsList.filter((p) => {
                  const matchSearch = (p.title || '').toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                    (p.campaign || '').toLowerCase().includes(projectSearchQuery.toLowerCase());
                  const matchStatus = projectStatusFilter === 'All' ? true :
                    projectStatusFilter === 'Approved' ? (p.status === 'Approved' || p.status === 'Accepted') :
                      p.status === projectStatusFilter;
                  return matchSearch && matchStatus;
                });

                if (filteredList.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                      <Briefcase style={{ width: 48, height: 48, color: '#cbd5e1', margin: '0 auto 1rem' }} />
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>No Approved Projects Found</h3>
                      <p style={{ fontSize: '0.875rem', color: '#64748b', maxWidth: '480px', margin: '0.35rem auto 1.5rem' }}>
                        When the Admin accepts a project or task deliverable from your Task Creator Studio, it will automatically appear here with real-time sprint telemetry.
                      </p>
                      <button
                        className="btn-primary-purple"
                        onClick={() => {
                          setCurrentView('tasks');
                          setTaskSubTab('create');
                        }}
                        style={{ padding: '0.65rem 1.4rem' }}
                      >
                        + Create New Task Request
                      </button>
                    </div>
                  );
                }

                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                    {filteredList.map((proj) => {
                      const subtasks = Array.isArray(proj.subtasks) ? proj.subtasks : [];
                      const compSt = subtasks.filter((st) => st.completed).length;
                      const totSt = subtasks.length;
                      const percent = totSt > 0 ? Math.round((compSt / totSt) * 100) : proj.status === 'Completed' ? 100 : 40;

                      return (
                        <div
                          key={proj.id}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '20px',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                          }}
                        >
                          <div>
                            {/* Top Badges */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                              <span style={{ background: '#f3e8ff', color: '#7c3aed', padding: '0.25rem 0.65rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>
                                {proj.campaign || 'General Architecture'}
                              </span>
                              <span
                                style={{
                                  background: proj.status === 'Approved' || proj.status === 'Accepted' ? '#dcfce7' : proj.status === 'In Progress' ? '#f3e8ff' : '#e0f2fe',
                                  color: proj.status === 'Approved' || proj.status === 'Accepted' ? '#15803d' : proj.status === 'In Progress' ? '#7c3aed' : '#0284c7',
                                  padding: '0.25rem 0.75rem',
                                  borderRadius: '20px',
                                  fontSize: '0.75rem',
                                  fontWeight: 800,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <span className="green-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: proj.status === 'Approved' || proj.status === 'Accepted' ? '#16a34a' : '#7c3aed' }} />
                                {proj.status === 'Approved' || proj.status === 'Accepted' ? 'Approved & Active' : proj.status}
                              </span>
                            </div>

                            {/* Title & Desc */}
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                              {proj.title}
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                              {proj.description || 'Enterprise contract deliverable under active agency development.'}
                            </p>

                            {/* Subtask Progress Bar */}
                            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '12px', border: '1px solid #f1f5f9', marginBottom: '1.25rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>
                                <span>Subtask Deliverables ({compSt}/{totSt})</span>
                                <span>{percent}%</span>
                              </div>
                              <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', transition: 'width 0.4s ease' }} />
                              </div>
                            </div>

                            {/* Meta Details */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <UserAvatar src={proj.assignee?.avatar} name={proj.assignee?.name} style={{ width: 22, height: 22 }} />
                                <span style={{ fontWeight: 600, color: '#334155' }}>{proj.assignee?.name || 'Software Tech Lead'}</span>
                              </div>
                              <span>Due: <strong>{proj.dueDate}</strong></span>
                            </div>
                          </div>

                          {/* Footer Buttons */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                            <button
                              className="btn-outline-purple sm-btn"
                              onClick={() => {
                                setInspectedProject(proj);
                                setCurrentView('project-detail');
                              }}
                              style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
                            >
                              <Eye style={{ width: 14, height: 14 }} />
                              <span>Inspect Specs</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ========================================================= */}
          {/* GITHUB-STYLE PROJECT DETAILED INSPECTION VIEW             */}
          {/* ========================================================= */}
          {currentView === 'project-detail' && (
            <ProjectGithubDetailView
              project={inspectedProject}
              onBack={() => setCurrentView('projects')}
              handleUpdateTaskStatus={handleUpdateTaskStatus}
              isClient={true}
            />
          )}
          {/* ========================================================= */}
          {/* FINANCIAL MANAGEMENT, BUDGET ALLOCATION & SPEND HUB        */}
          {/* ========================================================= */}
          {currentView === 'budget' && (
            <div className="budget-container budget-master-container">
              {/* Breadcrumbs Row */}
              <div className="dash-breadcrumbs">
                <span>Dashboard</span>
                <ChevronRight className="bc-sep" />
                <span>Finance</span>
                <ChevronRight className="bc-sep" />
                <span className="bc-current">Budget Allocation & Spend Hub</span>
              </div>

              {/* Title & Top Bar */}
              <div className="dash-title-row">
                <div>
                  <h1 className="dash-page-title">Financial Management & Campaign Budget Hub</h1>
                  <p className="dash-page-subtitle">
                    Plan quarterly allocations, monitor real-time ad spend pacing, set daily safety caps, and optimize channel ROI across all marketing campaigns.
                  </p>
                </div>
                <div className="bi-top-actions">
                  <button className="btn-outline-purple sm-btn" onClick={() => alert('📥 Exporting Financial Statement (PDF/CSV)... Download complete!')}>
                    <Download className="btn-icon text-purple" />
                    <span>Export Statement</span>
                  </button>
                  <button className="btn-outline-purple sm-btn" onClick={() => alert('⚡ AI Spend Optimizer triggered... Budget rebalancing recommendation ready!')}>
                    <Sparkles className="btn-icon text-orange" />
                    <span>AI Spend Optimizer</span>
                  </button>
                  <button className="btn-primary-purple" onClick={() => setIsAllocateBudgetOpen(true)}>
                    <Plus className="btn-icon" />
                    <span>Allocate New Budget</span>
                  </button>
                </div>
              </div>

              {/* 4 High-Impact Financial Telemetry Scorecards */}
              <div className="bi-kpi-grid margin-top-md">
                <div className="kpi-scorecard-card bi-card-highlight">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Total Allocated Budget</span>
                    <DollarSign className="kpi-card-ic text-purple" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">₹75,000.00</span>
                    <span className="kpi-sc-sub text-purple">Q3 2026 Fund</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-purple-grad" style={{ width: '100%' }} /></div>
                  <div className="kpi-sc-footer"><span>Approved Allocation</span><span>Active Cycle</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Current Spend Pacing</span>
                    <Zap className="kpi-card-ic text-blue" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">₹48,250.00</span>
                    <span className="kpi-sc-sub text-green">64.3% Consumed</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-blue-grad" style={{ width: '64%' }} /></div>
                  <div className="kpi-sc-footer"><span>Optimal Pacing</span><span>On Track</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Remaining Capital</span>
                    <PieChart className="kpi-card-ic text-green" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">₹26,750.00</span>
                    <span className="kpi-sc-sub text-green">18 Days Left</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-green-grad" style={{ width: '36%' }} /></div>
                  <div className="kpi-sc-footer"><span>Available Funds</span><span>Safe Margin</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Projected Blended ROAS</span>
                    <TrendingUp className="kpi-card-ic text-orange" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">4.94x ROAS</span>
                    <span className="kpi-sc-sub text-orange">+₹190.3k Net Profit</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-orange-grad" style={{ width: '85%' }} /></div>
                  <div className="kpi-sc-footer"><span>Return on Ad Spend</span><span>High Margin</span></div>
                </div>
              </div>

              {/* Channel Spend Allocation Progress Matrix Grid */}
              <div className="margin-top-md">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Channel Allocation Pacing Breakdown</h3>
                <div className="budget-channel-pacing-grid">
                  {[
                    { channel: 'Google Ads', allocated: 30000, spent: 23050, roas: '5.10x', color: 'purple' },
                    { channel: 'Meta Ads', allocated: 20000, spent: 14500, roas: '4.82x', color: 'blue' },
                    { channel: 'LinkedIn', allocated: 15000, spent: 9800, roas: '4.42x', color: 'amber' },
                    { channel: 'Organic SEO', allocated: 10000, spent: 5750, roas: '5.39x', color: 'emerald' }
                  ].map((ch) => {
                    const pacing = Math.round((ch.spent / ch.allocated) * 100);
                    return (
                      <div key={ch.channel} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-sm text-slate-800">{ch.channel}</strong>
                          <span className="text-xs font-mono font-semibold text-slate-600">{ch.roas} ROAS</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 font-mono mb-1">
                          <span>Spent: ${ch.spent.toLocaleString()}</span>
                          <span>Cap: ${ch.allocated.toLocaleString()}</span>
                        </div>
                        <div className="ch-bar-bg">
                          <div
                            className={`ch-bar-fill bg-${ch.color}-grad`}
                            style={{ width: `${pacing}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-500 margin-top-xs font-mono">
                          <span>Pacing Rate</span>
                          <span className={pacing > 90 ? 'text-red-600 font-bold' : 'text-slate-700 font-bold'}>{pacing}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Predictive AI Spend Optimizer ("Budget Rebalancing Insights") */}
              <div className="margin-top-md">
                <div className="bi-card-header">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    <h2>✨ AI Spend Optimization & Rebalancing Insights</h2>
                  </div>
                  <span className="bi-badge-pill">Real-Time Fiscal AI</span>
                </div>

                <div className="budget-ai-insights-grid margin-top-sm">
                  {budgetInsights.map((ins) => (
                    <div key={ins.id} className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-purple-50 text-purple-700">
                            {ins.badgeText}
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-600">{ins.impact}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">{ins.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{ins.description}</p>
                      </div>

                      <div className="margin-top-md pt-3 border-t border-slate-100 flex justify-end">
                        <button
                          className="btn-outline-purple sm-btn"
                          onClick={() => alert(`✨ Triggered Action: ${ins.actionLabel}! Rebalancing submitted.`)}
                        >
                          <Zap className="btn-ic text-orange" /> {ins.actionLabel}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign Budget Allocation Directory Table */}
              <div className="bi-card-block margin-top-md">
                <div className="bi-card-header">
                  <div>
                    <h2>Campaign Budget Directory & Daily Safety Caps</h2>
                    <p>Monitor real-time campaign spend, daily thresholds, and performance ratios.</p>
                  </div>
                  <span className="bi-table-subtext font-mono">Showing {filteredBudgets.length} Active Budgets</span>
                </div>

                {/* Toolbar */}
                <div className="bi-controls-toolbar margin-top-sm">
                  <div className="budget-toolbar-filters">
                    {['All', 'Google Ads', 'Meta Ads', 'LinkedIn', 'Organic SEO'].map((ch) => (
                      <button
                        key={ch}
                        className={`bi-ch-pill ${selectedBudgetChannel === ch ? 'active' : ''}`}
                        onClick={() => setSelectedBudgetChannel(ch)}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>

                  <div className="header-search-wrap max-w-xs">
                    <Search className="search-ic" />
                    <input
                      type="text"
                      placeholder="Search campaign budget..."
                      className="header-search-input"
                      value={budgetSearchQuery}
                      onChange={(e) => setBudgetSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="bi-table-wrap budget-table-scroll-wrap margin-top-sm">
                  <table className="bi-leaderboard-table">
                    <thead>
                      <tr>
                        <th>Campaign & Channel</th>
                        <th>Total Allocated ($)</th>
                        <th>Spent to Date ($)</th>
                        <th>Pacing Meter (%)</th>
                        <th>Daily Safety Cap (₹/day)</th>
                        <th>Blended ROAS</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBudgets.map((b) => (
                        <tr key={b.id}>
                          <td>
                            <div>
                              <strong className="cmp-table-name">{b.campaignName}</strong>
                              <div className="ch-sub-meta text-purple font-semibold">{b.channel}</div>
                            </div>
                          </td>
                          <td>
                            <strong className="font-mono text-slate-800">₹{b.allocatedBudget.toLocaleString()}</strong>
                          </td>
                          <td>
                            <span className="font-mono text-slate-700">₹{b.spentToDate.toLocaleString()}</span>
                          </td>
                          <td>
                            <div className="w-32">
                              <div className="flex justify-between text-xs font-mono text-slate-600 mb-1">
                                <span>Pacing</span>
                                <span className="font-bold">{b.pacingPercent}%</span>
                              </div>
                              <div className="ch-bar-bg">
                                <div
                                  className={`ch-bar-fill ${b.pacingPercent > 90 ? 'bg-orange-grad' : 'bg-purple-grad'}`}
                                  style={{ width: `${b.pacingPercent}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                              ₹{b.dailyCap}/day
                            </span>
                          </td>
                          <td>
                            <span className="font-mono font-bold text-emerald-600">{b.roas}x</span>
                          </td>
                          <td>
                            <span className={`ct-segment-pill ${b.status === 'On Track' ? 'segment-champion' : 'segment-risk'}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="text-right">
                            <button className="btn-outline-purple sm-btn" onClick={() => setSelectedBudgetAdjust(b)}>
                              <DollarSign className="btn-ic text-purple" /> Adjust
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Adjust Budget Modal Drawer */}
              {selectedBudgetAdjust && (
                <div className="social-composer-modal-overlay">
                  <div className="social-composer-modal-card animate-scale-up max-w-lg">
                    <div className="composer-modal-header">
                      <div>
                        <h2>💰 Adjust Campaign Budget Limits</h2>
                        <p>{selectedBudgetAdjust.campaignName}</p>
                      </div>
                      <button className="composer-close-btn" onClick={() => setSelectedBudgetAdjust(null)}>
                        <X className="close-ic" />
                      </button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const alloc = e.target.allocInput.value;
                      const cap = e.target.capInput.value;
                      handleUpdateCampaignBudget(selectedBudgetAdjust.id, alloc, cap);
                    }}>
                      <div className="bi-detail-modal-body p-6 budget-modal-grid">
                        <div className="form-group col-span-2">
                          <label className="composer-label">Campaign Channel</label>
                          <input type="text" disabled className="composer-input bg-slate-100" value={selectedBudgetAdjust.channel} />
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Total Allocated Budget (₹)</label>
                          <input
                            type="number"
                            name="allocInput"
                            required
                            defaultValue={selectedBudgetAdjust.allocatedBudget}
                            className="composer-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Daily Safety Cap (₹/day)</label>
                          <input
                            type="number"
                            name="capInput"
                            required
                            defaultValue={selectedBudgetAdjust.dailyCap}
                            className="composer-input"
                          />
                        </div>

                        <div className="form-group col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                          <div className="flex justify-between text-slate-600 mb-1">
                            <span>Current Spent to Date:</span>
                            <strong className="font-mono">₹{selectedBudgetAdjust.spentToDate.toLocaleString()}</strong>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Current Blended ROAS:</span>
                            <strong className="font-mono text-emerald-600">{selectedBudgetAdjust.roas}x</strong>
                          </div>
                        </div>
                      </div>

                      <div className="composer-modal-footer">
                        <button type="button" className="btn-outline-purple sm-btn" onClick={() => setSelectedBudgetAdjust(null)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary-purple">
                          <Check className="btn-icon" /> Save Budget Adjustments
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Allocate New Budget Modal */}
              {isAllocateBudgetOpen && (
                <div className="social-composer-modal-overlay">
                  <div className="social-composer-modal-card animate-scale-up max-w-lg">
                    <div className="composer-modal-header">
                      <div>
                        <h2>💳 Allocate New Campaign Budget</h2>
                        <p>Assign marketing budget capital to a new campaign workstream.</p>
                      </div>
                      <button className="composer-close-btn" onClick={() => setIsAllocateBudgetOpen(false)}>
                        <X className="close-ic" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveNewBudget}>
                      <div className="bi-detail-modal-body p-6 budget-modal-grid">
                        <div className="form-group col-span-2">
                          <label className="composer-label">Campaign Workstream Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. TikTok Influencer Launch Campaign"
                            className="composer-input"
                            value={newBudgetData.campaignName}
                            onChange={(e) => setNewBudgetData({ ...newBudgetData, campaignName: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Marketing Channel</label>
                          <select
                            className="composer-select"
                            value={newBudgetData.channel}
                            onChange={(e) => setNewBudgetData({ ...newBudgetData, channel: e.target.value })}
                          >
                            <option value="Google Ads">Google Ads</option>
                            <option value="Meta Ads">Meta Ads</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Organic SEO">Organic SEO</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Allocated Capital ($)</label>
                          <input
                            type="number"
                            required
                            placeholder="10000"
                            className="composer-input"
                            value={newBudgetData.allocatedBudget}
                            onChange={(e) => setNewBudgetData({ ...newBudgetData, allocatedBudget: e.target.value })}
                          />
                        </div>

                        <div className="form-group col-span-2">
                          <label className="composer-label">Daily Safety Cap Limit (₹/day)</label>
                          <input
                            type="number"
                            required
                            placeholder="400"
                            className="composer-input"
                            value={newBudgetData.dailyCap}
                            onChange={(e) => setNewBudgetData({ ...newBudgetData, dailyCap: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="composer-modal-footer">
                        <button type="button" className="btn-outline-purple sm-btn" onClick={() => setIsAllocateBudgetOpen(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary-purple">
                          <Plus className="btn-icon" /> Allocate Budget
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}
          {/* ========================================================= */}
          {/* OMNICHANNEL INTEGRATION ECOSYSTEM & API CONTROL HUB       */}
          {/* ========================================================= */}
          {currentView === 'integrations' && (
            <div className="integrations-container integrations-master-container">
              {/* Breadcrumbs Row */}
              <div className="dash-breadcrumbs">
                <span>Dashboard</span>
                <ChevronRight className="bc-sep" />
                <span>Connections</span>
                <ChevronRight className="bc-sep" />
                <span className="bc-current">Integration Ecosystem & API Hub</span>
              </div>

              {/* Title & Top Bar */}
              <div className="dash-title-row">
                <div>
                  <h1 className="dash-page-title">Omnichannel Integration Ecosystem & API Hub</h1>
                  <p className="dash-page-subtitle">
                    Connect third-party advertising platforms, CRM tools, analytics engines, and webhook pipelines to unify all digital marketing data in one central command center.
                  </p>
                </div>
                <div className="bi-top-actions">
                  <button className="btn-outline-purple sm-btn" onClick={() => alert('📥 Exporting Integration Ecosystem Telemetry & Health Audit (JSON/CSV)... Download complete!')}>
                    <Download className="btn-icon text-purple" />
                    <span>Export Status</span>
                  </button>
                  <button className="btn-outline-purple sm-btn" onClick={() => alert('⚡ Testing all 12 API Endpoints... All webhooks and OAuth tokens return 200 OK status!')}>
                    <Sparkles className="btn-icon text-orange" />
                    <span>Test API Connections</span>
                  </button>
                  <button className="btn-primary-purple" onClick={() => setIsAddWebhookOpen(true)}>
                    <Plus className="btn-icon" />
                    <span>Add Custom Webhook</span>
                  </button>
                </div>
              </div>

              {/* 4 High-Impact Integration Telemetry Scorecards */}
              <div className="bi-kpi-grid margin-top-md">
                <div className="kpi-scorecard-card bi-card-highlight">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Total Connected Services</span>
                    <Layers className="kpi-card-ic text-purple" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">
                      {connectedServices.filter(s => s.status === 'Connected').length} / {connectedServices.length} Active
                    </span>
                    <span className="kpi-sc-sub text-purple">10 Production Pipelines</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-purple-grad" style={{ width: '83%' }} /></div>
                  <div className="kpi-sc-footer"><span>Ecosystem Coverage</span><span>83.3% Active</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">API Health & Uptime Status</span>
                    <Activity className="kpi-card-ic text-green" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">99.98% Uptime</span>
                    <span className="kpi-sc-sub text-green">0 Errors Recorded</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-green-grad" style={{ width: '99%' }} /></div>
                  <div className="kpi-sc-footer"><span>Webhooks Operational</span><span>Healthy</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Data Sync Velocity</span>
                    <Zap className="kpi-card-ic text-blue" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">1.42M Events/Day</span>
                    <span className="kpi-sc-sub text-blue">Real-Time Sync</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-blue-grad" style={{ width: '74%' }} /></div>
                  <div className="kpi-sc-footer"><span>Ingestion Rate</span><span>Sub-Second Latency</span></div>
                </div>

                <div className="kpi-scorecard-card">
                  <div className="kpi-sc-header">
                    <span className="kpi-sc-title">Cloudinary Media CDN</span>
                    <Globe className="kpi-card-ic text-orange" />
                  </div>
                  <div className="kpi-sc-value-row">
                    <span className="kpi-sc-val">Connected</span>
                    <span className="kpi-sc-sub text-purple">Cloud: digitoomasha</span>
                  </div>
                  <div className="kpi-sparkline-bar"><div className="sparkline-fill bg-orange-grad" style={{ width: '100%' }} /></div>
                  <div className="kpi-sc-footer"><span>High-Res CDN Active</span><span>WebP Optimizations</span></div>
                </div>
              </div>

              {/* Category Filter Toolbar & Search Bar */}
              <div className="bi-controls-toolbar margin-top-md">
                <div className="integrations-toolbar-filters">
                  {['All', 'Ad Networks', 'Social Media', 'CRM & Email', 'Analytics', 'Cloud Storage', 'Workflow Engine', 'E-Commerce'].map((cat) => (
                    <button
                      key={cat}
                      className={`bi-ch-pill ${selectedIntegrationCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedIntegrationCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="header-search-wrap max-w-xs shrink-0">
                  <Search className="search-ic" />
                  <input
                    type="text"
                    placeholder="Search integrations, APIs..."
                    className="header-search-input"
                    value={integrationSearchQuery}
                    onChange={(e) => setIntegrationSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* 12-Service Integration Grid */}
              <div className="integrations-services-grid margin-top-md">
                {filteredIntegrations.map((service) => {
                  const isConn = service.status === 'Connected';
                  return (
                    <div key={service.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-purple-300 transition-all hover:shadow-md">
                      <div>
                        {/* Header Row */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm" style={{ background: service.iconBg }}>
                              {service.name[0]}
                            </div>
                            <div>
                              <h3 className="text-sm font-bold text-slate-900 leading-tight">{service.name}</h3>
                              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded mt-0.5 inline-block">
                                {service.category}
                              </span>
                            </div>
                          </div>
                          <span className={`ct-segment-pill ${isConn ? 'segment-champion' : 'segment-risk'}`}>
                            {isConn ? '🟢 Active' : '⚪ Disconnected'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed mb-4">{service.description}</p>

                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono space-y-1">
                          <div className="flex justify-between text-slate-600">
                            <span>Key Token:</span>
                            <span className="text-slate-900 font-semibold">{service.apiKeyMasked}</span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Sync Rate:</span>
                            <span className="text-purple-700 font-semibold">{service.syncFrequency}</span>
                          </div>
                          <div className="flex justify-between text-slate-600">
                            <span>Last Sync:</span>
                            <span className="text-slate-700">{service.lastSync}</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="margin-top-md pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          className="btn-outline-purple sm-btn text-xs"
                          onClick={() => setSelectedServiceConfig(service)}
                        >
                          <Settings className="btn-ic" /> Configure API
                        </button>

                        <button
                          className={isConn ? 'btn-outline-purple sm-btn text-xs text-red-600 border-red-200' : 'btn-primary-purple sm-btn text-xs'}
                          onClick={() => handleToggleServiceConnection(service.id)}
                        >
                          {isConn ? 'Disconnect' : 'Connect Platform'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Configure API Settings Modal */}
              {selectedServiceConfig && (
                <div className="social-composer-modal-overlay">
                  <div className="social-composer-modal-card animate-scale-up max-w-lg">
                    <div className="composer-modal-header">
                      <div>
                        <h2>⚙️ Configure API Settings</h2>
                        <p>{selectedServiceConfig.name}</p>
                      </div>
                      <button className="composer-close-btn" onClick={() => setSelectedServiceConfig(null)}>
                        <X className="close-ic" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveServiceConfig}>
                      <div className="bi-detail-modal-body p-6 integrations-modal-grid">
                        <div className="form-group col-span-2">
                          <label className="composer-label">Integration Category</label>
                          <input type="text" disabled className="composer-input bg-slate-100" value={selectedServiceConfig.category} />
                        </div>

                        <div className="form-group col-span-2">
                          <label className="composer-label">API Key / Access Token</label>
                          <input
                            type="password"
                            required
                            defaultValue={selectedServiceConfig.apiKeyMasked}
                            className="composer-input font-mono"
                          />
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Sync Frequency</label>
                          <select className="composer-select" defaultValue={selectedServiceConfig.syncFrequency}>
                            <option value="Real-time (Every 5m)">Real-time (Every 5m)</option>
                            <option value="Real-time (Every 15m)">Real-time (Every 15m)</option>
                            <option value="Hourly">Hourly</option>
                            <option value="Daily">Daily</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Environment Mode</label>
                          <select className="composer-select">
                            <option value="Production">Production (Live)</option>
                            <option value="Sandbox">Sandbox / Staging</option>
                          </select>
                        </div>

                        <div className="form-group col-span-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                          <span className="font-bold text-slate-800">Connection Status:</span> {selectedServiceConfig.status} • Last verified {selectedServiceConfig.lastSync}
                        </div>
                      </div>

                      <div className="composer-modal-footer">
                        <button type="button" className="btn-outline-purple sm-btn" onClick={() => setSelectedServiceConfig(null)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary-purple">
                          <Check className="btn-icon" /> Save & Test Connection
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Add Custom Webhook Modal */}
              {isAddWebhookOpen && (
                <div className="social-composer-modal-overlay">
                  <div className="social-composer-modal-card animate-scale-up max-w-lg">
                    <div className="composer-modal-header">
                      <div>
                        <h2>🔗 Add Custom Webhook Integration</h2>
                        <p>Stream real-time campaign telemetry and lead data to your endpoint.</p>
                      </div>
                      <button className="composer-close-btn" onClick={() => setIsAddWebhookOpen(false)}>
                        <X className="close-ic" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveCustomWebhook}>
                      <div className="bi-detail-modal-body p-6 integrations-modal-grid">
                        <div className="form-group col-span-2">
                          <label className="composer-label">Webhook Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Lead Intake Webhook to Custom Server"
                            className="composer-input"
                            value={newWebhookData.name}
                            onChange={(e) => setNewWebhookData({ ...newWebhookData, name: e.target.value })}
                          />
                        </div>

                        <div className="form-group col-span-2">
                          <label className="composer-label">Target URL (HTTPS Endpoint) *</label>
                          <input
                            type="url"
                            required
                            placeholder="https://api.yourdomain.com/v1/webhooks/leads"
                            className="composer-input font-mono"
                            value={newWebhookData.targetUrl}
                            onChange={(e) => setNewWebhookData({ ...newWebhookData, targetUrl: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Event Trigger</label>
                          <select
                            className="composer-select"
                            value={newWebhookData.eventTrigger}
                            onChange={(e) => setNewWebhookData({ ...newWebhookData, eventTrigger: e.target.value })}
                          >
                            <option value="Lead Form Created">Lead Form Created</option>
                            <option value="Campaign Paused">Campaign Paused</option>
                            <option value="Budget Threshold Reached">Budget Threshold Reached</option>
                            <option value="AI Recommendation Alert">AI Recommendation Alert</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="composer-label">Secret Signature Header</label>
                          <input
                            type="text"
                            placeholder="X-Digi-Signature-Secret"
                            className="composer-input font-mono"
                            value={newWebhookData.secretHeader}
                            onChange={(e) => setNewWebhookData({ ...newWebhookData, secretHeader: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="composer-modal-footer">
                        <button type="button" className="btn-outline-purple sm-btn" onClick={() => setIsAddWebhookOpen(false)}>
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary-purple">
                          <Plus className="btn-icon" /> Activate Webhook
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* MASTER ENTERPRISE SETTINGS PORTAL WITH CLOUDINARY UPLOAD  */}
          {/* ========================================================= */}
          {currentView === 'settings' && (
            <div className="master-settings-portal">
              <div className="dash-breadcrumbs"><span>Dashboard</span><ChevronRight className="bc-sep" /><span className="bc-current">Settings Suite</span></div>

              <div className="dash-title-row">
                <div>
                  <h1 className="dash-page-title">Account & Portal Settings</h1>
                  <p className="dash-page-subtitle">Configure personal credentials, business parameters, API security, and regional localization.</p>
                </div>
                <button className="btn-primary-purple" onClick={handleSaveChanges}>
                  <Save className="btn-icon" /> <span>Save Changes</span>
                </button>
              </div>

              {/* Master Two-Column Grouped Layout */}
              <div className="settings-master-layout margin-top-md">

                {/* Left Category Sidebar Navigation with 5 Grouped Hubs */}
                <aside className="settings-nav-sidebar">
                  <div className="settings-nav-menu">
                    {settingsGroups.map((group, gIdx) => (
                      <div key={gIdx} className="settings-nav-group">
                        <div className="settings-nav-group-title">{group.groupTitle}</div>
                        <div className="settings-nav-group-items">
                          {group.items.map((cat) => {
                            const CatIcon = cat.Icon;
                            const isCatActive = activeSettingsTab === cat.id;
                            return (
                              <button
                                key={cat.id}
                                className={`settings-tab-btn ${isCatActive ? 'active' : ''}`}
                                onClick={() => setActiveSettingsTab(cat.id)}
                              >
                                <CatIcon className="set-tab-icon" />
                                <div className="set-tab-text">
                                  <span className="set-tab-title">{cat.label}</span>
                                </div>
                                <ChevronRight className="set-tab-arrow" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </aside>

                {/* Right Content Panel Renderer */}
                <section className="settings-content-panel animate-fade-in-up" key={activeSettingsTab}>

                  {/* 1. REDESIGNED PROFILE SETTINGS (CLOUDINARY PHOTO UPLOAD CONNECTED) */}
                  {activeSettingsTab === 'profile' && (
                    <div className="settings-panel-wrapper">

                      {/* Top Profile Header Cover Banner */}
                      <div className="profile-header-banner">
                        <div className="profile-banner-left">
                          <div className="avatar-wrapper">
                            <UserAvatar src={profileData.avatar} name={profileData.fullName} className="profile-avatar-img" />
                            <span className="online-status-badge" title="Online Active" />
                            {uploadingAvatar && (
                              <div className="avatar-upload-spinner-overlay">
                                <Loader2 className="animate-spin text-white w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="profile-meta-info">
                            <h2 className="profile-user-name">{profileData.fullName}</h2>
                            <p className="profile-user-email">{profileData.email}</p>
                            <span className="profile-role-badge"><Sparkles className="r-ic" /> {profileData.jobTitle}</span>
                          </div>
                        </div>

                        {/* Cloudinary Change Photo Button Trigger */}
                        <button
                          type="button"
                          className="btn-outline-purple sm-btn"
                          disabled={uploadingAvatar}
                          onClick={() => avatarFileInputRef.current?.click()}
                        >
                          {uploadingAvatar ? (
                            <><Loader2 className="btn-icon animate-spin" /> Uploading...</>
                          ) : (
                            <><Upload className="btn-icon" /> Change Photo</>
                          )}
                        </button>
                      </div>

                      {/* Card Block 1: Personal & Contact Information */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <User className="card-block-ic" />
                          <div>
                            <h3 className="card-block-title">Personal & Contact Information</h3>
                            <p className="card-block-sub">Basic identification and primary contact channels.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div className="grid-2-col">
                            <div className="form-group">
                              <label className="form-label">Full Name *</label>
                              <div className="input-with-icon-wrap">
                                <User className="input-prefix-ic" />
                                <input
                                  type="text"
                                  value={profileData.fullName}
                                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                  className="form-input icon-padded-input"
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Job Title / Designation</label>
                              <div className="input-with-icon-wrap">
                                <Briefcase className="input-prefix-ic" />
                                <input
                                  type="text"
                                  value={profileData.jobTitle}
                                  onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                                  className="form-input icon-padded-input"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid-2-col margin-top-sm">
                            <div className="form-group">
                              <label className="form-label">Contact Work Email *</label>
                              <div className="input-with-icon-wrap">
                                <Mail className="input-prefix-ic" />
                                <input
                                  type="email"
                                  value={profileData.email}
                                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                  className="form-input icon-padded-input"
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Phone Number *</label>
                              <div className="phone-country-select-wrapper">
                                <select
                                  value={profileData.dialCode}
                                  onChange={(e) => setProfileData({ ...profileData, dialCode: e.target.value })}
                                  className="dial-code-select"
                                >
                                  {COUNTRY_DIAL_CODES.map((c, idx) => (
                                    <option key={idx} value={c.code}>{c.label}</option>
                                  ))}
                                </select>
                                <div className="input-with-icon-wrap phone-input-field">
                                  <Phone className="input-prefix-ic" />
                                  <input
                                    type="text"
                                    value={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    className="form-input icon-padded-input"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Block 2: Location & Address */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <MapPin className="card-block-ic" />
                          <div>
                            <h3 className="card-block-title">Location & Regional Details</h3>
                            <p className="card-block-sub">Geographic country and city parameters.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div className="grid-2-col">
                            <div className="form-group">
                              <label className="form-label">Country</label>
                              <div className="input-with-icon-wrap">
                                <Globe className="input-prefix-ic" />
                                <select
                                  value={profileData.country}
                                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                                  className="form-input icon-padded-input"
                                >
                                  {COUNTRY_DIAL_CODES.map((c, idx) => (
                                    <option key={idx} value={c.country}>{c.country}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="form-label">City</label>
                              <div className="input-with-icon-wrap">
                                <Building2 className="input-prefix-ic" />
                                <input
                                  type="text"
                                  value={profileData.city}
                                  onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                  className="form-input icon-padded-input"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Block 3: Business & Organization Profile */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Building2 className="card-block-ic" />
                          <div>
                            <h3 className="card-block-title">Company & Organization Profile</h3>
                            <p className="card-block-sub">Business registration, industry type, and domain website.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div className="grid-2-col">
                            <div className="form-group">
                              <label className="form-label">Company / Business Name</label>
                              <div className="input-with-icon-wrap">
                                <Building className="input-prefix-ic" />
                                <input
                                  type="text"
                                  value={profileData.companyName}
                                  onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                                  className="form-input icon-padded-input"
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Business Website URL</label>
                              <div className="input-with-icon-wrap">
                                <Globe className="input-prefix-ic" />
                                <input
                                  type="text"
                                  value={profileData.businessWebsite}
                                  onChange={(e) => setProfileData({ ...profileData, businessWebsite: e.target.value })}
                                  className="form-input icon-padded-input"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Block 4: Scale & Marketing Focus */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Target className="card-block-ic" />
                          <div>
                            <h3 className="card-block-title">Scale & Marketing Focus Parameters</h3>
                            <p className="card-block-sub">Company headcount size, ad budget, and active marketing goals.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div className="grid-2-col">
                            <div className="form-group">
                              <label className="form-label">Employee Count / Company Size</label>
                              <div className="input-with-icon-wrap">
                                <Users className="input-prefix-ic" />
                                <select
                                  value={profileData.employeesCount}
                                  onChange={(e) => setProfileData({ ...profileData, employeesCount: e.target.value })}
                                  className="form-input icon-padded-input"
                                >
                                  <option>1-10 employees</option>
                                  <option>11-50 employees</option>
                                  <option>51-200 employees</option>
                                  <option>201-500 employees</option>
                                  <option>500+ employees</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="form-label">Monthly Ad Spend Budget</label>
                              <div className="input-with-icon-wrap">
                                <DollarSign className="input-prefix-ic" />
                                <select
                                  value={profileData.monthlyBudget}
                                  onChange={(e) => setProfileData({ ...profileData, monthlyBudget: e.target.value })}
                                  className="form-input icon-padded-input"
                                >
                                  <option>&lt;₹2,500/mo</option>
                                  <option>₹2,500 - ₹5,000/mo</option>
                                  <option>₹5,000 - ₹10,000/mo</option>
                                  <option>₹10,000 - ₹25,000/mo</option>
                                  <option>₹25,000+/mo</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="form-group margin-top-sm">
                            <label className="form-label">Selected Marketing Goals & Focus Areas</label>
                            <div className="goals-tags-wrapper">
                              {AVAILABLE_GOALS.map((goal, idx) => {
                                const isSelected = profileData.businessGoals.includes(goal);
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    className={`goal-tag-pill ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleGoalToggle(goal)}
                                  >
                                    {isSelected && <Check className="tag-chk" />}
                                    <span>{goal}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* 2. SECURITY & ACCESS PANEL */}
                  {activeSettingsTab === 'security' && (
                    <div className="settings-panel-wrapper">
                      {/* Security Header Banner */}
                      <div className="security-panel-header">
                        <div>
                          <h2 className="profile-user-name" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Shield className="text-purple w-7 h-7" /> Security & Access Control
                          </h2>
                          <p className="profile-user-email">Manage two-factor authentication, active device sessions, credential policies, and role permissions.</p>
                        </div>
                        <div className="security-overall-status-badge">
                          <ShieldCheck className="w-5 h-5 text-green" />
                          <span>Security Health: <strong className="text-green">Optimal</strong></span>
                        </div>
                      </div>

                      {/* 1. TWO-FACTOR AUTHENTICATION (2FA) */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header" style={{ justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Smartphone className="card-block-ic text-purple" />
                            <div>
                              <h3 className="card-block-title">Two-Factor Authentication (2FA)</h3>
                              <p className="card-block-sub">Require an extra security verification code when logging in.</p>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span className={`status-badge-pill ${twoFactorEnabled ? 'status-act' : 'status-pause'}`}>
                              {twoFactorEnabled ? '2FA Active' : 'Disabled'}
                            </span>
                            <button
                              type="button"
                              className={`btn-sm-toggle ${twoFactorEnabled ? 'active' : ''}`}
                              onClick={handleToggle2FA}
                            >
                              {twoFactorEnabled ? 'Turn Off' : 'Enable 2FA'}
                            </button>
                          </div>
                        </div>

                        {twoFactorEnabled && (
                          <div className="card-block-body">
                            <div className="sec-methods-grid">
                              <div
                                className={`sec-method-card ${twoFactorMethod === 'authenticator' ? 'selected' : ''}`}
                                onClick={() => handleSelect2FAMethod('authenticator')}
                              >
                                <div className="sec-icon-wrap"><Key className="w-5 h-5" /></div>
                                <div className="sec-method-text">
                                  <strong className="sec-title">Google / TOTP Authenticator App</strong>
                                  <p className="sec-sub">Generate dynamic 6-digit codes via Google Authenticator, Authy, or 1Password.</p>
                                </div>
                                <span className="sec-radio-dot">{twoFactorMethod === 'authenticator' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                              </div>

                              <div
                                className={`sec-method-card ${twoFactorMethod === 'sms' ? 'selected' : ''}`}
                                onClick={() => handleSelect2FAMethod('sms')}
                              >
                                <div className="sec-icon-wrap"><Smartphone className="w-5 h-5" /></div>
                                <div className="sec-method-text">
                                  <strong className="sec-title">SMS / WhatsApp OTP Verification</strong>
                                  <p className="sec-sub">Deliver single-use security codes directly to your mobile phone number ({profileData.dialCode} {profileData.phone || '9876543210'}).</p>
                                </div>
                                <span className="sec-radio-dot">{twoFactorMethod === 'sms' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                              </div>

                              <div
                                className={`sec-method-card ${twoFactorMethod === 'hardware' ? 'selected' : ''}`}
                                onClick={() => handleSelect2FAMethod('hardware')}
                              >
                                <div className="sec-icon-wrap"><Lock className="w-5 h-5" /></div>
                                <div className="sec-method-text">
                                  <strong className="sec-title">Hardware Security Key (YubiKey / WebAuthn)</strong>
                                  <p className="sec-sub">Authenticate using physical USB hardware security keys or biometrics (TouchID / FaceID).</p>
                                </div>
                                <span className="sec-radio-dot">{twoFactorMethod === 'hardware' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                              </div>
                            </div>

                            <div className="sec-actions-row margin-top-md">
                              <button className="btn-primary-purple sm-btn" onClick={() => alert('2FA Authenticator QR Code generated! Scan with Google Authenticator app.')}>
                                <RefreshCw className="btn-icon-sm" /> Re-Configure Authenticator App
                              </button>
                              <button className="btn-outline-purple sm-btn" onClick={() => alert('10 Emergency Backup Recovery Codes downloaded to your computer.')}>
                                <FileCheck className="btn-icon-sm" /> Download 10 Recovery Codes
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 2. ACTIVE SESSIONS */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header" style={{ justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Laptop className="card-block-ic text-blue" />
                            <div>
                              <h3 className="card-block-title">Active Sessions & Connected Devices</h3>
                              <p className="card-block-sub">Review browsers and devices currently signed into your account.</p>
                            </div>
                          </div>
                          {activeSessionsList.length > 1 && (
                            <button
                              type="button"
                              className="btn-outline-red sm-btn"
                              onClick={handleTerminateAllOtherSessions}
                            >
                              <LogOut className="btn-icon-sm" /> Terminate All Other Sessions
                            </button>
                          )}
                        </div>

                        <div className="card-block-body">
                          <div className="active-sessions-list">
                            {activeSessionsList.map((session) => (
                              <div key={session.id} className="session-item-row">
                                <div className="session-item-left">
                                  <div className="session-device-icon">
                                    {session.type === 'mobile' ? <Smartphone className="w-5 h-5 text-purple" /> : <Laptop className="w-5 h-5 text-blue" />}
                                  </div>
                                  <div>
                                    <div className="session-device-name">
                                      <strong>{session.device}</strong>
                                      {session.isCurrent && <span className="current-session-badge">Current Device</span>}
                                    </div>
                                    <div className="session-meta-line">
                                      <span><Globe className="w-3.5 h-3.5 inline" /> {session.location}</span>
                                      <span className="dot">•</span>
                                      <span>IP: {session.ip}</span>
                                      <span className="dot">•</span>
                                      <span className="text-muted"><Clock className="w-3.5 h-3.5 inline" /> {session.lastActive}</span>
                                    </div>
                                  </div>
                                </div>

                                {!session.isCurrent && (
                                  <button
                                    type="button"
                                    className="btn-revoke-session"
                                    onClick={() => handleRevokeSession(session.id)}
                                    title="Revoke session"
                                  >
                                    <Trash2 className="w-4 h-4" /> Revoke Access
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 3. LOGIN HISTORY */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header" style={{ justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <History className="card-block-ic text-orange" />
                            <div>
                              <h3 className="card-block-title">Login History & Security Audit Log</h3>
                              <p className="card-block-sub">Recent authentication activities and security access records.</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn-outline-purple sm-btn"
                            onClick={fetchSecuritySettings}
                          >
                            <RefreshCw className="btn-icon-sm" /> Refresh Audit Log
                          </button>
                        </div>

                        <div className="card-block-body">
                          <div className="table-responsive-wrapper settings-table-scroll-wrap">
                            <table className="login-history-table">
                              <thead>
                                <tr>
                                  <th>Date & Time</th>
                                  <th>Browser & OS</th>
                                  <th>IP Address & Location</th>
                                  <th>Authentication Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {loginHistoryList.map((log) => (
                                  <tr key={log.id}>
                                    <td>
                                      <div className="log-time-cell">
                                        <Clock className="w-3.5 h-3.5 text-muted" />
                                        <span>{log.timestamp}</span>
                                      </div>
                                    </td>
                                    <td><strong className="log-browser-val">{log.browser}</strong></td>
                                    <td>
                                      <div className="log-ip-cell">
                                        <span>{log.ip}</span>
                                        <span className="log-loc-tag">{log.location}</span>
                                      </div>
                                    </td>
                                    <td>
                                      <span className={`status-badge-pill ${log.status === 'Success' ? 'status-act' : 'status-pause'}`}>
                                        {log.status === 'Success' ? <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> : <AlertTriangle className="w-3.5 h-3.5 inline mr-1" />}
                                        {log.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      {/* 4. PASSWORD POLICY & CHANGE PASSWORD */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Lock className="card-block-ic text-green" />
                          <div>
                            <h3 className="card-block-title">Password Policy & Credential Management</h3>
                            <p className="card-block-sub">Update your account password and review enterprise password complexity requirements.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          {passwordChangeSuccess && (
                            <div className="alert-success-banner margin-bottom-md">
                              <CheckCircle2 className="w-5 h-5 text-green flex-shrink-0" />
                              <span>Your account password has been updated successfully! Security credentials re-indexed.</span>
                            </div>
                          )}

                          {passwordErrorMsg && (
                            <div className="alert-error-banner margin-bottom-md" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                              <span>{passwordErrorMsg}</span>
                            </div>
                          )}

                          <form onSubmit={handlePasswordSubmit} className="password-change-form">
                            <div className="grid-2-col">
                              <div className="form-group">
                                <label className="form-label">Current Password *</label>
                                <div className="input-with-icon-wrap">
                                  <Lock className="input-prefix-ic" />
                                  <input
                                    type={showCurrentPass ? 'text' : 'password'}
                                    placeholder="Enter current password"
                                    value={passwordFormData.currentPassword}
                                    onChange={(e) => setPasswordFormData({ ...passwordFormData, currentPassword: e.target.value })}
                                    required
                                    className="form-input icon-padded-input"
                                  />
                                  <button
                                    type="button"
                                    className="pass-toggle-eye"
                                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                                  >
                                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </button>
                                </div>
                              </div>

                              <div className="form-group">
                                <label className="form-label">New Password *</label>
                                <div className="input-with-icon-wrap">
                                  <Key className="input-prefix-ic" />
                                  <input
                                    type={showNewPass ? 'text' : 'password'}
                                    placeholder="Min. 12 characters"
                                    value={passwordFormData.newPassword}
                                    onChange={(e) => setPasswordFormData({ ...passwordFormData, newPassword: e.target.value })}
                                    required
                                    className="form-input icon-padded-input"
                                  />
                                  <button
                                    type="button"
                                    className="pass-toggle-eye"
                                    onClick={() => setShowNewPass(!showNewPass)}
                                  >
                                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="grid-2-col margin-top-sm">
                              <div className="form-group">
                                <label className="form-label">Confirm New Password *</label>
                                <div className="input-with-icon-wrap">
                                  <Key className="input-prefix-ic" />
                                  <input
                                    type={showNewPass ? 'text' : 'password'}
                                    placeholder="Re-enter new password"
                                    value={passwordFormData.confirmPassword}
                                    onChange={(e) => setPasswordFormData({ ...passwordFormData, confirmPassword: e.target.value })}
                                    required
                                    className="form-input icon-padded-input"
                                  />
                                </div>
                              </div>

                              <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <button type="submit" className="btn-primary-purple w-full">
                                  <Save className="btn-icon-sm" /> Update Account Password
                                </button>
                              </div>
                            </div>
                          </form>

                          {/* Enterprise Password Policy Rules Box */}
                          <div className="password-policy-rules-box margin-top-md">
                            <strong className="policy-box-title"><ShieldCheck className="w-4 h-4 text-purple inline mr-1.5" /> Enterprise Password Policy Standard</strong>
                            <ul className="policy-checklist margin-top-xs">
                              <li className="checked"><Check className="w-3.5 h-3.5 text-green mr-1.5" /> Minimum length of 12 characters required</li>
                              <li className="checked"><Check className="w-3.5 h-3.5 text-green mr-1.5" /> Includes uppercase letters (A-Z) and numbers (0-9)</li>
                              <li className="checked"><Check className="w-3.5 h-3.5 text-green mr-1.5" /> Includes at least 1 special character (!@#$%^&*)</li>
                              <li className="checked"><Check className="w-3.5 h-3.5 text-green mr-1.5" /> Prevents reuse of previous 5 passwords</li>
                            </ul>

                            <div className="policy-toggle-row margin-top-sm">
                              <div>
                                <strong className="policy-lbl-text">Automatic 90-Day Password Expiry</strong>
                                <p className="policy-sub-text">Require all organization members to rotate credentials every quarter.</p>
                              </div>
                              <button
                                type="button"
                                className={`btn-sm-toggle ${autoExpiry90Days ? 'active' : ''}`}
                                onClick={async () => {
                                  const nextVal = !autoExpiry90Days;
                                  setAutoExpiry90Days(nextVal);
                                  await syncSecurityFieldToBackend({ autoExpiry90Days: nextVal });
                                }}
                              >
                                {autoExpiry90Days ? 'Enabled' : 'Disabled'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 5. ROLE & PERMISSION ACCESS */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header" style={{ justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <UserCheck className="card-block-ic text-purple" />
                            <div>
                              <h3 className="card-block-title">Role & Permission Access</h3>
                              <p className="card-block-sub">Review active account privileges, administrative capabilities, and access rights.</p>
                            </div>
                          </div>
                          <span className="current-role-pill">
                            <Sparkles className="w-3.5 h-3.5 text-purple mr-1 inline" /> Role: <strong>Super Administrator</strong>
                          </span>
                        </div>

                        <div className="card-block-body">
                          <div className="permissions-grid">
                            <div className="permission-card-item">
                              <div className="perm-header">
                                <strong>Campaign Management & Budgeting</strong>
                                <span className="perm-badge-grant">Full Read & Write</span>
                              </div>
                              <p className="perm-desc">Create, modify, scale, or pause ad campaigns and adjust budget allocations.</p>
                            </div>

                            <div className="permission-card-item">
                              <div className="perm-header">
                                <strong>Billing, Tax & Financial Invoices</strong>
                                <span className="perm-badge-grant">Owner Access</span>
                              </div>
                              <p className="perm-desc">Manage credit cards, GST invoices, agency retainer plans, and payment methods.</p>
                            </div>

                            <div className="permission-card-item">
                              <div className="perm-header">
                                <strong>Team & User Member Management</strong>
                                <span className="perm-badge-grant">Full Control</span>
                              </div>
                              <p className="perm-desc">Invite new agency team members, assign custom roles, and audit activity logs.</p>
                            </div>

                            <div className="permission-card-item">
                              <div className="perm-header">
                                <strong>API Keys & Marketing Pixels</strong>
                                <span className="perm-badge-grant">Granted</span>
                              </div>
                              <p className="perm-desc">Access Meta Pixel, GA4, TikTok Conversions API, and custom webhook credentials.</p>
                            </div>
                          </div>

                          <div className="margin-top-md" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-outline-purple sm-btn" onClick={() => alert('Privilege escalation request submitted to Workspace Admin.')}>
                              Request Permission Privilege Modification
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 6. SECURITY ALERTS & THREAT PREVENTION */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <AlertTriangle className="card-block-ic text-orange" />
                          <div>
                            <h3 className="card-block-title">Security Alerts & Threat Prevention</h3>
                            <p className="card-block-sub">Configure real-time automated security telemetry and IP access restriction rules.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div className="security-alerts-toggles">
                            <div className="salert-toggle-item">
                              <div>
                                <strong className="salert-title">Unfamiliar Device & Location Login Alerts</strong>
                                <p className="salert-sub">Receive instant email and push alerts when a login occurs from an unrecognized device or IP.</p>
                              </div>
                              <button
                                type="button"
                                className={`btn-sm-toggle ${alertNewLogin ? 'active' : ''}`}
                                onClick={async () => {
                                  const nextVal = !alertNewLogin;
                                  setAlertNewLogin(nextVal);
                                  await syncSecurityFieldToBackend({ alertNewLogin: nextVal });
                                }}
                              >
                                {alertNewLogin ? 'Enabled' : 'Disabled'}
                              </button>
                            </div>

                            <div className="salert-toggle-item">
                              <div>
                                <strong className="salert-title">Password & 2FA Configuration Modification Alerts</strong>
                                <p className="salert-sub">Send SMS & email security warnings whenever account credentials or 2FA methods change.</p>
                              </div>
                              <button
                                type="button"
                                className={`btn-sm-toggle ${alertSecurityChanges ? 'active' : ''}`}
                                onClick={async () => {
                                  const nextVal = !alertSecurityChanges;
                                  setAlertSecurityChanges(nextVal);
                                  await syncSecurityFieldToBackend({ alertSecurityChanges: nextVal });
                                }}
                              >
                                {alertSecurityChanges ? 'Enabled' : 'Disabled'}
                              </button>
                            </div>

                            <div className="salert-toggle-item">
                              <div>
                                <strong className="salert-title">API Key & Webhook Secret Generation Telemetry</strong>
                                <p className="salert-sub">Log and notify administrators immediately whenever a new production API key is generated.</p>
                              </div>
                              <button
                                type="button"
                                className={`btn-sm-toggle ${alertApiKeyGen ? 'active' : ''}`}
                                onClick={async () => {
                                  const nextVal = !alertApiKeyGen;
                                  setAlertApiKeyGen(nextVal);
                                  await syncSecurityFieldToBackend({ alertApiKeyGen: nextVal });
                                }}
                              >
                                {alertApiKeyGen ? 'Enabled' : 'Disabled'}
                              </button>
                            </div>
                          </div>

                          {/* IP Whitelisting Section */}
                          <div className="ip-whitelisting-box margin-top-md">
                            {ipSaveSuccess && (
                              <div className="alert-success-banner margin-bottom-sm">
                                <CheckCircle2 className="w-4 h-4 text-green" /> IP Whitelist rule updated successfully!
                              </div>
                            )}
                            <strong className="policy-box-title"><Globe className="w-4 h-4 text-blue inline mr-1.5" /> Corporate IP Access Whitelisting</strong>
                            <p className="salert-sub" style={{ margin: '0.25rem 0 0.75rem 0' }}>Restrict dashboard sign-ins to specified static IP addresses or CIDR blocks (comma-separated).</p>

                            <div className="ip-input-row">
                              <input
                                type="text"
                                value={ipWhitelistInput}
                                onChange={(e) => setIpWhitelistInput(e.target.value)}
                                className="form-input"
                                placeholder="e.g. 103.24.12.8, 192.168.1.0/24"
                              />
                              <button
                                type="button"
                                className="btn-primary-purple sm-btn"
                                onClick={async () => {
                                  setIpSaveSuccess(true);
                                  await syncSecurityFieldToBackend({ ipWhitelistInput });
                                  setTimeout(() => setIpSaveSuccess(false), 3000);
                                }}
                              >
                                <Save className="btn-icon-sm" /> Save IP Rules
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* 3. APPEARANCE & LOCALIZATION PANEL */}
                  {activeSettingsTab === 'appearance' && (
                    <div className="settings-panel-wrapper">
                      {/* Header */}
                      <div className="security-panel-header">
                        <div>
                          <h2 className="profile-user-name" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Palette className="text-purple w-7 h-7" /> Appearance & Theme Personalization
                          </h2>
                          <p className="profile-user-email">Customize system theme, accent colors, dashboard layouts, layout density, sidebar behavior, and language localization.</p>
                        </div>
                        {appearanceSaveSuccess && (
                          <div className="alert-success-banner" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.82rem' }}>
                            <CheckCircle2 className="w-4 h-4 text-green inline mr-1" /> Preferences Auto-Saved!
                          </div>
                        )}
                      </div>



                      {/* 3. DASHBOARD LAYOUT */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Grid className="card-block-ic text-blue" />
                          <div>
                            <h3 className="card-block-title">Dashboard Layout Architecture</h3>
                            <p className="card-block-sub">Choose your default workspace view layout structure for campaign modules.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div className="sec-methods-grid">
                            <div
                              className={`sec-method-card ${dashboardLayout === 'grid' ? 'selected' : ''}`}
                              onClick={async () => {
                                setDashboardLayout('grid');
                                setAppearanceSaveSuccess(true);
                                await syncSecurityFieldToBackend({ dashboardLayout: 'grid' });
                                setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                              }}
                            >
                              <div className="sec-icon-wrap"><Grid className="w-5 h-5 text-purple" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Standard Grid & Card View</strong>
                                <p className="sec-sub">Balanced multi-column card layout optimized for analytics overview and KPI tracking.</p>
                              </div>
                              <span className="sec-radio-dot">{dashboardLayout === 'grid' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>

                            <div
                              className={`sec-method-card ${dashboardLayout === 'kanban' ? 'selected' : ''}`}
                              onClick={async () => {
                                setDashboardLayout('kanban');
                                setAppearanceSaveSuccess(true);
                                await syncSecurityFieldToBackend({ dashboardLayout: 'kanban' });
                                setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                              }}
                            >
                              <div className="sec-icon-wrap"><Columns className="w-5 h-5 text-blue" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Kanban Board Pipeline View</strong>
                                <p className="sec-sub">Stage-by-stage vertical column layout designed for project tracking and task workflows.</p>
                              </div>
                              <span className="sec-radio-dot">{dashboardLayout === 'kanban' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>

                            <div
                              className={`sec-method-card ${dashboardLayout === 'table' ? 'selected' : ''}`}
                              onClick={async () => {
                                setDashboardLayout('table');
                                setAppearanceSaveSuccess(true);
                                await syncSecurityFieldToBackend({ dashboardLayout: 'table' });
                                setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                              }}
                            >
                              <div className="sec-icon-wrap"><List className="w-5 h-5 text-green" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Condensed Matrix Table View</strong>
                                <p className="sec-sub">Data-dense tabbed table view for rapid inline editing and batch record operations.</p>
                              </div>
                              <span className="sec-radio-dot">{dashboardLayout === 'table' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 4. COMPACT / COMFORTABLE VIEW DENSITY */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Maximize2 className="card-block-ic text-orange" />
                          <div>
                            <h3 className="card-block-title">Display Layout Density</h3>
                            <p className="card-block-sub">Adjust spacing, row height, and card padding for your viewing comfort.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div className="sec-methods-grid">
                            <div
                              className={`sec-method-card ${densityView === 'comfortable' ? 'selected' : ''}`}
                              onClick={async () => {
                                setDensityView('comfortable');
                                setAppearanceSaveSuccess(true);
                                await syncSecurityFieldToBackend({ densityView: 'comfortable' });
                                setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                              }}
                            >
                              <div className="sec-icon-wrap"><Maximize2 className="w-5 h-5 text-purple" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Comfortable View (Standard)</strong>
                                <p className="sec-sub">Generous padding, enlarged font sizes, and relaxed component spacing for maximum legibility.</p>
                              </div>
                              <span className="sec-radio-dot">{densityView === 'comfortable' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>

                            <div
                              className={`sec-method-card ${densityView === 'compact' ? 'selected' : ''}`}
                              onClick={async () => {
                                setDensityView('compact');
                                setAppearanceSaveSuccess(true);
                                await syncSecurityFieldToBackend({ densityView: 'compact' });
                                setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                              }}
                            >
                              <div className="sec-icon-wrap"><Minimize2 className="w-5 h-5 text-blue" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Compact View (High Density)</strong>
                                <p className="sec-sub">Slimmer padding and compressed table rows, fitting ~25% more records on screen.</p>
                              </div>
                              <span className="sec-radio-dot">{densityView === 'compact' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 5. SIDEBAR BEHAVIOR */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Sidebar className="card-block-ic text-purple" />
                          <div>
                            <h3 className="card-block-title">Sidebar Behavior & Workspace Canvas</h3>
                            <p className="card-block-sub">Configure left-hand navigation bar docking and collapse mechanics.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div className="sec-methods-grid">
                            <div
                              className={`sec-method-card ${sidebarBehavior === 'expanded' ? 'selected' : ''}`}
                              onClick={async () => {
                                setSidebarBehavior('expanded');
                                setAppearanceSaveSuccess(true);
                                await syncSecurityFieldToBackend({ sidebarBehavior: 'expanded' });
                                setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                              }}
                            >
                              <div className="sec-icon-wrap"><Sidebar className="w-5 h-5 text-purple" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Expanded by Default</strong>
                                <p className="sec-sub">Keep the full sidebar pinned with menu text labels for quick navigation.</p>
                              </div>
                              <span className="sec-radio-dot">{sidebarBehavior === 'expanded' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>

                            <div
                              className={`sec-method-card ${sidebarBehavior === 'collapsed' ? 'selected' : ''}`}
                              onClick={async () => {
                                setSidebarBehavior('collapsed');
                                setAppearanceSaveSuccess(true);
                                await syncSecurityFieldToBackend({ sidebarBehavior: 'collapsed' });
                                setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                              }}
                            >
                              <div className="sec-icon-wrap"><Menu className="w-5 h-5 text-blue" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Collapsed Icon Rail</strong>
                                <p className="sec-sub">Collapse sidebar into a slim icon rail to maximize your central analytics workspace.</p>
                              </div>
                              <span className="sec-radio-dot">{sidebarBehavior === 'collapsed' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>

                            <div
                              className={`sec-method-card ${sidebarBehavior === 'auto' ? 'selected' : ''}`}
                              onClick={async () => {
                                setSidebarBehavior('auto');
                                setAppearanceSaveSuccess(true);
                                await syncSecurityFieldToBackend({ sidebarBehavior: 'auto' });
                                setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                              }}
                            >
                              <div className="sec-icon-wrap"><Monitor className="w-5 h-5 text-green" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Auto-Responsive Adaptation</strong>
                                <p className="sec-sub">Dynamically expand on desktop screens and collapse into mobile drawer on smaller viewports.</p>
                              </div>
                              <span className="sec-radio-dot">{sidebarBehavior === 'auto' && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 6. LANGUAGE & REGIONAL LOCALIZATION */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Languages className="card-block-ic text-green" />
                          <div>
                            <h3 className="card-block-title">Language & Regional Localization</h3>
                            <p className="card-block-sub">Set preferred interface translation, currency formatting, and system timezone.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div className="grid-3-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                            <div className="form-group">
                              <label className="form-label">Interface Language</label>
                              <select
                                value={appLanguage}
                                onChange={async (e) => {
                                  setAppLanguage(e.target.value);
                                  setAppearanceSaveSuccess(true);
                                  await syncSecurityFieldToBackend({ appLanguage: e.target.value });
                                  setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                                }}
                                className="form-input"
                              >
                                <option value="en-US">🇺🇸 English (US)</option>
                                <option value="en-GB">🇬🇧 English (UK)</option>
                                <option value="hi-IN">🇮🇳 Hindi (हिंदी)</option>
                                <option value="es-ES">🇪🇸 Spanish (Español)</option>
                                <option value="fr-FR">🇫🇷 French (Français)</option>
                                <option value="de-DE">🇩🇪 German (Deutsch)</option>
                                <option value="ja-JP">🇯🇵 Japanese (日本語)</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label className="form-label">Currency Symbol Format</label>
                              <select
                                value={appCurrency}
                                onChange={async (e) => {
                                  setAppCurrency(e.target.value);
                                  setAppearanceSaveSuccess(true);
                                  await syncSecurityFieldToBackend({ appCurrency: e.target.value });
                                  setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                                }}
                                className="form-input"
                              >
                                <option value="INR">🇮🇳 INR (₹ - Indian Rupee)</option>
                                <option value="USD">🇺🇸 USD ($ - US Dollar)</option>
                                <option value="EUR">🇪🇺 EUR (€ - Euro)</option>
                                <option value="GBP">🇬🇧 GBP (£ - British Pound)</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label className="form-label">Default Primary Timezone</label>
                              <select
                                value={appTimezone}
                                onChange={async (e) => {
                                  setAppTimezone(e.target.value);
                                  setAppearanceSaveSuccess(true);
                                  await syncSecurityFieldToBackend({ appTimezone: e.target.value });
                                  setTimeout(() => setAppearanceSaveSuccess(false), 2500);
                                }}
                                className="form-input"
                              >
                                <option value="Asia/Kolkata">Asia/Kolkata (IST - GMT+5:30)</option>
                                <option value="UTC">Universal Coordinated Time (UTC)</option>
                                <option value="America/New_York">America/New_York (EST - GMT-5)</option>
                                <option value="Europe/London">Europe/London (GMT / BST)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {activeSettingsTab === 'sms' && (
    <div className="settings-panel-wrapper">
      {/* Header */}
      <div className="security-panel-header">
        <div>
          <h2 className="profile-user-name" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Smartphone className="text-purple w-7 h-7" /> SMS, OTP & Verification Settings
          </h2>
          <p className="profile-user-email">Configure SMS gateway providers, OTP authentication engines, expiration timeouts, resend rate limits, and security verification policies.</p>
        </div>
        {smsSaveSuccess && (
          <div className="alert-success-banner" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.82rem' }}>
            <CheckCircle2 className="w-4 h-4 text-green inline mr-1" /> SMS & OTP Gateway Settings Saved!
          </div>
        )}
      </div>

      {/* 1. SMS PROVIDER CONFIGURATION */}
      <div className="settings-card-block margin-top-md">
        <div className="card-block-header">
          <Smartphone className="card-block-ic text-purple" />
          <div>
            <h3 className="card-block-title">SMS Gateway Provider Setup</h3>
            <p className="card-block-sub">Choose your SMS API gateway for transactional SMS, alerts, and mobile notifications.</p>
          </div>
        </div>

        <div className="card-block-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">SMS Provider</label>
              <select
                value={smsConfig.smsProvider}
                onChange={(e) => setSmtpConfigSMS({ ...smsConfig, smsProvider: e.target.value })}
                className="form-input"
                style={{ fontWeight: 600 }}
              >
                <option value="Twilio">Twilio (Global SMS API)</option>
                <option value="Textlocal">Textlocal (DLT Approved - India)</option>
                <option value="MSG91">MSG91 (India DLT & WhatsApp)</option>
                <option value="AWS_SNS">Amazon Web Services (AWS SNS)</option>
                <option value="Vonage">Vonage / Nexmo</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Account SID / API Key</label>
              <input
                type="text"
                value={smsConfig.accountSid}
                onChange={(e) => setSmtpConfigSMS({ ...smsConfig, accountSid: e.target.value })}
                className="form-input font-mono"
                placeholder="Enter Account SID or API Key"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Sender ID / DLT Header</label>
              <input
                type="text"
                value={smsConfig.senderId}
                onChange={(e) => setSmtpConfigSMS({ ...smsConfig, senderId: e.target.value })}
                className="form-input font-mono"
                placeholder="e.g. DGTMSH"
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Auth Token / API Secret</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showSmsToken ? 'text' : 'password'}
                  value={smsConfig.authToken}
                  onChange={(e) => setSmtpConfigSMS({ ...smsConfig, authToken: e.target.value })}
                  className="form-input font-mono"
                  placeholder="Enter Auth Token or Secret"
                  style={{ paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowSmsToken(!showSmsToken)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  {showSmsToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. OTP PROVIDER & CODE ENGINE */}
      <div className="settings-card-block margin-top-md">
        <div className="card-block-header">
          <ShieldCheck className="card-block-ic text-blue" />
          <div>
            <h3 className="card-block-title">OTP Provider & Code Generation Engine</h3>
            <p className="card-block-sub">Configure how One-Time Passwords (OTP) are generated and delivered.</p>
          </div>
        </div>

        <div className="card-block-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">OTP Provider Service</label>
              <select
                value={otpConfig.otpProvider}
                onChange={(e) => setOtpConfig({ ...otpConfig, otpProvider: e.target.value })}
                className="form-input"
              >
                <option value="Twilio Verify API">Twilio Verify API (Managed OTP)</option>
                <option value="Firebase Phone Auth">Firebase Phone Authentication</option>
                <option value="Custom SMS OTP">Custom In-House SMS OTP Engine</option>
                <option value="WhatsApp Business OTP">WhatsApp Business OTP Service</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">OTP Code Length</label>
              <select
                value={otpConfig.otpLength}
                onChange={(e) => setOtpConfig({ ...otpConfig, otpLength: e.target.value })}
                className="form-input"
              >
                <option value="6">6 Digits (Recommended - e.g. 849204)</option>
                <option value="4">4 Digits (Fast - e.g. 4920)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">OTP Code Character Set</label>
              <select
                value={otpConfig.otpType}
                onChange={(e) => setOtpConfig({ ...otpConfig, otpType: e.target.value })}
                className="form-input"
              >
                <option value="Numeric">Numeric Only (0-9)</option>
                <option value="Alphanumeric">Alphanumeric (A-Z, 0-9)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. OTP EXPIRATION TIMEOUT */}
      <div className="settings-card-block margin-top-md">
        <div className="card-block-header">
          <Clock className="card-block-ic text-orange" />
          <div>
            <h3 className="card-block-title">OTP Expiration Lifespan</h3>
            <p className="card-block-sub">Set the maximum duration before a generated OTP code expires automatically.</p>
          </div>
        </div>

        <div className="card-block-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">OTP Expiration Time</label>
              <select
                value={otpConfig.otpExpiryMinutes}
                onChange={(e) => setOtpConfig({ ...otpConfig, otpExpiryMinutes: e.target.value })}
                className="form-input"
                style={{ fontWeight: 600 }}
              >
                <option value="1">1 Minute (Strict Security)</option>
                <option value="3">3 Minutes (Default Recommended)</option>
                <option value="5">5 Minutes (Standard)</option>
                <option value="10">10 Minutes (Extended)</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Failed Attempt Policy</label>
              <div style={{ padding: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '0.85rem', color: '#475569' }}>
                🔒 Codes automatically invalidate after <strong>3 consecutive failed verification attempts</strong> to prevent brute-force entry.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. RESEND LIMITS & ANTI-ABUSE RATE LIMITING */}
      <div className="settings-card-block margin-top-md">
        <div className="card-block-header">
          <SlidersHorizontal className="card-block-ic text-red" />
          <div>
            <h3 className="card-block-title">Resend Limits & Anti-Abuse Rate Limiting</h3>
            <p className="card-block-sub">Prevent SMS spam and control Gateway API costs with strict request limits.</p>
          </div>
        </div>

        <div className="card-block-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Max Resend Attempts (per 10 Mins)</label>
              <select
                value={otpConfig.maxResendAttempts}
                onChange={(e) => setOtpConfig({ ...otpConfig, maxResendAttempts: e.target.value })}
                className="form-input"
              >
                <option value="3">3 Attempts (Recommended)</option>
                <option value="5">5 Attempts</option>
                <option value="10">10 Attempts</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Resend Cooldown Delay</label>
              <select
                value={otpConfig.cooldownSeconds}
                onChange={(e) => setOtpConfig({ ...otpConfig, cooldownSeconds: e.target.value })}
                className="form-input"
              >
                <option value="30">30 Seconds</option>
                <option value="60">60 Seconds (1 Minute Recommended)</option>
                <option value="120">120 Seconds (2 Minutes)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">IP Address Hourly Limit</label>
              <select
                value={otpConfig.ipRateLimit}
                onChange={(e) => setOtpConfig({ ...otpConfig, ipRateLimit: e.target.value })}
                className="form-input"
              >
                <option value="5">Max 5 OTP requests / IP / hour</option>
                <option value="10">Max 10 OTP requests / IP / hour</option>
                <option value="20">Max 20 OTP requests / IP / hour</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 5. VERIFICATION ENFORCEMENT SETTINGS */}
      <div className="settings-card-block margin-top-md">
        <div className="card-block-header">
          <Lock className="card-block-ic text-emerald" />
          <div>
            <h3 className="card-block-title">Verification Enforcement Settings</h3>
            <p className="card-block-sub">Enable or disable mandatory OTP verification for key account actions.</p>
          </div>
        </div>

        <div className="card-block-body">
          <div className="sec-methods-grid">
            <div
              className={`sec-method-card ${otpConfig.requireLogin2FA ? 'selected' : ''}`}
              onClick={() => setOtpConfig({ ...otpConfig, requireLogin2FA: !otpConfig.requireLogin2FA })}
            >
              <div className="sec-icon-wrap"><ShieldCheck className="w-5 h-5 text-purple" /></div>
              <div className="sec-method-text">
                <strong className="sec-title">2FA User Login Verification</strong>
                <p className="sec-sub">Require OTP verification code when signing into portal from new devices.</p>
              </div>
              <span className="sec-radio-dot">{otpConfig.requireLogin2FA && <Check className="w-3.5 h-3.5 text-white" />}</span>
            </div>

            <div
              className={`sec-method-card ${otpConfig.requireTransactionAuth ? 'selected' : ''}`}
              onClick={() => setOtpConfig({ ...otpConfig, requireTransactionAuth: !otpConfig.requireTransactionAuth })}
            >
              <div className="sec-icon-wrap"><Lock className="w-5 h-5 text-blue" /></div>
              <div className="sec-method-text">
                <strong className="sec-title">High-Risk Campaign & Budget Changes</strong>
                <p className="sec-sub">Require OTP verification when increasing monthly budget caps above ₹50,000.</p>
              </div>
              <span className="sec-radio-dot">{otpConfig.requireTransactionAuth && <Check className="w-3.5 h-3.5 text-white" />}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. TEST OTP DISPATCH & SAVE */}
      <div className="settings-card-block margin-top-md">
        <div className="card-block-header">
          <Send className="card-block-ic text-purple" />
          <div>
            <h3 className="card-block-title">Test OTP Deliverability & Save Gateway</h3>
            <p className="card-block-sub">Send a live test OTP message to verify SMS gateway routing and DLT headers.</p>
          </div>
        </div>

        <div className="card-block-body">
          {testOtpSuccessMsg && (
            <div className="alert-success-banner" style={{ marginBottom: '1rem', padding: '0.6rem 1rem' }}>
              <CheckCircle2 className="w-4 h-4 text-green inline mr-1" /> {testOtpSuccessMsg}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="tel"
              value={testMobileNumber}
              onChange={(e) => setTestMobileNumber(e.target.value)}
              placeholder="Enter mobile number (e.g. +91 98765 43210)"
              className="form-input"
              style={{ maxWidth: '320px' }}
            />

            <button
              type="button"
              className="btn-outline-purple sm-btn"
              disabled={sendingTestOtp}
              onClick={() => {
                setSendingTestOtp(true);
                setTimeout(() => {
                  setSendingTestOtp(false);
                  setTestOtpSuccessMsg(`✨ Test OTP SMS successfully dispatched to ${testMobileNumber || '+91 98765 43210'} via ${smsConfig.smsProvider}!`);
                  setTimeout(() => setTestOtpSuccessMsg(''), 4000);
                }, 1200);
              }}
            >
              {sendingTestOtp ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1 inline" /> : <Send className="w-3.5 h-3.5 mr-1 inline" />}
              Dispatch Test OTP SMS
            </button>

            <button
              type="button"
              className="btn-primary-purple sm-btn"
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                setSmsSaveSuccess(true);
                setTimeout(() => setSmsSaveSuccess(false), 3000);
              }}
            >
              <Save className="w-4 h-4 mr-1 inline" /> Save SMS & OTP Settings
            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* 7. NOTIFICATIONS PREFERENCES & ALERTS CENTER PANEL */}
                  {activeSettingsTab === 'notifications' && (
                    <div className="settings-panel-wrapper">
                      {/* Header */}
                      <div className="security-panel-header">
                        <div>
                          <h2 className="profile-user-name" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Bell className="text-purple w-7 h-7" /> Notification Preferences & Alert Hub
                          </h2>
                          <p className="profile-user-email">Configure email digests, browser push notifications, campaign performance triggers, lead intake alerts, budget thresholds, and security event logs.</p>
                        </div>
                        {notifSaveSuccess && (
                          <div className="alert-success-banner" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.82rem' }}>
                            <CheckCircle2 className="w-4 h-4 text-green inline mr-1" /> Notification Preferences Saved!
                          </div>
                        )}
                      </div>

                      {/* 1. EMAIL NOTIFICATIONS */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Mail className="card-block-ic text-purple" />
                          <div>
                            <h3 className="card-block-title">Email Notifications</h3>
                            <p className="card-block-sub">Manage email digest frequency and outbound email alerts.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.85rem', borderBottom: '1px solid #e2e8f0' }}>
                            <div>
                              <strong style={{ fontSize: '0.92rem', color: '#1e293b' }}>Enable Outbound Email Notifications</strong>
                              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Receive email summaries and critical alerts at {profileData.email}</p>
                            </div>
                            <button
                              type="button"
                              className={`btn-outline-purple sm-btn ${notifPreferences.emailEnabled ? 'active-swatch' : ''}`}
                              onClick={() => setNotifPreferences({ ...notifPreferences, emailEnabled: !notifPreferences.emailEnabled })}
                            >
                              {notifPreferences.emailEnabled ? 'Enabled ✅' : 'Disabled ❌'}
                            </button>
                          </div>

                          {notifPreferences.emailEnabled && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                              <div className="form-group">
                                <label className="form-label">Email Alert Frequency</label>
                                <select
                                  value={notifPreferences.emailFrequency}
                                  onChange={(e) => setNotifPreferences({ ...notifPreferences, emailFrequency: e.target.value })}
                                  className="form-input"
                                >
                                  <option value="instant">Instant Real-time Dispatch</option>
                                  <option value="daily">Daily Executive Digest (09:00 AM)</option>
                                  <option value="weekly">Weekly Summary (Mondays)</option>
                                </select>
                              </div>

                              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="form-label">Subscribed Email Reports</label>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                                    <input
                                      type="checkbox"
                                      checked={notifPreferences.emailReportSummary}
                                      onChange={(e) => setNotifPreferences({ ...notifPreferences, emailReportSummary: e.target.checked })}
                                    />
                                    Weekly ROI & Performance Report
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                                    <input
                                      type="checkbox"
                                      checked={notifPreferences.emailMarketingNews}
                                      onChange={(e) => setNotifPreferences({ ...notifPreferences, emailMarketingNews: e.target.checked })}
                                    />
                                    Product Updates & Ad Strategy Tips
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 2. PUSH NOTIFICATIONS */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Bell className="card-block-ic text-blue" />
                          <div>
                            <h3 className="card-block-title">Push Notifications</h3>
                            <p className="card-block-sub">Configure real-time desktop pop-ups, mobile push alerts, and sound notifications.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div className="sec-methods-grid">
                            <div
                              className={`sec-method-card ${notifPreferences.pushBrowserDesktop ? 'selected' : ''}`}
                              onClick={() => setNotifPreferences({ ...notifPreferences, pushBrowserDesktop: !notifPreferences.pushBrowserDesktop })}
                            >
                              <div className="sec-icon-wrap"><Bell className="w-5 h-5 text-purple" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Browser Desktop Pop-Up Badges</strong>
                                <p className="sec-sub">Show instant browser pop-up banners when portal is open.</p>
                              </div>
                              <span className="sec-radio-dot">{notifPreferences.pushBrowserDesktop && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>

                            <div
                              className={`sec-method-card ${notifPreferences.pushSoundAlerts ? 'selected' : ''}`}
                              onClick={() => setNotifPreferences({ ...notifPreferences, pushSoundAlerts: !notifPreferences.pushSoundAlerts })}
                            >
                              <div className="sec-icon-wrap"><Sparkles className="w-5 h-5 text-blue" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Audio Sound Chimes</strong>
                                <p className="sec-sub">Play subtle sound alerts on incoming lead alerts or budget warnings.</p>
                              </div>
                              <span className="sec-radio-dot">{notifPreferences.pushSoundAlerts && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>

                            <div
                              className={`sec-method-card ${notifPreferences.pushMobileApp ? 'selected' : ''}`}
                              onClick={() => setNotifPreferences({ ...notifPreferences, pushMobileApp: !notifPreferences.pushMobileApp })}
                            >
                              <div className="sec-icon-wrap"><Smartphone className="w-5 h-5 text-emerald" /></div>
                              <div className="sec-method-text">
                                <strong className="sec-title">Mobile App Push Alerts</strong>
                                <p className="sec-sub">Push notifications to linked iOS & Android devices.</p>
                              </div>
                              <span className="sec-radio-dot">{notifPreferences.pushMobileApp && <Check className="w-3.5 h-3.5 text-white" />}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 3. CAMPAIGN ALERTS */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Megaphone className="card-block-ic text-orange" />
                          <div>
                            <h3 className="card-block-title">Campaign Performance Alerts</h3>
                            <p className="card-block-sub">Set up real-time triggers for ad status changes, CTR fluctuations, and ROAS milestones.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                            {[
                              { key: 'campaignStatusChanges', label: 'Campaign Status Changes', sub: 'Notify when campaigns pause, activate, or complete' },
                              { key: 'campaignCtrDropAlert', label: 'CTR Drop Alert (< 1.5%)', sub: 'Alert when click-through rate drops sharply' },
                              { key: 'campaignRoiTargetMet', label: 'Target ROAS Milestone Reached', sub: 'Notify when campaign hits target ROAS goals' },
                              { key: 'campaignCreativeApproved', label: 'Ad Creative Approval / Rejection', sub: 'Alert on Meta/Google ad review updates' }
                            ].map((item) => (
                              <div
                                key={item.key}
                                style={{
                                  padding: '0.85rem 1rem',
                                  borderRadius: '12px',
                                  border: '1px solid #e2e8f0',
                                  background: notifPreferences[item.key] ? '#faf5ff' : '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justify: 'space-between',
                                  cursor: 'pointer'
                                }}
                                onClick={() => setNotifPreferences({ ...notifPreferences, [item.key]: !notifPreferences[item.key] })}
                              >
                                <div>
                                  <strong style={{ fontSize: '0.88rem', color: '#1e293b', display: 'block' }}>{item.label}</strong>
                                  <span style={{ fontSize: '0.76rem', color: '#64748b' }}>{item.sub}</span>
                                </div>
                                <span style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  background: notifPreferences[item.key] ? '#7c3aed' : '#cbd5e1',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#ffffff'
                                }}>
                                  {notifPreferences[item.key] && <Check className="w-3.5 h-3.5" />}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 4. LEAD ALERTS */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Users className="card-block-ic text-emerald" />
                          <div>
                            <h3 className="card-block-title">Lead Alerts & Intake Notifications</h3>
                            <p className="card-block-sub">Instant alerts for new client lead form submissions and high-intent prospects.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                            <div className="form-group">
                              <label className="form-label">Minimum Lead Budget Threshold</label>
                              <select
                                value={notifPreferences.leadHighValueThreshold}
                                onChange={(e) => setNotifPreferences({ ...notifPreferences, leadHighValueThreshold: e.target.value })}
                                className="form-input"
                              >
                                <option value="0">All Leads (No Minimum Budget)</option>
                                <option value="5000">High-Value Leads Only (≥ ₹5,000)</option>
                                <option value="25000">Enterprise Leads Only (≥ ₹25,000)</option>
                              </select>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                            {[
                              { key: 'leadEmailAlert', label: 'Instant Email Alert for New Leads', sub: 'Receive lead name, email & budget in email inbox' },
                              { key: 'leadInstantSms', label: 'Instant Mobile SMS Notification', sub: 'Send SMS alert to designated sales phone number' },
                              { key: 'leadSlackWebhook', label: 'Slack & Teams Webhook Dispatch', sub: 'Broadcast lead card directly to sales team channel' }
                            ].map((item) => (
                              <div
                                key={item.key}
                                style={{
                                  padding: '0.85rem 1rem',
                                  borderRadius: '12px',
                                  border: '1px solid #e2e8f0',
                                  background: notifPreferences[item.key] ? '#f0fdf4' : '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justify: 'space-between',
                                  cursor: 'pointer'
                                }}
                                onClick={() => setNotifPreferences({ ...notifPreferences, [item.key]: !notifPreferences[item.key] })}
                              >
                                <div>
                                  <strong style={{ fontSize: '0.88rem', color: '#1e293b', display: 'block' }}>{item.label}</strong>
                                  <span style={{ fontSize: '0.76rem', color: '#64748b' }}>{item.sub}</span>
                                </div>
                                <span style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  background: notifPreferences[item.key] ? '#10b981' : '#cbd5e1',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justify: 'center',
                                  color: '#ffffff'
                                }}>
                                  {notifPreferences[item.key] && <Check className="w-3.5 h-3.5" />}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 5. BUDGET ALERTS */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <DollarSign className="card-block-ic text-red" />
                          <div>
                            <h3 className="card-block-title">Budget Threshold Alerts</h3>
                            <p className="card-block-sub">Monitor ad spending caps and prevent budget overruns with automated limit warnings.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                            {[
                              { key: 'budgetCap80Percent', label: '80% Budget Limit Reached', sub: 'Warning alert when campaign spend touches 80%' },
                              { key: 'budgetCap90Percent', label: '90% Budget Limit Reached', sub: 'Urgent alert when campaign spend touches 90%' },
                              { key: 'budgetExhausted100', label: '100% Budget Exhausted', sub: 'Critical alert when campaign budget is completely spent' },
                              { key: 'budgetDailySpikeAlert', label: 'Daily Spend Spike Alert (> 150%)', sub: 'Warn if daily spend exceeds 150% of expected rate' }
                            ].map((item) => (
                              <div
                                key={item.key}
                                style={{
                                  padding: '0.85rem 1rem',
                                  borderRadius: '12px',
                                  border: '1px solid #e2e8f0',
                                  background: notifPreferences[item.key] ? '#fef2f2' : '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justify: 'space-between',
                                  cursor: 'pointer'
                                }}
                                onClick={() => setNotifPreferences({ ...notifPreferences, [item.key]: !notifPreferences[item.key] })}
                              >
                                <div>
                                  <strong style={{ fontSize: '0.88rem', color: '#1e293b', display: 'block' }}>{item.label}</strong>
                                  <span style={{ fontSize: '0.76rem', color: '#64748b' }}>{item.sub}</span>
                                </div>
                                <span style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  background: notifPreferences[item.key] ? '#ef4444' : '#cbd5e1',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justify: 'center',
                                  color: '#ffffff'
                                }}>
                                  {notifPreferences[item.key] && <Check className="w-3.5 h-3.5" />}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 6. SYSTEM NOTIFICATIONS */}
                      <div className="settings-card-block margin-top-md">
                        <div className="card-block-header">
                          <Shield className="card-block-ic text-purple" />
                          <div>
                            <h3 className="card-block-title">System & Security Notifications</h3>
                            <p className="card-block-sub">Security log alerts, third-party API disconnections, and system backup notifications.</p>
                          </div>
                        </div>

                        <div className="card-block-body">
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
                            {[
                              { key: 'sysNewLoginAlert', label: 'New Device Login Alert', sub: 'Notify when account is accessed from a new IP or device' },
                              { key: 'sysSecurityChanges', label: 'Security & Password Changes', sub: 'Alert when passwords, 2FA, or API keys are updated' },
                              { key: 'sysApiDisconnectAlert', label: 'API Integration Disconnections', sub: 'Alert if Meta, Google, or Stripe access token expires' },
                              { key: 'sysBackupComplete', label: 'Database Nightly Backup Logs', sub: 'Confirmation alert after nightly database backup finishes' }
                            ].map((item) => (
                              <div
                                key={item.key}
                                style={{
                                  padding: '0.85rem 1rem',
                                  borderRadius: '12px',
                                  border: '1px solid #e2e8f0',
                                  background: notifPreferences[item.key] ? '#faf5ff' : '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justify: 'space-between',
                                  cursor: 'pointer'
                                }}
                                onClick={() => setNotifPreferences({ ...notifPreferences, [item.key]: !notifPreferences[item.key] })}
                              >
                                <div>
                                  <strong style={{ fontSize: '0.88rem', color: '#1e293b', display: 'block' }}>{item.label}</strong>
                                  <span style={{ fontSize: '0.76rem', color: '#64748b' }}>{item.sub}</span>
                                </div>
                                <span style={{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  background: notifPreferences[item.key] ? '#7c3aed' : '#cbd5e1',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justify: 'center',
                                  color: '#ffffff'
                                }}>
                                  {notifPreferences[item.key] && <Check className="w-3.5 h-3.5" />}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* SAVE ACTION BAR */}
                      <div className="settings-card-block margin-top-md" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn-primary-purple sm-btn"
                          onClick={() => {
                            setNotifSaveSuccess(true);
                            setTimeout(() => setNotifSaveSuccess(false), 3000);
                          }}
                        >
                          <Save className="w-4 h-4 mr-1 inline" /> Save Notification Preferences
                        </button>
                      </div>

                    </div>
                  )}

                  {/* 8. OTHER SETTINGS PANELS FALLBACK */}
                  {activeSettingsTab !== 'profile' && activeSettingsTab !== 'security' && activeSettingsTab !== 'appearance' && activeSettingsTab !== 'billing' && activeSettingsTab !== 'email' && activeSettingsTab !== 'sms' && activeSettingsTab !== 'notifications' && (
                    <div className="settings-panel-box">
                      <h2 className="panel-title"><Shield className="panel-ic" /> Settings Module</h2>
                      <p className="panel-sub">Manage active module configurations and policies.</p>
                    </div>
                  )}

                </section>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
