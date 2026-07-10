"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function useSubscription(enabled = true) {
  const { user, loading } = useAuth();
  const [hasSubscription, setHasSubscription] = useState(false);
  const [subscriptionLoading, setSubscriptionLoading] = useState(true);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (!enabled || !user || loading) {
      if (!loading) setSubscriptionLoading(false);
      return;
    }

    cancelledRef.current = false;

    const controller = new AbortController();

    fetch("/api/subscription/status", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (!cancelledRef.current) {
          setHasSubscription(data.ok && data.data?.status === "active");
        }
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (!cancelledRef.current) setHasSubscription(false);
      })
      .finally(() => {
        if (!cancelledRef.current) setSubscriptionLoading(false);
      });

    return () => {
      cancelledRef.current = true;
      controller.abort();
    };
  }, [user, loading, enabled]);

  return { hasSubscription, subscriptionLoading };
}
