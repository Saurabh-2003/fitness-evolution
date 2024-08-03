"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const isPastDay = (day: Date) => {
    return day < new Date();
  };
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={isPastDay}
      className="rounded-md border"
    />
  )
}
