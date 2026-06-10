import { useEffect, useState } from "react";

export function isDesktopPointer(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches
  );
}

export function useDesktopPointer(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    setIsDesktop(mq.matches);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}
