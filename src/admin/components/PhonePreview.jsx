import CrossAura from '../../components/CrossAura';
import AltarCandle from '../../components/AltarCandle';
import NerchapettiBox from '../../components/NerchapettiBox';
import RoseWindow from '../../components/RoseWindow';
import { MONEY } from '../../data/money';

const SAMPLE = {
  churchName: "St. Mary's Metropolitan Cathedral",
  churchNameMl: "സെന്റ് മേരീസ് കത്തീഡ്രൽ",
  upiId: 'stmaryscathedral@upi',
  receipt: 'NP-K3M9QW2',
  amount: 350,
};

const COINS = [1, 2, 5, 10, 20];
const NOTES = [50, 100, 200, 500];

function WelcomeMock() {
  return (
    <>
      <div className="flex justify-center shrink-0">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span className="text-[7.5px] uppercase tracking-wider text-blue-200">{SAMPLE.churchName}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-2.5">
        <div className="relative flex items-center justify-center">
          <AltarCandle height={40} className="absolute -left-6" />
          <div className="relative w-16 h-16 flex items-center justify-center">
            <CrossAura className="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
          </div>
          <AltarCandle height={40} className="absolute -right-6" />
        </div>

        <div className="text-center">
          <p className="font-malayalam text-xs font-bold text-white tracking-wide">നേർച്ചപ്പെട്ടി</p>
          <p className="mt-0.5 text-[6.5px] uppercase tracking-[0.24em] text-blue-200/80">Digital Church Offering</p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-slate-900/60 border border-blue-400/30 backdrop-blur-md">
          <p className="font-malayalam text-[8px] text-blue-100">“സന്തോഷത്തോടെ കൊടുക്കുന്നവനെ ദൈവം സ്നേഹിക്കുന്നു”</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className="w-28 h-[2px] rounded-full bg-blue-400/20 overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-600 via-sky-300 to-white" />
        </div>
        <p className="text-[7px] text-blue-200/60 font-malayalam">സ്തോത്രക്കാഴ്ച · Digital Parish Console</p>
      </div>
    </>
  );
}

function NerchapettiMock() {
  return (
    <>
      <div className="flex items-center justify-between shrink-0">
        <span className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-400/30" />
        <span className="text-[7px] uppercase tracking-[0.26em] text-blue-200">Nerchapetti</span>
        <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40" />
      </div>

      <div className="pt-1 text-center shrink-0">
        <p className="font-malayalam text-[8px] leading-tight text-blue-50">
          നിന്റെ സമർപ്പണവും പ്രാർത്ഥനയും ദൈവസന്നിധിയിൽ സ്മരിക്കപ്പെട്ടിരിക്കുന്നു
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col justify-center items-center gap-1.5">
        <div className="w-28">
          <NerchapettiBox />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-malayalam text-[7px] text-blue-200/70">ആകെ</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-950/60 border border-blue-400/30 font-cinzel text-[10px] font-bold text-white">
            ₹{SAMPLE.amount}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 shrink-0">
        <div className="grid grid-cols-5 gap-1">
          {COINS.map((v) => (
            <img key={v} src={MONEY[v].src} alt="" className="w-full object-contain" />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1">
          {NOTES.map((v) => (
            <img key={v} src={MONEY[v].src} alt="" className="w-full object-contain" />
          ))}
        </div>
        <div className="w-full py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-center font-malayalam text-[9px] font-semibold text-white shadow-xs">
          സമർപ്പിക്കുക
        </div>
      </div>
    </>
  );
}

function ThanksgivingMock() {
  return (
    <>
      <div className="flex items-center justify-between shrink-0">
        <span className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-400/30" />
        <span className="text-[7px] uppercase tracking-[0.26em] text-blue-200">Thanksgiving</span>
        <span className="w-5 h-5 flex items-center justify-center text-sky-400 text-xs">†</span>
      </div>

      <div className="pt-1 text-center shrink-0">
        <p className="font-malayalam text-[8px] leading-tight text-blue-50">സ്തോത്രക്കാഴ്ച സ്വീകരിക്കപ്പെട്ടു</p>
        <p className="mt-0.5 text-[5.5px] uppercase tracking-[0.2em] text-sky-300">Offering Blessed & Received</p>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <RoseWindow className="absolute inset-0 w-full h-full opacity-60" />
          <CrossAura className="relative w-12 h-12" />
        </div>
      </div>

      <div className="space-y-1.5 shrink-0">
        <div className="rounded-xl overflow-hidden border border-blue-400/25 bg-slate-950/60 p-2">
          <div className="text-[6.5px] text-white font-medium truncate mb-1">{SAMPLE.churchName}</div>
          <div className="flex items-center justify-between">
            <span className="text-[6px] uppercase tracking-[0.18em] text-blue-200/60">Total</span>
            <span className="font-cinzel text-[12px] font-bold text-white">₹{SAMPLE.amount}</span>
          </div>
          <div className="flex items-center justify-between text-[6px] text-blue-200/50 mt-1">
            <span>UPI</span>
            <span>{SAMPLE.upiId}</span>
          </div>
        </div>
        <div className="w-full py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-center font-malayalam text-[9px] font-semibold text-white">
          മറ്റൊരു സമർപ്പണം
        </div>
      </div>
    </>
  );
}

const SCREENS = { welcome: WelcomeMock, nerchapetti: NerchapettiMock, thanksgiving: ThanksgivingMock };

export default function PhonePreview({ screen = 'welcome', caption }) {
  const Active = SCREENS[screen] ?? WelcomeMock;

  return (
    <div className="flex flex-col items-center">
      {/* Phone Shell */}
      <div className="relative w-[210px] h-[430px] rounded-[36px] bg-slate-950 p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] border-2 border-slate-700/60 flex flex-col justify-between overflow-hidden">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-slate-900 z-30 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
        </div>

        {/* Ambient Screen Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0b1329] to-[#030712] z-0" />

        {/* Screen Content */}
        <div className="relative z-10 w-full h-full pt-4 flex flex-col justify-between text-white">
          <Active />
        </div>
      </div>

      {caption && <p className="mt-2.5 text-[11px] font-medium text-slate-500 text-center">{caption}</p>}
    </div>
  );
}
