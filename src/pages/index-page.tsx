import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, Edit3 } from 'lucide-react';

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
          <div className='flex justify-center'>
            <Link to='/templates'>
              <Button size='lg' className='group'>
                <Edit3 className='mr-2 h-5 w-5' />
                Start Building Your CV
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
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
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-2xl text-center mb-16'>
            <h2 className='text-3xl font-bold mb-4'>How it works</h2>
            <p className='text-muted-foreground'>
              Create your professional CV in three simple steps
            </p>
          </div>

          <div className='mx-auto max-w-5xl'>
            <div className='flex flex-col md:flex-row gap-8 md:gap-4 items-start justify-between'>
              {/* Step 1 */}
              <div className='flex-1 text-center relative'>
                <div className='mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium mb-4'>
                  1
                </div>
                <h3 className='font-semibold mb-2'>Choose a template</h3>
                <p className='text-muted-foreground text-sm'>
                  Select from our collection of professional designs
                </p>
                {/* Connector Line for desktop */}
                <div className='hidden md:block absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-px bg-border' />
              </div>

              {/* Step 2 */}
              <div className='flex-1 text-center relative'>
                <div className='mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium mb-4'>
                  2
                </div>
                <h3 className='font-semibold mb-2'>Fill in your details</h3>
                <p className='text-muted-foreground text-sm'>
                  Add your information using our simple form
                </p>
                {/* Connector Line for desktop */}
                <div className='hidden md:block absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-px bg-border' />
              </div>

              {/* Step 3 */}
              <div className='flex-1 text-center'>
                <div className='mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium mb-4'>
                  3
                </div>
                <h3 className='font-semibold mb-2'>Download your CV</h3>
                <p className='text-muted-foreground text-sm'>
                  Export as PDF and start applying to jobs
                </p>
              </div>
            </div>
          </div>

          {/* Simple Features */}
          <div className='mx-auto max-w-3xl mt-20 grid grid-cols-3 gap-8 text-center'>
            <div>
              <p className='text-2xl font-bold mb-1'>5 min</p>
              <p className='text-sm text-muted-foreground'>Average time</p>
            </div>
            <div>
              <p className='text-2xl font-bold mb-1'>100%</p>
              <p className='text-sm text-muted-foreground'>Free forever</p>
            </div>
            <div>
              <p className='text-2xl font-bold mb-1'>ATS</p>
              <p className='text-sm text-muted-foreground'>Optimized</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default IndexPage;
