"use client";
import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DatePickerWithRangeProps {
  className?: string;
  value?: DateRange;
  onChange?: (range: DateRange) => void;
}

export function DatePickerWithRange({
  className,
  value,
  onChange,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value?.from && !value?.to && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "dd-MM-yyyy")} - {format(value.to, "dd-MM-yyyy")}
                </>
              ) : (
                format(value.from, "dd-MM-yyyy")
              )
            ) : (
              "Selecionar intervalo de datas"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col p-2">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={value?.from}
              selected={{
                from: value?.from,
                to: value?.to,
              }}
              onSelect={(range) => onChange?.({ from: range?.from, to: range?.to })}
              numberOfMonths={2}
              locale={ptBR}
            />
            <Button
              variant="ghost"
              className="mt-2"
              onClick={() => onChange?.({ from: undefined, to: undefined })}
            >
              <X className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}