export const VeenaPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20">
    <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <pattern id="veena-pattern" patternUnits="userSpaceOnUse" width="100" height="100" patternTransform="rotate(10)">
        <path d="M80,20 Q70,40 80,60 T80,100" stroke="rgba(255,226,178,0.5)" fill="none" strokeWidth="0.5"/>
        <circle cx="80" cy="30" r="2" fill="rgba(255,226,178,0.5)"/>
        <circle cx="80" cy="70" r="2" fill="rgba(255,226,178,0.5)"/>
        <path d="M20,80 Q40,70 60,80 T100,80" stroke="rgba(255,226,178,0.5)" fill="none" strokeWidth="0.5"/>
        <circle cx="30" cy="80" r="2" fill="rgba(255,226,178,0.5)"/>
        <circle cx="70" cy="80" r="2" fill="rgba(255,226,178,0.5)"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#veena-pattern)"/>
    </svg>
  </div>
);
