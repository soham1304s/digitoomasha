import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';

export const LandingFooter = () => {
  return (
    <footer className="bg-[#14291E] text-white pt-20 pb-10 px-6 md:px-12 border-t border-white/10 relative z-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tighter uppercase mb-4 text-[#D99B00]">
                DIGITOOMASHA
              </h2>
              <p className="text-white/70 text-sm max-w-sm font-medium leading-relaxed">
                A modern digital growth, marketing, branding, AI, automation, and technology studio.
              </p>
            </div>
            <div className="mt-8">
              <a 
                href="mailto:info@digitoomasha.com" 
                className="text-lg md:text-2xl font-extrabold tracking-tight text-white hover:text-[#D99B00] transition-colors inline-flex items-center gap-2 text-decoration-none"
              >
                info@digitoomasha.com
                <ArrowUpRight className="w-5 h-5 text-[#D99B00]" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-6">// LOCATION</h4>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <MapPin className="w-5 h-5 text-[#D99B00] flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wide">Jaipur Headquarters</h5>
                <p className="text-xs text-white/75 leading-relaxed font-medium">
                  21, Mahapura, 200ft SEZ Road, Mahapura Rd, near Mahindra SEZ, Jaipur, Rajasthan 302026
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-6">// NAVIGATION</h4>
            <ul className="flex flex-col gap-3.5 p-0 list-none m-0">
              {[
                { label: 'Work', to: '/work' },
                { label: 'Services', to: '/services' },
                { label: 'About', to: '/about' },
                { label: 'Articles', to: '/articles' },
                { label: 'Jobs', to: '/jobs' },
                { label: 'Contact', to: '/contact' }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-[#D99B00] transition-colors text-decoration-none">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-6">// CONNECT</h4>
            <ul className="flex flex-col gap-3.5 p-0 list-none m-0">
              {['LinkedIn', 'Instagram', 'X', 'GitHub'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-[#D99B00] transition-colors inline-flex items-center justify-between w-full text-decoration-none">
                    {item}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-white/50">
          <p>© 2026 DigiToomasha. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors text-decoration-none">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
