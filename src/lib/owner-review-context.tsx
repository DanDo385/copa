'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'copa-owner-review-mode';

interface OwnerReviewContextValue {
  reviewMode: boolean;
  setReviewMode: (enabled: boolean) => void;
  toggleReviewMode: () => void;
}

const OwnerReviewContext = createContext<OwnerReviewContextValue | null>(null);

function readStoredReviewMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function OwnerReviewProvider({ children }: { children: ReactNode }) {
  const [reviewMode, setReviewModeState] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setReviewModeState(readStoredReviewMode());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, reviewMode ? 'true' : 'false');
  }, [reviewMode, hydrated]);

  const setReviewMode = useCallback((enabled: boolean) => {
    setReviewModeState(enabled);
  }, []);

  const toggleReviewMode = useCallback(() => {
    setReviewModeState((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ reviewMode, setReviewMode, toggleReviewMode }),
    [reviewMode, setReviewMode, toggleReviewMode],
  );

  return (
    <OwnerReviewContext.Provider value={value}>{children}</OwnerReviewContext.Provider>
  );
}

export function useOwnerReview(): OwnerReviewContextValue {
  const context = useContext(OwnerReviewContext);
  if (!context) {
    throw new Error('useOwnerReview must be used within an OwnerReviewProvider');
  }
  return context;
}
