import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Scale, 
  Activity, 
  ShieldAlert, 
  FileCheck2, 
  MapPin, 
  BookOpen, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { WELFARE_SCHEMES_DATABASE } from '../data/welfareSchemes';
import { DISTRICT_AUDIT_DATA } from '../data/districtData';
import { INITIAL_GRIEVANCES } from '../data/mockGrievances';
import { LEGAL_PROTECTION_ACTS } from '../data/legalGuideData';
import { GROUND_AUDIT_ASSETS } from '../data/mockGroundAudits';

export default function GlobalSearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Filter schemes
  const filteredSchemes = q ? WELFARE_SCHEMES_DATABASE.filter(s => 
    s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
  ) : WELFARE_SCHEMES_DATABASE.slice(0, 2);

  // Filter districts
  const filteredDistricts = q ? DISTRICT_AUDIT_DATA.filter(d => 
    d.district.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)
  ) : DISTRICT_AUDIT_DATA.slice(0, 2);

  // Filter grievances
  const filteredGrievances = q ? INITIAL_GRIEVANCES.filter(g => 
    g.ticketId.toLowerCase().includes(q) || g.category.toLowerCase().includes(q)
  ) : INITIAL_GRIEVANCES.slice(0, 2);

  // Filter laws
  const filteredLaws = q ? LEGAL_PROTECTION_ACTS.filter(l => 
    l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q)
  ) : LEGAL_PROTECTION_ACTS.slice(0, 2);

  const handleSelect = (moduleId, extra = {}) => {
    onNavigate(moduleId, extra);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fadeIn">
      <div className="bg-white dark:bg-navy-900 border-2 border-amber-300 dark:border-slate-700 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-scaleUp">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-amber-200 dark:border-slate-800 flex items-center space-x-3 bg-amber-50/70 dark:bg-slate-950/40">
          <Search className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search schemes, districts, tracking tokens (#SD-8921-X), or legal articles..."
            className="flex-1 bg-transparent border-none text-sm text-slate-900 dark:text-white placeholder-slate-500 font-medium focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="text-xs text-slate-500 hover:text-slate-800 p-1 font-bold"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono bg-white text-amber-950 px-2 py-0.5 rounded-lg border border-amber-300 font-bold shadow-2xs">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-xl hover:bg-amber-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs divide-y divide-amber-100 dark:divide-slate-800/80">
          
          {/* Schemes section */}
          {filteredSchemes.length > 0 && (
            <div className="pt-2 first:pt-0 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-400 flex items-center space-x-1">
                <Scale className="w-3.5 h-3.5" />
                <span>Welfare Schemes & Free Quotas</span>
              </span>
              <div className="space-y-1">
                {filteredSchemes.map(sch => (
                  <button
                    key={sch.id}
                    onClick={() => handleSelect('module1')}
                    className="w-full text-left p-3 rounded-2xl hover:bg-amber-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between group border border-transparent hover:border-amber-200"
                  >
                    <div>
                      <div className="font-black text-slate-900 dark:text-white group-hover:text-amber-800">
                        {sch.name}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                        {sch.category} • Min Score: {sch.minScore}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Districts section */}
          {filteredDistricts.length > 0 && (
            <div className="pt-3 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-400 flex items-center space-x-1">
                <Activity className="w-3.5 h-3.5" />
                <span>District Transparency & Fund Delivery</span>
              </span>
              <div className="space-y-1">
                {filteredDistricts.map(dist => (
                  <button
                    key={dist.id}
                    onClick={() => handleSelect('module2')}
                    className="w-full text-left p-3 rounded-2xl hover:bg-amber-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between group border border-transparent hover:border-amber-200"
                  >
                    <div>
                      <div className="font-black text-slate-900 dark:text-white">
                        {dist.district}, {dist.state}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                        Sanctioned: ₹{dist.sanctioned} Cr • Disbursed: ₹{dist.disbursed} Cr ({dist.deliveryRate.toFixed(1)}%)
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-950 border border-amber-300">
                      {dist.healthStatus.replace('_', ' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Whistleblower Tickets */}
          {filteredGrievances.length > 0 && (
            <div className="pt-3 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 dark:text-rose-400 flex items-center space-x-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Anonymous Whistleblower Docket</span>
              </span>
              <div className="space-y-1">
                {filteredGrievances.map(g => (
                  <button
                    key={g.ticketId}
                    onClick={() => handleSelect('module3')}
                    className="w-full text-left p-3 rounded-2xl hover:bg-amber-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between group border border-transparent hover:border-amber-200"
                  >
                    <div>
                      <div className="font-mono font-black text-amber-950 dark:text-teal-300">
                        {g.ticketId}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate max-w-md font-medium">
                        {g.category} ({g.district})
                      </div>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-rose-100 text-rose-950 border border-rose-300">
                      {g.status.replace('_', ' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Legal Acts */}
          {filteredLaws.length > 0 && (
            <div className="pt-3 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Constitutional Protections & Legal Clauses</span>
              </span>
              <div className="space-y-1">
                {filteredLaws.map(law => (
                  <button
                    key={law.id}
                    onClick={() => handleSelect('module5')}
                    className="w-full text-left p-3 rounded-2xl hover:bg-amber-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between group border border-transparent hover:border-amber-200"
                  >
                    <div>
                      <div className="font-black text-slate-900 dark:text-white">
                        {law.title}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                        {law.shortCode}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer tip */}
        <div className="p-3 bg-amber-50/70 border-t border-amber-200 text-[11px] text-amber-950 font-medium flex items-center justify-between">
          <span>Search any scheme, district, or complaint token</span>
          <span className="font-mono text-[10px] font-bold">Press ESC to exit</span>
        </div>

      </div>
    </div>
  );
}
