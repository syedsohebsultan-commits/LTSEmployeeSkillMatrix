
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, trendUp }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        {trend && (
          <p className={`text-xs mt-2 flex items-center ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trendUp ? '↑' : '↓'} <span className="ml-1">{trend} since last month</span>
          </p>
        )}
      </div>
      <div className="p-3 bg-gray-50 rounded-lg text-gray-600">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;