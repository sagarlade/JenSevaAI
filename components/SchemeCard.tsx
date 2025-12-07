import React from 'react';
import { Scheme } from '../types';
import { ExternalLink, CheckCircle2, Sprout, GraduationCap, HeartPulse, Home, Baby, Users } from 'lucide-react';

interface SchemeCardProps {
  scheme: Scheme;
}

const getSectorIcon = (sector: string) => {
  switch (sector) {
    case 'Agriculture': return <Sprout className="w-5 h-5 text-green-600" />;
    case 'Education': return <GraduationCap className="w-5 h-5 text-blue-600" />;
    case 'Health': return <HeartPulse className="w-5 h-5 text-red-600" />;
    case 'Housing': return <Home className="w-5 h-5 text-orange-600" />;
    case 'Women & Child': return <Baby className="w-5 h-5 text-pink-600" />;
    default: return <Users className="w-5 h-5 text-gray-600" />;
  }
};

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden mb-3">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-gray-50 rounded-lg">
              {getSectorIcon(scheme.sector)}
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {scheme.sector}
            </span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">
          {scheme.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {scheme.description}
        </p>

        <div className="space-y-3 mb-4 bg-blue-50/50 p-3 rounded-lg">
          <div>
            <h4 className="text-xs font-semibold text-gray-700 uppercase mb-1">Benefits</h4>
            <p className="text-sm text-blue-800 font-medium">{scheme.benefits}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-700 uppercase mb-1">Eligibility Criteria</h4>
             <ul className="text-xs text-gray-600 space-y-1">
              {scheme.eligibility.slice(0, 2).map((crit, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  {crit}
                </li>
              ))}
              {scheme.eligibility.length > 2 && (
                <li className="text-gray-400 text-[10px] pl-5">+ {scheme.eligibility.length - 2} more criteria</li>
              )}
            </ul>
          </div>
        </div>

        <a 
          href={scheme.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          View Details & Apply
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
};
