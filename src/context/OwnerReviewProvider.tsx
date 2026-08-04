"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface OwnerReviewContextValue {
  ownerReviewMode: boolean;
  toggleOwnerReviewMode: () => void;
  setOwnerReviewMode: (enabled: boolean) => void;
}

const OwnerReviewContext = createContext<OwnerReviewContextValue | null>(null);

export function OwnerReviewProvider({ children }: { children: ReactNode }) {
  const [ownerReviewMode, setOwnerReviewModeState] = useState(false);

  const toggleOwnerReviewMode = useCallback(() => {
    setOwnerReviewModeState((prev) => !prev);
  }, []);

  const setOwnerReviewMode = useCallback((enabled: boolean) => {
    setOwnerReviewModeState(enabled);
  }, []);

  const value = useMemo(
    () => ({
      ownerReviewMode,
      toggleOwnerReviewMode,
      setOwnerReviewMode,
    }),
    [ownerReviewMode, toggleOwnerReviewMode, setOwnerReviewMode],
  );

  return (
    <OwnerReviewContext.Provider value={value}>
      <div className={ownerReviewMode ? "owner-review-mode" : undefined}>
        {children}
      </div>
    </OwnerReviewContext.Provider>
  );
}

export function useOwnerReview(): OwnerReviewContextValue {
  const context = useContext(OwnerReviewContext);
  if (!context) {
    throw new Error("useOwnerReview must be used within OwnerReviewProvider");
  }
  return context;
}
