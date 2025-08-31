export function BusinessPreview() {
  return (
    <svg
      viewBox="0 0 210 297"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="210" height="297" fill="white" />
      
      {/* Header section - centered */}
      <g transform="translate(0, 15)">
        {/* Centered name */}
        <rect x="75" y="0" width="60" height="7" rx="1" fill="#1F2937" />
        <rect x="85" y="10" width="40" height="4" rx="1" fill="#6B7280" />
        
        {/* Contact info - horizontal */}
        <g transform="translate(0, 22)">
          <circle cx="50" cy="2" r="1.5" fill="#9CA3AF" />
          <rect x="53" y="1" width="20" height="2" rx="1" fill="#9CA3AF" />
          
          <circle cx="80" cy="2" r="1.5" fill="#9CA3AF" />
          <rect x="83" y="1" width="20" height="2" rx="1" fill="#9CA3AF" />
          
          <circle cx="110" cy="2" r="1.5" fill="#9CA3AF" />
          <rect x="113" y="1" width="20" height="2" rx="1" fill="#9CA3AF" />
          
          <circle cx="140" cy="2" r="1.5" fill="#9CA3AF" />
          <rect x="143" y="1" width="20" height="2" rx="1" fill="#9CA3AF" />
        </g>
        
        {/* Divider line */}
        <rect x="15" y="30" width="180" height="0.5" fill="#1F2937" />
      </g>
      
      {/* Professional Experience */}
      <g transform="translate(15, 55)">
        <text x="0" y="4" fill="#1F2937" fontSize="5" fontWeight="600" fontFamily="serif">
          PROFESSIONAL EXPERIENCE
        </text>
        <rect x="0" y="6" width="180" height="0.3" fill="#9CA3AF" />
        
        {/* Job 1 */}
        <g transform="translate(0, 12)">
          <rect x="0" y="0" width="50" height="3" fill="#374151" />
          <rect x="52" y="0" width="2" height="3" fill="#374151" />
          <rect x="56" y="0" width="35" height="3" fill="#374151" />
          <rect x="140" y="0" width="40" height="2.5" fill="#9CA3AF" />
          
          <rect x="0" y="5" width="35" height="2" fill="#6B7280" />
          <rect x="0" y="9" width="120" height="1.5" fill="#D1D5DB" />
          <rect x="0" y="12" width="115" height="1.5" fill="#D1D5DB" />
          <rect x="0" y="15" width="110" height="1.5" fill="#D1D5DB" />
        </g>
        
        {/* Job 2 */}
        <g transform="translate(0, 34)">
          <rect x="0" y="0" width="50" height="3" fill="#374151" />
          <rect x="52" y="0" width="2" height="3" fill="#374151" />
          <rect x="56" y="0" width="35" height="3" fill="#374151" />
          <rect x="140" y="0" width="40" height="2.5" fill="#9CA3AF" />
          
          <rect x="0" y="5" width="35" height="2" fill="#6B7280" />
          <rect x="0" y="9" width="120" height="1.5" fill="#D1D5DB" />
          <rect x="0" y="12" width="115" height="1.5" fill="#D1D5DB" />
          <rect x="0" y="15" width="110" height="1.5" fill="#D1D5DB" />
        </g>
      </g>
      
      {/* Education */}
      <g transform="translate(15, 130)">
        <text x="0" y="4" fill="#1F2937" fontSize="5" fontWeight="600" fontFamily="serif">
          EDUCATION
        </text>
        <rect x="0" y="6" width="180" height="0.3" fill="#9CA3AF" />
        
        <g transform="translate(0, 12)">
          <rect x="0" y="0" width="60" height="3" fill="#374151" />
          <rect x="140" y="0" width="40" height="2.5" fill="#9CA3AF" />
          <rect x="0" y="5" width="45" height="2" fill="#6B7280" />
        </g>
      </g>
      
      {/* Two column section - Skills and Languages */}
      <g transform="translate(15, 165)">
        {/* Skills column */}
        <g>
          <text x="0" y="4" fill="#1F2937" fontSize="5" fontWeight="600" fontFamily="serif">
            CORE COMPETENCIES
          </text>
          <rect x="0" y="6" width="85" height="0.3" fill="#9CA3AF" />
          
          <rect x="0" y="12" width="80" height="1.5" fill="#D1D5DB" />
          <rect x="0" y="15" width="75" height="1.5" fill="#D1D5DB" />
          <rect x="0" y="18" width="78" height="1.5" fill="#D1D5DB" />
          <rect x="0" y="21" width="70" height="1.5" fill="#D1D5DB" />
        </g>
        
        {/* Languages column */}
        <g transform="translate(100, 0)">
          <text x="0" y="4" fill="#1F2937" fontSize="5" fontWeight="600" fontFamily="serif">
            LANGUAGES
          </text>
          <rect x="0" y="6" width="80" height="0.3" fill="#9CA3AF" />
          
          <rect x="0" y="12" width="30" height="2" fill="#374151" />
          <rect x="50" y="12" width="20" height="2" fill="#9CA3AF" />
          
          <rect x="0" y="17" width="30" height="2" fill="#374151" />
          <rect x="50" y="17" width="20" height="2" fill="#9CA3AF" />
        </g>
      </g>
      
      {/* Interests */}
      <g transform="translate(15, 200)">
        <text x="0" y="4" fill="#1F2937" fontSize="5" fontWeight="600" fontFamily="serif">
          INTERESTS
        </text>
        <rect x="0" y="6" width="180" height="0.3" fill="#9CA3AF" />
        
        <rect x="0" y="12" width="150" height="1.5" fill="#D1D5DB" />
      </g>
    </svg>
  );
}