import React from 'react';
import {
  Database,
  AppWindow,
  Box,
  Layout,
  ChevronUp,
  ChevronDown,
  Copy,
  Trash,
  MoreVertical,
} from 'lucide-react';

const cardData = [
  {
    icon: <Database className="h-6 w-6 stroke-[1] fill-white/10 text-white" />,
    count: '247,220',
    change: '12%',
    trendIcon: <ChevronUp className="ml-px h-4 w-4 stroke-[1.5]" />,
    label: 'Customer Engagement',
    bgGradient: 'from-theme-2/90 to-theme-1/[0.85]',
    borderColor: 'border-white/10',
    backgroundColor: 'bg-white/10',
    statColor: 'border-success/50 bg-success/50 text-white/90',
    textColor: 'text-white',
    subTextColor: 'text-white/70',
    gradientOverlay: true,
  },
  {
    icon: <AppWindow className="h-6 w-6 stroke-[1] fill-primary/10 text-primary" />,
    count: '124,625',
    change: '3%',
    trendIcon: <ChevronDown className="ml-px h-4 w-4 stroke-[1.5]" />,
    label: 'Lead Generation',
    borderColor: 'border-primary/10',
    backgroundColor: 'bg-primary/10',
    statColor: 'border-danger/50 bg-danger/70 text-white/90',
    textColor: 'text-slate-800',
    subTextColor: 'text-slate-500',
  },
  {
    icon: <Box className="h-6 w-6 stroke-[1] fill-info/10 text-info" />,
    count: '749,220',
    change: '4%',
    trendIcon: <ChevronUp className="ml-px h-4 w-4 stroke-[1.5]" />,
    label: 'Support Tickets',
    borderColor: 'border-info/10',
    backgroundColor: 'bg-info/10',
    statColor: 'border-success/50 bg-success/70 text-white/90',
    textColor: 'text-slate-800',
    subTextColor: 'text-slate-500',
  },
  {
    icon: <Layout className="h-6 w-6 stroke-[1] fill-primary/10 text-primary" />,
    count: '273,235',
    change: '9%',
    trendIcon: <ChevronUp className="ml-px h-4 w-4 stroke-[1.5]" />,
    label: 'Pipeline Management',
    borderColor: 'border-primary/10',
    backgroundColor: 'bg-primary/10',
    statColor: 'border-success/50 bg-success/70 text-white/90',
    textColor: 'text-slate-800',
    subTextColor: 'text-slate-500',
  },
];

const DashboardCards = () => {
  return (
    <div className="grid w-full grid-cols-4 gap-2">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`relative col-span-4 flex-1 overflow-hidden rounded-[0.6rem] border ${
            index === 0 ? 'border-0' : ''
          } ${index === 0 ? 'bg-slate-50 bg-gradient-to-b ' + card.bgGradient : 'bg-slate-50/50'} p-5 sm:col-span-2 xl:col-span-1`}
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-full border ${card.borderColor} ${card.backgroundColor}`}>
            {card.icon}
          </div>

          <div className="mt-12 flex items-center">
            <div className={`text-2xl font-medium ${card.textColor}`}>{card.count}</div>
            <div className={`ml-3.5 flex items-center rounded-full ${card.statColor} py-[2px] pl-[7px] pr-1 text-xs font-medium`}>
              {card.change}
              {card.trendIcon}
            </div>
          </div>

          <div className={`mt-1 text-base ${card.subTextColor}`}>{card.label}</div>

          {/* Dropdown */}
          <div className="dropdown absolute right-0 top-0 mr-5 mt-5">
            <button className="cursor-pointer h-5 w-5 text-slate-500">
              <MoreVertical className={`h-6 w-6 stroke-[1] ${index === 0 ? 'fill-white/70 stroke-white/70' : 'fill-slate-400/70 stroke-slate-400/70'}`} />
            </button>
            <div className="dropdown-menu absolute z-[9999] hidden">
              <div className="dropdown-content w-40 rounded-md border-transparent bg-white p-2 shadow-[0px_3px_10px_#00000017] dark:border-transparent dark:bg-darkmode-600">
                <a className="dropdown-item flex cursor-pointer items-center rounded-md p-2 transition duration-300 ease-in-out hover:bg-slate-200/60 dark:hover:bg-darkmode-400">
                  <Copy className="mr-2 h-4 w-4 stroke-[1]" />
                  Copy Link
                </a>
                <a className="dropdown-item flex cursor-pointer items-center rounded-md p-2 transition duration-300 ease-in-out hover:bg-slate-200/60 dark:hover:bg-darkmode-400">
                  <Trash className="mr-2 h-4 w-4 stroke-[1]" />
                  Delete
                </a>
              </div>
            </div>
          </div>

          {/* Gradient Overlay for first card */}
          {card.gradientOverlay && (
            <div className="pointer-events-none absolute right-0 top-0 -mr-[62%] h-[130%] w-full rotate-45 bg-gradient-to-b from-black/[0.15] to-transparent content-['']" />
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
