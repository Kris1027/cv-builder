import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern Template',
    description: 'Clean and professional design with a blue header and organized sections',
    thumbnail: '/templates/modern-thumbnail.png',
  },
];

export function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose Your CV Template</h1>
        <p className="text-gray-600">
          Select a template that best represents your professional style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
              <div className="text-gray-400 text-center p-4">
                <Eye className="w-12 h-12 mx-auto mb-2" />
                <p>Template Preview</p>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={`/templates/${template.id}`}>
                <Button className="w-full">
                  Use This Template
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}