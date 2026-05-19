
import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group glass-card p-8 rounded-[2rem] hover-glow transition-all duration-500 flex flex-col items-start">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#ffffff]/10 transition-colors">
        <i className={`${icon} text-lg text-white/40 group-hover:text-[#ffffff] transition-colors`}></i>
      </div>
      <h3 className="font-header text-2xl font-semibold mb-4 tracking-tight">
        {title}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed font-normal group-hover:text-white/60 transition-colors">
        {description}
      </p>
      <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-white/20 group-hover:text-[#ffffff] transition-colors">
        Read Specification <i className="fa-solid fa-chevron-right text-[8px]"></i>
      </div>
    </div>
  );
};
