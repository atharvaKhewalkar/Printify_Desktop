import { Printer, Inbox, History, Settings } from 'lucide-react';

export const menuItems = [
  {
    title: 'Print Management',
    items: [
      {
        key: 'incoming',
        name: 'Incoming Jobs',
        to: '/incoming-jobs',
        icon: <Inbox size={20} />,
      },
      {
        key: 'queue',
        name: 'Print Queue',
        to: '/queue',
        icon: <Printer size={20} />,
      },
      {
        key: 'history',
        name: 'History & Earning',
        to: '/history',
        icon: <History size={20} />,
      },
    ],
  },
  {
    title: 'Configuration',
    items: [
      {
        key: 'settings',
        name: 'Settings',
        to: '/settings',
        icon: <Settings size={20} />,
      },
    ],
  },
];