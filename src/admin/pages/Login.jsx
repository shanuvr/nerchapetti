import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Lock, ShieldCheck, User, Church } from 'lucide-react';
import { CONTROL } from '../components/Field';

const HIGHLIGHTS = [
  'Parish profile, liturgical scriptures & parish UPI handles',
  'Real-time Nerchapetti offerings audit & Thanksgiving reports',
  'Parishioner live Holy Sanctuary view & audio preferences',
];

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-dvh w-full bg-[#f8fafc] text-slate-900 lg:grid lg:grid-cols-2">
      {/* Brand panel — desktop */}
      <aside className="relative hidden lg:flex flex-col justify-between border-r border-slate-200 bg-gradient-to-br from-blue-50/80 via-white to-blue-100/40 p-12 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-600/30 flex items-center justify-center shadow-md text-white font-bold text-xl">
            †
          </div>
          <div>
            <p className="font-malayalam text-xl font-bold text-slate-900 leading-tight">നേർച്ചപ്പെട്ടി</p>
            <p className="text-[10px] uppercase tracking-[0.24em] text-blue-700 font-semibold leading-tight mt-0.5">Parish Console</p>
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="font-cinzel text-3xl xl:text-4xl font-bold leading-tight text-slate-900">
            One console for every sacred church offering.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 font-normal">
            Manage your parish identity, thanksgiving donations, sanctuary darshan, and daily digital Nerchapetti offerings seamlessly.
          </p>

          <ul className="mt-8 space-y-3.5">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="font-malayalam text-sm text-blue-800/80 font-medium">നേർച്ചപ്പെട്ടി by Programmers</p>
      </aside>

      {/* Form */}
      <main className="relative flex flex-col justify-center px-5 sm:px-8 py-12 bg-white">
        <div className="mx-auto w-full max-w-[380px]">
          {/* Mobile brand header */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-500 flex items-center justify-center shadow-xs text-white font-bold text-lg">
              †
            </div>
            <div>
              <p className="font-malayalam text-lg font-bold text-slate-900 leading-tight">നേർച്ചപ്പെട്ടി</p>
              <p className="text-[9px] uppercase tracking-[0.24em] text-blue-700 font-bold leading-tight">Parish Console</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900">Parish Sign In</h2>
            <p className="text-xs text-slate-500 mt-1">Enter your parish credentials to manage your digital Nerchapetti.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/admin');
            }}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1 text-xs font-bold text-slate-700">Parish Email or ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  defaultValue="vicar@stmaryscathedral.org"
                  className={`${CONTROL} pl-9`}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  defaultValue="cathedral@2026"
                  className={`${CONTROL} pl-9 pr-9`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all cursor-pointer"
            >
              <span>Sign In to Parish Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-malayalam">സെന്റ് മേരീസ് കത്തീഡ്രൽ</span>
            <a href="/" className="text-blue-600 font-semibold hover:underline">
              Launch Kiosk →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
