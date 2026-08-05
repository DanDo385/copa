'use client';

import { FormEvent, useEffect, useId, useState } from 'react';
import { Button } from './Button';
import { FormField } from './FormField';
import styles from './CustomInquiryForm.module.css';

export function CustomInquiryForm() {
  const formId = useId();
  const [hydrated, setHydrated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [consentError, setConsentError] = useState<string | undefined>();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const consent = formData.get('consent') === 'on';

    let valid = true;

    if (!name) {
      setNameError('Enter your name so a founder knows who to reply to.');
      valid = false;
    } else {
      setNameError(undefined);
    }

    if (!email) {
      setEmailError('Enter an email address so CopaJewelry can respond.');
      valid = false;
    } else {
      setEmailError(undefined);
    }

    if (!consent) {
      setConsentError('Confirm you agree to be contacted about this request.');
      valid = false;
    } else {
      setConsentError(undefined);
    }

    if (!valid) return;

    setSubmitted(true);
  };

  if (!hydrated) {
    return <div className={styles.form} aria-hidden="true" />;
  }

  if (submitted) {
    return (
      <p className={styles.success} role="status">
        Request saved locally — prototype mode. In production this routes to CopaJewelry&apos;s owned
        inbox; a founder replies directly, not an automated system.
      </p>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-labelledby={`${formId}-title`}
      noValidate
    >
      <h2 id={`${formId}-title`} className={styles.title}>
        Tell us what you have in mind
      </h2>
      <p className={styles.intro}>
        Share inspiration, finish preferences, and sizing notes. A founder reviews every request
        personally — response time and pricing require owner approval before this goes live.
      </p>

      <FormField id={`${formId}-name`} name="name" label="Name" error={nameError} required />

      <FormField
        id={`${formId}-email`}
        name="email"
        type="email"
        label="Email address"
        autoComplete="email"
        error={emailError}
        required
      />

      <div className={styles.field}>
        <label htmlFor={`${formId}-inspiration`} className={styles.label}>
          Inspiration &amp; finish preferences
        </label>
        <textarea
          id={`${formId}-inspiration`}
          name="inspiration"
          className={styles.textarea}
          rows={4}
          placeholder="Describe the piece, finish, stones, or a reference image link"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={`${formId}-sizing`} className={styles.label}>
          Sizing notes
        </label>
        <textarea
          id={`${formId}-sizing`}
          name="sizing"
          className={styles.textarea}
          rows={2}
          placeholder="Ring size, chain length, or wrist measurement, if known"
        />
      </div>

      <label className={styles.consentRow}>
        <input type="checkbox" name="consent" />
        <span>
          I agree to be contacted by CopaJewelry about this custom request on CopaJewelry&apos;s owned
          channels. See <a href="/privacy">Privacy Policy</a>.
        </span>
      </label>
      {consentError && (
        <p className={styles.error} role="alert">
          {consentError}
        </p>
      )}

      <Button type="submit" variant="primary" size="md">
        Send custom inquiry
      </Button>
    </form>
  );
}
