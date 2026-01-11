import { useEffect, useState, useCallback } from 'react';
import { Link, useSearch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ModernTemplate } from '@/components/templates/modern-template';
import { BusinessTemplate } from '@/components/templates/business-template';
import { VeterinaryTemplate } from '@/components/templates/veterinary-template';
import { ScaleToFitContainer } from '@/components/scale-to-fit-container';
import type { CVData } from '@/data/sample-cv-data';
import { ArrowLeft, Download, FileText, Edit, Loader2, FileDown, Files } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { exportToPDF, generateCVFilename } from '@/lib/pdf-export';

export function PreviewPage() {
  const search = useSearch({ from: '/preview' }) as { templateId?: string };
  const templateId = search.templateId || 'modern';
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [singlePageMode, setSinglePageMode] = useState(false);
  const [scaleInfo, setScaleInfo] = useState({ scale: 1, isScaled: false, atMinScale: false });

  const handleScaleChange = useCallback((scale: number, isScaled: boolean, atMinScale: boolean) => {
    setScaleInfo({ scale, isScaled, atMinScale });
  }, []);

  useEffect(() => {
    // Get data from localStorage
    const storedData = localStorage.getItem('cvData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Ensure all arrays have default values
      const transformedData: CVData = {
        personalInfo: parsedData.personalInfo,
        experiences: parsedData.experiences || [],
        education: parsedData.education || [],
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

  const handleDownloadPDF = async () => {
    const element = document.getElementById('cv-content');
    if (!element || !cvData) return;

    setIsExporting(true);

    // Store original styles for restoration
    const scaledParent = element.parentElement;
    const originalStyles = scaledParent ? {
      transform: scaledParent.style.transform,
      width: scaledParent.style.width,
    } : null;

    const disableScaling = () => {
      if (scaledParent && singlePageMode) {
        scaledParent.style.transform = 'none';
        scaledParent.style.width = '';
      }
    };

    const restoreScaling = () => {
      if (scaledParent && singlePageMode && originalStyles) {
        scaledParent.style.transform = originalStyles.transform;
        scaledParent.style.width = originalStyles.width;
      }
    };

    try {
      // Temporarily disable CSS transform scaling for accurate capture
      disableScaling();

      const filename = generateCVFilename(
        cvData.personalInfo?.firstName,
        cvData.personalInfo?.lastName
      );
      await exportToPDF(element, {
        filename,
        singlePage: singlePageMode,
      });
    } catch (error) {
      console.error('Failed to export PDF:', error);
      alert('Failed to export PDF. Please try again or use the Print option.');
    } finally {
      restoreScaling();
      setIsExporting(false);
    }
  };

  if (!cvData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-gray-100">No CV data found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Please fill out the form first to preview your CV.</p>
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Actions Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/builder" search={{ templateId, edit: true }}>
                <Button variant="outline" size="sm" className="dark:hover:bg-gray-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Editor
                </Button>
              </Link>
              <h1 className="text-xl font-semibold dark:text-gray-100">Your CV Preview</h1>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Page Mode Toggle */}
              <div className="flex items-center border rounded-lg overflow-hidden dark:border-gray-700">
                <Button
                  variant={!singlePageMode ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSinglePageMode(false)}
                  className={`rounded-none border-0 ${!singlePageMode ? '' : 'dark:hover:bg-gray-800'}`}
                >
                  <Files className="w-4 h-4 mr-1" />
                  Multi
                </Button>
                <Button
                  variant={singlePageMode ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSinglePageMode(true)}
                  className={`rounded-none border-0 ${singlePageMode ? '' : 'dark:hover:bg-gray-800'}`}
                >
                  <FileDown className="w-4 h-4 mr-1" />
                  Single
                </Button>
              </div>

              {/* Scale indicator */}
              {singlePageMode && scaleInfo.isScaled && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(scaleInfo.scale * 100)}%
                </span>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="dark:hover:bg-gray-800"
              >
                <FileText className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="dark:hover:bg-gray-800"
              >
                {isExporting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {isExporting ? 'Exporting...' : 'Download PDF'}
              </Button>
              <Link to="/builder" search={{ templateId, edit: true }}>
                <Button size="sm" variant="default">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit CV
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="container mx-auto px-4 py-4 print:hidden">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-300 font-medium">🎉 Congratulations! Your CV is ready.</p>
          <p className="text-green-700 dark:text-green-400 text-sm mt-1">
            You can now print it, download as PDF, or continue editing.
          </p>
        </div>
      </div>

      {/* Warning for minimum scale */}
      {singlePageMode && scaleInfo.atMinScale && (
        <div className="container mx-auto px-4 print:hidden">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
            <p className="text-amber-800 dark:text-amber-300 font-medium">Content is very long</p>
            <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
              Your CV has been scaled to the minimum (50%). Consider reducing content for better readability.
            </p>
          </div>
        </div>
      )}

      {/* Template Preview */}
      <div className="py-8" id="print-container">
        <ScaleToFitContainer
          enabled={singlePageMode}
          onScaleChange={handleScaleChange}
          className="max-w-[210mm] mx-auto"
        >
          <div id="cv-content" className="bg-white text-gray-900 shadow-xl overflow-hidden">
            {templateId === 'modern' && <ModernTemplate data={cvData} />}
            {templateId === 'business' && <BusinessTemplate data={cvData} />}
            {templateId === 'veterinary' && <VeterinaryTemplate data={cvData} />}
          </div>
        </ScaleToFitContainer>
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