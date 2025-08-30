import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, ArrowLeft } from 'lucide-react';
import modernTemplateImg from '@/assets/templates/modern-template.png';
import businessTemplateImg from '@/assets/templates/business-template.png';

const templates = [
  {
    id: 'modern',
    name: 'Modern Template',
    description: 'Clean and professional design with a blue header and organized sections',
    image: modernTemplateImg,
  },
  {
    id: 'business',
    name: 'Business Template',
    description: 'Traditional and formal design perfect for corporate and executive positions',
    image: businessTemplateImg,
  },
];

export function TemplatesPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navigation Bar */}
      <div className='sticky top-0 z-10 bg-white border-b shadow-sm'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Link to='/'>
                <Button variant='outline' size='sm'>
                  <ArrowLeft className='w-4 h-4 mr-2' />
                  Back to Home
                </Button>
              </Link>
              <h1 className='text-xl font-semibold'>CV Templates</h1>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Choose Your CV Template</h1>
          <p className='text-gray-600'>
            Select a template that best represents your professional style
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {templates.map((template) => (
            <Card key={template.id} className='overflow-hidden hover:shadow-lg transition-shadow'>
              <Link to='/templates/$templateId' params={{ templateId: template.id }}>
                <div className='aspect-[3/4] bg-white relative overflow-hidden cursor-pointer group'>
                  {/* Template Image */}
                  <img
                    src={template.image}
                    alt={`${template.name} preview`}
                    className='w-full h-full object-cover'
                    loading="lazy"
                  />

                  {/* Overlay on hover - only show on hover */}
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50'>
                    <div className='text-white text-center p-4'>
                      <Eye className='w-12 h-12 mx-auto mb-2' />
                      <p className='font-semibold text-lg'>Template Preview</p>
                      <p className='text-sm mt-2'>Click to preview</p>
                    </div>
                  </div>
                </div>
              </Link>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to='/builder' search={{ templateId: template.id }}>
                  <Button className='w-full'>Use This Template</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
