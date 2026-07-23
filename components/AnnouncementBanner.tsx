"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "banner-dismissed-v1";

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="announce-banner" role="status">
      <span className="announce-pulse" aria-hidden="true" />
      <span className="announce-text">
        Open to new product opportunities —{" "}
        <a href="#contact">Get in touch ↓</a>
      </span>
      <button
        className="announce-dismiss"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        type="button"
      >
        ×
      </button>
    </div>
  );
}
