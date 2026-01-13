import { useParams, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { DeveloperTemplate } from '@/components/templates/developer-template';
import { DefaultTemplate } from '@/components/templates/default-template';
import { VeterinaryTemplate } from '@/components/templates/veterinary-template';
import { sampleCVData, sampleDefaultCVData } from '@/data/sample-cv-data';
import { ArrowLeft, Edit } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function TemplatePage() {
  const { templateId } = useParams({ from: '/templates_/$templateId' });

  const getTemplateName = () => {
    switch (templateId) {
      case 'developer':
        return 'Developer Template';
      case 'default':
        return 'Default Template';
      case 'veterinary':
        return 'Veterinary Template';
      default:
        return 'Template';
    }
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'developer':
        return <DeveloperTemplate data={sampleCVData} />;
      case 'default':
        return <DefaultTemplate data={sampleDefaultCVData} />;
      case 'veterinary':
        return <VeterinaryTemplate data={sampleCVData} />;
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Actions Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/templates">
                <Button variant="outline" size="sm" className="dark:hover:bg-gray-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Templates
                </Button>
              </Link>
              <h1 className="text-xl font-semibold dark:text-gray-100">{getTemplateName()} Preview</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Link to="/builder" search={{ templateId }}>
                <Button size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Use This Template
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Template Preview */}
      <div className="py-8">
        <div className="bg-white text-gray-900 shadow-xl dark:shadow-gray-900/50 overflow-hidden max-w-[210mm] mx-auto">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}