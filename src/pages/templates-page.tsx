import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {templates.map((template, index) => (
            <Card
              key={template.id}
              className='group overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Section */}
              <Link to='/templates/$templateId' params={{ templateId: template.id }}>
                <div className='aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100'>
                  {/* Template Image */}
                  <img
                    src={template.image}
                    alt={`${template.name} preview`}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  
                  {/* Preview Button - appears on hover */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
                      <div className='bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 shadow-lg'>
                        <Eye className='w-5 h-5 text-gray-700' />
                        <span className='font-medium text-gray-700'>Quick Preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Card Header with Title */}
              <CardHeader className='pb-3'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {template.name}
                </h3>
              </CardHeader>
              
              {/* Card Content with Description */}
              <CardContent className='pt-0'>
                <p className='text-sm text-gray-600 leading-relaxed'>
                  {template.description}
                </p>
              </CardContent>
              
              {/* Card Footer with Action Buttons */}
              <CardFooter className='flex gap-3 pt-0'>
                <Link to='/templates/$templateId' params={{ templateId: template.id }} className='flex-1'>
                  <Button 
                    variant='outline' 
                    className='w-full group/btn hover:bg-gray-50'
                    size='sm'
                  >
                    <Eye className='w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110' />
                    Preview
                  </Button>
                </Link>
                <Link to='/builder' search={{ templateId: template.id }} className='flex-1'>
                  <Button 
                    className='w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-sm hover:shadow-md transition-all'
                    size='sm'
                  >
                    Use Template
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
