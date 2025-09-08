export function VeterinaryPreview() {
  return (
    <svg
      viewBox="0 0 210 297"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="210" height="297" fill="white" />
      
      {/* Green/Teal Header with subtle gradient */}
      <rect width="210" height="42" fill="#ecfdf5" />
      <rect x="0" y="42" width="210" height="0.5" fill="#10b981" />
      
      {/* Simple stethoscope icon */}
      <circle cx="15" cy="20" r="2.5" fill="#10b981" />
      <path d="M 17.5 20 Q 20 20 20 23" stroke="#10b981" strokeWidth="1" fill="none" />
      
      {/* Name in header */}
      <rect x="28" y="13" width="45" height="5" rx="1" fill="#047857" />
      <rect x="28" y="22" width="30" height="3" rx="1" fill="#10b981" />
      
      {/* Contact info icons */}
      <circle cx="150" cy="15" r="2" fill="#10b981" opacity="0.6" />
      <rect x="155" y="14" width="25" height="2" rx="1" fill="#10b981" opacity="0.6" />
      
      <circle cx="150" cy="25" r="2" fill="#10b981" opacity="0.6" />
      <rect x="155" y="24" width="25" height="2" rx="1" fill="#10b981" opacity="0.6" />
      
      {/* Main content */}
      <g transform="translate(15, 52)">
        {/* Experience section with timeline */}
        <circle cx="2" cy="2" r="2" fill="#10b981" />
        <rect x="6" y="0" width="40" height="4" fill="#047857" />
        
        {/* Simple timeline line */}
        <rect x="2" y="10" width="0.5" height="40" fill="#10b981" opacity="0.3" />
        
        {/* Experience entries */}
        <circle cx="2" cy="12" r="1.5" fill="#10b981" />
        <rect x="8" y="10" width="35" height="3" fill="#374151" />
        <rect x="8" y="16" width="80" height="2" fill="#9ca3af" />
        <rect x="8" y="20" width="75" height="2" fill="#9ca3af" />
        
        <circle cx="2" cy="30" r="1.5" fill="#10b981" />
        <rect x="8" y="28" width="35" height="3" fill="#374151" />
        <rect x="8" y="34" width="80" height="2" fill="#9ca3af" />
        <rect x="8" y="38" width="75" height="2" fill="#9ca3af" />
        
        {/* Education section */}
        <circle cx="2" cy="50" r="2" fill="#10b981" />
        <rect x="6" y="48" width="35" height="4" fill="#047857" />
        
        <rect x="8" y="58" width="40" height="3" fill="#10b981" opacity="0.7" />
        <rect x="8" y="64" width="60" height="2" fill="#9ca3af" />
        
        {/* Skills section - right side */}
        <rect x="120" y="0" width="65" height="28" rx="3" fill="#10b981" opacity="0.08" />
        <rect x="125" y="4" width="25" height="3" fill="#047857" />
        
        {/* Skill badges */}
        <rect x="125" y="11" width="18" height="4" rx="2" fill="white" stroke="#10b981" strokeWidth="0.5" />
        <rect x="146" y="11" width="16" height="4" rx="2" fill="white" stroke="#10b981" strokeWidth="0.5" />
        <rect x="125" y="18" width="20" height="4" rx="2" fill="white" stroke="#10b981" strokeWidth="0.5" />
        <rect x="148" y="18" width="14" height="4" rx="2" fill="white" stroke="#10b981" strokeWidth="0.5" />
        
        {/* Languages section */}
        <rect x="120" y="34" width="65" height="20" rx="3" fill="#14b8a6" opacity="0.08" />
        <rect x="125" y="38" width="30" height="3" fill="#0d9488" />
        
        <rect x="125" y="45" width="18" height="2" fill="#374151" />
        <circle cx="160" cy="46" r="1" fill="#14b8a6" />
        <circle cx="164" cy="46" r="1" fill="#14b8a6" />
        <circle cx="168" cy="46" r="1" fill="#14b8a6" />
        <circle cx="172" cy="46" r="1" fill="#d1d5db" />
        
        {/* Additional experience entry */}
        <circle cx="2" cy="74" r="1.5" fill="#10b981" />
        <rect x="8" y="72" width="35" height="3" fill="#374151" />
        <rect x="8" y="78" width="80" height="2" fill="#9ca3af" />
        <rect x="8" y="82" width="75" height="2" fill="#9ca3af" />
        
        {/* Interests section */}
        <rect x="120" y="60" width="65" height="18" rx="3" fill="#fb923c" opacity="0.08" />
        <rect x="125" y="64" width="30" height="3" fill="#ea580c" />
        
        <rect x="125" y="71" width="15" height="4" rx="2" fill="#fed7aa" />
        <rect x="143" y="71" width="12" height="4" rx="2" fill="#fed7aa" />
        <rect x="158" y="71" width="14" height="4" rx="2" fill="#fed7aa" />
      </g>
    </svg>
  );
}