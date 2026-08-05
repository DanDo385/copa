'use client';

import { FormEvent, useEffect, useId, useState } from 'react';
import { Button } from './Button';
import { FormField } from './FormField';
import styles from './ConsentCapture.module.css';

type ConsentMode = 'newsletter' | 'show-reminder';

interface ConsentCaptureProps {
  mode?: ConsentMode;
  compact?: boolean;
}

const PREFERENCE_OPTIONS = [
  { value: 'new-arrivals', label: 'New arrivals' },
  { value: 'live-shows', label: 'Live show reminders' },
  { value: 'back-in-stock', label: 'Back in stock' },
  { value: 'gold-finish', label: 'Gold finish pieces' },
  { value: 'silver-finish', label: 'Silver finish pieces' },
] as const;

export function ConsentCapture({ mode = 'newsletter', compact = false }: ConsentCaptureProps) {
  const formId = useId();
  const [hydrated, setHydrated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>();
  const [smsError, setSmsError] = useState<string | undefined>();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const sms = String(formData.get('sms') ?? '').trim();
    const emailConsent = formData.get('emailConsent') === 'on';
    const smsConsent = formData.get('smsConsent') === 'on';

    let valid = true;

    if (email && !emailConsent) {
      setEmailError('Email consent is required to receive email updates.');
      valid = false;
    } else {
      setEmailError(undefined);
    }

    if (sms && !smsConsent) {
      setSmsError('SMS consent is required to receive text reminders.');
      valid = false;
    } else {
      setSmsError(undefined);
    }

    if (!email && !sms) {
      setEmailError('Enter an email or phone number to subscribe.');
      valid = false;
    }

    if (!valid) return;

    setSubmitted(true);
  };

  if (!hydrated) {
    return (
      <div
        className={[styles.form, styles.hydrationPlaceholder, compact ? styles.compact : '']
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      />
    );
  }

  if (submitted) {
    return (
      <p className={styles.success} role="status">
        Preferences saved locally — prototype mode, no messages will be sent.
      </p>
    );
  }

  return (
    <form
      className={[styles.form, compact ? styles.compact : ''].filter(Boolean).join(' ')}
      onSubmit={handleSubmit}
      aria-labelledby={`${formId}-title`}
      noValidate
    >
      <h3 id={`${formId}-title`} className={styles.title}>
        {mode === 'show-reminder' ? 'Show reminders' : 'CopaJewelry early access'}
      </h3>
      {mode === 'newsletter' && (
        <p className={styles.intro}>
          Join for drop alerts, promotion notes, and future rewards updates. CopaJewelry&apos;s current site
          advertises 10% off a first order; final program terms require owner approval.
        </p>
      )}

      <FormField
        id={`${formId}-email`}
        name="email"
        type="email"
        label="Email address"
        autoComplete="email"
        error={emailError}
        hint="Optional — required only if you opt into email."
      />

      <label className={styles.consentRow}>
        <input type="checkbox" name="emailConsent" />
        <span>
          I agree to receive marketing emails from CopaJewelry. I can unsubscribe anytime. See{' '}
          <a href="/privacy">Privacy Policy</a>.
        </span>
      </label>

      <FormField
        id={`${formId}-sms`}
        name="sms"
        type="tel"
        label="Mobile number (SMS)"
        autoComplete="tel"
        error={smsError}
        hint="Optional — US numbers only in production once approved."
      />

      <label className={styles.consentRow}>
        <input type="checkbox" name="smsConsent" />
        <span>
          I agree to receive SMS reminders from CopaJewelry. Message and data rates may apply.
          Reply STOP to opt out.
        </span>
      </label>

      <fieldset className={styles.preferences}>
        <legend className={styles.preferencesLegend}>Preferences (optional)</legend>
        <ul className={styles.preferenceList}>
          {PREFERENCE_OPTIONS.map((option) => (
            <li key={option.value}>
              <label className={styles.preferenceLabel}>
                <input type="checkbox" name="preferences" value={option.value} />
                <span>{option.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <p className={styles.disclosure}>
        Email and SMS consent are collected separately. CopaJewelry will not import Whatnot buyer data
        without fresh, channel-specific consent on owned surfaces.
      </p>

      <Button type="submit" variant="primary" size="md">
        {mode === 'show-reminder' ? 'Save reminder preferences' : 'Save preferences'}
      </Button>
    </form>
  );
}
