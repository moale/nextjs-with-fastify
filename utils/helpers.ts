export const isBrowser = (): boolean =>
  !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
