"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  value?: Date | string
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  id?: string
  name?: string
  onBlur?: () => void
  disabled?: boolean
  fromYear?: number
  toYear?: number
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  id,
  name,
  onBlur,
  disabled,
  fromYear = 1960,
  toYear = new Date().getFullYear() + 10
}: DatePickerProps) {
  // Convert string value to Date if needed
  const dateValue = React.useMemo(() => {
    if (!value) return undefined
    if (value instanceof Date) return value
    // Handle YYYY-MM format
    if (typeof value === 'string' && value) {
      const [year, month] = value.split('-').map(Number)
      if (year && month) {
        return new Date(year, month - 1, 1)
      }
    }
    return undefined
  }, [value])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateValue && "text-muted-foreground"
          )}
          onBlur={onBlur}
          disabled={disabled}
          type="button"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateValue ? format(dateValue, "MMMM yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={onChange}
          defaultMonth={dateValue || new Date()}
          captionLayout="dropdown"
          // @ts-ignore - fromYear and toYear are deprecated but still functional
          fromYear={fromYear}
          // @ts-ignore - fromYear and toYear are deprecated but still functional
          toYear={toYear}
          className="rounded-md border"
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}