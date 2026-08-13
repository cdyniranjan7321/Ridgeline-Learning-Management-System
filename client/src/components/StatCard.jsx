import React from 'react';

const StatCard = ({ label, value, accent = 'text-ink-900', icon }) => (
  <div className="card p-5 flex items-center gap-4">
    {icon && (
      <div className="h-11 w-11 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
        {icon}
      </div>
    )}
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/50">{label}</p>
      <p className={`text-2xl font-display font-bold ${accent}`}>{value}</p>
    </div>
  </div>
);

export default StatCard;
