import {
  Church,
  LayoutDashboard,
  MessageSquareQuote,
  Palette,
  Wallet,
} from 'lucide-react';

export const ADMIN_NAV = [
  {
    group: 'Overview',
    items: [{ to: '/admin', end: true, label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    group: 'Customise',
    items: [
      { to: '/admin/parish', label: 'Parish Profile', icon: Church },
      { to: '/admin/slogans', label: 'Scriptures & Sanctuary', icon: MessageSquareQuote },
      { to: '/admin/branding', label: 'Branding & Motion', icon: Palette },
    ],
  },
  {
    group: 'Payments',
    items: [
      { to: '/admin/payments', label: 'Payments / UPI', icon: Wallet },
    ],
  },
];

export const findNavItem = (pathname) => {
  const clean = pathname.replace(/\/$/, '') || '/admin';
  return ADMIN_NAV.flatMap((g) => g.items).find((i) => i.to === clean);
};
