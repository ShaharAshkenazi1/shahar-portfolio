"use client";

export default function Footer() {
  return (
    <footer>
      <div className="wrap row">
        <div>© {new Date().getFullYear()} Shahar Ashkenazi</div>
        <div>Tel Aviv, Israel</div>
        <div>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
