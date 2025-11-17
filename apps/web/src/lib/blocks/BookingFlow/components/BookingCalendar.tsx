import { useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface DisabledDatesMap {
  [dateString: string]: boolean;
}

interface BookingCalendarProps {
  selectedDate: Date | undefined;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  disabledDates?: Date[];
  fullyBookedDates?: Date[];
  showTodayHighlight?: boolean;
}

/**
 * BookingCalendar now supports:
 * - disabledDates: custom blocked days
 * - fullyBookedDates: marked as unavailable in red
 * - today highlight toggle
 * - faster date lookups via hash maps
 */
export function BookingCalendar({
  selectedDate,
  onSelectDate,
  minDate = new Date(),
  disabledDates = [],
  fullyBookedDates = [],
  showTodayHighlight = true,
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

  const isToday = (date: Date) => {
    return new Date().toDateString() === date.toDateString()
  }

  const isDisabled = (date: Date) => {
    const baseDisabled = date < minDate
    const explicitDisabled = !!disabledMap[date.toDateString()]
    const fullyBooked = !!fullyBookedMap[date.toDateString()]
    return baseDisabled || explicitDisabled || fullyBooked
  }

  const isFullyBooked = (date: Date) => !!fullyBookedMap[date.toDateString()]

  const isSameMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth()
  }

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

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (!isExpanded) {
    // Week View
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-2">
          <p className="text-base text-slate-700 font-medium">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        <div className="flex items-start gap-9 justify-center">
          {weekDates.map((date, idx) => {
            const disabled = isDisabled(date)
            const selected = isSelected(date)
            
            return (
              <div key={idx} className="flex flex-col gap-2 items-center w-14">
                <button
                  onClick={() => !disabled && onSelectDate(date)}
                  disabled={disabled}
                  className={`
                    relative p-1 rounded-full transition-all
                    ${selected ? 'ring-2 ring-neutral-950 ring-offset-2' : ''}
                  `}
                >
                  <div
                    className={`
                      flex items-center justify-center rounded-full w-10 h-10 font-medium text-base
                      ${
                        selected
                          ? 'bg-slate-700 text-white'
                          : isFullyBooked(date)
                          ? 'bg-red-200 text-red-700 cursor-not-allowed'
                          : disabled
                          ? 'bg-transparent text-gray-300'
                          : 'bg-slate-700 text-white hover:bg-slate-600'
                      }
                      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {date.getDate()}
                  </div>
                </button>
                
                <div className="flex items-center justify-center p-2.5">
                  <p className={`text-lg font-bold ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                </div>
              </div>
            )
          })}
          
          {/* Expand Button */}
          <div className="flex flex-col gap-2 items-center w-14">
            <button
              onClick={() => setIsExpanded(true)}
              className="p-1 rounded-full transition-all hover:bg-gray-100"
            >
              <div className="flex items-center justify-center rounded-full w-10 h-10 border border-slate-400">
                <ChevronDown className="w-6 h-6 text-slate-700" />
              </div>
            </button>
            <div className="h-[36px]" />
          </div>
        </div>
      </div>
    )
  }

  // Full Month View
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          onClick={handlePrevMonth}
          className="p-0.5 border border-gray-200 rounded-md opacity-50 hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        
        <p className="text-xs font-medium tracking-tight">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        
        <button
          onClick={handleNextMonth}
          className="p-0.5 border border-gray-200 rounded-md opacity-50 hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-3 mb-4">
        {dayLabels.map((day, idx) => (
          <div key={idx} className="flex items-center justify-center">
            <p className={`text-xs font-semibold tracking-tight ${idx === 0 || idx === 6 ? 'text-gray-300' : 'text-gray-500'}`}>
              {day.charAt(0)}
            </p>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3">
        {monthDates.map((date, idx) => {
          const disabled = isDisabled(date) || !isSameMonth(date)
          const selected = isSelected(date)
          
          return (
            <button
              key={idx}
              onClick={() => !disabled && onSelectDate(date)}
              disabled={disabled}
              className={`
                flex items-center justify-center rounded-xl w-7 h-7 text-xs font-semibold transition-all
                ${
                  selected
                    ? 'bg-black text-white'
                    : isFullyBooked(date)
                    ? 'bg-red-200 text-red-700 cursor-not-allowed'
                    : disabled
                    ? 'text-gray-300'
                    : 'text-gray-700 hover:bg-gray-100'
                }
                ${showTodayHighlight && isToday(date) ? ' ring-1 ring-slate-400' : ''}
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      {/* Collapse Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsExpanded(false)}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <ChevronDown className="w-4 h-4 rotate-180" />
          Show less
        </button>
      </div>
    </div>
  )
}
