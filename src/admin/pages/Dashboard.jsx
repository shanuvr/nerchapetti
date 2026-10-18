import { useState, useMemo } from 'react';
import {
  Download,
  IndianRupee,
  RefreshCw,
  Smartphone,
  TrendingUp,
  Users,
  Wifi,
  Clock,
  Filter,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionCard from '../components/SectionCard';
import StatCard from '../components/StatCard';
import { DataTable, Pill } from '../components/DataTable';
import { Button } from '../components/Controls';

const ROWS = [
  ['#NP-4821', '₹500', 'Today, 10:42 AM', 'UPI', 'Success'],
  ['#NP-4820', '₹200', 'Today, 10:31 AM', 'UPI', 'Success'],
  ['#NP-4819', '₹1,000', 'Today, 10:18 AM', 'UPI', 'Success'],
  ['#NP-4818', '₹100', 'Today, 09:57 AM', 'Cash', 'Success'],
  ['#NP-4817', '₹2,000', 'Today, 09:44 AM', 'UPI', 'Pending'],
  ['#NP-4816', '₹50', 'Today, 09:12 AM', 'UPI', 'Failed'],
  ['#NP-4815', '₹500', 'Today, 08:50 AM', 'UPI', 'Success'],
  ['#NP-4813', '₹100', 'Today, 07:15 AM', 'UPI', 'Success'],
];

const DENOM = [
  { label: '₹10', pct: 84 },
  { label: '₹20', pct: 65 },
  { label: '₹50', pct: 78 },
  { label: '₹100', pct: 58 },
  { label: '₹200', pct: 42 },
  { label: '₹500', pct: 28 },
];

const WEEK = [
  { day: 'Mon', value: 1840 },
  { day: 'Tue', value: 2480 },
  { day: 'Wed', value: 2150 },
  { day: 'Thu', value: 3920 },
  { day: 'Fri', value: 5260 },
  { day: 'Sat', value: 6840 },
  { day: 'Sun (Mass)', value: 9410 },
];

const PEAK = Math.max(...WEEK.map((d) => d.value));

export default function Dashboard() {
  const [filter, setFilter] = useState('All');

  const filteredRows = useMemo(() => {
    if (filter === 'All') return ROWS;
    return ROWS.filter((r) => r[4] === filter);
  }, [filter]);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Dashboard & Thanksgiving Audit"
        subtitle="Live overview of today's Nerchapetti offerings and the health of your church kiosk."
        actions={
          <>
            <Button variant="ghost" icon={RefreshCw}>
              Refresh
            </Button>
            <Button variant="primary" icon={Download}>
              Export Audit
            </Button>
          </>
        }
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Today's Offerings" value="₹14,460" change="+18% vs last week" icon={IndianRupee} tone="blue" />
        <StatCard title="Total Devotees" value="284" change="Average ₹51 per donor" icon={Users} tone="emerald" />
        <StatCard title="Success Rate" value="98.2%" change="248 successful transactions" icon={TrendingUp} tone="indigo" />
        <StatCard title="Active Kiosks" value="02 Online" change="Main Portal & Lady Chapel" icon={Smartphone} tone="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly Chart */}
        <div className="lg:col-span-2">
          <SectionCard title="Weekly Thanksgiving Growth" description="Daily collections reaching peak during Sunday Holy Qurbana.">
            <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 px-2">
              {WEEK.map((item) => {
                const heightPct = Math.round((item.value / PEAK) * 100);
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-semibold text-slate-600">₹{item.value}</span>
                    <div className="w-full max-w-[34px] rounded-t-lg bg-blue-100 hover:bg-blue-600 transition-colors relative flex items-end justify-center" style={{ height: `${heightPct}%` }}>
                      <div className="w-full rounded-t-lg bg-blue-600 h-full opacity-90" />
                    </div>
                    <span className="text-[9.5px] font-medium text-slate-500 truncate w-full text-center">{item.day}</span>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        {/* Denomination Breakdown */}
        <div>
          <SectionCard title="Popular Offerings" description="Relative frequency of coins & banknotes offered.">
            <div className="space-y-3 pt-1">
              {DENOM.map((d) => (
                <div key={d.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{d.label}</span>
                    <span className="text-slate-500">{d.pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Transactions Audit Table */}
      <SectionCard title="Recent Offerings Log" description="Auditable records of parishioner offerings received.">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-600">Filter status:</span>
          {['All', 'Success', 'Pending', 'Failed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                filter === status
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <DataTable
          headers={['Receipt No.', 'Amount', 'Time', 'Method', 'Status']}
          rows={filteredRows.map(([id, amt, time, method, status]) => [
            <span key="1" className="font-mono font-semibold text-blue-700">{id}</span>,
            <span key="2" className="font-cinzel font-bold text-slate-900">{amt}</span>,
            <span key="3" className="text-slate-500">{time}</span>,
            <span key="4" className="text-slate-600 font-medium">{method}</span>,
            <Pill
              key="5"
              tone={status === 'Success' ? 'emerald' : status === 'Pending' ? 'amber' : 'rose'}
            >
              {status}
            </Pill>,
          ])}
        />
      </SectionCard>
    </div>
  );
}
