import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { validateEmail } from '../../utils';

const spring = { type: 'spring' as const, mass: 0.5, stiffness: 120, damping: 14 };

export const NewsletterCard = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Email is required'); return; }
    if (!validateEmail(email)) { setError('Invalid email address'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null) as { error?: string } | null;
        throw new Error(data?.error ?? 'Failed to subscribe');
      }
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#18181B] to-[#09090B] p-8 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={20} className="text-[#8B5CF6]" />
        <span className="text-xs font-bold uppercase tracking-widest text-[#8B5CF6]">Exclusive Access</span>
      </div>

      <h3 className="text-3xl font-black uppercase tracking-tight text-[#FAFAFA] mb-3">
        Join the<br /><span className="text-[#EC4899]">Resistance</span>
      </h3>

      <ul className="space-y-2 mb-8">
        {[
          'Wig styling blueprints',
          'Custom makeup tutorials',
          'Local convention schedules',
        ].map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            {item}
          </li>
        ))}
      </ul>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="flex items-center gap-3 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 p-4"
            role="status"
            aria-live="polite"
          >
            <CheckCircle className="shrink-0 text-[#8B5CF6]" size={20} />
            <p className="text-sm text-[#FAFAFA]">You're in! Watch your inbox for exclusive content.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-3"
            aria-label="Newsletter signup"
          >
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Enter your email"
                className={`w-full rounded-lg border bg-[#09090B] px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#52525B] outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all ${
                  error ? 'border-[#EC4899]' : 'border-[#27272A]'
                }`}
                aria-label="Email address for newsletter"
                aria-invalid={!!error}
                aria-describedby={error ? 'newsletter-error' : undefined}
              />
              {error && <p id="newsletter-error" className="mt-1 text-xs text-[#EC4899]" role="alert">{error}</p>}
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Subscribing...' : 'Subscribe Free'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
