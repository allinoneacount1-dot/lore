export function LoreLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="url(#lore-grad)"/>
      <path d="M10 28V12h3.2v13.2H22V28H10z" fill="white"/>
      <circle cx="28" cy="26" r="2" fill="#00D2FF"/>
      <defs>
        <linearGradient id="lore-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6C5CE7"/>
          <stop offset="1" stopColor="#00D2FF"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
