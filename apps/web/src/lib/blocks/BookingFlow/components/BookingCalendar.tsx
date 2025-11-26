import { useState } from 'react'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

interface DisabledDatesMap {
  [dateString: string]: boolean;
}

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date) => void;
  duration?: number;
  onDurationChange?: (duration: number) => void;
  minDate?: Date;
  disabledDates?: Date[];
  fullyBookedDates?: Date[];
  onNextAvailableDate?: () => void;
  isRecurring?: boolean;
  onRecurringChange?: (isRecurring: boolean) => void;
}

/**
 * BookingCalendar now supports:
 * - disabledDates: custom blocked days
 * - fullyBookedDates: marked as unavailable in red
 * - faster date lookups via hash maps
 * - collapsed (week) and expanded (dual month) views
 * - duration slider (30, 60, 90, 120 min)
 * - Next Available Date and Recurring options
 */
export function BookingCalendar({
  selectedDate,
  onSelectDate,
  duration = 60,
  onDurationChange,
  minDate = new Date(),
  disabledDates = [],
  fullyBookedDates = [],
  onNextAvailableDate,
  isRecurring = false,
  onRecurringChange,
}: BookingCalendarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const disabledMap: DisabledDatesMap = Object.fromEntries(
    disabledDates.map(d => [d.toDateString(), true])
  )

  const fullyBookedMap: DisabledDatesMap = Object.fromEntries(
    fullyBookedDates.map(d => [d.toDateString(), true])
  )

  // Get week dates centered around selected date or current date
  const getWeekDates = () => {
    const baseDate = selectedDate || new Date()
    const dates: Date[] = []
    
    // Get the current day of week (0-6)
    
    // Calculate start of week (showing 7 days)
    for (let i = -3; i <= 3; i++) {
      const date = new Date(baseDate)
      date.setDate(baseDate.getDate() + i)
      dates.push(date)
    }
    
    return dates
  }

  // Generate calendar grid for a month
  const getMonthDates = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    
    const firstDay = new Date(year, month, 1)
    // const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const dates: Date[] = []
    const current = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      dates.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return dates
  }

  const weekDates = getWeekDates()
  const monthDates = getMonthDates(currentMonth)

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString()
  }

  const isDisabled = (date: Date) => {
    const baseDisabled = date < minDate
    const explicitDisabled = !!disabledMap[date.toDateString()]
    const fullyBooked = !!fullyBookedMap[date.toDateString()]
    return baseDisabled || explicitDisabled || fullyBooked
  }

  const isFullyBooked = (date: Date) => !!fullyBookedMap[date.toDateString()]

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  // Map slider value (0-3) to duration (30, 60, 90, 120)
  const durationOptions = [30, 60, 90, 120]
  const sliderValue = durationOptions.indexOf(duration)
  const handleSliderChange = (value: number[]) => {
    if (onDurationChange) {
      onDurationChange(durationOptions[value[0]])
    }
  }

  // Prepare data for expanded view
  const nextMonth = new Date(currentMonth)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  const nextMonthDates = getMonthDates(nextMonth)

  const renderMonthCalendar = (month: Date, dates: Date[]) => (
    <div className="flex-1 min-w-0">
      {/* Month Header */}
      <div className="flex items-center justify-center mb-4">
        <p className="text-sm font-medium tracking-tight text-gray-900">
          {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div key={idx} className="flex items-center justify-center">
            <p className="text-xs font-medium text-gray-500">
              {day}
            </p>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, idx) => {
          const disabled = isDisabled(date) || date.getMonth() !== month.getMonth()
          const selected = isSelected(date)
          const outOfMonth = date.getMonth() !== month.getMonth()

          return (
            <button
              key={idx}
              onClick={() => !disabled && onSelectDate(date)}
              disabled={disabled}
              className={`
                flex items-center justify-center rounded-full w-8 h-8 text-sm font-medium transition-all
                ${
                  selected
                    ? 'bg-slate-950 text-white ring-2 ring-slate-950 ring-offset-2'
                    : isFullyBooked(date) && !outOfMonth
                    ? 'bg-red-100 text-red-600 cursor-not-allowed'
                    : disabled || outOfMonth
                    ? 'text-gray-300 bg-transparent'
                    : 'text-gray-900 hover:bg-gray-100 bg-slate-100'
                }
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )

  const calendarView = !isExpanded ? (
    // Week View
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-2">
        <p className="text-base text-slate-900 font-normal">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="flex items-start gap-6 justify-center">
          {weekDates.map((date, idx) => {
            const disabled = isDisabled(date)
            const selected = isSelected(date)

            return (
              <div key={idx} className="flex flex-col gap-3 items-center">
                <button
                  onClick={() => !disabled && onSelectDate(date)}
                  disabled={disabled}
                  className={`
                    relative rounded-full transition-all
                    ${selected ? 'ring-2 ring-slate-950 ring-offset-2' : ''}
                  `}
                >
                  <div
                    className={`
                      flex items-center justify-center rounded-full w-12 h-12 font-semibold text-base
                      ${
                        selected
                          ? 'bg-slate-950 text-white'
                          : isFullyBooked(date)
                          ? 'bg-red-100 text-red-600 cursor-not-allowed'
                          : disabled
                          ? 'bg-gray-100 text-gray-300'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }
                      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {date.getDate()}
                  </div>
                </button>

                <div className="flex items-center justify-center">
                  <p className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                </div>
              </div>
            )
          })}

        {/* Expand Button */}
        <div className="flex flex-col gap-3 items-center">
          <button
            onClick={() => setIsExpanded(true)}
            className="rounded-full transition-all hover:bg-gray-50"
          >
            <div className="flex items-center justify-center rounded-full w-12 h-12 border-2 border-gray-200">
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </div>
          </button>
          <div className="h-[20px]" />
        </div>
      </div>
    </div>
  ) : (
    // Full Month View - Two Months Side by Side
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-between px-2">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={() => setIsExpanded(false)}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          <ChevronDown className="w-4 h-4 rotate-180" />
        </button>

        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Two Month Calendars */}
      <div className="flex gap-8 justify-center">
        {renderMonthCalendar(currentMonth, monthDates)}
        {renderMonthCalendar(nextMonth, nextMonthDates)}
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Select Date & Time</h3>
        </div>
        <p className="text-sm text-gray-600">Choose your preferred appointment date and time slot</p>
      </div>

      {/* Duration Slider */}
      <div className="space-y-3">
        <div className="relative px-4">
          <Slider
            value={[sliderValue]}
            onValueChange={handleSliderChange}
            min={0}
            max={3}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex justify-between px-2">
          {durationOptions.map((dur) => (
            <button
              key={dur}
              onClick={() => onDurationChange?.(dur)}
              className={`text-sm font-medium transition-colors ${
                duration === dur ? 'text-slate-900' : 'text-gray-400'
              }`}
            >
              {dur} min
            </button>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      {calendarView}

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onNextAvailableDate}
          className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700"
        >
          Next Available Date →
        </button>

        <button
          onClick={() => onRecurringChange?.(!isRecurring)}
          className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700"
        >
          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
            isRecurring ? 'bg-slate-900 border-slate-900' : 'border-gray-300'
          }`}>
            {isRecurring && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          Recurring
        </button>
      </div>
    </div>
  )
}
