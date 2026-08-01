import { RefObject, useEffect, useState } from "react";

const useIsInView = (
  target: RefObject<HTMLElement | null>,
  callback?: () => void,
  disabled?: boolean
) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (disabled) return;
    if (!target.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            callback?.();
          } else {
            setIsInView(false);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, disabled, target]);

  return { isInView };
};

export default useIsInView;
