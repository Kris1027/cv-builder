export function DeveloperPreview() {
  return (
    <svg
      viewBox="0 0 210 297"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="210" height="297" fill="white" />
      
      {/* Purple/Blue Gradient Header */}
      <defs>
        <linearGradient id="headerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <rect width="210" height="50" fill="url(#headerGradient)" />
      
      {/* Name in header */}
      <rect x="15" y="15" width="60" height="6" rx="1" fill="white" opacity="0.9" />
      <rect x="15" y="25" width="40" height="4" rx="1" fill="white" opacity="0.7" />
      
      {/* Contact info icons */}
      <circle cx="15" cy="38" r="2" fill="white" opacity="0.6" />
      <rect x="20" y="37" width="25" height="2" rx="1" fill="white" opacity="0.6" />
      
      <circle cx="55" cy="38" r="2" fill="white" opacity="0.6" />
      <rect x="60" y="37" width="25" height="2" rx="1" fill="white" opacity="0.6" />
      
      <circle cx="95" cy="38" r="2" fill="white" opacity="0.6" />
      <rect x="100" y="37" width="25" height="2" rx="1" fill="white" opacity="0.6" />
      
      {/* Main content grid */}
      <g transform="translate(15, 60)">
        {/* Left column - Experience */}
        <g>
          {/* Section title */}
          <rect width="45" height="4" fill="#9333ea" />
          <rect x="0" y="2" width="120" height="0.5" fill="#9333ea" />
          
          {/* Experience entry 1 */}
          <rect x="0" y="10" width="50" height="3" fill="#374151" />
          <rect x="52" y="10" width="30" height="3" fill="#9333ea" opacity="0.7" />
          <rect x="0" y="16" width="100" height="2" fill="#9CA3AF" />
          <rect x="0" y="20" width="95" height="2" fill="#9CA3AF" />
          <rect x="0" y="24" width="90" height="2" fill="#9CA3AF" />
          
          {/* Experience entry 2 */}
          <rect x="0" y="32" width="50" height="3" fill="#374151" />
          <rect x="52" y="32" width="30" height="3" fill="#9333ea" opacity="0.7" />
          <rect x="0" y="38" width="100" height="2" fill="#9CA3AF" />
          <rect x="0" y="42" width="95" height="2" fill="#9CA3AF" />
          <rect x="0" y="46" width="90" height="2" fill="#9CA3AF" />
          
          {/* Education section */}
          <rect x="0" y="56" width="35" height="4" fill="#9333ea" />
          <rect x="0" y="58" width="120" height="0.5" fill="#9333ea" />
          
          <rect x="0" y="66" width="45" height="3" fill="#9333ea" opacity="0.7" />
          <rect x="0" y="72" width="80" height="2" fill="#9CA3AF" />
          <rect x="0" y="76" width="60" height="2" fill="#9CA3AF" />
        </g>
        
        {/* Right column - Skills & Languages */}
        <g transform="translate(130, 0)">
          {/* Skills section */}
          <rect width="25" height="4" fill="#9333ea" />
          <rect x="0" y="2" width="50" height="0.5" fill="#9333ea" />
          
          {/* Skill badges - terminal style */}
          <rect x="0" y="10" width="20" height="6" rx="3" fill="#1f2937" />
          <rect x="25" y="10" width="20" height="6" rx="3" fill="#1f2937" />
          <rect x="0" y="20" width="25" height="6" rx="3" fill="#1f2937" />
          <rect x="30" y="20" width="15" height="6" rx="3" fill="#1f2937" />
          <rect x="0" y="30" width="18" height="6" rx="3" fill="#1f2937" />
          <rect x="23" y="30" width="22" height="6" rx="3" fill="#1f2937" />
          
          {/* Languages section */}
          <rect x="0" y="44" width="35" height="4" fill="#9333ea" />
          <rect x="0" y="46" width="50" height="0.5" fill="#9333ea" />
          
          <rect x="0" y="54" width="25" height="2" fill="#374151" />
          <rect x="35" y="54" width="15" height="2" fill="#9333ea" opacity="0.6" />
          
          <rect x="0" y="60" width="25" height="2" fill="#374151" />
          <rect x="35" y="60" width="15" height="2" fill="#9333ea" opacity="0.6" />
          
          {/* Interests section */}
          <rect x="0" y="70" width="30" height="4" fill="#9333ea" />
          <rect x="0" y="72" width="50" height="0.5" fill="#9333ea" />
          
          {/* Interest badges */}
          <rect x="0" y="80" width="22" height="6" rx="10" fill="#06b6d4" />
          <rect x="26" y="80" width="18" height="6" rx="10" fill="#06b6d4" />
          <rect x="0" y="90" width="20" height="6" rx="10" fill="#06b6d4" />
        </g>
      </g>
      
      {/* Additional content for 20% more */}
      <g transform="translate(15, 145)">
        {/* Additional experience entry */}
        <rect x="0" y="0" width="50" height="3" fill="#374151" />
        <rect x="52" y="0" width="30" height="3" fill="#9333ea" opacity="0.7" />
        <rect x="0" y="6" width="100" height="2" fill="#9CA3AF" />
        <rect x="0" y="10" width="95" height="2" fill="#9CA3AF" />
        
        {/* Additional skills on right */}
        <rect x="130" y="0" width="18" height="6" rx="3" fill="#1f2937" />
        <rect x="153" y="0" width="20" height="6" rx="3" fill="#1f2937" />
        <rect x="130" y="10" width="24" height="6" rx="3" fill="#1f2937" />
      </g>
    </svg>
  );
}