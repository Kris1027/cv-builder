import { useEffect, useState } from 'react';
import { Link, useSearch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ModernTemplate } from '@/components/templates/modern-template';
import type { CVData } from '@/data/sample-cv-data';
import { ArrowLeft, Download, FileText, Edit } from 'lucide-react';

export function PreviewPage() {
  const search = useSearch({ from: '/preview' }) as { templateId?: string };
  const templateId = search.templateId || 'modern';
  const [cvData, setCvData] = useState<CVData | null>(null);

  useEffect(() => {
    // Get data from sessionStorage
    const storedData = sessionStorage.getItem('cvData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Transform the data to match CVData structure
      const transformedData: CVData = {
        personalInfo: parsedData.personalInfo,
        experiences: parsedData.experiences || [],
        education: parsedData.educations || [], // Note: form uses 'educations' but template expects 'education'
        skills: parsedData.skills || [],
        languages: parsedData.languages || [],
        interests: parsedData.interests || [],
      };
      setCvData(transformedData);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (!cvData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No CV data found</h1>
          <p className="text-gray-600 mb-4">Please fill out the form first to preview your CV.</p>
          <Link to="/templates">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Building Your CV
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Actions Bar */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/builder" search={{ templateId }}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Editor
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Your CV Preview</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePrint}
              >
                <FileText className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleDownloadPDF}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Link to="/builder" search={{ templateId }}>
                <Button size="sm" variant="default">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit CV
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="container mx-auto px-4 py-4 print:hidden">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium">🎉 Congratulations! Your CV is ready.</p>
          <p className="text-green-700 text-sm mt-1">
            You can now print it, download as PDF, or continue editing.
          </p>
        </div>
      </div>

      {/* Template Preview */}
      <div className="container mx-auto px-4 py-8" id="print-container">
        <div id="cv-content" className="bg-white shadow-xl rounded-lg overflow-hidden">
          {templateId === 'modern' && <ModernTemplate data={cvData} />}
          {/* Add more templates here as they are created */}
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          
          /* Hide navigation and UI elements during print */
          .print\\:hidden {
            display: none !important;
          }
          
          /* Reset container styles for print */
          #print-container {
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
          }
          
          /* Clean CV content for print */
          #cv-content {
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}