import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, Download, Edit3 } from 'lucide-react';

export const IndexPage = () => {
  return (
    <div className='bg-gradient-to-b from-background to-muted/20'>
      {/* Hero Section */}
      <section className='container mx-auto px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
            Build Your Perfect CV in{' '}
            <span className='bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
              Minutes
            </span>
          </h1>
          <p className='mb-10 text-xl text-muted-foreground'>
            Create professional resumes with our CV builder. Stand out from the crowd and land your
            dream job.
          </p>
          <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
            <Link to='/builder'>
              <Button size='lg' className='group'>
                <Edit3 className='mr-2 h-5 w-5' />
                Start Building Your CV
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <Button size='lg' variant='outline'>
              <Download className='mr-2 h-5 w-5' />
              Preview CV Templates
            </Button>
          </div>
          <div className='mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              <span>No sign-up required</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              <span>100% Free</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              <span>Export to PDF</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className='container mx-auto px-4 py-16'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-3xl font-bold sm:text-4xl'>How It Works</h2>
            <p className='text-lg text-muted-foreground'>
              Create your professional CV in three simple steps
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-3'>
            {/* Step 1 */}
            <div className='relative'>
              <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground'>
                1
              </div>
              <h3 className='mb-2 text-xl font-semibold'>Choose Your Template</h3>
              <p className='text-muted-foreground'>
                Select from our professionally designed templates that suit your industry and style
              </p>
              <div className='absolute -right-4 top-8 hidden h-0.5 w-8 bg-gradient-to-r from-primary to-transparent md:block' />
            </div>

            {/* Step 2 */}
            <div className='relative'>
              <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground'>
                2
              </div>
              <h3 className='mb-2 text-xl font-semibold'>Fill In Your Details</h3>
              <p className='text-muted-foreground'>
                Add your information with our intuitive form builder and smart suggestions
              </p>
              <div className='absolute -right-4 top-8 hidden h-0.5 w-8 bg-gradient-to-r from-primary to-transparent md:block' />
            </div>

            {/* Step 3 */}
            <div className='relative'>
              <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground'>
                3
              </div>
              <h3 className='mb-2 text-xl font-semibold'>Download & Apply</h3>
              <p className='text-muted-foreground'>
                Export your CV as a PDF and start applying to your dream jobs immediately
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container mx-auto px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          <Card className='bg-primary text-primary-foreground'>
            <CardHeader>
              <CardTitle className='text-3xl sm:text-4xl'>Ready to Build Your CV?</CardTitle>
              <CardDescription className='text-lg text-primary-foreground/90'>
                Join thousands of job seekers who have successfully landed their dream jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to='/builder'>
                <Button size='lg' variant='secondary' className='group'>
                  Start Building Now
                  <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                </Button>
              </Link>
              <p className='mt-4 text-sm text-primary-foreground/80'>
                No credit card required • 100% free forever
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
