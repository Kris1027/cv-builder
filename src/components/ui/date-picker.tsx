import * as React from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DatePickerProps {
  value?: Date | string;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  onBlur?: () => void;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  id,
  name,
  onBlur,
  disabled,
  fromYear = 1960,
  toYear = new Date().getFullYear() + 10,
}: DatePickerProps) {
  // Convert string value to Date if needed
  const dateValue = React.useMemo(() => {
    if (!value) return undefined;
    if (value instanceof Date) return value;
    // Handle YYYY-MM format
    if (typeof value === 'string' && value) {
      const [year, month] = value.split('-').map(Number);
      if (year && month) {
        return new Date(year, month - 1, 1);
      }
    }
    return undefined;
  }, [value]);

  const [selectedMonth, setSelectedMonth] = React.useState(
    dateValue ? dateValue.getMonth() : new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = React.useState(
    dateValue ? dateValue.getFullYear() : new Date().getFullYear()
  );
  const [isOpen, setIsOpen] = React.useState(false);

  // Update selected month/year when value changes
  React.useEffect(() => {
    if (dateValue) {
      setSelectedMonth(dateValue.getMonth());
      setSelectedYear(dateValue.getFullYear());
    }
  }, [dateValue]);

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(selectedYear, month, 1);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // Don't close the popover when changing year
  };

  const incrementYear = () => {
    if (selectedYear < toYear) {
      setSelectedYear(selectedYear + 1);
    }
  };

  const decrementYear = () => {
    if (selectedYear > fromYear) {
      setSelectedYear(selectedYear - 1);
    }
  };

  const formatDisplay = () => {
    if (dateValue) {
      return `${months[dateValue.getMonth()]} ${dateValue.getFullYear()}`;
    }
    return placeholder;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal',
            !dateValue && 'text-muted-foreground'
          )}
          onBlur={onBlur}
          disabled={disabled}
          type='button'
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          <span>{formatDisplay()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-4' align='start'>
        <div className='space-y-4'>
          {/* Year selector */}
          <div className='flex items-center justify-between'>
            <Button
              variant='ghost'
              size='icon'
              onClick={decrementYear}
              disabled={selectedYear <= fromYear}
              type='button'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Select
              value={selectedYear.toString()}
              onValueChange={(value) => handleYearChange(Number(value))}
            >
              <SelectTrigger className='w-32'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: toYear - fromYear + 1 }, (_, i) => fromYear + i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant='ghost'
              size='icon'
              onClick={incrementYear}
              disabled={selectedYear >= toYear}
              type='button'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>

          {/* Month grid */}
          <div className='grid grid-cols-3 gap-2'>
            {months.map((month, index) => (
              <Button
                key={month}
                variant={selectedMonth === index && dateValue ? 'default' : 'outline'}
                size='sm'
                onClick={() => handleMonthSelect(index)}
                className='h-9'
                type='button'
              >
                {month.slice(0, 3)}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}