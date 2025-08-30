import { Link } from '@tanstack/react-router';
import { FileText } from 'lucide-react';
import { Button } from './ui/button';

export const NavigationBar = () => {
  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-14 items-center justify-between px-4'>
        <Link to='/' className='flex items-center space-x-2'>
          <FileText className='h-6 w-6' />
          <span className='font-bold'>CV Builder</span>
        </Link>
        <div className='flex items-center space-x-4'>
          <Link to='/templates'>
            <Button variant='ghost' size='sm'>Templates</Button>
          </Link>
          <Link to='/builder'>
            <Button size='sm'>Create CV</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
