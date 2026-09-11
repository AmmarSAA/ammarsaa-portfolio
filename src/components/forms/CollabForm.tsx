import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { validateEmail } from '../../utils';
import type { FormData } from '../../types';

interface CollabFormProps {
  onSuccess: () => void;
}

const EMPTY: FormData = { fullName: '', email: '', concept: '', message: '' };

export const CollabForm = ({ onSuccess }: CollabFormProps) => {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim()) e.fullName = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!validateEmail(form.email)) e.email = 'Invalid email address';
    if (!form.concept.trim()) e.concept = 'Concept is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null) as { error?: string } | null;
        throw new Error(data?.error ?? 'Failed to send inquiry');
      }
      setForm(EMPTY);
      setErrors({});
      onSuccess();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (submitError) setSubmitError('');
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const inputCls = (field: keyof FormData) =>
    `w-full rounded-lg border bg-[#18181B] px-4 py-3 text-sm text-[#FAFAFA] placeholder-[#52525B] outline-none transition-all duration-200 focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent ${
      errors[field] ? 'border-[#EC4899]' : 'border-[#27272A] hover:border-[#52525B]'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Collaboration inquiry form" className="space-y-4">
      {([
        { id: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your name' },
        { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
        { id: 'concept', label: 'Concept', type: 'text', placeholder: 'What character or project?' },
      ] as const).map(({ id, label, type, placeholder }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
            {label}
          </label>
          <input
            id={id}
            type={type}
            value={form[id]}
            onChange={(e) => update(id, e.target.value)}
            placeholder={placeholder}
            className={inputCls(id)}
            aria-invalid={!!errors[id]}
            aria-describedby={errors[id] ? `${id}-error` : undefined}
          />
          {errors[id] && (
            <p id={`${id}-error`} className="mt-1 text-xs text-[#EC4899]" role="alert">{errors[id]}</p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">Message</label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Tell Fai about your collab idea..."
          className={`${inputCls('message')} resize-none`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-[#EC4899]" role="alert">{errors.message}</p>
        )}
      </div>

      {submitError && (
        <p className="text-xs text-[#EC4899]" role="alert">{submitError}</p>
      )}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? (
          <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
            Sending inquiry...
          </motion.span>
        ) : (
          <><Send size={16} /> Send Inquiry</>
        )}
      </Button>
    </form>
  );
};
