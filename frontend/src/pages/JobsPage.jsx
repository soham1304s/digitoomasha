import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, ArrowUpRight, CheckCircle2, Send, Sparkles, Building2, Laptop, GraduationCap, HeartHandshake, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const WEB3FORMS_ACCESS_KEY = '8be60e60-b0eb-47ca-8b5f-dbd39057f730';

const JOBS_DATA = [
  {
    id: 'job-1',
    title: 'Senior Full-Stack Engineer (React & Node.js)',
    department: 'Engineering',
    location: 'Jaipur HQ / Remote',
    type: 'Full-Time',
    experience: '3-5 Years',
    salary: '₹12,000 - ₹22,000 / mo',
    featured: true,
    description: 'Lead the architecture and development of scalable client web applications, internal ROI telemetry analytics engines, and custom Web3/React portals.',
    requirements: [
      'Proficiency in React 18+, Node.js, Express, and modern CSS/Tailwind engines',
      'Hands-on experience with RESTful APIs, Webhooks, PostgreSQL/MongoDB',
      'Strong understanding of website speed optimization and Core Web Vitals',
    ],
  },
  {
    id: 'job-2',
    title: 'Lead Performance Marketer & PPC Specialist',
    department: 'Digital Marketing',
    location: 'Remote (India)',
    type: 'Full-Time',
    experience: '2-4 Years',
    salary: '₹10,000 - ₹18,000 / mo',
    featured: true,
    description: 'Manage high-budget Google Search, Meta Ads, and LinkedIn PPC campaigns for global e-commerce and B2B SaaS clients with strict ROAS targets.',
    requirements: [
      'Proven track record managing ₹500k+ monthly ad budgets with 4x+ ROAS',
      'Deep mastery of Google Tag Manager, GA4, Meta Pixel, and conversion tracking',
      'Strong copywriting and A/B ad creative testing capabilities',
    ],
  },
  {
    id: 'job-3',
    title: 'Senior SEO Strategist & Organic Growth Lead',
    department: 'Digital Marketing',
    location: 'Jaipur HQ / Hybrid',
    type: 'Full-Time',
    experience: '3+ Years',
    salary: '₹9,000 - ₹16,000 / mo',
    featured: false,
    description: 'Drive high-impact technical SEO, schema markup strategy, backlink architecture, and organic search growth for enterprise clients.',
    requirements: [
      'Expertise in Ahrefs, SEMrush, Screaming Frog, and Google Search Console',
      'Experience executing white-hat link acquisition strategies at scale',
      'Strong understanding of programmatic SEO and content topical authority',
    ],
  },
  {
    id: 'job-4',
    title: 'Senior UI/UX & Interactive Motion Designer',
    department: 'Design & Creative',
    location: 'Remote',
    type: 'Full-Time',
    experience: '2-5 Years',
    salary: '₹10,000 - ₹18,000 / mo',
    featured: false,
    description: 'Craft mesmerizing, modern web user interfaces, glassmorphic design systems, interactive prototypes, and digital brand assets.',
    requirements: [
      'Outstanding portfolio demonstrating Figma, Webflow, and interactive UI components',
      'Understanding of micro-animations, GSAP, and design tokens',
      'Ability to translate client brand identity into ultra-premium UI layouts',
    ],
  },
  {
    id: 'job-5',
    title: 'AI Workflow & Automation Specialist',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-Time / Contract',
    experience: '1-3 Years',
    salary: '₹12,000 - ₹20,000 / mo',
    featured: false,
    description: 'Design and deploy automated customer onboarding pipelines, AI chatbot integration, Make.com/n8n workflows, and CRM synchronizations.',
    requirements: [
      'Experience building custom Zapier, Make.com, or n8n automation pipelines',
      'Familiarity with OpenAI API, Anthropic, LangChain, or LLM agents',
      'Basic JavaScript / Python scripting skills for webhooks and data transformation',
    ],
  },
];

const PERKS = [
  { icon: Laptop, title: 'Flexible & Remote-First', desc: 'Work from our Jaipur HQ or completely remote from anywhere in India with flexible working hours.' },
  { icon: Sparkles, title: 'Performance Bonuses', desc: 'Quarterly profit sharing and campaign milestone bonuses based on client performance.' },
  { icon: GraduationCap, title: 'Learning & Tech Allowance', desc: '₹25,000 annual budget for courses, conferences, tools, hardware upgrades, and certifications.' },
  { icon: HeartHandshake, title: 'Health & Wellness Support', desc: 'Comprehensive medical coverage for you and your family, plus paid wellness days.' },
];

export default function JobsPage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantForm, setApplicantForm] = useState({ name: '', email: '', phone: '', portfolio: '', coverNote: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const departments = ['All', 'Engineering', 'Digital Marketing', 'Design & Creative'];

  const filteredJobs = selectedDept === 'All' 
    ? JOBS_DATA 
    : JOBS_DATA.filter((job) => job.department === selectedDept);

  const handleApply = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: applicantForm.name,
          email: applicantForm.email,
          phone: applicantForm.phone || 'N/A',
          portfolio: applicantForm.portfolio,
          cover_note: applicantForm.coverNote || 'N/A',
          job_title: selectedJob.title,
          job_department: selectedJob.department,
          job_location: selectedJob.location,
          subject: `New Job Application: ${selectedJob.title} - ${applicantForm.name}`,
          from_name: 'DigiToomasha Careers Portal',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setApplicantForm({ name: '', email: '', phone: '', portfolio: '', coverNote: '' });
      } else {
        setErrorMessage(data.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Web3Forms job application submit error:', err);
      setErrorMessage('Network error occurred. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper min-h-screen bg-[#FAF8F2] text-[#1A1A1A] pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Hero */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-[#D99B00] bg-[#D99B00]/10 px-4 py-1.5 rounded-full mb-4 border border-[#D99B00]/20">
            <Sparkles className="w-3.5 h-3.5" /> WE'RE HIRING
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-[#14291E] mb-6 leading-tight">
            Build The Future Of Digital Growth
          </h1>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            Join a relentless team of engineers, performance marketers, design visionaries, and AI specialists building high-converting brand engines.
          </p>
        </section>

        {/* Culture & Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PERKS.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E0DDD2] shadow-sm hover:shadow-md hover:border-[#1E3A2B] transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A2B]/10 text-[#1E3A2B] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-[#14291E] mb-2">{perk.title}</h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{perk.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E0DDD2]">
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[#14291E] tracking-tight">Open Positions</h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Explore active roles across tech, marketing, and design.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedDept === dept
                    ? 'bg-[#1E3A2B] text-white shadow-md'
                    : 'bg-[#EAE6D6]/60 text-[#1A1A1A] hover:bg-[#EAE6D6]'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-6 mb-20">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`p-6 md:p-8 rounded-3xl bg-white border transition-all duration-300 ${
                job.featured 
                  ? 'border-[#D99B00] shadow-lg ring-1 ring-[#D99B00]/30' 
                  : 'border-[#E0DDD2] shadow-sm hover:border-[#1E3A2B]'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#1E3A2B]/10 text-[#1E3A2B]">
                      {job.department}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> {job.location}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" /> {job.type}
                    </span>
                    <span className="text-[11px] font-bold text-[#D99B00] flex items-center gap-1 bg-[#D99B00]/10 px-2.5 py-0.5 rounded-md">
                      <DollarSign className="w-3 h-3" /> {job.salary}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-[#14291E] mb-2">{job.title}</h3>
                  <p className="text-sm text-gray-600 font-medium mb-4 leading-relaxed max-w-3xl">{job.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, idx) => (
                      <span key={idx} className="text-xs bg-[#FAF8F2] text-gray-700 font-medium px-3 py-1 rounded-lg border border-[#E0DDD2]/80">
                        • {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setSubmitted(false);
                      setErrorMessage('');
                    }}
                    className="w-full md:w-auto px-6 py-3 rounded-full bg-[#14291E] hover:bg-[#D99B00] text-white hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-md"
                  >
                    Apply Now <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-10 shadow-2xl border border-black/10 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => {
                  setSelectedJob(null);
                  setErrorMessage('');
                }}
                className="absolute top-6 right-6 text-gray-400 hover:text-black font-bold text-xl w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                ✕
              </button>

              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-black text-[#14291E] mb-2">Application Submitted!</h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
                    Thank you for applying for <strong>{selectedJob.title}</strong>. Your profile has been transmitted to Web3Forms and our recruitment team will reach out via email.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedJob(null);
                      setSubmitted(false);
                    }}
                    className="px-6 py-3 rounded-full bg-[#14291E] text-white font-extrabold text-xs uppercase tracking-wider"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#D99B00] tracking-wider">APPLY FOR ROLE</span>
                    <h3 className="text-2xl font-extrabold text-[#14291E] mt-1">{selectedJob.title}</h3>
                    <p className="text-xs text-gray-500">{selectedJob.department} • {selectedJob.location}</p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={applicantForm.name}
                        onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={applicantForm.email}
                        onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={applicantForm.phone}
                        onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">LinkedIn / Portfolio URL *</label>
                      <input
                        type="url"
                        required
                        placeholder="https://linkedin.com/in/username"
                        value={applicantForm.portfolio}
                        onChange={(e) => setApplicantForm({ ...applicantForm, portfolio: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Why DigiToomasha? (Brief Note)</label>
                    <textarea
                      rows={3}
                      placeholder="Share a short summary of your background and key achievements..."
                      value={applicantForm.coverNote}
                      onChange={(e) => setApplicantForm({ ...applicantForm, coverNote: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#1E3A2B] focus:ring-1 focus:ring-[#1E3A2B] text-sm outline-none resize-none"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#14291E] text-white hover:bg-[#D99B00] hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
