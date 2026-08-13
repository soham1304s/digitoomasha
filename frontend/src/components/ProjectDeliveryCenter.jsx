import React, { useState, useMemo, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { apiFetch, SOCKET_SERVER_URL } from '../config/api';
import {
  FolderKanban,
  Plus,
  Search,
  Grid,
  List,
  ExternalLink,
  Github,
  BookOpen,
  Eye,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  Code2,
  Sparkles,
  Layers,
  FileText,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Terminal,
  Download,
  Copy,
  Check,
  Smartphone,
  Globe,
  Rocket,
  ShieldCheck,
  Zap,
  Star,
  Users,
  Server,
  Database,
  Cpu,
  AlertTriangle,
  Lock,
  ShoppingBag,
  Building2,
  Activity,
  Ticket,
  Bot,
  Shield,
  CheckCircle,
  Calendar,
  ArrowUpRight,
  Palette
} from 'lucide-react';

export default function ProjectDeliveryCenter({ hideWebsiteTemplates = false, hideTemplates = false, hideHeaderCard = false }) {
  // Initial 6 Enterprise Website & App Templates
  const defaultTemplates = [
    {
      id: 'tpl-1',
      title: 'E-Commerce & Digital Storefront System',
      category: 'Full-Stack Systems',
      industry: 'Retail & E-Commerce',
      rating: 4.9,
      downloads: '1,840+',
      status: 'Featured',
      statusType: 'live',
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67daf847e3?auto=format&fit=crop&w=800&q=80',
      description: 'Full-stack enterprise e-commerce platform with Next.js 14 storefront, Stripe payments, real-time inventory tracking, and iOS/Android shopping app built in React Native.',
      techStack: ['Next.js 14', 'React Native', 'Node.js', 'PostgreSQL', 'Stripe API', 'Cloudinary'],
      features: [
        'Multi-currency Stripe & PayPal Checkout',
        'React Native iOS/Android Customer Shopping App',
        'Real-time Inventory Telemetry & Order Webhooks',
        'AI Product Recommendation Engine',
        'Customer Reviews & Rating System',
        'Order Tracking & Shipping Status API'
      ],
      architecture: 'Microservices architecture with REST & GraphQL APIs, Redis caching layer, and CDN-backed media delivery.',
      readmeContent: [
        '# E-Commerce & Digital Storefront System',
        '',
        'A production-ready e-commerce solution designed for modern direct-to-consumer (DTC) brands and enterprise retail platforms.',
        '',
        '## Quick Start Guide',
        '',
        '1. Clone repository: git clone https://github.com/agency-erp/ecommerce-storefront-app.git',
        '2. Install web & mobile dependencies: npm install && cd mobile && npm install',
        '3. Configure environment variables: cp .env.example .env.local',
        '4. Start development server: npm run dev',
        '',
        '## Core Architecture & Modules',
        '- Web Storefront: Built on Next.js 14 App Router, Server Components, and Tailwind CSS.',
        '- Mobile Application: Cross-platform React Native app with Expo & NativeWind.',
        '- Payment Processing: Multi-currency Stripe Checkout with Webhooks integration.',
        '- Database Schema: PostgreSQL with Prisma ORM for products, carts, and customer accounts.'
      ].join('\n')
    },
    {
      id: 'tpl-2',
      title: 'SaaS & Enterprise B2B Cloud Platform',
      category: 'Full-Stack Systems',
      industry: 'Software & Technology',
      rating: 4.95,
      downloads: '2,150+',
      status: 'Enterprise Ready',
      statusType: 'dev',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      description: 'SaaS boilerplate featuring tiered subscription management, interactive usage telemetry dashboard, OAuth team workspaces, and dark/light mode UI theme system.',
      techStack: ['React/Vite', 'Express.js', 'PostgreSQL', 'TypeScript', 'Stripe Billing', 'Recharts'],
      features: [
        'Tiered Monthly/Annual Billing via Stripe Billing',
        'Team Workspace & Role-Based Access Control (RBAC)',
        'Live Telemetry & Usage Analytics Dashboard',
        'API Key Management & Webhook Delivery Engine',
        'User Onboarding & Interactive Sandbox Modal',
        'Dark/Light Mode Modern Glassmorphism UI'
      ],
      architecture: 'Decoupled Vite SPA frontend with Node.js/Express API Gateway and PostgreSQL database.',
      readmeContent: [
        '# SaaS & Enterprise B2B Cloud Platform',
        '',
        'Enterprise SaaS template engineered to accelerate B2B product launches with built-in subscription management and team analytics.',
        '',
        '## Quick Start Guide',
        '',
        '1. Clone repository: git clone https://github.com/agency-erp/saas-cloud-platform.git',
        '2. Install dependencies: npm install',
        '3. Configure Postgres & Stripe envs: cp .env.example .env',
        '4. Launch app: npm run dev',
        '',
        '## Security & Access Features',
        '- JWT & OAuth Auth: Google, GitHub, and SAML SSO integration.',
        '- RBAC Matrix: Admin, Manager, Editor, and Viewer permissions.',
        '- Audit Logs: Immutable activity logging for compliance monitoring.'
      ].join('\n')
    },
    {
      id: 'tpl-3',
      title: 'Corporate Agency & Professional Services Hub',
      category: 'Website Templates',
      industry: 'Digital Agency',
      rating: 4.88,
      downloads: '1,420+',
      status: 'Popular',
      statusType: 'review',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      description: 'Modern agency website with filterable dynamic case study showcase, dynamic proposal calculator, client deliverable portal, and native mobile booking app.',
      techStack: ['React', 'Framer Motion', 'Node.js', 'MongoDB', 'WebSockets', 'Tailwind'],
      features: [
        'Interactive Project Showcase & Dynamic Case Studies',
        'Real-time Service Quote & ROI Estimator Calculator',
        'Client Project Deliverables & Approval Portal',
        'Team Availability Calendar & Slot Booking Engine',
        'Client Video Testimonials Carousel',
        'Push Notifications for Project Milestone Updates'
      ],
      architecture: 'Jamstack web deployment coupled with Node.js micro-backend for client portal authentication.',
      readmeContent: [
        '# Corporate Agency & Professional Services Hub',
        '',
        'The definitive digital agency web portal and client operations management template.',
        '',
        '## Setup Instructions',
        '',
        '1. Environment configuration: npm install',
        '2. Seed project showcase data: npm run seed:projects',
        '3. Run production build preview: npm run build && npm run start',
        '',
        '## Key System Highlights',
        '- Smooth micro-animations powered by Framer Motion.',
        '- Client Portal with document signature and milestone sign-off.'
      ].join('\n')
    },
    {
      id: 'tpl-4',
      title: 'Healthcare, Telemedicine & Wellness Portal',
      category: 'Mobile App Templates',
      industry: 'Healthcare & Biotech',
      rating: 4.92,
      downloads: '980+',
      status: 'HIPAA Ready',
      statusType: 'live',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      description: 'HIPAA-compliant telehealth platform with online doctor appointment scheduling, WebRTC live video consultation room, and React Native patient medical record app.',
      techStack: ['React', 'React Native', 'WebRTC', 'Express.js', 'PostgreSQL', 'Socket.io'],
      features: [
        'WebRTC Encrypted Live HD Video Consultation',
        'Doctor Appointment Calendar & Scheduling Engine',
        'React Native Patient iOS/Android EHR Portal',
        'Digital Prescription Generator & Refill Requests',
        'Daily Health & Habit Telemetry Tracker Gauges',
        'HIPAA-Compliant Encrypted Medical Data Forms'
      ],
      architecture: 'Encrypted WebRTC peer-to-peer streaming with Node.js signaling server and encrypted database storage.',
      readmeContent: [
        '# Healthcare & Telemedicine Portal',
        '',
        'Comprehensive telemedicine web and mobile application suite built with HIPAA compliance standards.',
        '',
        '## Quick Start Guide',
        '',
        '1. Launch signaling server & web app: npm run start:signaling && npm run dev',
        '2. Launch Patient Mobile App (React Native): cd patient-app && npx react-native run-ios'
      ].join('\n')
    },
    {
      id: 'tpl-5',
      title: 'On-Demand Food Delivery & Kitchen POS System',
      category: 'Full-Stack Systems',
      industry: 'Food & Hospitality',
      rating: 4.87,
      downloads: '1,310+',
      status: 'Hot',
      statusType: 'dev',
      thumbnail: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
      description: 'End-to-end food marketplace ecosystem: interactive online web ordering, Restaurant Kitchen Display System (KDS), and iOS/Android driver GPS delivery app.',
      techStack: ['React', 'React Native', 'Node.js', 'Socket.io', 'Google Maps API', 'PostgreSQL'],
      features: [
        'Interactive Food Menu with Item Modifiers & Customizers',
        'GPS Real-time Driver & Order Tracking Map Telemetry',
        'Restaurant POS Kitchen Order Display System (KDS)',
        'Coupon Code & Customer Loyalty Points Engine',
        'Driver Fleet App with Route Optimization',
        'Automated SMS & Push Notification Alerts'
      ],
      architecture: 'Real-time WebSocket event bus with dual React Native mobile apps for customers and delivery drivers.',
      readmeContent: [
        '# On-Demand Food Delivery & Kitchen POS System',
        '',
        'All-in-one web ordering, kitchen operations, and delivery fleet tracking system.',
        '',
        '## Quick Start Guide',
        '',
        '1. Install & configure Google Maps API key: npm install',
        '2. Run web customer ordering app: npm run dev:customer',
        '3. Run Kitchen POS Display panel: npm run dev:kitchen'
      ].join('\n')
    },
    {
      id: 'tpl-6',
      title: 'EdTech, Course Academy & Learning Portal',
      category: 'Website Templates',
      industry: 'Education & E-Learning',
      rating: 4.94,
      downloads: '1,650+',
      status: 'Pro',
      statusType: 'review',
      thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
      description: 'Comprehensive e-learning portal with HLS video player, chapter progress tracking, interactive quizzes, automated certificate generation, and mobile student app.',
      techStack: ['Next.js', 'React Native', 'HLS Streaming', 'PostgreSQL', 'Canvas PDF', 'Node.js'],
      features: [
        'Adaptive HLS Video Streaming Player with Speed Controls',
        'Interactive Chapter Quizzes & Auto-Grading System',
        'Automatic Verified PDF Certificate Generation',
        'Live Student Q&A Forum & Instructor Notes',
        'Offline Video Download Mode on Mobile App',
        'Student Engagement & Course Completion Telemetry'
      ],
      architecture: 'CDN-accelerated HLS video delivery with Next.js web portal and React Native mobile learner app.',
      readmeContent: [
        '# EdTech, Course Academy & Learning Portal',
        '',
        'Scalable online course management and video streaming application for academies and tutors.',
        '',
        '## Quick Start Guide',
        '',
        '1. Install dependencies: npm install',
        '2. Build PDF certificate generator engine: npm run build:certificates',
        '3. Start local development server: npm run dev'
      ].join('\n')
    },
    {
      id: 'tpl-7',
      title: 'Real Estate & Virtual Property Showcase',
      category: 'Website Templates',
      industry: 'Real Estate & PropTech',
      rating: 4.91,
      downloads: '1,120+',
      status: 'Featured',
      statusType: 'live',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      description: 'Luxury real estate portal with 3D virtual Matterport tours, mortgage loan calculator, agent scheduling calendar, and native iOS/Android buyer app.',
      techStack: ['Next.js 14', 'React Native', 'Three.js', 'PostgreSQL', 'Mapbox API', 'Node.js'],
      features: [
        '3D Interactive Virtual Property Tour Player',
        'Mapbox Geolocation & Neighborhood School Telemetry',
        'Real-time Mortgage & Amortization Calculator',
        'Agent Inspection Slot Scheduling Engine',
        'Saved Favorites & Price Change Push Alerts',
        'Document Signing & Offer Submission Portal'
      ],
      architecture: 'SSR Next.js web portal with Three.js webGL renderer and React Native mobile property scanner app.',
      readmeContent: [
        '# Real Estate & Virtual Property Showcase',
        '',
        'High-converting PropTech portal designed for real estate agencies and property developers.',
        '',
        '## Quick Start Guide',
        '',
        '1. Configure Mapbox API Token: cp .env.example .env.local',
        '2. Install dependencies: npm install',
        '3. Start dev server: npm run dev'
      ].join('\n')
    },
    {
      id: 'tpl-8',
      title: 'Fintech, Banking & Crypto Trading Hub',
      category: 'Full-Stack Systems',
      industry: 'Finance & Banking',
      rating: 4.96,
      downloads: '2,400+',
      status: 'Enterprise Ready',
      statusType: 'dev',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
      description: 'High-frequency banking and trading dashboard with real-time WebSocket ticker charts, multi-currency wallets, KYC verification flow, and iOS/Android app.',
      techStack: ['React/Vite', 'React Native', 'WebSockets', 'Tailwind', 'Chart.js', 'Express.js'],
      features: [
        'Live Low-Latency WebSocket Market Ticker Feed',
        'Multi-Currency Fiat & Crypto Wallet Telemetry',
        'KYC Identity Document Scanner & Verification Flow',
        'Automated Recurring Investment & DCA Engine',
        'Biometric Auth (FaceID / Fingerprint) Support',
        'Regulatory Compliance Audit Logs & Tax Reports'
      ],
      architecture: 'WebSocket event bus backend connected to reactive Chart.js canvas render engine.',
      readmeContent: [
        '# Fintech, Banking & Crypto Trading Hub',
        '',
        'Institutional grade financial dashboard and mobile banking application suite.',
        '',
        '## Quick Start Guide',
        '',
        '1. Spin up Redis WebSocket server: docker-compose up -d redis',
        '2. Run trading web dashboard: npm run dev:dashboard'
      ].join('\n')
    },
    {
      id: 'tpl-9',
      title: 'AI Content Studio & Generative LLM Suite',
      category: 'Full-Stack Systems',
      industry: 'Artificial Intelligence',
      rating: 4.98,
      downloads: '3,100+',
      status: 'Hot',
      statusType: 'live',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
      description: 'Generative AI content platform featuring multi-modal prompt playground, streaming LLM chat completion, DALL-E image studio, and credit token billing system.',
      techStack: ['Next.js 14', 'OpenAI API', 'Claude API', 'Tailwind', 'PostgreSQL', 'Stripe'],
      features: [
        'Streaming LLM Text Completion with Markdown Renderer',
        'Multi-modal Image & Vector Generation Studio',
        'Prompt Library & Team Sharing Workspace',
        'Credit Token Usage Telemetry & Auto-Topup',
        'Export to WordPress, PDF, Docx, and HTML',
        'Custom Fine-Tuned Model Integration API'
      ],
      architecture: 'Edge runtime serverless functions streaming tokens directly to Next.js client components.',
      readmeContent: [
        '# AI Content Studio & Generative LLM Suite',
        '',
        'Full-featured AI SaaS platform for copywriters, designers, and marketing agencies.',
        '',
        '## Quick Start Guide',
        '',
        '1. Set OPENAI_API_KEY in .env.local',
        '2. Install & run: npm install && npm run dev'
      ].join('\n')
    },
    {
      id: 'tpl-10',
      title: 'Social Media Network & Community Hub',
      category: 'Mobile App Templates',
      industry: 'Social Media & Gaming',
      rating: 4.89,
      downloads: '1,750+',
      status: 'Popular',
      statusType: 'review',
      thumbnail: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
      description: 'Engaging community portal with dynamic activity feeds, direct messaging, video stories player, custom group channels, and native iOS/Android mobile app.',
      techStack: ['React', 'React Native', 'Socket.io', 'Node.js', 'MongoDB', 'AWS S3'],
      features: [
        'Infinite Scroll Activity Feed with Post Interactions',
        'Real-time Encrypted Direct Chat & Group Channels',
        'Short-form Stories Video Player with Filters',
        'Gamified Badges & Member Level Progress Gauge',
        'Content Moderation & AI Spam Filtering Engine',
        'Native Push Notifications for Social Mentions'
      ],
      architecture: 'Event-driven Node.js backend with Socket.io real-time chat gateway and S3 media storage.',
      readmeContent: [
        '# Social Media Network & Community Hub',
        '',
        'Scalable social community platform for brands, creators, and online groups.',
        '',
        '## Quick Start Guide',
        '',
        '1. Run MongoDB & Socket server: npm run start:services',
        '2. Launch web feed app: npm run dev'
      ].join('\n')
    },
    {
      id: 'tpl-11',
      title: 'Logistics, Supply Chain & Fleet Telemetry',
      category: 'Full-Stack Systems',
      industry: 'Logistics & Transport',
      rating: 4.93,
      downloads: '1,490+',
      status: 'Enterprise Ready',
      statusType: 'dev',
      thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      description: 'Enterprise fleet dispatch control room with GPS live map tracking, automated route optimization, driver electronic logging (ELD), and shipment tracking app.',
      techStack: ['React/Vite', 'React Native', 'Leaflet.js', 'Express.js', 'PostgreSQL', 'Redis'],
      features: [
        'Live Vehicle Fleet GPS Telemetry Control Room Map',
        'AI Route Optimization & Fuel Consumption Calculator',
        'Electronic Logging Device (ELD) Compliance Tracker',
        'Digital Proof of Delivery (POD) Signature Capture',
        'Warehouse Inventory & Loading Dock Dispatcher',
        'Automated Geofence Crossing Alerts'
      ],
      architecture: 'High-throughput Redis Pub/Sub telemetry stream processing live vehicle GPS coordinates.',
      readmeContent: [
        '# Logistics, Supply Chain & Fleet Telemetry',
        '',
        'Complete transport logistics and fleet management software suite.',
        '',
        '## Quick Start Guide',
        '',
        '1. Start Redis coordinate broker: docker run -p 6379:6379 redis',
        '2. Start dispatch portal: npm run dev:dispatch'
      ].join('\n')
    },
    {
      id: 'tpl-12',
      title: 'Event Ticketing & Live Concert Marketplace',
      category: 'Mobile App Templates',
      industry: 'Events & Entertainment',
      rating: 4.88,
      downloads: '1,280+',
      status: 'Pro',
      statusType: 'live',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      description: 'Interactive venue seat selection portal, dynamic pricing engine, Stripe payment gateway, and iOS/Android mobile app with offline QR ticket scanner.',
      techStack: ['Next.js 14', 'React Native', 'SVG Seat Engine', 'Stripe', 'Node.js', 'PostgreSQL'],
      features: [
        'Interactive SVG Venue Seat Map Selector Engine',
        'Dynamic Tiered Ticket Pricing & Countdown Timer',
        'Offline QR Code Ticket Pass Wallet App',
        'Organizer Venue Gate Scanner App (Camera QR)',
        'Event Promo Codes & Social Referral Rewards',
        'Payout Telemetry Dashboard for Event Hosts'
      ],
      architecture: 'Optimized SVG DOM renderer for interactive seat selection coupled with encrypted QR signing.',
      readmeContent: [
        '# Event Ticketing & Live Concert Marketplace',
        '',
        'End-to-end ticketing platform for festivals, concerts, and conferences.',
        '',
        '## Quick Start Guide',
        '',
        '1. Install dependencies: npm install',
        '2. Run ticketing web portal: npm run dev'
      ].join('\n')
    }
  ];

  // State Management
  const [templates, setTemplates] = useState(defaultTemplates);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplateInspect, setSelectedTemplateInspect] = useState(null);
  const [selectedTemplateWizard, setSelectedTemplateWizard] = useState(null);
  const [activeInspectTab, setActiveInspectTab] = useState('overview');
  const [isAddTemplateOpen, setIsAddTemplateOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const [clientTemplates, setClientTemplates] = useState([]);
  const [pendingTemplates, setPendingTemplates] = useState([]);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Full-Page Project Creation Studio State
  const [isCreateProjectMode, setIsCreateProjectMode] = useState(false);
  const [selectedStudioTpl, setSelectedStudioTpl] = useState(defaultTemplates[0]);

  // Describe Manually Custom Architecture Modal State
  const [isDescribeManuallyOpen, setIsDescribeManuallyOpen] = useState(false);
  const [customManualData, setCustomManualData] = useState({
    title: '',
    category: 'Custom Architecture',
    industry: 'Enterprise Technology',
    description: '',
    techStack: 'React, Node.js, PostgreSQL, OpenAI API',
    features: 'Custom User Authentication & Role Permissions\nReal-time Telemetry & Data Pipelines\nAutomated Email & Push Notifications'
  });

  // Start Project Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    projectName: '',
    clientName: '',
    targetDate: '2026-09-30',
    budget: '₹1,50,000',
    selectedTheme: 'Purple Indigo Enterprise',
    deployTarget: 'Vercel Edge Cloud'
  });
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provisionProgress, setProvisionProgress] = useState(0);

  // Step Validation State & Logic
  const [stepValidationError, setStepValidationError] = useState('');
  const [validationAttempted, setValidationAttempted] = useState(false);

  const validateStep = (stepIndex) => {
    if (stepIndex === 1) {
      if (!wizardData.projectName || !wizardData.projectName.trim()) {
        return { isValid: false, field: 'projectName', message: 'Project Title is required. Please enter a title before advancing.' };
      }
      if (!wizardData.clientName || !wizardData.clientName.trim()) {
        return { isValid: false, field: 'clientName', message: 'Client / Stakeholder Name is required. Please enter the client name.' };
      }
      if (!wizardData.targetDate) {
        return { isValid: false, field: 'targetDate', message: 'Target Delivery Milestone Date is required.' };
      }
    }

    if (stepIndex === 2) {
      if (isDescribeManuallyOpen) {
        if (!customManualData.title || !customManualData.title.trim()) {
          return { isValid: false, field: 'customTitle', message: 'Custom Project Name / Title is required in manual specification.' };
        }
        if (!customManualData.description || !customManualData.description.trim()) {
          return { isValid: false, field: 'customDesc', message: 'Detailed Scope & Requirements description is required.' };
        }
      } else {
        if (!selectedStudioTpl || !selectedStudioTpl.id) {
          return { isValid: false, field: 'template', message: 'Please select a base project architecture template or describe custom specifications before proceeding.' };
        }
      }
    }

    if (stepIndex === 3) {
      if (!wizardData.deployTarget) {
        return { isValid: false, field: 'deployTarget', message: 'Please select a Cloud Hosting Environment.' };
      }
      if (!wizardData.selectedTheme) {
        return { isValid: false, field: 'selectedTheme', message: 'Please select a UI Theme Preset.' };
      }
    }

    return { isValid: true, message: '' };
  };

  const handleNextStep = () => {
    const result = validateStep(wizardStep);
    if (!result.isValid) {
      setStepValidationError(result.message);
      setValidationAttempted(true);
      return;
    }
    if (wizardStep === 2 && isDescribeManuallyOpen) {
      const customTpl = {
        id: `custom-manual-${Date.now()}`,
        title: customManualData.title || 'Custom Architecture Blueprint',
        category: customManualData.category || 'Custom Architecture',
        industry: customManualData.industry || 'Tailored Specification',
        description: customManualData.description || 'Custom user-described architecture specification.',
        rating: 5.0,
        downloads: 'Custom',
        status: 'Custom Blueprint',
        statusType: 'ready',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        techStack: customManualData.techStack ? customManualData.techStack.split(',').map((s) => s.trim()) : ['React', 'Node.js', 'PostgreSQL'],
        features: customManualData.features ? customManualData.features.split('\n').filter(Boolean) : ['Custom Scope Specifications', 'Tailored API Contracts'],
        architecture: customManualData.description,
        readmeContent: `# ${customManualData.title || 'Custom Architecture Blueprint'}\n\n${customManualData.description}`
      };
      setSelectedStudioTpl(customTpl);
      setIsDescribeManuallyOpen(false);
    }
    setStepValidationError('');
    setValidationAttempted(false);
    setWizardStep((prev) => Math.min(prev + 1, 4));
  };

  const handleStepHeaderClick = (targetStep) => {
    if (targetStep <= wizardStep) {
      setStepValidationError('');
      setWizardStep(targetStep);
      return;
    }
    for (let s = 1; s < targetStep; s++) {
      const result = validateStep(s);
      if (!result.isValid) {
        setStepValidationError(`Cannot skip to Step ${targetStep} yet: ${result.message}`);
        setValidationAttempted(true);
        return;
      }
    }
    setStepValidationError('');
    setValidationAttempted(false);
    setWizardStep(targetStep);
  };

  // New Custom Template Form State
  const [newTplData, setNewTplData] = useState({
    title: '',
    category: 'Website & App',
    industry: 'Technology',
    description: '',
    techStack: 'React, Node.js, PostgreSQL',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  });

  // Filtered Templates Calculation
  const filteredTemplates = useMemo(() => {
    return (templates || []).filter((tpl) => {
      if (!tpl) return false;
      const techStackArr = Array.isArray(tpl.techStack)
        ? tpl.techStack
        : typeof tpl.techStack === 'string'
          ? tpl.techStack.split(',').map((s) => s.trim())
          : [];

      const categoryStr = tpl.category || '';
      if (hideWebsiteTemplates && (categoryStr === 'Website Templates' || categoryStr.toLowerCase().includes('website'))) {
        return false;
      }

      const matchCat =
        activeCategory === 'All'
          ? true
          : activeCategory === 'Website Templates'
            ? categoryStr === 'Website Templates' || categoryStr.toLowerCase().includes('website')
            : activeCategory === 'Mobile App Templates'
              ? categoryStr === 'Mobile App Templates' || categoryStr.toLowerCase().includes('app')
              : categoryStr === 'Full-Stack Systems' || categoryStr.toLowerCase().includes('dual') || categoryStr.toLowerCase().includes('system');

      const matchSearch =
        (tpl.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tpl.industry || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tpl.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        techStackArr.some((ts) => ts.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchSearch;
    });
  }, [templates, activeCategory, searchQuery, hideWebsiteTemplates]);

  // Displayed templates slice for Show More functionality
  const displayedTemplates = useMemo(() => {
    return showAllTemplates ? filteredTemplates : filteredTemplates.slice(0, 6);
  }, [filteredTemplates, showAllTemplates]);

  // Handle Copy README Code
  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Open Full-Page Creation Studio for Template or New Project
  const handleOpenWizard = (tpl) => {
    const baseTpl = tpl || templates[0] || defaultTemplates[0];
    setSelectedStudioTpl(baseTpl);
    setSelectedTemplateInspect(null);
    setIsCreateProjectMode(true);
    setWizardData((prev) => ({
      ...prev,
      projectName: prev.projectName || `${baseTpl.title.split(' ')[0]} Master Project`
    }));
    setWizardStep(1);
    setIsProvisioning(false);
    setProvisionProgress(0);
  };

  // Run Provisioning Simulation
  const handleRunProvisioning = () => {
    setIsProvisioning(true);
    setProvisionProgress(15);

    const timer1 = setTimeout(() => setProvisionProgress(45), 600);
    const timer2 = setTimeout(() => setProvisionProgress(80), 1300);
    const timer3 = setTimeout(() => {
      setProvisionProgress(100);
      setTimeout(() => {
        setIsProvisioning(false);
        alert(`Success! Project "${wizardData.projectName || 'New Project'}" has been successfully provisioned from template "${selectedStudioTpl.title}"!`);
        setIsCreateProjectMode(false);
        setSelectedTemplateWizard(null);
      }, 500);
    }, 2000);
  };

  // Handle Save Custom Manual Specifications
  const handleSaveCustomManualSpecs = (e) => {
    e.preventDefault();
    const customTpl = {
      id: `custom-manual-${Date.now()}`,
      title: customManualData.title || 'Custom Architecture Blueprint',
      category: customManualData.category || 'Custom Architecture',
      industry: customManualData.industry || 'Tailored Specification',
      description: customManualData.description || 'Custom user-described architecture specification.',
      rating: 5.0,
      downloads: 'Custom',
      status: 'Custom Blueprint',
      statusType: 'ready',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      techStack: customManualData.techStack ? customManualData.techStack.split(',').map((s) => s.trim()) : ['React', 'Node.js', 'PostgreSQL'],
      features: customManualData.features ? customManualData.features.split('\n').filter(Boolean) : ['Custom Scope Specifications', 'Tailored API Contracts'],
      architecture: customManualData.description,
      readmeContent: `# ${customManualData.title || 'Custom Architecture Blueprint'}\n\n${customManualData.description}`
    };

    setSelectedStudioTpl(customTpl);
    setIsDescribeManuallyOpen(false);
    setWizardStep(3);
  };

  const fetchClientTemplates = async () => {
    if (!isLoggedIn || !user) return;
    try {
      const clientRes = await apiFetch('/api/client/templates');
      if (clientRes && clientRes.success) {
        setClientTemplates(clientRes.templates || []);
      }
    } catch (err) {
      console.warn('Fetch client templates failed:', err);
    }
  };

  const fetchPendingTemplates = async () => {
    try {
      const res = await apiFetch('/api/templates/pending');
      if (res && res.success) {
        setPendingTemplates(res.templates || []);
      }
    } catch (err) {
      console.warn('Fetch pending templates failed:', err);
    }
  };

  const isAdminMode = user?.role === 'admin';

  useEffect(() => {
    fetchClientTemplates();
    if (user?.role === 'admin') {
      fetchPendingTemplates();
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
    });

    socket.on('client_template_submitted', (template) => {
      if (isAdminMode) {
        setPendingTemplates((prev) => [template, ...prev.filter((tpl) => tpl.id !== template.id)]);
      }
    });

    socket.on('client_template_approved', (template) => {
      if (isAdminMode) {
        setPendingTemplates((prev) => prev.filter((tpl) => tpl.id !== template.id));
      }
      if (!isAdminMode && isLoggedIn && user?.email && template.client_email?.toLowerCase() === user.email.toLowerCase()) {
        setClientTemplates((prev) => [template, ...prev.filter((tpl) => tpl.id !== template.id)]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [isAdminMode, isLoggedIn, user]);

  const handleSubmitCustomTemplateRequest = async (e) => {
    e.preventDefault();
    if (!isLoggedIn || !user) {
      setSubmissionMessage('You must be logged in as a client to submit custom templates.');
      return;
    }

    if (!newTplData.title.trim() || !newTplData.description.trim() || !newTplData.category.trim()) {
      setSubmissionMessage('Title, category, and description are required.');
      return;
    }

    setSubmissionLoading(true);
    try {
      const res = await apiFetch('/api/templates', {
        method: 'POST',
        body: JSON.stringify({
          title: newTplData.title,
          category: newTplData.category,
          industry: newTplData.industry,
          description: newTplData.description,
          techStack: newTplData.techStack.split(',').map((s) => s.trim()),
          thumbnail: newTplData.thumbnail,
          clientEmail: user.email,
        }),
      });
      if (res && res.success) {
        setSubmissionMessage('Your custom template request was submitted and is pending admin approval.');
        setIsAddTemplateOpen(false);
        setNewTplData({
          title: '',
          category: 'Website & App',
          industry: 'Technology',
          description: '',
          techStack: 'React, Node.js, PostgreSQL',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        });
        fetchPendingTemplates();
      } else {
        setSubmissionMessage(res.message || 'Failed to submit template request.');
      }
    } catch (err) {
      console.error('Submit template request failed:', err);
      setSubmissionMessage('Failed to submit template request. Please try again later.');
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleApproveTemplate = async (templateId) => {
    try {
      const res = await apiFetch(`/api/templates/${templateId}/approve`, { method: 'PUT', body: JSON.stringify({ adminNotes: 'Approved by admin.' }) });
      if (res && res.success) {
        setPendingTemplates((prev) => prev.filter((tpl) => tpl.id !== templateId));
        setSubmissionMessage('Template approved successfully. It will now appear in the client templates section.');
        fetchClientTemplates();
      }
    } catch (err) {
      console.error('Approve template failed:', err);
    }
  };

  // Handle Save New Custom Template
  const handleSaveNewTemplate = (e) => {
    e.preventDefault();
    const newTpl = {
      id: `tpl-${Date.now()}`,
      title: newTplData.title || 'New Custom Agency Template',
      category: newTplData.category,
      industry: newTplData.industry,
      rating: 5.0,
      downloads: '1+',
      status: 'Custom',
      statusType: 'dev',
      thumbnail: newTplData.thumbnail,
      description: newTplData.description || 'Custom client project template generated for agency workflow.',
      techStack: newTplData.techStack.split(',').map((s) => s.trim()),
      features: ['Custom Frontend Architecture', 'REST & GraphQL API Endpoints', 'Database Migration Scripts'],
      architecture: 'Standard micro-frontend or client-server architecture.',
      readmeContent: `# ${newTplData.title}\n\nCustom template registered by agency admin.`
    };

    setTemplates([newTpl, ...templates]);
    setIsAddTemplateOpen(false);
    setNewTplData({
      title: '',
      category: 'Website & App',
      industry: 'Technology',
      description: '',
      techStack: 'React, Node.js, PostgreSQL',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
    });
  };

  // Render Full-Page Project Creation Studio
  if (isCreateProjectMode) {
    const activeTpl = selectedStudioTpl || templates[0] || defaultTemplates[0];
    return (
      <div className="pdc-main-wrapper pdc-fade-in-scale">
        {/* Studio Top Header */}
        <div className="pdc-studio-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                className="pdc-back-btn-primary"
                onClick={() => setIsCreateProjectMode(false)}
              >
                <ArrowLeft style={{ width: '16px', height: '16px' }} />
                <span>Back to Template Gallery</span>
              </button>

              <div className="dash-breadcrumbs" style={{ margin: 0 }}>
                <span>Start Your Project...</span>
                <ChevronRight className="bc-sep" style={{ width: '14px', height: '14px', margin: '0 4px', color: '#94a3b8' }} />
                <span className="bc-current" style={{ fontWeight: 700, color: '#7c3aed' }}>Create New Enterprise Project</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '0.4rem 0.85rem', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Zap style={{ width: '14px', height: '14px', color: '#16a34a' }} className="pdc-float-icon" /> Auto-Provisioning Ready
              </span>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Rocket style={{ width: '26px', height: '26px', color: '#7c3aed' }} className="pdc-float-icon" /> Project Creation & Provisioning Studio
            </h1>
            <p style={{ fontSize: '0.925rem', color: '#64748b', marginTop: '0.25rem' }}>
              Configure your project parameters, select pre-built infrastructure base, and launch continuous integration pipelines.
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <div className="pdc-stepper-container">
            {[
              { num: 1, title: 'Project Details', sub: 'Identity & Client' },
              { num: 2, title: 'Architecture Base', sub: 'Template Specs' },
              { num: 3, title: 'Infrastructure & Cloud', sub: 'Hosting & CI/CD' },
              { num: 4, title: 'Provision & Launch', sub: 'Automated Deploy' }
            ].map((st) => {
              const isComplete = validateStep(st.num).isValid;
              return (
                <div
                  key={st.num}
                  className={`pdc-stepper-step ${wizardStep === st.num ? 'active' : isComplete ? 'completed' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleStepHeaderClick(st.num)}
                >
                  <div className="pdc-step-badge">
                    {isComplete && wizardStep !== st.num ? '✓' : st.num}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a' }}>{st.title}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{st.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column Studio Main Workspace */}
        <div className="pdc-studio-grid">
          {/* Left Column: Form & Configuration Engine */}
          <div className="pdc-studio-card">
            {stepValidationError && (
              <div style={{
                background: '#fef2f2',
                border: '1.5px solid #fca5a5',
                color: '#991b1b',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)',
                animation: 'pdcSlideDown 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <AlertTriangle style={{ width: '20px', height: '20px', color: '#dc2626', flexShrink: 0 }} />
                  <span>{stepValidationError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStepValidationError('')}
                  style={{ background: 'transparent', border: 'none', color: '#991b1b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <X style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            )}

            {wizardStep === 1 && (
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  1. Project Identity & Stakeholder Information
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>
                  Define project naming conventions, target client branding, and industry vertical assignment.
                </p>

                <div className="pdc-form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Project Title *
                    </label>
                    <input
                      type="text"
                      className="pdc-input"
                      style={{ border: validationAttempted && !wizardData.projectName?.trim() ? '1.5px solid #ef4444' : undefined }}
                      value={wizardData.projectName}
                      onChange={(e) => {
                        setWizardData({ ...wizardData, projectName: e.target.value });
                        if (stepValidationError) setStepValidationError('');
                      }}
                      placeholder="e.g. NextGen SaaS Cloud Platform"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Client / Stakeholder Name *
                    </label>
                    <input
                      type="text"
                      className="pdc-input"
                      style={{ border: validationAttempted && !wizardData.clientName?.trim() ? '1.5px solid #ef4444' : undefined }}
                      value={wizardData.clientName}
                      onChange={(e) => {
                        setWizardData({ ...wizardData, clientName: e.target.value });
                        if (stepValidationError) setStepValidationError('');
                      }}
                      placeholder="e.g. Acme Global Technologies"
                    />
                  </div>
                </div>

                <div className="pdc-form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Budget Allocation Tier
                    </label>
                    <select
                      className="pdc-input"
                      value={wizardData.budget}
                      onChange={(e) => setWizardData({ ...wizardData, budget: e.target.value })}
                    >
                      <option value="₹1,00,000">₹1,00,000 - Entry Enterprise</option>
                      <option value="₹1,50,000">₹1,50,000 - Standard Agency Package</option>
                      <option value="₹2,50,000">₹2,50,000 - Scaleup Suite</option>
                      <option value="₹5,00,000+">₹5,00,000+ - Dedicated Custom Pod</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Target Delivery Milestone Date *
                    </label>
                    <input
                      type="date"
                      className="pdc-input"
                      style={{ border: validationAttempted && !wizardData.targetDate ? '1.5px solid #ef4444' : undefined }}
                      value={wizardData.targetDate}
                      onChange={(e) => {
                        setWizardData({ ...wizardData, targetDate: e.target.value });
                        if (stepValidationError) setStepValidationError('');
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.85rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      2. Select Base Architecture & Template
                    </h3>
                    <p style={{ fontSize: '0.825rem', color: '#64748b', margin: '2px 0 0 0' }}>
                      Choose a pre-tested architecture template or define your custom specifications manually.
                    </p>
                  </div>

                  {/* In-Page View Mode Switcher */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setIsDescribeManuallyOpen(false)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: !isDescribeManuallyOpen ? '#ffffff' : 'transparent',
                        color: !isDescribeManuallyOpen ? '#7c3aed' : '#64748b',
                        boxShadow: !isDescribeManuallyOpen ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Layers style={{ width: '14px', height: '14px' }} />
                      <span>Pre-built Templates (12)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsDescribeManuallyOpen(true)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: isDescribeManuallyOpen ? '#7c3aed' : 'transparent',
                        color: isDescribeManuallyOpen ? '#ffffff' : '#64748b',
                        boxShadow: isDescribeManuallyOpen ? '0 2px 6px rgba(124, 58, 237, 0.3)' : 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Sparkles style={{ width: '14px', height: '14px' }} />
                      <span>Describe Manually</span>
                    </button>
                  </div>
                </div>

                {!isDescribeManuallyOpen ? (
                  <div className="pdc-tpl-select-grid">
                    {templates.map((tplItem) => (
                      <div
                        key={tplItem.id}
                        className={`pdc-tpl-select-card ${activeTpl.id === tplItem.id ? 'selected' : ''}`}
                        onClick={() => setSelectedStudioTpl(tplItem)}
                      >
                        <img src={tplItem.thumbnail} alt={tplItem.title} style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {tplItem.title}
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                            {tplItem.category}
                          </span>
                          <span style={{ fontSize: '0.725rem', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <Star style={{ width: '12px', height: '12px', fill: '#f59e0b', color: '#f59e0b' }} /> {tplItem.rating} • {tplItem.downloads} deploys
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* IN-PAGE DESCRIBE MANUALLY SPECIFICATION FORM SECTION */
                  <div className="pdc-describe-manual-inpage-section pdc-fade-in-scale" style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                    <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.65rem', margin: 0 }}>
                          <Sparkles style={{ color: '#7c3aed', width: '22px', height: '22px' }} />
                          Describe Custom Project Specs Manually
                        </h3>
                        <button
                          type="button"
                          className="btn-outline-purple sm-btn"
                          onClick={() => setIsDescribeManuallyOpen(false)}
                          style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                        >
                          ← Select Pre-built Template
                        </button>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.35rem', margin: 0 }}>
                        Define custom scope, modules, and technology stack without using a pre-made template.
                      </p>
                    </div>

                    <form onSubmit={handleSaveCustomManualSpecs}>
                      <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                          Custom Project Name / Title *
                        </label>
                        <input
                          type="text"
                          className="pdc-input"
                          style={{ border: validationAttempted && !customManualData.title?.trim() ? '1.5px solid #ef4444' : undefined }}
                          value={customManualData.title}
                          onChange={(e) => {
                            setCustomManualData({ ...customManualData, title: e.target.value });
                            if (stepValidationError) setStepValidationError('');
                          }}
                          placeholder="e.g. Custom Multi-Tenant Logistics Platform"
                        />
                      </div>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                            Detailed Project Requirements & Scope *
                          </label>
                          <span style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Sparkles style={{ width: '13px', height: '13px' }} /> Quick AI Prompts below
                          </span>
                        </div>
                        <textarea
                          className="pdc-input"
                          rows={4}
                          style={{ border: validationAttempted && !customManualData.description?.trim() ? '1.5px solid #ef4444' : undefined }}
                          value={customManualData.description}
                          onChange={(e) => {
                            setCustomManualData({ ...customManualData, description: e.target.value });
                            if (stepValidationError) setStepValidationError('');
                          }}
                          placeholder="Describe your custom system architecture, features, user workflows, and integrations..."
                        />
                      </div>

                      {/* Quick AI Sample Specification Prompts */}
                      <div className="pdc-ai-preset-box">
                        <span style={{ fontSize: '0.775rem', fontWeight: 800, color: '#6d28d9', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.6rem' }}>
                          <Sparkles style={{ width: '14px', height: '14px' }} /> Quick AI Specification Prompts:
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {[
                            { label: 'Multi-Vendor E-Commerce', text: 'End-to-end multi-vendor marketplace with Stripe Connect payouts, inventory management, and mobile shopping app.' },
                            { label: 'AI SaaS Dashboard', text: 'Multi-tenant SaaS dashboard featuring OpenAI integration, usage telemetry analytics, and subscription billing.' },
                            { label: 'Healthcare Portal', text: 'HIPAA-compliant telemedicine web app with video consultations, doctor scheduling, and patient EHR records.' }
                          ].map((preset) => (
                            <button
                              key={preset.label}
                              type="button"
                              className="pdc-preset-chip"
                              onClick={() => setCustomManualData({
                                ...customManualData,
                                title: preset.label,
                                description: preset.text
                              })}
                            >
                              <Sparkles style={{ width: '12px', height: '12px' }} />
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pdc-form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                            Custom Tech Stack (comma separated)
                          </label>
                          <input
                            type="text"
                            className="pdc-input"
                            value={customManualData.techStack}
                            onChange={(e) => setCustomManualData({ ...customManualData, techStack: e.target.value })}
                            placeholder="React, Express.js, PostgreSQL, Redis"
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                            Category Type
                          </label>
                          <select
                            className="pdc-input"
                            value={customManualData.category}
                            onChange={(e) => setCustomManualData({ ...customManualData, category: e.target.value })}
                          >
                            <option value="Custom Architecture">Custom Architecture</option>
                            <option value="Website & App">Website & App</option>
                            <option value="SaaS & Cloud">SaaS & Cloud</option>
                            <option value="Mobile Application">Mobile Application</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                        <button
                          type="button"
                          className="pdc-back-btn"
                          onClick={() => setIsDescribeManuallyOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-primary-purple"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.4rem' }}
                        >
                          <Sparkles style={{ width: '16px', height: '16px' }} />
                          <span>Apply Custom Requirements Specs</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {wizardStep === 3 && (
              <div className="pdc-fade-in-scale">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  3. Infrastructure & Deployment Target Configuration
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>
                  Select automated cloud hosting target and CI/CD deployment environment.
                </p>

                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.6rem' }}>
                  Select Cloud Hosting Environment
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {['Vercel Edge Cloud', 'AWS ECS / Fargate', 'Supabase Cloud Engine', 'Docker Kubernetes Pod', 'GCP Cloud Run'].map((target) => (
                    <button
                      key={target}
                      type="button"
                      className={`pdc-infra-pill ${wizardData.deployTarget === target ? 'selected' : ''}`}
                      onClick={() => setWizardData({ ...wizardData, deployTarget: target })}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Zap style={{ width: '14px', height: '14px' }} /> {target}</span>
                    </button>
                  ))}
                </div>

                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.6rem' }}>
                  Select UI Theme Preset
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {['Purple Indigo Enterprise', 'Dark Emerald SaaS', 'Modern Slate Minimal', 'Sunset Coral Agency'].map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      className={`pdc-infra-pill ${wizardData.selectedTheme === theme ? 'selected' : ''}`}
                      onClick={() => setWizardData({ ...wizardData, selectedTheme: theme })}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Palette style={{ width: '14px', height: '14px' }} /> {theme}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {wizardStep === 4 && (
              <div className="pdc-fade-in-scale">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  4. Automated Provisioning & Launch
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem' }}>
                  Review final project specification before initiating automated Git repository and database setup.
                </p>

                {isProvisioning ? (
                  <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                      <Zap className="pdc-spin-slow" style={{ width: '48px', height: '48px', color: '#7c3aed' }} />
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                      Provisioning Project Architecture...
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                      Building Git branch, configuring database migrations, and connecting OAuth environment.
                    </p>

                    <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '5px', marginTop: '1.5rem', overflow: 'hidden' }}>
                      <div style={{ width: `${provisionProgress}%`, height: '100%', background: 'linear-gradient(90deg, #7c3aed 0%, #a855f7 100%)', transition: 'width 0.4s ease' }} />
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7c3aed', marginTop: '0.75rem', display: 'block' }}>
                      {provisionProgress}% Complete
                    </span>
                  </div>
                ) : (
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 style={{ color: '#16a34a', width: '18px', height: '18px' }} /> Configuration Pre-Flight Checklist Passed
                    </h4>
                    <div className="pdc-form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem', color: '#475569' }}>
                      <p><strong>Project:</strong> {wizardData.projectName || 'Untitled Project'}</p>
                      <p><strong>Client:</strong> {wizardData.clientName || 'Agency Internal'}</p>
                      <p><strong>Target Date:</strong> {wizardData.targetDate}</p>
                      <p><strong>Budget:</strong> {wizardData.budget}</p>
                      <p><strong>Cloud Infra:</strong> {wizardData.deployTarget}</p>
                      <p><strong>Base Template:</strong> {activeTpl.title}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stepper Control Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
              {wizardStep > 1 && !isProvisioning ? (
                <button
                  className="pdc-back-btn"
                  onClick={() => {
                    setStepValidationError('');
                    setWizardStep(wizardStep - 1);
                  }}
                >
                  ← Previous Step
                </button>
              ) : <div />}

              {wizardStep < 4 ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {wizardStep === 2 && !isDescribeManuallyOpen && (
                    <button
                      type="button"
                      className="btn-outline-purple"
                      onClick={() => setIsDescribeManuallyOpen(true)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem', borderColor: '#7c3aed', color: '#7c3aed', fontWeight: 700, background: '#f5f3ff' }}
                    >
                      <Sparkles style={{ width: '16px', height: '16px', color: '#7c3aed' }} />
                      <span>Describe Manually</span>
                    </button>
                  )}
                  <button
                    className="btn-primary-purple"
                    onClick={handleNextStep}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 1.4rem',
                      opacity: !validateStep(wizardStep).isValid ? 0.85 : 1
                    }}
                  >
                    <span>Continue to Step {wizardStep + 1}</span>
                    {!validateStep(wizardStep).isValid ? (
                      <Lock style={{ width: '15px', height: '15px', color: '#e9d5ff' }} />
                    ) : (
                      <ChevronRight style={{ width: '16px', height: '16px' }} />
                    )}
                  </button>
                </div>
              ) : !isProvisioning ? (
                <button
                  className="btn-primary-purple pdc-pulse-glow"
                  onClick={handleRunProvisioning}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.6rem', boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)' }}
                >
                  <Rocket style={{ width: '18px', height: '18px' }} />
                  <span>Launch & Provision Project</span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Right Column: Live Real-time Specification Blueprint */}
          <div>
            <div className="pdc-studio-card" style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', tracking: '0.05em' }}>
                  Live Specification Blueprint
                </span>
                <span className={`pdc-card-status-badge pdc-status-${activeTpl.statusType}`} style={{ position: 'static', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Zap style={{ width: '12px', height: '12px' }} /> {activeTpl.status}
                </span>
              </div>

              <div style={{ width: '100%', height: '180px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1rem' }}>
                <img src={activeTpl.thumbnail} alt={activeTpl.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                {wizardData.projectName || activeTpl.title}
              </h3>
              <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '1rem' }}>
                {activeTpl.category} • {activeTpl.industry}
              </p>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>Integrated Architecture Stack</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
                  {(Array.isArray(activeTpl?.techStack) ? activeTpl.techStack : typeof activeTpl?.techStack === 'string' ? activeTpl.techStack.split(',').map(s => s.trim()) : []).map((ts) => (
                    <span key={ts} style={{ background: '#f3e8ff', color: '#7c3aed', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {ts}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pdc-form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.75rem', borderRadius: '10px' }}>
                  <span style={{ color: '#64748b', display: 'block' }}>Target Host</span>
                  <strong style={{ color: '#0f172a' }}>{wizardData.deployTarget}</strong>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.75rem', borderRadius: '10px' }}>
                  <span style={{ color: '#64748b', display: 'block' }}>Est. Provision Time</span>
                  <strong style={{ color: '#16a34a' }}>&lt; 60 Seconds</strong>
                </div>
              </div>
            </div>

            {/* Live Terminal Log Box */}
            <div className="pdc-terminal-box" style={{ margin: 0 }}>
              <span style={{ color: '#64748b', display: 'block', marginBottom: '0.4rem', fontSize: '0.75rem' }}>
                # Agency Telemetry Console Stream
              </span>
              <span style={{ color: '#4ade80' }}>✓ Repo template initialized ({activeTpl.id})</span>
              <br />
              <span style={{ color: '#38bdf8' }}>→ Environment target: {wizardData.deployTarget}</span>
              <br />
              <span style={{ color: '#fbbf24' }}>→ Status: Ready for launch execution</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Full-Page Template Details View when inspecting a template
  if (selectedTemplateInspect) {
    const tpl = selectedTemplateInspect;
    return (
      <div className="pdc-main-wrapper">
        <div className="pdc-fullpage-wrapper">
          {/* Top Breadcrumb & Actions Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                className="pdc-back-btn-primary"
                onClick={() => setSelectedTemplateInspect(null)}
              >
                <ArrowLeft style={{ width: '16px', height: '16px' }} />
                <span>Back to Template Gallery</span>
              </button>

              <div className="dash-breadcrumbs" style={{ margin: 0 }}>
                <span>Start Your Project...</span>
                <ChevronRight className="bc-sep" style={{ width: '14px', height: '14px', margin: '0 4px', color: '#94a3b8' }} />
                <span className="bc-current" style={{ fontWeight: 700, color: '#7c3aed' }}>{tpl.title}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                className="pdc-readme-btn"
                onClick={() => handleCopyCode(tpl.readmeContent)}
                style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
              >
                {copiedCode ? <Check style={{ width: '16px', height: '16px', color: '#10b981' }} /> : <Copy style={{ width: '16px', height: '16px' }} />}
                <span>{copiedCode ? 'Copied README!' : 'Copy README.md'}</span>
              </button>

              <button
                className="btn-primary-purple"
                onClick={() => handleOpenWizard(tpl)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem' }}
              >
                <Rocket style={{ width: '16px', height: '16px' }} />
                <span>Start Project from Template</span>
              </button>
            </div>
          </div>

          {/* Hero Banner & Header Card */}
          <div className="pdc-fullpage-hero-card">
            <div className="pdc-fullpage-banner">
              <img src={tpl.thumbnail} alt={tpl.title} className="pdc-fullpage-banner-img" />
              <div className="pdc-fullpage-banner-overlay">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <span className={`pdc-card-status-badge pdc-status-${tpl.statusType}`} style={{ position: 'static', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Zap style={{ width: '12px', height: '12px' }} /> {tpl.status}
                  </span>
                  <span className="pdc-card-category-tag" style={{ position: 'static' }}>
                    {tpl.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star style={{ width: '14px', height: '14px', fill: '#fbbf24' }} /> {tpl.rating} / 5.0 rating ({tpl.downloads} agency deploys)
                  </span>
                </div>

                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  {tpl.title}
                </h1>
                <p style={{ fontSize: '1rem', color: '#cbd5e1', maxWidth: '850px', marginTop: '0.4rem', lineHeight: '1.6' }}>
                  {tpl.description}
                </p>
              </div>
            </div>

            {/* Metrics Scorecards */}
            <div className="pdc-fullpage-score-grid">
              <div className="pdc-fullpage-score-card">
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Globe style={{ width: '22px', height: '22px' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Target Platform</span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{tpl.category}</h4>
                </div>
              </div>

              <div className="pdc-fullpage-score-card">
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck style={{ width: '22px', height: '22px' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Readiness Level</span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#16a34a', marginTop: '2px' }}>100% Production Ready</h4>
                </div>
              </div>

              <div className="pdc-fullpage-score-card">
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users style={{ width: '22px', height: '22px' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Agency Adoption</span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0284c7', marginTop: '2px' }}>{tpl.downloads} Active Projects</h4>
                </div>
              </div>

              <div className="pdc-fullpage-score-card">
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Cpu style={{ width: '22px', height: '22px' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Tech Stack Count</span>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#d97706', marginTop: '2px' }}>{tpl.techStack.length} Integrated Specs</h4>
                </div>
              </div>

              {/* Multi-Tab Navigation Bar */}
              <div className="pdc-fullpage-tabs-bar" style={{ gridColumn: '1 / -1', padding: 0 }}>
                {[
                  { id: 'overview', label: 'System Overview & Media', icon: Eye },
                  { id: 'features', label: 'Included Features & Modules', icon: CheckCircle2 },
                  { id: 'architecture', label: 'Architecture & Tech Stack', icon: Layers },
                  { id: 'readme', label: 'Technical README.md Specification', icon: FileText },
                  { id: 'quickstart', label: 'Quick Start & CLI Setup', icon: Terminal }
                ].map((tab) => {
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      className={`pdc-fullpage-tab ${activeInspectTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveInspectTab(tab.id)}
                    >
                      <IconComp style={{ width: '16px', height: '16px' }} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Content Panel Body */}
              <div style={{ gridColumn: '1 / -1', padding: '2rem 1rem 1rem 1rem' }}>
                {activeInspectTab === 'overview' && (
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                      System Purpose & High-Level Architecture
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                      {tpl.description}
                    </p>

                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Layers style={{ color: '#7c3aed', width: '18px', height: '18px' }} /> System Architecture Flow Summary
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>
                        {tpl.architecture}
                      </p>
                    </div>

                    <div className="pdc-form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Primary Target Industry</h4>
                        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          Engineered for enterprise client projects, agency applications, and scalable modern web solutions in {tpl.industry}.
                        </p>
                      </div>

                      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>Support & Maintenance</h4>
                        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          Includes continuous CI/CD pipeline integration, security dependency patches, and 24/7 architecture documentation updates.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeInspectTab === 'features' && (
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                      Comprehensive Module & Feature Matrix ({(Array.isArray(tpl.features) ? tpl.features : []).length} Components)
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                      {(Array.isArray(tpl.features) ? tpl.features : []).map((feat, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#ffffff', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                            <CheckCircle2 style={{ width: '18px', height: '18px' }} />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{feat}</h4>
                            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>Production-tested agency module component</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeInspectTab === 'architecture' && (
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                      Full Technical Architecture & Technology Stack
                    </h3>
                    <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      {tpl.architecture}
                    </p>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                      Integrated Technology Stack & Libraries:
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                      {(Array.isArray(tpl.techStack) ? tpl.techStack : typeof tpl.techStack === 'string' ? tpl.techStack.split(',').map(s => s.trim()) : []).map((ts, i) => (
                        <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                            {i + 1}
                          </div>
                          <div>
                            <h5 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>{ts}</h5>
                            <span style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 600 }}>Integrated Layer</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeInspectTab === 'readme' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>README.md Technical Specification</h3>
                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Complete repository documentation & setup blueprint.</p>
                      </div>
                      <button
                        className="pdc-readme-btn"
                        onClick={() => handleCopyCode(tpl.readmeContent)}
                        style={{ padding: '0.45rem 0.95rem', fontSize: '0.825rem' }}
                      >
                        {copiedCode ? <Check style={{ width: '14px', height: '14px', color: '#10b981' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
                        <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy README'}</span>
                      </button>
                    </div>

                    <div className="pdc-markdown-box" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '0.9rem', lineHeight: '1.7' }}>
                        {tpl.readmeContent}
                      </pre>
                    </div>
                  </div>
                )}

                {activeInspectTab === 'quickstart' && (
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                      Quick Start CLI Installation & Deployment Guide
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.25rem' }}>
                      Run the following commands in your local bash terminal to instantiate this repository template.
                    </p>

                    <div className="pdc-terminal-box">
                      <span style={{ color: '#64748b', display: 'block', marginBottom: '0.5rem' }}># Step 1: Clone template repository</span>
                      <span style={{ color: '#38bdf8' }}>git clone https://github.com/agency-erp/{tpl.id}-app.git</span>
                      <br /><br />
                      <span style={{ color: '#64748b', display: 'block', marginBottom: '0.5rem' }}># Step 2: Install dependencies & setup environment</span>
                      <span style={{ color: '#38bdf8' }}>cd {tpl.id}-app && npm install && cp .env.example .env.local</span>
                      <br /><br />
                      <span style={{ color: '#64748b', display: 'block', marginBottom: '0.5rem' }}># Step 3: Run development server</span>
                      <span style={{ color: '#4ade80' }}>npm run dev</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating Action Bar */}
          <div className="pdc-floating-bar">
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                Ready to provision {tpl.title}?
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#cbd5e1' }}>
                Instantly set up repository, database migrations, and team access credentials.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button className="pdc-floating-back-btn" onClick={() => setSelectedTemplateInspect(null)}>
                ← Back to Gallery
              </button>

              <button
                className="btn-primary-purple"
                onClick={() => handleOpenWizard(tpl)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 8px 20px rgba(124,58,237,0.4)' }}
              >
                <Rocket style={{ width: '16px', height: '16px' }} />
                Start Project Wizard
              </button>
            </div>
          </div>
        </div>

        {/* START PROJECT WIZARD MODAL (If triggered from page view) */}
        {selectedTemplateWizard && (
          <div className="social-composer-modal-overlay">
            <div className="social-composer-modal-card animate-scale-up max-w-lg">
              <div className="composer-modal-header">
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    Start Project Wizard: {selectedTemplateWizard.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Provisioning step {wizardStep} of 3</p>
                </div>
                <button className="composer-close-btn" onClick={() => setSelectedTemplateWizard(null)}>
                  <X className="close-ic" />
                </button>
              </div>

              <div style={{ padding: '1.5rem' }}>
                {wizardStep === 1 && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Project Name
                    </label>
                    <input
                      type="text"
                      className="pdc-input"
                      value={wizardData.projectName}
                      onChange={(e) => setWizardData({ ...wizardData, projectName: e.target.value })}
                      placeholder="e.g. Acme E-Commerce Revamp"
                    />

                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginTop: '1rem', marginBottom: '0.35rem' }}>
                      Client / Stakeholder Name
                    </label>
                    <input
                      type="text"
                      className="pdc-input"
                      value={wizardData.clientName}
                      onChange={(e) => setWizardData({ ...wizardData, clientName: e.target.value })}
                      placeholder="e.g. Acme Corp Inc."
                    />
                  </div>
                )}

                {wizardStep === 2 && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Target Launch Date
                    </label>
                    <input
                      type="date"
                      className="pdc-input"
                      value={wizardData.targetDate}
                      onChange={(e) => setWizardData({ ...wizardData, targetDate: e.target.value })}
                    />

                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginTop: '1rem', marginBottom: '0.35rem' }}>
                      Project Budget Allocation
                    </label>
                    <select
                      className="pdc-input"
                      value={wizardData.budget}
                      onChange={(e) => setWizardData({ ...wizardData, budget: e.target.value })}
                    >
                      <option value="₹1,00,000">₹1,00,000 - Entry Enterprise</option>
                      <option value="₹1,50,000">₹1,50,000 - Standard Agency Package</option>
                      <option value="₹2,50,000">₹2,50,000 - Full Scale Enterprise</option>
                      <option value="₹5,00,000+">₹5,00,000+ - Custom Dedicated Pod</option>
                    </select>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div>
                    {isProvisioning ? (
                      <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                          <Zap className="pdc-spin-slow" style={{ width: '40px', height: '40px', color: '#7c3aed' }} />
                        </div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Provisioning Project Repo & Infrastructure...</h4>
                        <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', marginTop: '1rem', overflow: 'hidden' }}>
                          <div style={{ width: `${provisionProgress}%`, height: '100%', background: '#7c3aed', transition: 'width 0.4s ease' }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', display: 'block' }}>{provisionProgress}% Completed</span>
                      </div>
                    ) : (
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Review Configuration Summary</h4>
                        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                          <p><strong>Project Name:</strong> {wizardData.projectName || 'Untitled Project'}</p>
                          <p><strong>Client:</strong> {wizardData.clientName || 'N/A'}</p>
                          <p><strong>Target Date:</strong> {wizardData.targetDate}</p>
                          <p><strong>Budget:</strong> {wizardData.budget}</p>
                          <p><strong>Base Template:</strong> {selectedTemplateWizard.title}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="composer-modal-footer">
                {wizardStep > 1 && !isProvisioning && (
                  <button className="btn-outline-purple sm-btn" onClick={() => setWizardStep(wizardStep - 1)}>
                    Back
                  </button>
                )}
                {wizardStep < 3 && (
                  <button className="btn-primary-purple sm-btn" onClick={() => setWizardStep(wizardStep + 1)}>
                    Next Step →
                  </button>
                )}
                {wizardStep === 3 && !isProvisioning && (
                  <button className="btn-primary-purple sm-btn" onClick={handleRunProvisioning} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Rocket style={{ width: '14px', height: '14px' }} />
                    <span>Confirm & Launch Project</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pdc-main-wrapper">
      {/* 1. HEADER & TOP BREADCRUMB CARD */}
      {!hideHeaderCard && (
        <div className="pdc-header-card" style={{ marginBottom: '1.5rem' }}>
          <div className="dash-breadcrumbs" style={{ marginBottom: '0.75rem' }}>
            <span>Dashboard</span>
            <ChevronRight className="bc-sep" style={{ width: '14px', height: '14px', margin: '0 4px', color: '#94a3b8' }} />
            <span>Agency Operations</span>
            <ChevronRight className="bc-sep" style={{ width: '14px', height: '14px', margin: '0 4px', color: '#94a3b8' }} />
            <span className="bc-current" style={{ fontWeight: 700, color: '#7c3aed' }}>Start Your Project Here...</span>
          </div>

          <div className="pdc-header-top">
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h1 className="pdc-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <FolderKanban style={{ color: '#7c3aed', width: '28px', height: '28px' }} />
                    Start Your Project Here...
                  </h1>
                  <p className="pdc-subtitle" style={{ maxWidth: '850px', marginTop: '0.25rem' }}>
                    Select from our production-grade website and mobile application templates. Launch new client projects instantly with pre-built architectures, full tech specs, and README documentations.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    className="btn-primary-purple"
                    onClick={() => handleOpenWizard(templates[0] || defaultTemplates[0])}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)' }}
                  >
                    <Rocket style={{ width: '16px', height: '16px' }} />
                    <span>Create New Project</span>
                  </button>

                  <button
                    className="btn-outline-purple sm-btn"
                    onClick={() => setIsAddTemplateOpen(true)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem' }}
                  >
                    <Plus style={{ width: '16px', height: '16px' }} />
                    <span>Add Custom Template</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FILTER TOOLBAR & SEARCH BAR */}
      {!hideTemplates && (
        <>
          <div className="pdc-toolbar" style={{ marginBottom: '1.5rem' }}>
            <div className="pdc-filter-chips">
              {(hideWebsiteTemplates
                ? ['All', 'Mobile App Templates', 'Full-Stack Systems']
                : ['All', 'Website Templates', 'Mobile App Templates', 'Full-Stack Systems']
              ).map((cat) => (
                <button
                  key={cat}
                  className={`pdc-chip ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'All' ? `All Templates (${filteredTemplates.length})` : cat}
                </button>
              ))}
            </div>

            <div className="pdc-toolbar-actions">
              <div className="pdc-search-wrap">
                <Search />
                <input
                  type="text"
                  className="pdc-search-input"
                  placeholder="Search templates, stack, industry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 3. ROW-2 AND COLUMN-3 TEMPLATE GRID */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layers style={{ color: '#7c3aed', width: '20px', height: '20px' }} />
                  {hideWebsiteTemplates ? 'Mobile App & Full-Stack Application Templates' : 'Website & Mobile App Templates'}
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Showing {displayedTemplates.length} of {filteredTemplates.length} verified enterprise templates ready for deployment.
                </p>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#f3e8ff', color: '#7c3aed', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                Grid Layout: 2 Rows × 3 Columns
              </span>
            </div>

            {/* Grid layout: 3 Columns on desktop x 2 Rows = 6 Sections */}
            <div className="pdc-project-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {displayedTemplates.map((tpl, idx) => (
                <div key={tpl.id} className="pdc-project-card pdc-fade-in-scale">
                  {/* Card Banner Image & Badges */}
                  <div className="pdc-card-img-wrap" style={{ height: '210px' }}>
                    <img src={tpl.thumbnail} alt={tpl.title} className="pdc-card-img" />
                    <span className={`pdc-card-status-badge pdc-status-${tpl.statusType}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Zap style={{ width: '12px', height: '12px' }} /> {tpl.status}
                    </span>
                    <span className="pdc-card-category-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {tpl.category.includes('App') ? <Smartphone style={{ width: '12px', height: '12px' }} /> : <Globe style={{ width: '12px', height: '12px' }} />}
                      {tpl.category}
                    </span>
                  </div>

                  {/* Card Main Body */}
                  <div className="pdc-card-body">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="pdc-card-client">{tpl.industry}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.785rem', fontWeight: 700, color: '#f59e0b' }}>
                        <Star style={{ width: '13px', height: '13px', fill: '#f59e0b' }} />
                        <span>{tpl.rating}</span>
                        <span style={{ color: '#94a3b8', fontWeight: 500 }}>({tpl.downloads})</span>
                      </div>
                    </div>

                    <h3 className="pdc-card-title" style={{ fontSize: '1.2rem', marginTop: '0.35rem' }}>
                      {tpl.title}
                    </h3>
                    <p className="pdc-card-desc" style={{ marginTop: '0.5rem', lineHeight: '1.55' }}>
                      {tpl.description}
                    </p>

                    {/* Core Feature Highlights */}
                    <div style={{ marginTop: '0.85rem', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.5px' }}>
                        Key Included Features:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.35rem' }}>
                        {(Array.isArray(tpl.features) ? tpl.features : []).slice(0, 3).map((feat, i) => (
                          <span key={i} style={{ fontSize: '0.75rem', color: '#334155', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 style={{ width: '12px', height: '12px', color: '#10b981' }} />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="pdc-tech-stack-row" style={{ marginTop: '0.85rem' }}>
                      {(Array.isArray(tpl.techStack) ? tpl.techStack : typeof tpl.techStack === 'string' ? tpl.techStack.split(',').map(s => s.trim()) : []).map((ts) => (
                        <span key={ts} className="pdc-tech-badge">
                          {ts}
                        </span>
                      ))}
                    </div>

                    {/* Card Action Controls */}
                    <div className="pdc-card-footer" style={{ marginTop: '1.25rem' }}>
                      <button
                        className="pdc-readme-btn"
                        onClick={() => {
                          setSelectedTemplateInspect(tpl);
                          setActiveInspectTab('overview');
                        }}
                      >
                        <BookOpen style={{ width: '14px', height: '14px' }} />
                        Inspect & README
                      </button>

                      <button
                        className="btn-primary-purple sm-btn"
                        onClick={() => handleOpenWizard(tpl)}
                        style={{ padding: '0.45rem 1rem', fontSize: '0.825rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <Rocket style={{ width: '14px', height: '14px' }} />
                        Start Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SHOW MORE / SHOW LESS INTERACTIVE SECTION */}
            {filteredTemplates.length > 6 && (
              <div className="pdc-view-all-container" style={{ marginTop: '2.5rem' }}>
                <button
                  className="pdc-view-all-btn"
                  onClick={() => setShowAllTemplates(!showAllTemplates)}
                >
                  <Sparkles style={{ width: '18px', height: '18px' }} />
                  <span>
                    {showAllTemplates
                      ? 'Show Less Templates'
                      : `Show More Templates (${filteredTemplates.length - 6} Additional Available)`}
                  </span>
                  {showAllTemplates ? (
                    <ChevronUp style={{ width: '18px', height: '18px' }} />
                  ) : (
                    <ChevronDown style={{ width: '18px', height: '18px' }} />
                  )}
                </button>
                <p className="pdc-view-all-sub">
                  {showAllTemplates
                    ? 'Displaying full agency template repository (12 templates)'
                    : 'Click to expand 6 additional website & mobile app architecture templates'}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* 5. START PROJECT WIZARD MODAL */}
      {selectedTemplateWizard && (
        <div className="social-composer-modal-overlay">
          <div className="social-composer-modal-card animate-scale-up max-w-lg pdc-fade-in-scale">
            <div className="composer-modal-header">
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Rocket style={{ color: '#7c3aed', width: '20px', height: '20px' }} /> Start Project Wizard</h2>
                <p>Template: <strong>{selectedTemplateWizard.title}</strong></p>
              </div>
              <button className="composer-close-btn" onClick={() => setSelectedTemplateWizard(null)}>
                <X className="close-ic" />
              </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              {isProvisioning ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <Sparkles style={{ width: '48px', height: '48px', color: '#7c3aed', margin: '0 auto 1rem' }} className="pdc-spin-slow" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Provisioning Project Repository...</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                    Cloning template, generating database migrations & setting up environment variables.
                  </p>

                  <div className="pdc-progress-track" style={{ height: '10px', marginTop: '1.5rem' }}>
                    <div className="pdc-progress-fill" style={{ width: `${provisionProgress}%` }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7c3aed', display: 'block', marginTop: '0.5rem' }}>
                    {provisionProgress}% Complete
                  </span>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleRunProvisioning(); }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="composer-label">Project Name *</label>
                      <input
                        type="text"
                        required
                        className="composer-input"
                        value={wizardData.projectName}
                        onChange={(e) => setWizardData({ ...wizardData, projectName: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="composer-label">Client / Agency Account *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Corporation"
                        className="composer-input"
                        value={wizardData.clientName}
                        onChange={(e) => setWizardData({ ...wizardData, clientName: e.target.value })}
                      />
                    </div>

                    <div className="pdc-form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="composer-label">Target Launch Date</label>
                        <input
                          type="date"
                          className="composer-input"
                          value={wizardData.targetDate}
                          onChange={(e) => setWizardData({ ...wizardData, targetDate: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="composer-label">Allocated Budget</label>
                        <input
                          type="text"
                          className="composer-input"
                          value={wizardData.budget}
                          onChange={(e) => setWizardData({ ...wizardData, budget: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="composer-modal-footer" style={{ marginTop: '1.5rem', padding: 0, border: 'none' }}>
                    <button type="button" className="btn-outline-purple sm-btn" onClick={() => setSelectedTemplateWizard(null)}>
                      Cancel
                    </button>

                    <button type="submit" className="btn-primary-purple">
                      <Zap style={{ width: '16px', height: '16px' }} /> Confirm & Provision Project
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. ADD CUSTOM TEMPLATE MODAL */}
      {isAddTemplateOpen && (
        <div className="social-composer-modal-overlay">
          <div className="social-composer-modal-card animate-scale-up max-w-lg pdc-fade-in-scale">
            <div className="composer-modal-header">
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus style={{ color: '#7c3aed', width: '20px', height: '20px' }} /> {isAdminMode ? 'Register Custom Template' : 'Request Custom Template'}</h2>
                <p>{isAdminMode ? 'Add a new website or mobile app template to the agency showcase.' : 'Submit a custom template request to the admin review queue.'}</p>
              </div>
              <button className="composer-close-btn" onClick={() => setIsAddTemplateOpen(false)}>
                <X className="close-ic" />
              </button>
            </div>

            <form onSubmit={isAdminMode ? handleSaveNewTemplate : handleSubmitCustomTemplateRequest} style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="composer-label">Template Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Real Estate Portal & VR App"
                    className="composer-input"
                    value={newTplData.title}
                    onChange={(e) => setNewTplData({ ...newTplData, title: e.target.value })}
                  />
                </div>

                <div className="pdc-form-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="composer-label">Category</label>
                    <select
                      className="composer-select"
                      value={newTplData.category}
                      onChange={(e) => setNewTplData({ ...newTplData, category: e.target.value })}
                    >
                      <option value="Website & App">Website & App</option>
                      <option value="Website & Web App">Website & Web App</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Dual App System">Dual App System</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="composer-label">Industry</label>
                    <input
                      type="text"
                      placeholder="e.g. Real Estate"
                      className="composer-input"
                      value={newTplData.industry}
                      onChange={(e) => setNewTplData({ ...newTplData, industry: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="composer-label">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="Next.js, React Native, Node.js, PostgreSQL"
                    className="composer-input"
                    value={newTplData.techStack}
                    onChange={(e) => setNewTplData({ ...newTplData, techStack: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="composer-label">Brief Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe the target use case and key capabilities..."
                    className="composer-textarea"
                    value={newTplData.description}
                    onChange={(e) => setNewTplData({ ...newTplData, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="composer-modal-footer" style={{ marginTop: '1.5rem', padding: 0, border: 'none' }}>
                <button type="button" className="btn-outline-purple sm-btn" onClick={() => setIsAddTemplateOpen(false)}>
                  Cancel
                </button>

                <button type="submit" className="btn-primary-purple" disabled={submissionLoading}>
                  <Check style={{ width: '16px', height: '16px' }} /> {isAdminMode ? (submissionLoading ? 'Saving...' : 'Save Template') : (submissionLoading ? 'Submitting...' : 'Submit Request')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
