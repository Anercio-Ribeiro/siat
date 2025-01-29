// import React, { useState, useEffect } from 'react';
// import { Calendar } from 'lucide-react';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// interface RentalCardProps {
//   pricePerNight: number;
// }

// const RentalCard: React.FC<RentalCardProps> = ({ pricePerNight }) => {
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [totalNights, setTotalNights] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false);

//   useEffect(() => {
//     if (startDate && endDate) {
//       const nights = Math.ceil(((endDate as Date).getTime() - (startDate as Date).getTime()) / (1000 * 60 * 60 * 24));
//       setTotalNights(nights);
//       setTotalPrice(nights * pricePerNight);
//     } else {
//       setTotalNights(0);
//       setTotalPrice(0);
//     }
//   }, [startDate, endDate, pricePerNight]);

//   const CustomHeader = ({
//     date,
//     decreaseMonth,
//     increaseMonth,
//     prevMonthButtonDisabled,
//     nextMonthButtonDisabled,
//   }: {
//     date: Date;
//     decreaseMonth: () => void;
//     increaseMonth: () => void;
//     prevMonthButtonDisabled: boolean;
//     nextMonthButtonDisabled: boolean;
//   }) => (
//     <div className="flex items-center justify-center p-2">
//       <span className="text-base font-semibold">
//         {date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
//       </span>
//     </div>
//   );

//   return (
//     <Card className="w-full shadow-lg">
//       <CardHeader className="pb-4 px-6">
//         <div className="text-2xl font-bold">
//           {pricePerNight.toLocaleString('pt-AO', {
//             style: 'currency',
//             currency: 'AOA'
//           })} <span className="text-sm font-normal">noite</span>
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-4 px-6">
//         <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
//           <div className="grid grid-cols-2 border rounded-lg">
//             <DialogTrigger asChild>
//               <button className="p-3 text-left hover:bg-gray-50 border-r">
//                 <div className="text-xs font-medium">CHECK-IN</div>
//                 <div>{startDate ? startDate.toLocaleDateString() : 'Adicionar data'}</div>
//               </button>
//             </DialogTrigger>
//             <DialogTrigger asChild>
//               <button className="p-3 text-left hover:bg-gray-50">
//                 <div className="text-xs font-medium">CHECKOUT</div>
//                 <div>{endDate ? endDate.toLocaleDateString() : 'Adicionar data'}</div>
//               </button>
//             </DialogTrigger>
//           </div>
//           <DialogContent className="p-4 max-w-3xl">
//             <div className="text-center mb-4">
//               <h3 className="text-lg font-semibold">Selecione as datas</h3>
//               <p className="text-sm text-gray-500">
//                 Reserva mínima: 1 noite
//               </p>
//             </div>
//             <div className="custom-calendar-wrapper">
//               <DatePicker
//                 selected={startDate}
//                 onChange={(dates: [Date | null, Date | null]) => {
//                   const [start, end] = dates;
//                   setStartDate(start);
//                   setEndDate(end);
//                   if (start && end) {
//                     setIsCalendarOpen(false);
//                   }
//                 }}
//                 startDate={startDate}
//                 endDate={endDate}
//                 monthsShown={2}
//                 selectsRange
//                 inline
//                 minDate={new Date()}
//                 renderCustomHeader={CustomHeader}
//                 calendarClassName="custom-airbnb-calendar"
//                 wrapperClassName="custom-calendar-wrapper"
//                 dayClassName={date =>
//                   `custom-day ${
//                     startDate && endDate && date >= startDate && date <= endDate
//                       ? 'selected-day'
//                       : ''
//                   }`
//                 }
//               />
//             </div>
//           </DialogContent>
//         </Dialog>

//         <Button 
//           className="w-full bg-pink-600 hover:bg-pink-700 text-white"
//           disabled={!startDate || !endDate}
//         >
//           Alugar
//         </Button>

//         {totalNights > 0 && (
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <div className="underline">
//                 {pricePerNight.toLocaleString('pt-AO', {
//                   style: 'currency',
//                   currency: 'AOA'
//                 })} x {totalNights} noites
//               </div>
//               <div>
//                 {(pricePerNight * totalNights).toLocaleString('pt-AO', {
//                   style: 'currency',
//                   currency: 'AOA'
//                 })}
//               </div>
//             </div>
            
//             <Separator />
            
//             <div className="flex justify-between items-center font-bold">
//               <div>Total</div>
//               <div>
//                 {totalPrice.toLocaleString('pt-AO', {
//                   style: 'currency',
//                   currency: 'AOA'
//                 })}
//               </div>
//             </div>
//           </div>
//         )}
//       </CardContent>

//       <style jsx global>{`
//         .custom-calendar-wrapper {
//           width: 100%;
//         }
        
//         .custom-airbnb-calendar {
//           width: 100%;
//           border: none;
//           background: white;
//         }

//         .custom-airbnb-calendar .react-datepicker__month-container {
//           float: left;
//           width: 50%;
//         }

//         .custom-airbnb-calendar .react-datepicker__day {
//           margin: 0;
//           width: 40px;
//           height: 40px;
//           line-height: 40px;
//           border-radius: 50%;
//           color: #484848;
//         }

//         .custom-airbnb-calendar .react-datepicker__day:hover {
//           background-color: #f7f7f7;
//           border-radius: 50%;
//         }

//         .custom-airbnb-calendar .react-datepicker__day--selected,
//         .custom-airbnb-calendar .react-datepicker__day--in-range {
//           background-color: #f472b6;
//           color: white;
//           border-radius: 50%;
//         }

//         .custom-airbnb-calendar .react-datepicker__day--in-selecting-range {
//           background-color: rgba(244, 114, 182, 0.1);
//           border-radius: 0;
//         }

//         .custom-airbnb-calendar .react-datepicker__day--selected:hover,
//         .custom-airbnb-calendar .react-datepicker__day--in-range:hover {
//           background-color: #ec4899;
//         }

//         .custom-airbnb-calendar .react-datepicker__day--selecting-range-start,
//         .custom-airbnb-calendar .react-datepicker__day--selecting-range-end {
//           background-color: #f472b6;
//           color: white;
//           border-radius: 50%;
//         }

//         .custom-airbnb-calendar .react-datepicker__header {
//           background-color: white;
//           border-bottom: none;
//         }

//         .custom-airbnb-calendar .react-datepicker__current-month {
//           font-size: 1rem;
//           font-weight: 600;
//           color: #222222;
//         }

//         .custom-airbnb-calendar .react-datepicker__day-name {
//           width: 40px;
//           color: #757575;
//         }

//         .custom-airbnb-calendar .react-datepicker__navigation {
//           top: 1rem;
//         }
//       `}</style>
//     </Card>
//   );
// };

// export default RentalCard;


import React, { useState, useEffect } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

interface RentalCardProps {
  pricePerNight: number;
}

const RentalCard: React.FC<RentalCardProps> = ({ pricePerNight }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      const nights = Math.ceil(((endDate as Date).getTime() - (startDate as Date).getTime()) / (1000 * 60 * 60 * 24));
      setTotalNights(nights);
      setTotalPrice(nights * pricePerNight);
    } else {
      setTotalNights(0);
      setTotalPrice(0);
    }
  }, [startDate, endDate, pricePerNight]);

  const formatDateRange = () => {
    if (!startDate || !endDate) return '';
    
    const formatOptions: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    
    return `${startDate.toLocaleDateString('pt-BR', formatOptions)} - ${endDate.toLocaleDateString('pt-BR', formatOptions)}`;
  };

  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: {
    date: Date;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
  }) => (
    <div className="flex items-center justify-between px-4 py-2">
      <Button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-base font-semibold">
        {date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
      </span>
      <Button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (!isSelectingEnd && start && !end) {
      setStartDate(start);
      setIsSelectingEnd(true);
    } else {
      setStartDate(start);
      setEndDate(end);
      if (start && end) {
        setIsSelectingEnd(false);
        setIsCalendarOpen(false);
      }
    }
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
    setIsSelectingEnd(false);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-4 px-6">
        <div className="text-2xl font-bold">
          {pricePerNight.toLocaleString('pt-AO', {
            style: 'currency',
            currency: 'AOA'
          })} <span className="text-sm font-normal">noite</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-6">
        <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <div className="grid grid-cols-2 border rounded-lg">
            <DialogTrigger asChild>
              <button className="p-3 text-left hover:bg-gray-50 border-r">
                <div className="text-xs font-medium">CHECK-IN</div>
                <div>{startDate ? startDate.toLocaleDateString() : 'Adicionar data'}</div>
              </button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <button className="p-3 text-left hover:bg-gray-50">
                <div className="text-xs font-medium">CHECKOUT</div>
                <div>{endDate ? endDate.toLocaleDateString() : 'Adicionar data'}</div>
              </button>
            </DialogTrigger>
          </div>
          <DialogContent className="p-4 max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                {startDate && endDate && (
                  <div>
                    <div className="text-lg font-semibold">{totalNights} noites</div>
                    <div className="text-sm text-gray-600">{formatDateRange()}</div>
                  </div>
                )}
                {!startDate && !endDate && (
                  <div className="text-lg font-semibold">Selecione as datas</div>
                )}
                {startDate && !endDate && (
                  <div className="text-lg font-semibold">Selecione a data de checkout</div>
                )}
              </div>
              <div className="flex gap-2">
                {(startDate || endDate) && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleClearDates}
                  >
                    Limpar datas
                  </Button>
                )}
                <DialogClose asChild>
                  <Button 
                    size="icon" 
                    variant="ghost"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </div>
            </div>
            <div className="custom-calendar-wrapper">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                monthsShown={2}
                selectsRange
                inline
                locale="pt-BR"
                minDate={new Date()}
                renderCustomHeader={CustomHeader}
                calendarClassName="custom-airbnb-calendar"
                wrapperClassName="custom-calendar-wrapper"
                dayClassName={date =>
                  `custom-day ${
                    startDate && endDate && date >= startDate && date <= endDate
                      ? 'selected-day'
                      : ''
                  }`
                }
              />
            </div>
          </DialogContent>
        </Dialog>

        <Button 
          className="w-full bg-pink-600 hover:bg-pink-700 text-white"
          disabled={!startDate || !endDate}
        >
          Alugar
        </Button>

        {totalNights > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="underline">
                {pricePerNight.toLocaleString('pt-AO', {
                  style: 'currency',
                  currency: 'AOA'
                })} x {totalNights} noites
              </div>
              <div>
                {(pricePerNight * totalNights).toLocaleString('pt-AO', {
                  style: 'currency',
                  currency: 'AOA'
                })}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center font-bold">
              <div>Total</div>
              <div>
                {totalPrice.toLocaleString('pt-AO', {
                  style: 'currency',
                  currency: 'AOA'
                })}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <style jsx global>{`
        .custom-calendar-wrapper {
          width: 100%;
        }
        
        .custom-airbnb-calendar {
          width: 100%;
          border: none;
          background: white;
        }

        .custom-airbnb-calendar .react-datepicker__month-container {
          float: left;
          width: 50%;
        }

        .custom-airbnb-calendar .react-datepicker__day {
          margin: 0;
          width: 40px;
          height: 40px;
          line-height: 40px;
          border-radius: 50%;
          color: #484848;
          cursor: pointer;
        }

        .custom-airbnb-calendar .react-datepicker__day:hover {
          background-color: #ec4899;
          color: white;
          border-radius: 50%;
        }

        .custom-airbnb-calendar .react-datepicker__day--selected,
        .custom-airbnb-calendar .react-datepicker__day--in-range {
          background-color: #222222;
          color: white;
          border-radius: 50%;
        }

        .custom-airbnb-calendar .react-datepicker__day--in-selecting-range {
          background-color: rgba(34, 34, 34, 0.1);
          border-radius: 0;
        }

        .custom-airbnb-calendar .react-datepicker__day--selected:hover,
        .custom-airbnb-calendar .react-datepicker__day--in-range:hover {
          background-color: #ec4899;
          color: white;
        }

        .custom-airbnb-calendar .react-datepicker__day--selecting-range-start,
        .custom-airbnb-calendar .react-datepicker__day--selecting-range-end {
          background-color: #222222;
          color: white;
          border-radius: 50%;
        }

        .custom-airbnb-calendar .react-datepicker__header {
          background-color: white;
          border-bottom: none;
        }

        .custom-airbnb-calendar .react-datepicker__current-month {
          font-size: 1rem;
          font-weight: 600;
          color: #222222;
        }

        .custom-airbnb-calendar .react-datepicker__day-name {
          width: 40px;
          color: #757575;
        }

        .custom-airbnb-calendar .react-datepicker__navigation {
          display: none;
        }
      `}</style>
    </Card>
  );
};

export default RentalCard;