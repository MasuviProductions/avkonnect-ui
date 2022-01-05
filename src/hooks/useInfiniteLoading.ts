import { useCallback, useRef } from "react";

const useInfiniteLoading = (loading: boolean, triggerCallback: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const infiniteLoadRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          triggerCallback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, triggerCallback]
  );

  return infiniteLoadRef;
};

export default useInfiniteLoading;
