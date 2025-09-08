export function VeterinaryPreview() {
  return (
    <svg
      viewBox="0 0 210 297"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="210" height="297" fill="white" />
      
      {/* Green/Teal Header */}
      <rect width="210" height="45" fill="#10b981" opacity="0.1" />
      <rect x="0" y="45" width="210" height="0.5" fill="#10b981" />
      
      {/* Stethoscope icon */}
      <circle cx="85" cy="15" r="3" fill="#10b981" />
      <path d="M 82 15 Q 82 18 85 18 Q 88 18 88 15" stroke="#10b981" strokeWidth="0.5" fill="none" />
      
      {/* Name in header */}
      <rect x="92" y="12" width="35" height="5" rx="1" fill="#047857" />
      <rect x="85" y="22" width="40" height="3" rx="1" fill="#10b981" opacity="0.8" />
      
      {/* Contact pills */}
      <rect x="35" y="32" width="25" height="6" rx="3" fill="white" />
      <rect x="65" y="32" width="25" height="6" rx="3" fill="white" />
      <rect x="95" y="32" width="25" height="6" rx="3" fill="white" />
      <rect x="125" y="32" width="25" height="6" rx="3" fill="white" />
      
      {/* Main content grid */}
      <g transform="translate(15, 55)">
        {/* Left column - Experience with timeline */}
        <g>
          {/* Section title with icon */}
          <circle cx="2" cy="2" r="2" fill="#10b981" />
          <rect x="6" y="0" width="45" height="4" fill="#047857" />
          
          {/* Timeline */}
          <rect x="2" y="10" width="0.5" height="60" fill="#10b981" opacity="0.3" />
          
          {/* Experience entry 1 with bullet */}
          <circle cx="2" cy="12" r="1.5" fill="#10b981" />
          <rect x="8" y="10" width="40" height="3" fill="#374151" />
          <rect x="8" y="14" width="30" height="2" fill="#10b981" />
          <rect x="8" y="18" width="90" height="2" fill="#9CA3AF" />
          <rect x="8" y="22" width="85" height="2" fill="#9CA3AF" />
          
          {/* Experience entry 2 with bullet */}
          <circle cx="2" cy="32" r="1.5" fill="#10b981" />
          <rect x="8" y="30" width="40" height="3" fill="#374151" />
          <rect x="8" y="34" width="30" height="2" fill="#10b981" />
          <rect x="8" y="38" width="90" height="2" fill="#9CA3AF" />
          <rect x="8" y="42" width="85" height="2" fill="#9CA3AF" />
          
          {/* Education section with icon */}
          <circle cx="2" cy="56" r="2" fill="#10b981" />
          <rect x="6" y="54" width="40" height="4" fill="#047857" />
          
          <rect x="8" y="64" width="45" height="3" fill="#10b981" opacity="0.8" />
          <rect x="8" y="70" width="60" height="2" fill="#6B7280" />
          <rect x="8" y="74" width="40" height="2" fill="#9CA3AF" />
        </g>
        
        {/* Right column - Skills & Info */}
        <g transform="translate(120, 0)">
          {/* Skills section - colored box */}
          <rect x="0" y="0" width="65" height="35" rx="3" fill="#10b981" opacity="0.1" />
          <rect x="5" y="4" width="30" height="3" fill="#047857" />
          
          {/* Skill badges */}
          <rect x="5" y="10" width="20" height="5" rx="2" fill="white" stroke="#10b981" strokeWidth="0.5" />
          <rect x="28" y="10" width="18" height="5" rx="2" fill="white" stroke="#10b981" strokeWidth="0.5" />
          <rect x="5" y="18" width="22" height="5" rx="2" fill="white" stroke="#10b981" strokeWidth="0.5" />
          <rect x="30" y="18" width="16" height="5" rx="2" fill="white" stroke="#10b981" strokeWidth="0.5" />
          <rect x="5" y="26" width="19" height="5" rx="2" fill="white" stroke="#10b981" strokeWidth="0.5" />
          
          {/* Languages section - colored box */}
          <rect x="0" y="40" width="65" height="25" rx="3" fill="#14b8a6" opacity="0.1" />
          <rect x="5" y="44" width="28" height="3" fill="#0d9488" />
          
          {/* Language dots */}
          <rect x="5" y="52" width="20" height="2" fill="#374151" />
          <circle cx="45" cy="53" r="1" fill="#14b8a6" />
          <circle cx="49" cy="53" r="1" fill="#14b8a6" />
          <circle cx="53" cy="53" r="1" fill="#14b8a6" />
          <circle cx="57" cy="53" r="1" fill="#14b8a6" />
          <circle cx="61" cy="53" r="1" fill="#D1D5DB" />
          
          <rect x="5" y="58" width="20" height="2" fill="#374151" />
          <circle cx="45" cy="59" r="1" fill="#14b8a6" />
          <circle cx="49" cy="59" r="1" fill="#14b8a6" />
          <circle cx="53" cy="59" r="1" fill="#14b8a6" />
          <circle cx="57" cy="59" r="1" fill="#D1D5DB" />
          <circle cx="61" cy="59" r="1" fill="#D1D5DB" />
          
          {/* Interests section - colored box */}
          <rect x="0" y="70" width="65" height="20" rx="3" fill="#fb923c" opacity="0.1" />
          <rect x="5" y="74" width="35" height="3" fill="#ea580c" />
          
          {/* Interest pills */}
          <rect x="5" y="81" width="18" height="5" rx="2.5" fill="#fed7aa" />
          <rect x="26" y="81" width="15" height="5" rx="2.5" fill="#fed7aa" />
          <rect x="44" y="81" width="16" height="5" rx="2.5" fill="#fed7aa" />
        </g>
      </g>
    </svg>
  );
}