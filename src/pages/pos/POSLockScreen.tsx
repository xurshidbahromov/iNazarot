import { useState, useEffect } from 'react';
import { Lock, ShieldCheck, X, KeyRound, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { cn } from '../../utils/cn';

const PIN_STORAGE_KEY = 'pos_pin';
const DEFAULT_PIN = '1234';

function getStoredPin(): string {
  return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
}

function savePin(pin: string) {
  localStorage.setItem(PIN_STORAGE_KEY, pin);
}

// ── Change PIN Modal ──────────────────────────────────────────────────────────

interface ChangePinModalProps {
  onClose: () => void;
}

type ChangePinStep = 'current' | 'new' | 'confirm';

function ChangePinModal({ onClose }: ChangePinModalProps) {
  const [step, setStep] = useState<ChangePinStep>('current');
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const stepLabels: Record<ChangePinStep, string> = {
    current: "Joriy PIN-kodni kiriting",
    new: "Yangi PIN-kodni kiriting",
    confirm: "Yangi PIN-kodni tasdiqlang",
  };

  const stepSubtitels: Record<ChangePinStep, string> = {
    current: "Avval joriy 4 xonali PIN-kodingizni kiriting",
    new: "4 ta raqamdan iborat yangi PIN-kod tanlang",
    confirm: "Yangi PIN-kodni qayta kiriting",
  };

  const handleKeyClick = (key: string) => {
    if (pin.length < 4 && !success) {
      setPin(prev => prev + key);
    }
  };

  const handleBackspace = () => {
    if (!success) setPin(prev => prev.slice(0, -1));
  };

  const shakeAndReset = () => {
    setError(true);
    setTimeout(() => {
      setPin('');
      setError(false);
    }, 500);
  };

  useEffect(() => {
    if (pin.length !== 4) return;

    if (step === 'current') {
      if (pin === getStoredPin()) {
        setTimeout(() => { setStep('new'); setPin(''); }, 300);
      } else {
        shakeAndReset();
      }
    } else if (step === 'new') {
      setTimeout(() => { setNewPin(pin); setStep('confirm'); setPin(''); }, 300);
    } else if (step === 'confirm') {
      if (pin === newPin) {
        setSuccess(true);
        savePin(pin);
        setTimeout(() => onClose(), 900);
      } else {
        shakeAndReset();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-xl">
      <div className={cn(
        "relative bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/20 w-full max-w-[380px] flex flex-col items-center transition-all duration-300",
        error && "animate-shake border-red-500/50",
        success && "border-emerald-500/60"
      )}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Back button for step !== current */}
        {step !== 'current' && !success && (
          <button
            onClick={() => { setStep(step === 'confirm' ? 'new' : 'current'); setPin(''); }}
            className="absolute top-5 left-5 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Step indicator dots */}
        <div className="flex gap-2 mb-7 mt-2">
          {(['current', 'new', 'confirm'] as ChangePinStep[]).map((s, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                step === s ? "w-6 bg-white" : success ? "w-3 bg-emerald-400" : "w-3 bg-white/30"
              )}
            />
          ))}
        </div>

        {/* Icon */}
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-inner transition-all duration-300",
          success ? "bg-emerald-500 text-white" : "bg-white/10 text-white border border-white/20"
        )}>
          {success ? (
            <ShieldCheck className="w-10 h-10 animate-in zoom-in duration-300" />
          ) : (
            <KeyRound className="w-10 h-10" />
          )}
        </div>

        <h2 className="text-xl font-bold text-white mb-1.5 text-center">
          {success ? "PIN muvaffaqiyatli o'zgartirildi!" : stepLabels[step]}
        </h2>
        <p className="text-white/55 text-sm mb-9 text-center font-medium max-w-[240px] leading-relaxed">
          {success ? "Yangi PIN-kodingiz saqlandi" : stepSubtitels[step]}
        </p>

        {/* PIN Indicators */}
        <div className="flex gap-5 mb-9 items-center relative">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={cn(
                "transition-all duration-300",
                showPin && pin.length > i
                  ? "text-white text-2xl font-black -mt-1 leading-none"
                  : pin.length > i
                    ? (error ? "w-4 h-4 rounded-full bg-red-500 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                      : success ? "w-4 h-4 rounded-full bg-emerald-400 scale-125 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                        : "w-4 h-4 rounded-full bg-white scale-125 shadow-[0_0_15px_rgba(255,255,255,0.5)]")
                    : "w-4 h-4 rounded-full bg-white/20"
              )}
            >
              {showPin && pin.length > i ? pin[i] : null}
            </div>
          ))}
          {/* Show/Hide toggle */}
          <button
            onClick={() => setShowPin(v => !v)}
            className="absolute -right-10 text-white/40 hover:text-white/80 transition-colors"
          >
            {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

         {/* Numpad */}
        {!success && (
          <div className="grid grid-cols-3 gap-x-6 gap-y-4 w-full px-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleKeyClick(num.toString())}
                className="h-16 w-16 mx-auto rounded-full bg-white/5 hover:bg-white/20 active:bg-white/30 text-2xl font-medium text-white transition-all duration-100 active:scale-[0.90] active:translate-y-px"
              >
                {num}
              </button>
            ))}
            <div className="h-16 w-16 mx-auto" />
            <button
              onClick={() => handleKeyClick('0')}
              className="h-16 w-16 mx-auto rounded-full bg-white/5 hover:bg-white/20 active:bg-white/30 text-2xl font-medium text-white transition-all duration-100 active:scale-[0.90] active:translate-y-px"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="h-16 w-16 mx-auto rounded-full bg-white/5 hover:bg-white/20 active:bg-white/30 text-white/80 hover:text-white transition-all duration-100 flex items-center justify-center active:scale-[0.90] active:translate-y-px"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Lock Screen ──────────────────────────────────────────────────────────

interface POSLockScreenProps {
  onUnlock: () => void;
}

export default function POSLockScreen({ onUnlock }: POSLockScreenProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [isChangePinOpen, setIsChangePinOpen] = useState(false);

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === getStoredPin()) {
        setUnlocked(true);
        setTimeout(() => { onUnlock(); }, 600);
      } else {
        setError(true);
        setTimeout(() => { setPin(''); setError(false); }, 500);
      }
    }
  }, [pin, onUnlock]);

  const handleKeyClick = (key: string) => {
    if (pin.length < 4 && !unlocked) {
      setPin(prev => prev + key);
    }
  };

  const handleBackspace = () => {
    if (!unlocked) setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className={cn(
      "fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-2xl flex flex-col items-center justify-center transition-opacity duration-500",
      unlocked ? "opacity-0 pointer-events-none" : "opacity-100"
    )}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900/80 to-slate-800/90 mix-blend-multiply" />
      </div>

      {/* Close button */}
      <button
        onClick={() => window.close()}
        className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-95 z-20"
        title="Oynani yopish"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Change PIN button */}
      <button
        onClick={() => setIsChangePinOpen(true)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white rounded-full backdrop-blur-md transition-all text-sm font-medium z-20"
      >
        <KeyRound className="w-4 h-4" />
        PIN-kodni o'zgartirish
      </button>

      <div className={cn(
        "relative z-10 bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/20 w-full max-w-[380px] flex flex-col items-center transition-all duration-500",
        unlocked ? "scale-110 opacity-0 blur-md" : "scale-100",
        error ? "animate-shake border-red-500/50 shadow-red-500/20" : ""
      )}>
        
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner transition-colors duration-300",
          unlocked ? "bg-emerald-500 text-white" : "bg-white/10 text-white border border-white/20"
        )}>
          {unlocked ? (
            <ShieldCheck className="w-10 h-10 animate-in zoom-in duration-300" />
          ) : (
            <Lock className="w-10 h-10" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 text-center tracking-wide">POS Terminal</h2>
        <p className="text-white/60 text-sm mb-10 text-center font-medium">Tizimga kirish uchun PIN-kodni kiriting</p>

        {/* PIN Indicators */}
        <div className="flex gap-5 mb-10">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-300",
                pin.length > i
                  ? (error ? "bg-red-500 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "bg-white scale-125 shadow-[0_0_15px_rgba(255,255,255,0.5)]")
                  : "bg-white/20"
              )}
            />
          ))}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 w-full px-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handleKeyClick(num.toString())}
              className="h-16 w-16 mx-auto rounded-full bg-white/5 hover:bg-white/20 active:bg-white/30 text-2xl font-medium text-white transition-all duration-100 active:scale-[0.90] active:translate-y-px"
            >
              {num}
            </button>
          ))}
          <div className="h-16 w-16 mx-auto"></div>
          <button
            onClick={() => handleKeyClick('0')}
            className="h-16 w-16 mx-auto rounded-full bg-white/5 hover:bg-white/20 active:bg-white/30 text-2xl font-medium text-white transition-all duration-100 active:scale-[0.90] active:translate-y-px"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="h-16 w-16 mx-auto rounded-full bg-white/5 hover:bg-white/20 active:bg-white/30 text-white/80 hover:text-white transition-all duration-100 flex items-center justify-center active:scale-[0.90] active:translate-y-px"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Change PIN Modal */}
      {isChangePinOpen && (
        <ChangePinModal
          onClose={() => setIsChangePinOpen(false)}
        />
      )}
    </div>
  );
}
