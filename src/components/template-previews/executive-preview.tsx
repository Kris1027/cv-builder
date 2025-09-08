export function ExecutivePreview() {
  return (
    <svg
      viewBox="0 0 210 297"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="210" height="297" fill="white" />
      
      {/* Minimalist Gray Header */}
      <rect width="210" height="40" fill="#f9fafb" />
      <rect x="0" y="40" width="210" height="0.5" fill="#e5e7eb" />
      
      {/* Name in header */}
      <rect x="15" y="12" width="50" height="5" rx="1" fill="#374151" />
      <rect x="15" y="22" width="35" height="3" rx="1" fill="#6b7280" />
      
      {/* Contact info dots */}
      <circle cx="150" cy="15" r="2" fill="#9ca3af" />
      <rect x="155" y="14" width="25" height="2" rx="1" fill="#9ca3af" />
      
      <circle cx="150" cy="25" r="2" fill="#9ca3af" />
      <rect x="155" y="24" width="25" height="2" rx="1" fill="#9ca3af" />
      
      {/* Main content */}
      <g transform="translate(15, 50)">
        {/* Experience section */}
        <rect x="0" y="0" width="40" height="4" fill="#111827" />
        
        {/* Experience blocks */}
        <rect x="0" y="10" width="45" height="3" fill="#374151" />
        <rect x="0" y="16" width="90" height="2" fill="#9ca3af" />
        <rect x="0" y="20" width="85" height="2" fill="#9ca3af" />
        
        <rect x="0" y="28" width="45" height="3" fill="#374151" />
        <rect x="0" y="34" width="90" height="2" fill="#9ca3af" />
        <rect x="0" y="38" width="85" height="2" fill="#9ca3af" />
        
        {/* Education section */}
        <rect x="0" y="48" width="35" height="4" fill="#111827" />
        
        <rect x="0" y="58" width="40" height="3" fill="#374151" />
        <rect x="0" y="64" width="70" height="2" fill="#9ca3af" />
        
        {/* Skills section - right side */}
        <rect x="120" y="0" width="25" height="4" fill="#111827" />
        
        {/* Skill pills - minimalist */}
        <rect x="120" y="10" width="20" height="5" rx="2" fill="#f3f4f6" />
        <rect x="145" y="10" width="18" height="5" rx="2" fill="#f3f4f6" />
        <rect x="120" y="18" width="22" height="5" rx="2" fill="#f3f4f6" />
        <rect x="147" y="18" width="16" height="5" rx="2" fill="#f3f4f6" />
        <rect x="120" y="26" width="19" height="5" rx="2" fill="#f3f4f6" />
        
        {/* Languages section */}
        <rect x="120" y="38" width="35" height="4" fill="#111827" />
        
        <rect x="120" y="48" width="20" height="2" fill="#374151" />
        <rect x="150" y="48" width="15" height="2" fill="#9ca3af" />
        
        <rect x="120" y="54" width="20" height="2" fill="#374151" />
        <rect x="150" y="54" width="15" height="2" fill="#9ca3af" />
        
        {/* Interests section */}
        <rect x="0" y="76" width="30" height="4" fill="#111827" />
        
        <rect x="0" y="86" width="22" height="2" fill="#9ca3af" />
        <rect x="26" y="86" width="18" height="2" fill="#9ca3af" />
        <rect x="48" y="86" width="20" height="2" fill="#9ca3af" />
        <rect x="72" y="86" width="16" height="2" fill="#9ca3af" />
        
        {/* Additional content for 20% more */}
        <rect x="0" y="96" width="45" height="3" fill="#374151" />
        <rect x="0" y="102" width="90" height="2" fill="#9ca3af" />
        <rect x="0" y="106" width="85" height="2" fill="#9ca3af" />
        
        {/* Additional skills */}
        <rect x="120" y="64" width="18" height="5" rx="2" fill="#f3f4f6" />
        <rect x="142" y="64" width="21" height="5" rx="2" fill="#f3f4f6" />
      </g>
    </svg>
  );
}