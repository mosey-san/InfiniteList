import { useEffect, useRef, useState } from 'react';

const DEFAULT_OPTIONS = {
  threshold: [0.2, 0.8],
};

export function useViewort<T extends Element>(
  options: IntersectionObserverInit = DEFAULT_OPTIONS
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const observer = useRef<IntersectionObserver>();
  const [isInViewPort, setIsInViewPort] = useState(false);

  useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewPort(true);
        } else {
          setIsInViewPort(false);
        }
      }, options);
    }
    if (ref.current) observer.current.observe(ref.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [options]);

  return [ref, isInViewPort];
}
