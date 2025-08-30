import { useParams, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ModernTemplate } from '@/components/templates/modern-template';
import { BusinessTemplate } from '@/components/templates/business-template';
import { sampleCVData } from '@/data/sample-cv-data';
import { ArrowLeft, Download, FileText, Edit } from 'lucide-react';

export function TemplatePage() {
  const { templateId } = useParams({ from: '/templates_/$templateId' });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const getTemplateName = () => {
    switch (templateId) {
      case 'modern':
        return 'Modern Template';
      case 'business':
        return 'Business Template';
      default:
        return 'Template';
    }
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern':
        return <ModernTemplate data={sampleCVData} />;
      case 'business':
        return <BusinessTemplate data={sampleCVData} />;
      default:
        return (
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold mb-4">Template not found</h1>
            <Link to="/templates">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Templates
              </Button>
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Actions Bar */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/templates">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Templates
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">{getTemplateName()} Preview</h1>
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
                <Button size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Use This Template
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          {renderTemplate()}
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .container > div:last-child,
          .container > div:last-child * {
            visibility: visible;
          }
          .container > div:last-child {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .sticky {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}