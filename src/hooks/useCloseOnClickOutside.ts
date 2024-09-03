import { LegacyRef, MutableRefObject, useEffect, useRef } from "react";

export function useCloseOnClickOutside(closeFn: () => void): LegacyRef<HTMLDivElement> | undefined {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Element && ref.current && !ref.current.contains(event.target)) {
        closeFn();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [ref]);

  return ref;
}